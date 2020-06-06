# Prodwarn

## Introduction

In A beautiful day, you accidentally test on the production system instead of the dev/test systems when coding. This is a way that the incident is to be.

`Prodwarn` is a browser extension that will warn us when using the production system instead of the dev/test system. It is an open-source software. Therefore, you can contribute for it on Github.

Let feel free to contribute or send us your feedback!

## Features

- [x] Add/Edit/Delete a protected site that should be shown the warning message
- [x] Auto fill current site when adding protected site
- [x] Manage protected sites with Group and Site name
- [x] Search protected sites by name, host
- [] Whitelist warning for page
- [] Multiple strategy for warning:
  - [x] Float Message (default) (added)
  - [] Dialog (WIP)
  - [] Watermark

## Contribute

If you want to contribute for us, please follow this guide:

1. Clone source code from Github:

```bash
git clone git@github.com:kimyvgy/prodwarn.git
```

2. Install Node.js dependencies, we are using Yarn instead of NPM:

```bash
yarn install
```

3. Start dev mode, enjoin :D

Build the source: 3 in 1 (popup, content-script, background-script)

```bash
yarn start
```

Finnaly, turn of developer mode in your browser then load unpacked extension with path to `/prodwarn/dist` folder.

Enjoin! :D
