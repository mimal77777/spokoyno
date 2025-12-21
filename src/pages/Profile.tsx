import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CreditCard,
  Trash2,
  MessageCircle,
  FileText,
  Globe,
  Sparkles,
} from "lucide-react";
import styles from "./Profile.module.css";

type ProfileResponse = {
  ok: boolean;
  user_id: string;
  access: "founder" | "paid" | "trial" | "blocked";
  trial_days_left?: number;
  trial_messages_left?: number; // из 10
  paid_until_day?: number; // day number
  pay_url?: string;
};

const getTelegramUserId = (): string => {
  const tg = (window as any).Telegram?.WebApp;
  return tg?.initDataUnsafe?.user?.id ? String(tg.initDataUnsafe.user.id) : "anonymous";
};

const detectTelegramLanguage = (): "ru" | "en" | "es" => {
  const tg = (window as any).Telegram?.WebApp;
  const code = String(tg?.initDataUnsafe?.user?.language_code || "").toLowerCase();
  if (code.startsWith("ru")) return "ru";
  if (code.startsWith("es")) return "es";
  return "en";
};

const LS_LANG_KEY = "spokoyno_lang";
const LS_PROMO_KEY = "spokoyno_promo";
const LS_SUMMARY_KEY = "spokoyno_summary";

function dayNumberToDateString(dayNumber?: number) {
  if (!dayNumber) return "";
  const ms = dayNumber * 86400000;
  const d = new Date(ms);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = String(d.getFullYear());
  return `${dd}.${mm}.${yyyy}`;
}

export default function Profile() {
  const navigate = useNavigate();
  const userId = getTelegramUserId();

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<ProfileResponse | null>(null);

  const [promo, setPromo] = useState<string>(() => localStorage.getItem(LS_PROMO_KEY) || "");
  const [lang, setLang] = useState<"ru" | "en" | "es">(
    () => (localStorage.getItem(LS_LANG_KEY) as any) || detectTelegramLanguage()
  );

  const [summary, setSummary] = useState<string>(() => localStorage.getItem(LS_SUMMARY_KEY) || "");
  const [summaryLoading, setSummaryLoading] = useState(false);

  const storageKey = useMemo(() => `spokoyno_chat_${userId}`, [userId]);

  useEffect(() => {
    localStorage.setItem(LS_LANG_KEY, lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem(LS_PROMO_KEY, promo);
  }, [promo]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://backend.spokoyno-api.workers.dev/api/profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-spokoyno-lang": lang,
          },
          body: JSON.stringify({ user_id: userId }),
        });
        const data = (await res.json()) as ProfileResponse;
        setProfile(data);
      } catch {
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [userId, lang]);

  const onContinue = () => navigate("/assistant");

  const onClearHistory = () => {
    const ok = window.confirm("Очистить историю диалога? Это действие нельзя отменить.");
    if (!ok) return;
    localStorage.removeItem(storageKey);
    alert("История очищена.");
  };

  const onOpenPay = () => {
    const url = profile?.pay_url;
    if (!url) return;
    window.open(url, "_blank");
  };

  const canMakeSummary = profile?.access === "paid" || profile?.access === "founder";

  const onMakeSummary = async () => {
    if (!canMakeSummary) return;
    setSummaryLoading(true);
    try {
      const res = await fetch("https://backend.spokoyno-api.workers.dev/api/summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-spokoyno-lang": lang,
        },
        body: JSON.stringify({ user_id: userId }),
      });
      const data = await res.json();
      const text = String(data?.summary || "").trim();
      if (text) {
        setSummary(text);
        localStorage.setItem(LS_SUMMARY_KEY, text);
      }
    } catch {
      // no-op
    } finally {
      setSummaryLoading(false);
    }
  };

  const t = useMemo(() => {
    const dict = {
      ru: {
        title: "Профиль",
        access: "Доступ",
        assistant: "Ассистент",
        language: "Язык",
        about: "About",
        promo: "Промокод",
        apply: "Применить",
        continue: "Продолжить диалог",
        clear: "Очистить историю",
        summary: "Сделать короткое резюме",
        summaryTitle: "Резюме",
        tariff: "Тариф",
        leftMsgs: "Осталось сообщений",
        leftDays: "Осталось дней",
        unlimited: "Без ограничений",
        pay: "Оплатить полный доступ",
        paidUntil: "Доступ до",
      },
      en: {
        title: "Profile",
        access: "Access",
        assistant: "Assistant",
        language: "Language",
        about: "About",
        promo: "Promo code",
        apply: "Apply",
        continue: "Continue chat",
        clear: "Clear history",
        summary: "Make a short summary",
        summaryTitle: "Summary",
        tariff: "Plan",
        leftMsgs: "Messages left",
        leftDays: "Days left",
        unlimited: "Unlimited",
        pay: "Get full access",
        paidUntil: "Access until",
      },
      es: {
        title: "Perfil",
        access: "Acceso",
        assistant: "Asistente",
        language: "Idioma",
        about: "Acerca de",
        promo: "Código promo",
        apply: "Aplicar",
        continue: "Continuar chat",
        clear: "Borrar historial",
        summary: "Crear resumen corto",
        summaryTitle: "Resumen",
        tariff: "Plan",
        leftMsgs: "Mensajes restantes",
        leftDays: "Días restantes",
        unlimited: "Ilimitado",
        pay: "Obtener acceso completo",
        paidUntil: "Acceso hasta",
      },
    } as const;

    return dict[lang];
  }, [lang]);

  const accessLabel = (() => {
    if (!profile) return "-";
    if (profile.access === "founder") return "Founder";
    if (profile.access === "paid") return "Paid";
    if (profile.access === "trial") return "Trial";
    return "Blocked";
  })();

  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate(-1)} aria-label="Back">
          {/* ВАЖНО: как на ассистенте */}
          <ArrowLeft size={24} strokeWidth={2} />
        </button>
        <div className={styles.headerTitle}>{t.title}</div>
      </div>

      <div className={styles.content}>
        {/* ACCESS */}
        <div className={styles.card}>
          <div className={styles.cardTitle}>
            <FileText size={18} />
            <span>{t.access}</span>
          </div>

          {loading ? (
            <div className={styles.rowMuted}>Loading…</div>
          ) : (
            <>
              <div className={styles.row}>
                <span className={styles.k}>{t.tariff}</span>
                <span className={styles.v}>{accessLabel}</span>
              </div>

              {profile?.access === "trial" && (
                <>
                  <div className={styles.row}>
                    <span className={styles.k}>{t.leftMsgs}</span>
                    <span className={styles.v}>{profile.trial_messages_left ?? "-"} / 10</span>
                  </div>
                  <div className={styles.row}>
                    <span className={styles.k}>{t.leftDays}</span>
                    <span className={styles.v}>{profile.trial_days_left ?? "-"}</span>
                  </div>
                </>
              )}

              {profile?.access === "paid" && (
                <div className={styles.row}>
                  <span className={styles.k}>{t.paidUntil}</span>
                  <span className={styles.v}>{dayNumberToDateString(profile.paid_until_day)}</span>
                </div>
              )}

              {(profile?.access === "trial" || profile?.access === "blocked") && profile?.pay_url && (
                <button className={styles.payBtn} onClick={onOpenPay}>
                  <CreditCard size={20} />
                  <span>{t.pay}</span>
                </button>
              )}

              <div className={styles.promoBlock}>
                <div className={styles.promoLabel}>{t.promo}</div>
                <div className={styles.promoRow}>
                  <input
                    className={styles.promoInput}
                    value={promo}
                    onChange={(e) => setPromo(e.target.value)}
                    placeholder={t.promo}
                  />
                  <button
                    className={styles.promoApply}
                    onClick={() => alert("Промокод сохранён (логика будет позже).")}
                  >
                    {t.apply}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* ASSISTANT */}
        <div className={styles.card}>
          <div className={styles.cardTitle}>
            <MessageCircle size={18} />
            <span>{t.assistant}</span>
          </div>

          <button className={styles.actionBtn} onClick={onContinue}>
            <MessageCircle size={18} />
            <span>{t.continue}</span>
          </button>

          <button className={styles.actionBtnDanger} onClick={onClearHistory}>
            <Trash2 size={18} />
            <span>{t.clear}</span>
          </button>

          {canMakeSummary && (
            <button className={styles.actionBtn} onClick={onMakeSummary} disabled={summaryLoading}>
              <Sparkles size={18} />
              <span>{summaryLoading ? "..." : t.summary}</span>
            </button>
          )}

          {canMakeSummary && summary && (
            <div className={styles.summaryCard}>
              <div className={styles.summaryTitle}>{t.summaryTitle}</div>
              <div className={styles.summaryText}>{summary}</div>
            </div>
          )}
        </div>

        {/* LANGUAGE */}
        <div className={styles.card}>
          <div className={styles.cardTitle}>
            <Globe size={18} />
            <span>{t.language}</span>
          </div>

          <div className={styles.langRow}>
            <button
              className={`${styles.langBtn} ${lang === "ru" ? styles.langActive : ""}`}
              onClick={() => setLang("ru")}
            >
              RU
            </button>
            <button
              className={`${styles.langBtn} ${styles.langDisabled}`}
              disabled
            >
              EN<span className={styles.soonBadge}>Soon</span>
            </button>
            <button
              className={`${styles.langBtn} ${styles.langDisabled}`}
              disabled
            >
              ES<span className={styles.soonBadge}>Soon</span>
            </button>
          </div>

          <div className={styles.rowMuted}>
            Default language comes from Telegram. Manual selection overrides it.
          </div>
        </div>

        {/* ABOUT / DOCS */}
        <div className={styles.card}>
          <div className={styles.cardTitle}>
            <FileText size={18} />
            <span>{t.about}</span>
          </div>

          <button className={styles.docLink} onClick={() => navigate("/doc/privacy")}>
            Политика конфиденциальности
          </button>
          <button className={styles.docLink} onClick={() => navigate("/doc/personal-data")}>
            Согласие на обработку персональных данных
          </button>
          <button className={styles.docLink} onClick={() => navigate("/doc/license")}>
            Лицензионное соглашение
          </button>
          <button className={styles.docLink} onClick={() => navigate("/doc/ads")}>
            Согласие на рекламную рассылку
          </button>

          <div className={styles.legalNote}>
            Открывая приложение, вы соглашаетесь со всеми условиями использования.
          </div>
        </div>
      </div>
    </div>
  );
}