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
        const day = new Date(`${day}T00:00:00.000Z`)
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

export async function findHistoryOfMealsOfDateRepository(day) {
    try {
         const day = new Date(`${day}T00:00:00.000Z`)

        const findMealsDay = await prisma.meal.findMany({
            where: {
                date: day
            }
        })
        return findMealsDay;
    } catch (error) {
        throw error;
    }
}