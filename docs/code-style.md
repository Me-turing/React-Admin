# 代码规范文档

## 1. 命名规范

### 1.1 文件命名
- 组件文件：使用 PascalCase
  ```
  UserProfile.tsx
  LoginForm.tsx
  ```
- 工具文件：使用 camelCase
  ```
  request.ts
  formatDate.ts
  ```
- 样式文件：与组件同名
  ```
  UserProfile.module.css
  LoginForm.less
  ```

### 1.2 变量命名
- 使用有意义的描述性名称
- 布尔值以 is/has/should 开头
- 常量使用大写下划线
```typescript
// 好的命名
const userName = 'John';
const isLoading = true;
const hasPermission = false;
const MAX_COUNT = 10;

// 避免的命名
const u = 'John';
const flag = true;
const check = false;
```

### 1.3 函数命名
- 使用动词开头
- 清晰表达功能
- 回调函数使用 handle 前缀
```typescript
// 好的命名
function getUserInfo() {}
function validateInput() {}
function handleClick() {}
function handleSubmit() {}

// 避免的命名
function data() {}
function process() {}
```

## 2. TypeScript 规范

### 2.1 类型定义
- 使用 interface 而不是 type（除非必要）
- 接口名以 I 开头
- 明确的类型声明
```typescript
// 好的实践
interface IUser {
  id: number;
  name: string;
  age: number;
}

// 避免的实践
type User = {
  id: any;
  name: any;
  age: any;
}
```

### 2.2 泛型使用
- 有意义的泛型参数名
- 适当的约束
```typescript
// 好的实践
function getFirst<T>(arr: T[]): T | undefined {
  return arr[0];
}

// 带约束的泛型
interface IWithId {
  id: number;
}

function findById<T extends IWithId>(items: T[], id: number): T | undefined {
  return items.find(item => item.id === id);
}
```

## 3. React 规范

### 3.1 组件定义
- 使用函数组件和 Hooks
- 明确的 Props 类型定义
- 组件职责单一
```typescript
interface IButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button: React.FC<IButtonProps> = ({
  text,
  onClick,
  disabled = false
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
```

### 3.2 Hooks 使用
- 遵循 Hooks 规则
- 自定义 Hook 以 use 开头
- 合理的依赖项
```typescript
// 好的实践
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};
```

## 4. 样式规范

### 4.1 CSS 命名
- 使用 BEM 命名规范
- 模块化 CSS
```css
/* 好的实践 */
.user-card {}
.user-card__title {}
.user-card__content {}
.user-card--active {}

/* 避免的实践 */
.card {}
.title {}
.active {}
```

### 4.2 样式组织
- 按组件划分样式文件
- 使用 CSS Modules 或 styled-components
- 避免全局样式
```typescript
// 好的实践
import styles from './UserCard.module.css';

const UserCard = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>用户信息</h2>
    </div>
  );
};
```

## 5. 注释规范

### 5.1 代码注释
- 组件注释
```typescript
/**
 * 用户信息卡片组件
 * @param {IUser} user - 用户信息
 * @param {boolean} [editable=false] - 是否可编辑
 * @returns {React.ReactElement}
 */
```

- 函数注释
```typescript
/**
 * 格式化日期
 * @param {Date} date - 待格式化的日期
 * @param {string} [format='YYYY-MM-DD'] - 格式化模板
 * @returns {string} 格式化后的日期字符串
 */
```

### 5.2 文件注释
```typescript
/**
 * @file UserService.ts
 * @description 用户相关服务
 * @author 张三
 * @createDate 2024-03-19
 */
```

## 6. Git 提交规范

### 6.1 提交信息
```bash
# 格式
<type>(<scope>): <subject>

# 示例
feat(user): 添加用户管理功能
fix(auth): 修复登录验证问题
```

### 6.2 分支命名
```bash
feature/user-management
bugfix/login-validation
hotfix/security-issue
```

## 7. 项目结构规范

### 7.1 目录组织
```
src/
├── components/      # 组件
│   ├── common/     # 通用组件
│   └── business/   # 业务组件
├── hooks/          # 自定义Hooks
├── utils/          # 工具函数
├── services/       # API服务
├── types/          # 类型定义
└── pages/          # 页面组件
```

### 7.2 导入顺序
```typescript
// 1. React 相关
import React, { useState, useEffect } from 'react';

// 2. 第三方库
import { message } from 'antd';
import axios from 'axios';

// 3. 自定义组件
import { UserCard } from '@/components';

// 4. 工具函数和常量
import { formatDate } from '@/utils';
import { API_URL } from '@/constants';

// 5. 类型定义
import type { IUser } from '@/types';

// 6. 样式文件
import styles from './index.module.css';
``` 