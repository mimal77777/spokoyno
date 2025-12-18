export async function sendMessageToAI(userId: string, message: string): Promise<string> {
  const response = await fetch("https://backend.spokoyno-api.workers.dev/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId, message }),
  });

  if (!response.ok) {
    throw new Error("Backend error");
  }

  const data = await response.json();
  return data.reply as string;
}
