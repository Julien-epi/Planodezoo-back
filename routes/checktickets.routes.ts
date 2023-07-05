import express, { Router } from "express";
import CheckticketsController from "../controllers/CheckticketsController";

class CheckticketsRoutes {
    public router: Router;

    constructor() {
        this.router = express.Router();
        this.routes();
    }

    public routes(): void {
        // Notez l'utilisation de la méthode 'get' au lieu de 'post'.
        // Cela est plus approprié car nous récupérons des données.
        this.router.get(
            "/checktickets/:id",
            CheckticketsController.getUserTickets // J'ai également renommé la méthode du contrôleur pour plus de clarté.
        );
    }
}

export default new CheckticketsRoutes().router;