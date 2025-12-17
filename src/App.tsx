import "./App.css";

export default function App() {
  return (
    <div className="appWrapper">
    <div className="app">
      {/* Шапка */}
      <header className="header">
        <button className="iconBtn" aria-label="Добавить">＋</button>

        <div className="headerRight">
          <button className="iconBtn" aria-label="Поиск">⌕</button>
          <button className="iconBtn" aria-label="Уведомления">🔔</button>

          <div className="balancePill" aria-label="Баланс">
            <span className="balanceIcon">💳</span>
            <span className="balanceText">0.00</span>
          </div>

          <button className="iconBtn" aria-label="Профиль">👤</button>
        </div>
      </header>

      {/* Приветствие */}
      <section className="hero">
        <div className="hello">Привет!</div>
        <h1 className="title">Как ты себя чувствуешь сегодня?</h1>

        <div className="orb" />

        {/* Поисковая строка / запрос */}
        <div className="inputWrap">
          <input
            className="input"
            placeholder="Например: «Накрыла тревога…»"
          />
          <button className="micBtn" aria-label="Голосовой ввод">🎙</button>
        </div>
      </section>

      {/* Заголовок блока */}
      <div className="sectionTitle">
        <span className="line" />
        <span>Твой личный помощник</span>
        <span className="line" />
      </div>

      {/* Сетка карточек */}
      <section className="grid">
        <div className="card">
          <div className="cardIcon">💬</div>
          <div className="cardTitle">AI-Помощник</div>
          <div className="cardSub">Поддержка в моменте</div>
        </div>

        <div className="card">
          <div className="cardIcon">🧩</div>
          <div className="cardTitle">Ситуативная помощь</div>
          <div className="cardSub">Инструкции “что делать”</div>
        </div>

        <div className="card">
          <div className="cardIcon">📈</div>
          <div className="cardTitle">Трекер состояния</div>
          <div className="cardSub">Отмечай прогресс</div>
        </div>

        <div className="card">
          <div className="cardIcon">🎧</div>
          <div className="cardTitle">Музыка для настроения</div>
          <div className="cardSub">Быстро переключиться</div>
        </div>
      </section>

      {/* Нижняя навигация (заглушка) */}
      <nav className="bottomNav">
        <button className="navItem active">🏠<span>Главная</span></button>
        <button className="navItem">💬<span>Помощник</span></button>
        <button className="navItem">📈<span>Трекер</span></button>
        <button className="navItem">⋯<span>Ещё</span></button>
      </nav>

      <div className="safeArea" />
    </div>
    </div>
  );
}