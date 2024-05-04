import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../db/schema";
import { get } from "http";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const getOptions = (challengeId: number) => {
   const options = [
      [
         {
            challengeId: challengeId,
            imageSrc: "/man.svg",
            text: "el hombre",
            correct: true,
            audioSrc: "/es_man.mp3",
         },
         {
            challengeId: challengeId,
            imageSrc: "/woman.svg",
            audioSrc: "/es_woman.mp3",
            text: "la mujer",
            correct: false,
         },
         {
            challengeId: challengeId,
            text: "el robot",
            correct: false,
            imageSrc: "/robot.svg",
            audioSrc: "/es_robot.mp3",
         },
      ],
      [
         {
            challengeId: challengeId,
            imageSrc: "/woman.svg",
            audioSrc: "/es_woman.mp3",
            text: "la mujer",
            correct: true,
         },
         {
            challengeId: challengeId,
            imageSrc: "/man.svg",
            text: "el hombre",
            correct: false,
            audioSrc: "/es_man.mp3",
         },
         {
            challengeId: challengeId,
            imageSrc: "/boy.svg",
            text: "el chico",
            correct: false,
            audioSrc: "/es_boy.mp3",
         },
      ],
      [
         {
            challengeId: challengeId,
            imageSrc: "/woman.svg",
            audioSrc: "/es_woman.mp3",
            text: "la mujer",
            correct: false,
         },
         {
            challengeId: challengeId,
            imageSrc: "/man.svg",
            text: "el hombre",
            correct: false,
            audioSrc: "/es_man.mp3",
         },
         {
            challengeId: challengeId,
            imageSrc: "/boy.svg",
            text: "el chico",
            correct: true,
            audioSrc: "/es_boy.mp3",
         },
      ],
      [
         {
            challengeId: challengeId,
            text: "el hombre",
            correct: true,
            audioSrc: "/es_man.mp3",
         },
         {
            challengeId: challengeId,
            audioSrc: "/es_woman.mp3",
            text: "la mujer",
            correct: false,
         },
         {
            challengeId: challengeId,
            text: "el robot",
            correct: false,
            audioSrc: "/es_robot.mp3",
         },
      ],
      [
         {
            challengeId: challengeId,
            imageSrc: "/man.svg",
            text: "el hombre",
            correct: false,
            audioSrc: "/es_man.mp3",
         },
         {
            challengeId: challengeId,
            imageSrc: "/robot.svg",
            text: "el robot",
            correct: false,
            audioSrc: "/es_robot.mp3",
         },
         {
            challengeId: challengeId,
            imageSrc: "/zombie.svg",
            text: "el zombie",
            correct: true,
            audioSrc: "/es_zombie.mp3",
         },
      ],
      [
         {
            challengeId: challengeId,
            imageSrc: "/man.svg",
            text: "el hombre",
            correct: false,
            audioSrc: "/es_man.mp3",
         },
         {
            challengeId: challengeId,
            imageSrc: "/robot.svg",
            text: "el robot",
            correct: true,
            audioSrc: "/es_robot.mp3",
         },
         {
            challengeId: challengeId,
            imageSrc: "/zombie.svg",
            text: "el zombie",
            correct: false,
            audioSrc: "/es_zombie.mp3",
         },
      ],
      [
         {
            challengeId: challengeId,
            imageSrc: "/man.svg",
            text: "el hombre",
            correct: false,
            audioSrc: "/es_man.mp3",
         },
         {
            challengeId: challengeId,
            imageSrc: "/girl.svg",
            text: "la nina",
            correct: true,
            audioSrc: "/es_girl.mp3",
         },
         {
            challengeId: challengeId,
            imageSrc: "/zombie.svg",
            text: "el zombie",
            correct: false,
            audioSrc: "/es_zombie.mp3",
         },
      ],
      [
         {
            challengeId: challengeId,
            text: "el zombie",
            correct: true,
            audioSrc: "/es_zombie.mp3",
         },
         {
            challengeId: challengeId,
            audioSrc: "/es_woman.mp3",
            text: "la mujer",
            correct: false,
         },
         {
            challengeId: challengeId,
            text: "el chico",
            correct: false,
            audioSrc: "/es_boy.mp3",
         },
      ],
   ];
   return options[(challengeId - 1) % 8];
};

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
      await db.delete(schema.userSubscription);

      const courses = await db
         .insert(schema.courses)
         .values([{ title: "Spanish", imageSrc: "/es.svg", id: 1 }])
         .returning();

      for (const course of courses) {
         const units = await db
            .insert(schema.units)
            .values([
               {
                  courseId: course.id,
                  title: "Unit 1",
                  description: `Learn the basis of ${course.title}`,
                  order: 1,
               },
               {
                  courseId: course.id,
                  title: "Unit 2",
                  description: `Learn intermediate ${course.title}`,
                  order: 2,
               },
            ])
            .returning();
         for (const unit of units) {
            const lessons = await db
               .insert(schema.lessons)
               .values([
                  { unitId: unit.id, title: "Nouns", order: 1 },
                  { unitId: unit.id, title: "Verbs", order: 2 },
                  { unitId: unit.id, title: "Adjectives", order: 3 },
                  { unitId: unit.id, title: "Phrases", order: 4 },
                  { unitId: unit.id, title: "Sentences", order: 5 },
               ])
               .returning();
            for (const lesson of lessons) {
               const challenges = await db
                  .insert(schema.challenges)
                  .values([
                     {
                        lessonId: lesson.id,
                        type: "SELECT",
                        question: `Which one of these is "the man"?`,
                        order: 1,
                     },
                     {
                        lessonId: lesson.id,
                        type: "SELECT",
                        question: `Which one of these is "the woman"?`,
                        order: 2,
                     },
                     {
                        lessonId: lesson.id,
                        type: "SELECT",
                        question: `Which one of these is "the boy"?`,
                        order: 3,
                     },
                     {
                        lessonId: lesson.id,
                        type: "ASSIST",
                        question: `"The man"`,
                        order: 4,
                     },
                     {
                        lessonId: lesson.id,
                        type: "SELECT",
                        question: `Which one of these is "the zombie"?`,
                        order: 5,
                     },
                     {
                        lessonId: lesson.id,
                        type: "SELECT",
                        question: `Which one of these is "the robot"?`,
                        order: 6,
                     },
                     {
                        lessonId: lesson.id,
                        type: "SELECT",
                        question: `Which one of these is "the girl"?`,
                        order: 7,
                     },
                     {
                        lessonId: lesson.id,
                        type: "ASSIST",
                        question: `"The zombie"`,
                        order: 8,
                     },
                  ])
                  .returning();
               for (const challenge of challenges) {
                  await db
                     .insert(schema.challengeOptions)
                     .values(getOptions(challenge.id));
               }
            }
         }
      }
      console.log("Seeding finished");
   } catch (error) {
      console.log(error);
      throw new Error("Falied to seed database");
   }
};
main();
