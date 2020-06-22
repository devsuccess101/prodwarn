# Prodwarn

## Introduction

In A beautiful day, you accidentally test on the production system instead of the dev/test systems when coding. This is a way that the incident is to be.

`Prodwarn` is a browser extension that will warn us when using the production system instead of the dev/test system. It is an open-source software. Therefore, you can contribute for it on Github.

Let feel free to contribute or send us your feedback!

## Supported browsers

- [x] Chrome: https://chrome.google.com/webstore/detail/prodwarn-production-warni/dgdfcekakoecdmmccembbgjeanedklic
- [x] Firefox, Firefox Developer, Firefox Nighlightly: https://addons.mozilla.org/en-US/firefox/addon/prodwarn-production-warning/
- [x] Opera Developer, Opera Beta, Opera Next: https://addons.opera.com/en/extensions/details/prodwarn-production-warning
- [ ] Opera Stable: *Pending review*
(you also can install Chrome version for Opera https://chrome.google.com/webstore/detail/prodwarn-production-warni/dgdfcekakoecdmmccembbgjeanedklic - auto update will not able in this case)

## Features

- [x] Add/Edit/Delete a protected site that should be shown the warning message
- [x] Auto fill current site when adding protected site
- [x] Manage protected sites with Group and Site name
- [x] Search protected sites by name, host
- [ ] Whitelist warning for page
- [ ] Multiple strategy for warning:
  - [x] Float Message (default) (added)
  - [ ] Dialog (help wanted)
  - [ ] Container

## Contribute

- Let clone the source code from Github, install NPM dependencies then build with following commands:

```bash
git clone git@github.com:kimyvgy/prodwarn.git

yarn install
yarn start
```

- Turn on developer mode in your browser then load unpacked extension with path to `/prodwarn/dist` folder.
- Enjoin! :laughing:
