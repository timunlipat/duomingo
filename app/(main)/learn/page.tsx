import { redirect } from "next/navigation";
import { getCourseProgress, getLessonPercentage, getUnits, getUserProgress, getUserSubscription } from "@/db/queries";
import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Header } from "./header";
import { UserProgress } from "@/components/user-progress";
import { Unit } from "./unit";

const Learn = async () => {
    const userProgressPromise = getUserProgress();
    const unitsPromise = getUnits();
    const courseProgressPromise = getCourseProgress();
    const lessonPercentagePromise = getLessonPercentage();
    const userSubscriptionPromise = getUserSubscription();
    
    const [
        userProgress, 
        units, 
        courseProgress, 
        lessonPercentage,
        userSubscription,
    ] = await Promise.all([
        userProgressPromise, 
        unitsPromise, 
        courseProgressPromise, 
        lessonPercentagePromise,
        userSubscriptionPromise,
    ]);

    if (!userProgress || !userProgress.activeCourse){
        redirect("/courses");
    }

    if (!courseProgress) {
        redirect("/courses");
    }

    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress
                    activeCourse={userProgress.activeCourse}
                    hearts={userProgress.hearts}
                    points={userProgress.points}
                    hasActiveSubscription={!!userSubscription?.isActive}
                />
            </StickyWrapper>
            <FeedWrapper>
                <Header title={userProgress.activeCourse.title}/>
                {units.map((unit) => (
                    <div key={unit.id} className="mb-10">
                        <Unit
                            id={unit.id}
                            order={unit.order}
                            description={unit.description}
                            title={unit.title}
                            lessons={unit.lessons}
                            activeLesson={courseProgress.activeLesson}
                            activeLessonPercentage={lessonPercentage}
                        />
                    </div>
                ))}
            </FeedWrapper>
        </div>
    )
}
export default Learn;