import { auth } from "@clerk/nextjs/server"

const allowedIds = ["user_2iah711q8rhfeK7uuXOZOEXgJwh"];

export const getIsAdmin = async () => {
    const { userId } = await auth();

    if (!userId) {
        return false;
    }

    return allowedIds.indexOf(userId) !== -1;
}
    