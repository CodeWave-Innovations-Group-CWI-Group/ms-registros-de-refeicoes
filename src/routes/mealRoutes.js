import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { createMealController, findHistoryMealsOfUserController, findNumberOfMealsOfDateController } from '../controllers/mealController.js';
const routes = express.Router();

routes.post("/create", createMealController);
routes.get("/user/meals/history", authMiddleware, findHistoryMealsOfUserController);
routes.get("/day", authMiddleware, findNumberOfMealsOfDateController);

export default routes;