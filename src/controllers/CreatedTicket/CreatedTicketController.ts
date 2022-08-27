import { Request, Response } from "express";
import crypto from "crypto";
import CreatedTicketSchema from "./CreatedTicketSchema";

interface IRequest {
  ticketId: string;
  userId: string;
  titleTicket: string;
  contentTicket: string;
  statusTicket: string;
}

class CreatedTicketController {
  async createdTicket(req: Request, res: Response) {
    const body: IRequest = req.body;

    if (body.userId == undefined || body.userId == "") {
      return res.status(400).json({
        error: "O campo userID é obrigatório!",
      });
    }

    if (body.titleTicket == undefined || body.titleTicket == "") {
      return res.status(400).json({
        error: "O campo de titutlo do ticket é obrigatório!",
      });
    }

    if (body.contentTicket == undefined || body.contentTicket == "") {
      return res.status(400).json({
        error: "O campo de conteudo do titulo é obrigatório!",
      });
    }

    const crypUuid = crypto.randomUUID();
    body.ticketId = crypUuid;

    const createdTicket = await CreatedTicketSchema.create(body);

    return res.status(201).json({
      message: "Ticket criado com sucesso!",
      ticketId: createdTicket,
    });
  }
}

export default new CreatedTicketController();
