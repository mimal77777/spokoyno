import { useState, useRef, useEffect } from 'react';
import { Send, Heart, Brain, Users, Zap, AlertCircle, ArrowLeft, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './Assistant.module.css';
import { sendMessageToAI } from '../api/chat';
import type { ChatResponse } from '../api/chat';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const getTelegramUserId = (): string => {
  const tg = (window as any).Telegram?.WebApp;
  return tg?.initDataUnsafe?.user?.id ? String(tg.initDataUnsafe.user.id) : 'anonymous';
};

const Assistant = () => {
  const navigate = useNavigate();

  const userId = getTelegramUserId();
  const storageKey = `spokoyno_chat_${userId}`;

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // PAYWALL
  const [payUrl, setPayUrl] = useState<string | null>(null);

  const lastMessageRef = useRef<HTMLDivElement>(null);

  // РУБРИКИ (как у Jivi). Последняя — "Другое"
  const topics = [
    { icon: Heart, text: 'Отношения и близость', color: '#FF6B9D' },
    { icon: Brain, text: 'Тревога и стресс', color: '#6EDAD1' },
    { icon: Users, text: 'Семейные конфликты', color: '#9D84FF' },
    { icon: Zap, text: 'Выгорание и восстановление', color: '#FFA940' },
    { icon: AlertCircle, text: 'Другое', color: '#999' },
  ];

  // ▶️ загрузка истории
  useEffect(() => {
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      try {
        setMessages(JSON.parse(raw));
        return;
      } catch {}
    }

    setMessages([
      {
        id: Date.now(),
        text: 'Здравствуй! Я здесь, чтобы поддержать тебя. Выбери тему или расскажи, что у тебя на душе.',
        sender: 'ai',
        timestamp: new Date(),
      },
    ]);
  }, [storageKey]);

  // ▶️ сохранение истории
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(messages));
  }, [messages, storageKey]);

  // ▶️ автоскролл
  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const pushUserMessage = (text: string) => {
    setMessages((prev) => [...prev, { id: Date.now(), text, sender: 'user', timestamp: new Date() }]);
  };

  const pushAiMessage = (text: string) => {
    setMessages((prev) => [...prev, { id: Date.now() + 1, text, sender: 'ai', timestamp: new Date() }]);
  };

  const askAI = async (text: string) => {
    setLoading(true);
    try {
      const res: ChatResponse = await sendMessageToAI(text);
      pushAiMessage(res.reply);

      if (res.mode && res.mode !== 'trial_ok' && res.pay_url) {
        setPayUrl(res.pay_url);
      }
    } catch {
      pushAiMessage('Извини, сейчас у меня технические сложности. Попробуй позже ❤️');
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    const msg = input.trim();
    if (!msg || loading) return;
    pushUserMessage(msg);
    setInput('');
    await askAI(msg);
  };

  return (
    <div className={styles.assistantScreen}>
      {/* ===== HEADER (как на главном экране по размерам) ===== */}
      <div className={styles.assistantHeader}>
        <button className={styles.backButton} onClick={() => navigate(-1)} aria-label="Назад">
          <ArrowLeft size={32} strokeWidth={2.5} />
        </button>
        <span className={styles.headerTitle}>Помощник</span>
      </div>

      {/* ===== MESSAGES ===== */}
      <div className={styles.messagesArea}>
        {messages.map((m, i) => (
          <div
            key={m.id}
            ref={i === messages.length - 1 ? lastMessageRef : null}
            className={`${styles.message} ${m.sender === 'user' ? styles.userMessage : styles.aiMessage}`}
          >
            <div className={styles.messageContent}>{m.text}</div>
          </div>
        ))}

        {loading && (
          <div className={`${styles.message} ${styles.aiMessage}`}>
            <div className={styles.messageContent}>Думаю…</div>
          </div>
        )}

        {/* РУБРИКИ (показываем в начале, как в Jivi) */}
        {messages.length === 1 && !loading && (
          <div className={styles.topicsContainer}>
            {topics.map((t, i) => (
              <button
                key={i}
                className={styles.topicButton}
                onClick={() => {
                  pushUserMessage(t.text);
                  void askAI(t.text);
                }}
              >
                <div className={styles.topicIcon} style={{ color: t.color }}>
                  <t.icon size={22} strokeWidth={2.3} />
                </div>
                <span className={styles.topicText}>{t.text}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ===== PAYWALL ===== */}
      {payUrl && (
        <div className={styles.paywall}>
          <button className={styles.payButton} onClick={() => window.open(payUrl, '_blank')}>
            <CreditCard size={22} strokeWidth={2.3} />
            <span>Открыть полный доступ</span>
          </button>
        </div>
      )}

      {/* ===== INPUT ===== */}
      <div className={styles.inputBar}>
        <textarea
          className={styles.chatInput}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Напиши сообщение…"
          rows={1}
        />
        <button className={styles.sendButton} onClick={() => void handleSend()} disabled={!input.trim() || loading}>
          <Send size={32} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};

export default Assistant;
