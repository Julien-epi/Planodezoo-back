import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import User from '../models/user';
import { IUser } from '../interfaces/User';

class AuthController {
  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;
      console.log("🚀 ~ file: AuthController.ts:11 ~ AuthController ~ login ~ req.body:", req.body);

      // Find user
      const user: IUser | null = await User.findOne({ username });
      if (!user) {
        res.status(400).json({ message: "Username does not exist" });
        return;
      }

      // Verify password
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        res.status(400).json({ message: "Password is incorrect" });
        return;
      }

      // Create token
      const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET!, {
        expiresIn: '30d',
      });

      res.status(200).json({ message: "Logged in successfully", token });
    } catch (error: any) {
      console.log("🚀 ~ UserController ~ login ~ error:", error);
      res.status(500).json({ error: error.message });
    }
  }
}
export default new AuthController();
