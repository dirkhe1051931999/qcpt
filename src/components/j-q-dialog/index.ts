import { createApp, nextTick, type Ref } from 'vue';
import JQDialog from './index.vue';
import JQDialogPromptContent from './prompt-content.vue';
import { formRules as formRulesCore } from './form-rules';
import { t as globalT, getLocale } from 'src/composables/useI18n';
import { ClosePopup } from 'quasar';
import { composeIconMapFn } from 'src/utils/icon-map';
import { PAGE_ACTION_PERMISSION_KEY, PAGE_PERMISSION_KEY } from '../j-c-permission/index.vue';

// 动态导入 Quasar 语言包
const quasarLangModules = {
  'zh-CN': () => import('quasar/lang/zh-CN'),
  'en-US': () => import('quasar/lang/en-US'),
};

const dialogMapStore = new Map<string, { app: any; appInstance: any }>();

/**
 * 表单验证规则
 * @param t - 可选的国际化翻译函数，如果不传则使用全局的 t 函数
 */
export function formRules(t?: any) {
  return formRulesCore(t || globalT);
}

interface DialogProviderOptions {
  router?: any;
  store?: any;
  i18n?: any;
  plugins?: any[];
  iconMapFn?: (iconName: string) => any;
  pagePermissionIds?: Ref<string[]>;
  pageActionPermissionIds?: Ref<string[]>;
}

export type DialogPosition = 'standard' | 'right' | 'top' | 'bottom' | 'left';
export type DialogType = 'dialog' | 'text' | 'textarea' | 'select';

/** 文本输入配置 */
export interface TextInputConfig {
  /** 输入框占位符 */
  placeholder?: string;
  /** 初始值 */
  modelValue?: string | number;
  /** 验证规则 */
  rules?: any[];
  /** 最大长度 */
  maxlength?: string | number | null;
  /** 额外的输入框属性 */
  inputProps?: Record<string, any>;
}

/** 多行文本输入配置 */
export interface TextareaInputConfig {
  /** 输入框占位符 */
  placeholder?: string;
  /** 初始值 */
  modelValue?: string | number;
  /** 验证规则 */
  rules?: any[];
  /** 最大长度 */
  maxlength?: string | number | null;
  /** 额外的输入框属性 */
  inputProps?: Record<string, any>;
}

/** 下拉选择配置 */
export interface SelectInputConfig {
  /** 占位符 */
  placeholder?: string;
  /** 初始值 */
  modelValue?: any;
  /** 验证规则 */
  rules?: any[];
  /** 下拉选项 */
  options: any[];
  /** 选项显示字段 */
  optionLabel?: string;
  /** 选项值字段 */
  optionValue?: string;
  /** 是否多选 */
  multiple?: boolean;
  /** 额外的选择框属性 */
  selectProps?: Record<string, any>;
}

export interface JQDialogRegisterProps {
  allowFocusOutside?: boolean;
  showFooter?: boolean;
  showConfirm?: boolean;
  component?: any;
  content?: any;
  componentBind?: Record<string, any>;
  componentOn?: Record<string, any>;
  closeOnEsc?: boolean;
  closeOnMask?: boolean;
  position?: DialogPosition;
  showHeader?: boolean;
  title?: string;
  maxWidth?: string | number;
  minHeight?: string | number;
  dialogType?: DialogType;
  text?: TextInputConfig;
  textarea?: TextareaInputConfig;
  select?: SelectInputConfig;
}

export interface JQDialogExposed {
  open: () => void;
  close: () => void;
  setLoading: (loading: boolean) => void;
  changeCancelText: (text: string) => void;
  changeConfirmText: (text: string) => void;
  /** 命令式控制确认按钮显示/隐藏 */
  setShowConfirm: (show: boolean) => void;
  /** 绑定一个 Ref/ComputedRef<boolean>，用于响应式控制确认按钮显示/隐藏 */
  bindShowConfirm: (source: { value: boolean }) => void;
}

let globalOptions: DialogProviderOptions = {};

export interface DialogProviderType {
  configure(options: DialogProviderOptions): void;
  register(props: JQDialogRegisterProps): Promise<any>;
  destroy(dialogId: string): void;
  destroyAll(): void;
}

export const DialogProvider: DialogProviderType = {
  /**
   * 配置 DialogProvider 选项
   */
  configure(options: DialogProviderOptions) {
    globalOptions = options;
  },

  async register(props: JQDialogRegisterProps): Promise<any> {
    const dialogId = Math.random().toString(36).slice(2);
    
    // 如果是 prompt 模式（dialogType 为 'text'、'textarea' 或 'select'）
    const isPromptMode = props.dialogType === 'text' || props.dialogType === 'textarea' || props.dialogType === 'select';
    
    let resolvePrompt: ((value: any) => void) | null = null;
    let rejectPrompt: (() => void) | null = null;
    const promptPromise = isPromptMode
      ? new Promise((resolve, reject) => {
          resolvePrompt = resolve;
          rejectPrompt = reject;
        })
      : null;

    // 根据 dialogType 获取对应的配置
    const inputConfig = props.dialogType === 'text' 
      ? props.text 
      : props.dialogType === 'textarea' 
      ? props.textarea 
      : props.dialogType === 'select'
      ? props.select
      : null;

    // 如果是 prompt 模式，自动配置为使用 prompt-content 组件
    const finalProps = isPromptMode && inputConfig
      ? {
          ...props,
          dialogId,
          // 强制设置一些默认值
          showFooter: props.showFooter !== false, // 默认显示底部按钮
          showHeader: props.showHeader !== false, // 默认显示标题栏
          maxWidth: props.maxWidth || (window.innerWidth <= 1440 ? '30vw' : '25vw'),
          minHeight: props.minHeight || 'auto',
          // 使用 prompt-content 组件
          component: JQDialogPromptContent,
          componentBind: {
            modelValue: inputConfig.modelValue || (props.dialogType === 'select' ? null : ''),
            placeholder: inputConfig.placeholder || '',
            type: props.dialogType, // 'text'、'textarea' 或 'select'
            rules: inputConfig.rules || [],
            // text/textarea 特有属性
            maxlength: 'maxlength' in inputConfig ? inputConfig.maxlength : 64,
            inputProps: 'inputProps' in inputConfig ? inputConfig.inputProps : {},
            // select 特有属性
            options: 'options' in inputConfig ? inputConfig.options : [],
            optionLabel: 'optionLabel' in inputConfig ? inputConfig.optionLabel : 'label',
            optionValue: 'optionValue' in inputConfig ? inputConfig.optionValue : 'value',
            multiple: 'multiple' in inputConfig ? inputConfig.multiple : false,
            selectProps: 'selectProps' in inputConfig ? inputConfig.selectProps : {},
            // 注入 dialogInstance，用于 prompt-content 组件调用
            dialogInstance: {
              resolve: resolvePrompt,
              reject: rejectPrompt,
              close: () => {
                // 延迟关闭，让 resolve/reject 先执行
                setTimeout(() => {
                  const instance = dialogMapStore.get(dialogId);
                  if (instance) {
                    instance.appInstance?.close?.();
                  }
                }, 0);
              },
            },
          },
          componentOn: {}, // 提供空对象避免 v-on 警告
        }
      : { ...props, dialogId };

    const app = createApp(JQDialog, finalProps);

    if (globalOptions.router) {
      app.use(globalOptions.router);
    }
    if (globalOptions.store) {
      app.use(globalOptions.store);
    }
    if (globalOptions.i18n) {
      app.use(globalOptions.i18n);
    }
    if (globalOptions.plugins) {
      globalOptions.plugins.forEach((plugin) => app.use(plugin));
    }

    // 动态导入 Quasar 和插件（避免静态导入问题）
    const { Quasar, Notify, Dialog, Loading } = await import('quasar');

    app.use(Quasar, {
      plugins: {
        Notify,
        Dialog,
        Loading,
      },
      animations: 'all' as any,
    } as any);

    // 注册 ClosePopup directive（避免 v-close-popup 指令报错）
    const directives = (app as any)?._context?.directives as Record<string, any> | undefined;
    if (!directives?.['close-popup']) {
      app.directive('close-popup', ClosePopup);
    }

    // 同步更新 Quasar locale
    const currentLocale = getLocale();
    const loadQuasarLang = quasarLangModules[currentLocale];
    if (loadQuasarLang) {
      try {
        const langModule = await loadQuasarLang();
        app.config.globalProperties.$q.lang.set(langModule.default);
      } catch (error) {
        console.error(`[qcpt] Failed to load Quasar locale for ${currentLocale}:`, error);
      }
    }

    // 配置自定义图标映射（使用 composeIconMapFn 合并而不是覆盖）
    if (globalOptions.iconMapFn) {
      const $q = app.config.globalProperties.$q;
      ($q as any).iconMapFn = composeIconMapFn(($q as any).iconMapFn, globalOptions.iconMapFn);
    }

    // 注入权限数据到 dialog 应用实例
    if (globalOptions.pagePermissionIds) {
      app.provide(PAGE_PERMISSION_KEY, globalOptions.pagePermissionIds);
    }
    if (globalOptions.pageActionPermissionIds) {
      app.provide(PAGE_ACTION_PERMISSION_KEY, globalOptions.pageActionPermissionIds);
    }

    const mountEl = document.createElement('div');
    document.body.appendChild(mountEl);
    const appInstance: any = app.mount(mountEl);
    dialogMapStore.set(dialogId, { app, appInstance });
    nextTick(() => {
      appInstance.open();
    }).then((r) => {
      return r;
    });
    
    // 如果是 prompt 模式，返回 promise；否则返回 appInstance（保持向后兼容）
    if (isPromptMode && promptPromise) {
      return promptPromise;
    }
    
    return appInstance;
  },
  destroy(dialogId: string) {
    const dialog = dialogMapStore.get(dialogId);
    if (!dialog) return;
    dialog.app.unmount();
    document.body.removeChild(dialog.app._container!);
    dialogMapStore.delete(dialogId);
  },
  destroyAll() {
    dialogMapStore.forEach((dialog, dialogId) => {
      try {
        dialog.app.unmount();
        if (dialog.app._container && document.body.contains(dialog.app._container)) {
          document.body.removeChild(dialog.app._container);
        }
      } catch (error) {
        console.error(`[DialogProvider] Failed to destroy dialog ${dialogId}:`, error);
      }
    });
    dialogMapStore.clear();
  },
};
