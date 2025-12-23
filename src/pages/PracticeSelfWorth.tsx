import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import styles from "./Practice.module.css";

export default function PracticeSelfWorth() {
  const navigate = useNavigate();

  return (
    <div className={styles.screen}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate(-1)} aria-label="Назад">
          <ArrowLeft size={32} strokeWidth={2.5} />
        </button>
        <span className={styles.headerTitle}>Практика самоценности</span>
        <button className={styles.homeButton} onClick={() => navigate("/")} aria-label="На главную">
          <Home size={28} strokeWidth={2.5} />
        </button>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.practiceCard}>
          <div className={styles.practiceTitle}>Найди свою внутреннюю опору</div>
          <div className={styles.practiceText}>
            Здесь будут упражнения по развитию чувства собственной ценности.
          </div>
          <div className={styles.practiceText}>
            Практика поможет перестать доказывать свою значимость другим.
          </div>
        </div>

        <div className={styles.placeholder}>
          📝 Контент добавится позже
        </div>
      </div>
    </div>
  );
}