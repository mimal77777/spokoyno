import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Globe, Info, FileText, Mail } from "lucide-react";
import styles from "./More.module.css";

const LS_LANG_KEY = "spokoyno_lang";

export default function More() {
  const navigate = useNavigate();

  const [lang, setLang] = useState<"ru" | "en" | "es">(
    () => (localStorage.getItem(LS_LANG_KEY) as any) || "ru"
  );

  const DOC_BASE = import.meta.env.BASE_URL;

  const openPdf = (fileName: string) => {
    window.open(`${DOC_BASE}docs/${fileName}`, "_blank");
  };

  const t = useMemo(() => {
    return {
      title: "О приложении",
      language: "Язык",
      aboutTitle: "Spokoyno",
      aboutText:
        "Spokoyno — MVP ассистента для поддержки и самоорганизации. Помогает структурировать мысли и получать спокойные, практичные рекомендации. Открывая приложение Spokoyno вы автоматически акцептируете документы "Политика конфиденциальности", "Согласие на обработку персональных данных", "Лицензионное соглашение", "Согласие на рекламную рассылку" ",
      info: "Информация",
      version: "Версия",
      status: "Статус",
      contacts: "Контакты",
      docs: "Документы",
    };
  }, []);

  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          <ArrowLeft size={24} strokeWidth={2} />
        </button>
        <div className={styles.headerTitle}>{t.title}</div>
      </div>

      <div className={styles.content}>
        {/* LANGUAGE */}
        <div className={styles.card}>
          <div className={styles.cardTitle}>
            <Globe size={18} />
            <span>{t.language}</span>
          </div>

          <div className={styles.langRow}>
            <button
              className={`${styles.langBtn} ${lang === "ru" ? styles.langActive : ""}`}
              onClick={() => {
                setLang("ru");
                localStorage.setItem(LS_LANG_KEY, "ru");
              }}
            >
              RU
            </button>

            <button className={`${styles.langBtn} ${styles.langDisabled}`} disabled>
              EN <span className={styles.soonBadge}>Soon</span>
            </button>

            <button className={`${styles.langBtn} ${styles.langDisabled}`} disabled>
              ES <span className={styles.soonBadge}>Soon</span>
            </button>
          </div>
        </div>

        {/* ABOUT */}
        <div className={styles.card}>
          <div className={styles.cardTitle}>
            <Info size={18} />
            <span>{t.aboutTitle}</span>
          </div>

          <div className={styles.aboutText}>{t.aboutText}</div>
        </div>

        {/* INFO */}
        <div className={styles.card}>
          <div className={styles.cardTitle}>
            <FileText size={18} />
            <span>{t.info}</span>
          </div>

          <div className={styles.row}>
            <span className={styles.k}>{t.version}</span>
            <span className={styles.v}>0.4.1</span>
          </div>

          <div className={styles.row}>
            <span className={styles.k}>{t.status}</span>
            <span className={styles.v}>MVP / beta</span>
          </div>
        </div>

        {/* CONTACTS */}
        <div className={styles.card}>
          <div className={styles.cardTitle}>
            <Mail size={18} />
            <span>{t.contacts}</span>
          </div>

          <button
            className={styles.docLink}
            onClick={() => window.open("mailto:spokoyno.app@gmail.com")}
          >
            spokoyno.app@gmail.com
          </button>
        </div>

        {/* DOCS */}
        <div className={styles.card}>
          <div className={styles.cardTitle}>
            <FileText size={18} />
            <span>{t.docs}</span>
          </div>

          <button
            className={styles.docLink}
            onClick={() => openPdf("spokoyno_privacy_policy_v1_0.pdf")}
          >
            Политика конфиденциальности
          </button>

          <button
            className={styles.docLink}
            onClick={() => openPdf("spokoyno_personal_data_consent_v1_0.pdf")}
          >
            Согласие на обработку персональных данных
          </button>

          <button
            className={styles.docLink}
            onClick={() => openPdf("spokoyno_license_agreement_v1_0.pdf")}
          >
            Лицензионное соглашение
          </button>

          <button
            className={styles.docLink}
            onClick={() => openPdf("spokoyno_ads_consent_v1_0.pdf")}
          >
            Согласие на рекламную рассылку
          </button>
        </div>

        <div className={styles.copyright}>
          © 2025 Spokoyno. Все права защищены ®
        </div>
      </div>
    </div>
  );
}
