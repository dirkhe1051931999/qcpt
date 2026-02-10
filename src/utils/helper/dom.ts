/**
 * DOM 操作工具函数
 */

/* ========== 剪贴板操作 ========== */

/**
 * 复制文本到剪贴板
 * @param text 要复制的文本
 * @returns Promise<boolean> 是否成功
 * @example
 * copyToClipboard('Hello World').then(success => {
 *   console.log(success ? '复制成功' : '复制失败');
 * });
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (!text) return false;

  // 优先使用现代 API
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error('Clipboard API 失败:', err);
    }
  }

  // 降级方案：使用 execCommand
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.top = '-9999px';
    document.body.appendChild(textarea);
    
    textarea.select();
    textarea.setSelectionRange(0, text.length);
    
    const success = document.execCommand('copy');
    document.body.removeChild(textarea);
    
    return success;
  } catch (err) {
    console.error('复制失败:', err);
    return false;
  }
}

/**
 * 读取剪贴板内容
 * @returns Promise<string> 剪贴板文本
 * @example
 * const text = await readFromClipboard();
 */
export async function readFromClipboard(): Promise<string> {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      return await navigator.clipboard.readText();
    } catch (err) {
      console.error('读取剪贴板失败:', err);
      return '';
    }
  }
  return '';
}

/* ========== 文件下载 ========== */

/**
 * 下载文件
 * @param data 文件数据（Blob、File 或 URL）
 * @param filename 文件名
 * @example
 * downloadFile(blob, 'data.xlsx');
 * downloadFile('http://example.com/file.pdf', 'document.pdf');
 */
export function downloadFile(data: Blob | File | string, filename: string): void {
  const link = document.createElement('a');
  
  if (typeof data === 'string') {
    // URL 下载
    link.href = data;
  } else {
    // Blob/File 下载
    link.href = URL.createObjectURL(data);
  }
  
  link.download = filename;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // 释放 URL 对象
  if (typeof data !== 'string') {
    setTimeout(() => URL.revokeObjectURL(link.href), 100);
  }
}

/**
 * 下载 JSON 数据为文件
 * @param data JSON 对象
 * @param filename 文件名
 * @example
 * downloadJSON({ name: 'Tom', age: 20 }, 'user.json');
 */
export function downloadJSON(data: any, filename: string): void {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  downloadFile(blob, filename);
}

/**
 * 下载文本文件
 * @param text 文本内容
 * @param filename 文件名
 * @example
 * downloadText('Hello World', 'hello.txt');
 */
export function downloadText(text: string, filename: string): void {
  const blob = new Blob([text], { type: 'text/plain' });
  downloadFile(blob, filename);
}

/* ========== 滚动操作 ========== */

/**
 * 平滑滚动到指定位置
 * @param options 滚动配置
 * @example
 * scrollTo({ top: 0, behavior: 'smooth' }); // 回到顶部
 * scrollTo({ top: 1000, left: 0 }); // 滚动到指定位置
 */
export function scrollTo(options: {
  top?: number;
  left?: number;
  behavior?: 'auto' | 'smooth';
}): void {
  window.scrollTo(options as ScrollToOptions);
}

/**
 * 滚动到指定元素
 * @param element 元素或选择器
 * @param options 滚动配置
 * @example
 * scrollToElement('#target');
 * scrollToElement(document.getElementById('target'), { behavior: 'smooth', block: 'center' });
 */
export function scrollToElement(
  element: HTMLElement | string,
  options?: ScrollIntoViewOptions
): void {
  const el = typeof element === 'string' ? document.querySelector(element) as HTMLElement : element;
  
  if (el) {
    el.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      ...options,
    });
  }
}

/**
 * 回到顶部
 * @param smooth 是否平滑滚动
 * @example
 * scrollToTop(); // 平滑滚动
 * scrollToTop(false); // 立即跳转
 */
export function scrollToTop(smooth: boolean = true): void {
  scrollTo({
    top: 0,
    behavior: smooth ? 'smooth' : 'auto',
  });
}

/**
 * 滚动到底部
 * @param smooth 是否平滑滚动
 */
export function scrollToBottom(smooth: boolean = true): void {
  scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: smooth ? 'smooth' : 'auto',
  });
}

/**
 * 获取滚动位置
 * @returns 滚动位置 { x, y }
 * @example
 * const { x, y } = getScrollPosition();
 */
export function getScrollPosition(): { x: number; y: number } {
  return {
    x: window.pageXOffset || document.documentElement.scrollLeft,
    y: window.pageYOffset || document.documentElement.scrollTop,
  };
}

/**
 * 获取元素距离文档顶部的距离
 * @param element 元素
 * @returns 距离（像素）
 * @example
 * const offsetTop = getOffsetTop(document.getElementById('target'));
 */
export function getOffsetTop(element: HTMLElement): number {
  let offsetTop = 0;
  while (element) {
    offsetTop += element.offsetTop;
    element = element.offsetParent as HTMLElement;
  }
  return offsetTop;
}

/* ========== 元素可见性检测 ========== */

/**
 * 判断元素是否在可视区域
 * @param element 元素
 * @param offset 偏移量，默认 0
 * @returns 是否在可视区域
 * @example
 * if (isInViewport(element)) {
 *   // 元素在可视区域内
 * }
 */
export function isInViewport(element: HTMLElement, offset: number = 0): boolean {
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  
  return (
    rect.top >= 0 - offset &&
    rect.left >= 0 - offset &&
    rect.bottom <= windowHeight + offset &&
    rect.right <= windowWidth + offset
  );
}

/**
 * 判断元素是否部分可见
 * @param element 元素
 * @returns 是否部分可见
 */
export function isPartiallyVisible(element: HTMLElement): boolean {
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  
  const vertInView = rect.top <= windowHeight && rect.top + rect.height >= 0;
  const horInView = rect.left <= windowWidth && rect.left + rect.width >= 0;
  
  return vertInView && horInView;
}

/* ========== 全屏操作 ========== */

/**
 * 切换全屏
 * @param element 要全屏的元素，默认为 document.documentElement
 * @example
 * toggleFullscreen(); // 切换页面全屏
 * toggleFullscreen(document.getElementById('video')); // 切换视频全屏
 */
export function toggleFullscreen(element: HTMLElement = document.documentElement): void {
  if (!document.fullscreenElement) {
    element.requestFullscreen().catch((err) => {
      console.error('进入全屏失败:', err);
    });
  } else {
    document.exitFullscreen();
  }
}

/**
 * 进入全屏
 * @param element 要全屏的元素
 */
export function enterFullscreen(element: HTMLElement = document.documentElement): void {
  if (!document.fullscreenElement) {
    element.requestFullscreen().catch((err) => {
      console.error('进入全屏失败:', err);
    });
  }
}

/**
 * 退出全屏
 */
export function exitFullscreen(): void {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  }
}

/**
 * 判断是否全屏
 * @returns 是否全屏
 */
export function isFullscreen(): boolean {
  return !!document.fullscreenElement;
}

/* ========== 元素操作 ========== */

/**
 * 添加类名
 * @param element 元素
 * @param className 类名
 * @example
 * addClass(element, 'active');
 */
export function addClass(element: HTMLElement, className: string): void {
  if (element) {
    element.classList.add(className);
  }
}

/**
 * 移除类名
 * @param element 元素
 * @param className 类名
 */
export function removeClass(element: HTMLElement, className: string): void {
  if (element) {
    element.classList.remove(className);
  }
}

/**
 * 切换类名
 * @param element 元素
 * @param className 类名
 */
export function toggleClass(element: HTMLElement, className: string): void {
  if (element) {
    element.classList.toggle(className);
  }
}

/**
 * 判断是否有指定类名
 * @param element 元素
 * @param className 类名
 * @returns 是否有该类名
 */
export function hasClass(element: HTMLElement, className: string): boolean {
  return element ? element.classList.contains(className) : false;
}

/**
 * 获取元素的所有类名
 * @param element 元素
 * @returns 类名数组
 */
export function getClasses(element: HTMLElement): string[] {
  return element ? Array.from(element.classList) : [];
}

/* ========== 元素尺寸 ========== */

/**
 * 获取元素的尺寸和位置
 * @param element 元素
 * @returns 尺寸和位置信息
 * @example
 * const { width, height, top, left } = getElementRect(element);
 */
export function getElementRect(element: HTMLElement): DOMRect | null {
  return element ? element.getBoundingClientRect() : null;
}

/**
 * 获取元素的宽度（包含内边距和边框）
 * @param element 元素
 * @returns 宽度
 */
export function getElementWidth(element: HTMLElement): number {
  return element ? element.offsetWidth : 0;
}

/**
 * 获取元素的高度（包含内边距和边框）
 * @param element 元素
 * @returns 高度
 */
export function getElementHeight(element: HTMLElement): number {
  return element ? element.offsetHeight : 0;
}

/* ========== 元素选择 ========== */

/**
 * 查询单个元素
 * @param selector 选择器
 * @param parent 父元素，默认为 document
 * @returns 元素或 null
 * @example
 * const element = querySelector('#id');
 */
export function querySelector<T extends HTMLElement = HTMLElement>(
  selector: string,
  parent: Document | HTMLElement = document
): T | null {
  return parent.querySelector<T>(selector);
}

/**
 * 查询多个元素
 * @param selector 选择器
 * @param parent 父元素，默认为 document
 * @returns 元素数组
 * @example
 * const elements = querySelectorAll('.class');
 */
export function querySelectorAll<T extends HTMLElement = HTMLElement>(
  selector: string,
  parent: Document | HTMLElement = document
): T[] {
  return Array.from(parent.querySelectorAll<T>(selector));
}

/* ========== 元素属性 ========== */

/**
 * 获取元素属性
 * @param element 元素
 * @param name 属性名
 * @returns 属性值
 */
export function getAttribute(element: HTMLElement, name: string): string | null {
  return element ? element.getAttribute(name) : null;
}

/**
 * 设置元素属性
 * @param element 元素
 * @param name 属性名
 * @param value 属性值
 */
export function setAttribute(element: HTMLElement, name: string, value: string): void {
  if (element) {
    element.setAttribute(name, value);
  }
}

/**
 * 移除元素属性
 * @param element 元素
 * @param name 属性名
 */
export function removeAttribute(element: HTMLElement, name: string): void {
  if (element) {
    element.removeAttribute(name);
  }
}

/**
 * 判断是否有指定属性
 * @param element 元素
 * @param name 属性名
 * @returns 是否有该属性
 */
export function hasAttribute(element: HTMLElement, name: string): boolean {
  return element ? element.hasAttribute(name) : false;
}

/* ========== 元素样式 ========== */

/**
 * 获取元素的计算样式
 * @param element 元素
 * @param property 样式属性名
 * @returns 样式值
 * @example
 * const color = getStyle(element, 'color');
 */
export function getStyle(element: HTMLElement, property: string): string {
  if (!element) return '';
  return window.getComputedStyle(element)[property as any] || '';
}

/**
 * 设置元素样式
 * @param element 元素
 * @param styles 样式对象
 * @example
 * setStyle(element, { color: 'red', fontSize: '16px' });
 */
export function setStyle(element: HTMLElement, styles: Partial<CSSStyleDeclaration>): void {
  if (!element) return;
  
  Object.keys(styles).forEach((key) => {
    (element.style as any)[key] = styles[key as keyof CSSStyleDeclaration];
  });
}

/* ========== 窗口相关 ========== */

/**
 * 获取窗口尺寸
 * @returns 窗口宽高
 * @example
 * const { width, height } = getWindowSize();
 */
export function getWindowSize(): { width: number; height: number } {
  return {
    width: window.innerWidth || document.documentElement.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight,
  };
}

/**
 * 获取页面总高度
 * @returns 页面高度
 */
export function getPageHeight(): number {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  );
}

/**
 * 获取页面总宽度
 * @returns 页面宽度
 */
export function getPageWidth(): number {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.body.clientWidth,
    document.documentElement.clientWidth
  );
}

/**
 * 判断是否滚动到底部
 * @param offset 距离底部的偏移量，默认 0
 * @returns 是否到底部
 * @example
 * if (isScrolledToBottom(100)) {
 *   // 距离底部100px时触发
 * }
 */
export function isScrolledToBottom(offset: number = 0): boolean {
  const { y } = getScrollPosition();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const pageHeight = getPageHeight();
  
  return y + windowHeight >= pageHeight - offset;
}
