import { Request, Response } from 'express';
import Animal from '../models/animals';
import { IAnimal } from '../interfaces/Animals';

class AnimalController {
    public async createAnimal(req: Request, res: Response): Promise<void> {
        try {
            const { name, species, healthStatus, spaceId, age } = req.body;

            const animal: IAnimal = new Animal({
                name,
                species,
                healthStatus,
                spaceId,
                age
            });

            await animal.save();
            res.status(201).json({ message: 'Animal created successfully' });
        } catch (error: any) {
            console.log('Error creating animal:', error);
            res.status(400).json({ error: error.message });
        }
    }

    public async getAllAnimals(req: Request, res: Response): Promise<void> {
        try {
            const animals = await Animal.find();

            if (animals) {
                res.status(200).json(animals);
            } else {
                res.status(404).json({ message: 'No animals found' });
            }
        } catch (error: any) {
            console.log('Error getting animals:', error);
            res.status(500).json({ error: error.message });
        }
    }


    public async getAnimalById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const animal = await Animal.findById(id);

            if (animal) {
                res.status(200).json(animal);
            } else {
                res.status(404).json({ message: 'Animal not found' });
            }
        } catch (error: any) {
            console.log('Error getting animal:', error);
            res.status(400).json({ error: error.message });
        }
    }

    public async updateAnimal(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { name, species, spaceId } = req.body;

            const animal = await Animal.findById(id);

            if (!animal) {
                res.status(404).json({ message: 'Animal not found' });
                return;
            }

            animal.name = name;
            animal.species = species;
            animal.spaceId = spaceId;

            await animal.save();

            res.status(200).json({ message: 'Animal updated successfully' });
        } catch (error: any) {
            console.log('Error updating animal:', error);
            res.status(400).json({ error: error.message });
        }
    }

    public async deleteAnimal(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            const result = await Animal.deleteOne({ _id: id });

            if (result.deletedCount === 0) {
                res.status(404).json({ message: 'Animal not found' });
                return;
            }

            res.status(200).json({ message: 'Animal deleted successfully' });
        } catch (error: any) {
            console.log('Error deleting animal:', error);
            res.status(400).json({ error: error.message });
        }
    }

}

export default new AnimalController();
