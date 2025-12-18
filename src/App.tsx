import "./App.css";
import { NavLink, Route, Routes } from "react-router-dom";
import { Plus, Search, Bell, User, Home, MessageCircle, TrendingUp, MoreHorizontal } from "lucide-react";

// Импортируем страницы
import HomePage from "./pages/Home";
import Assistant from "./pages/Assistant";
import Tracker from "./pages/Tracker";
import More from "./pages/More";

// ---------- Layout ----------

function Shell() {
  return (
    <div className="appWrapper">
      <div className="app">
        {/* Шапка */}
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

            <button className="iconBtn profileBtn" aria-label="Профиль">
              <User size={44} strokeWidth={2.5} />
            </button>
          </div>
        </header>

        {/* Контент страниц */}
        <main className="mainContent">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/assistant" element={<Assistant />} />
            <Route path="/tracker" element={<Tracker />} />
            <Route path="/more" element={<More />} />
          </Routes>
        </main>

        {/* Нижняя навигация */}
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

          {/* Центральная круглая кнопка AI */}
          <button 
            className="fabButton"
            onClick={() => window.location.href = '/assistant'}
            aria-label="Открыть AI-помощника"
          >
          </button>

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
      </div>
    </div>
  );
}

export default function App() {
  return <Shell />;
}