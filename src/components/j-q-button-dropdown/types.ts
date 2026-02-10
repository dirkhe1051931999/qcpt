import type { QBtnDropdownProps } from 'quasar';

// ============ 常量定义 ============
// 按钮尺寸常量
export const JQButtonDropdownSize = {
  LARGE: 'large',
  NORMAL: 'normal',
  SMALL: 'small',
} as const;

// 按钮类型常量
export const JQButtonDropdownType = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
} as const;

// ============ 类型定义 ============
/** 按钮尺寸类型 */
export type JQButtonDropdownSizeType = (typeof JQButtonDropdownSize)[keyof typeof JQButtonDropdownSize];

/** 按钮类型 */
export type JQButtonDropdownTypeType = (typeof JQButtonDropdownType)[keyof typeof JQButtonDropdownType];

/** 下拉菜单项接口 */
export interface JQButtonDropdownItem {
  /** 显示标签 */
  label: string;
  /** 选项值 */
  value?: string | number;
  /** 是否禁用 */
  disabled?: boolean;
  /** 图标 */
  icon?: string;
  /** 点击回调 */
  onClick?: () => void;
  /** 权限码，用于权限控制，不传则默认显示 */
  code?: string | null;
}

/** JQButtonDropdown Props 接口 */
export interface JQButtonDropdownProps {
  /**
   * 按钮标签文字
   */
  label?: string;
  /**
   * 下拉菜单项列表
   * @default []
   * @description 下拉菜单项列表
   * @type {JQButtonDropdownItem[]}
   * @example
   * [
   *   {
   *     label: '选项1',
   *     value: 'option1',
   *     disabled: false,
   *     icon: 'app:icon-name', // Optional, Quasar icon name
   *     onClick: () => {
   *       console.log('选项1被点击'); // Optional, 点击回调
   *     },
   *   }
   * ]
   */
  items?: JQButtonDropdownItem[];
  /**
   * 按钮大小
   * @default 'large'
   * @values 'large' | 'normal' | 'small'
   */
  size?: JQButtonDropdownSizeType;
  /**
   * 按钮类型
   * @default 'primary'
   * @values 'primary' | 'secondary'
   */
  type?: JQButtonDropdownTypeType;
  /**
   * 下拉箭头图标
   * @default null
   */
  dropdownIcon?: string;
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * 菜单锚点位置（相对于按钮）
   * @default 'bottom left'
   */
  menuAnchor?: string;
  /**
   * 菜单自身定位点
   * @default 'top left'
   */
  menuSelf?: string;
  /**
   * 菜单偏移量 [x, y]
   * @default [0, 4]
   */
  menuOffset?: [number, number];
}

/** JQButtonDropdown Emits 接口 */
export interface JQButtonDropdownEmits {
  /**
   * 选择菜单项事件
   * @param item 选中的菜单项
   */
  (e: 'select', item: JQButtonDropdownItem): void;
}

/** JQButtonDropdown Slots 接口 */
export interface JQButtonDropdownSlots {
  /** 默认插槽，用于自定义下拉菜单内容 */
  default?: () => any;
  /** 标签插槽，用于自定义按钮标签 */
  label?: () => any;
}

/** JQButtonDropdown 暴露的方法和属性 */
export interface JQButtonDropdownExpose {
  /** 获取内部 QBtnDropdown 组件的 DOM 元素 */
  $el: HTMLElement | undefined;
  /** 显示下拉菜单 */
  show: () => void;
  /** 隐藏下拉菜单 */
  hide: () => void;
  /** 切换下拉菜单 */
  toggle: () => void;
}

// ============ 组件实例类型 ============
import type { DefineComponent } from 'vue';

/** 合并后的完整 Props 类型 (包含 QBtnDropdown 的 Props) */
export type JQButtonDropdownAllProps = JQButtonDropdownProps & Omit<QBtnDropdownProps, keyof JQButtonDropdownProps>;

/** Emits 配置对象格式 (用于 DefineComponent) */
export type JQButtonDropdownEmitsOptions = {
  /**
   * 选择菜单项事件
   * @param item 选中的菜单项
   */
  select: (item: JQButtonDropdownItem) => true;
};

/** JQButtonDropdown 组件类型定义 */
export type JQButtonDropdownComponent = DefineComponent<
  JQButtonDropdownAllProps,
  JQButtonDropdownExpose,
  {},
  {},
  {},
  {},
  {},
  JQButtonDropdownEmitsOptions
>;

/** JQButtonDropdown 实例类型 - 用于 ref 类型定义 */
export type JQButtonDropdownInstance = InstanceType<JQButtonDropdownComponent> & JQButtonDropdownExpose;
