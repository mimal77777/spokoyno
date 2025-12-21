// src/pages/Tracker.tsx
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import styles from './Tracker.module.css';

interface Sphere {
  name: string;
  value: number;
  color: string;
}

const Tracker = () => {
  const navigate = useNavigate();

  const spheres: Sphere[] = [
    { name: 'Спокойствие', value: 72, color: '#6EDAD1' },
    { name: 'Самооценка', value: 65, color: '#9D84FF' },
    { name: 'Отношения', value: 78, color: '#FF6B9D' },
    { name: 'Энергия', value: 68, color: '#FFA940' },
    { name: 'Уверенность', value: 71, color: '#3BB6AE' },
    { name: 'Самореализация', value: 66, color: '#6BCDFF' },
  ];

  const totalIndex = Math.round(
    spheres.reduce((sum, s) => sum + s.value, 0) / spheres.length
  );

  const createPetalPath = (index: number, total: number, value: number): string => {
    const angle = (360 / total) * index;
    const nextAngle = (360 / total) * (index + 1);
    const radius = (value / 100) * 100;

    const startRad = (angle * Math.PI) / 180;
    const endRad = (nextAngle * Math.PI) / 180;

    const x1 = 120 + radius * Math.cos(startRad);
    const y1 = 120 + radius * Math.sin(startRad);
    const x2 = 120 + radius * Math.cos(endRad);
    const y2 = 120 + radius * Math.sin(endRad);

    return `M 120 120 L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;
  };

  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate(-1)} aria-label="Назад">
          <ArrowLeft size={32} strokeWidth={2.5} />
        </button>
        <div className={styles.headerTitle}>Трекер</div>
      </div>

      <div className={styles.content}>
        <div className={styles.wheelCard}>
          <svg
            className={styles.wheel}
            viewBox="0 0 240 240"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="120"
              cy="120"
              r="100"
              fill="none"
              stroke="#e3f5f1"
              strokeWidth="1"
            />
            <circle
              cx="120"
              cy="120"
              r="75"
              fill="none"
              stroke="#e3f5f1"
              strokeWidth="1"
            />
            <circle
              cx="120"
              cy="120"
              r="50"
              fill="none"
              stroke="#e3f5f1"
              strokeWidth="1"
            />
            <circle
              cx="120"
              cy="120"
              r="25"
              fill="none"
              stroke="#e3f5f1"
              strokeWidth="1"
            />

            {spheres.map((sphere, index) => (
              <path
                key={sphere.name}
                d={createPetalPath(index, spheres.length, sphere.value)}
                fill={sphere.color}
                opacity="0.7"
              />
            ))}

            <circle cx="120" cy="120" r="35" fill="white" />
            <text
              x="120"
              y="115"
              textAnchor="middle"
              className={styles.indexNumber}
              fill="#1a1a1a"
            >
              {totalIndex}
            </text>
            <text
              x="120"
              y="130"
              textAnchor="middle"
              className={styles.indexLabel}
              fill="#666"
            >
              баланс
            </text>
          </svg>

          <div className={styles.supportText}>Твой баланс формируется</div>
        </div>

        <div className={styles.legendCard}>
          {spheres.map((sphere) => (
            <div key={sphere.name} className={styles.legendItem}>
              <div
                className={styles.legendColor}
                style={{ background: sphere.color }}
              />
              <span className={styles.legendName}>{sphere.name}</span>
              <span className={styles.legendValue}>{sphere.value}</span>
            </div>
          ))}
        </div>

        <div className={styles.insightCard}>
          <div className={styles.insightText}>
            Твоё спокойствие улучшилось на этой неделе 🌸
          </div>
        </div>

        <button
          className={styles.reflectBtn}
          onClick={() => navigate('/assistant')}
        >
          <MessageCircle size={20} strokeWidth={2.3} />
          <span>Поразмышлять с помощником</span>
        </button>
      </div>
    </div>
  );
};

export default Tracker;