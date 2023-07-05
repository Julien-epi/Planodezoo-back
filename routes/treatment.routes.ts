import { AuthMiddleware } from './../middleware/authMiddleware';
import express, { Router } from 'express';
import TreatmentController from '../controllers/TreatmentController';

class TreatmentRoutes {
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
         * /api/treatments/getalltreatments:
         *   get:
         *     tags:
         *       - Treatments
         *     summary: Get all treatments
         *     responses:
         *       200:
         *         description: List of all treatments
         */
        this.router.get(
            '/getalltreatments',
            // this.authMiddleware.validateToken,
            // this.authMiddleware.isRole('admin'),
            TreatmentController.getAllTreatments
        );

        /**
         * @swagger
         * /api/treatments/gettreatmentbyid/{id}:
         *   get:
         *     tags:
         *       - Treatments
         *     summary: Get treatment by id
         *     parameters:
         *       - name: id
         *         description: id of the treatment.
         *         in: path
         *         required: true
         *         schema:
         *           type: string
         *     responses:
         *       200:
         *         description: Treatment data
         *       404:
         *         description: Treatment not found
         */
        this.router.get(
            '/gettreatmentbyid/:id',
            this.authMiddleware.validateToken,
            TreatmentController.getTreatmentById
        );

        /**
 * @swagger
 * /api/treatments/createtreatment:
 *   post:
 *     tags:
 *       - Treatments
 *     summary: Create a new treatment
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               animalId:
 *                 type: string
 *               veterinarianId:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               treatmentDescription:
 *                 type: string
 *             required:
 *               - animalId
 *               - veterinarianId
 *               - treatmentDescription
 *     responses:
 *       201:
 *         description: Treatment created successfully
 *       400:
 *         description: Bad request
 */
        this.router.post(
            '/createtreatment',
            this.authMiddleware.validateToken,
            this.authMiddleware.isRole('veterinarian'),
            TreatmentController.createTreatment
        );

        /**
         * @swagger
         * /api/treatments/updatetreatment/{id}:
         *   put:
         *     tags:
         *       - Treatments
         *     summary: Update a treatment by id
         *     parameters:
         *       - name: id
         *         description: id of the treatment.
         *         in: path
         *         required: true
         *         schema:
         *           type: string
         *     requestBody:
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               animalId:
         *                 type: string
         *               veterinarianId:
         *                 type: string
         *               date:
         *                 type: string
         *                 format: date-time
         *               treatmentDescription:
         *                 type: string
         *             required:
         *               - animalId
         *               - veterinarianId
         *               - treatmentDescription
         *     responses:
         *       200:
         *         description: Treatment updated successfully
         *       400:
         *         description: Bad request
         *       404:
         *         description: Treatment not found
         */
        this.router.put(
            '/updatetreatment/:id',
            this.authMiddleware.validateToken,
            this.authMiddleware.isRole('veterinarian'),
            TreatmentController.updateTreatment
        );

        /**
         * @swagger
         * /api/treatments/deletetreatment/{id}:
         *   delete:
         *     tags:
         *       - Treatments
         *     summary: Delete a treatment by id
         *     parameters:
         *       - name: id
         *         description: id of the treatment.
         *         in: path
         *         required: true
         *         schema:
         *           type: string
         *     responses:
         *       200:
         *         description: Treatment deleted successfully
         *       404:
         *         description: Treatment not found
         */
        this.router.delete(
            '/deletetreatment/:id',
            this.authMiddleware.validateToken,
            this.authMiddleware.isRole('veterinarian'),
            TreatmentController.deleteTreatment
        );
    }
}

export default new TreatmentRoutes().router;
