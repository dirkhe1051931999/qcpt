import type { DefineComponent } from 'vue';

// ============ 类型定义 ============

/** JQConfirm Props 接口 */
export interface JQConfirmProps {
  /**
   * 确认弹窗标题
   * @default ''
   */
  title?: string;
  /**
   * 确认按钮文字
   * @default '' (使用 i18n 默认值 action.confirm)
   */
  confirmText?: string;
  /**
   * 取消按钮文字
   * @default '' (使用 i18n 默认值 action.cancel)
   */
  cancelText?: string;
}

/** JQConfirm Emits 接口 */
export interface JQConfirmEmits {
  /**
   * 确认事件
   * @description 用户点击确认按钮时触发
   */
  (e: 'confirm'): void;
}

/** JQConfirm Slots 接口 */
export interface JQConfirmSlots {
  /** 默认插槽，用于放置触发弹窗的元素 */
  default?: () => any;
}

/** JQConfirm 暴露的方法和属性 */
export interface JQConfirmExpose {
  /** 获取内部 QPopupProxy 组件的引用 */
  popupRef: any;
}

// ============ 组件实例类型 ============

/** Emits 配置对象格式 (用于 DefineComponent) */
export type JQConfirmEmitsOptions = {
  confirm: () => true;
};

/** JQConfirm 组件类型定义 */
export type JQConfirmComponent = DefineComponent<
  JQConfirmProps,
  JQConfirmExpose,
  {},
  {},
  {},
  {},
  {},
  JQConfirmEmitsOptions
>;

/** JQConfirm 实例类型 - 用于 ref 类型定义 */
export type JQConfirmInstance = InstanceType<JQConfirmComponent> & JQConfirmExpose;

// ============ 模板中使用的 Props 类型 (用于类型提示) ============
/**
 * 用于模板中的 Props 类型定义
 * 包含事件处理器和插槽
 */
export interface JQConfirmTemplateProps extends JQConfirmProps {
  /** 确认事件处理器 */
  onConfirm?: () => void;
}

