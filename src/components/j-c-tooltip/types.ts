import type { DefineComponent } from 'vue';

// ============ 常量定义 ============
/** Tooltip 位置常量 */
export const JCTooltipPlacement = {
  TOP: 'top',
  TOP_START: 'top-start',
  TOP_END: 'top-end',
  BOTTOM: 'bottom',
  BOTTOM_START: 'bottom-start',
  BOTTOM_END: 'bottom-end',
  LEFT: 'left',
  LEFT_START: 'left-start',
  LEFT_END: 'left-end',
  RIGHT: 'right',
  RIGHT_START: 'right-start',
  RIGHT_END: 'right-end',
} as const;

/** Tooltip 主题常量 */
export const JCTooltipEffect = {
  DARK: 'dark',
  LIGHT: 'light',
} as const;

/** Tooltip 触发方式常量 */
export const JCTooltipTrigger = {
  HOVER: 'hover',
  CLICK: 'click',
  MANUAL: 'manual',
} as const;

// ============ 类型定义 ============
/** Tooltip 位置类型 */
export type JCTooltipPlacementType = (typeof JCTooltipPlacement)[keyof typeof JCTooltipPlacement];

/** Tooltip 主题类型 */
export type JCTooltipEffectType = (typeof JCTooltipEffect)[keyof typeof JCTooltipEffect];

/** Tooltip 触发方式类型 */
export type JCTooltipTriggerType = (typeof JCTooltipTrigger)[keyof typeof JCTooltipTrigger];

/** JCTooltip Props 接口 */
export interface JCTooltipProps {
  /**
   * 显示的内容
   * @default ''
   */
  content?: string;
  /**
   * 弹出位置
   * @default 'top'
   * @values 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'
   */
  placement?: JCTooltipPlacementType;
  /**
   * 主题风格
   * @default 'dark'
   * @values 'dark' | 'light'
   */
  effect?: JCTooltipEffectType;
  /**
   * 触发方式
   * @default 'hover'
   * @values 'hover' | 'click' | 'manual'
   */
  trigger?: JCTooltipTriggerType;
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * 是否显示箭头
   * @default true
   */
  showArrow?: boolean;
  /**
   * 延迟显示时间（毫秒）
   * @default 0
   */
  openDelay?: number;
  /**
   * 延迟隐藏时间（毫秒）
   * @default 200
   */
  closeDelay?: number;
  /**
   * 最大宽度
   * @default '300px'
   */
  maxWidth?: string;
  /**
   * 偏移量（像素）
   * @default 12
   */
  offset?: number;
  /**
   * 手动控制显示状态（v-model）
   * @default undefined
   */
  modelValue?: boolean;
}

/** JCTooltip Emits 接口 */
export interface JCTooltipEmits {
  /**
   * 更新显示状态事件
   * @param value 新的显示状态
   */
  (e: 'update:modelValue', value: boolean): void;
}

/** JCTooltip Slots 接口 */
export interface JCTooltipSlots {
  /** 默认插槽，触发 tooltip 的元素 */
  default?: () => any;
  /** 内容插槽，自定义 tooltip 内容 */
  content?: () => any;
}

/** JCTooltip 暴露的方法和属性 */
export interface JCTooltipExpose {
  /** 获取触发元素的 DOM 引用 */
  $el: HTMLElement | undefined;
  /** 当前是否显示 */
  visible: boolean;
  /** 当前实际位置（可能因边界检测而改变） */
  currentPlacement: JCTooltipPlacementType;
}

// ============ 组件实例类型 ============
/** Emits 配置对象格式 (用于 DefineComponent) */
export type JCTooltipEmitsOptions = {
  'update:modelValue': (value: boolean) => true;
};

/** JCTooltip 组件类型定义 */
export type JCTooltipComponent = DefineComponent<
  JCTooltipProps,
  JCTooltipExpose,
  {},
  {},
  {},
  {},
  {},
  JCTooltipEmitsOptions
>;

/** JCTooltip 实例类型 - 用于 ref 类型定义 */
export type JCTooltipInstance = InstanceType<JCTooltipComponent> & JCTooltipExpose;

// ============ 兼容旧版类型别名 ============
/** @deprecated 请使用 JCTooltipPlacementType */
export type TooltipPlacement = JCTooltipPlacementType;

/** @deprecated 请使用 JCTooltipEffectType */
export type TooltipEffect = JCTooltipEffectType;

/** @deprecated 请使用 JCTooltipTriggerType */
export type TooltipTrigger = JCTooltipTriggerType;

/** @deprecated 请使用 JCTooltipProps */
export type TooltipProps = JCTooltipProps;
