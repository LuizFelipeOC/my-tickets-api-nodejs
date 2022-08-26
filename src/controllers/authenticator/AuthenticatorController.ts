import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";

import CreateUserSchema from "../CreateUser/CreateUserSchema";
import token from "../../providers/GenerateToken";

interface IRequest {
  username: string;
  password: string;
}

class AuthenticateController {
  async authenticate(req: Request, res: Response): Promise<Response> {
    const body: IRequest = req.body;

    if (body.username == undefined || body.username == "") {
      return res.status(400).json({
        error: "O campo de usuário não pode ser vazio!",
      });
    }

    if (body.password == undefined || body.password == "") {
      return res.status(400).json({
        error: "O campo de senha não pode ser vazio!",
      });
    }

    const userExist = await CreateUserSchema.findOne({
      usernmae: body.username,
    });

    if (userExist == null) {
      return res.status(400).json({
        error: "Esse usuário não existe, por favor crie uma conta!",
      });
    }

    const verifyPass = bcrypt.compareSync(body.password, userExist.password);

    if (!verifyPass) {
      return res.status(400).json({
        error: "Senha invalida!",
      });
    }

    return res.status(201).json({
      username: userExist.username,
      userId: userExist.id,
      token: token.generationToken(userExist.username),
    });
  }
}

export default new AuthenticateController();
