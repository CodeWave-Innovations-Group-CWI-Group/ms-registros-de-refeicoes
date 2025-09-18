import { findHistoryMealsOfUserRepository } from "../repository/mealRepository.js"

export default async function findHistoryMealsOfUserService(userId){
    try{
        const mealsUser = await findHistoryMealsOfUserRepository(userId);
        return mealsUser;
    }catch(error){
        throw error
    }
}