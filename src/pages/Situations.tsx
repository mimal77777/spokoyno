import { useNavigate } from "react-router-dom";
import { ArrowLeft, AlertTriangle, Heart, UserX, Coffee, Eye, Users } from "lucide-react";
import styles from "./Situations.module.css";

export default function Situations() {
  const navigate = useNavigate();

  return (
    <div className={styles.screen}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate(-1)} aria-label="Назад">
          <ArrowLeft size={32} strokeWidth={2.5} />
        </button>
        <span className={styles.headerTitle}>Ситуативная помощь</span>
      </div>

      {/* Intro */}
      <div className={styles.introCard}>
        <div className={styles.introTitle}>Выбери ситуацию</div>
        <div className={styles.introText}>
          Короткая шпаргалка + практика + возможность обсудить с ассистентом.
        </div>
      </div>

      {/* List */}
      <div className={styles.list}>
        <button className={styles.item} onClick={() => navigate("/situation/fear")}>
          <div className={styles.itemIcon}>
            <AlertTriangle size={22} strokeWidth={2.5} />
          </div>
          <div className={styles.itemText}>
            <div className={styles.itemTitle}>Страх</div>
            <div className={styles.itemSub}>«Тебе страшно»</div>
          </div>
          <div className={styles.chevron}>›</div>
        </button>

        <button className={styles.item} onClick={() => navigate("/situation/relationships")}>
          <div className={styles.itemIcon}>
            <Heart size={22} strokeWidth={2.5} />
          </div>
          <div className={styles.itemText}>
            <div className={styles.itemTitle}>Отношения и близость</div>
            <div className={styles.itemSub}>«Тебя не слышат или предали»</div>
          </div>
          <div className={styles.chevron}>›</div>
        </button>

        <button className={styles.item} onClick={() => navigate("/situation/loneliness")}>
          <div className={styles.itemIcon}>
            <UserX size={22} strokeWidth={2.5} />
          </div>
          <div className={styles.itemText}>
            <div className={styles.itemTitle}>Одиночество</div>
            <div className={styles.itemSub}>«Тебе одиноко»</div>
          </div>
          <div className={styles.chevron}>›</div>
        </button>

        <button className={styles.item} onClick={() => navigate("/situation/apathy")}>
          <div className={styles.itemIcon}>
            <Coffee size={22} strokeWidth={2.5} />
          </div>
          <div className={styles.itemText}>
            <div className={styles.itemTitle}>Апатия / прокрастинация</div>
            <div className={styles.itemSub}>«Тебе лениво»</div>
          </div>
          <div className={styles.chevron}>›</div>
        </button>

        <button className={styles.item} onClick={() => navigate("/situation/selfesteem")}>
          <div className={styles.itemIcon}>
            <Eye size={22} strokeWidth={2.5} />
          </div>
          <div className={styles.itemText}>
            <div className={styles.itemTitle}>Самооценка</div>
            <div className={styles.itemSub}>«Ты ненужная»</div>
          </div>
          <div className={styles.chevron}>›</div>
        </button>

        <button className={styles.item} onClick={() => navigate("/situation/dating")}>
          <div className={styles.itemIcon}>
            <Users size={22} strokeWidth={2.5} />
          </div>
          <div className={styles.itemText}>
            <div className={styles.itemTitle}>Как найти нормального мужчину</div>
            <div className={styles.itemSub}>«Как не облажаться»</div>
          </div>
          <div className={styles.chevron}>›</div>
        </button>
      </div>
    </div>
  );
}