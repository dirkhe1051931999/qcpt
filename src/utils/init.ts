import { App, isRef, ref, Ref } from 'vue';
import { DialogProvider } from 'components/j-q-dialog';
import { PAGE_ACTION_PERMISSION_KEY, PAGE_PERMISSION_KEY } from '../components/j-c-permission/index.vue';
import { ClosePopup, setCssVar } from 'quasar';
import type { QVueGlobals } from 'quasar';
import defaultColors from '../config/colors.json';
import { setQuasarInstance, setLocale, type Locale } from '../composables/useI18n';
import JQMessage from '../components/j-q-message/index';
import JQConfirmDialog from '../components/j-q-confirm-dialog/index';
import { composeIconMapFn, qcptIconMapFn } from './icon-map';

export type ColorConfig = Partial<typeof defaultColors>;

export interface QcptInitOptions {
  app: App;
  router?: any;
  store?: any;
  i18n?: any;
  pagePermissionIds?: Ref<string[]> | string[];
  pageActionPermissionIds?: Ref<string[]> | string[];
  defaultLanguage?: Locale; // 默认语言
  colors?: ColorConfig; // 自定义颜色配置
  disableBFCache?: boolean; // 禁用 BFCache，利用 pageshow 事件在从缓存恢复时刷新页面
}

/**
 * 初始化 qcpt 组件库
 * @param options 初始化配置选项
 * @example
 * ```typescript
 * import { createApp } from 'vue';
 * import { qcptInit } from 'qcpt';
 *
 * const app = createApp(App);
 * const pagePermissionIds = ref(['operation-all', 'user-edit']);
 * const pageActionPermissionIds = ref(['action-edit', 'action-delete']);
 *
 * qcptInit({
 *   app,
 *   router,
 *   store,
 *   i18n,
 *   pagePermissionIds,
 *   pageActionPermissionIds,
 *   defaultLanguage: 'en-US',  // 设置默认语言
 *   colors: {
 *     primary: '#FF5722',  // 自定义主色
 *     grey: '#888888',     // 自定义灰色
 *   },
 *   disableBFCache: true, // 禁用 BFCache，利用 pageshow 事件在从缓存恢复时刷新页面
 * });
 * ```
 */
export function qcptInit(options: QcptInitOptions): void {
  const { app, router, store, i18n, pagePermissionIds, pageActionPermissionIds, defaultLanguage, colors, disableBFCache } = options;

  // 处理 BFCache：当页面从 BFCache 恢复时刷新页面
  if (disableBFCache) {
    window.addEventListener('pageshow', (event) => {
      // persisted 为 true 表示页面是从 BFCache 恢复的，而不是首次加载
      if (event.persisted) {
        window.location.reload();
      }
    });
  }

  // 注册 qcpt 依赖的 Quasar directives（外部项目只要调用 qcptInit 即可）
  registerQuasarDirectives(app);

  // 保存 Quasar 实例供 useI18n 使用
  const $q = app.config.globalProperties.$q;
  if ($q) {
    setQuasarInstance($q);

    // 设置 JQMessage 的 Quasar 实例
    JQMessage.setQuasarInstance($q);

    // 设置 JQConfirmDialog 的 Quasar 实例
    JQConfirmDialog.setQuasarInstance($q);

    // 验证必需的 Quasar 插件是否已注册
    validateQuasarPlugins($q);
  } else {
    console.warn('[qcpt] Quasar instance not found. Make sure you have installed Quasar.');
  }

  // 设置默认语言（异步加载）
  if (defaultLanguage) {
    setLocale(defaultLanguage).catch((error) => {
      console.error(`[qcpt] Failed to set default language:`, error);
    });
  } else {
    // 如果没有指定默认语言，加载 zh-CN
    setLocale('zh-CN').catch((error) => {
      console.error(`[qcpt] Failed to load default locale:`, error);
    });
  }

  // qcpt 内置 iconMapFn（base64 svg）
  const iconMapFn = qcptIconMapFn;

  // 转换权限数据为 Ref
  const permissionIdsRef = pagePermissionIds ? (isRef(pagePermissionIds) ? pagePermissionIds : ref(pagePermissionIds)) : undefined;
  const actionPermissionIdsRef = pageActionPermissionIds ? (isRef(pageActionPermissionIds) ? pageActionPermissionIds : ref(pageActionPermissionIds)) : undefined;

  // 配置 DialogProvider，传递 iconMapFn 和权限数据
  DialogProvider.configure({
    router,
    store,
    i18n,
    iconMapFn,
    pagePermissionIds: permissionIdsRef,
    pageActionPermissionIds: actionPermissionIdsRef,
  });

  // 提供权限 IDs 到主应用
  if (permissionIdsRef) {
    console.log('[qcpt] Permission IDs provided:', permissionIdsRef.value);
    app.provide(PAGE_PERMISSION_KEY, permissionIdsRef);
  }

  // 提供操作权限 IDs 到主应用
  if (actionPermissionIdsRef) {
    console.log('[qcpt] Action Permission IDs provided:', actionPermissionIdsRef.value);
    app.provide(PAGE_ACTION_PERMISSION_KEY, actionPermissionIdsRef);
  }

  // 应用自定义颜色到 CSS 变量（传入 $q 实例）
  if (colors && $q) {
    applyCustomColors(colors, $q);
  }

  console.log('[qcpt] Initialization started...');
  // 配置主应用的 Quasar 自定义图标映射
  // 这里不强行覆盖现有的 iconMapFn：如果外部项目已经设置过（例如主题图标），
  // 就把 qcpt 的映射作为 fallback 合并进去，避免出现 app:copyText 等图标丢失。
  if ($q) {
    ($q as any).iconMapFn = composeIconMapFn(($q as any).iconMapFn, iconMapFn);
  }

  console.log('[qcpt] Initialization completed successfully.');
}

/**
 * 应用自定义颜色到 CSS 变量
 * @param customColors 自定义颜色配置
 * @param $q Quasar 实例（用于确保在正确的应用上下文中）
 */
function applyCustomColors(customColors: ColorConfig, $q: QVueGlobals): void {
  const finalColors = { ...defaultColors, ...customColors };

  // 设置 CSS 变量到 :root
  const root = document.documentElement;

  Object.entries(finalColors).forEach(([key, value]) => {
    root.style.setProperty(`--j-color-${key}`, value);
  });

  // 使用 Quasar 的 setCssVar API 设置 Quasar 的颜色变量
  // 注意：setCssVar 是全局 API，但我们通过传入 $q 来确保在正确的上下文中调用
  if (finalColors.primary) {
    setCssVar('primary', finalColors.primary);
  }
  if (finalColors.negative) {
    setCssVar('negative', finalColors.negative);
  }
  // 可选：设置更多 Quasar 颜色
  if (finalColors.green) {
    setCssVar('positive', finalColors.green);
  }
  if (finalColors.yellow) {
    setCssVar('warning', finalColors.yellow);
  }
  if (finalColors.dark) {
    setCssVar('dark', finalColors.dark);
  }

  console.log('[qcpt] Custom colors applied:', customColors);
}

/**
 * 验证必需的 Quasar 插件是否已注册
 * @param $q Quasar 实例
 */
function validateQuasarPlugins($q: QVueGlobals): void {
  const requiredPlugins = ['notify', 'dialog'];
  const missingPlugins: string[] = [];

  requiredPlugins.forEach((plugin) => {
    if (!$q[plugin as keyof QVueGlobals]) {
      missingPlugins.push(plugin);
    }
  });

  if (missingPlugins.length > 0) {
    console.warn(`[qcpt] Missing required Quasar plugins: ${missingPlugins.join(', ')}. ` + `Please register them in your main app with app.use(Quasar, { plugins: { Notify, Dialog } })`);
  }
}

/**
 * 注册 qcpt 组件内部用到的 Quasar directives
 * - v-close-popup -> ClosePopup
 */
function registerQuasarDirectives(app: App): void {
  const directives = (app as any)?._context?.directives as Record<string, any> | undefined;
  if (directives?.['close-popup']) return;
  app.directive('close-popup', ClosePopup);
}