import mongoose, { Document } from 'mongoose';
import ITicket from '../interfaces/Ticket';

const Schema = mongoose.Schema;

const TicketSchema = new Schema<ITicket>({
    type: { type: String, required: true },
    username: { type: String, required: true },
    allowedSpaces: [{ type: String }],
    validUntil: { type: Date, required: true },
    escapeGameOrder: [{ type: Schema.Types.ObjectId, ref: 'Space' }],
    validDays: { type: [Date], default: undefined },
}, {
    timestamps: true
});


export default mongoose.model<ITicket & Document>('Ticket', TicketSchema);
