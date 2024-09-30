# Next.js 14+ Social Sphere

This document provides an overview of the system, detailing technical requirements and business requirements for big practice.

## Timeline

- . working days

## Features

This app includes:

- ⚡ [Next.js](https://nextjs.org/) with App Router support
- 🔥 Type checking [TypeScript](https://www.typescriptlang.org/)
- 💎 Integrate with [Tailwind CSS](https://tailwindcss.com/)
- [tailwind-merge](https://github.com/dcastil/tailwind-merge) for efficiently merge Tailwind CSS classes without style conflicts
- ✅ Strict Mode for TypeScript and React 18
- 📏 Linter with [ESLint](https://eslint.org/)
- 💖 Code Formatter with [Prettier](https://prettier.io/)
- 🦊 [Husky](https://github.com/typicode/husky) for Git Hooks
- 🚫 [Lint-staged](https://github.com/lint-staged/lint-staged) for running linters on Git staged files
- 🦺 Unit Testing with Jest and React Testing Library
- ☂️ Code coverage with [V8](https://v8.dev/blog/javascript-code-coverage)
- 🎉 Storybook for UI development

### Technical Stack

- Next [14.2.5]
- React [^18]
- Node [v20.17.0]
- Pnpm [9.7.1]
- Typescript [^5]
- Storybook
- TailwindCss [^3.4.1]
- [shadcn/ui](https://ui.shadcn.com/)
- NextAuth
- Strapi

## How to run

### Prerequisites

Make sure you install packages with correct version below:

- [node v20.17.0](https://nodejs.org/en/download/package-manager)
- [pnpm 9.7.1](https://pnpm.io/installation)

- **Note:**
  - Please add `.env` into backend and frontend folder of project source code, refer `.env.sample`.

Check and update config image hosting on `next.config.mjs` file follow [Next.js document](https://nextjs.org/docs/messages/next-image-unconfigured-host)

### Get source code

| Command                                                                       | Action                      |
| :---------------------------------------------------------------------------- | :-------------------------- |
| `$ git clone https://gitlab.asoft-python.com/nhat.duong/react-training.git`   | Clone Repository with HTTPS |
| `$ git clone git@gitlab.asoft-python.com:nhat.duong/react-training.git`       | Clone Repository with SSH   |
| `$ git checkout social-sphere`                                            | Checkout into "social-sphere" branch  |

### Build and Run app

| Command            | Action                                     | Port                  |
| :----------------- | :----------------------------------------- | :-------------------- |
| `$ pnpm setup`   | Install packages dependencies              | N/A                   |
| `$ pnpm dev`       | Run the app in development mode            | `http://localhost:3000` & `http://localhost:1337/api` |

### Build and Run frontend app

```shell
cd ../frontend/
```

| Command            | Action                                     | Port                  |
| :----------------- | :----------------------------------------- | :-------------------- |
| `$ pnpm install`   | Install packages dependencies              | N/A                   |
| `$ pnpm build`     | Build app with optimized production mode   | N/A                   |
| `$ pnpm start`     | Starts the application in production mode. | `http://localhost:3000` |
| `$ pnpm dev`       | Run the app in development mode            | `http://localhost:3000` |
| `$ pnpm storybook` | Run Storybook.                             | `http://localhost:6006` |
| `$ pnpm test`      | Run Unit Test                              | N/A                   |
| `$ pnpm coverage`  | Generate code coverage                     | N/A                   |

### Build and Run backend app

```shell
cd ../backend/
```

| Command            | Action                                     | Port                  |
| :----------------- | :----------------------------------------- | :-------------------- |
| `$ pnpm install`   | Install packages dependencies              | N/A                   |
| `$ pnpm build`     | Build Strapi admin panel.                  | N/A                   |
| `$ pnpm deploy`    | Deploy Strapi project.                     | N/A                   |
| `$ pnpm develop`   | Start Strapi in watch mode. (Changes in Strapi project files will trigger a server restart)            | `http://localhost:1337` |
| `$ pnpm start`     | Start Strapi without watch mode.           | N/A                   |
| `$ pnpm strapi`    | Display all available commands.            | N/A                   |

### Project structure

- GitHub: [alan2207/bulletproof-react/blob](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md)

```shell
.
|
+-- app               # application layer containing:
|   |                 # this folder might differ based on the meta framework used
|   +-- routes        # application routes / can also be pages
|   +-- app.tsx       # main application component
|   +-- provider.tsx  # application provider that wraps the entire application with different global providers - this might also differ based on meta framework used
|   +-- router.tsx    # application router configuration
+-- assets            # assets folder can contain all the static files such as images, fonts, etc.
|
+-- components        # shared components used across the entire application
|
+-- config            # global configurations, exported env variables etc.
|
+-- features          # feature based modules
|
+-- hooks             # shared hooks used across the entire application
|
+-- lib               # reusable libraries preconfigured for the application
|
+-- stores            # global state stores
|
+-- test              # test utilities and mocks
|
+-- types             # shared types used across the application
|
+-- utils             # shared utility functions
```

### A feature could have the following structure

```shell
features/awesome-feature
|
+-- api         # exported API request declarations and api hooks related to a specific feature
|
+-- assets      # assets folder can contain all the static files for a specific feature
|
+-- components  # components scoped to a specific feature
|
+-- hooks       # hooks scoped to a specific feature
|
+-- stores      # state stores for a specific feature
|
+-- types       # typescript types used within the feature
|
+-- utils       # utility functions for a specific feature
```

## Maintainers

### Team size

- 1 Developer: [Nhat Duong Cong](mailto:nhat.duong@asnet.com.vn)

- GitLab: [@nhat.duong](https://gitlab.asoft-python.com/nhat.duong)

- Slack: nhat.duong

### Task Management

- [GitLab issue board](https://gitlab.asoft-python.com/nhat.duong/react-training/-/boards/1242)

### Responsibilities

- Reviewing and merging pull requests.
- Managing and responding to issues.
- Updating project documentation.
- Ensuring the project is up-to-date with the latest standards and practices.

### Availability

Nhat is typically available during weekdays and aims to respond to issues and pull requests within 48 hours. For urgent matters, please email directly.
