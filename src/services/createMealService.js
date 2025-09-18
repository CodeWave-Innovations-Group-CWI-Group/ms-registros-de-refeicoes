import { createMealRepository } from "../repository/mealRepository.js";

export default async function createMealService(userId, menuId) {
    try{
        const dateMeal = new Date();
        let shiftMeal = "";

        if(dateMeal.getHours() >= 6 && dateMeal.getHours() < 12){
            shiftMeal = "manhã";
        }else if(dateMeal.getHours() >= 12 && dateMeal.getHours() < 18){
            shiftMeal = "tarde";
        }else if(dateMeal.getHours() >= 18 && dateMeal.getHours() <= 23){
            shiftMeal = "noite";
        }else{
            throw new Error("ERRO: Fora do horário de funcionamento.")
        }

        dateMeal.setHours(0,0,0,0);
        const createMeal = await createMealRepository(userId, menuId, dateMeal, shiftMeal);

        return createMeal;

    }catch(error){
        throw error;
    }
}