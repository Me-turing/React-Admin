/**
 * 本地存储工具函数
 */

const PREFIX = 'risk_ms_';

/**
 * 存储数据到localStorage
 * @param key 键名
 * @param value 值
 */
export const setLocalStorage = (key: string, value: unknown): void => {
  try {
    const prefixedKey = PREFIX + key;
    const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
    localStorage.setItem(prefixedKey, stringValue);
  } catch (error) {
    console.error('存储数据失败', error);
  }
};

/**
 * 从localStorage获取数据
 * @param key 键名
 * @param defaultValue 默认值
 */
export const getLocalStorage = <T>(key: string, defaultValue?: T): T | undefined => {
  try {
    const prefixedKey = PREFIX + key;
    const value = localStorage.getItem(prefixedKey);
    
    if (value === null) {
      return defaultValue;
    }
    
    try {
      return JSON.parse(value) as T;
    } catch {
      return value as unknown as T;
    }
  } catch (error) {
    console.error('获取数据失败', error);
    return defaultValue;
  }
};

/**
 * 从localStorage移除数据
 * @param key 键名
 */
export const removeLocalStorage = (key: string): void => {
  try {
    const prefixedKey = PREFIX + key;
    localStorage.removeItem(prefixedKey);
  } catch (error) {
    console.error('移除数据失败', error);
  }
};

/**
 * 清除所有以指定前缀开头的localStorage数据
 */
export const clearLocalStorage = (): void => {
  try {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error('清除数据失败', error);
  }
}; 