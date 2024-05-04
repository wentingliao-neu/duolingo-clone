import { Footer } from "./Footer";
import Header from "./Header";

type MarketingLayoutProps = {
   children: React.ReactNode;
};

const MarketingLayout = ({ children }: MarketingLayoutProps) => {
   return (
      <div className="min-h-screen flex flex-col">
         <Header />
         <main className="flex flex-1 flex-col items-center justify-center">
            {children}
         </main>
         <Footer />
      </div>
   );
};

export default MarketingLayout;
