import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { quests } from "@/constants";
import { Progress } from "@/components/ui/progress";

type Props = {
   points: number;
};

function Quests({ points }: Props) {
   return (
      <div className="border-2 rounded-xl p-4 space-y-4 ">
         <div className="flex items-center justify-between w-full space-y-2">
            <h3 className="font-bold text-lg">Quests</h3>
            <Link href="/quests">
               <Button size="sm" variant="primaryOutline">
                  View All
               </Button>
            </Link>
         </div>
         <ul className="w-full space-y-4 ">
            {quests.map((quest) => {
               const progress = (points / quest.value) * 100;
               return (
                  <div
                     key={quest.title}
                     className="flex items-center w-full pb-4 gap-x-3 "
                  >
                     <Image
                        src="points.svg"
                        alt="points"
                        height={40}
                        width={40}
                     />
                     <div className="flex flex-col gap-y-2 w-full">
                        <p className="text-sm text-neutral-700 font-bold">
                           {quest.title}
                        </p>
                        <Progress value={progress} className="h-2" />
                     </div>
                  </div>
               );
            })}
         </ul>
      </div>
   );
}

export default Quests;
