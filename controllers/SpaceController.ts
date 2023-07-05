import { Request, Response } from "express";
import Space from "../models/space";
import { ISpace } from "../interfaces/Space";

class SpaceController {
  // Obtenir tous les espaces
  public async getAllSpaces(req: Request, res: Response): Promise<void> {
    try {
      const spaces = await Space.find();
      res.json(spaces);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  // Obtenir un espace par nom
  public async getSpaceByName(req: Request, res: Response): Promise<void> {
    try {
      const space = await Space.findOne({ name: req.query.name });
      if (space) {
        res.json(space);
      } else {
        res.status(404).json({ message: "Espace non trouvé" });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }

  // Obtenir un espace par ID
  public async getSpaceById(req: Request, res: Response): Promise<void> {
    try {
      const space = await Space.findById(req.params.id);
      res.json(space);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  // Créer un nouvel espace
  public async createSpace(req: Request, res: Response): Promise<void> {
    try {
      // Exemple de validation des données
      if (!req.body.name || !req.body.description) {
        res.status(400).send({ message: "Name and description are required" });
        return;
      }

      const space = new Space(req.body);
      const result = await space.save();
      res.status(201).send({ message: "Espace crée avec succès" });
    } catch (err) {
      // Message d'erreur descriptif
      res.status(500).send({
        message: "An error occurred while creating the space",
        error: err,
      });
    }
  }

  // Mettre à jour un espace
  public async updateSpace(req: Request, res: Response): Promise<void> {
    try {
      const space = await Space.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).send({ message: "Espace modifié avec succès" });
    } catch (err) {
      res.status(500).send(err);
    }
  }

  // Supprimer un espace
  public async deleteSpace(req: Request, res: Response): Promise<void> {
    try {
      await Space.findByIdAndDelete(req.params.id);
      res.status(200).send({ message: "Espace supprimé avec succès" });
    } catch (err) {
      res.status(500).send(err);
    }
  }

  // Mettre un espace en maintenance
  public async maintenanceSpace(req: Request, res: Response): Promise<void> {
    try {
      const space = await Space.findById(req.params.id);
      if (!space) {
        res.status(400).send({ message: "Space not found" });
        return;
      }

      space.lastMaintenance = new Date();
      space.status = true;
      await space.save();

      res.status(200).send({
        message: `L'espace ${req.params.id} a été mis en maintenance`,
      });
    } catch (err) {
      res.status(500).send(err);
    }
  }

  public async maintenanceOffSpace(req: Request, res: Response): Promise<void> {
    try {
      const space = await Space.findById(req.params.id);
      if (!space) {
        res.status(400).send({ message: "Space not found" });
        return;
      }

      space.status = false;
      await space.save();
      res.status(200).send({
        message: `L'espace ${req.params.id} n'est plus en maintenance`,
      });
    } catch (err) {
      res.status(500).send(err);
    }
  }
}

export default new SpaceController();
