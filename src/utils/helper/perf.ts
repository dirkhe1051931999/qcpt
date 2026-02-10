/**
 * 性能优化工具函数
 */

/* ========== 防抖（Debounce） ========== */

/**
 * 防抖函数：延迟执行，在规定时间内如果再次触发则重新计时
 * @param fn 要执行的函数
 * @param delay 延迟时间（毫秒）
 * @param immediate 是否立即执行，默认 false
 * @returns 防抖后的函数
 * @example
 * // 搜索框输入
 * const handleSearch = debounce((keyword) => {
 *   console.log('搜索:', keyword);
 * }, 300);
 * 
 * // 自动保存
 * const autoSave = debounce(() => {
 *   console.log('保存数据');
 * }, 1000);
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number = 300,
  immediate: boolean = false
): {
  (...args: Parameters<T>): void;
  cancel: () => void;
} {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let isInvoked = false;

  const debounced = function (this: any, ...args: Parameters<T>) {
    if (timer) {
      clearTimeout(timer);
    }

    if (immediate && !isInvoked) {
      fn.apply(this, args);
      isInvoked = true;
    } else {
      timer = setTimeout(() => {
        fn.apply(this, args);
        isInvoked = false;
        timer = null;
      }, delay);
    }
  };

  debounced.cancel = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    isInvoked = false;
  };

  return debounced;
}

/* ========== 节流（Throttle） ========== */

/**
 * 节流函数：在规定时间内只执行一次
 * @param fn 要执行的函数
 * @param delay 间隔时间（毫秒）
 * @param options 配置选项
 * @returns 节流后的函数
 * @example
 * // 滚动事件
 * const handleScroll = throttle(() => {
 *   console.log('滚动位置:', window.pageYOffset);
 * }, 100);
 * 
 * // 窗口resize
 * const handleResize = throttle(() => {
 *   console.log('窗口大小:', window.innerWidth);
 * }, 200);
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  delay: number = 300,
  options?: {
    leading?: boolean;  // 是否在开始时执行，默认 true
    trailing?: boolean; // 是否在结束后执行，默认 true
  }
): {
  (...args: Parameters<T>): void;
  cancel: () => void;
} {
  const { leading = true, trailing = true } = options || {};
  
  let timer: ReturnType<typeof setTimeout> | null = null;
  let lastTime = 0;
  let lastArgs: Parameters<T> | null = null;

  const throttled = function (this: any, ...args: Parameters<T>) {
    const now = Date.now();
    
    if (!lastTime && !leading) {
      lastTime = now;
    }

    const remaining = delay - (now - lastTime);

    lastArgs = args;

    if (remaining <= 0 || remaining > delay) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      lastTime = now;
      fn.apply(this, args);
      lastArgs = null;
    } else if (!timer && trailing) {
      timer = setTimeout(() => {
        lastTime = leading ? Date.now() : 0;
        timer = null;
        if (lastArgs) {
          fn.apply(this, lastArgs);
          lastArgs = null;
        }
      }, remaining);
    }
  };

  throttled.cancel = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    lastTime = 0;
    lastArgs = null;
  };

  return throttled;
}

/* ========== 函数执行控制 ========== */

/**
 * 只执行一次的函数
 * @param fn 要执行的函数
 * @returns 包装后的函数
 * @example
 * const initialize = once(() => {
 *   console.log('初始化，只执行一次');
 * });
 * 
 * initialize(); // 输出：初始化，只执行一次
 * initialize(); // 不会执行
 */
export function once<T extends (...args: any[]) => any>(
  fn: T
): (...args: Parameters<T>) => ReturnType<T> | undefined {
  let called = false;
  let result: ReturnType<T>;

  return function (this: any, ...args: Parameters<T>) {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }
    return result;
  };
}

/**
 * 延迟执行函数
 * @param fn 要执行的函数
 * @param delay 延迟时间（毫秒）
 * @returns Promise
 * @example
 * await delay(1000); // 延迟1秒
 * console.log('1秒后执行');
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * 睡眠函数（async/await 友好）
 * @param ms 睡眠时间（毫秒）
 * @returns Promise
 * @example
 * await sleep(1000);
 * console.log('1秒后执行');
 */
export function sleep(ms: number): Promise<void> {
  return delay(ms);
}

/**
 * 重试函数
 * @param fn 要执行的异步函数
 * @param options 重试配置
 * @returns Promise
 * @example
 * const result = await retry(
 *   async () => await fetch('/api/data'),
 *   { times: 3, delay: 1000 }
 * );
 */
export async function retry<T>(
  fn: () => Promise<T>,
  options?: {
    times?: number;      // 重试次数，默认 3
    delay?: number;      // 重试间隔（毫秒），默认 1000
    onRetry?: (error: any, attempt: number) => void; // 重试回调
  }
): Promise<T> {
  const { times = 3, delay: retryDelay = 1000, onRetry } = options || {};

  let lastError: any;

  for (let i = 0; i < times; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      if (onRetry) {
        onRetry(error, i + 1);
      }

      if (i < times - 1) {
        await sleep(retryDelay);
      }
    }
  }

  throw lastError;
}

/**
 * 超时控制
 * @param fn 要执行的异步函数
 * @param timeout 超时时间（毫秒）
 * @returns Promise
 * @example
 * try {
 *   const result = await withTimeout(fetchData(), 5000);
 * } catch (error) {
 *   console.log('请求超时');
 * }
 */
export function withTimeout<T>(
  promise: Promise<T>,
  timeout: number
): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), timeout)
    ),
  ]);
}

/* ========== 函数缓存 ========== */

/**
 * 函数结果缓存（记忆化）
 * @param fn 要缓存的函数
 * @param resolver 生成缓存 key 的函数
 * @returns 缓存后的函数
 * @example
 * const fibonacci = memoize((n: number): number => {
 *   if (n <= 1) return n;
 *   return fibonacci(n - 1) + fibonacci(n - 2);
 * });
 * 
 * fibonacci(40); // 第一次计算
 * fibonacci(40); // 从缓存读取，速度快
 */
export function memoize<T extends (...args: any[]) => any>(
  fn: T,
  resolver?: (...args: Parameters<T>) => string
): T & { cache: Map<string, ReturnType<T>> } {
  const cache = new Map<string, ReturnType<T>>();

  const memoized = function (this: any, ...args: Parameters<T>): ReturnType<T> {
    const key = resolver ? resolver(...args) : JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const result = fn.apply(this, args);
    cache.set(key, result);

    return result;
  } as T & { cache: Map<string, ReturnType<T>> };

  memoized.cache = cache;

  return memoized;
}

/**
 * 清除缓存
 * @param fn 缓存函数
 * @example
 * const cachedFn = memoize(expensiveFunction);
 * clearCache(cachedFn); // 清除所有缓存
 */
export function clearCache<T extends (...args: any[]) => any>(
  fn: T & { cache?: Map<any, any> }
): void {
  if (fn.cache) {
    fn.cache.clear();
  }
}

/* ========== 异步队列 ========== */

/**
 * 批处理函数：将多次调用合并为一次
 * @param fn 要批处理的函数
 * @param delay 等待时间（毫秒）
 * @returns 批处理后的函数
 * @example
 * const batchSave = batch((items) => {
 *   console.log('保存', items.length, '条数据');
 * }, 100);
 * 
 * batchSave('item1');
 * batchSave('item2');
 * batchSave('item3');
 * // 100ms 后一次性保存 ['item1', 'item2', 'item3']
 */
export function batch<T>(
  fn: (items: T[]) => void,
  delay: number = 100
): (item: T) => void {
  let items: T[] = [];
  let timer: ReturnType<typeof setTimeout> | null = null;

  return function (item: T) {
    items.push(item);

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fn(items);
      items = [];
      timer = null;
    }, delay);
  };
}

/**
 * 并发控制：限制同时执行的 Promise 数量
 * @param tasks 任务数组
 * @param limit 并发限制数
 * @returns Promise
 * @example
 * const urls = [...]; // 100个URL
 * const results = await promiseLimit(
 *   urls.map(url => () => fetch(url)),
 *   5 // 同时最多5个请求
 * );
 */
export async function promiseLimit<T>(
  tasks: (() => Promise<T>)[],
  limit: number
): Promise<T[]> {
  const results: T[] = [];
  const executing: Promise<any>[] = [];

  for (const task of tasks) {
    const promise = task().then((result) => {
      results.push(result);
      executing.splice(executing.indexOf(promise), 1);
    });

    executing.push(promise);

    if (executing.length >= limit) {
      await Promise.race(executing);
    }
  }

  await Promise.all(executing);

  return results;
}

/**
 * 串行执行 Promise
 * @param tasks 任务数组
 * @returns Promise
 * @example
 * await promiseSerial([
 *   () => fetch('/api/1'),
 *   () => fetch('/api/2'),
 *   () => fetch('/api/3')
 * ]); // 依次执行，等待前一个完成后再执行下一个
 */
export async function promiseSerial<T>(
  tasks: (() => Promise<T>)[]
): Promise<T[]> {
  const results: T[] = [];

  for (const task of tasks) {
    const result = await task();
    results.push(result);
  }

  return results;
}

/* ========== 性能监控 ========== */

/**
 * 测量函数执行时间
 * @param fn 要测量的函数
 * @param label 标签
 * @returns 包装后的函数
 * @example
 * const slowFunction = measureTime(() => {
 *   // 耗时操作
 * }, 'slowFunction');
 * 
 * slowFunction(); // 控制台输出：slowFunction: 123.45ms
 */
export function measureTime<T extends (...args: any[]) => any>(
  fn: T,
  label?: string
): T {
  return function (this: any, ...args: Parameters<T>): ReturnType<T> {
    const start = performance.now();
    const result = fn.apply(this, args);
    const end = performance.now();
    const time = (end - start).toFixed(2);
    
    console.log(`${label || fn.name || 'Function'}: ${time}ms`);
    
    return result;
  } as T;
}

/**
 * 测量异步函数执行时间
 * @param fn 要测量的异步函数
 * @param label 标签
 * @returns 包装后的函数
 * @example
 * const asyncFn = measureTimeAsync(async () => {
 *   await fetchData();
 * }, 'fetchData');
 */
export function measureTimeAsync<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  label?: string
): T {
  return async function (this: any, ...args: Parameters<T>): Promise<ReturnType<T>> {
    const start = performance.now();
    const result = await fn.apply(this, args);
    const end = performance.now();
    const time = (end - start).toFixed(2);
    
    console.log(`${label || fn.name || 'Function'}: ${time}ms`);
    
    return result;
  } as T;
}

/* ========== 请求合并 ========== */

/**
 * 请求去重：相同参数的请求只发一次
 * @param fn 请求函数
 * @returns 去重后的函数
 * @example
 * const fetchUser = dedupe(async (id) => {
 *   return await fetch(`/api/user/${id}`);
 * });
 * 
 * // 同时发起多个相同请求，实际只会发一次
 * Promise.all([
 *   fetchUser(1),
 *   fetchUser(1),
 *   fetchUser(1)
 * ]);
 */
export function dedupe<T extends (...args: any[]) => Promise<any>>(
  fn: T
): T {
  const pending = new Map<string, Promise<any>>();

  return async function (this: any, ...args: Parameters<T>): Promise<ReturnType<T>> {
    const key = JSON.stringify(args);

    if (pending.has(key)) {
      return pending.get(key)!;
    }

    const promise = fn.apply(this, args).finally(() => {
      pending.delete(key);
    });

    pending.set(key, promise);

    return promise;
  } as T;
}

/**
 * RAF 节流：使用 requestAnimationFrame 实现的节流
 * @param fn 要执行的函数
 * @returns 节流后的函数
 * @example
 * const handleScroll = rafThrottle(() => {
 *   // 滚动处理，与浏览器刷新率同步
 * });
 */
export function rafThrottle<T extends (...args: any[]) => any>(
  fn: T
): {
  (...args: Parameters<T>): void;
  cancel: () => void;
} {
  let rafId: number | null = null;

  const throttled = function (this: any, ...args: Parameters<T>) {
    if (rafId !== null) return;

    rafId = requestAnimationFrame(() => {
      fn.apply(this, args);
      rafId = null;
    });
  };

  throttled.cancel = () => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  };

  return throttled;
}
