import "./App.css";
import { NavLink, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  User,
  Home,
  MessageCircle,
  TrendingUp,
  MoreHorizontal,
} from "lucide-react";

import BrandLogo from "./assets/brand.svg";

import HomePage from "./pages/Home";
import Assistant from "./pages/Assistant";
import Tracker from "./pages/Tracker";
import More from "./pages/More";
import Profile from "./pages/Profile";
import Doc from "./pages/Doc";
import Situations from "./pages/Situations";
import SituationFear from "./pages/SituationFear";
import SituationRelationships from "./pages/SituationRelationships";
import SituationLoneliness from "./pages/SituationLoneliness";
import SituationApathy from "./pages/SituationApathy";
import SituationSelfEsteem from "./pages/SituationSelfEsteem";
import SituationDating from "./pages/SituationDating";
import PracticeBreathing from "./pages/PracticeBreathing";
import PracticeBoundaries from "./pages/PracticeBoundaries";
import PracticeSelfLove from "./pages/PracticeSelfLove";
import PracticeMotivation from "./pages/PracticeMotivation";
import PracticeSelfWorth from "./pages/PracticeSelfWorth";
import PracticeRedFlags from "./pages/PracticeRedFlags";
import MusicCategories from "./pages/MusicCategories";
import MusicPlayer from "./pages/MusicPlayer";

function Shell() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const hideMainChrome =
    path === "/assistant" ||
    path === "/profile" ||
    path === "/tracker" ||
    path === "/more" ||
    path === "/situations" ||
    path === "/music" ||
    path.startsWith("/situation/") ||
    path.startsWith("/practice/") ||
    path.startsWith("/music/") ||
    path.startsWith("/doc/");

  const isIsolatedScreen = hideMainChrome;

  return (
    <div className="appWrapper">
      <div className={`app${isIsolatedScreen ? " assistantApp" : ""}`}>
        {!hideMainChrome && (
          <header className="header">
            <div className="iconBtn logoBtn" aria-hidden="true">
              <img src={BrandLogo} className="brandMark" alt="" />
            </div>

            <div className="headerRight">
              <button className="iconBtn" aria-label="Поиск">
                <Search size={44} strokeWidth={2.5} />
              </button>

              <button className="iconBtn" aria-label="Уведомления">
                <Bell size={44} strokeWidth={2.5} />
              </button>

              <div className="balancePill">
                <span className="balanceText">0.00</span>
              </div>

              <button
                className="iconBtn profileBtn"
                aria-label="Профиль"
                onClick={() => navigate("/profile")}
              >
                <User size={44} strokeWidth={2.5} />
              </button>
            </div>
          </header>
        )}

        <main className={`mainContent${isIsolatedScreen ? " assistantMain" : ""}`}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            
            {/* Situations */}
            <Route path="/situations" element={<Situations />} />
            <Route path="/situation/fear" element={<SituationFear />} />
            <Route path="/situation/relationships" element={<SituationRelationships />} />
            <Route path="/situation/loneliness" element={<SituationLoneliness />} />
            <Route path="/situation/apathy" element={<SituationApathy />} />
            <Route path="/situation/selfesteem" element={<SituationSelfEsteem />} />
            <Route path="/situation/dating" element={<SituationDating />} />
            
            {/* Practices */}
            <Route path="/practice/breathing" element={<PracticeBreathing />} />
            <Route path="/practice/boundaries" element={<PracticeBoundaries />} />
            <Route path="/practice/selflove" element={<PracticeSelfLove />} />
            <Route path="/practice/motivation" element={<PracticeMotivation />} />
            <Route path="/practice/selfworth" element={<PracticeSelfWorth />} />
            <Route path="/practice/redflags" element={<PracticeRedFlags />} />
            
            {/* Music */}
            <Route path="/music" element={<MusicCategories />} />
            <Route path="/music/:category" element={<MusicPlayer />} />
            
            {/* Main pages */}
            <Route path="/assistant" element={<Assistant />} />
            <Route path="/tracker" element={<Tracker />} />
            <Route path="/more" element={<More />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/doc/:id" element={<Doc />} />
          </Routes>
        </main>

        {!hideMainChrome && (
          <>
            <nav className="bottomNav">
              <NavLink to="/" className={({ isActive }) => `navItem${isActive ? " active" : ""}`}>
                <Home size={32} />
                <span>Главная</span>
              </NavLink>

              <NavLink
                to="/tracker"
                className={({ isActive }) => `navItem${isActive ? " active" : ""}`}
              >
                <TrendingUp size={32} />
                <span>Трекер</span>
              </NavLink>

              <button
                className="fabButton"
                onClick={() => navigate("/assistant")}
                aria-label="Открыть AI-помощника"
              />

              <NavLink
                to="/assistant"
                className={({ isActive }) => `navItem${isActive ? " active" : ""}`}
              >
                <MessageCircle size={32} />
                <span>Помощник</span>
              </NavLink>

              <NavLink to="/more" className={({ isActive }) => `navItem${isActive ? " active" : ""}`}>
                <MoreHorizontal size={32} />
                <span>Ещё</span>
              </NavLink>
            </nav>

            <div className="safeArea" />
          </>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return <Shell />;
}