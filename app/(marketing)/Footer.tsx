import { Button } from "@/components/ui/button";
import Image from "next/image";

const languages = [
   {
      name: "Croatian",
      image: "/hr.svg",
   },
   {
      name: "French",
      image: "/fr.svg",
   },
   {
      name: "Japanese",
      image: "/jp.svg",
   },
   {
      name: "Italian",
      image: "/it.svg",
   },
   {
      name: "Spanish",
      image: "/es.svg",
   },
];

export const Footer = () => {
   return (
      <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
         <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
            {languages.map((language) => (
               <Button
                  key={language.name}
                  size="lg"
                  variant="ghost"
                  className="w-full"
               >
                  <Image
                     src={language.image}
                     alt={language.name}
                     height={32}
                     width={40}
                     className="mr-4 rounded-md"
                  />
                  {language.name}
               </Button>
            ))}
         </div>
      </footer>
   );
};
