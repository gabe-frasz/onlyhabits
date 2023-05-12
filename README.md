<div align="center">

# OnlyHabits

[![My Github](https://img.shields.io/badge/Gabe%20Frasz-onlyhabits-gold?style=flat-square)](https://github.com/gabe-frasz)
[![GitHub license](https://img.shields.io/github/license/gabe-frasz/onlyhabits?style=flat-square)](https://github.com/gabe-frasz/onlyhabits/blob/main/LICENSE)
[![Github issues](https://img.shields.io/github/issues/gabe-frasz/onlyhabits?color=red&style=flat-square)](https://github.com/gabe-frasz/onlyhabits/issues)
[![Github commit](https://img.shields.io/github/last-commit/gabe-frasz/onlyhabits?color=blue&style=flat-square)](https://github.com/gabe-frasz/onlyhabits/commits/main)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)

</div>

<br />

> Live demo [here](https://onlyhabits.vercel.app).

## Table of Contents

- [General Info](#pushpin-general-information)
- [Technologies used](#hammer-technologies-i-used)
- [Features](#sparkles-features)
- [What is next?](#eye-curious-to-see-whats-coming-next)
- [Screenshots](#camera-screenshots)
- [Setup](#rocket-running-this-project)
- [Contributing](#brain-thinking-of-contributing-to-the-project)
- [Project Status](#heavy_check_mark-project-status)
- [Acknowledgement](#white_heart-acknowledgement)
- [License & Contact](#memo-license--contact)

## :pushpin: General Information

Provide general information about your project here.

- What problem does it (intend to) solve?
- What is the purpose of your project?
- Why did you undertake it?

> For more information about my dev journey, consider visiting my [LinkedIn](https://linkedin.com/in/gabriel-vs-frasao).

## :hammer: Technologies I used

<details>
<summary>
Core tools
</summary>

- [Node.js](https://nodejs.org/en)
- [Fastify](https://fastify.io)
- [Next.js](https://nextjs.org)
- [TypeScript](https://www.typescriptlang.org)

</details>

<details>
<summary>
Styling
</summary>

- [Tailwind](https://tailwindcss.com/)
- [C6R](https://github.com/gabe-frasz/c6r)

</details>

<details>
<summary>
Linters and Formatters
</summary>

- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [EditorConfig](https://editorconfig.org/)

</details>

<details>
<summary>
Testing
</summary>

- [Vitest](https://vitest.dev/)

</details>

## :sparkles: Features

- [x] Create habits and keep track of your progress
- [x] Authentication

### :eye: Curious to see what is coming next?

[Stay tuned right here](https://github.com/users/gabe-frasz/projects/04)

## :camera: Screenshots

<!-- <img alt="" src="" /> -->

## :rocket: Running this project

This repository is a monorepo and is built with [Turborepo](https://turbo.build/repo).

`/apps` and `/packages` folders are workspaces.

**Clone on your machine** (I personally use GitHub CLI)

```bash
# by GitHub CLI
gh repo clone gabe-frasz/onlyhabits
# or by git
git clone https://github.com/gabe-frasz/onlyhabits.git
```

**Set every thing up**

```bash
# enter the project folder
cd onlyhabits
# install dependencies
pnpm install
# run on development mode
pnpm run dev
```

> obs: dev script uses the turbo cli, which starts all the workspaces at once. If you want to run a single workspace, make sure to use the `--filter` flag.

### :brain: Thinking of contributing to the project?

Clone the repo as shown above :arrow_up: and feel free to open an issue or a pull request.

## :heavy_check_mark: Project Status

Project is complete

| Status | Project |
| ------ | ------- |
| ![Github deployments](https://img.shields.io/github/deployments/gabe-frasz/onlyhabits/production?label=vercel&logo=vercel&logoColor=white) | [web app](https://onlyhabits.vercel.app) |
| ![Railway deployment](https://img.shields.io/badge/railway-prod-green?logo=railway) | [server](onlyhabits-production.up.railway.app) |

## :white_heart: Acknowledgement

- **_OnlyHabits_** was based and inspired on [this one](https://github.com/rocketseat-education/nlw-setup-ignite)
- Many thanks to [Rocketseat](https://github.com/Rocketseat)

## :memo: License & Contact

[MIT License](https://github.com/gabe-frasz/onlyhabits/blob/main/LICENSE) &copy; Gabriel VS Frasão

Feel free to get in touch with me on my [Gmail](mailto:gabrielvitor.frasao@gmail.com), [Instagram](https://instagram/gabe_frasz) or [LinkedIn](https://linkedin.com/in/gabriel-vs-frasao).
