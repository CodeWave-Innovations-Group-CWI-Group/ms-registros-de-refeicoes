import createMealService from "../services/createMealService.js";
import findNumberOfMealsOfDateService from "../services/findNumberOfMealsOfDate.js";
import findHistoryMealsOfUserService from "../services/findUserMealHistoryService.js";

export async function createMealController(req, res) {
    try{
        //const user = req.user;
        const {userId, menuId} = req.body;

        const createMeal = await createMealService(userId, menuId);
        return res.status(201).json({
            createMeal
        })
    }catch(error){
        return res.status(500).json({
            error: "Erro no servidor"
        })
    }
}

export async function findHistoryMealsOfUserController(req, res) {
    try{
        //const userId = req.user.userId;
        const {userId, menuId} = req.body;
        const mealsUser = await findHistoryMealsOfUserService(userId);
        return res.status(200).json({
            mealsUser
        })
    }catch(error){
        return res.status(500).json({
            error: "Erro no servidor"
        })
    }
}


export async function findNumberOfMealsOfDateController(req, res) {
    try{
        const day = req.body;
        console.log(day.day);
        const mealsDay = await findNumberOfMealsOfDateService(day.day);
        return res.status(200).json({
            mealsDay
        })
    }catch(error){
        return res.status(500).json({
            error: "Erro no servidor"
        })
    }
}


