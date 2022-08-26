import { Request, Response } from "express";
import CreateUserSchema from "./CreateUserSchema";
import bcrypt from "bcrypt";

interface IRequest {
  username: string;
  email: string;
  password: string;
  telefone: string;
  admin: boolean;
}

class CreateUserController {
  async createUser(req: Request, res: Response): Promise<Response> {
    const body: IRequest = req.body;

    if (body.username == undefined || body.username == "") {
      return res.status(400).json({
        error: "Adicione um nome valído!",
      });
    }

    if (body.username.length >= 30) {
      return res.status(400).json({
        error: "Seu nome de usuário é muito grande!",
      });
    }

    if (
      body.email == undefined ||
      body.email == "" ||
      !body.email.includes("@") ||
      !body.email.includes(".com")
    ) {
      return res.status(400).json({
        error: "Adicione um e-mail valído!",
      });
    }

    if (body.email.length >= 100) {
      return res.status(400).json({
        error: "Seu email é muito grande!",
      });
    }

    if (body.password == undefined || body.password == "") {
      return res.status(400).json({
        error: "Adicione uma senha valida!",
      });
    }

    if (body.password.length < 6 || body.password.length >= 30) {
      return res.status(400).json({
        error: "Sua senha não pode ser menor que 8 caracteres",
      });
    }

    const existUser = await CreateUserSchema.findOne({
      email: body.email,
    });

    if (existUser != null) {
      return res.status(400).json({
        error: "Este e-mail já está em uso!",
      });
    }

    const hash = await bcrypt.hash(body.password, 10);

    const userCreated = await CreateUserSchema.create({
      usernmae: body.username,
      email: body.email,
      admin: body.admin,
      telefone: body.telefone ?? "",
      password: hash,
    });

    return res.status(201).json({
      message: "Usuário criado com sucesso",
      username: userCreated.usernmae,
      userId: userCreated.id,
      admin: userCreated.admin,
    });
  }
}

export default new CreateUserController();
