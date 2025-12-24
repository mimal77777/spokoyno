import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home, Wind, Sparkles, Heart, Coffee, Music2, Moon, Upload } from "lucide-react";
import styles from "./Music.module.css";

export default function MusicCategories() {
  const navigate = useNavigate();

  const categories = [
    { id: "calm", title: "Calm", subtitle: "Спокойная музыка", icon: Wind },
    { id: "ambient", title: "Ambient", subtitle: "Атмосферные звуки", icon: Sparkles },
    { id: "meditation", title: "Meditation", subtitle: "Музыка для медитации", icon: Heart },
    { id: "relax", title: "Relax", subtitle: "Расслабляющая музыка", icon: Coffee },
    { id: "lofi", title: "Lo-Fi", subtitle: "Lo-Fi beats", icon: Music2 },
    { id: "sleep", title: "Sleep", subtitle: "Музыка для сна", icon: Moon },
  ];

  return (
    <div className={styles.screen}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate(-1)} aria-label="Назад">
          <ArrowLeft size={32} strokeWidth={2.5} />
        </button>
        <span className={styles.headerTitle}>Музыка для настроения</span>
        <button className={styles.homeButton} onClick={() => navigate("/")} aria-label="На главную">
          <Home size={28} strokeWidth={2.5} />
        </button>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {/* Intro */}
        <div className={styles.introCard}>
          <div className={styles.introTitle}>Выбери стиль</div>
          <div className={styles.introText}>
            Подборки музыки для разных состояний.
          </div>
        </div>

        {/* Categories List */}
        <div className={styles.list}>
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                className={styles.item}
                onClick={() => navigate(`/music/${cat.id}`)}
              >
                <div className={styles.itemIcon}>
                  <Icon size={22} strokeWidth={2.5} />
                </div>
                <div className={styles.itemText}>
                  <div className={styles.itemTitle}>{cat.title}</div>
                  <div className={styles.itemSub}>{cat.subtitle}</div>
                </div>
                <div className={styles.chevron}>›</div>
              </button>
            );
          })}

          {/* Кнопка загрузки */}
          <button
            className={styles.item}
            onClick={() => navigate("/music/custom")}
          >
            <div className={styles.itemIcon}>
              <Upload size={22} strokeWidth={2.5} />
            </div>
            <div className={styles.itemText}>
              <div className={styles.itemTitle}>Загрузить своё</div>
              <div className={styles.itemSub}>Добавить свои треки</div>
            </div>
            <div className={styles.chevron}>›</div>
          </button>
        </div>
      </div>
    </div>
  );
}