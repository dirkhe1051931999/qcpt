import type { ChartDataset, ChartOptions } from 'chart.js/auto';
import type { DefineComponent } from 'vue';

// ============ 类型定义 ============
/** 折线图数据集类型 */
export type JChLineDataset = ChartDataset<'line'>;

/** JChLine Props 接口 */
export interface JChLineProps {
  /**
   * X 轴标签数组
   * @required
   */
  labels: string[];
  /**
   * 数据集数组
   * @required
   * @description Chart.js 折线图数据集配置
   */
  datasets: JChLineDataset[];
  /**
   * Chart.js 配置选项（用于覆写默认配置）
   * @default {}
   */
  options?: Partial<ChartOptions<'line'>>;
  /**
   * 图表高度 (px)
   * @default 300
   */
  height?: number;
}

/** JChLine Slots 接口 */
export interface JChLineSlots {
  /** 默认插槽 */
  default?: () => any;
}

/** JChLine 暴露的方法和属性 */
export interface JChLineExpose {
  /** 获取图表容器 DOM 元素 */
  $el: HTMLDivElement | undefined;
}

// ============ 组件实例类型 ============
/** JChLine 组件类型定义 */
export type JChLineComponent = DefineComponent<
  JChLineProps,
  JChLineExpose,
  {},
  {},
  {},
  {},
  {},
  {}
>;

/** JChLine 实例类型 - 用于 ref 类型定义 */
export type JChLineInstance = InstanceType<JChLineComponent> & JChLineExpose;
