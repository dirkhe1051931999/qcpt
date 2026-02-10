/**
 * URL 处理工具函数
 */

/* ========== URL 参数处理 ========== */

/**
 * 解析 URL 参数为对象
 * @param url URL 字符串，默认为当前页面 URL
 * @returns 参数对象
 * @example
 * parseQuery('?name=Tom&age=20')
 * // { name: 'Tom', age: '20' }
 * 
 * parseQuery('http://example.com?name=Tom&age=20')
 * // { name: 'Tom', age: '20' }
 */
export function parseQuery(url?: string): Record<string, string | string[]> {
  const targetUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  if (!targetUrl) return {};

  const queryString = targetUrl.includes('?') ? targetUrl.split('?')[1].split('#')[0] : '';
  if (!queryString) return {};

  const result: Record<string, string | string[]> = {};

  queryString.split('&').forEach((pair) => {
    if (!pair) return;

    const [key, value = ''] = pair.split('=').map(decodeURIComponent);
    if (!key) return;

    // 处理重复的 key（转为数组）
    if (key in result) {
      if (Array.isArray(result[key])) {
        (result[key] as string[]).push(value);
      } else {
        result[key] = [result[key] as string, value];
      }
    } else {
      result[key] = value;
    }
  });

  return result;
}

/**
 * 对象转 URL 参数字符串
 * @param params 参数对象
 * @returns URL 参数字符串（不包含 ?）
 * @example
 * stringifyQuery({ name: 'Tom', age: 20 })
 * // 'name=Tom&age=20'
 * 
 * stringifyQuery({ tags: ['a', 'b', 'c'] })
 * // 'tags=a&tags=b&tags=c'
 */
export function stringifyQuery(params: Record<string, any>): string {
  if (!params || typeof params !== 'object') return '';

  return Object.keys(params)
    .filter((key) => params[key] !== undefined && params[key] !== null)
    .map((key) => {
      const value = params[key];
      if (Array.isArray(value)) {
        return value
          .map((v) => `${encodeURIComponent(key)}=${encodeURIComponent(v)}`)
          .join('&');
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join('&');
}

/**
 * 获取 URL 指定参数的值
 * @param key 参数名
 * @param url URL 字符串，默认为当前页面 URL
 * @returns 参数值，不存在返回 null
 * @example
 * getQueryParam('name', '?name=Tom&age=20')
 * // 'Tom'
 */
export function getQueryParam(key: string, url?: string): string | null {
  const params = parseQuery(url);
  const value = params[key];
  
  if (value === undefined) return null;
  if (Array.isArray(value)) return value[0] || null;
  return value;
}

/**
 * 获取 URL 所有同名参数的值（数组）
 * @param key 参数名
 * @param url URL 字符串，默认为当前页面 URL
 * @returns 参数值数组
 * @example
 * getQueryParams('tags', '?tags=a&tags=b&tags=c')
 * // ['a', 'b', 'c']
 */
export function getQueryParams(key: string, url?: string): string[] {
  const params = parseQuery(url);
  const value = params[key];
  
  if (value === undefined) return [];
  if (Array.isArray(value)) return value;
  return [value];
}

/**
 * 更新 URL 参数（不刷新页面）
 * @param params 要更新的参数对象
 * @param mode 更新模式：'push' 添加历史记录，'replace' 替换当前记录
 * @example
 * updateQueryParams({ name: 'Tom', age: 20 }, 'push')
 */
export function updateQueryParams(
  params: Record<string, any>,
  mode: 'push' | 'replace' = 'push'
): void {
  if (typeof window === 'undefined' || !window.history) return;

  const currentParams = parseQuery();
  const newParams = { ...currentParams, ...params };
  
  // 移除值为 null 或 undefined 的参数
  Object.keys(newParams).forEach((key) => {
    if (newParams[key] === null || newParams[key] === undefined) {
      delete newParams[key];
    }
  });

  const queryString = stringifyQuery(newParams);
  const newUrl = queryString
    ? `${window.location.pathname}?${queryString}`
    : window.location.pathname;

  if (mode === 'push') {
    window.history.pushState(null, '', newUrl);
  } else {
    window.history.replaceState(null, '', newUrl);
  }
}

/**
 * 删除 URL 指定参数（不刷新页面）
 * @param keys 要删除的参数名数组
 * @param mode 更新模式：'push' 添加历史记录，'replace' 替换当前记录
 * @example
 * removeQueryParams(['name', 'age'], 'replace')
 */
export function removeQueryParams(
  keys: string[],
  mode: 'push' | 'replace' = 'push'
): void {
  if (typeof window === 'undefined' || !window.history) return;

  const currentParams = parseQuery();
  keys.forEach((key) => {
    delete currentParams[key];
  });

  const queryString = stringifyQuery(currentParams);
  const newUrl = queryString
    ? `${window.location.pathname}?${queryString}`
    : window.location.pathname;

  if (mode === 'push') {
    window.history.pushState(null, '', newUrl);
  } else {
    window.history.replaceState(null, '', newUrl);
  }
}

/**
 * 清空所有 URL 参数（不刷新页面）
 * @param mode 更新模式：'push' 添加历史记录，'replace' 替换当前记录
 * @example
 * clearQueryParams('replace')
 */
export function clearQueryParams(mode: 'push' | 'replace' = 'push'): void {
  if (typeof window === 'undefined' || !window.history) return;

  const newUrl = window.location.pathname;

  if (mode === 'push') {
    window.history.pushState(null, '', newUrl);
  } else {
    window.history.replaceState(null, '', newUrl);
  }
}

/* ========== URL 拼接和解析 ========== */

/**
 * 拼接 URL（自动处理斜杠）
 * @param parts URL 片段数组
 * @returns 拼接后的 URL
 * @example
 * joinUrl('http://example.com/', '/api/', 'users/', '123')
 * // 'http://example.com/api/users/123'
 */
export function joinUrl(...parts: string[]): string {
  if (parts.length === 0) return '';

  return parts
    .map((part, index) => {
      if (index === 0) {
        // 第一个部分保留尾部斜杠
        return part.replace(/\/+$/, '');
      } else if (index === parts.length - 1) {
        // 最后一个部分保留首尾
        return part.replace(/^\/+/, '');
      } else {
        // 中间部分去掉首尾斜杠
        return part.replace(/^\/+|\/+$/g, '');
      }
    })
    .filter(Boolean)
    .join('/');
}

/**
 * 解析 URL 为各个组成部分
 * @param url URL 字符串
 * @returns URL 各部分的对象
 * @example
 * parseUrl('https://user:pass@example.com:8080/path?query=1#hash')
 * // {
 * //   protocol: 'https:',
 * //   username: 'user',
 * //   password: 'pass',
 * //   hostname: 'example.com',
 * //   port: '8080',
 * //   pathname: '/path',
 * //   search: '?query=1',
 * //   hash: '#hash',
 * //   host: 'example.com:8080',
 * //   origin: 'https://example.com:8080',
 * //   href: 'https://user:pass@example.com:8080/path?query=1#hash'
 * // }
 */
export function parseUrl(url: string): {
  protocol: string;
  username: string;
  password: string;
  hostname: string;
  port: string;
  pathname: string;
  search: string;
  hash: string;
  host: string;
  origin: string;
  href: string;
  params: Record<string, string | string[]>;
} {
  if (!url) {
    return {
      protocol: '',
      username: '',
      password: '',
      hostname: '',
      port: '',
      pathname: '',
      search: '',
      hash: '',
      host: '',
      origin: '',
      href: '',
      params: {},
    };
  }

  try {
    const urlObj = new URL(url);
    return {
      protocol: urlObj.protocol,
      username: urlObj.username,
      password: urlObj.password,
      hostname: urlObj.hostname,
      port: urlObj.port,
      pathname: urlObj.pathname,
      search: urlObj.search,
      hash: urlObj.hash,
      host: urlObj.host,
      origin: urlObj.origin,
      href: urlObj.href,
      params: parseQuery(url),
    };
  } catch (e) {
    // 如果不是完整 URL，尝试解析相对 URL
    return {
      protocol: '',
      username: '',
      password: '',
      hostname: '',
      port: '',
      pathname: url.split('?')[0].split('#')[0],
      search: url.includes('?') ? '?' + url.split('?')[1].split('#')[0] : '',
      hash: url.includes('#') ? '#' + url.split('#')[1] : '',
      host: '',
      origin: '',
      href: url,
      params: parseQuery(url),
    };
  }
}

/**
 * 构建 URL
 * @param options URL 各部分配置
 * @returns 完整的 URL 字符串
 * @example
 * buildUrl({
 *   protocol: 'https',
 *   hostname: 'example.com',
 *   pathname: '/api/users',
 *   params: { page: 1, size: 10 }
 * })
 * // 'https://example.com/api/users?page=1&size=10'
 */
export function buildUrl(options: {
  protocol?: string;
  hostname?: string;
  port?: string | number;
  pathname?: string;
  params?: Record<string, any>;
  hash?: string;
}): string {
  const {
    protocol = 'https',
    hostname = '',
    port = '',
    pathname = '',
    params = {},
    hash = '',
  } = options;

  if (!hostname) return pathname;

  let url = `${protocol}://${hostname}`;
  
  if (port) {
    url += `:${port}`;
  }

  if (pathname) {
    url += pathname.startsWith('/') ? pathname : `/${pathname}`;
  }

  const queryString = stringifyQuery(params);
  if (queryString) {
    url += `?${queryString}`;
  }

  if (hash) {
    url += hash.startsWith('#') ? hash : `#${hash}`;
  }

  return url;
}

/* ========== URL 判断 ========== */

/**
 * 判断是否为外部链接（http/https 开头）
 * @param url URL 字符串
 * @returns 是否为外部链接
 * @example
 * isExternalLink('https://example.com')
 * // true
 * isExternalLink('/path/to/page')
 * // false
 */
export function isExternalLink(url: string): boolean {
  if (!url) return false;
  return /^(https?:)?\/\//.test(url);
}

/**
 * 判断是否为绝对路径
 * @param url URL 字符串
 * @returns 是否为绝对路径
 * @example
 * isAbsolutePath('/path/to/page')
 * // true
 * isAbsolutePath('path/to/page')
 * // false
 */
export function isAbsolutePath(url: string): boolean {
  if (!url) return false;
  return url.startsWith('/');
}

/**
 * 判断两个 URL 是否同源
 * @param url1 URL 1
 * @param url2 URL 2
 * @returns 是否同源
 * @example
 * isSameOrigin('https://example.com/a', 'https://example.com/b')
 * // true
 * isSameOrigin('https://example.com', 'https://other.com')
 * // false
 */
export function isSameOrigin(url1: string, url2: string): boolean {
  try {
    const parsed1 = new URL(url1);
    const parsed2 = new URL(url2);
    return parsed1.origin === parsed2.origin;
  } catch {
    return false;
  }
}

/* ========== URL 编码/解码 ========== */

/**
 * 编码 URL 参数值
 * @param value 参数值
 * @returns 编码后的值
 * @example
 * encodeParam('hello world')
 * // 'hello%20world'
 */
export function encodeParam(value: string): string {
  return encodeURIComponent(value);
}

/**
 * 解码 URL 参数值
 * @param value 编码的参数值
 * @returns 解码后的值
 * @example
 * decodeParam('hello%20world')
 * // 'hello world'
 */
export function decodeParam(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

/**
 * 安全编码 URL（处理已编码的情况）
 * @param url URL 字符串
 * @returns 编码后的 URL
 */
export function safeEncodeUrl(url: string): string {
  if (!url) return '';
  try {
    // 先解码再编码，避免重复编码
    return encodeURI(decodeURI(url));
  } catch {
    return encodeURI(url);
  }
}

/**
 * 安全解码 URL（处理未编码的情况）
 * @param url 编码的 URL 字符串
 * @returns 解码后的 URL
 */
export function safeDecodeUrl(url: string): string {
  if (!url) return '';
  try {
    return decodeURI(url);
  } catch {
    return url;
  }
}

/* ========== URL 操作 ========== */

/**
 * 添加 URL 参数
 * @param url 原始 URL
 * @param params 要添加的参数
 * @returns 添加参数后的 URL
 * @example
 * addQueryParams('http://example.com/api', { page: 1, size: 10 })
 * // 'http://example.com/api?page=1&size=10'
 * 
 * addQueryParams('http://example.com/api?id=1', { page: 1 })
 * // 'http://example.com/api?id=1&page=1'
 */
export function addQueryParams(url: string, params: Record<string, any>): string {
  if (!url) return '';
  if (!params || Object.keys(params).length === 0) return url;

  const [baseUrl, hashPart] = url.split('#');
  const [pathPart, existingQuery] = baseUrl.split('?');

  const existingParams = existingQuery ? parseQuery('?' + existingQuery) : {};
  const mergedParams = { ...existingParams, ...params };
  
  const queryString = stringifyQuery(mergedParams);
  let result = pathPart;
  
  if (queryString) {
    result += `?${queryString}`;
  }
  
  if (hashPart) {
    result += `#${hashPart}`;
  }

  return result;
}

/**
 * 移除 URL 中的指定参数
 * @param url 原始 URL
 * @param keys 要移除的参数名数组
 * @returns 移除参数后的 URL
 * @example
 * removeQueryParamsFromUrl('http://example.com?a=1&b=2&c=3', ['b', 'c'])
 * // 'http://example.com?a=1'
 */
export function removeQueryParamsFromUrl(url: string, keys: string[]): string {
  if (!url) return '';
  if (!keys || keys.length === 0) return url;

  const [baseUrl, hashPart] = url.split('#');
  const [pathPart, existingQuery] = baseUrl.split('?');

  if (!existingQuery) return url;

  const existingParams = parseQuery('?' + existingQuery);
  keys.forEach((key) => {
    delete existingParams[key];
  });

  const queryString = stringifyQuery(existingParams);
  let result = pathPart;
  
  if (queryString) {
    result += `?${queryString}`;
  }
  
  if (hashPart) {
    result += `#${hashPart}`;
  }

  return result;
}

/**
 * 获取 URL 的域名
 * @param url URL 字符串
 * @returns 域名
 * @example
 * getDomain('https://www.example.com/path')
 * // 'www.example.com'
 */
export function getDomain(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch {
    return '';
  }
}

/**
 * 获取 URL 的根域名（不含子域名）
 * @param url URL 字符串
 * @returns 根域名
 * @example
 * getRootDomain('https://www.example.com/path')
 * // 'example.com'
 */
export function getRootDomain(url: string): string {
  const domain = getDomain(url);
  if (!domain) return '';

  const parts = domain.split('.');
  if (parts.length <= 2) return domain;
  
  return parts.slice(-2).join('.');
}

/**
 * 获取当前页面的完整 URL
 * @returns 当前页面 URL
 */
export function getCurrentUrl(): string {
  if (typeof window === 'undefined') return '';
  return window.location.href;
}

/**
 * 获取当前页面的路径（不含域名和参数）
 * @returns 当前页面路径
 */
export function getCurrentPath(): string {
  if (typeof window === 'undefined') return '';
  return window.location.pathname;
}

/**
 * 获取当前页面的查询参数
 * @returns 查询参数对象
 */
export function getCurrentQuery(): Record<string, string | string[]> {
  if (typeof window === 'undefined') return {};
  return parseQuery(window.location.search);
}

/**
 * 获取当前页面的 Hash
 * @returns Hash 值（不含 #）
 */
export function getCurrentHash(): string {
  if (typeof window === 'undefined') return '';
  return window.location.hash.replace(/^#/, '');
}
