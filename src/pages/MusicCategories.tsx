import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home, Wind, Brain, Zap, Moon, Waves, Radio } from "lucide-react";
import styles from "./Music.module.css";

export default function MusicCategories() {
  const navigate = useNavigate();

  const categories = [
    { id: "calm", title: "Спокойствие", subtitle: "Музыка для релаксации", icon: Wind },
    { id: "focus", title: "Фокус", subtitle: "Музыка для концентрации", icon: Brain },
    { id: "energy", title: "Разрядка", subtitle: "Музыка для энергии", icon: Zap },
    { id: "sleep", title: "Сон", subtitle: "Музыка для засыпания", icon: Moon },
    { id: "soundscapes", title: "Дождь / Океан / Лес", subtitle: "Звуки природы", icon: Waves },
    { id: "noise", title: "Белый / Розовый шум", subtitle: "Фоновый шум", icon: Radio },
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
          <div className={styles.introTitle}>Выбери настроение</div>
          <div className={styles.introText}>
            Подборки музыки и звуков для разных состояний.
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
        </div>
      </div>
    </div>
  );
}