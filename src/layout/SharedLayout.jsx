import { useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";
import SocialIcons from "./LeftSideIcons";
import EmailLink from "./RightSideIcons";

const SharedLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
    <div className="flex flex-col flex-1 overflow-x-auto">
      <NavBar/>
      {/* Show Loader if isLoading is true */}
      {/* {isLoading && <Loader />}
      <div className="px-12">
        <CustomTabs />
        <CustomSubTabs />
      </div> */}
      <main className="flex-1 overflow-auto no-scrollbar bg-botpulseOutletBg">
        <div className="min-h-[calc(100vh-150px)] flex flex-col bg-botpulseOutletBg">
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </main>
      <div className="relative bg-[#0a192f] text-white">
      <SocialIcons />
      <EmailLink/>
      {/* Your page content */}
    </div>
    </div>
  </div>
  );
};

export default SharedLayout;
