import type { ChartDataset, ChartOptions } from 'chart.js/auto';
import type { DefineComponent } from 'vue';

// ============ 类型定义 ============
/** 雷达图数据集类型 */
export type JChRadarDataset = ChartDataset<'radar'>;

/** JChRadar Props 接口 */
export interface JChRadarProps {
  /**
   * 轴标签数组
   * @required
   */
  labels: string[];
  /**
   * 数据集数组
   * @required
   * @description Chart.js 雷达图数据集配置
   */
  datasets: JChRadarDataset[];
  /**
   * Chart.js 配置选项（用于覆写默认配置）
   * @default {}
   */
  options?: Partial<ChartOptions<'radar'>>;
  /**
   * 图表高度 (px)
   * @default 300
   */
  height?: number;
}

/** JChRadar Slots 接口 */
export interface JChRadarSlots {
  /** 默认插槽 */
  default?: () => any;
}

/** JChRadar 暴露的方法和属性 */
export interface JChRadarExpose {
  /** 获取图表容器 DOM 元素 */
  $el: HTMLDivElement | undefined;
}

// ============ 组件实例类型 ============
/** JChRadar 组件类型定义 */
export type JChRadarComponent = DefineComponent<
  JChRadarProps,
  JChRadarExpose,
  {},
  {},
  {},
  {},
  {},
  {}
>;

/** JChRadar 实例类型 - 用于 ref 类型定义 */
export type JChRadarInstance = InstanceType<JChRadarComponent> & JChRadarExpose;
