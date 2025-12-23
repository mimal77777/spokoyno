import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home, MessageCircle, Compass } from "lucide-react";
import styles from "./SituationFear.module.css";

export default function SituationDating() {
  const navigate = useNavigate();

  const assistantContext =
    "Пользователь ищет здоровые отношения. Помоги разобраться в красных флагах и границах. Говори по существу, без романтизации и сказок про 'того самого'.";

  return (
    <div className={styles.screen}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate(-1)} aria-label="Назад">
          <ArrowLeft size={32} strokeWidth={2.5} />
        </button>
        <span className={styles.headerTitle}>Как найти нормального мужчину</span>
        <button className={styles.homeButton} onClick={() => navigate("/")} aria-label="На главную">
          <Home size={28} strokeWidth={2.5} />
        </button>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {/* Story */}
        <div className={styles.storyCard}>
          <div className={styles.storyText}>
            <p>Нормальный мужчина — это не тот, кто идеален.</p>
            <p>Это тот, кто берёт ответственность.</p>
            <p></p>
            <p>Кто говорит прямо. Кто не играет в игры.</p>
            <p>Кто видит тебя — и не пытается переделать.</p>
            <p></p>
            <p>И нет, ты не должна его «спасать» или «исправлять».</p>
          </div>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          {/* Practice Card */}
          <div className={styles.practiceCard} onClick={() => navigate("/practice/redflags")}>
            <div className={styles.practiceIcon}>
              <Compass size={28} strokeWidth={2.5} />
            </div>
            <div className={styles.practiceText}>
              <div className={styles.practiceTitle}>Практика распознавания</div>
              <div className={styles.practiceSub}>Научись видеть красные флаги</div>
            </div>
          </div>

          {/* Assistant Button */}
          <button
            className={styles.assistantButton}
            onClick={() =>
              navigate("/assistant", {
                state: {
                  preset: "dating",
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