/**
 * Yalc 开发模式脚本
 * 自动监听文件变化，构建并推送到 yalc
 */

import { spawn } from 'child_process';
import { watch, existsSync, statSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

let buildProcess = null;
let isBuilding = false;
let pendingBuild = false;
let isFirstPublish = true; // 标记是否是第一次发布
let buildDebounceTimer = null; // 防抖计时器
const DEBOUNCE_DELAY = 2000; // 防抖延迟（毫秒）- 增加到2秒，确保最后一次保存才执行

// 需要忽略的文件模式（这些是构建产物，不应触发重新构建）
const IGNORE_PATTERNS = [
  'global.d.ts',        // build:types 生成的全局类型文件
  'custom-svg.ts',      // build:svg 生成的 SVG 图标文件
  '_vars-color.scss',   // build:colors 生成的颜色变量文件
];

function log(message, type = 'info') {
  const colors = {
    info: '\x1b[36m',    // cyan
    success: '\x1b[32m', // green
    error: '\x1b[31m',   // red
    warn: '\x1b[33m',    // yellow
  };
  const reset = '\x1b[0m';
  const timestamp = new Date().toLocaleTimeString();
  console.log(`${colors[type]}[${timestamp}]${reset} ${message}`);
}

// 检查文件是否应该被忽略
function shouldIgnoreFile(filename) {
  if (!filename) return true;
  
  // 检查是否匹配忽略模式
  return IGNORE_PATTERNS.some(pattern => filename.includes(pattern));
}

// 检查类型文件是否已生成
function checkTypeFilesReady() {
  const distPath = resolve(__dirname, '..', 'dist');
  const typeFiles = ['index.d.ts', 'global.d.ts'];
  
  for (const file of typeFiles) {
    const filePath = resolve(distPath, file);
    if (!existsSync(filePath)) {
      return false;
    }
    
    // 检查文件大小，确保不是空文件
    const stats = statSync(filePath);
    if (stats.size === 0) {
      return false;
    }
  }
  
  return true;
}

// 等待类型文件生成完成
async function waitForTypeFiles(maxWaitTime = 15000, checkInterval = 500) {
  const startTime = Date.now();
  
  // 先等待一小段时间，让 vite-plugin-dts 开始工作
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  while (Date.now() - startTime < maxWaitTime) {
    if (checkTypeFilesReady()) {
      const waitedTime = ((Date.now() - startTime) / 1000).toFixed(1);
      log(`类型文件已生成（等待 ${waitedTime}s）`, 'success');
      return true;
    }
    
    // 等待一段时间后再检查
    await new Promise(resolve => setTimeout(resolve, checkInterval));
  }
  
  log('等待类型文件超时，可能未完全生成', 'warn');
  return false;
}

// 带防抖的构建函数 - 确保只有最后一次保存才执行
function debouncedBuild(filename = '') {
  // 清除之前的计时器
  if (buildDebounceTimer) {
    clearTimeout(buildDebounceTimer);
    buildDebounceTimer = null;
  }

  // 如果正在构建，标记为待处理，但不立即触发新的构建
  if (isBuilding) {
    pendingBuild = true;
    log('构建进行中，将在最后一次保存后重新构建...', 'warn');
    return;
  }

  // 设置新的计时器 - 只有在这个延迟时间内没有新的文件变化时才会执行
  buildDebounceTimer = setTimeout(() => {
    buildDebounceTimer = null;
    build();
  }, DEBOUNCE_DELAY);
}

function build() {
  if (isBuilding) {
    pendingBuild = true;
    log('⏳ 构建进行中，将在完成后重新构建...', 'warn');
    return;
  }

  isBuilding = true;
  log('🔨 开始构建...', 'info');

  buildProcess = spawn('npm', ['run', 'build-all'], {
    cwd: resolve(__dirname, '..'),
    shell: true,
    stdio: 'inherit',
  });

  buildProcess.on('exit', async (code) => {
    isBuilding = false;
    buildProcess = null;

    if (code === 0) {
      // 根据是否第一次决定使用 publish 还是 push
      const yalcCommand = isFirstPublish ? 'publish' : 'push';
      const actionText = isFirstPublish ? '首次发布到' : '推送到';
      
      log(`✓ 构建成功！`, 'success');
      
      // 检查类型文件是否存在（不等待新生成）
      const typeFilesExist = checkTypeFilesReady();
      
      if (typeFilesExist) {
        log(`✓ 类型声明文件已就绪`, 'success');
      } else {
        log('⚠ 类型声明文件未找到，正在等待生成...', 'warn');
        const typeFilesReady = await waitForTypeFiles(10000, 500);
        if (!typeFilesReady) {
          log('⚠ 警告：类型文件可能未完全生成', 'warn');
        }
      }
      
      log(`正在${actionText} yalc...`, 'info');
      
      // 构建成功后推送到 yalc
      const pushProcess = spawn('npx', ['yalc', yalcCommand], {
        cwd: resolve(__dirname, '..'),
        shell: true,
        stdio: 'inherit',
      });

      pushProcess.on('exit', (pushCode) => {
        if (pushCode === 0) {
          log(`✓ 已${actionText} yalc！所有更改已推送`, 'success');
          // 第一次发布成功后，将标记设为 false
          if (isFirstPublish) {
            isFirstPublish = false;
            log('ℹ 后续将使用 yalc push 进行增量更新', 'info');
          }
        } else {
          log(`✗ ${actionText}失败`, 'error');
        }

        // 检查是否有待处理的构建 - 使用防抖确保最后一次保存才执行
        if (pendingBuild) {
          pendingBuild = false;
          log('检测到新的变化，等待最后一次保存...', 'info');
          debouncedBuild('pending');
        }
      });
    } else {
      log('✗ 构建失败', 'error');
      
      // 即使失败，也检查是否有待处理的构建 - 使用防抖
      if (pendingBuild) {
        pendingBuild = false;
        log('⚠ 构建失败，等待最后一次保存后重试...', 'warn');
        debouncedBuild('retry');
      }
    }
  });
}

// 监听 src 目录
const srcPath = resolve(__dirname, '..', 'src');
log(`开始监听 ${srcPath}`, 'info');
log('提示：修改文件后会自动构建并推送到 yalc', 'info');
log('按 Ctrl+C 退出', 'warn');

// 首次构建
build();

// 监听文件变化
watch(srcPath, { recursive: true }, (eventType, filename) => {
  if (filename) {
    // 忽略自动生成的文件
    if (shouldIgnoreFile(filename)) {
      log(`⊘ 忽略自动生成的文件: ${filename}`, 'warn');
      return;
    }
    
    // 判断文件类型
    const fileType = filename.endsWith('.vue') ? 'Vue组件' 
      : filename.endsWith('.ts') ? 'TypeScript' 
      : filename.endsWith('.scss') ? 'SCSS样式'
      : filename.endsWith('.css') ? 'CSS样式'
      : '文件';
    
    log(`👁 检测到${fileType}变化: ${filename}`, 'info');
    debouncedBuild(filename);
  }
});

// 也监听配置文件
const configFiles = ['vite.config.js', 'tsconfig.json', 'package.json'];
configFiles.forEach(file => {
  const filePath = resolve(__dirname, '..', file);
  watch(filePath, (eventType) => {
    if (eventType === 'change') {
      log(`配置文件变化: ${file}`, 'info');
      debouncedBuild(file);
    }
  });
});

// 处理退出信号
process.on('SIGINT', () => {
  log('\n正在退出...', 'warn');
  
  // 清除防抖计时器
  if (buildDebounceTimer) {
    clearTimeout(buildDebounceTimer);
  }
  
  if (buildProcess) {
    buildProcess.kill();
  }
  // 重置首次发布标记（进程退出后会自动清除）
  isFirstPublish = true;
  process.exit(0);
});

// 处理其他退出信号
process.on('SIGTERM', () => {
  log('\n收到终止信号，正在退出...', 'warn');
  
  // 清除防抖计时器
  if (buildDebounceTimer) {
    clearTimeout(buildDebounceTimer);
  }
  
  if (buildProcess) {
    buildProcess.kill();
  }
  process.exit(0);
});

