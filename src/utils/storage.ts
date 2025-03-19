/**
 * 本地存储工具类
 */

// 本地存储前缀，用于区分不同项目
const STORAGE_PREFIX = 'risk_management_';

/**
 * 获取完整的存储键名
 * @param key 键名
 * @returns 带前缀的完整键名
 */
const getKey = (key: string): string => {
  return `${STORAGE_PREFIX}${key}`;
};

/**
 * 存储数据到localStorage
 * @param key 键名
 * @param value 值
 */
export const setLocalStorage = <T>(key: string, value: T): void => {
  try {
    const storageKey = getKey(key);
    const storageValue = JSON.stringify(value);
    localStorage.setItem(storageKey, storageValue);
  } catch (error) {
    console.error('存储数据失败:', error);
  }
};

/**
 * 从localStorage获取数据
 * @param key 键名
 * @param defaultValue 默认值，当获取失败时返回
 * @returns 存储的数据或默认值
 */
export const getLocalStorage = <T>(key: string, defaultValue?: T): T | undefined => {
  try {
    const storageKey = getKey(key);
    const storageValue = localStorage.getItem(storageKey);
    if (storageValue) {
      return JSON.parse(storageValue) as T;
    }
  } catch (error) {
    console.error('获取数据失败:', error);
  }
  return defaultValue;
};

/**
 * 从localStorage移除数据
 * @param key 键名
 */
export const removeLocalStorage = (key: string): void => {
  try {
    const storageKey = getKey(key);
    localStorage.removeItem(storageKey);
  } catch (error) {
    console.error('移除数据失败:', error);
  }
};

/**
 * 清除所有localStorage数据
 */
export const clearLocalStorage = (): void => {
  try {
    // 只清除当前项目的存储数据
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(STORAGE_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error('清除数据失败:', error);
  }
};

/**
 * 存储标签页数据
 * @param tabs 标签页数据
 */
export const saveTabsToStorage = <T>(tabs: T[]): void => {
  setLocalStorage('tabs', tabs);
};

/**
 * 获取存储的标签页数据
 * @returns 标签页数据
 */
export const getTabsFromStorage = <T>(): T[] | undefined => {
  return getLocalStorage<T[]>('tabs');
}; 