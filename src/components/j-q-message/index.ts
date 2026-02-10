import type { QNotifyCreateOptions, QVueGlobals } from 'quasar';
import { getLocale } from 'src/composables/useI18n.ts';

type Position = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top' | 'bottom' | 'left' | 'right' | 'center' | undefined;
type showParams = {
  type: 'error' | 'warn' | 'success';
  content: string;
  position?: Position;
  isNotify?: boolean;
};

export interface IGlobalMessage {
  show: (params: showParams) => void;
  setQuasarInstance: (instance: QVueGlobals) => void;
}

const DEFAULT_PARAMS: QNotifyCreateOptions = {
  timeout: 3000,
  html: true,
  progress: true,
  iconSize: '20px',
};

// 存储 Quasar 实例的引用
let quasarInstance: QVueGlobals | null = null;

class GlobalMessage implements IGlobalMessage {
  constructor() {}

  /**
   * 设置 Quasar 实例（在 qcptInit 中调用）
   */
  public setQuasarInstance(instance: QVueGlobals): void {
    quasarInstance = instance;
  }

  public show({ type, content, position, isNotify }: showParams) {
    const iconName: Record<string, string> = {
      error: 'highlight_off',
      warn: 'o_info',
      success: 'check_circle',
    };
    const badgeColor: Record<string, string> = {
      error: 'red',
      warn: 'orange',
      success: 'green',
    };
    const badgeStyle = `background-color: var(--j-color-white);box-shadow:rgba(0, 0, 0, 0.1) 0px 2px 4px 0px;color:var(--j-color-${badgeColor[type] || 'dark'})`;
    const data = Object.assign(DEFAULT_PARAMS, {
      message: content,
      position: position ?? 'top',
      multiLine: isNotify ?? false,
      icon: iconName[type] || 'o_info',
      actions: isNotify
        ? [
            {
              color: 'primary',
              label: getLocale() === 'en-US' ? 'Close' : '关闭',
            },
          ]
        : [],
      badgeStyle,
      classes: `q-message-style  q-message-style--${type}`,
    });
    try {
      if (quasarInstance?.notify) {
        quasarInstance.notify(data);
      } else {
        console.error('[JQMessage] Quasar Notify plugin not available. Make sure qcptInit has been called.');
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert(data.message);
    }
  }
}

export default new GlobalMessage();