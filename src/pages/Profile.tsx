import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CreditCard,
  Trash2,
  MessageCircle,
  FileText,
  Sparkles,
  ChevronDown,
  ChevronUp,
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

/** ====== Цветок (захардкожен, механика позже) ====== */
type SphereState = { name: string; value: number; color: string };

const PROFILE_SPHERES: SphereState[] = [
  { name: "Спокойствие", value: 72, color: "#6EDAD1" },
  { name: "Самооценка", value: 65, color: "#9D84FF" },
  { name: "Отношения", value: 78, color: "#FF6B9D" },
  { name: "Энергия", value: 68, color: "#FFA940" },
  { name: "Уверенность", value: 71, color: "#3BB6AE" },
  { name: "Самореализация", value: 66, color: "#6BCDFF" },
];

const PROFILE_SEGMENTS = 10;

// Разделительные “микро-зазоры” делаем через stroke цветом фона
const DIVIDER_COLOR = "#f8fffe";
const DIVIDER_WIDTH = 2.2;

function createSegmentPath(petalIndex: number, segmentIndex: number, totalPetals: number) {
  const angleStart = (360 / totalPetals) * petalIndex;
  const angleEnd = (360 / totalPetals) * (petalIndex + 1);

  const rInner = (segmentIndex / PROFILE_SEGMENTS) * 100;
  const rOuter = ((segmentIndex + 1) / PROFILE_SEGMENTS) * 100;

  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const a1 = toRad(angleStart);
  const a2 = toRad(angleEnd);

  const x1 = 120 + rInner * Math.cos(a1);
  const y1 = 120 + rInner * Math.sin(a1);

  const x2 = 120 + rOuter * Math.cos(a1);
  const y2 = 120 + rOuter * Math.sin(a1);

  const x3 = 120 + rOuter * Math.cos(a2);
  const y3 = 120 + rOuter * Math.sin(a2);

  const x4 = 120 + rInner * Math.cos(a2);
  const y4 = 120 + rInner * Math.sin(a2);

  return `M ${x1} ${y1} L ${x2} ${y2} A ${rOuter} ${rOuter} 0 0 1 ${x3} ${y3} L ${x4} ${y4} A ${rInner} ${rInner} 0 0 0 ${x1} ${y1} Z`;
}

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

  // язык читаем (в Profile UI выбора нет)
  const lang =
    (localStorage.getItem(LS_LANG_KEY) as "ru" | "en" | "es") || detectTelegramLanguage();

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<ProfileResponse | null>(null);

  const [promo, setPromo] = useState<string>(() => localStorage.getItem(LS_PROMO_KEY) || "");

  const [summary, setSummary] = useState<string>(() => localStorage.getItem(LS_SUMMARY_KEY) || "");
  const [summaryLoading, setSummaryLoading] = useState(false);

  const [summaryCollapsed, setSummaryCollapsed] = useState<boolean>(false);

  const storageKey = useMemo(() => `spokoyno_chat_${userId}`, [userId]);

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
        setSummaryCollapsed(false);
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
        promo: "Промокод",
        apply: "Применить",
        continue: "Продолжить диалог",
        clear: "Очистить историю",
        summary: "Сделать короткое резюме",
        summaryTitle: "Резюме",
        summaryCollapse: "Свернуть",
        summaryExpand: "Развернуть",
        tariff: "Тариф",
        leftMsgs: "Осталось сообщений",
        leftDays: "Осталось дней",
        pay: "Оплатить полный доступ",
        paidUntil: "Доступ до",
        stateTitle: "Текущее состояние",
        mentalLabel: "Ментальный индекс",
      },
      en: {
        title: "Profile",
        access: "Access",
        assistant: "Assistant",
        promo: "Promo code",
        apply: "Apply",
        continue: "Continue chat",
        clear: "Clear history",
        summary: "Make a short summary",
        summaryTitle: "Summary",
        summaryCollapse: "Collapse",
        summaryExpand: "Expand",
        tariff: "Plan",
        leftMsgs: "Messages left",
        leftDays: "Days left",
        pay: "Get full access",
        paidUntil: "Access until",
        stateTitle: "Current state",
        mentalLabel: "Mental index",
      },
      es: {
        title: "Perfil",
        access: "Acceso",
        assistant: "Asistente",
        promo: "Código promo",
        apply: "Aplicar",
        continue: "Continuar chat",
        clear: "Borrar historial",
        summary: "Crear resumen corto",
        summaryTitle: "Resumen",
        summaryCollapse: "Ocultar",
        summaryExpand: "Mostrar",
        tariff: "Plan",
        leftMsgs: "Mensajes restantes",
        leftDays: "Días restantes",
        pay: "Obtener acceso completo",
        paidUntil: "Acceso hasta",
        stateTitle: "Estado actual",
        mentalLabel: "Índice mental",
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

  const mentalIndex = useMemo(() => {
    return Math.round(PROFILE_SPHERES.reduce((sum, s) => sum + s.value, 0) / PROFILE_SPHERES.length);
  }, []);

  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate(-1)} aria-label="Back">
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

        {/* CURRENT STATE (цветок + число в центре, подпись под цветком) */}
        <div className={styles.card}>
          <div className={styles.cardTitle}>
            <FileText size={18} />
            <span>{t.stateTitle}</span>
          </div>

          <div className={styles.stateBox}>
            <svg
              className={styles.profileFlower}
              viewBox="0 0 240 240"
              xmlns="http://www.w3.org/2000/svg"
            >
              {PROFILE_SPHERES.map((sphere, i) => {
                const active = Math.round((sphere.value / 100) * PROFILE_SEGMENTS);

                return Array.from({ length: PROFILE_SEGMENTS }).map((_, s) => (
                  <path
                    key={`${sphere.name}-${s}`}
                    d={createSegmentPath(i, s, PROFILE_SPHERES.length)}
                    fill={sphere.color}
                    opacity={s < active ? 0.95 : 0.18}
                    stroke={DIVIDER_COLOR}
                    strokeWidth={DIVIDER_WIDTH}
                    vectorEffect="non-scaling-stroke"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                ));
              })}

              {/* Центр с числом (строго по центру) */}
              <circle cx="120" cy="120" r="34" fill="#ffffff" stroke="#e3f5f1" strokeWidth="1" />

              <text
                x="120"
                y="120"
                textAnchor="middle"
                dominantBaseline="middle"
                className={styles.indexNumber}
                fill="#1a1a1a"
              >
                {mentalIndex}
              </text>
            </svg>

            <div className={styles.mentalLabel}>{t.mentalLabel}</div>
          </div>
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
              <div className={styles.summaryHeader}>
                <div className={styles.summaryTitle}>{t.summaryTitle}</div>

                <button
                  className={styles.summaryToggle}
                  onClick={() => setSummaryCollapsed((v) => !v)}
                  type="button"
                >
                  {summaryCollapsed ? (
                    <>
                      <ChevronDown size={18} />
                      <span>{t.summaryExpand}</span>
                    </>
                  ) : (
                    <>
                      <ChevronUp size={18} />
                      <span>{t.summaryCollapse}</span>
                    </>
                  )}
                </button>
              </div>

              {!summaryCollapsed && <div className={styles.summaryText}>{summary}</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
