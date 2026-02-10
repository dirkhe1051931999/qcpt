import type { ReactNode } from "react";
import "./index.scss";

// <Example title="提示">
//   这是一个可重用的信息框组件。
//   - 支持 Markdown 语法
//   - 可以嵌套其他组件
//   - 样式可自定义
// </Example>
interface Props {
  title: string;
  children: ReactNode;
}

export default function Index({ title, children }: Props) {
  return (
    <div className="info-box">
      <h2 className="info-title">{title}</h2>
      <div className="info-content">{children}</div>
    </div>
  );
}