import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Square from "./Components/textSquares.jsx";
import Footer from "./Components/fancyFooter.jsx";
import RegisterHome from "./Pages/Register.Page.jsx";
import LoginHome from "./Pages/Login.Page.jsx";
import UserListHome from "./Pages/UserList.Home.jsx";
import BugContainer from "./Components/Bugs/bug.List.Container.jsx";
import { useContext } from "react";
import CreateNewBug from "./Pages/NewBug.Home.jsx";
import BugListHome from "./Pages/BugList.Home.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChangeProfileInfo from "./Components/Profile/profile.Info.jsx";
import Navigation from "./Components/Landing Page/starterPage.jsx";
import NavBar from "./Components/navBar.jsx";
import NotFound from "./Components/404.error.page.jsx";
import ConfirmUser from "./Route Protection/route.Protection.jsx";
import SingleBugInfo from "./Components/Bugs/single.Bug.info.jsx";
function App() {
  const location = useLocation();

  return (
    <div className="home">
      <NavBar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Navigation />} />
        <Route path="/user/register" element={<RegisterHome />} />
        <Route path="/user/login" element={<LoginHome />} />
        <Route element={<ConfirmUser />}>
          <Route path="/user/list" element={<UserListHome />} />
          <Route path="/user/profile" element={<ChangeProfileInfo />} />
          <Route path="/bug/list" element={<BugListHome />} />
          <Route path="/bug/report" element={<CreateNewBug />} />
          <Route path="/bug/list/:id" element={<SingleBugInfo/>} />
        </Route>

        <Route path="/*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
