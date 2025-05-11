import { useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";
import SocialIcons from "./LeftSideIcons";
import EmailLink from "./RightSideIcons";
import Footer from "../components/Footer/Footer";

const SharedLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
    <div className="flex flex-col flex-1 overflow-x-auto">
      <NavBar/>
      <main className="flex-1 overflow-auto no-scrollbar bg-botpulseOutletBg">
        <div className="min-h-[calc(100vh-150px)] flex flex-col bg-botpulseOutletBg">
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </main>
      <div className="relative bg-[#0a192f] text-white">
      <div className="hidden lg:flex">
      <SocialIcons />
      <EmailLink/>
      </div>
      <div className="lg:hidden"><Footer/></div>
    </div>
    </div>
  </div>
  );
};

export default SharedLayout;
