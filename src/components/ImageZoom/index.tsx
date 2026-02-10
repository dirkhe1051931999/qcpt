import { useState } from "react";
import "./index.scss";

// <ImageZoom
//   src="https://cn-sy1.rains3.com/blog-service-oss/20240204/127a4d227749497c9ba0df8b23ab5031.jpg"
//   alt="示例图片"
//   height={600}
// />
interface Props {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export default function ImageZoom({ src, alt, width = 720, height }: Props) {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div className="image-zoom-container">
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`image-zoom ${isZoomed ? "zoomed" : ""}`}
        onClick={() => setIsZoomed(!isZoomed)}
      />
      {isZoomed && (
        <div className="zoom-overlay" onClick={() => setIsZoomed(false)} />
      )}
    </div>
  );
}