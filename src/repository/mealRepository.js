import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createMealRepository(userId, menuId, date, shift) {
    try {
        const mealCreated = await prisma.meal.create({
            data: {
                userId: userId,
                menuId: menuId,
                date: date,
                shift: shift
            }
        })

        return mealCreated;
    } catch (error) {
        throw error;
    }
}


export async function findHistoryMealsOfUserRepository(userId) {
    try {
        const mealsUser = await prisma.meal.findMany({
            where: {
                userId: userId
            }
        })
        return mealsUser;
    } catch (error) {
        throw error;
    }
}

export async function findNumberOfMealsOfDateRepository(day) {
    try {
        const findMealsDay = await prisma.meal.count({
            where: {
                date: day
            }
        })
        return findMealsDay;
    } catch (error) {
        throw error;
    }
}

export async function findHistoryOfMealsOfDateRepository(dayInput) {
    try {

        const findMealsDay = await prisma.meal.findMany({
            where: {
                date: dayInput
            }
        })
        return findMealsDay;
    } catch (error) {
        throw error;
    }
}