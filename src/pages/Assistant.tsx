import { useState, useRef, useEffect } from 'react';
import { Send, Heart, Brain, Users, Zap, AlertCircle } from 'lucide-react';
import styles from './Assistant.module.css';
import { sendMessageToAI } from '../api/chat';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const Assistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Здравствуй! Я здесь, чтобы поддержать тебя. Выбери тему или расскажи, что у тебя на душе.',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const messagesWrapperRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  // Получаем реальный Telegram user_id
  const USER_ID = (window as any).Telegram?.WebApp?.initDataUnsafe?.user?.id?.toString() || 'test123';

  const topics = [
    { icon: Heart, text: 'Отношения и близость', color: '#FF6B9D' },
    { icon: Brain, text: 'Тревога и стресс', color: '#6EDAD1' },
    { icon: Users, text: 'Семейные конфликты', color: '#9D84FF' },
    { icon: Zap, text: 'Выгорание и усталость', color: '#FFA940' },
    { icon: AlertCircle, text: 'Другое', color: '#999' },
  ];

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }
  }, [messages, loading]);

  const pushUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const pushAiMessage = (text: string) => {
    const aiResponse: Message = {
      id: Date.now() + 1,
      text,
      sender: 'ai',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, aiResponse]);
  };

  const askAI = async (text: string) => {
    setLoading(true);
    try {
      const reply = await sendMessageToAI(USER_ID, text);
      pushAiMessage(reply);
    } catch (e) {
      pushAiMessage('Извини, сейчас у меня технические сложности. Попробуй чуть позже, я буду рада помочь ❤️');
    } finally {
      setLoading(false);
    }
  };

  const handleTopicClick = async (topic: string) => {
    if (loading) return;
    pushUserMessage(topic);
    await askAI(topic);
  };

  const handleSend = async () => {
    const msg = input.trim();
    if (!msg || loading) return;
    pushUserMessage(msg);
    setInput('');
    await askAI(msg);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  };

  return (
    <div className={styles.assistantPage}>
      <div className={styles.chatBox}>
        <div className={styles.messagesWrapper} ref={messagesWrapperRef}>
          {messages.map((message, index) => (
            <div
              key={message.id}
              ref={index === messages.length - 1 ? lastMessageRef : null}
              className={`${styles.message} ${
                message.sender === 'user' ? styles.userMessage : styles.aiMessage
              }`}
            >
              <div className={styles.messageContent}>{message.text}</div>
            </div>
          ))}

          {loading && (
            <div 
              ref={lastMessageRef}
              className={`${styles.message} ${styles.aiMessage}`}
            >
              <div className={styles.messageContent}>Думаю…</div>
            </div>
          )}

          {messages.length === 1 && !loading && (
            <div className={styles.topicsContainer}>
              {topics.map((topic, idx) => (
                <button
                  key={idx}
                  className={styles.topicButton}
                  onClick={() => void handleTopicClick(topic.text)}
                >
                  <div className={styles.topicIcon} style={{ color: topic.color }}>
                    <topic.icon size={24} strokeWidth={2} />
                  </div>
                  <span className={styles.topicText}>{topic.text}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.chatInputWrap}>
        <textarea
          className={styles.chatInput}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Напиши сообщение..."
          rows={1}
        />
        <button
          className={styles.chatSendBtn}
          onClick={() => void handleSend()}
          disabled={!input.trim() || loading}
          title={loading ? 'Подожди, я отвечаю…' : 'Отправить'}
        >
          <Send size={44} />
        </button>
      </div>
    </div>
  );
};

export default Assistant;