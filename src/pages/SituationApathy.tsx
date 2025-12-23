import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home, MessageCircle, Zap } from "lucide-react";
import styles from "./SituationFear.module.css";

export default function SituationApathy() {
  const navigate = useNavigate();

  const assistantContext =
    "Пользователь в апатии или прокрастинирует. Не давай советы 'просто начни'. Помоги разобраться, что за этим стоит. Без давления и мотивационных речей.";

  return (
    <div className={styles.screen}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate(-1)} aria-label="Назад">
          <ArrowLeft size={32} strokeWidth={2.5} />
        </button>
        <span className={styles.headerTitle}>Апатия / прокрастинация</span>
        <button className={styles.homeButton} onClick={() => navigate("/")} aria-label="На главную">
          <Home size={28} strokeWidth={2.5} />
        </button>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {/* Story */}
        <div className={styles.storyCard}>
          <div className={styles.storyText}>
            <p>Прокрастинация — это не лень.</p>
            <p>Это защита от того, с чем страшно встретиться:</p>
            <p>провала, критики, разочарования.</p>
            <p></p>
            <p>Когда тебе «лениво» — тело говорит: «я устала».</p>
            <p>Оно не против тебя. Оно за тебя.</p>
            <p></p>
            <p>Начни с малого. Не с «всё сразу», а с одного вдоха.</p>
          </div>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          {/* Practice Card */}
          <div className={styles.practiceCard} onClick={() => navigate("/practice/motivation")}>
            <div className={styles.practiceIcon}>
              <Zap size={28} strokeWidth={2.5} />
            </div>
            <div className={styles.practiceText}>
              <div className={styles.practiceTitle}>Практика малых шагов</div>
              <div className={styles.practiceSub}>Начни с простого действия</div>
            </div>
          </div>

          {/* Assistant Button */}
          <button
            className={styles.assistantButton}
            onClick={() =>
              navigate("/assistant", {
                state: {
                  preset: "apathy",
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