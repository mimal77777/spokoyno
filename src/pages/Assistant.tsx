import { useState } from 'react';
import { Send, Heart, Brain, Users, Zap, AlertCircle } from 'lucide-react';
import styles from './Assistant.module.css';

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

  const topics = [
    { icon: Heart, text: 'Отношения и близость', color: '#FF6B9D' },
    { icon: Brain, text: 'Тревога и стресс', color: '#6EDAD1' },
    { icon: Users, text: 'Семейные конфликты', color: '#9D84FF' },
    { icon: Zap, text: 'Выгорание и усталость', color: '#FFA940' },
    { icon: AlertCircle, text: 'Другое', color: '#999' },
  ];

  const handleTopicClick = (topic: string) => {
    const newMessage: Message = {
      id: messages.length + 1,
      text: topic,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);

    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: `Я вижу, тебя беспокоит тема "${topic}". Расскажи подробнее, что именно происходит? Я здесь, чтобы выслушать и помочь.`,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const handleSend = () => {
    const msg = input.trim();
    if (!msg) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: msg,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInput('');

    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: 'Спасибо, что поделился со мной. Я здесь, чтобы помочь тебе разобраться в этом.',
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={styles.assistantPage}>
      {/* Сообщения */}
      <div className={styles.chatBox}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${styles.message} ${
              message.sender === 'user' ? styles.userMessage : styles.aiMessage
            }`}
          >
            <div className={styles.messageContent}>{message.text}</div>
          </div>
        ))}

        {/* Варианты тем (показываем только если 1 сообщение) */}
        {messages.length === 1 && (
          <div className={styles.topicsContainer}>
            {topics.map((topic, idx) => (
              <button
                key={idx}
                className={styles.topicButton}
                onClick={() => handleTopicClick(topic.text)}
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

      {/* Поле ввода */}
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
          onClick={handleSend}
          disabled={!input.trim()}
        >
          <Send size={44} />
        </button>
      </div>
    </div>
  );
};

export default Assistant;