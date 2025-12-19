export async function sendMessageToAI(message: string): Promise<string> {
  // 1) Берём initData из Telegram Mini App
  const tg = (window as any)?.Telegram?.WebApp;
  const initData: string = tg?.initData || "";

  // Мини-лог, чтобы видеть что initData реально есть
  console.log("🔵 /api/chat отправка:", {
    initDataLen: initData.length,
    messagePreview: message.substring(0, 20) + "...",
  });

  // 2) Шлём в backend то, что он теперь ожидает: initData + message
  const response = await fetch("https://backend.spokoyno-api.workers.dev/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ initData, message }),
  });

  // 3) Читаем ответ
  const data = await response.json().catch(() => ({} as any));

  if (!response.ok) {
    console.error("🔴 Backend error:", response.status, data);
    throw new Error(data?.error || "Backend error");
  }

  // 4) Нормальный лог
  console.log("✅ Ответ backend:", {
    mode: data?.mode,
    replyPreview: (data?.reply || "").substring(0, 80) + "...",
  });

  // 5) Возвращаем reply
  return (data?.reply as string) || "";
}
