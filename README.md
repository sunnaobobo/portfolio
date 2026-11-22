# 孙靖 · 个人网站与技术博客

基于 **Next.js App Router**、**TypeScript**、**Tailwind CSS**、**Framer Motion**、**MDX** 与 **Prisma** 构建的个人网站，使用 Turborepo 与 pnpm 管理工作区。

- 在线访问：[https://portfolio.sunnao.wtf](https://portfolio.sunnao.wtf)
- GitHub：[https://github.com/florianjsun](https://github.com/florianjsun)

## 本地运行与构建

要求使用 Node.js 24+ 与 pnpm 12+，在仓库根目录执行：

```bash
# 1. 配置环境变量（用于文章阅读量与互动统计）
cp ./apps/enji.dev/.env.example ./apps/enji.dev/.env.local

# 2. 安装依赖
pnpm install

# 3. 启动本地开发服务（默认 http://localhost:3000）
pnpm dev
```

生产构建与代码检查：

```bash
pnpm lint
pnpm typecheck
pnpm build
```
