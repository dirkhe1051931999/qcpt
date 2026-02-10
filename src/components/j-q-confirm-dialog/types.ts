import type { QVueGlobals } from 'quasar';
import type { VNode, Component } from 'vue';

// ============ 类型定义 ============
/** JQConfirmDialog 显示参数接口 */
export interface JQConfirmDialogShowParams {
  /**
   * 对话框标题
   * @description 显示在对话框顶部的标题文字
   */
  title: string;
  /**
   * 对话框内容
   * @description 支持 HTML 标签，如 <b></b>
   */
  content: string;
  /**
   * 确认按钮文本
   * @default i18n('action.confirm')
   * @description 自定义确认按钮的显示文字
   */
  confirmButtonText?: string;
  /**
   * 取消按钮文本
   * @default i18n('action.cancel')
   * @description 自定义取消按钮的显示文字
   */
  cancelButtonText?: string;
  /**
   * 是否显示取消按钮
   * @default true
   */
  showCancelButton?: boolean;
  /**
   * 确认按钮颜色
   * @default 'primary'，isDelete 为 true 时默认 'negative'
   * @description Quasar 颜色值
   */
  color?: string;
  /**
   * 是否为删除确认对话框
   * @default false
   * @description 影响默认图标和按钮颜色
   */
  isDelete?: boolean;
  /**
   * 自定义图标
   * @default undefined
   * @description 可以是 Quasar 图标名称字符串或 Vue 组件
   */
  icon?: string | VNode | Component;
  /**
   * 是否显示关闭按钮
   * @default true
   */
  showClose?: boolean;
}

/** @deprecated 使用 JQConfirmDialogShowParams 代替 */
export type ShowParams = JQConfirmDialogShowParams;

// ============ 接口定义 ============
/** JQConfirmDialog 全局实例接口 */
export interface IJQConfirmDialog {
  /**
   * 显示确认对话框
   * @param params 对话框配置参数
   * @returns Promise<boolean> 确认返回 true，取消/关闭返回 false
   */
  show: (params: JQConfirmDialogShowParams) => Promise<boolean>;
  /**
   * 设置 Quasar 实例（在 qcptInit 中调用）
   * @param instance Quasar 全局实例
   */
  setQuasarInstance: (instance: QVueGlobals) => void;
}

/** @deprecated 使用 IJQConfirmDialog 代替 */
export type IGlobalConfirm = IJQConfirmDialog;
