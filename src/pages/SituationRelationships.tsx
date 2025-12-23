import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home, MessageCircle, Heart } from "lucide-react";
import styles from "./SituationFear.module.css";

export default function SituationRelationships() {
  const navigate = useNavigate();

  const assistantContext =
    "Пользователь переживает конфликт в отношениях. Его не слышат или предали. Говори бережно, помоги осознать границы. Без обесценивания чувств.";

  return (
    <div className={styles.screen}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate(-1)} aria-label="Назад">
          <ArrowLeft size={32} strokeWidth={2.5} />
        </button>
        <span className={styles.headerTitle}>Отношения и близость</span>
        <button className={styles.homeButton} onClick={() => navigate("/")} aria-label="На главную">
          <Home size={28} strokeWidth={2.5} />
        </button>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {/* Story */}
        <div className={styles.storyCard}>
          <div className={styles.storyText}>
            <p>Когда тебя не слышат — это не значит, что ты неправильно говоришь.</p>
            <p>Это значит, что человек не готов услышать.</p>
            <p></p>
            <p>Твои чувства важны. Твои границы имеют значение.</p>
            <p>И нет, ты не слишком чувствительная.</p>
            <p></p>
            <p>Ты просто с тем, кто не хочет понимать.</p>
          </div>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          {/* Practice Card */}
          <div className={styles.practiceCard} onClick={() => navigate("/practice/boundaries")}>
            <div className={styles.practiceIcon}>
              <Heart size={28} strokeWidth={2.5} />
            </div>
            <div className={styles.practiceText}>
              <div className={styles.practiceTitle}>Практика границ</div>
              <div className={styles.practiceSub}>Научись говорить о своих потребностях</div>
            </div>
          </div>

          {/* Assistant Button */}
          <button
            className={styles.assistantButton}
            onClick={() =>
              navigate("/assistant", {
                state: {
                  preset: "relationships",
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