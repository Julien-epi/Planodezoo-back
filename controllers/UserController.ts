import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user';
import { IUser } from '../interfaces/User';

class UserController {
  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { username, password, role, assignedDays } = req.body;
  
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        res.status(400).json({ error: 'Username already exists' });
        return;
      }
  
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      const user: IUser = new User({
        username,
        password: hashedPassword,
        role,
        assignedDays
      });
  
      await user.save();
      res.status(201).json({ message: 'User created successfully' });
    } catch (error: any) {
      console.log('Error creating user:', error);
      res.status(400).json({ error: error.message });
    }
  }

  public async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await User.find({}).select('-password');
  
      res.status(200).json(users);
    } catch (error: any) {
      console.log('Error getting users:', error);
      res.status(400).json({ error: error.message });
    }
  }
  
  

  public async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await User.findOne({ _id : id });

      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error: any) {
      console.log('Error getting user:', error);
      res.status(400).json({ error: error.message });
    }
  }

  public async updateUser(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        const { username, role, assignedDays } = req.body;

        const user = await User.findById(id);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const existingUser = await User.findOne({ username });
        if (existingUser && existingUser.id !== id) {
            res.status(400).json({ message: 'Username is already in use' });
            return;
        }

        // Map through the array of objects and extract only the `value` property
        const mappedDays = assignedDays.map((day: { value: string; label: string; }) => day.value);

        user.username = username;
        user.role = role;
        user.assignedDays = mappedDays;

        await user.save();

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error: any) {
        console.log('Error updating user:', error);
        res.status(400).json({ error: error.message });
    }
}




  public async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const result = await User.deleteOne({ _id : id });

      if (result.deletedCount === 0) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error: any) {
      console.log('Error deleting user:', error);
      res.status(400).json({ error: error.message });
    }
  }

}

export default new UserController();
