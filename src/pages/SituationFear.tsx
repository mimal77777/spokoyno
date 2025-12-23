import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home, MessageCircle, Activity } from "lucide-react";
import styles from "./SituationFear.module.css";

export default function SituationFear() {
  const navigate = useNavigate();

  const assistantContext =
    "Пользователь в страхе/тревоге. Говори мягко, конкретно. Сначала заземление. Потом уточняющие вопросы. Без общих фраз.";

  return (
    <div className={styles.screen}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate(-1)} aria-label="Назад">
          <ArrowLeft size={32} strokeWidth={2.5} />
        </button>
        <span className={styles.headerTitle}>Страх</span>
        <button className={styles.homeButton} onClick={() => navigate("/")} aria-label="На главную">
          <Home size={28} strokeWidth={2.5} />
        </button>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {/* Story */}
        <div className={styles.storyCard}>
          <div className={styles.storyText}>
            <p>Иногда страх приходит не потому, что рядом опасность,</p>
            <p>а потому что ты слишком долго держалась.</p>
            <p></p>
            <p>Тело включает тревогу, как сигнал: «пора замедлиться».</p>
            <p>Оно пытается защитить тебя — просто слишком громко.</p>
            <p></p>
            <p>С тобой не происходит ничего неправильного.</p>
          </div>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          {/* Practice Card */}
          <div className={styles.practiceCard} onClick={() => navigate("/practice/breathing")}>
            <div className={styles.practiceIcon}>
              <Activity size={28} strokeWidth={2.5} />
            </div>
            <div className={styles.practiceText}>
              <div className={styles.practiceTitle}>Практика дыхания</div>
              <div className={styles.practiceSub}>Заземлись и успокойся</div>
            </div>
          </div>

          {/* Assistant Button */}
          <button
            className={styles.assistantButton}
            onClick={() =>
              navigate("/assistant", {
                state: {
                  preset: "fear",
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