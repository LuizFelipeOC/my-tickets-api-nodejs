import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "../config/auth.json";

const ensureAuth = (req: Request, res: Response, next: NextFunction) => {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({
      error: "Você não está autenticado, faça o login novamente!",
    });
  }

  const [berear, token] = authToken!.split(" ");

  try {
    verify(token, authConfig.secret);

    return next();
  } catch (error) {
    res.status(401).json({
      error: "Token inválido, por favor faça o login novamente!",
    });
  }
};

export default ensureAuth;
