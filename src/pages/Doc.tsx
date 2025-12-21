import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";
import styles from "./Doc.module.css";

type DocId = "privacy" | "personal-data" | "license" | "ads";

const DOCS: Record<DocId, { title: string; file: string }> = {
  privacy: { title: "Политика конфиденциальности", file: "/docs/privacy.pdf" },
  "personal-data": { title: "Согласие на обработку персональных данных", file: "/docs/personal-data.pdf" },
  license: { title: "Лицензионное соглашение", file: "/docs/license.pdf" },
  ads: { title: "Согласие на рекламную рассылку", file: "/docs/ads.pdf" },
};

export default function Doc() {
  const navigate = useNavigate();
  const params = useParams();
  const id = (params.id || "") as DocId;

  const doc = useMemo(() => DOCS[id], [id]);

  if (!doc) {
    return (
      <div className={styles.screen}>
        <div className={styles.header}>
          <button className={styles.backBtn} onClick={() => navigate(-1)} aria-label="Back">
            <ArrowLeft size={32} strokeWidth={2.5} />
          </button>
          <div className={styles.headerTitle}>Документ</div>
        </div>

        <div className={styles.content}>
          <div className={styles.card}>
            Документ не найден.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate(-1)} aria-label="Back">
          <ArrowLeft size={32} strokeWidth={2.5} />
        </button>
        <div className={styles.headerTitle}>{doc.title}</div>
      </div>

      <div className={styles.content}>
        <div className={styles.note}>
          <FileText size={16} />
          <span>Открывая приложение, вы соглашаетесь со всеми условиями использования.</span>
        </div>

        <iframe className={styles.viewer} src={doc.file} title={doc.title} />
      </div>
    </div>
  );
}
 