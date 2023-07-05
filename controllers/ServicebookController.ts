import { Request, Response } from "express";
import Servicebook from "../models/servicebook";

class ServicebookController {
  // Obtenir tous les servicebooks
  public async getAllServiceBook(req: Request, res: Response): Promise<void> {
    try {
      const servicebooks = await Servicebook.find();
      res.json(servicebooks);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  // Obtenir un servicebook par ID
  public async getServiceBookById(req: Request, res: Response): Promise<void> {
    try {
      const servicebook = await Servicebook.findById(req.params.id);
      res.json(servicebook);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  // Créer un nouveau servicebook
  public async createServiceBook(req: Request, res: Response): Promise<void> {
    try {
      const servicebook = new Servicebook(req.body);
      const result = await servicebook.save();
      res.status(201).send({ message: "Servicebook crée avec succès" });
    } catch (err) {
      res.status(500).send(err);
    }
  }

  // Mettre à jour un servicebook
  public async updateServiceBook(req: Request, res: Response): Promise<void> {
    try {
      await Servicebook.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
      res.status(200).send({ message: `Servicebook ${req.params.id} a été mis à jour avec succès` });
    } catch (err) {
      res.status(500).send(err);
    }
  }

  // Supprimer un servicebook
  public async deleteServiceBook(req: Request, res: Response): Promise<void> {
    try {
      await Servicebook.findByIdAndDelete(req.params.id);
      res.status(200).send({ message: "Servicebook supprimé avec succès" });
    } catch (err) {
      res.status(500).send(err);
    }
  }
}
export default new ServicebookController();
