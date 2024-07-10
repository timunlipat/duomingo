import "dotenv/config"
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

const main = async () => {
    try {
        console.log("Seeding database");
        await db.delete(schema.courses);
        await db.delete(schema.userProgress);
        await db.delete(schema.units);
        await db.delete(schema.lessons);
        await db.delete(schema.challenges);
        await db.delete(schema.challengeOptions);
        await db.delete(schema.challengeProgress);

        await db.insert(schema.courses).values([{ id:1, title:"Korean", imageSrc:"/korea.png" }]);
        await db.insert(schema.courses).values([{ id:2, title:"Japanese", imageSrc:"/japan.png" }]);
        await db.insert(schema.courses).values([{ id:3, title:"French", imageSrc:"/france.png" }]);
        await db.insert(schema.courses).values([{ id:4, title:"Spanish", imageSrc:"/spain.png" }]);

        await db.insert(schema.units).values([{ id:1, courseId:1, title:"Unit 1",description:"Learn the basics of Korean", order:1}]);

        await db.insert(schema.lessons).values([
            { id: 1, unitId: 1, order: 1, title: "Nouns", },
            { id: 2, unitId: 1, order: 2, title: "Verbs", },
            { id: 3, unitId: 1, order: 3, title: "Test", },
            { id: 4, unitId: 1, order: 4, title: "Test", },
            { id: 5, unitId: 1, order: 5, title: "Test", },
        ]);

        await db.insert(schema.challenges).values([
            { id: 1, lessonId: 1, type: "ASSIST", order: 1, question: '취미가 뭐예요?', },
            { id: 2, lessonId: 1, type: "ASSIST", order: 2, question: 'Which on of these is "the man"?', },
            { id: 3, lessonId: 1, type: "ASSIST", order: 3, question: 'Which on of these is "the woman"?', },
        ]);

        await db.insert(schema.challengeOptions).values([
            { challengeId: 1, correct: false, text: "Does Nicolas own a motorcycle?", },   
            { challengeId: 1, correct: true, text: "What are your hobbies?",},
            { challengeId: 1, correct: false, text: "What is she doing?",},
            { challengeId: 1, correct: false, text: "Can we study outside?",},
        ]);

        await db.insert(schema.challengeOptions).values([
            { challengeId: 2, correct: true, text: "남성", audioSrc: "/kr_man.mp3", },   
            { challengeId: 2, correct: false, text: "여성", audioSrc: "/kr_woman.mp3", },
            { challengeId: 2, correct: false, text: "로봇", audioSrc: "/kr_robot.mp3", },
        ]);

        await db.insert(schema.challengeOptions).values([
            { challengeId: 3, imageSrc: "/man.png", correct: false, text: "남성", audioSrc: "/kr_man.mp3", },   
            { challengeId: 3, imageSrc: "/woman.png", correct: true, text: "여성", audioSrc: "/kr_woman.mp3", },
            { challengeId: 3, imageSrc: "/robot.png", correct: false, text: "로봇", audioSrc: "/kr_robot.mp3", },
        ]);



        await db.insert(schema.challenges).values([
            { id: 4, lessonId: 2, type: "SELECT", order: 1, question: 'Which on of these is "the man"?', },
            { id: 5, lessonId: 2, type: "ASSIST", order: 2, question: '"the man"', },
            { id: 6, lessonId: 2, type: "SELECT", order: 3, question: 'Which on of these is "the woman"?', },
        ]);

        console.log("Seeding finished");
    } catch (error) {
        console.log(error);
        throw new Error("Failed to seed the database");
    }
};

main();
