import { NextFunction, Request, Response } from 'express';
import Ticket from '../models/ticket';
import Space from '../models/space';
import { IUser } from '../interfaces/User';

// Interface personnalisée pour Request.
interface RequestWithUser extends Request {
  user?: IUser;
}

class TicketMiddleware {
  public async validateTicket(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?._id; // Suppose que vous avez déjà authentifié l'utilisateur et attaché l'utilisateur à la requête.
      const spaceId = req.params.spaceId; // Suppose que l'ID de l'espace est passé en tant que paramètre de l'URL.

      const ticket = await Ticket.findOne({ userId });

      if (!ticket) {
        res.status(403).json({ message: 'No valid ticket found for user' });
        return;
      }

      // Vérifier si le ticket est valide pour cet espace.
      const space = await Space.findById(spaceId);
      if (!space || !ticket.allowedSpaces.includes(space._id)) {
        res.status(403).json({ message: 'Ticket does not allow access to this space' });
        return;
      }

      // Si vous voulez vérifier l'ordre des espaces pour un PASS Escape Game, vous pouvez le faire ici.

      next(); // Si tout va bien, passer à la prochaine fonction middleware.
    } catch (error: any) {
      console.log('Error validating ticket:', error);
      res.status(500).json({ error: error.message });
    }
  }
}

export default new TicketMiddleware();
