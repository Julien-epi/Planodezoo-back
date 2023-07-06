import { Request, Response } from 'express';
import Treatment from '../models/treatment';
import { ITreatment } from '../interfaces/Treatment';

class TreatmentController {
    public async createTreatment(req: Request, res: Response): Promise<void> {
        try {
            const { animalId, veterinarianId, treatmentDescription } = req.body;

            const treatment: ITreatment = new Treatment({
                animalId,
                veterinarianId,
                treatmentDescription
            });

            await treatment.save();
            res.status(201).json({ message: 'Treatment created successfully' });
        } catch (error: any) {
            console.log('Error creating treatment:', error);
            res.status(400).json({ error: error.message });
        }
    }

    public async getAllTreatments(req: Request, res: Response): Promise<void> {
        try {
            const treatments = await Treatment.find();

            if (treatments) {
                res.status(200).json(treatments);
            } else {
                res.status(404).json({ message: 'No treatments found' });
            }
        } catch (error: any) {
            console.log('Error getting treatments:', error);
            res.status(500).json({ error: error.message });
        }
    }

    public async getTreatmentById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const treatment = await Treatment.findById(id);

            if (treatment) {
                res.status(200).json(treatment);
            } else {
                res.status(404).json({ message: 'Treatment not found' });
            }
        } catch (error: any) {
            console.log('Error getting treatment:', error);
            res.status(400).json({ error: error.message });
        }
    }

    public async updateTreatment(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { animalId, veterinarianId, treatmentDescription } = req.body;

            const treatment = await Treatment.findById(id);

            if (!treatment) {
                res.status(404).json({ message: 'Treatment not found' });
                return;
            }

            treatment.animalId = animalId;
            treatment.veterinarianId = veterinarianId;
            treatment.treatmentDescription = treatmentDescription;

            await treatment.save();

            res.status(200).json({ message: 'Treatment updated successfully' });
        } catch (error: any) {
            console.log('Error updating treatment:', error);
            res.status(400).json({ error: error.message });
        }
    }

    public async deleteTreatment(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            const result = await Treatment.deleteOne({ _id: id });

            if (result.deletedCount === 0) {
                res.status(404).json({ message: 'Treatment not found' });
                return;
            }

            res.status(200).json({ message: 'Treatment deleted successfully' });
        } catch (error: any) {
            console.log('Error deleting treatment:', error);
            res.status(400).json({ error: error.message });
        }
    }
}

export default new TreatmentController();
