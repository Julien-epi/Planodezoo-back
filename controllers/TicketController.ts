import Ticket from "../models/ticket";
import { Request, Response } from "express";

class TicketController {
  public async createTicket(req: Request, res: Response): Promise<void> {
    const {
      type,
      username,
      allowedSpaces,
      escapeGameOrder,
      validDays = [],
    } = req.body;

    if (
      type === "PASS Escape game" &&
      !escapeGameOrder.every((v: string) => allowedSpaces.includes(v))
    ) {
      res.status(400).json({
        message:
          "Invalid escapeGameOrder: all values must be included in allowedSpaces",
      });
      return;
    }

    let validUntil;

    let typeLowerCase = type.toLowerCase();

    switch (typeLowerCase) {
      case "pass journée":
        validUntil = new Date();
        validUntil.setDate(validUntil.getDate() + 1);
        break;
      case "pass week-end":
        validUntil = new Date();
        validUntil.setDate(validUntil.getDate() + 2);
        break;
      case "pass 1daymonth":
        const currentDate = new Date();
        validUntil = new Date(
          currentDate.getFullYear() + 1,
          currentDate.getMonth(),
          currentDate.getDate()
        );
        for (let i = 0; i < 12; i++) {
          const validDay = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + i,
            1
          );
          validDays.push(validDay);
        }
        break;

      case "pass annuel":
        validUntil = new Date();
        validUntil.setFullYear(validUntil.getFullYear() + 1);
        break;
      case "pass escape game":
        validUntil = new Date();
        validUntil.setDate(validUntil.getDate() + 1);
        break;
      case "pass night":
        validUntil = new Date();
        validUntil.setHours(23, 59, 59, 999);
        break;
    }

    const newTicket = new Ticket({
      type,
      username,
      allowedSpaces,
      escapeGameOrder,
      validUntil,
      validDays,
    });

    await newTicket.save();
    res
      .status(201)
      .json({ message: "Ticket created successfully", ticket: newTicket });
  }

  public async getTicket(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      res.status(404).json({ message: "Ticket not found" });
      return;
    }

    res.status(200).json(ticket);
  }

  public async getTicketCountBySpace(
    req: Request,
    res: Response
  ): Promise<void> {
    const ticketCounts = await Ticket.aggregate([
      {
        $addFields: {
          allowedSpaces: {
            $map: {
              input: "$allowedSpaces",
              as: "spaceId",
              in: { $toObjectId: "$$spaceId" },
            },
          },
        },
      },
      {
        $lookup: {
          from: "spaces",
          localField: "allowedSpaces",
          foreignField: "_id",
          as: "spaceDetails",
        },
      },
      { $unwind: "$spaceDetails" },
      {
        $group: {
          _id: {
            id: "$spaceDetails._id",
            name: "$spaceDetails.name",
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: "$_id.id",
          name: "$_id.name",
          count: 1,
        },
      },
    ]);

    res.status(200).json(ticketCounts);
  }

  public async getDailyTicketCountBySpace(
    req: Request,
    res: Response
  ): Promise<void> {
    const ticketCounts = await Ticket.aggregate([
      {
        $addFields: {
          allowedSpaces: {
            $map: {
              input: "$allowedSpaces",
              as: "spaceId",
              in: { $toObjectId: "$$spaceId" },
            },
          },
        },
      },
      { $unwind: "$allowedSpaces" },
      {
        $lookup: {
          from: "spaces",
          localField: "allowedSpaces",
          foreignField: "_id",
          as: "spaceDetails",
        },
      },
      { $unwind: "$spaceDetails" },
      {
        $project: {
          spaceDetails: 1,
          date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        },
      },
      {
        $group: {
          _id: {
            date: "$date",
            spaceId: "$spaceDetails._id",
            spaceName: "$spaceDetails.name",
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id.spaceName",
          count: 1,
        },
      },
    ]);

    res.status(200).json(ticketCounts);
  }

  public async getWeeklyTicketCountBySpace(
    req: Request,
    res: Response
  ): Promise<void> {
    const ticketCounts = await Ticket.aggregate([
      {
        $addFields: {
          allowedSpaces: {
            $map: {
              input: "$allowedSpaces",
              as: "spaceId",
              in: { $toObjectId: "$$spaceId" },
            },
          },
        },
      },
      { $unwind: "$allowedSpaces" },
      {
        $lookup: {
          from: "spaces",
          localField: "allowedSpaces",
          foreignField: "_id",
          as: "spaceDetails",
        },
      },
      { $unwind: "$spaceDetails" },
      {
        $project: {
          spaceDetails: 1,
          week: { $week: "$createdAt" },
        },
      },
      {
        $group: {
          _id: {
            week: "$week",
            spaceId: "$spaceDetails._id",
            spaceName: "$spaceDetails.name",
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id.spaceName",
          count: 1,
        },
      },
    ]);

    res.status(200).json(ticketCounts);
  }
}

export default new TicketController();
