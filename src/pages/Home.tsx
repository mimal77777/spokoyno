import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { MessageCircle, Lightbulb, TrendingUp, Music, Mic } from "lucide-react";
import AnimatedOrb from "../components/AnimatedOrb";

declare global {
  interface Window {
    webkitSpeechRecognition?: any;
    SpeechRecognition?: any;
  }
}

export default function Home() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const recognitionRef = useRef<any>(null);
  const isRecordingRef = useRef(false);

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg) {
      tg.ready();
      const user = tg.initDataUnsafe?.user;
      if (user) setUserName(user.first_name || user.username || "");
    }
  }, []);

  const startVoice = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      navigate("/assistant");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "ru-RU";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      navigate("/assistant", {
        state: { prefillText: text, autoSend: true },
      });
    };

    recognition.onerror = () => {
      navigate("/assistant");
    };

    recognitionRef.current = recognition;
    isRecordingRef.current = true;
    recognition.start();
  };

  const stopVoice = () => {
    if (recognitionRef.current && isRecordingRef.current) {
      recognitionRef.current.stop();
      isRecordingRef.current = false;
    }
  };

  return (
    <>
      <section className="hero">
        <div className="hello">
          {userName ? `Привет, ${userName}!` : "Привет!"}
        </div>
        <h1 className="title">Как ты себя чувствуешь сегодня?</h1>

        <div className="orb" onClick={() => navigate("/assistant")}>
          <AnimatedOrb />
        </div>

        <div className="inputWrap">
          <input
            className="input"
            placeholder="Например: «Накрыла тревога…»"
            readOnly
          />
          <button
            className="micBtn"
            onPointerDown={startVoice}
            onPointerUp={stopVoice}
            onPointerLeave={stopVoice}
          >
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

        <div className="card" onClick={() => navigate("/situations")}>
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
