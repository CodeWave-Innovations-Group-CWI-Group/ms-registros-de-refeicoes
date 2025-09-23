import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { createMealController, findHistoryMealsOfUserController, findNumberOfMealsOfDateController } from '../controllers/mealController.js';
const routes = express.Router();

routes.post("/create", createMealController); //depois colocar o token
routes.get("/user/meals/history/:userId", findHistoryMealsOfUserController); //Depois reetirar o user id da rota e passar o token
routes.get("/day/:day", findNumberOfMealsOfDateController); //depois colocar o token

export default routes;