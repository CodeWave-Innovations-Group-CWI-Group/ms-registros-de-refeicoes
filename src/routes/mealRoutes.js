import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { createMealController, findHistoryMealsOfUserController, findNumberOfMealsOfDateController } from '../controllers/mealController.js';
const routes = express.Router();

/**
 * @swagger
 * /meal/create:
 *   post:
 *     summary: Cria uma refeição para o usuário logado
 *     tags: [Refeições]
 *     security:
 *       - bearerAuth: []   # depois quando você colocar o token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               menuId:
 *                 type: string
 *                 example: "1234abcd"
 *               shift:
 *                 type: string
 *                 example: "noite"
 *     responses:
 *       201:
 *         description: Refeição criada com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 */
routes.post("/create", authMiddleware, createMealController);

/**
 * @swagger
 * /meal/user/meals/history:
 *   get:
 *     summary: Retorna o histórico de refeições de um usuário
 *     tags: [Refeições]
 *     responses:
 *       200:
 *         description: Lista de refeições
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "cmfvpmnf50000bzzoo9roveuz"
 *                   userId:
 *                     type: string
 *                     example: "1233254643732"
 *                   menuId:
 *                     type: string
 *                     example: "5"
 *                   date:
 *                     type: string
 *                     example: "2025-10-02"
 *                   shift:
 *                     type: string
 *                     example: "manhã"
 *                   
 *       401:
 *         description: Não autorizado
 */
routes.get("/user/meals/history", authMiddleware, findHistoryMealsOfUserController);

/**
 * @swagger
 * /meal/day/{day}:
 *   get:
 *     summary: Retorna a quantidade de refeições cadastradas em um dia específico
 *     tags: [Refeições]
 *     parameters:
 *       - in: path
 *         name: day
 *         required: true
 *         schema:
 *           type: string
 *           example: "2025-10-02"
 *         description: Data no formato YYYY-MM-DD
 *     responses:
 *       200:
 *         description: Quantidade de refeições no dia
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalMeals:
 *                   type: integer
 *                   example: 5
 *       401:
 *         description: Não autorizado
 */
routes.get("/day/:day", authMiddleware, findNumberOfMealsOfDateController);

export default routes;