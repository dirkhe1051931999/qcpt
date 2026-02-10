import type { ChartDataset, ChartOptions } from 'chart.js/auto';
import type { DefineComponent } from 'vue';

// ============ 类型定义 ============
/** 柱状图数据集类型 */
export type JChBarDataset = ChartDataset<'bar'>;

/** JChBar Props 接口 */
export interface JChBarProps {
  /**
   * X 轴标签数组
   * @required
   */
  labels: string[];
  /**
   * 数据集数组
   * @required
   * @description Chart.js 柱状图数据集配置
   */
  datasets: JChBarDataset[];
  /**
   * Chart.js 配置选项（用于覆写默认配置）
   * @default {}
   */
  options?: Partial<ChartOptions<'bar'>>;
  /**
   * 图表高度 (px)
   * @default 300
   */
  height?: number;
}

/** JChBar Slots 接口 */
export interface JChBarSlots {
  /** 默认插槽 */
  default?: () => any;
}

/** JChBar 暴露的方法和属性 */
export interface JChBarExpose {
  /** 获取图表容器 DOM 元素 */
  $el: HTMLDivElement | undefined;
}

// ============ 组件实例类型 ============
/** JChBar 组件类型定义 */
export type JChBarComponent = DefineComponent<
  JChBarProps,
  JChBarExpose,
  {},
  {},
  {},
  {},
  {},
  {}
>;

/** JChBar 实例类型 - 用于 ref 类型定义 */
export type JChBarInstance = InstanceType<JChBarComponent> & JChBarExpose;
