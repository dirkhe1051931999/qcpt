import type { App } from 'vue';
import { Quasar, Notify, Dialog, QInput, QIcon, QBtn, QField, QSelect, QSpinner, QItem, QItemSection } from 'quasar';
import { qcptInit } from 'qcpt';

// 导入 Quasar CSS
import 'quasar/dist/quasar.css';
// 导入 Material Icons
import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css';
// 导入 qcpt 样式
import 'qcpt/qcpt.css';
import 'qcpt/qcpt-styles.css';

export default (app: App) => {
  // 全局注册 Quasar 组件
  app.component('QInput', QInput);
  app.component('QIcon', QIcon);
  app.component('QBtn', QBtn);
  app.component('QField', QField);
  app.component('QSelect', QSelect);
  app.component('QSpinner', QSpinner);
  app.component('QItem', QItem);
  app.component('QItemSection', QItemSection);

  // 配置 Quasar
  app.use(Quasar, {
    plugins: {
      Notify,
      Dialog,
    },
    config: {
      brand: {
        primary: '#1976D2',
        secondary: '#26A69A',
      },
    },
  });

  console.log('[Astro Vue] Quasar configured successfully');

  // 初始化 qcpt
  try {
    qcptInit({
      app,
      defaultLanguage: 'zh-CN',
      colors: {
        primary: '#0B5CFF',
        negative: '#E93030',
      },
    });
    console.log('[Astro Vue] qcpt initialized successfully');
  } catch (error) {
    console.error('[Astro Vue] Failed to initialize qcpt:', error);
  }
};
