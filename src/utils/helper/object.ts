/**
 * 对象处理工具函数
 */

/* ========== 对象拷贝 ========== */

/**
 * 深拷贝对象
 * @param obj 要拷贝的对象
 * @returns 深拷贝后的对象
 * @example
 * const obj = { a: 1, b: { c: 2 } };
 * const copied = deepClone(obj);
 * copied.b.c = 3; // 不影响原对象
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj;

  // 处理日期对象
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as any;
  }

  // 处理正则对象
  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags) as any;
  }

  // 处理数组
  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item)) as any;
  }

  // 处理普通对象
  const clonedObj = {} as T;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clonedObj[key] = deepClone(obj[key]);
    }
  }

  return clonedObj;
}

/**
 * 浅拷贝对象
 * @param obj 要拷贝的对象
 * @returns 浅拷贝后的对象
 * @example
 * const obj = { a: 1, b: { c: 2 } };
 * const copied = shallowClone(obj);
 */
export function shallowClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj;

  if (Array.isArray(obj)) {
    return [...obj] as any;
  }

  return { ...obj };
}

/* ========== 对象合并 ========== */

/**
 * 深度合并对象
 * @param target 目标对象
 * @param sources 源对象数组
 * @returns 合并后的对象
 * @example
 * deepMerge({ a: 1, b: { c: 2 } }, { b: { d: 3 }, e: 4 })
 * // { a: 1, b: { c: 2, d: 3 }, e: 4 }
 */
export function deepMerge<T extends Record<string, any>>(...sources: Partial<T>[]): T {
  if (sources.length === 0) return {} as T;
  if (sources.length === 1) return sources[0] as T;

  const result: any = {};

  sources.forEach((source) => {
    if (!source || typeof source !== 'object') return;

    Object.keys(source).forEach((key) => {
      const sourceValue = source[key];
      const targetValue = result[key];

      // 如果源值和目标值都是对象，递归合并
      if (
        sourceValue &&
        typeof sourceValue === 'object' &&
        !Array.isArray(sourceValue) &&
        targetValue &&
        typeof targetValue === 'object' &&
        !Array.isArray(targetValue)
      ) {
        result[key] = deepMerge(targetValue, sourceValue);
      } else {
        // 否则直接覆盖
        result[key] = deepClone(sourceValue);
      }
    });
  });

  return result;
}

/**
 * 浅合并对象
 * @param target 目标对象
 * @param sources 源对象数组
 * @returns 合并后的对象
 * @example
 * shallowMerge({ a: 1 }, { b: 2 }, { c: 3 })
 * // { a: 1, b: 2, c: 3 }
 */
export function shallowMerge<T extends Record<string, any>>(...sources: Partial<T>[]): T {
  return Object.assign({}, ...sources) as T;
}

/* ========== 对象属性操作 ========== */

/**
 * 选取对象的指定属性
 * @param obj 源对象
 * @param keys 要选取的属性名数组
 * @returns 只包含指定属性的新对象
 * @example
 * pick({ a: 1, b: 2, c: 3 }, ['a', 'c'])
 * // { a: 1, c: 3 }
 */
export function pick<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  if (!obj || typeof obj !== 'object') return {} as Pick<T, K>;

  const result = {} as Pick<T, K>;
  keys.forEach((key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
}

/**
 * 排除对象的指定属性
 * @param obj 源对象
 * @param keys 要排除的属性名数组
 * @returns 排除指定属性后的新对象
 * @example
 * omit({ a: 1, b: 2, c: 3 }, ['b'])
 * // { a: 1, c: 3 }
 */
export function omit<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  if (!obj || typeof obj !== 'object') return {} as Omit<T, K>;

  const result = { ...obj };
  keys.forEach((key) => {
    delete result[key];
  });
  return result as Omit<T, K>;
}

/**
 * 获取对象深层属性
 * @param obj 对象
 * @param path 属性路径，如 'user.info.name'
 * @param defaultValue 默认值
 * @returns 属性值或默认值
 * @example
 * get({ user: { info: { name: 'Tom' } } }, 'user.info.name')
 * // 'Tom'
 * get({ user: {} }, 'user.info.name', 'Unknown')
 * // 'Unknown'
 */
export function get<T = any>(obj: any, path: string, defaultValue?: T): T {
  if (!obj || typeof obj !== 'object') return defaultValue as T;

  const keys = path.split('.');
  let result = obj;

  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = result[key];
    } else {
      return defaultValue as T;
    }
  }

  return result !== undefined ? result : (defaultValue as T);
}

/**
 * 设置对象深层属性
 * @param obj 对象
 * @param path 属性路径，如 'user.info.name'
 * @param value 要设置的值
 * @example
 * const obj = {};
 * set(obj, 'user.info.name', 'Tom');
 * // obj 变为 { user: { info: { name: 'Tom' } } }
 */
export function set(obj: any, path: string, value: any): void {
  if (!obj || typeof obj !== 'object') return;

  const keys = path.split('.');
  const lastKey = keys.pop();
  if (!lastKey) return;

  let current = obj;
  for (const key of keys) {
    if (!(key in current) || typeof current[key] !== 'object') {
      current[key] = {};
    }
    current = current[key];
  }

  current[lastKey] = value;
}

/**
 * 判断对象是否有指定属性（支持深层路径）
 * @param obj 对象
 * @param path 属性路径，如 'user.info.name'
 * @returns 是否存在该属性
 * @example
 * has({ user: { info: { name: 'Tom' } } }, 'user.info.name')
 * // true
 * has({ user: {} }, 'user.info.name')
 * // false
 */
export function has(obj: any, path: string): boolean {
  if (!obj || typeof obj !== 'object') return false;

  const keys = path.split('.');
  let current = obj;

  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return false;
    }
  }

  return true;
}

/* ========== 对象判断 ========== */

/**
 * 判断对象是否为空
 * @param obj 对象
 * @returns 是否为空
 * @example
 * isEmpty({}) // true
 * isEmpty({ a: 1 }) // false
 * isEmpty(null) // true
 * isEmpty([]) // true
 */
export function isEmpty(obj: any): boolean {
  if (obj === null || obj === undefined) return true;

  if (Array.isArray(obj)) return obj.length === 0;

  if (typeof obj === 'object') {
    return Object.keys(obj).length === 0;
  }

  return false;
}

/**
 * 判断是否为普通对象
 * @param obj 任意值
 * @returns 是否为普通对象
 * @example
 * isPlainObject({}) // true
 * isPlainObject(new Date()) // false
 * isPlainObject([]) // false
 */
export function isPlainObject(obj: any): obj is Record<string, any> {
  if (typeof obj !== 'object' || obj === null) return false;

  const proto = Object.getPrototypeOf(obj);
  return proto === Object.prototype || proto === null;
}

/**
 * 判断两个对象是否相等（深度比较）
 * @param obj1 对象1
 * @param obj2 对象2
 * @returns 是否相等
 * @example
 * isEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } })
 * // true
 */
export function isEqual(obj1: any, obj2: any): boolean {
  // 基础类型直接比较
  if (obj1 === obj2) return true;

  // 如果有一个不是对象，返回 false
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
    return false;
  }

  // 处理日期
  if (obj1 instanceof Date && obj2 instanceof Date) {
    return obj1.getTime() === obj2.getTime();
  }

  // 处理正则
  if (obj1 instanceof RegExp && obj2 instanceof RegExp) {
    return obj1.toString() === obj2.toString();
  }

  // 处理数组
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    if (obj1.length !== obj2.length) return false;
    return obj1.every((item, index) => isEqual(item, obj2[index]));
  }

  // 处理普通对象
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  return keys1.every((key) => isEqual(obj1[key], obj2[key]));
}

/* ========== 对象转换 ========== */

/**
 * 对象键名转驼峰
 * @param obj 对象
 * @returns 键名转为驼峰的新对象
 * @example
 * keysToCamelCase({ user_name: 'Tom', user_age: 20 })
 * // { userName: 'Tom', userAge: 20 }
 */
export function keysToCamelCase<T extends Record<string, any>>(obj: T): any {
  if (!obj || typeof obj !== 'object') return obj;

  if (Array.isArray(obj)) {
    return obj.map((item) => keysToCamelCase(item));
  }

  const result: any = {};
  Object.keys(obj).forEach((key) => {
    const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    const value = obj[key];
    result[camelKey] = typeof value === 'object' ? keysToCamelCase(value) : value;
  });

  return result;
}

/**
 * 对象键名转下划线
 * @param obj 对象
 * @returns 键名转为下划线的新对象
 * @example
 * keysToUnderlineCase({ userName: 'Tom', userAge: 20 })
 * // { user_name: 'Tom', user_age: 20 }
 */
export function keysToUnderlineCase<T extends Record<string, any>>(obj: T): any {
  if (!obj || typeof obj !== 'object') return obj;

  if (Array.isArray(obj)) {
    return obj.map((item) => keysToUnderlineCase(item));
  }

  const result: any = {};
  Object.keys(obj).forEach((key) => {
    const underlineKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
    const value = obj[key];
    result[underlineKey] = typeof value === 'object' ? keysToUnderlineCase(value) : value;
  });

  return result;
}

/**
 * 对象转 URL 查询字符串
 * @param obj 对象
 * @returns URL 查询字符串
 * @example
 * toQueryString({ name: 'Tom', age: 20 })
 * // 'name=Tom&age=20'
 */
export function toQueryString(obj: Record<string, any>): string {
  if (!obj || typeof obj !== 'object') return '';

  return Object.keys(obj)
    .filter((key) => obj[key] !== undefined && obj[key] !== null)
    .map((key) => {
      const value = obj[key];
      if (Array.isArray(value)) {
        return value.map((v) => `${encodeURIComponent(key)}=${encodeURIComponent(v)}`).join('&');
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join('&');
}

/**
 * URL 查询字符串转对象
 * @param queryString URL 查询字符串
 * @returns 对象
 * @example
 * fromQueryString('name=Tom&age=20')
 * // { name: 'Tom', age: '20' }
 */
export function fromQueryString(queryString: string): Record<string, any> {
  if (!queryString) return {};

  const str = queryString.startsWith('?') ? queryString.slice(1) : queryString;
  const result: Record<string, any> = {};

  str.split('&').forEach((pair) => {
    const [key, value] = pair.split('=').map(decodeURIComponent);
    if (key) {
      // 处理重复的 key（转为数组）
      if (key in result) {
        if (Array.isArray(result[key])) {
          result[key].push(value);
        } else {
          result[key] = [result[key], value];
        }
      } else {
        result[key] = value;
      }
    }
  });

  return result;
}

/* ========== 对象过滤 ========== */

/**
 * 过滤对象的属性（根据值）
 * @param obj 对象
 * @param predicate 判断函数
 * @returns 过滤后的新对象
 * @example
 * filterValues({ a: 1, b: 2, c: 3 }, value => value > 1)
 * // { b: 2, c: 3 }
 */
export function filterValues<T extends Record<string, any>>(
  obj: T,
  predicate: (value: any, key: string) => boolean
): Partial<T> {
  if (!obj || typeof obj !== 'object') return {};

  const result: any = {};
  Object.keys(obj).forEach((key) => {
    if (predicate(obj[key], key)) {
      result[key] = obj[key];
    }
  });

  return result;
}

/**
 * 移除对象中的空值（null、undefined、空字符串）
 * @param obj 对象
 * @param removeEmptyString 是否移除空字符串，默认 true
 * @returns 移除空值后的新对象
 * @example
 * removeEmpty({ a: 1, b: null, c: undefined, d: '', e: 0 })
 * // { a: 1, e: 0 }
 */
export function removeEmpty<T extends Record<string, any>>(
  obj: T,
  removeEmptyString: boolean = true
): Partial<T> {
  return filterValues(obj, (value) => {
    if (value === null || value === undefined) return false;
    if (removeEmptyString && value === '') return false;
    return true;
  });
}

/**
 * 扁平化嵌套对象
 * @param obj 嵌套对象
 * @param prefix 前缀
 * @returns 扁平化后的对象
 * @example
 * flattenObject({ a: 1, b: { c: 2, d: { e: 3 } } })
 * // { a: 1, 'b.c': 2, 'b.d.e': 3 }
 */
export function flattenObject(obj: Record<string, any>, prefix: string = ''): Record<string, any> {
  if (!obj || typeof obj !== 'object') return {};

  const result: Record<string, any> = {};

  Object.keys(obj).forEach((key) => {
    const newKey = prefix ? `${prefix}.${key}` : key;
    const value = obj[key];

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(result, flattenObject(value, newKey));
    } else {
      result[newKey] = value;
    }
  });

  return result;
}

/**
 * 反扁平化对象
 * @param obj 扁平对象
 * @returns 嵌套对象
 * @example
 * unflattenObject({ a: 1, 'b.c': 2, 'b.d.e': 3 })
 * // { a: 1, b: { c: 2, d: { e: 3 } } }
 */
export function unflattenObject(obj: Record<string, any>): Record<string, any> {
  if (!obj || typeof obj !== 'object') return {};

  const result: Record<string, any> = {};

  Object.keys(obj).forEach((key) => {
    set(result, key, obj[key]);
  });

  return result;
}

/**
 * 反转对象的键值
 * @param obj 对象
 * @returns 键值反转后的对象
 * @example
 * invert({ a: 1, b: 2, c: 3 })
 * // { '1': 'a', '2': 'b', '3': 'c' }
 */
export function invert<T extends Record<string, string | number>>(
  obj: T
): Record<string, string> {
  if (!obj || typeof obj !== 'object') return {};

  const result: Record<string, string> = {};
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    result[String(value)] = key;
  });

  return result;
}

/**
 * 获取对象所有值的数组
 * @param obj 对象
 * @returns 值的数组
 * @example
 * values({ a: 1, b: 2, c: 3 })
 * // [1, 2, 3]
 */
export function values<T>(obj: Record<string, T>): T[] {
  if (!obj || typeof obj !== 'object') return [];
  return Object.values(obj);
}

/**
 * 获取对象所有键的数组
 * @param obj 对象
 * @returns 键的数组
 * @example
 * keys({ a: 1, b: 2, c: 3 })
 * // ['a', 'b', 'c']
 */
export function keys<T extends Record<string, any>>(obj: T): Array<keyof T> {
  if (!obj || typeof obj !== 'object') return [];
  return Object.keys(obj) as Array<keyof T>;
}

/**
 * 获取对象所有键值对的数组
 * @param obj 对象
 * @returns 键值对数组
 * @example
 * entries({ a: 1, b: 2, c: 3 })
 * // [['a', 1], ['b', 2], ['c', 3]]
 */
export function entries<T extends Record<string, any>>(obj: T): Array<[keyof T, T[keyof T]]> {
  if (!obj || typeof obj !== 'object') return [];
  return Object.entries(obj) as Array<[keyof T, T[keyof T]]>;
}
