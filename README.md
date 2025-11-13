# GraphQL React Client (practice project)

This repository is a small practice project that demonstrates how to build a React + TypeScript client using Apollo Client to talk to a GraphQL server. It was created as a learning exercise and includes a minimal to-do example showing queries and mutations.

## What this project contains

- A Vite + React + TypeScript frontend
- Apollo Client setup in `src/lib/apollo.ts` (default endpoint: `http://localhost:4000/graphql`)
- A small todo example in `src/services/todoService.ts` which defines GraphQL operations and a `useTodos` hook
- Types in `src/types/todo.ts` and a simple `TodoList` component under `src/components/todos/`

This project is intended as a client-side example only. A GraphQL server is not included — you should run (or point to) a compatible GraphQL server separately.

## Quick start

Prerequisites:

- Node.js (v16 or newer recommended)
- npm (or yarn/pnpm, adjust commands accordingly)

1. Install dependencies

```shell
npm install
```

2. Start a local GraphQL server

This repo expects a GraphQL endpoint at `http://localhost:4000/graphql` by default. You can:

- Run your own server (for example, a simple Apollo Server or GraphQL Yoga instance)
- Use the example schema that the frontend expects (a `todos` query and `addTodo`, `toggleTodo`, `deleteTodo` mutations). The queries and mutations used by the client are in `src/services/todoService.ts`.

3. Run the dev server

```shell
npm run dev
```

The app will open on the port reported by Vite (usually `http://localhost:5173`). If your GraphQL server runs on a different URL, update the URI in `src/lib/apollo.ts`.

Build for production

```shell
npm run build
npm run preview
```

Linting

```shell
npm run lint
```

## Scripts (from package.json)

- `dev` — start the Vite dev server
- `build` — compile TypeScript and build a production bundle with Vite
- `preview` — preview the production build locally
- `lint` — run ESLint

## Key dependencies

This project uses the following notable dependencies (exact versions are in `package.json`):

- `react`, `react-dom` — UI library
- `@apollo/client` — Apollo Client for GraphQL queries/mutations
- `graphql` — GraphQL core library
- `vite` — dev server and build tool
- `typescript` — static types

Dev / linting helpers include ESLint and type definitions for React and Node.

## Code layout (important files)

- `src/lib/apollo.ts` — Apollo Client instance and GraphQL endpoint
- `src/services/todoService.ts` — GraphQL queries/mutations and `useTodos` hook used by components
- `src/types/todo.ts` — TypeScript `Todo` type
- `src/components/todos/TodoList.tsx` — example UI (and `TodoList.css`)
- `index.html`, `src/main.tsx`, `App.tsx` — app entry and root component

## How to point to a different GraphQL server

Open `src/lib/apollo.ts` and change the `uri` property on the `HttpLink` to your server's GraphQL endpoint.

Example:

```ts
// src/lib/apollo.ts
new HttpLink({
  uri: process.env.VITE_GRAPHQL_URL ?? "http://localhost:4000/graphql",
});
```

You can also wire an environment variable to Vite by creating a `.env` file with `VITE_GRAPHQL_URL` and restart the dev server.

## Notes / next steps

- The project is intentionally minimal to keep focus on the GraphQL client patterns. Possible improvements:
  - Add tests around the `useTodos` hook (React Testing Library + msw)
  - Add environment-based configuration for the GraphQL URL
  - Add CI linting and type checks

If you'd like, I can add a small example GraphQL server (Node + Apollo Server) in a sibling folder to make the project runnable end-to-end.

## License

This is a small practice project. Use or adapt the code as you like.
