/**
 * 图表相关工具函数
 */

/**
 * 判断是否为普通对象（非数组、非 null、非函数）
 */
function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Object.prototype.toString.call(value) === '[object Object]';
}

/**
 * 深度合并图表配置
 * 用于将用户自定义配置与默认配置进行深度合并
 *
 * @param target 默认配置（基础配置）
 * @param source 用户配置（覆盖配置）
 * @returns 合并后的配置
 *
 * @example
 * const defaultOptions = {
 *   plugins: { legend: { display: true, position: 'bottom' } },
 *   scales: { y: { beginAtZero: true } }
 * };
 * const userOptions = {
 *   plugins: { legend: { position: 'top' } },
 *   scales: { y: { max: 100 } }
 * };
 * const merged = mergeChartOptions(defaultOptions, userOptions);
 * // 结果:
 * // {
 * //   plugins: { legend: { display: true, position: 'top' } },
 * //   scales: { y: { beginAtZero: true, max: 100 } }
 * // }
 */
export function mergeChartOptions<T extends Record<string, any>>(
  target: T,
  source: Partial<T> | undefined | null
): T {
  // 如果 source 为空，直接返回 target 的浅拷贝
  if (!source) {
    return { ...target };
  }

  const result: Record<string, any> = { ...target };

  for (const key of Object.keys(source)) {
    const sourceValue = source[key];
    const targetValue = target[key];

    // 如果 source 值为 undefined，跳过（保留 target 值）
    if (sourceValue === undefined) {
      continue;
    }

    // 如果 source 值为 null，直接使用 null（允许显式覆盖为 null）
    if (sourceValue === null) {
      result[key] = null;
      continue;
    }

    // 如果两者都是普通对象，递归合并
    if (isPlainObject(targetValue) && isPlainObject(sourceValue)) {
      result[key] = mergeChartOptions(targetValue, sourceValue);
    } else {
      // 否则直接使用 source 值（包括数组、函数、基本类型）
      result[key] = sourceValue;
    }
  }

  return result as T;
}
