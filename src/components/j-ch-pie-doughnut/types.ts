import type { ChartDataset, ChartOptions } from 'chart.js/auto';
import type { DefineComponent } from 'vue';

// ============ 常量定义 ============
/** 饼图/环形图类型常量 */
export const JChPieDoughnutType = {
  PIE: 'pie',
  DOUGHNUT: 'doughnut',
} as const;

// ============ 类型定义 ============
/** 图表类型 */
export type JChPieDoughnutTypeType = (typeof JChPieDoughnutType)[keyof typeof JChPieDoughnutType];

/** 饼图/环形图数据集类型 */
export type JChPieDoughnutDataset = ChartDataset<'pie'> | ChartDataset<'doughnut'>;

/** JChPieDoughnut Props 接口 */
export interface JChPieDoughnutProps {
  /**
   * 图表类型
   * @required
   * @values 'pie' | 'doughnut'
   */
  type: JChPieDoughnutTypeType;
  /**
   * 数据标签数组
   * @required
   */
  labels: string[];
  /**
   * 数据集数组
   * @required
   * @description Chart.js 饼图/环形图数据集配置
   */
  datasets: JChPieDoughnutDataset[];
  /**
   * Chart.js 配置选项（用于覆写默认配置）
   * @default {}
   */
  options?: Partial<ChartOptions<'pie' | 'doughnut'>>;
  /**
   * 图表高度 (px)
   * @default 300
   */
  height?: number;
}

/** JChPieDoughnut Slots 接口 */
export interface JChPieDoughnutSlots {
  /** 默认插槽 */
  default?: () => any;
}

/** JChPieDoughnut 暴露的方法和属性 */
export interface JChPieDoughnutExpose {
  /** 获取图表容器 DOM 元素 */
  $el: HTMLDivElement | undefined;
}

// ============ 组件实例类型 ============
/** JChPieDoughnut 组件类型定义 */
export type JChPieDoughnutComponent = DefineComponent<
  JChPieDoughnutProps,
  JChPieDoughnutExpose,
  {},
  {},
  {},
  {},
  {},
  {}
>;

/** JChPieDoughnut 实例类型 - 用于 ref 类型定义 */
export type JChPieDoughnutInstance = InstanceType<JChPieDoughnutComponent> & JChPieDoughnutExpose;
