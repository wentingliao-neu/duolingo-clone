import { MobileSideBar } from "./MobileSideBar";

interface MobileHeaderProps {
   // Define the props for the MobileHeader component here
}

const MobileHeader: React.FC<MobileHeaderProps> = () => {
   // Implement the MobileHeader component logic here

   return (
      // JSX code for the MobileHeader component
      <nav className="lg:hidden px-6 h-[50px] flex items-center bg-green-500 border-b fixed top-0 w-full z-50">
         <MobileSideBar />
      </nav>
   );
};

export default MobileHeader;
