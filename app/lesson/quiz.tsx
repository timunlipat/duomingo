"use client";

import Image from "next/image";
import { toast } from "sonner";
import { useAudio, useMount, useWindowSize } from "react-use";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import Confetti from "react-confetti";

import { Header } from "./header";
import { challengeOptions, challenges } from "@/db/schema";
import { QuestionBubble } from "./question-bubble";
import { Challenge } from "./challenge";
import { Footer } from "./footer";
import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { reduceHearts } from "@/actions/user-progress";
import { ResultCard } from "./result-card";

import { useHeartsModal } from "@/store/use-hearts-modal";
import { usePracticeModal } from "@/store/use-practice-modal";

type Props = {
    initialPercentage: number;
    initialHearts: number;
    initialLessonId: number;
    initialLessonChallenges: (typeof challenges.$inferSelect & {
        completed: boolean;
        challengeOptions: typeof challengeOptions.$inferSelect[];
    })[];
    userSubscription: any;
}
// TODO: Revisit
export const Quiz = ({initialPercentage, initialHearts, initialLessonId, initialLessonChallenges, userSubscription}: Props) => {
    const { open: openHeartsModal } = useHeartsModal();
    const { open: openPracticeModal } = usePracticeModal();

    useMount(() => {
        if (initialPercentage === 100) {
            openPracticeModal();
        }
    });

    const { width, height } = useWindowSize();

    const router = useRouter();

    const [finishAudio] = useAudio({ src: "/finish.mp3", autoPlay: true });
    const [correctAudio, _c, correctControls] = useAudio({ src: "/correct.mp3"});
    const [wrongAudio, _w, wrongControls] = useAudio({ src: "/wrong.mp3"});

    const [pending, startTransition] = useTransition();

    const [lessonId] = useState(initialLessonId);
    const [hearts, setHearts] = useState(initialHearts);
    const [percentage, setPercentage] = useState(() => {
        return (initialPercentage === 100 ? 0 : initialPercentage);
    });
    const [challenges] = useState(initialLessonChallenges);
    const [activeIndex, setActiveIndex] = useState(() => {
        const uncompletedIndex = challenges.findIndex((challenge) => !challenge.completed);
        return uncompletedIndex === -1 ? 0 : uncompletedIndex;
    });
    const [selectedOption, setSelectedOption] = useState<number>();
    const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");

    const currentChallenge = challenges[activeIndex];
    const options = currentChallenge?.challengeOptions ?? [];

    const onNext = () => {
        setActiveIndex((current) => current + 1);
    };

    const onSelect = (id: number) => {
        if (status !== "none") return;

        setSelectedOption(id);
    };

    const onContinue = () => {
        if (!selectedOption) return;

        if (status === "wrong") {
            setStatus("none");
            setSelectedOption(undefined);
            return;
        }

        if (status === "correct") {
            onNext();
            setStatus("none");
            setSelectedOption(undefined);
            return;
        }

        const correctOption = options.find((option) => option.correct);

        if (!correctOption) {
            return;
        }

        if (correctOption && correctOption.id === selectedOption) {
            startTransition(() => {
                upsertChallengeProgress(currentChallenge.id).then((response) => {
                    if(response?.error === "hearts") {
                        openHeartsModal();
                        return;
                    }

                    correctControls.play();
                    setStatus("correct");
                    setPercentage((prev) => prev + 100 / challenges.length);

                    if (initialPercentage === 100) {
                        setHearts((prev) => Math.min(prev + 1, 5));
                    }
                })
                .catch(() => toast.error("Something went wrong. Please try again later."))
            })
        } else {
            startTransition(() => {
                reduceHearts(currentChallenge.id).then((response) => {
                    if (response?.error === "hearts") {
                        openHeartsModal();
                        return;
                    }

                    wrongControls.play();
                    setStatus("wrong");

                    if(!response?.error) {
                        setHearts((prev) => Math.max(prev - 1,0));
                    }
                })
            })
        }
    };

    if (!currentChallenge) {
        return (
            <>
                {finishAudio}
                <Confetti
                    width={width}
                    height={height}
                    recycle={false}
                    numberOfPieces={2000}
                    tweenDuration={10000}
                    gravity={0.02}
                />
                <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
                    <Image
                        src="/finish.svg"
                        alt="Finish"
                        className="hidden lg:block"
                        height={100}
                        width={100}
                    />
                    <Image
                        src="/finish.svg"
                        alt="Finish"
                        className="block lg:hidden"
                        height={50}
                        width={50}
                    />
                    <h1 className="text-xl lg:text-3xl font-bold text-neutral-700">
                        Great job! <br/> You've completed the lesson.
                    </h1>
                    <div className="flex items-center gap-x-4 w-full">
                        <ResultCard
                            variant="points"
                            value={challenges.length * 10}
                        />
                        <ResultCard
                            variant="hearts"
                            value={hearts}
                        />
                    </div>
                </div>
                <Footer
                    lessonId={lessonId}
                    status="completed"
                    onCheck={() => router.push("/learn")}
                />
            </>
        )
    };

    const title = currentChallenge.type === "ASSIST" ? "Select the correct meaning" : currentChallenge.question;
    
    return (
        <>
            {wrongAudio}
            {correctAudio}
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
                                disabled={pending}
                                type={currentChallenge.type}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer
                disabled={pending || !selectedOption}
                status={status}
                onCheck={onContinue}
            />
        </>
    )
}