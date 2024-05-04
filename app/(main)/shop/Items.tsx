"use client";

import { refillHearts } from "@/actions/user-progress";
import { createStripeUrl } from "@/actions/user-subscription";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTransition } from "react";
import { toast } from "sonner";
import { POINTS_TO_REFILL } from "@/constants";

type Props = {
   hearts: number;
   points: number;
   hasActiveSubscription: boolean;
};

function Items({ hearts, points, hasActiveSubscription }: Props) {
   const [pending, startTransition] = useTransition();
   function onRefillHearts() {
      if (pending || hearts === 5 || points < POINTS_TO_REFILL) return;

      startTransition(() => {
         refillHearts().catch(() => {
            toast.error("Error refilling hearts");
         });
      });
   }

   function onUpgrade() {
      startTransition(() => {
         createStripeUrl()
            .then((res) => {
               if (res.data) window.location.href = res.data;
            })
            .catch(() => {
               toast.error("Error upgrading subscription");
            });
      });
   }

   return (
      <ul className="w-full">
         <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
            <Image src="/heart.svg" alt="Heart" height={60} width={60} />
            <div className="flex-1">
               <p className="text-base lg:text-lg text-neutral-700 font-bold">
                  Refill hearts
               </p>
            </div>
            <Button
               onClick={onRefillHearts}
               disabled={pending || hearts === 5 || points < POINTS_TO_REFILL}
            >
               {hearts === 5 ? (
                  "full"
               ) : (
                  <div className="flex items-center">
                     <Image
                        src="points.svg"
                        alt="points"
                        height={20}
                        width={20}
                     />
                     <p>{POINTS_TO_REFILL}</p>
                  </div>
               )}
            </Button>
         </div>
         <div className="flex items-center w-full p-4 pt-8 gap-4 border-t-2">
            <Image
               src="/unlimited.svg"
               alt="unlimited"
               height={60}
               width={40}
            />
            <div className="flex-1">
               <p className="text-base lg:text-lg text-neutral-700 font-bold">
                  Unlimited hearts
               </p>
            </div>
            <Button onClick={onUpgrade} disabled={pending}>
               {hasActiveSubscription ? "settings" : "upgrade"}
            </Button>
         </div>
      </ul>
   );
}

export default Items;
