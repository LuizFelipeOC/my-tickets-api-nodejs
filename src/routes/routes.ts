import { Router } from "express";
import AuthenticatorController from "../controllers/authenticator/AuthenticatorController";
import CreatedTicketController from "../controllers/CreatedTicket/CreatedTicketController";
import CreateAnwser from "../controllers/CreateResposta/CreateAnwser";
import CreateUserController from "../controllers/CreateUser/CreateUserController";
import DeleteTicketController from "../controllers/DeleteTicket/DeleteTicketController";
import UpdateTicketController from "../controllers/UpdateTicket/UpdateTicketController";
import ensureAuth from "../middleware/EnsuredToken";
// import ensureAuth from "../middleware/ensureAuthenticate";
// import getAllHeroesController from "../UseCases/all_heroes/getAllHeroesController";
// import AuthenticateController from "../UseCases/authenticate/AuthenticateController";

const routes = Router();

routes.post("/createAccount", CreateUserController.createUser);
routes.post("/loginAccount", AuthenticatorController.authenticate);

routes.post("/createdPost", ensureAuth, CreatedTicketController.createdTicket);
routes.delete("/deletePost", ensureAuth, DeleteTicketController.deleteTicket);

routes.put("/updatePost", ensureAuth, UpdateTicketController.updateTicket);

routes.post("/anwser", ensureAuth, CreateAnwser.createAnwser);

export default routes;
