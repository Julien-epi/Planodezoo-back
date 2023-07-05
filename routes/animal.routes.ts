import { AuthMiddleware } from "./../middleware/authMiddleware";
import express, { Router } from "express";
import AnimalController from "../controllers/AnimalController";

class AnimalRoutes {
    public router: Router;
    private authMiddleware: AuthMiddleware;

    constructor() {
        this.router = express.Router();
        this.authMiddleware = new AuthMiddleware();
        this.routes();
    }

    public routes(): void {
        /**
         * @swagger
         * /api/animals/createAnimal:
         *   post:
         *     tags:
         *       - Animals
         *     summary: Create a new animal
         *     description: Creates a new animal
         *     requestBody:
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               name:
         *                 type: string
         *               species:
         *                 type: string
         *               age:
         *                 type: number
         *             required:
         *               - name
         *               - species
         *               - age
         *     responses:
         *       201:
         *         description: Animal created successfully
         *       400:
         *         description: Bad request
         */
        this.router.post(
            "/createAnimal",
            this.authMiddleware.validateToken,
            this.authMiddleware.isRole("admin"),
            AnimalController.createAnimal
        );

        /**
         * @swagger
         * /api/animals/getAnimalById/{id}:
         *   get:
         *     tags:
         *       - Animals
         *     summary: Get an animal by ID
         *     description: Returns a single animal
         *     parameters:
         *       - name: id
         *         description: ID of the animal to get.
         *         in: path
         *         required: true
         *         type: string
         *     responses:
         *       200:
         *         description: Animal data
         *       404:
         *         description: Animal not found
         */
        this.router.get(
            "/getAnimalById/:id",
            this.authMiddleware.validateToken,
            this.authMiddleware.isRole("admin"),
            AnimalController.getAnimalById
        );

        /**
         * @swagger
         * /api/animals/getAnimals:
         *   get:
         *     tags:
         *       - Animals
         *     summary: Get all animals
         *     description: Returns a list of all animals
         *     responses:
         *       200:
         *         description: List of animals
         *       404:
         *         description: No animals found
         */
        this.router.get(
            "/getAnimals",
            this.authMiddleware.validateToken,
            this.authMiddleware.isRole("admin"),
            AnimalController.getAllAnimals
        );

        /**
         * @swagger
         * /api/animals/updateAnimal/{id}:
         *   put:
         *     tags:
         *       - Animals
         *     summary: Update an animal by ID
         *     description: Updates an existing animal by ID
         *     parameters:
         *       - name: id
         *         description: ID of the animal to update.
         *         in: path
         *         required: true
         *         type: string
         *     requestBody:
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               name:
         *                 type: string
         *               species:
         *                 type: string
         *               age:
         *                 type: number
         *     responses:
         *       200:
         *         description: Animal updated successfully
         *       404:
         *         description: Animal not found
         */
        this.router.put(
            "/updateAnimal/:id",
            this.authMiddleware.validateToken,
            this.authMiddleware.isRole("admin"),
            AnimalController.updateAnimal
        );

        /**
         * @swagger
         * /api/animals/deleteAnimal/{id}:
         *   delete:
         *     tags:
         *       - Animals
         *     summary: Delete an animal by ID
         *     description: Deletes an existing animal by ID
         *     parameters:
         *       - name: id
         *         description: ID of the animal to delete.
         *         in: path
         *         required: true
         *         type: string
         *     responses:
         *       200:
         *         description: Animal deleted successfully
         *       404:
         *         description: Animal not found
         */
        this.router.delete(
            "/deleteAnimal/:id",
            this.authMiddleware.validateToken,
            this.authMiddleware.isRole("admin"),
            AnimalController.deleteAnimal
        );
    }

}

export default new AnimalRoutes().router;
