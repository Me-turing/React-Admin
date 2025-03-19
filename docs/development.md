# 开发环境搭建指南

## 1. 环境要求

### 1.1 必需环境
- Node.js >= 16.0.0
- npm >= 8.0.0
- Git

### 1.2 推荐工具
- VS Code
- Chrome DevTools
- Redux DevTools
- Git 客户端

## 2. 开发工具配置

### 2.1 VS Code 配置
推荐安装以下插件：
- ESLint
- Prettier
- TypeScript and JavaScript Language Features
- GitLens
- Error Lens
- Path Intellisense

### 2.2 VS Code 设置
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

## 3. 项目设置

### 3.1 克隆项目
```bash
git clone [项目地址]
cd risk-management-system
```

### 3.2 安装依赖
```bash
npm install
```

### 3.3 环境变量配置
1. 复制环境变量模板
```bash
cp .env.example .env.development
```

2. 修改环境变量
```
VITE_APP_TITLE=大额资金管理系统
VITE_APP_API_BASE_URL=http://localhost:3000/api
VITE_APP_UPLOAD_URL=http://localhost:3000/upload
VITE_APP_PUBLIC_PATH=/
VITE_APP_ENV=development
```

## 4. 开发命令

### 4.1 开发服务器
```bash
npm run dev
```

### 4.2 代码检查
```bash
npm run lint        # ESLint 检查
npm run lint:fix    # ESLint 自动修复
npm run format      # Prettier 格式化
```

### 4.3 构建命令
```bash
npm run build            # 生产环境构建
npm run build:analyze    # 构建并分析包大小
```

### 4.4 测试命令
```bash
npm run test       # 运行单元测试
npm run test:e2e   # 运行端到端测试
```

## 5. 开发流程

### 5.1 分支管理
- main: 主分支，用于生产环境
- develop: 开发分支，用于开发环境
- feature/*: 特性分支，用于开发新功能
- hotfix/*: 修复分支，用于修复生产环境bug

### 5.2 提交规范
```bash
# 提交示例
git commit -m "feat: 添加用户管理功能"
git commit -m "fix: 修复登录验证问题"
```

提交类型：
- feat: 新功能
- fix: 修复bug
- docs: 文档更新
- style: 代码格式（不影响代码运行的变动）
- refactor: 重构
- test: 测试相关
- chore: 构建过程或辅助工具的变动

### 5.3 代码审查
1. 创建 Pull Request
2. 等待代码审查
3. 解决评审意见
4. 合并代码

## 6. 调试技巧

### 6.1 开发工具
- 使用 Chrome DevTools 的 React Developer Tools
- 使用 Redux DevTools 调试状态
- 使用 VS Code Debugger 调试代码

### 6.2 日志级别
```typescript
if (process.env.NODE_ENV === 'development') {
  console.log('开发环境日志');
}
```

### 6.3 性能分析
- 使用 React Profiler 分析组件性能
- 使用 Chrome Performance 面板分析运行时性能
- 使用 webpack-bundle-analyzer 分析构建产物

## 7. 常见问题

### 7.1 环境相关
- 确保 Node.js 版本正确
- 清理 node_modules 并重新安装
- 检查环境变量配置

### 7.2 构建相关
- 清理构建缓存
- 检查依赖版本
- 查看构建日志

### 7.3 开发相关
- ESLint 规则冲突
- TypeScript 类型错误
- 路由配置问题
- 状态管理问题 