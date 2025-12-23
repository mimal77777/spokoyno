import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home, MessageCircle, Users } from "lucide-react";
import styles from "./SituationFear.module.css";

export default function SituationLoneliness() {
  const navigate = useNavigate();

  const assistantContext =
    "Пользователю одиноко. Говори тепло, без советов типа 'выйди погуляй'. Помоги осознать, что одиночество — это не приговор. Поддержи эмоционально.";

  return (
    <div className={styles.screen}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate(-1)} aria-label="Назад">
          <ArrowLeft size={32} strokeWidth={2.5} />
        </button>
        <span className={styles.headerTitle}>Одиночество</span>
        <button className={styles.homeButton} onClick={() => navigate("/")} aria-label="На главную">
          <Home size={28} strokeWidth={2.5} />
        </button>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {/* Story */}
        <div className={styles.storyCard}>
          <div className={styles.storyText}>
            <p>Одиночество — это не про отсутствие людей вокруг.</p>
            <p>Это про то, что тебя никто не видит.</p>
            <p></p>
            <p>Можно быть одинокой в толпе.</p>
            <p>И можно быть наполненной в тишине.</p>
            <p></p>
            <p>Это чувство пройдёт. Но сейчас оно здесь — и это нормально.</p>
          </div>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          {/* Practice Card */}
          <div className={styles.practiceCard} onClick={() => navigate("/practice/selflove")}>
            <div className={styles.practiceIcon}>
              <Users size={28} strokeWidth={2.5} />
            </div>
            <div className={styles.practiceText}>
              <div className={styles.practiceTitle}>Практика самопринятия</div>
              <div className={styles.practiceSub}>Научись быть с собой</div>
            </div>
          </div>

          {/* Assistant Button */}
          <button
            className={styles.assistantButton}
            onClick={() =>
              navigate("/assistant", {
                state: {
                  preset: "loneliness",
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