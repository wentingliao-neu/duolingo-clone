import FeedWrapper from "@/components/FeedWrapper";
import { SideBar } from "@/components/SideBar";
import StickyWrapper from "@/components/StickyWrapper";
import Header from "./Header";
import UserProgress from "@/components/UserProgress";
import {
   getUserProgress,
   getUnits,
   getCourseProgress,
   getLessonPergentage,
   getUserSubscription,
} from "@/db/queries";
import { redirect } from "next/navigation";
import Unit from "./Unit";
import Promo from "@/components/Promo";
import Quests from "@/components/Quests";

const LearnPage = async () => {
   const userProgressData = getUserProgress();
   const unitsData = getUnits();
   const courseProgressData = getCourseProgress();
   const lessonPercentageData = getLessonPergentage();
   const userSubscriptionData = getUserSubscription();
   const [
      userProgress,
      units,
      courseProgress,
      lessonPercentage,
      userSubscription,
   ] = await Promise.all([
      userProgressData,
      unitsData,
      courseProgressData,
      lessonPercentageData,
      userSubscriptionData,
   ]);
   if (!userProgress || !userProgress.activeCourse || !courseProgress)
      redirect("/courses");

   const isPro = !!userSubscription?.isActive;

   return (
      <div className="flex flex-row-reverse gap-[48px] px-6">
         <StickyWrapper>
            <UserProgress
               activeCourse={userProgress.activeCourse}
               hearts={userProgress.hearts}
               points={userProgress.points}
               hasActiveSubscription={isPro}
            />

            {!isPro && <Promo />}
            <Quests points={userProgress.points} />
         </StickyWrapper>
         <FeedWrapper>
            <Header title={userProgress.activeCourse.title} />
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
   );
};
export default LearnPage;
