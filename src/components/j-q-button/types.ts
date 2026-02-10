import type { QBtnProps } from 'quasar';
import type { TooltipProps } from '../j-c-tooltip/types';

// ============ 常量定义 ============
// 可在外部使用的按钮尺寸常量
export const JQButtonSize = {
  LARGE: 'large',
  NORMAL: 'normal',
  SMALL: 'small',
} as const;

// 可在外部使用的按钮类型常量
export const JQButtonType = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  TEXT: 'text',
} as const;

// ============ 类型定义 ============
/** 按钮尺寸类型 */
export type JQButtonSizeType = (typeof JQButtonSize)[keyof typeof JQButtonSize];

/** 按钮类型 */
export type JQButtonTypeType = (typeof JQButtonType)[keyof typeof JQButtonType];

/** JQButton Props 接口 */
export interface JQButtonProps {
  /** 
   * 按钮大小 
   * @default 'large'
   * @description 控制按钮的尺寸大小
   * @values 'large' | 'normal' | 'small'
   */
  size?: JQButtonSizeType;
  /** 
   * 按钮类型 
   * @default 'primary'
   * @description 控制按钮的样式风格
   * @values 'primary' | 'secondary' | 'text'
   */
  type?: JQButtonTypeType;
  /**
   * 按钮标签文字
   * @default ''
   */
  label?: string;
  /**
   * 按钮图标 (Quasar icon name)
   * @default undefined
   */
  icon?: string;
  /**
   * 按钮加载状态
   * @default false
   */
  loading?: boolean;
  /**
   * 按钮提示文字 (tooltip)
   * @default ''
   */
  tips?: string | number;
  /**
   * Tooltip 配置项
   * @default undefined
   */
  tooltipConfig?: Omit<TooltipProps, 'content'>;
}

/** JQButton Emits 接口 */
export interface JQButtonEmits {
  /**
   * 点击事件
   * @param e 原生点击事件
   */
  (e: 'click', event: Event): void;
}

/** JQButton Slots 接口 */
export interface JQButtonSlots {
  /** 默认插槽，用于自定义按钮内容 */
  default?: () => any;
  /** 图标插槽，用于自定义前置图标 */
  icon?: () => any;
  /** 加载插槽，用于自定义加载状态显示 */
  loading?: () => any;
}

/** JQButton 暴露的方法和属性 */
export interface JQButtonExpose {
  /** 获取内部 QBtn 组件的 DOM 元素 */
  $el: HTMLElement | undefined;
  /** 触发点击事件 */
  click: () => void;
}

// ============ 组件实例类型 ============
import type { DefineComponent } from 'vue';

/** 合并后的完整 Props 类型 (包含 QBtn 的 Props) */
export type JQButtonAllProps = JQButtonProps & Omit<QBtnProps, keyof JQButtonProps>;

/** Emits 配置对象格式 (用于 DefineComponent) */
export type JQButtonEmitsOptions = {
  click: (e: Event) => true;
};

/** JQButton 组件类型定义 */
export type JQButtonComponent = DefineComponent<
  JQButtonAllProps,
  JQButtonExpose,
  {},
  {},
  {},
  {},
  {},
  JQButtonEmitsOptions
>;

/** JQButton 实例类型 - 用于 ref 类型定义 */
export type JQButtonInstance = InstanceType<JQButtonComponent> & JQButtonExpose;

// ============ 模板中使用的 Props 类型 (用于类型提示) ============
/** 
 * 用于模板中的 Props 类型定义
 * 包含事件处理器和插槽
 */
export interface JQButtonTemplateProps extends JQButtonProps {
  /** 点击事件处理器 */
  onClick?: (event: Event) => void;
  /** 禁用状态 (继承自 QBtn) */
  disable?: boolean;
  /** 圆形按钮 (继承自 QBtn) */
  round?: boolean;
  /** 扁平按钮 (继承自 QBtn) */
  flat?: boolean;
  /** 轮廓按钮 (继承自 QBtn) */
  outline?: boolean;
  /** 按钮颜色 (继承自 QBtn) */
  color?: string;
  /** 文字颜色 (继承自 QBtn) */
  textColor?: string;
  /** 按钮链接 (继承自 QBtn) */
  href?: string;
  /** 链接目标 (继承自 QBtn) */
  target?: string;
  /** 路由跳转 (继承自 QBtn) */
  to?: string | object;
  /** Tooltip 配置项 */
  tooltipConfig?: Omit<TooltipProps, 'content'>;
}

