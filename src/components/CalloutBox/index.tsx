import type { ReactNode } from "react";
import "./index.scss";

// <CalloutBox type="info" title="提示">
//   这是一个信息提示框，可以用来展示重要信息。
// </CalloutBox>
interface Props {
  type: "info" | "warning" | "success" | "error";
  title?: string;
  children: ReactNode;
}

export default function CalloutBox({ type, title, children }: Props) {
  return (
    <div className={`callout callout-${type}`}>
      {title && <h3 className="callout-title">{title}</h3>}
      <div className="callout-content">{children}</div>
    </div>
  );
}