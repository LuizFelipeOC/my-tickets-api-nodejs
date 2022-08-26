import express from "express";
import mongoose from "mongoose";
import routes from "./routes/routes";
import cors from "cors";

require("dotenv").config();

class App {
  public express: express.Application;

  public constructor() {
    this.express = express();
    this.mongoCloudDatabase();
    this.middlewares();
    this.routes();
  }

  private mongoCloudDatabase(): void {
    try {
      mongoose.connect(
        `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.ycdi3.mongodb.net/?retryWrites=true&w=majority`
      );

      console.log("Conectado ao Banco");
    } catch (error) {
      console.log("Erro ao conectar ao banco:" + error);
    }
  }

  private routes(): void {
    this.express.use(routes);
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors());
  }
}

export default new App().express;
