import { ref, Ref, watch } from 'vue';
// 1. 用户登录/切换组织
//    ↓
// 2. user.ts 的 mutations 更新权限
//    ↓
// 3. 同步更新 pagePermissionIds.value
//    ↓
// 4. storageSync 监听到变化 → 写入 localStorage
//    ↓
// 5. localStorage 变化触发 storage 事件
//    ↓
// 6. 其他标签页/项目监听到 storage 事件
//    ↓
// 7. storageSync 自动更新本地 ref
//    ↓
// 8. qcptInit 内部的 watch 监听到变化
//    ↓
// 9. 组件权限实时更新
/**
 * 创建一个与 localStorage 同步的响应式 ref
 * 支持跨标签页同步（通过 storage 事件）
 *
 * @param key - localStorage 的 key
 * @param initialValue - 初始值
 * @param serializer - 序列化函数（将值转为字符串存储）
 * @param deserializer - 反序列化函数（从字符串读取值）
 * @returns 响应式 ref
 */
export function useLocalStorageSync<T>(key: string, initialValue: T, serializer: (value: T) => string = (v) => JSON.stringify(v), deserializer: (value: string) => T = (v) => JSON.parse(v)): Ref<T> {
  const fullKey = key;

  // 从 localStorage 读取初始值
  const getStorageValue = (): T => {
    try {
      const item = localStorage.getItem(fullKey);
      const value = item ? deserializer(item) : initialValue;
      console.log(`[storageSync] 初始化 ${fullKey}:`, value);
      return value;
    } catch (error) {
      console.warn(`[storageSync] Failed to read ${fullKey}:`, error);
      return initialValue;
    }
  };

  // 创建响应式 ref
  const data = ref<T>(getStorageValue()) as Ref<T>;

  // 监听 ref 的变化，同步到 localStorage
  watch(
    data,
    (newValue, oldValue) => {
      try {
        console.log(`[storageSync] ${fullKey} 更新:`, {
          oldValue,
          newValue,
          timestamp: new Date().toISOString(),
        });
        localStorage.setItem(fullKey, serializer(newValue));
        console.log(`[storageSync] ${fullKey} 已写入 localStorage`);
      } catch (error) {
        console.error(`[storageSync] Failed to write ${fullKey}:`, error);
      }
    },
    { deep: true }
  );

  // 监听 storage 事件（跨标签页/窗口同步）
  const handleStorageChange = (e: StorageEvent) => {
    if (e.key === fullKey && e.newValue !== null) {
      try {
        const newValue = deserializer(e.newValue);
        console.log(`[storageSync] 监听到 storage 事件 ${fullKey}:`, {
          oldValue: e.oldValue,
          newValue: e.newValue,
          url: e.url,
          timestamp: new Date().toISOString(),
        });
        // 只在值真正改变时更新，避免触发不必要的 watch
        if (JSON.stringify(data.value) !== JSON.stringify(newValue)) {
          console.log(`[storageSync] ${fullKey} 从其他标签页同步更新:`, newValue);
          data.value = newValue;
        } else {
          console.log(`[storageSync] ${fullKey} 值未改变，跳过更新`);
        }
      } catch (error) {
        console.warn(`[storageSync] Failed to parse storage event for ${fullKey}:`, error);
      }
    } else if (e.key === fullKey && e.newValue === null) {
      // localStorage 被清空
      console.log(`[storageSync] ${fullKey} 被清空，重置为初始值`);
      data.value = initialValue;
    }
  };

  // 添加事件监听器
  window.addEventListener('storage', handleStorageChange);

  // 返回 ref（调用者需要自行处理 removeEventListener，或在应用卸载时自动清理）
  return data;
}

/**
 * 权限 ID 的序列化器：数组 -> 逗号分隔的字符串
 */
const permissionSerializer = (value: string[]): string => {
  return value.join(',');
};

/**
 * 权限 ID 的反序列化器：逗号分隔的字符串 -> 数组
 */
const permissionDeserializer = (value: string): string[] => {
  return value ? value.split(',').filter(Boolean) : [];
};

/**
 * 创建与 localStorage 同步的页面权限 ID ref
 */
export function usePagePermissionSync(key: string): Ref<string[]> {
  return useLocalStorageSync<string[]>(key, [], permissionSerializer, permissionDeserializer);
}

/**
 * 创建与 localStorage 同步的页面操作权限 ID ref
 */
export function usePageActionPermissionSync(key: string): Ref<string[]> {
  return useLocalStorageSync<string[]>(key, [], permissionSerializer, permissionDeserializer);
}