import { Router } from "express";
import AuthenticatorController from "../controllers/authenticator/AuthenticatorController";
import CreateUserController from "../controllers/CreateUser/CreateUserController";
import ensureAuth from "../middleware/EnsuredToken";
// import ensureAuth from "../middleware/ensureAuthenticate";
// import getAllHeroesController from "../UseCases/all_heroes/getAllHeroesController";
// import AuthenticateController from "../UseCases/authenticate/AuthenticateController";

const routes = Router();

routes.post("/createAccount", CreateUserController.createUser);
routes.post("/loginAccount", AuthenticatorController.authenticate);

routes.post("/createdPost", ensureAuth);

// routes.get("/allHeroes", ensureAuth, getAllHeroesController.getHeroes);

export default routes;
