import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import SharedLayout from "../layout/SharedLayout";
import DeveloperJourney from "../components/Journey/JourneyMap";
import ReactDeveloperJourney from "../components/Journey/JourneyMap";
import About from "../pages/About/About"
import Home from "../pages/Home/Home";

const AppRoutes = () => {  
    return (
      <Routes>
  <Route path="/" element={<SharedLayout />}>
  <Route index element={<Home />} />
    {/* <Route path="/jour" element={<ReactDeveloperJourney />} /> */}
  </Route>
</Routes>

    );
  };
  
  export default AppRoutes;