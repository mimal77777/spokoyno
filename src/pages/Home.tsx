import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { MessageCircle, Lightbulb, TrendingUp, Music, Mic } from "lucide-react";

function CenterLogo() {
  return (
    <svg
      width="72"
      height="72"
      viewBox="0 0 100 100"
      style={{ position: "absolute", inset: 0, margin: "auto", zIndex: 2 }}
    >
      <path
        d="M50 18
           C58 26 74 30 74 50
           C74 70 58 74 50 82
           C42 74 26 70 26 50
           C26 30 42 26 50 18Z"
        fill="white"
        opacity="0.9"
      />
    </svg>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg) {
      tg.ready();
      const user = tg.initDataUnsafe?.user;
      if (user) setUserName(user.first_name || user.username || "");
    }
  }, []);

  const goAssistant = () => navigate("/assistant");

  return (
    <>
      <section className="hero">
        <div className="hello">
          {userName ? `Привет, ${userName}!` : "Привет!"}
        </div>
        <h1 className="title">Как ты себя чувствуешь сегодня?</h1>

        {/* СФЕРА */}
        <div className="orb" onClick={goAssistant}>
          <CenterLogo />
        </div>

        <div className="inputWrap">
          <input
            className="input"
            placeholder="Например: «Накрыла тревога…»"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="micBtn" onClick={goAssistant}>
            <Mic size={84} />
          </button>
        </div>
      </section>

      <div className="sectionTitle">
        <span className="line" />
        <span>Твой личный помощник</span>
        <span className="line" />
      </div>

      <section className="grid">
        <div className="card" onClick={() => navigate("/assistant")}>
          <div className="cardIcon"><MessageCircle size={32} /></div>
          <div className="cardTitle">AI-Помощник</div>
          <div className="cardSub">Поддержка в моменте</div>
        </div>

        <div className="card" onClick={() => navigate("/more")}>
          <div className="cardIcon"><Lightbulb size={32} /></div>
          <div className="cardTitle">Ситуативная помощь</div>
          <div className="cardSub">Инструкции "что делать"</div>
        </div>

        <div className="card" onClick={() => navigate("/tracker")}>
          <div className="cardIcon"><TrendingUp size={32} /></div>
          <div className="cardTitle">Трекер состояния</div>
          <div className="cardSub">Отмечай прогресс</div>
        </div>

        <div className="card" onClick={() => navigate("/more")}>
          <div className="cardIcon"><Music size={32} /></div>
          <div className="cardTitle">Музыка для настроения</div>
          <div className="cardSub">Быстро переключиться</div>
        </div>
      </section>
    </>
  );
}
