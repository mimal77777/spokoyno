import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home, MessageCircle, Sparkles } from "lucide-react";
import styles from "./SituationFear.module.css";

export default function SituationSelfEsteem() {
  const navigate = useNavigate();

  const assistantContext =
    "У пользователя низкая самооценка. Говори бережно, не обесценивай чувства. Помоги увидеть свою ценность через конкретику, не через общие слова.";

  return (
    <div className={styles.screen}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate(-1)} aria-label="Назад">
          <ArrowLeft size={32} strokeWidth={2.5} />
        </button>
        <span className={styles.headerTitle}>Самооценка</span>
        <button className={styles.homeButton} onClick={() => navigate("/")} aria-label="На главную">
          <Home size={28} strokeWidth={2.5} />
        </button>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {/* Story */}
        <div className={styles.storyCard}>
          <div className={styles.storyText}>
            <p>«Я ненужная» — это не правда.</p>
            <p>Это просто усталость от того, что пытаешься быть нужной всем.</p>
            <p></p>
            <p>Твоя ценность не в том, что ты делаешь для других.</p>
            <p>Она в том, что ты есть.</p>
            <p></p>
            <p>Ты не обязана себя доказывать.</p>
          </div>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          {/* Practice Card */}
          <div className={styles.practiceCard} onClick={() => navigate("/practice/selfworth")}>
            <div className={styles.practiceIcon}>
              <Sparkles size={28} strokeWidth={2.5} />
            </div>
            <div className={styles.practiceText}>
              <div className={styles.practiceTitle}>Практика самоценности</div>
              <div className={styles.practiceSub}>Найди свою внутреннюю опору</div>
            </div>
          </div>

          {/* Assistant Button */}
          <button
            className={styles.assistantButton}
            onClick={() =>
              navigate("/assistant", {
                state: {
                  preset: "selfesteem",
                  context: assistantContext
                }
              })
            }
          >
            <MessageCircle size={20} strokeWidth={2.5} />
            <span>Обсудить с ассистентом</span>
          </button>
        </div>
      </div>
    </div>
  );
}