import { Schema, Document, model } from "mongoose";

interface ICreatedTicket extends Document {
  userId: string;
  ticketId: string;
  titleTicket: string;
  contentTicket: string;
  statusTicket: string;
}

const CreatedTicketSchema = new Schema(
  {
    userId: String,
    ticketId: String,
    titleTicket: String,
    contentTicket: String,
    statusTicket: String,
  },
  {
    timestamps: true,
  }
);

export default model<ICreatedTicket>("Ticket", CreatedTicketSchema);
