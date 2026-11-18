# Repository Guidelines

## Project Structure & Module Organization

This pnpm and Turborepo workspace contains the Next.js portfolio, blog, and project showcase in `apps/enji.dev`.

- `apps/enji.dev/src/app/` contains App Router pages, layouts, and API handlers. Blog posts live at `src/app/(main)/blog/<slug>/page.mdx` within the app.
- `apps/enji.dev/src/components/`, `src/hooks/`, and `src/styles/` hold shared UI, React hooks, and Tailwind CSS. Static images and icons live in `apps/enji.dev/public/assets/`.
- `packages/remark-plugins/` and `packages/rehype-plugins/` handle MDX processing. The other packages share ESLint and TypeScript configuration. The PostgreSQL schema lives at `apps/enji.dev/prisma/schema.prisma`.

## Build, Test, and Development Commands

Use Node.js 24 or later and pnpm 12.21.0. Run these commands from the repository root.

- `pnpm install` installs workspace dependencies.
- `pnpm dev` starts Next.js and watches the MDX plugin packages. Open `http://localhost:3000`.
- `pnpm build` builds the app and its workspace dependencies for production.
- `pnpm lint` runs ESLint. `pnpm typecheck` checks TypeScript without emitting files.
- `pnpm format` applies Prettier across the workspace.

For database-backed features, copy `apps/enji.dev/.env.example` to `apps/enji.dev/.env.local`, set `DATABASE_URL` and `SALT_IP_ADDRESS`, and keep both values private. Export `DATABASE_URL` in your shell before running `pnpm --filter enji.dev db:migrate` against your development database.

## Coding Style & Naming Conventions

Use two-space indentation and single quotes in TypeScript. Prettier sorts Tailwind classes, and ESLint checks import ordering. Use PascalCase for component files such as `TableOfContents.tsx`, `use`-prefixed camelCase for hooks, and kebab-case for route slugs. Use `@/` for imports from the app’s `src/` directory.

## Testing Guidelines

The workspace has no automated test suite or coverage threshold. Run lint, type checks, and a production build before opening a PR. Smoke-test the affected routes locally, including MDX rendering or database-backed interactions when relevant.

## Commit & Pull Request Guidelines

Follow the short, imperative commit subjects used in history, such as `docs(blog): add the-2023-retrospective` or `chore: update pnpm`. In the PR, summarize the change, list the checks you ran, link any related issue, and include screenshots for visible changes.
