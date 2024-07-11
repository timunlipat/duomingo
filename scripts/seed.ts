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


        await db.insert(schema.courses).values([{ id: 1, title:"Korean", imageSrc:"/korea.png" }]);
        
        //unit 1
        await db.insert(schema.units).values([{ id:1, courseId:1, title:"Beginner Level",description:"Learning Hangul, basic grammar, simple phrases.", order:1}]);

        await db.insert(schema.lessons).values([
            { id: 1, unitId: 1, order: 1, title: "Level 1", },
            { id: 2, unitId: 1, order: 2, title: "Level 2", },
            { id: 3, unitId: 1, order: 3, title: "Level 3", },
            { id: 4, unitId: 1, order: 4, title: "Level 4", },
            { id: 5, unitId: 1, order: 5, title: "Level 5", },
        ]);

        //  l1
        await db.insert(schema.challenges).values([
            { id: 1, lessonId: 1, type: "ASSIST", order: 1, question: "It's here.", },
            { id: 2, lessonId: 1, type: "ASSIST", order: 2, question: 'Which on of these is "the man"?', },
            { id: 3, lessonId: 1, type: "ASSIST", order: 3, question: "Isn't it?", },
        ]);

        await db.insert(schema.challengeOptions).values([
            { challengeId: 1, correct: true, text: "여기 있어요.", audioSrc: "/l1_q1_c1.mp3"},   
            { challengeId: 1, correct: false, text: "갑시다.", audioSrc: "/l1_q1_c2.mp3"},
            { challengeId: 1, correct: false, text: "때때로", audioSrc: "/l1_q1_c3.mp3"},
            { challengeId: 1, correct: false, text: "아직은 아니에요.", audioSrc: "/l1_q1_c4.mp3"},
        ]);

        await db.insert(schema.challengeOptions).values([   
            { challengeId: 2, correct: false, text: "여성", audioSrc: "/kr_woman.mp3", },
            { challengeId: 2, correct: false, text: "로봇", audioSrc: "/kr_robot.mp3", },
            { challengeId: 2, correct: true, text: "남성", audioSrc: "/kr_man.mp3", },
        ]);

        await db.insert(schema.challengeOptions).values([
            { challengeId: 3, correct: false, text: "당신은요?", audioSrc: "/l1_q3_c1.mp3", },   
            { challengeId: 3, correct: true, text: "아니에요?", audioSrc: "/l1_q3_c2.mp3", },
            { challengeId: 3, correct: false, text: "어느 것이요?", audioSrc: "/l1_q3_c3.mp3", },
            { challengeId: 3, correct: false, text: "전 괜찮아요, 당신은요?", audioSrc: "/l1_q3_c4.mp3", },
        ]);

        //  l2
        await db.insert(schema.challenges).values([
            { id: 4, lessonId: 2, type: "ASSIST", order: 1, question: "Will you pass me the salt please?", },
            { id: 5, lessonId: 2, type: "ASSIST", order: 2, question: "I would like to thank you for the opportunity.", },
            { id: 6, lessonId: 2, type: "ASSIST", order: 3, question: "My apartment has a view of the city.", },
        ]);

        await db.insert(schema.challengeOptions).values([
            { challengeId: 4, correct: false, text: "이메일에 어떻게 접속했어요?", audioSrc: "/l2_q1_c1.mp3"},   
            { challengeId: 4, correct: false, text: "토요일 아침에 그녀는 어디에 있었습니까?.", audioSrc: "/l2_q1_c2.mp3"},
            { challengeId: 4, correct: true, text: "그 소금 좀 건네줄래요?", audioSrc: "/l2_q1_c3.mp3"},
            { challengeId: 4, correct: false, text: "좋아하는 색깔이 뭐에요?", audioSrc: "/l2_q1_c4.mp3"},
        ]);

        await db.insert(schema.challengeOptions).values([
            { challengeId: 5, correct: true, text: "이메일에 어떻게 접속했어요?", audioSrc: "/l2_q2_c1.mp3"},   
            { challengeId: 5, correct: false, text: "내일 비가 올 거래요.", audioSrc: "/l2_q2_c2.mp3"},
            { challengeId: 5, correct: false, text: "그녀는 그룹 프로젝트의 리더입니다.", audioSrc: "/l2_q2_c3.mp3"},
            { challengeId: 5, correct: false, text: "그는 암 치료법을 발견했어요.", audioSrc: "l2_q2_c4"},
        ]);

        await db.insert(schema.challengeOptions).values([
            { challengeId: 6, correct: true, text: "제 아파트는 도시 경관을 가지고 있어요.", audioSrc: "/l2_q3_c1.mp3"},   
            { challengeId: 6, correct: false, text: "벽난로 주변을 조심하세요.", audioSrc: "/l2_q3_c2.mp3"},
            { challengeId: 6, correct: false, text: "오늘은 밖이 화창해요.", audioSrc: "/l2_q3_c3.mp3"},
            { challengeId: 6, correct: false, text: "박물관에는 비밀의 방이 있습니다.", audioSrc: "/l2_q3_c4.mp3"},
        ]);

        //  l3
        await db.insert(schema.challenges).values([
            { id: 7, lessonId: 3, type: "ASSIST", order: 1, question: "I will e-mail you tomorrow.", },
            { id: 8, lessonId: 3, type: "ASSIST", order: 2, question: "What is your plan to pass the class?", },
            { id: 9, lessonId: 3, type: "ASSIST", order: 3, question: "If you like it I can buy more.", },
        ]);

        await db.insert(schema.challengeOptions).values([
            { challengeId: 7, correct: false, text: "그 대학은 학생이 많아요.", audioSrc: "/l3_q1_c1.mp3"},   
            { challengeId: 7, correct: true, text: "내일 이메일로 보내겠습니다.", audioSrc: "/l3_q1_c2.mp3"},
            { challengeId: 7, correct: false, text: "당신은 매일 다른 일을 해요.", audioSrc: "/l3_q1_c3.mp3"},
            { challengeId: 7, correct: false, text: "그녀는 종종 아침을 먹지 않아요.", audioSrc: "/l3_q1_c4.mp3"},
        ]);

        await db.insert(schema.challengeOptions).values([
            { challengeId: 8, correct: true, text: "당신의 수업에 합격할 계획은 무엇입니까?", audioSrc: "/l3_q2_c1.mp3"},   
            { challengeId: 8, correct: false, text: "이 신발은 어때요?", audioSrc: "/l3_q2_c2.mp3"},
            { challengeId: 8, correct: false, text: "그 레스토랑에서 식사했어요?", audioSrc: "/l3_q2_c3.mp3"},
            { challengeId: 8, correct: false, text: "커피 드시겠어요, 차 드시겠어요?", audioSrc: "l3_q2_c4"},
        ]);

        await db.insert(schema.challengeOptions).values([
            { challengeId: 9, correct: false, text: "제 아파트는 도시 경관을 가지고 있어요.", audioSrc: "/l3_q3_c2.mp3"},
            { challengeId: 9, correct: false, text: "저는 부모님을 매우 존경합니다.", audioSrc: "/l3_q3_c3.mp3"},
            { challengeId: 9, correct: false, text: "당신에게 독점 오퍼를 내렸어요.", audioSrc: "/l3_q3_c4.mp3"},
            { challengeId: 9, correct: true, text: "당신이 좋다면 더 살 수 있어요.", audioSrc: "/l3_q3_c1.mp3"}, 
        ]);

        //  l4
        await db.insert(schema.challenges).values([
            { id: 10, lessonId: 4, type: "ASSIST", order: 1, question: "She suffers from her illness.", },
            { id: 11, lessonId: 4, type: "ASSIST", order: 2, question: "Be prepared for the powerful storm.", },
            { id: 12, lessonId: 4, type: "ASSIST", order: 3, question: "Language learning is fun to me.", },
        ]);

        await db.insert(schema.challengeOptions).values([
            { challengeId: 10, correct: false, text: "금은 희귀한 원소입니다.", audioSrc: "/l4_q1_c1.mp3"},   
            { challengeId: 10, correct: false, text: "저는 기타를 잘 치지 않아요.", audioSrc: "/l4_q1_c2.mp3"},
            { challengeId: 10, correct: true, text: "그녀는 병으로 고통받고 있어요.", audioSrc: "/l4_q1_c3.mp3"},
            { challengeId: 10, correct: false, text: "저는 프랑스어로 십까지 셀 수 있어요.", audioSrc: "/l4_q1_c4.mp3"},
        ]);

        await db.insert(schema.challengeOptions).values([
            { challengeId: 11, correct: false, text: "숲은 나무로 둘러싸여 있습니다.", audioSrc: "/l4_q2_c1.mp3"},   
            { challengeId: 11, correct: true, text: "강력한 폭풍에 대비하세요.", audioSrc: "/l4_q2_c2.mp3"},
            { challengeId: 11, correct: false, text: "취직이 되어서 기뻐요.", audioSrc: "/l4_q2_c3.mp3"},
            { challengeId: 11, correct: false, text: "우리는 종종 함께 책을 읽습니다.", audioSrc: "l4_q2_c4"},
        ]);

        await db.insert(schema.challengeOptions).values([
            { challengeId: 12, correct: true, text: "저는 언어 학습이 재미있어요.", audioSrc: "/l4_q3_c1.mp3"},   
            { challengeId: 12, correct: false, text: "오늘은 날씨가 맑아요.", audioSrc: "/l4_q3_c2.mp3"},
            { challengeId: 12, correct: false, text: "그는 야채를 많이 먹습니다.", audioSrc: "/l4_q3_c3.mp3"},
            { challengeId: 12, correct: false, text: "그 웹사이트의 디자인은 놀라워요.", audioSrc: "/l4_q3_c4.mp3"},
        ]);
        
        //  l5
        await db.insert(schema.challenges).values([
            { id: 13, lessonId: 5, type: "ASSIST", order: 1, question: "Are you working today?", },
            { id: 14, lessonId: 5, type: "ASSIST", order: 2, question: "We go to the movies.", },
            { id: 15, lessonId: 5, type: "ASSIST", order: 3, question: "This is very important.", },
        ]);

        await db.insert(schema.challengeOptions).values([
            { challengeId: 13, correct: false, text: "언제 떠나시나요?", audioSrc: "/l5_q1_c1.mp3"},   
            { challengeId: 13, correct: true, text: "오늘 일하세요?", audioSrc: "/l5_q1_c2.mp3"},
            { challengeId: 13, correct: false, text: "언제 도착해요?", audioSrc: "/l5_q1_c3.mp3"},
            { challengeId: 13, correct: false, text: "괜찮아요?", audioSrc: "/l5_q1_c4.mp3"},
        ]);

        await db.insert(schema.challengeOptions).values([
            { challengeId: 14, correct: false, text: "네, 괜찮아요.", audioSrc: "/l5_q2_c1.mp3"},   
            { challengeId: 14, correct: false, text: "좋은 저녁입니다.", audioSrc: "/l5_q2_c2.mp3"},
            { challengeId: 14, correct: true, text: "우리는 영화를 보러 갑니다.", audioSrc: "/l5_q2_c3.mp3"},
            { challengeId: 14, correct: false, text: "참 멋져요.", audioSrc: "l5_q2_c4"},
        ]);

        await db.insert(schema.challengeOptions).values([
            { challengeId: 15, correct: false, text: "저는 선생님이에요.", audioSrc: "/l5_q3_c1.mp3"},   
            { challengeId: 15, correct: false, text: "될 수 있는 대로 빨리.", audioSrc: "/l5_q3_c2.mp3"},
            { challengeId: 15, correct: true, text: "이것은 굉장히 중요해요.", audioSrc: "/l5_q3_c3.mp3"},
            { challengeId: 15, correct: false, text: "예약을 했어요.", audioSrc: "/l5_q3_c4.mp3"},
        ]);

//-------------------------------------------------------------------------------------------------------------------------
        
        //unit 2

         await db.insert(schema.units).values([{ id: 2, courseId: 1, title:"Intermediate Level",description:"Expanded vocabulary, complex grammar, everyday conversations.", order:2}]);
 
         await db.insert(schema.lessons).values([
             { id: 6, unitId: 2, order: 1, title: "Level 1", },
             { id: 7, unitId: 2, order: 2, title: "Level 2", },
             { id: 8, unitId: 2, order: 3, title: "Level 3", },
            //  { id: 9, unitId: 2, order: 4, title: "Level 4", },
            //  { id: 10, unitId: 2, order: 5, title: "Level 5", },
         ]);
 
         //  l1
         await db.insert(schema.challenges).values([
             { id: 16, lessonId: 6, type: "ASSIST", order: 1, question: "The new law was controversial.", },
             { id: 17, lessonId: 6, type: "ASSIST", order: 2, question: "Does she trust him?", },
             { id: 18, lessonId: 6, type: "ASSIST", order: 3, question: "You have a beautiful voice.", },
         ]);
 
         await db.insert(schema.challengeOptions).values([
            { challengeId: 16, correct: true, text: "그 새로운 법은 논란이 되었습니다.", audioSrc: "/u2_l1_q1_c2.mp3"},
            { challengeId: 16, correct: false, text: "별로 비싸지 않아요.", audioSrc: "/u2_l1_q1_c1.mp3"},   
             { challengeId: 16, correct: false, text: "전화하고 싶어요.", audioSrc: "/u2_l1_q1_c3.mp3"},
             { challengeId: 16, correct: false, text: "그는 괜찮아요.", audioSrc: "/u2_l1_q1_c4.mp3"},
         ]);
 
         await db.insert(schema.challengeOptions).values([
            { challengeId: 17, correct: false, text: "부탄에 대해 어떻게 들었어요?", audioSrc: "/u2_l1_q2_c1.mp3"},   
            { challengeId: 17, correct: false, text: "그들은 농구를 좋아합니까?", audioSrc: "/u2_l1_q2_c3.mp3"},
            { challengeId: 17, correct: false, text: "돈은 충분히 있어요?", audioSrc: "/u2_l1_q2_c4.mp3"},
            { challengeId: 17, correct: true, text: "그녀는 그를 믿나요?", audioSrc: "/u2_l1_q2_c2.mp3"},
        ]);
 
         await db.insert(schema.challengeOptions).values([
             { challengeId: 18, correct: false, text: "공항까지 가 주세요.", audioSrc: "/u2_l1_q3_c1.mp3", },   
             { challengeId: 18, correct: true, text: "그는 크리켓을 좋아하지 않아요.", audioSrc: "/u2_l1_q3_c2.mp3", },
             { challengeId: 18, correct: false, text: "목소리가 아름답군요.", audioSrc: "/u2_l1_q3_c3.mp3", },
             { challengeId: 18, correct: false, text: "그녀는 목욕을 했습니다.", audioSrc: "/u2_l1_q3_c4.mp3", },
         ]);

         //  l2
         await db.insert(schema.challenges).values([
            { id: 19, lessonId: 7, type: "ASSIST", order: 1, question: "I owe you a favor.", },
            { id: 20, lessonId: 7, type: "ASSIST", order: 2, question: "At what time did it happen?", },
            { id: 21, lessonId: 7, type: "ASSIST", order: 3, question: "I've never seen that before.", },
        ]);

        await db.insert(schema.challengeOptions).values([
            { challengeId: 19, correct: true, text: "다음에는 제가 도와 줄께요.", audioSrc: "/u2_l2_q1_c1.mp3"},   
            { challengeId: 19, correct: false, text: "이 연못은 얕아요.", audioSrc: "/u2_l2_q1_c2.mp3"},
            { challengeId: 19, correct: false, text: "실수를 하는 것은 정상입니다.", audioSrc: "/u2_l2_q1_c3.mp3"},
            { challengeId: 19, correct: false, text: "아내가 하라고 했어요.", audioSrc: "/u2_l2_q1_c4.mp3"},
        ]);

        await db.insert(schema.challengeOptions).values([
           { challengeId: 20, correct: false, text: "요리할 줄 아세요?", audioSrc: "/u2_l2_q2_c1.mp3"},   
           { challengeId: 20, correct: false, text: "아이들은 몇살이죠?", audioSrc: "/u2_l2_q2_c3.mp3"},
           { challengeId: 20, correct: false, text: "이 근처에 가게가 있나요?", audioSrc: "/u2_l2_q2_c4.mp3"},
           { challengeId: 20, correct: true, text: "그 일이 몇 시에 일어났습니까?", audioSrc: "/u2_l2_q2_c2.mp3"},
       ]);

        await db.insert(schema.challengeOptions).values([
            { challengeId: 21, correct: false, text: "기분 나쁜 말 하지 마세요.", audioSrc: "/u2_l2_q3_c1.mp3", },   
            { challengeId: 21, correct: true, text: "보통 비가 오지 않아요.", audioSrc: "/u2_l2_q3_c2.mp3", },
            { challengeId: 21, correct: false, text: "전에 그걸 본 적이 없어요.", audioSrc: "/u2_l2_q3_c3.mp3", },
            { challengeId: 21, correct: false, text: "그녀는 자기 어머니를 닮았어요.", audioSrc: "/u2_l2_q3_c4.mp3", },
        ]);

        //  l3
        await db.insert(schema.challenges).values([
            { id: 22, lessonId: 8, type: "ASSIST", order: 1, question: "I've never seen that before.", },
            { id: 23, lessonId: 8, type: "ASSIST", order: 2, question: "One way or round trip?", },
            { id: 24, lessonId: 8, type: "ASSIST", order: 3, question: "Did you do research at the university?", },
        ]);

        await db.insert(schema.challengeOptions).values([
            { challengeId: 22, correct: false, text: "기분 나쁜 말 하지 마세요.", audioSrc: "/u2_l3_q1_c1.mp3"},   
            { challengeId: 22, correct: false, text: "보통 비가 오지 않아요.", audioSrc: "/u2_l3_q1_c2.mp3"},
            { challengeId: 22, correct: true, text: "전에 그걸 본 적이 없어요.", audioSrc: "/u2_l3_q1_c3.mp3"},
            { challengeId: 22, correct: false, text: "그녀는 자기 어머니를 닮았어요.", audioSrc: "/u2_l3_q1_c4.mp3"},
        ]);

        await db.insert(schema.challengeOptions).values([
           { challengeId: 23, correct: false, text: "그는 어느 학교에 다닙니까?", audioSrc: "/u2_l3_q2_c1.mp3"},   
           { challengeId: 23, correct: true, text: "편도인가요, 왕복인가요?", audioSrc: "/u2_l3_q2_c3.mp3"},
           { challengeId: 23, correct: false, text: "병원은 어디에 있습니까?", audioSrc: "/u2_l3_q2_c4.mp3"},
           { challengeId: 23, correct: false, text: "당신은 그 문제에 어떻게 접근하겠습니까?", audioSrc: "/u2_l3_q2_c2.mp3"},
       ]);

        await db.insert(schema.challengeOptions).values([
            { challengeId: 24, correct: true, text: "대학에서 연구했어요?", audioSrc: "/u2_l3_q3_c2.mp3", },
            { challengeId: 24, correct: false, text: "그것을 영어로 어떻게 말하나요?", audioSrc: "/u2_l3_q3_c1.mp3", },   
            { challengeId: 24, correct: false, text: "재미있는 거 보고 있어요?", audioSrc: "/u2_l3_q3_c3.mp3", },
            { challengeId: 24, correct: false, text: "가장 유력한 설명은 무엇입니까?", audioSrc: "/u2_l3_q3_c4.mp3", },
        ]);

//-------------------------------------------------------------------------------------------------------------------------
        
        //unit 3

        await db.insert(schema.units).values([{ id:3, courseId:1, title:"Advanced Level",description:"Fluency, nuanced conversation, sophisticated texts.", order:3}]);
 
        await db.insert(schema.lessons).values([
            { id: 9, unitId: 3, order: 1, title: "Level 1", },
            { id: 10, unitId: 3, order: 2, title: "Level 2", },
            // { id: 11, unitId: 3, order: 3, title: "Level 3", },
           //  { id: 9, unitId: 3, order: 4, title: "Level 4", },
           //  { id: 10, unitId: 3, order: 5, title: "Level 5", },
        ]);

        //  l1
        await db.insert(schema.challenges).values([
            { id: 25, lessonId: 9, type: "ASSIST", order: 1, question: "When was the last time you visited your grandparents? -- Just one week ago.", },
            { id: 26, lessonId: 9, type: "ASSIST", order: 2, question: "We had a fun spring break. How about them? Did they have a fun spring break?", },
            { id: 27, lessonId: 9, type: "ASSIST", order: 3, question: "His medical condition makes it hard for him to run long distances.", },
        ]);

        await db.insert(schema.challengeOptions).values([
            { challengeId: 25, correct: false, text: "그녀가 사는 곳에 눈이 자주 오나요? - 네, 눈이 자주 옵니다.", audioSrc: "/u3_l1_q1_c1.mp3"},   
            { challengeId: 25, correct: false, text: "우리는 즐거운 봄방학을 보냈어요. 그들은 어떤가요? 그들은 즐거운 봄방학을 보냈나요?", audioSrc: "/u3_l1_q1_c2.mp3"},
            { challengeId: 25, correct: true, text: "조부모님을 마지막으로 방문한 게 언제죠? - 딱 일주일 전에요.", audioSrc: "/u3_l1_q1_c3.mp3"},
            { challengeId: 25, correct: false, text: "샌프란시스코 자이언츠가 작년에 월드시리즈에서 우승했나요?", audioSrc: "/u3_l1_q1_c4.mp3"},
        ]);

        await db.insert(schema.challengeOptions).values([
           { challengeId: 26, correct: false, text: "소리를 지르는 대신 조용히 있는 것으로 사태를 수습했습니다.", audioSrc: "/u3_l1_q2_c1.mp3"},   
           { challengeId: 26, correct: true, text: "우리는 즐거운 봄방학을 보냈어요. 그들은 어떤가요? 그들은 즐거운 봄방학을 보냈나요?", audioSrc: "/u3_l1_q2_c2.mp3"},
           { challengeId: 26, correct: false, text: "그 건물은 튼튼해 보이지 않아요. 구조적인 문제가 있는 것 같아요.", audioSrc: "/u3_l1_q2_c3.mp3"},
           { challengeId: 26, correct: false, text: "회사에서 긴 하루를 보낸 후, 저는 소파에 앉아 쉬었습니다.", audioSrc: "/u3_l1_q2_c4.mp3"},
       ]);

        await db.insert(schema.challengeOptions).values([
            { challengeId: 27, correct: false, text: "그의 건강 상태는 그가 장거리 달리기를 하는 것을 어렵게 만듭니다.", audioSrc: "/u3_l1_q3_c1.mp3", },   
            { challengeId: 27, correct: false, text: "자판기에 동전을 한 움큼 넣었어요.", audioSrc: "/u3_l1_q3_c3.mp3", },
            { challengeId: 27, correct: false, text: "제 영어 문학 수업은 도전입니다만, 합격할 것 같습니다.", audioSrc: "/u3_l1_q3_c4.mp3", },
            { challengeId: 27, correct: true, text: "제 페이스북 게시물은 많은 사람들의 호감을 샀지만, 아직 아무도 그것을 공유하지 않았어요.", audioSrc: "/u3_l1_q3_c2.mp3", },
        ]);

        //  l2
        await db.insert(schema.challenges).values([
            { id: 28, lessonId: 10, type: "ASSIST", order: 1, question: "His medical condition makes it hard for him to run long distances.", },
            { id: 29, lessonId: 10, type: "ASSIST", order: 2, question: "I wash my hair two times per day. This evening I washed my hair.", },
            { id: 30, lessonId: 10, type: "ASSIST", order: 3, question: "Even though your goals are ambitious, I think you can achieve them.", },
        ]);

        await db.insert(schema.challengeOptions).values([
            { challengeId: 28, correct: true, text: "그의 건강 상태는 그가 장거리 달리기를 하는 것을 어렵게 만듭니다.", audioSrc: "/u3_l2_q1_c1.mp3"},   
            { challengeId: 28, correct: false, text: "제 페이스북 게시물은 많은 사람들의 호감을 샀지만, 아직 아무도 그것을 공유하지 않았어요.", audioSrc: "/u3_l2_q1_c2.mp3"},
            { challengeId: 28, correct: false, text: "자판기에 동전을 한 움큼 넣었어요.", audioSrc: "/u3_l2_q1_c3.mp3"},
            { challengeId: 28, correct: false, text: "제 영어 문학 수업은 도전입니다만, 합격할 것 같습니다.", audioSrc: "/u3_l2_q1_c4.mp3"},
        ]);

        await db.insert(schema.challengeOptions).values([
           { challengeId: 29, correct: false, text: "친한 친구의 결혼식에 참석하지 않아서 죄책감이 들어요.", audioSrc: "/u3_l2_q2_c1.mp3"},   
           { challengeId: 29, correct: false, text: "Satya는 클라리넷을 연주하곤 했지만, 그는 색소폰으로 바꿨습니다.", audioSrc: "/u3_l2_q2_c2.mp3"},
           { challengeId: 29, correct: true, text: "저는 하루에 두 번 머리를 감습니다. 오늘 저녁에 머리를 감았어요.", audioSrc: "/u3_l2_q2_c3.mp3"},
           { challengeId: 29, correct: false, text: "그 건물은 튼튼해 보이지 않아요. 구조적인 문제가 있는 것 같아요.", audioSrc: "/u3_l2_q2_c4.mp3"},
       ]);

        await db.insert(schema.challengeOptions).values([
            { challengeId: 30, correct: false, text: "그의 건강 상태는 그가 장거리 달리기를 하는 것을 어렵게 만듭니다.", audioSrc: "/u3_l2_q3_c1.mp3", },   
            { challengeId: 30, correct: false, text: "그녀의 오토바이는 더러워요 그녀는 오토바이를 청소하고 있어요. 그녀는 오토바이를 청소했어요.", audioSrc: "/u3_l2_q3_c2.mp3", },
            { challengeId: 30, correct: true, text: "비록 여러분의 목표가 야심 차긴 하지만, 저는 여러분이 그것을 성취할 수 있다고 생각해요.", audioSrc: "/u3_l2_q3_c3.mp3", },
            { challengeId: 30, correct: false, text: "설문지를 작성하면 새 차를 탈 수 있는 기회가 생깁니다.", audioSrc: "/u3_l2_q3_c4.mp3", },
        ]);

    //     //  l3
    //     await db.insert(schema.challenges).values([
    //         { id: 25, lessonId: 11, type: "ASSIST", order: 1, question: "", },
    //         { id: 26, lessonId: 11, type: "ASSIST", order: 2, question: "", },
    //         { id: 27, lessonId: 11, type: "ASSIST", order: 3, question: "", },
    //     ]);

    //     await db.insert(schema.challengeOptions).values([
    //         { challengeId: 25, correct: false, text: "", audioSrc: "/u3_l2_q1_c1.mp3"},   
    //         { challengeId: 25, correct: false, text: "", audioSrc: "/u3_l2_q1_c2.mp3"},
    //         { challengeId: 25, correct: true, text: "", audioSrc: "/u3_l2_q1_c3.mp3"},
    //         { challengeId: 25, correct: false, text: "", audioSrc: "/u3_l2_q1_c4.mp3"},
    //     ]);

    //     await db.insert(schema.challengeOptions).values([
    //        { challengeId: 26, correct: false, text: "", audioSrc: "/u3_l2_q2_c1.mp3"},   
    //        { challengeId: 26, correct: true, text: "", audioSrc: "/u3_l2_q2_c2.mp3"},
    //        { challengeId: 26, correct: false, text: "", audioSrc: "/u3_l2_q2_c3.mp3"},
    //        { challengeId: 26, correct: false, text: "", audioSrc: "/u3_l2_q2_c4.mp3"},
    //    ]);

    //     await db.insert(schema.challengeOptions).values([
    //         { challengeId: 27, correct: false, text: "", audioSrc: "/u3_l2_q3_c1.mp3", },   
    //         { challengeId: 27, correct: true, text: "", audioSrc: "/u3_l2_q3_c2.mp3", },
    //         { challengeId: 27, correct: false, text: ".", audioSrc: "/u3_l2_q3_c3.mp3", },
    //         { challengeId: 27, correct: false, text: "", audioSrc: "/u3_l2_q3_c4.mp3", },
    //     ]);



        console.log("Seeding finished");
    } catch (error) {
        console.log(error);
        throw new Error("Failed to seed the database");
    }
};

main();
