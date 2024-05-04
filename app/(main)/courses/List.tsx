"use client";
import { courses, userProgress } from "@/db/schema";
import Card from "./Card";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { upsertUserProgress } from "@/actions/user-progress";
import { toast } from "sonner";
type Props = {
   courses: (typeof courses.$inferSelect)[];
   activeCourseId?: typeof userProgress.$inferSelect.activeCourseId;
};
function List({ courses, activeCourseId }: Props) {
   const router = useRouter();
   const [pending, startTransition] = useTransition();
   const onClick = (courseId: number) => {
      if (pending) return;
      if (courseId === activeCourseId) return router.push("/learn");
      startTransition(() => {
         upsertUserProgress(courseId).catch(() => {
            toast.error("Somethintg went wrong");
         });
      });
   };
   return (
      <div className="pt-6 grid grid-cols-2 lg:grid-cols-[reapet(auto-fill,minmax(210px,1fr))] gap-4">
         {courses.map((course) => (
            <Card
               key={course.id}
               id={course.id}
               title={course.title}
               imageSrc={course.imageSrc}
               onClick={onClick}
               disabled={pending}
               active={course.id === activeCourseId}
            />
         ))}
      </div>
   );
}

export default List;
