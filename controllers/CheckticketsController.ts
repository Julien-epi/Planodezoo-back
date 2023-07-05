import { Request, Response } from "express";
import Ticket from "../models/ticket";

class CheckticketsController {

    public async getUserTickets(req: Request, res: Response): Promise<void> {
        try {
            const username = req.params.id;

            // Rechercher les billets associés à ce nom d'utilisateur
            const tickets = await Ticket.find({ username, validUntil: { $gte: new Date() } });

            // Retourner les billets trouvés
            res.json({ tickets });

        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export default new CheckticketsController();