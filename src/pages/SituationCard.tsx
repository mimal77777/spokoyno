import { useParams, useNavigate } from "react-router-dom";
import styles from "./SituationCard.module.css";
import { situations } from "../data/situations";

const SituationCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const situation = situations[id as keyof typeof situations];

  if (!situation) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          ←
        </button>
        <h1 className={styles.title}>{situation.title}</h1>
      </div>

      {/* Story block */}
      <div className={styles.story}>
        {situation.story.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>

      {/* Practice button */}
      <button
        className={styles.primaryButton}
        onClick={() => navigate(`/practice/${situation.practiceId}`)}
      >
        Перейти к практике
      </button>

      {/* Assistant button */}
      <button
        className={styles.secondaryButton}
        onClick={() =>
          navigate("/assistant", {
            state: {
              context: situation.assistantContext,
              from: situation.id
            }
          })
        }
      >
        Обсудить с ассистентом
      </button>
    </div>
  );
};

export default SituationCard;
