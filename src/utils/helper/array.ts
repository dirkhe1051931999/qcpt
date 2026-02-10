/**
 * 数组处理工具函数
 */

/* ========== 数组去重 ========== */

/**
 * 数组去重（基础类型）
 * @param arr 数组
 * @returns 去重后的数组
 * @example
 * uniqueArray([1, 2, 2, 3, 3, 4]) // [1, 2, 3, 4]
 * uniqueArray(['a', 'b', 'a', 'c']) // ['a', 'b', 'c']
 */
export function uniqueArray<T>(arr: T[]): T[] {
  if (!Array.isArray(arr)) return arr;
  return [...new Set(arr)];
}

/**
 * 对象数组去重（根据指定字段）
 * @param arr 对象数组
 * @param key 用于判断重复的字段名
 * @returns 去重后的数组
 * @example
 * uniqueArrayByKey([{id: 1, name: 'a'}, {id: 2, name: 'b'}, {id: 1, name: 'c'}], 'id')
 * // [{id: 1, name: 'a'}, {id: 2, name: 'b'}]
 */
export function uniqueArrayByKey<T extends Record<string, any>>(arr: T[], key: keyof T): T[] {
  if (!Array.isArray(arr)) return arr;
  const seen = new Map<any, boolean>();
  return arr.filter((item) => {
    const val = item[key];
    if (seen.has(val)) return false;
    seen.set(val, true);
    return true;
  });
}

/**
 * 对象数组去重（根据多个字段）
 * @param arr 对象数组
 * @param keys 用于判断重复的字段名数组
 * @returns 去重后的数组
 * @example
 * uniqueArrayByKeys([{a: 1, b: 2}, {a: 1, b: 3}, {a: 1, b: 2}], ['a', 'b'])
 * // [{a: 1, b: 2}, {a: 1, b: 3}]
 */
export function uniqueArrayByKeys<T extends Record<string, any>>(arr: T[], keys: Array<keyof T>): T[] {
  if (!Array.isArray(arr)) return arr;
  const seen = new Set<string>();
  return arr.filter((item) => {
    const key = keys.map((k) => item[k]).join('|');
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/* ========== 数组树形化 ========== */

/**
 * 扁平数组转树形结构
 * @param arr 扁平数组
 * @param options 配置选项
 * @returns 树形结构数组
 * @example
 * const list = [
 *   { id: 1, parentId: null, name: 'A' },
 *   { id: 2, parentId: 1, name: 'A-1' },
 *   { id: 3, parentId: 1, name: 'A-2' },
 *   { id: 4, parentId: null, name: 'B' },
 * ];
 * arrayToTree(list)
 * // [
 * //   { id: 1, parentId: null, name: 'A', children: [
 * //     { id: 2, parentId: 1, name: 'A-1', children: [] },
 * //     { id: 3, parentId: 1, name: 'A-2', children: [] }
 * //   ]},
 * //   { id: 4, parentId: null, name: 'B', children: [] }
 * // ]
 */
export function arrayToTree<T extends Record<string, any>>(
  arr: T[],
  options?: {
    idKey?: string;
    parentKey?: string;
    childrenKey?: string;
    rootParentValue?: any;
  }
): T[] {
  if (!Array.isArray(arr)) return arr;

  const {
    idKey = 'id',
    parentKey = 'parentId',
    childrenKey = 'children',
    rootParentValue = null,
  } = options || {};

  const map = new Map<any, T>();
  const result: T[] = [];

  // 先创建映射
  arr.forEach((item) => {
    map.set(item[idKey], { ...item, [childrenKey]: [] });
  });

  // 再建立父子关系
  arr.forEach((item) => {
    const node = map.get(item[idKey]);
    if (!node) return;

    const parentId = item[parentKey];
    if (parentId === rootParentValue || parentId === undefined) {
      result.push(node);
    } else {
      const parent = map.get(parentId);
      if (parent) {
        if (!(parent as any)[childrenKey]) (parent as any)[childrenKey] = [];
        (parent as any)[childrenKey].push(node);
      } else {
        // 找不到父节点，作为根节点
        result.push(node);
      }
    }
  });

  return result;
}

/**
 * 树形结构转扁平数组
 * @param tree 树形结构数组
 * @param childrenKey 子节点字段名，默认 'children'
 * @returns 扁平数组
 * @example
 * const tree = [
 *   { id: 1, name: 'A', children: [
 *     { id: 2, name: 'A-1', children: [] },
 *     { id: 3, name: 'A-2', children: [] }
 *   ]},
 * ];
 * treeToArray(tree)
 * // [{ id: 1, name: 'A' }, { id: 2, name: 'A-1' }, { id: 3, name: 'A-2' }]
 */
export function treeToArray<T extends Record<string, any>>(tree: T[], childrenKey: string = 'children'): T[] {
  if (!Array.isArray(tree)) return tree;

  const result: T[] = [];

  const flatten = (nodes: T[]) => {
    nodes.forEach((node) => {
      const children = node[childrenKey];
      const newNode = { ...node };
      delete newNode[childrenKey];
      result.push(newNode);

      if (Array.isArray(children) && children.length > 0) {
        flatten(children);
      }
    });
  };

  flatten(tree);
  return result;
}

/**
 * 在树中查找节点
 * @param tree 树形结构数组
 * @param predicate 判断函数
 * @param childrenKey 子节点字段名，默认 'children'
 * @returns 找到的节点或 null
 * @example
 * const tree = [{ id: 1, children: [{ id: 2 }] }];
 * findNodeInTree(tree, node => node.id === 2) // { id: 2 }
 */
export function findNodeInTree<T extends Record<string, any>>(
  tree: T[],
  predicate: (node: T) => boolean,
  childrenKey: string = 'children'
): T | null {
  if (!Array.isArray(tree)) return null;

  for (const node of tree) {
    if (predicate(node)) return node;

    if (Array.isArray(node[childrenKey]) && node[childrenKey].length > 0) {
      const found = findNodeInTree(node[childrenKey], predicate, childrenKey);
      if (found) return found;
    }
  }

  return null;
}

/**
 * 遍历树的所有节点
 * @param tree 树形结构数组
 * @param callback 回调函数
 * @param childrenKey 子节点字段名，默认 'children'
 * @example
 * forEachTree(tree, (node) => console.log(node.name))
 */
export function forEachTree<T extends Record<string, any>>(
  tree: T[],
  callback: (node: T, parent: T | null, level: number) => void,
  childrenKey: string = 'children'
): void {
  if (!Array.isArray(tree)) return;

  const traverse = (nodes: T[], parent: T | null, level: number) => {
    nodes.forEach((node) => {
      callback(node, parent, level);

      if (Array.isArray(node[childrenKey]) && node[childrenKey].length > 0) {
        traverse(node[childrenKey], node, level + 1);
      }
    });
  };

  traverse(tree, null, 0);
}

/* ========== 数组分组 ========== */

/**
 * 数组分组
 * @param arr 数组
 * @param key 分组依据的字段名
 * @returns 分组后的对象
 * @example
 * const arr = [
 *   { type: 'fruit', name: 'apple' },
 *   { type: 'fruit', name: 'banana' },
 *   { type: 'vegetable', name: 'carrot' }
 * ];
 * groupBy(arr, 'type')
 * // {
 * //   fruit: [{ type: 'fruit', name: 'apple' }, { type: 'fruit', name: 'banana' }],
 * //   vegetable: [{ type: 'vegetable', name: 'carrot' }]
 * // }
 */
export function groupBy<T extends Record<string, any>>(arr: T[], key: keyof T): Record<string, T[]> {
  if (!Array.isArray(arr)) return {};

  return arr.reduce((result, item) => {
    const groupKey = String(item[key]);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, T[]>);
}

/**
 * 数组分组（根据函数）
 * @param arr 数组
 * @param fn 分组函数
 * @returns 分组后的对象
 * @example
 * groupByFn([1, 2, 3, 4, 5], num => num % 2 === 0 ? 'even' : 'odd')
 * // { odd: [1, 3, 5], even: [2, 4] }
 */
export function groupByFn<T>(arr: T[], fn: (item: T) => string): Record<string, T[]> {
  if (!Array.isArray(arr)) return {};

  return arr.reduce((result, item) => {
    const key = fn(item);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
    return result;
  }, {} as Record<string, T[]>);
}

/* ========== 数组排序 ========== */

/**
 * 数组排序（根据单个字段）
 * @param arr 数组
 * @param key 排序字段
 * @param order 排序方式，'asc' 升序，'desc' 降序
 * @returns 排序后的数组
 * @example
 * sortBy([{ age: 30 }, { age: 20 }, { age: 25 }], 'age', 'asc')
 * // [{ age: 20 }, { age: 25 }, { age: 30 }]
 */
export function sortBy<T extends Record<string, any>>(
  arr: T[],
  key: keyof T,
  order: 'asc' | 'desc' = 'asc'
): T[] {
  if (!Array.isArray(arr)) return arr;

  return [...arr].sort((a, b) => {
    const valA = a[key];
    const valB = b[key];

    if (valA < valB) return order === 'asc' ? -1 : 1;
    if (valA > valB) return order === 'asc' ? 1 : -1;
    return 0;
  });
}

/**
 * 数组排序（根据多个字段）
 * @param arr 数组
 * @param keys 排序字段配置数组
 * @returns 排序后的数组
 * @example
 * sortByMultiple(
 *   [{ age: 30, name: 'Bob' }, { age: 20, name: 'Alice' }, { age: 30, name: 'Alice' }],
 *   [{ key: 'age', order: 'asc' }, { key: 'name', order: 'asc' }]
 * )
 * // [{ age: 20, name: 'Alice' }, { age: 30, name: 'Alice' }, { age: 30, name: 'Bob' }]
 */
export function sortByMultiple<T extends Record<string, any>>(
  arr: T[],
  keys: Array<{ key: keyof T; order?: 'asc' | 'desc' }>
): T[] {
  if (!Array.isArray(arr)) return arr;

  return [...arr].sort((a, b) => {
    for (const { key, order = 'asc' } of keys) {
      const valA = a[key];
      const valB = b[key];

      if (valA < valB) return order === 'asc' ? -1 : 1;
      if (valA > valB) return order === 'asc' ? 1 : -1;
    }
    return 0;
  });
}

/* ========== 数组统计 ========== */

/**
 * 数组求和
 * @param arr 数组
 * @param key 可选，对象数组时指定求和的字段
 * @returns 求和结果
 * @example
 * sum([1, 2, 3, 4, 5]) // 15
 * sum([{ price: 10 }, { price: 20 }], 'price') // 30
 */
export function sum<T>(arr: T[], key?: keyof T): number {
  if (!Array.isArray(arr)) return 0;

  return arr.reduce((total, item) => {
    const value = key ? (item as any)[key] : item;
    return total + (Number(value) || 0);
  }, 0);
}

/**
 * 数组求平均值
 * @param arr 数组
 * @param key 可选，对象数组时指定字段
 * @returns 平均值
 * @example
 * average([1, 2, 3, 4, 5]) // 3
 * average([{ age: 20 }, { age: 30 }], 'age') // 25
 */
export function average<T>(arr: T[], key?: keyof T): number {
  if (!Array.isArray(arr) || arr.length === 0) return 0;
  return sum(arr, key) / arr.length;
}

/**
 * 数组求最大值
 * @param arr 数组
 * @param key 可选，对象数组时指定字段
 * @returns 最大值
 * @example
 * max([1, 2, 3, 4, 5]) // 5
 * max([{ age: 20 }, { age: 30 }], 'age') // 30
 */
export function max<T>(arr: T[], key?: keyof T): number {
  if (!Array.isArray(arr) || arr.length === 0) return 0;

  const values = arr.map((item) => {
    const value = key ? (item as any)[key] : item;
    return Number(value) || 0;
  });

  return Math.max(...values);
}

/**
 * 数组求最小值
 * @param arr 数组
 * @param key 可选，对象数组时指定字段
 * @returns 最小值
 * @example
 * min([1, 2, 3, 4, 5]) // 1
 * min([{ age: 20 }, { age: 30 }], 'age') // 20
 */
export function min<T>(arr: T[], key?: keyof T): number {
  if (!Array.isArray(arr) || arr.length === 0) return 0;

  const values = arr.map((item) => {
    const value = key ? (item as any)[key] : item;
    return Number(value) || 0;
  });

  return Math.min(...values);
}

/* ========== 数组分块 ========== */

/**
 * 数组分块
 * @param arr 数组
 * @param size 每块大小
 * @returns 分块后的二维数组
 * @example
 * chunkArray([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
 */
export function chunkArray<T>(arr: T[], size: number): T[][] {
  if (!Array.isArray(arr) || size <= 0) return [arr];

  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

/* ========== 数组操作 ========== */

/**
 * 数组交集
 * @param arr1 数组1
 * @param arr2 数组2
 * @returns 交集数组
 * @example
 * intersection([1, 2, 3], [2, 3, 4]) // [2, 3]
 */
export function intersection<T>(arr1: T[], arr2: T[]): T[] {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) return [];
  const set2 = new Set(arr2);
  return arr1.filter((item) => set2.has(item));
}

/**
 * 数组并集
 * @param arr1 数组1
 * @param arr2 数组2
 * @returns 并集数组
 * @example
 * union([1, 2, 3], [2, 3, 4]) // [1, 2, 3, 4]
 */
export function union<T>(arr1: T[], arr2: T[]): T[] {
  if (!Array.isArray(arr1)) return arr2 || [];
  if (!Array.isArray(arr2)) return arr1 || [];
  return [...new Set([...arr1, ...arr2])];
}

/**
 * 数组差集
 * @param arr1 数组1
 * @param arr2 数组2
 * @returns 差集数组（arr1 中有但 arr2 中没有的元素）
 * @example
 * difference([1, 2, 3], [2, 3, 4]) // [1]
 */
export function difference<T>(arr1: T[], arr2: T[]): T[] {
  if (!Array.isArray(arr1)) return [];
  if (!Array.isArray(arr2)) return arr1;
  const set2 = new Set(arr2);
  return arr1.filter((item) => !set2.has(item));
}

/**
 * 数组打乱
 * @param arr 数组
 * @returns 打乱后的新数组
 * @example
 * shuffle([1, 2, 3, 4, 5]) // [3, 1, 5, 2, 4]
 */
export function shuffle<T>(arr: T[]): T[] {
  if (!Array.isArray(arr)) return arr;

  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * 数组随机抽取
 * @param arr 数组
 * @param count 抽取数量
 * @returns 抽取的元素数组
 * @example
 * sample([1, 2, 3, 4, 5], 3) // [2, 4, 1]
 */
export function sample<T>(arr: T[], count: number = 1): T[] {
  if (!Array.isArray(arr) || count <= 0) return [];

  const shuffled = shuffle(arr);
  return shuffled.slice(0, Math.min(count, arr.length));
}

/**
 * 扁平化数组
 * @param arr 多维数组
 * @param depth 扁平化深度，默认 Infinity（完全扁平化）
 * @returns 扁平化后的数组
 * @example
 * flatten([1, [2, [3, [4]]]]) // [1, 2, 3, 4]
 * flatten([1, [2, [3, [4]]]], 2) // [1, 2, 3, [4]]
 */
export function flatten<T>(arr: any[], depth: number = Infinity): T[] {
  if (!Array.isArray(arr)) return arr;

  if (depth <= 0) return arr;

  return arr.reduce((result, item) => {
    if (Array.isArray(item)) {
      result.push(...flatten(item, depth - 1));
    } else {
      result.push(item);
    }
    return result;
  }, []);
}

/**
 * 数组分页
 * @param arr 数组
 * @param page 页码（从 1 开始）
 * @param pageSize 每页大小
 * @returns 分页后的数据对象
 * @example
 * paginate([1, 2, 3, 4, 5], 1, 2) 
 * // { data: [1, 2], page: 1, pageSize: 2, total: 5, totalPages: 3 }
 */
export function paginate<T>(
  arr: T[],
  page: number,
  pageSize: number
): {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
} {
  if (!Array.isArray(arr)) {
    return { data: [], page, pageSize, total: 0, totalPages: 0 };
  }

  const total = arr.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const data = arr.slice(start, end);

  return {
    data,
    page,
    pageSize,
    total,
    totalPages,
  };
}

/**
 * 移动数组元素
 * @param arr 数组
 * @param fromIndex 源索引
 * @param toIndex 目标索引
 * @returns 移动后的新数组
 * @example
 * move(['a', 'b', 'c', 'd'], 0, 2) // ['b', 'c', 'a', 'd']
 */
export function move<T>(arr: T[], fromIndex: number, toIndex: number): T[] {
  if (!Array.isArray(arr)) return arr;
  if (fromIndex < 0 || fromIndex >= arr.length) return arr;
  if (toIndex < 0 || toIndex >= arr.length) return arr;

  const result = [...arr];
  const [item] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, item);
  return result;
}

/**
 * 数组计数（统计每个元素出现的次数）
 * @param arr 数组
 * @returns 计数对象
 * @example
 * countBy(['a', 'b', 'a', 'c', 'a', 'b']) 
 * // { a: 3, b: 2, c: 1 }
 */
export function countBy<T extends string | number>(arr: T[]): Record<T, number> {
  if (!Array.isArray(arr)) return {} as Record<T, number>;

  return arr.reduce((result, item) => {
    result[item] = (result[item] || 0) + 1;
    return result;
  }, {} as Record<T, number>);
}
