# VOEZ Engine

Made for [Sonolus](https://sonolus.com/) using [sonolus.js-template-ts-eslint-prettier](https://github.com/Sonolus/sonolus.js-template-ts-eslint-prettier)

## Custom Resources

### Skin Sprites

| Name                           |
| ------------------------------ |
| `VOEZ Track Line Top`          |
| `VOEZ Track Line Bottom`       |
| `VOEZ Track Border Top`        |
| `VOEZ Track Border Bottom`     |
| `VOEZ Track Active Sides`      |
| `VOEZ Track Active Top`        |
| `VOEZ Track Foreground`        |
| `VOEZ Swipe`                   |
| `VOEZ Track Top Red`           |
| `VOEZ Track Top Yellow`        |
| `VOEZ Track Top Gray`          |
| `VOEZ Track Top Green`         |
| `VOEZ Track Top Orange`        |
| `VOEZ Track Top Violet`        |
| `VOEZ Track Top Blue`          |
| `VOEZ Track Top Cyan`          |
| `VOEZ Track Top Purple`        |
| `VOEZ Track Bottom Red`        |
| `VOEZ Track Bottom Yellow`     |
| `VOEZ Track Bottom Gray`       |
| `VOEZ Track Bottom Light Blue` |
| `VOEZ Track Bottom Green`      |
| `VOEZ Track Bottom Orange`     |
| `VOEZ Track Bottom Violet`     |
| `VOEZ Track Bottom Blue`       |
| `VOEZ Track Bottom Cyan`       |
| `VOEZ Track Bottom Purple`     |
| `VOEZ Track Glow Red`          |
| `VOEZ Track Glow Yellow`       |
| `VOEZ Track Glow Gray`         |
| `VOEZ Track Glow Light Blue`   |
| `VOEZ Track Glow Green`        |
| `VOEZ Track Glow Orange`       |
| `VOEZ Track Glow Violet`       |
| `VOEZ Track Glow Blue`         |
| `VOEZ Track Glow Cyan`         |
| `VOEZ Track Glow Purple`       |

### Particle Effects

| Name                |
| ------------------- |
| `VOEZ Perfect`      |
| `VOEZ Great`        |
| `VOEZ Good`         |
| `VOEZ Perfect Hold` |
| `VOEZ Great Hold`   |
| `VOEZ Good Hold`    |

## Prerequisites

-   [Node.js](https://nodejs.org) (16+)

## Recommended Setup

-   [Visual Studio Code](https://code.visualstudio.com)
-   [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## Get Started

-   Get any `track_easy.json`, `track_hard.json` or `track_extra.json` and place it on `src/level/track.json`
-   Get any `note_easy.json`, `note_hard.json` or `note_extra.json` and place it on `src/level/note.json`
-   Optionally place `song_full.ogg` in `src/level/bgm.ogg`

To install dependencies, run in project directory:

```
npm i
```

## Start Dev Server

Run in project directory:

```
npm run dev
```

A dev server will be up and running. You can connect to it using Sonolus app and play test the level.

Changes made to the project will be automatically detected and trigger rebuild.

Temporary files and extraction artifacts can be found in `.dev`.

## Type Check

Run in project directory:

```
npm run type-check
```

## Lint

Run in project directory:

```
npm run lint
```

## Fix Linting Issues

Run in project directory:

```
npm run lint-fix
```

## Build

Run in project directory:

```
npm run build
```

Build artifacts can be found in `dist`.
