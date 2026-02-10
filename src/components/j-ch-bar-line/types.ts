import type { ChartDataset, ChartOptions } from 'chart.js/auto';
import type { DefineComponent } from 'vue';

// ============ 类型定义 ============
/** 混合图数据集类型（支持 bar 和 line） */
export type JChBarLineDataset = ChartDataset<'bar'> | ChartDataset<'line'>;

/** JChBarLine Props 接口 */
export interface JChBarLineProps {
  /**
   * X 轴标签数组
   * @required
   */
  labels: string[];
  /**
   * 数据集数组
   * @required
   * @description Chart.js 混合图数据集配置，支持 bar 和 line 类型
   */
  datasets: JChBarLineDataset[];
  /**
   * Chart.js 配置选项（用于覆写默认配置）
   * @default {}
   */
  options?: Partial<ChartOptions<'bar' | 'line'>>;
  /**
   * 图表高度 (px)
   * @default 300
   */
  height?: number;
}

/** JChBarLine Slots 接口 */
export interface JChBarLineSlots {
  /** 默认插槽 */
  default?: () => any;
}

/** JChBarLine 暴露的方法和属性 */
export interface JChBarLineExpose {
  /** 获取图表容器 DOM 元素 */
  $el: HTMLDivElement | undefined;
}

// ============ 组件实例类型 ============
/** JChBarLine 组件类型定义 */
export type JChBarLineComponent = DefineComponent<
  JChBarLineProps,
  JChBarLineExpose,
  {},
  {},
  {},
  {},
  {},
  {}
>;

/** JChBarLine 实例类型 - 用于 ref 类型定义 */
export type JChBarLineInstance = InstanceType<JChBarLineComponent> & JChBarLineExpose;
