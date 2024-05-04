import { NextResponse } from "next/server";
import db from "@/db/drizzle";
import { isAdmin } from "@/lib/admin";
import { lessons } from "@/db/schema";

export const GET = async () => {
   if (!isAdmin()) return new NextResponse("Unauthorized", { status: 403 });

   const data = await db.query.lessons.findMany();
   return new NextResponse(JSON.stringify(data), {
      headers: {
         "Content-Type": "application/json",
      },
   });
};

export const POST = async (req: Request) => {
   if (!isAdmin()) return new NextResponse("Unauthorized", { status: 403 });
   const body = await req.json();

   const data = await db
      .insert(lessons)
      .values({ ...body })
      .returning();
   return new NextResponse(JSON.stringify(data[0]), {
      headers: {
         "Content-Type": "application/json",
      },
   });
};
