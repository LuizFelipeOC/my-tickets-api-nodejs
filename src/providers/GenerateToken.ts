import { sign } from "jsonwebtoken";

import authConfig from "../config/auth.json";
import dotenv from "dotenv";

class TokenGenerate {
  public generationToken(username: string): String {
    dotenv.config();

    const token = sign({}, authConfig.secret, {
      subject: username,
      expiresIn: 200,
    });

    return token;
  }
}

export default new TokenGenerate();
