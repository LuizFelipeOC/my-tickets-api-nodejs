import { Router } from "express";
import AuthenticatorController from "../controllers/authenticator/AuthenticatorController";
import CreatedTicketController from "../controllers/CreatedTicket/CreatedTicketController";
import CreateUserController from "../controllers/CreateUser/CreateUserController";
import DeleteTicketController from "../controllers/DeleteTicket/DeleteTicketController";
import ensureAuth from "../middleware/EnsuredToken";
// import ensureAuth from "../middleware/ensureAuthenticate";
// import getAllHeroesController from "../UseCases/all_heroes/getAllHeroesController";
// import AuthenticateController from "../UseCases/authenticate/AuthenticateController";

const routes = Router();

routes.post("/createAccount", CreateUserController.createUser);
routes.post("/loginAccount", AuthenticatorController.authenticate);

routes.post("/createdPost", ensureAuth, CreatedTicketController.createdTicket);
routes.delete("/deletePost", ensureAuth, DeleteTicketController.deleteTicket);

// routes.get("/allHeroes", ensureAuth, getAllHeroesController.getHeroes);

export default routes;
