export interface ChatResponse {
  reply: string;
  mode?: string;
  pay_url?: string;
}

function detectTelegramLanguage(): "ru" | "en" | "es" {
  const tg = (window as any).Telegram?.WebApp;
  const code = String(tg?.initDataUnsafe?.user?.language_code || "").toLowerCase();
  if (code.startsWith("ru")) return "ru";
  if (code.startsWith("es")) return "es";
  return "en";
}

export async function sendMessageToAI(message: string): Promise<ChatResponse> {
  const tg = (window as any).Telegram?.WebApp;

  let userId = "test123";

  if (tg) {
    tg.ready();
    const tgUser = tg.initDataUnsafe?.user;
    if (tgUser?.id) {
      userId = tgUser.id.toString();
    }
  }

  // Язык: ручной выбор важнее, иначе — язык Telegram
  const lang =
    (localStorage.getItem("spokoyno_lang") as "ru" | "en" | "es" | null) ||
    detectTelegramLanguage();

  const response = await fetch("https://backend.spokoyno-api.workers.dev/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-spokoyno-lang": lang, // body НЕ меняем
    },
    body: JSON.stringify({
      user_id: userId,
      message,
    }),
  });

  if (!response.ok) {
    throw new Error("Backend error");
  }

  return await response.json();
}
