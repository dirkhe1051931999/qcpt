import { useRef } from "react";
import "./index.scss";

/**
 *
 * <VideoPlayer
 *     src="https://cn-sy1.rains3.com/blog-service-oss/assets/video_lib/20230822/75313f24bf2241e28631a4204dbf3131.mp4"
 *     poster="https://cn-sy1.rains3.com/blog-service-oss/assets/cover_lib/19c0402244904fa1a127ff15ba8eacd1.png"
 * />
 * */
interface Props {
  src: string;
  poster?: string;
  width?: number;
  height?: number;
}

export default function VideoPlayer({
  src,
  poster,
  width = 720,
  height = 360,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="video-player">
      <video
        ref={videoRef}
        width={width}
        height={height}
        poster={poster}
        controls
      >
        <source src={src} type="video/mp4" />
        您的浏览器不支持视频播放。
      </video>
    </div>
  );
}