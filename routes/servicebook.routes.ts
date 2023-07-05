import { AuthMiddleware } from "./../middleware/authMiddleware";
import express, { Router } from "express";
import ServicebookController from "../controllers/ServicebookController";

class ServicebookRoutes {
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
     * /api/servicebook/getallservicebooks:
     *   get:
     *     tags:
     *       - Service Book
     *     summary: Retrieve a list of servicebooks
     *     responses:
     *       200:
     *         description: A list of servicebook.
     */
    this.router.get(
      "/getallservicebooks",
      this.authMiddleware.validateToken,
      this.authMiddleware.isRole("admin"),
      ServicebookController.getAllServiceBook
    );

    /**
     * @swagger
     * /api/servicebook/getservicebookbyid/{id}:
     *   get:
     *     tags:
     *       - Service Book
     *     summary: Retrieve a Servicebook by ID
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The ID of the Servicebook to retrieve
     *     responses:
     *       200:
     *         description: A single Servicebook
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Servicebook'
     *       404:
     *         description: Servicebook not found
     *       500:
     *         description: Internal Server Error
     */
    this.router.get(
      "/getservicebookbyid/:id",
      this.authMiddleware.validateToken,
      this.authMiddleware.isRole("admin"),
      ServicebookController.getServiceBookById
    );

    /**
     * @swagger
     * /api/servicebook/createservicebook:
     *   post:
     *     tags:
     *       - Service Book
     *     summary: Create a new servicebook
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Servicebook'
     *     responses:
     *       201:
     *         description: The created space.
     */
    this.router.post(
      "/createservicebook",
      this.authMiddleware.validateToken,
      this.authMiddleware.isRole("admin"),
      ServicebookController.createServiceBook
    );

    /**
     * @swagger
     * /api/servicebook/update/{id}:
     *   put:
     *     tags:
     *       - Service Book
     *     summary: Update a servicebook by ID
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Servicebook'
     *     responses:
     *       200:
     *         description: The updated Servicebook.
     */
    this.router.put(
      "/update/:id",
      this.authMiddleware.validateToken,
      this.authMiddleware.isRole("admin"),
      ServicebookController.updateServiceBook
    );

    /**
     * @swagger
     * /api/servicebook/delete/{id}:
     *   delete:
     *     tags:
     *       - Service Book
     *     summary: Delete a servicebook by ID
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Successfully deleted the servicebook.
     */
    this.router.delete(
      "/delete/:id",
      this.authMiddleware.validateToken,
      this.authMiddleware.isRole("admin"),
      ServicebookController.deleteServiceBook
    );

    
  } 
}

export default new ServicebookRoutes().router;
