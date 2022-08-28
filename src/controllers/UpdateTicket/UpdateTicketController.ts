import { Request, Response } from "express";
import CreatedTicketSchema from "../CreatedTicket/CreatedTicketSchema";

interface IRequest {
  userId: string;
  ticketId: string;
  content?: string;
  title?: string;
}

class UpdateTicketController {
  async updateTicket(req: Request, res: Response) {
    const body: IRequest = req.body;

    if (body.userId == "" || body.userId == undefined) {
      return res.status(400).json({
        error: "O campo de identificador do usuário é obrigatório!",
      });
    }

    if (body.ticketId == "" || body.ticketId == undefined) {
      return res.status(400).json({
        error: "O campo de identificador do ticket é obrigatório!",
      });
    }

    const updatePost = await CreatedTicketSchema.updateOne(
      {
        ticketId: body.ticketId,
      },
      {
        $set: { contentTicket: body.content, titleTicket: body.title },
      }
    );

    return res.status(201).json({
      message: "Ticket alterado com sucesso!",
    });
  }
}

export default new UpdateTicketController();
