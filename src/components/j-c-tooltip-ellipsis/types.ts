import type { DefineComponent } from 'vue';
import type { TooltipPlacement, TooltipEffect } from '../j-c-tooltip/types';

// ============ 类型定义 ============

/** JCTooltipEllipsis Props 接口 */
export interface JCTooltipEllipsisProps {
  /**
   * 文本内容
   * @default ''
   */
  content?: string;
  /**
   * 内容样式
   * @default 'width:100%'
   */
  contentStyle?: string;
  /**
   * 省略行数
   * @default 1
   * @description 1为单行省略，>1为多行省略
   */
  lines?: number;
  /**
   * Tooltip 位置
   * @default 'top'
   */
  placement?: TooltipPlacement;
  /**
   * Tooltip 效果
   * @default 'dark'
   */
  effect?: TooltipEffect;
  /**
   * Tooltip 最大宽度
   * @default '300px'
   */
  maxWidth?: string;
  /**
   * Tooltip 偏移距离
   * @default 12
   */
  offset?: number;
}

/** JCTooltipEllipsis Slots 接口 */
export interface JCTooltipEllipsisSlots {
  /** 默认插槽，用于自定义内容 */
  default?: () => any;
}

// ============ 组件实例类型 ============

/** JCTooltipEllipsis 组件类型定义 */
export type JCTooltipEllipsisComponent = DefineComponent<
  JCTooltipEllipsisProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {}
>;

/** JCTooltipEllipsis 实例类型 - 用于 ref 类型定义 */
export type JCTooltipEllipsisInstance = InstanceType<JCTooltipEllipsisComponent>;
