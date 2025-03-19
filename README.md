# 大额资金管理系统

## 项目简介

基于 React + TypeScript + Ant Design 开发的企业级资金管理系统，提供资金流向监控、风险评估、审批流程等功能。

## 技术栈

- React 18
- TypeScript 5.x
- Ant Design 5.x
- Redux Toolkit
- Axios
- Vite

## 开发环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0
- Git

## 快速开始

1. 克隆项目
```bash
git clone [项目地址]
```

2. 安装依赖
```bash
cd risk-management-system
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

4. 构建生产版本
```bash
npm run build
```

## 项目文档

详细文档请查看 [docs](./docs) 目录：

- [架构设计](./docs/architecture.md)
- [开发环境搭建](./docs/development.md)
- [技术栈说明](./docs/tech-stack.md)
- [代码规范](./docs/code-style.md)

## 目录结构

```
src/
├── assets/          # 静态资源
├── components/      # 共享组件
├── hooks/          # 自定义Hooks
├── pages/          # 页面组件
├── services/       # API服务
├── store/          # 状态管理
├── types/          # 类型定义
├── utils/          # 工具函数
└── constants/      # 常量定义
```

## 开发规范

- 遵循 TypeScript 严格模式
- 使用 ESLint + Prettier 进行代码规范
- 遵循 Git Flow 工作流
- 使用 Conventional Commits 规范

## 贡献指南

1. Fork 本仓库
2. 创建特性分支
3. 提交变更
4. 推送到分支
5. 创建 Pull Request

## 许可证

[MIT](LICENSE)
