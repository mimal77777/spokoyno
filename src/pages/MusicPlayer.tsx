import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Home, Play, Pause, SkipBack, SkipForward, Upload } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import styles from "./Music.module.css";

// Моковые данные треков (позже заменишь на реальные)
const tracksByCategory: Record<string, any[]> = {
  calm: [
    { id: 1, title: "Peaceful Morning", artist: "Ambient", duration: "4:32", url: "/music/calm1.mp3" },
    { id: 2, title: "Gentle Waves", artist: "Nature", duration: "5:15", url: "/music/calm2.mp3" },
  ],
  focus: [
    { id: 1, title: "Deep Work", artist: "Focus", duration: "6:20", url: "/music/focus1.mp3" },
    { id: 2, title: "Flow State", artist: "Productivity", duration: "5:45", url: "/music/focus2.mp3" },
  ],
  energy: [
    { id: 1, title: "Energy Boost", artist: "Upbeat", duration: "3:40", url: "/music/energy1.mp3" },
    { id: 2, title: "Power Up", artist: "Motivation", duration: "4:10", url: "/music/energy2.mp3" },
  ],
  sleep: [
    { id: 1, title: "Dream Sequence", artist: "Sleep", duration: "8:00", url: "/music/sleep1.mp3" },
    { id: 2, title: "Night Sky", artist: "Ambient", duration: "7:30", url: "/music/sleep2.mp3" },
  ],
  soundscapes: [
    { id: 1, title: "Rain Forest", artist: "Nature", duration: "10:00", url: "/music/rain.mp3" },
    { id: 2, title: "Ocean Waves", artist: "Nature", duration: "12:00", url: "/music/ocean.mp3" },
  ],
  noise: [
    { id: 1, title: "White Noise", artist: "Noise", duration: "∞", url: "/music/white-noise.mp3" },
    { id: 2, title: "Pink Noise", artist: "Noise", duration: "∞", url: "/music/pink-noise.mp3" },
  ],
};

const categoryTitles: Record<string, string> = {
  calm: "Спокойствие",
  focus: "Фокус",
  energy: "Разрядка",
  sleep: "Сон",
  soundscapes: "Звуки природы",
  noise: "Фоновый шум",
};

export default function MusicPlayer() {
  const navigate = useNavigate();
  const { category } = useParams<{ category: string }>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [tracks, setTracks] = useState(tracksByCategory[category || "calm"] || []);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const currentTrack = tracks[currentTrackIndex];

  // Canvas визуализация
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    let rotation = 0;
    let amplitude = isPlaying ? 1 : 0.3;

    function animate() {
      if (!ctx || !canvas) return;
      
      // Плавный переход амплитуды
      const targetAmplitude = isPlaying ? 1 : 0.3;
      amplitude += (targetAmplitude - amplitude) * 0.05;

      // Градиентный фон
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, canvas.width / 2);
      gradient.addColorStop(0, '#6EDAD1');
      gradient.addColorStop(0.5, '#3BB6AE');
      gradient.addColorStop(1, '#e3f5f1');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Волны
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 2;

      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        const radius = 40 + i * 30;
        const wave = Math.sin(rotation + i * 0.5) * 10 * amplitude;
        
        for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
          const r = radius + Math.sin(angle * 3 + rotation * 2) * wave;
          const x = centerX + Math.cos(angle) * r;
          const y = centerY + Math.sin(angle) * r;
          
          if (angle === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();
        ctx.stroke();
      }

      rotation += 0.02 * amplitude;
      requestAnimationFrame(animate);
    }

    animate();
  }, [isPlaying]);

  // Аудио контроль
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => handleNext();

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrackIndex]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    setCurrentTrackIndex((prev) => (prev > 0 ? prev - 1 : tracks.length - 1));
    setIsPlaying(false);
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev < tracks.length - 1 ? prev + 1 : 0));
    setIsPlaying(false);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    audio.currentTime = percentage * duration;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    const newTrack = {
      id: Date.now(),
      title: file.name.replace(/\.\w+$/, ''),
      artist: "Загружено",
      duration: "—",
      url,
      custom: true,
    };

    setTracks([...tracks, newTrack]);
  };

  const formatTime = (time: number) => {
    if (!isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={styles.screen}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate(-1)} aria-label="Назад">
          <ArrowLeft size={32} strokeWidth={2.5} />
        </button>
        <span className={styles.headerTitle}>{categoryTitles[category || "calm"]}</span>
        <button className={styles.homeButton} onClick={() => navigate("/")} aria-label="На главную">
          <Home size={28} strokeWidth={2.5} />
        </button>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.playerWrapper}>
          {/* Визуализация */}
          <div className={styles.visualizer}>
            <canvas ref={canvasRef} className={styles.visualizerCanvas} />
          </div>

          {/* Плеер */}
          <div className={styles.playerControls}>
            <div className={styles.trackInfo}>
              <div className={styles.trackTitle}>{currentTrack?.title || "—"}</div>
              <div className={styles.trackArtist}>{currentTrack?.artist || "—"}</div>
            </div>

            <div className={styles.progressBar} onClick={handleSeek}>
              <div
                className={styles.progressFill}
                style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
              />
            </div>

            <div className={styles.timeDisplay}>
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>

            <div className={styles.buttons}>
              <button className={styles.controlBtn} onClick={handlePrevious}>
                <SkipBack size={24} />
              </button>
              <button className={`${styles.controlBtn} ${styles.playBtn}`} onClick={togglePlay}>
                {isPlaying ? <Pause size={28} /> : <Play size={28} />}
              </button>
              <button className={styles.controlBtn} onClick={handleNext}>
                <SkipForward size={24} />
              </button>
            </div>
          </div>

          {/* Список треков */}
          <div className={styles.trackList}>
            <div className={styles.trackListTitle}>Треки</div>
            {tracks.map((track, index) => (
              <div
                key={track.id}
                className={`${styles.track} ${index === currentTrackIndex ? styles.trackActive : ''}`}
                onClick={() => {
                  setCurrentTrackIndex(index);
                  setIsPlaying(false);
                }}
              >
                <div className={styles.trackNumber}>{index + 1}</div>
                <div className={styles.trackName}>{track.title}</div>
                <div className={styles.trackDuration}>{track.duration}</div>
              </div>
            ))}

            <button className={styles.uploadBtn} onClick={() => fileInputRef.current?.click()}>
              <Upload size={18} />
              <span>Добавить свой файл</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
          </div>
        </div>
      </div>

      {/* Скрытый audio элемент */}
      <audio ref={audioRef} src={currentTrack?.url} />
    </div>
  );
}