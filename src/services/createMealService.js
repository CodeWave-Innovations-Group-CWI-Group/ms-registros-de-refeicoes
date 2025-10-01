import { createMealRepository } from "../repository/mealRepository.js";

export default async function createMealService(userId, menuId, shift) {
    try{
        const dateMeal = new Date();

        const dayMeal = dateMeal.toLocaleDateString('en-CA');
        console.log(dayMeal)
        const createMeal = await createMealRepository(userId, menuId, dayMeal, shift);

        return createMeal;

    }catch(error){
        console.error(error);
        throw error;
    }
}