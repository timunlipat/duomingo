"use client";

import { challengeOptions, challenges } from "@/db/schema";
import { useState } from "react";
import { Header } from "./header";
import { QuestionBubble } from "./question-bubble";
import { Challenge } from "./challenge";

type Props = {
    initialPercentage: number;
    initialHearts: number;
    initialLessonId: number;
    initialLessonChallenges: (typeof challenges.$inferInsert & {
        completed: boolean;
        challengeOptions: typeof challengeOptions.$inferInsert[];
    })[];
    userSubscription: any;
}
// TODO: Revisit
export const Quiz = ({initialPercentage, initialHearts, initialLessonId, initialLessonChallenges, userSubscription}: Props) => {
    const [hearts, setHearts] = useState(initialHearts);
    const [percentage, setPercentage] = useState(initialPercentage);
    const [challenges] = useState(initialLessonChallenges);
    const [activeIndex, setActiveIndex] = useState(() => {
        const uncompletedIndex = challenges.findIndex((challenge) => !challenge.completed);
        return uncompletedIndex === -1 ? 0 : uncompletedIndex;
    });
    const [selectedOption, setSelectedOption] = useState<number>();
    const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");

    const currentChallenge = challenges[activeIndex];
    const options = currentChallenge?.challengeOptions ?? [];

    const onSelect = (id: number) => {
        if (status !== "none") return;

        setSelectedOption(id);
    };

    const title = currentChallenge.type === "ASSIST" ? "Select the correct meaning" : currentChallenge.question;
    
    return (
        <>
            <Header
                hearts={hearts}
                percentage={percentage}
                hasActiveSubscription={!!userSubscription?.isActive}
            />
            <div className="flex-1">
                <div className="h-full flex items-center justify-center">
                    <div className="flex flex-col lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 gap-y-12">
                        <h1 className="text-lg lg:text-3xl text-center lg:test-start font-bold text-neutral-700">
                            {title}
                        </h1>
                        <div>
                            {currentChallenge.type === "ASSIST" && (
                                <QuestionBubble question={currentChallenge.question}/>
                            )}
                            <Challenge
                                options={options}
                                onSelect={onSelect}
                                status={status}
                                selectedOptions={selectedOption}
                                disabled={false}
                                type={currentChallenge.type}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}