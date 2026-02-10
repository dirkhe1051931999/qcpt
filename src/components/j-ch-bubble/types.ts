import type { ChartDataset, ChartOptions } from 'chart.js/auto';
import type { DefineComponent } from 'vue';

// ============ 类型定义 ============
/** 气泡图数据点类型 */
export interface JChBubbleDataPoint {
  /** X 轴坐标值 */
  x: number;
  /** Y 轴坐标值 */
  y: number;
  /** 气泡半径 */
  r: number;
}

/** 气泡图数据集类型 */
export type JChBubbleDataset = ChartDataset<'bubble', JChBubbleDataPoint[]>;

/** JChBubble Props 接口 */
export interface JChBubbleProps {
  /**
   * X 轴标签数组
   * @default []
   */
  labels?: string[];
  /**
   * 数据集数组
   * @required
   * @description Chart.js 气泡图数据集配置
   */
  datasets: JChBubbleDataset[];
  /**
   * Chart.js 配置选项（用于覆写默认配置）
   * @default {}
   */
  options?: Partial<ChartOptions<'bubble'>>;
  /**
   * 图表高度 (px)
   * @default 300
   */
  height?: number;
}

/** JChBubble Slots 接口 */
export interface JChBubbleSlots {
  /** 默认插槽 */
  default?: () => any;
}

/** JChBubble 暴露的方法和属性 */
export interface JChBubbleExpose {
  /** 获取图表容器 DOM 元素 */
  $el: HTMLDivElement | undefined;
}

// ============ 组件实例类型 ============
/** JChBubble 组件类型定义 */
export type JChBubbleComponent = DefineComponent<
  JChBubbleProps,
  JChBubbleExpose,
  {},
  {},
  {},
  {},
  {},
  {}
>;

/** JChBubble 实例类型 - 用于 ref 类型定义 */
export type JChBubbleInstance = InstanceType<JChBubbleComponent> & JChBubbleExpose;
