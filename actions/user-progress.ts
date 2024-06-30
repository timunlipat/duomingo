"use server";

import db from "@/db/drizzle";
import { getCourseById, getUserProgress } from "@/db/queries";
import { userProgress } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

export const upsertUserProgress = async (courseId: number) => {
    // throw new Error("Test");
    try {
        const { userId } = auth();
        const user = await currentUser();

        if (!userId || !user) {
            throw new Error("Unauthorized");
        }

        const course = await getCourseById(courseId);
        
        if (!course) {
            throw new Error("Course not found");
        }

        const existingUserProgress = await getUserProgress();

        if (existingUserProgress) {
            await db
                .update(userProgress)
                .set({
                    activeCourseId: courseId,
                    userName: user.firstName || "User",
                    userImageSrc: user.imageUrl || "/mascot.png",
                })
                .where(eq(userProgress.userId, userId));
        } else {
            await db.insert(userProgress).values({
                userId,
                activeCourseId: courseId,
                userName: user.firstName || "User",
                userImageSrc: user.imageUrl || "/mascot.png",
            });
        }

        revalidatePath("/courses");
        revalidatePath("/learn");

        return true;
    } catch (error) {
        console.error("Error upserting user progress:", error);
        return false;
    }
};
