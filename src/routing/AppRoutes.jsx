import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import SharedLayout from "../layout/SharedLayout";
import DeveloperJourney from "../components/Journey/JourneyMap";
import ReactDeveloperJourney from "../components/Journey/JourneyMap";
import About from "../pages/About/About";
// import PrivateRoutes from "../HOC/PrivateRoutes";

const AppRoutes = () => {
    // const allPermissions = useSelector((state) => state.auth.allPermissions);
    // const dispatch = useDispatch()
    // useEffect(()=>{
    // dispatch(fetchAllPermissions())
    // },[dispatch])
    // const checkPermission = (permissionKey) =>
    //   allPermissions[permissionKey]?.length > 0;
  
    return (
      <Routes>
  <Route path="/" element={<SharedLayout />}>
  <Route path="about" element={<About />} />
    {/* <Route index element={<ReactDeveloperJourney />} /> */}
  </Route>
</Routes>

    );
  };
  
  export default AppRoutes;