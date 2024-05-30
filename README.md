# Vite TypeScript Electron

This is a follow-up to my original [Create-React-App TypeScript Electron](https://github.com/Tenchumaru/cra-typescript-electron)
repository and contains much of the same content.  It was created by running `yarn create @quick-start/electron`.  The output is in
[ElectronVite.txt](ElectronVite.txt).  Visit [Electron Vite](https://electron-vite.org/) for more information.

## Prerequisites

There is only one prerequisite, [Node LTS](https://nodejs.org/).  This is to get access to [Yarn](https://yarnpkg.org/), which is
included with recent versions of Node.  To enable it, run `corepack enable` in a terminal window.

## Running

To run the project, run `yarn start` in a terminal window.  Electron Vite will hot-reload both the main and renderer process files
so changing any file under either the `src/main` or `src/renderer` directories will cause the application to refresh.

There is a [solution file](vite-typescript-electron.sln) if you'd like to view the files in Visual Studio 2022 on Windows.

If you'd like to debug the application, follow [these debugging instructions](DEBUG.md).

## Deployment

To build the project for release, run `yarn release`.  This will create both the app and an installer (`.exe` for Windows and `.dmg`
for macOS) in the `dist` directory.  The app is in a subdirectory (`dist\win-unpacked` for Windows and `dist/mac/Vite TypeScript
Electron.app/Contents/MacOS` for macOS).  Build errors are usually the result of updating the project.  Delete the `node_modules`
directory and run `yarn` to recreate it.
