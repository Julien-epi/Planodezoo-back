import express, { Router } from 'express';
import ZooController from '../controllers/ZooController';

class ZooRoutes {
  public router: Router;

  constructor() {
    this.router = express.Router();
    this.routes();
  }

  public routes(): void {
    /**
     * @swagger
     * /api/zoo/canZooOpen:
     *   get:
     *     tags:
     *       - Zoo
     *     summary: Check if zoo can open today
     *     responses:
     *       200:
     *         description: The zoo can open
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 canOpen:
     *                   type: boolean
     *       500:
     *         description: There was an error checking if the zoo can open
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     */
    this.router.get('/canZooOpen', ZooController.canZooOpen);
  }

}

export default new ZooRoutes().router;
