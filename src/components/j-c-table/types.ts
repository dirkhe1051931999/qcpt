export interface JCTableColumn {
  /** 列的唯一标识 */
  name: string;
  /** 列的显示标题 */
  label?: string;
  /** 数据字段名（默认使用 name） */
  field?: string | ((row: any) => any);
  /** 格式化函数 */
  format?: (value: any, row: any) => string;
  /** 列宽度 */
  width?: string | number;
  /** 最小宽度 */
  minWidth?: string | number;
  /** 最大宽度（超出时省略） */
  maxWidth?: string | number;
  /** 最多显示几行（超出后省略，1-3） */
  wrapCount?: number;
  /** 是否显示省略号 tooltip（默认 true） */
  ellipsisTooltip?: boolean;
  /** 是否显示复制按钮 */
  copy?: boolean;
  /** 是否可点击，可以是 boolean 或 Function */
  clickable?: boolean | ((value: any, row: any) => boolean);
  /** 点击事件回调 */
  onClick?: (value: any, row: any) => void;
  /** 固定在左侧 */
  pinLeft?: boolean;
  /** 固定在右侧 */
  pinRight?: boolean;
  /** 文本对齐方式 */
  align?: 'left' | 'center' | 'right';
  /** 自定义 class */
  class?: string;
  /** 自定义 style */
  style?: string | Record<string, any>;
}

export interface JCTableProps {
  /** 列配置 */
  columns: JCTableColumn[];
  /** 行数据 */
  rows: any[];
  /** 行的唯一标识字段 */
  rowKey?: string;
  /** 空数据提示文本 */
  emptyText?: string;
  /** 是否固定第一列 */
  firstColumnPinned?: boolean;
  /** 是否固定最后一列 */
  lastColumnPinned?: boolean;
  /** 是否固定表头 */
  fixedHeader?: boolean;
  /** 表体最大高度 */
  maxBodyHeight?: string | number;
}
