import "./App.css";
import { NavLink, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  Bell,
  User,
  Home,
  MessageCircle,
  TrendingUp,
  MoreHorizontal,
} from "lucide-react";

import HomePage from "./pages/Home";
import Assistant from "./pages/Assistant";
import Tracker from "./pages/Tracker";
import More from "./pages/More";
import Profile from "./pages/Profile";
import Doc from "./pages/Doc";

function Shell() {
  const location = useLocation();
  const navigate = useNavigate();

  const path = location.pathname;

  // На этих страницах есть свой хэдер (Assistant/Profile/Doc), поэтому главный хэдер и bottom-nav скрываем
  const hideMainChrome =
    path === "/assistant" ||
    path === "/profile" ||
    path === "/tracker" ||
    path.startsWith("/doc/");

  // ВАЖНО: на этих страницах главный scroll НЕ должен быть в mainContent,
  // чтобы "липкий" хэдер экрана работал как в Assistant
  const isIsolatedScreen =
    path === "/assistant" ||
    path === "/profile" ||
    path.startsWith("/doc/");

  return (
    <div className="appWrapper">
      <div className={`app${isIsolatedScreen ? " assistantApp" : ""}`}>
        {/* Главный хэдер показываем только на основных экранах */}
        {!hideMainChrome && (
          <header className="header">
            <button className="iconBtn" aria-label="Добавить">
              <Plus size={44} strokeWidth={2.5} />
            </button>

            <div className="headerRight">
              <button className="iconBtn" aria-label="Поиск">
                <Search size={44} strokeWidth={2.5} />
              </button>

              <button className="iconBtn" aria-label="Уведомления">
                <Bell size={44} strokeWidth={2.5} />
              </button>

              <div className="balancePill" aria-label="Баланс">
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
            <Route path="/assistant" element={<Assistant />} />
            <Route path="/tracker" element={<Tracker />} />
            <Route path="/more" element={<More />} />

            <Route path="/profile" element={<Profile />} />
            <Route path="/doc/:id" element={<Doc />} />
          </Routes>
        </main>

        {/* Bottom nav тоже скрываем на страницах со своим хэдером */}
        {!hideMainChrome && (
          <>
            <nav className="bottomNav">
              <NavLink
                to="/"
                className={({ isActive }) => `navItem${isActive ? " active" : ""}`}
              >
                <Home size={32} strokeWidth={2} />
                <span>Главная</span>
              </NavLink>

              <NavLink
                to="/tracker"
                className={({ isActive }) => `navItem${isActive ? " active" : ""}`}
              >
                <TrendingUp size={32} strokeWidth={2} />
                <span>Трекер</span>
              </NavLink>

              <button
                className="fabButton"
                onClick={() => (window.location.href = "/assistant")}
                aria-label="Открыть AI-помощника"
              ></button>

              <NavLink
                to="/assistant"
                className={({ isActive }) => `navItem${isActive ? " active" : ""}`}
              >
                <MessageCircle size={32} strokeWidth={2} />
                <span>Помощник</span>
              </NavLink>

              <NavLink
                to="/more"
                className={({ isActive }) => `navItem${isActive ? " active" : ""}`}
              >
                <MoreHorizontal size={32} strokeWidth={2} />
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
