import express, { Router } from "express";
import userController from "../controllers/UserController";
import { AuthMiddleware } from "../middleware/authMiddleware";
import AuthController from "../controllers/AuthController";

class UserRoutes {
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
     * /api/users/createUsers:
     *   post:
     *     tags:
     *       - Users
     *     summary: Create a new user
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               username:
     *                 type: string
     *               password:
     *                 type: string
     *               role:
     *                 type: string
     *                 enum:
     *                   - "admin"
     *                   - "employee"
     *                   - "veterinarian"
     *                   - "employee"
     *                   - "entretienAgent"
     *                   - "seller"
     *                   - "visitor"
     *             required:
     *               - username
     *               - password
     *               - role
     *     responses:
     *       201:
     *         description: User created successfully
     *       400:
     *         description: Bad request
     */
    this.router.post("/createUsers", userController.createUser);

     /**
     * @swagger
     * /api/users:
     *   get:
     *     tags:
     *       - Users
     *     summary: Get all users
     *     responses:
     *       200:
     *         description: An array of users
     *       400:
     *         description: Error
     */
     this.router.get("/getAllUsers", userController.getAllUsers);

    /**
     * @swagger
     * /api/users/adminArea:
     *   get:
     *     tags:
     *       - Users
     *     summary: Access the admin area
     *     responses:
     *       200:
     *         description: Welcome to the admin area
     *       401:
     *         description: Unauthorized
     */
    this.router.get(
      "/adminArea",
      this.authMiddleware.validateToken,
      this.authMiddleware.isRole("admin"),
      (req, res) => {
        res.status(200).json({ message: "Welcome to the admin area" });
      }
    );

    /**
     * @swagger
     * /api/users/employeeArea:
     *   get:
     *     tags:
     *       - Users
     *     summary: Access the employee area
     *     responses:
     *       200:
     *         description: Welcome to the employee area
     *       401:
     *         description: Unauthorized
     */
    this.router.get(
      "/employeeArea",
      this.authMiddleware.isRole("employee"),
      (req, res) => {
        res.status(200).json({ message: "Welcome to the employee area" });
      }
    );

    /**
     * @swagger
     * /api/users/veterinarianArea:
     *   get:
     *     tags:
     *       - Users
     *     summary: Access the veterinarian area
     *     responses:
     *       200:
     *         description: Welcome to the veterinarian area
     *       401:
     *         description: Unauthorized
     */
    this.router.get(
      "/veterinarianArea",
      this.authMiddleware.isRole("veterinarian"),
      (req, res) => {
        res.status(200).json({ message: "Welcome to the veterinarian area" });
      }
    );

    /**
     * @swagger
     * /api/users/login:
     *   post:
     *     tags:
     *       - Users
     *     summary: Log in a user
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               username:
     *                 type: string
     *               password:
     *                 type: string
     *             required:
     *               - username
     *               - password
     *     responses:
     *       200:
     *         description: Logged in successfully
     *       401:
     *         description: Authentication failed
     */
    this.router.post("/login", AuthController.login);

    /**
     * @swagger
     * /api/users/getUserById/{id}:
     *   get:
     *     tags:
     *       - Users
     *     summary: Get a user by id
     *     parameters:
     *       - name: id
     *         description: id of the user.
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: User data
     *       404:
     *         description: User not found
     */
    this.router.get("/getUserById/:id", userController.getUserById);

    /**
     * @swagger
     * /api/users/updateUser/{id}:
     *   put:
     *     tags:
     *       - Users
     *     summary: Update a user by id
     *     parameters:
     *       - name: id
     *         description: Id of the user.
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
     *               username:
     *                 type: string
     *               password:
     *                 type: string
     *               role:
     *                 type: string
     *             required:
     *               - username
     *               - role
     *     responses:
     *       200:
     *         description: User updated successfully
     *       404:
     *         description: User not found
     */
    this.router.put("/updateUser/:id", userController.updateUser);

    /**
     * @swagger
     * /api/users/deleteUser/{id}:
     *   delete:
     *     tags:
     *       - Users
     *     summary: Delete a user by id
     *     parameters:
     *       - name: id
     *         description: id of the user.
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: User deleted successfully
     *       404:
     *         description: User not found
     */
    this.router.delete("/deleteUser/:id", userController.deleteUser);
  }

}

export default new UserRoutes().router;
