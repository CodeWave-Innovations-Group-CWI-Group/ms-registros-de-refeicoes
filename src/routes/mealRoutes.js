import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { createMealController, findHistoryMealsOfUserController, findNumberOfMealsOfDateController } from '../controllers/mealController.js';
const routes = express.Router();

routes.post("/create", createMealController);
routes.get("/user/meals/history", findHistoryMealsOfUserController);
routes.get("/day", findNumberOfMealsOfDateController);

export default routes;