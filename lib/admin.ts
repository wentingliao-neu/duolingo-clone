import { auth } from "@clerk/nextjs";

const adminIds = ["user_2ec9AwecTXBED3w8CLMQo8L4r9a"];

export const isAdmin = () => {
   const { userId } = auth();
   if (!userId) return false;
   return adminIds.includes(userId);
};
