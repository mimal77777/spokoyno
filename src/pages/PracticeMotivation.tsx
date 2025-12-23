import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import styles from "./Practice.module.css";

export default function PracticeMotivation() {
  const navigate = useNavigate();

  return (
    <div className={styles.screen}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate(-1)} aria-label="Назад">
          <ArrowLeft size={32} strokeWidth={2.5} />
        </button>
        <span className={styles.headerTitle}>Практика малых шагов</span>
        <button className={styles.homeButton} onClick={() => navigate("/")} aria-label="На главную">
          <Home size={28} strokeWidth={2.5} />
        </button>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.practiceCard}>
          <div className={styles.practiceTitle}>Начни с простого действия</div>
          <div className={styles.practiceText}>
            Здесь будут техники преодоления прокрастинации через микро-шаги.
          </div>
          <div className={styles.practiceText}>
            Практика поможет начать действовать без давления и перфекционизма.
          </div>
        </div>

        <div className={styles.placeholder}>
          📝 Контент добавится позже
        </div>
      </div>
    </div>
  );
}