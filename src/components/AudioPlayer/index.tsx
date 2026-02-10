import { useRef, useState } from "react";
import "./index.scss";

interface Props {
  src: string;
  title?: string;
}

export default function AudioPlayer({ src, title }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="audio-player">
      {title && <div className="audio-title">{title}</div>}
      <audio ref={audioRef} src={src} onEnded={() => setIsPlaying(false)} />
      <button onClick={togglePlay}>{isPlaying ? "暂停" : "播放"}</button>
    </div>
  );
}