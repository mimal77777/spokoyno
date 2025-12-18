import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MessageCircle, Lightbulb, TrendingUp, Music, Mic } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();
  const [text, setText] = useState("");

  const goAssistant = (q?: string) => {
    const query = (q ?? text).trim();
    if (query) navigate(`/assistant?q=${encodeURIComponent(query)}`);
    else navigate("/assistant");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") goAssistant();
  };

  return (
    <>
      {/* Приветствие */}
      <section className="hero">
        <div className="hello">Привет!</div>
        <h1 className="title">Как ты себя чувствуешь сегодня?</h1>

        {/* Кружок — кликабельный */}
        <div
          className="orb"
          role="button"
          tabIndex={0}
          aria-label="Открыть AI-помощника"
          onClick={() => goAssistant()}
          onKeyDown={handleKeyDown}
          title="Открыть AI-помощника"
        />

        {/* Поле ввода */}
        <div className="inputWrap">
          <input
            className="input"
            placeholder="Например: «Накрыла тревога…»"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="micBtn"
            aria-label="Отправить"
            onClick={() => goAssistant()}
          >
            <Mic size={84} />
          </button>
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
        <div 
          className="card" 
          role="button" 
          tabIndex={0} 
          onClick={() => navigate("/assistant")}
          onKeyDown={(e) => e.key === "Enter" && navigate("/assistant")}
        >
          <div className="cardIcon">
            <MessageCircle size={32} strokeWidth={2} />
          </div>
          <div className="cardTitle">AI-Помощник</div>
          <div className="cardSub">Поддержка в моменте</div>
        </div>

        <div 
          className="card" 
          role="button" 
          tabIndex={0} 
          onClick={() => navigate("/more")}
          onKeyDown={(e) => e.key === "Enter" && navigate("/more")}
        >
          <div className="cardIcon">
            <Lightbulb size={32} strokeWidth={2} />
          </div>
          <div className="cardTitle">Ситуативная помощь</div>
          <div className="cardSub">Инструкции "что делать"</div>
        </div>

        <div 
          className="card" 
          role="button" 
          tabIndex={0} 
          onClick={() => navigate("/tracker")}
          onKeyDown={(e) => e.key === "Enter" && navigate("/tracker")}
        >
          <div className="cardIcon">
            <TrendingUp size={32} strokeWidth={2} />
          </div>
          <div className="cardTitle">Трекер состояния</div>
          <div className="cardSub">Отмечай прогресс</div>
        </div>

        <div 
          className="card" 
          role="button" 
          tabIndex={0} 
          onClick={() => navigate("/more")}
          onKeyDown={(e) => e.key === "Enter" && navigate("/more")}
        >
          <div className="cardIcon">
            <Music size={32} strokeWidth={2} />
          </div>
          <div className="cardTitle">Музыка для настроения</div>
          <div className="cardSub">Быстро переключиться</div>
        </div>
      </section>
    </>
  );
}