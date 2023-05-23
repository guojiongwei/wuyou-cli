# 学习搭建cli脚手架

## 安装

### 全局安装
```bash
npm install -g wuyou-cli
```
# or yarn
```bash
yarn global add wuyou-cli
```

### 使用
创建模版
```bash
wuyou-cli create <name> [-t|--template]
```
示例
```bash
wuyou-cli create hello-cli -t dumi2-demo
```

### 不全局安装，借助npx
创建模版
```bash
npx wuyou-cli create <name> [-t|--template]
```
示例
```bash
npx wuyou-cli create hello-cli -template dumi2-demo
```