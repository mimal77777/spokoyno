export async function sendMessageToAI(userId: string, message: string): Promise<string> {
  // Логируем что передаём
  console.log('🔵 Отправляем запрос:', { userId, message: message.substring(0, 20) + '...' });
  
  const response = await fetch("https://backend.spokoyno-api.workers.dev/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId, message }),
  });

  if (!response.ok) {
    throw new Error("Backend error");
  }

  const data = await response.json();
  console.log('✅ Получен ответ:', data.reply.substring(0, 50) + '...');
  return data.reply as string;
}