import { Request, Response } from "express";
import CreatedTicketSchema from "../CreatedTicket/CreatedTicketSchema";

interface IRequest {
  ticketId: string;
}

class DeleteTicketController {
  async deleteTicket(req: Request, res: Response) {
    const body: IRequest = req.body;

    if (body.ticketId == "" || body.ticketId == undefined) {
      return res.status(400).json({
        error: "O campo identificador do ticket é obrigatório!",
      });
    }

    const deleteTicket = await CreatedTicketSchema.deleteOne({
      ticketId: body.ticketId,
    });

    return res.status(200).json({
      message: "Item deletado com sucesso",
    });
  }
}

export default new DeleteTicketController();
