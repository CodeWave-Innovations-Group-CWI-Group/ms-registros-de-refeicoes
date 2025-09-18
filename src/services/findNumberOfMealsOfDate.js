import { findHistoryOfMealsOfDateRepository, findNumberOfMealsOfDateRepository } from "../repository/mealRepository";

export default async function findNumberOfMealsOfDateService(day) {
    try {
        const historyMelsDay = await findHistoryOfMealsOfDateRepository(day);
        const numberMealsDay = await findNumberOfMealsOfDateRepository(day);

        return {
            historyMelsDay,
            numberMealsDay
        };

    } catch (error) {
        throw error;
    }
}