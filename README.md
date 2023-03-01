## NHATDUONG REACT PRACTICE - 2

Overview:

- This document is my React - 2 practice estimate.
- This project will restructure practice 1 according to the issues considered, adding react-router for order details and using SWR to fetch data from json-server

Web application for management order details:

- Admin can see a list of the order details.
- Admin can filter order detail follow by location and status.
- Admin can set show entries.
- Admin can search order details follow by name.
- Admin can show detail, delete, and update order item

### DEVELOPMENT TEAM

- Dev - [Nhat Duong](nhat.duong@asnet.com.vn).

### PLAN

- [Plan On Document](https://docs.google.com/document/d/18J_6qGJYc7gZDxXwAenU06EDve_uNOzvmSh3cGJRH2U/edit#).

### INFORMATION:

- Timeline:

  - Estimate time: 3 days.
  - Actual time: . days.

- Editor: Visual Studio Code.
- Responsive: Not support responsive.

### TARGETS

- Refactoring the code according to the list of problems after practice - 1 review.
- Learn about react-router and apply it to the project.
- Learn about SWR and apply it to fetch data from json-server.

### TECHNICAL STACKS AND DEVELOPMENT TOOLS

- React the latest version ( hook, context, reducer, code splitting rendering ).
- [MUI](https://mui.com/).
- [Vite v3.0.0](https://vitejs.dev/guide/#scaffolding-your-first-vite-project).
- [React](https://reactjs.org/docs/introducing-jsx.html).
- [Typescript](https://www.typescriptlang.org/docs/handbook/react.html).
- [Prettier](https://prettier.io/).
- [Eslint](https://eslint.org/).
- [Husky](https://typicode.github.io/husky/#/).
- [SWR](https://swr.vercel.app/docs/getting-started).

### ENVIRONMENT

- Node.js v18.13.0.
- Yarn v1.22.19.
- Pnpm v7.24.3.

### REFERENCES

- [Design on Figma](https://www.figma.com/file/Jb6LgcSuZqxcayLq3L4LRq/react-practice?node-id=0%3A1&t=EmL10SFvGVtX968k-0)

### WORKFLOW

- Create a new project with Vite, React JS, TypeScript, Eslint, Prettier - [github](https://github.com/igdev116/vite-react-ts-eslint-prettier).
- Guideline for management actions and store in provider - [github](https://gist.github.com/ducpham-agilityio/a8a660c65e2e543e07a353151bdf359c).

### SETUP & RUN

- Install Yarn through the [npm package manager](https://www.npmjs.com/), which comes bundled with [Node.js](https://nodejs.org/en/) when you install it on your system.
- Once you have npm installed you can run the following both to install and upgrade Yarn or Pnpm:

```bash
npm install -g yarn
```

or

```bash
npm install -g pnpm
```

- Setup and run project:

```bash
https://gitlab.asoft-python.com/nhat.duong/react-practice.git
cd react-practice
pnpm install
pnpm run build
pnpm run dev
output: http://127.0.0.1:5173/
```
