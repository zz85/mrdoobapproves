MrDoob Approves?
==============

This is a browser-based tool to check, validate, formatter, lint javascript code.

Initially created for [Mr.doob's Code Style™](https://github.com/mrdoob/three.js/wiki/Mr.doob's-Code-Style%E2%84%A2), it can now support multiple code styles.

It has evolved from a [modified jscs](https://github.com/gero3/node-jscs/tree/formatter) of jscs by gero3 (for auto-fixing) before the official [node-jscs](https://github.com/jscs-dev/node-jscs).
It is now powered by eslint and [code-mirror](https://github.com/codemirror/codemirror).

[![Build Status](https://travis-ci.org/zz85/mrdoobapproves.svg?branch=gh-pages)](https://travis-ci.org/zz85/mrdoobapproves)


## [Run the editor here](http://zz85.github.io/mrdoobapproves/)
### [Old editor (JSCS)](http://zz85.github.io/mrdoobapproves/jscs.html)

![](https://cloud.githubusercontent.com/assets/314997/5714636/c6db41b2-9b06-11e4-8d25-05142c37a479.png)

## For ESLint Users

```
npm install --save-dev eslint-config-mdcs
```

Add this to `.eslintrc`.

```
{
  "extends": "mdcs"
}
```

## About

This tool helps to check if your code is in Mr.doob's Code Style™ and can help you auto-format it. This is useful if you are making a pull-request to mrdoob's javascript projects like [three.js](https://github.com/mrdoob/three.js). More about this in this [blog post](http://www.lab4games.net/zz85/blog/2015/01/25/mrdoob-approves-a-javascript-codestyle-editor-validator-formatter-project/)

## Releases

### 5.0 - 26 Apr 2020
- Update ESLint to version 6/7
- Update ES configuration to ES2020 (includes async syntax)
- Remove legacy JSCS support

### 4.0 - 15 Nov 2016
- Powered by ESLint
- ES6 code support!
- Updated Linting rules
- Slight interface tweaks
- Some cleanup

~~### Planned features for version 3~~
- Minimalistic linting engine
- JSCS Rule Editing
- JSCS library 2 (supporting ES6 with babel)

### 2.0 - 1 Dec 2015
- JSCS library with Autofix (v1.13.1, last official version without Babel)
- Updated MDCS rules - space checks
- Ability to chose other JSCS presets (crockford, google, jquery, wikimedia etc)
- Simpler Autofix Button

### 1.0 - 12 Jan 2015
- Mr.doob's Code Style™ validator
- Check as you type
- Gutter hinting
- JS syntax highlighting using code mirror
- Auto-formatting with diff editor
- Jump to error
- Trailing spaces hinting
- Open file

## Development

This project uses some of these philosophy

- TDDD style - [TODO Driven Development](http://www.secretgeek.net/TODO_driv_dev).
- Open open-source model - Significant contributors gets commit access to github repo
- Release early, release often - main branch is gh-pages

## Instructions for this project's workflow

You need npm, git, webpack to be able to create a compressed bundle.
Clean install:

```sh
npm run install
```

will install webpack with `npm install -g webpack` and run `npm install` to update dependencies.

use `webpack -p` or `npm run bundle` to create bundles for release.

use `webpack --watch` or `npm run watch` if you are testing bundles locally.

## Disclaimer

p.s. This project, its name or code was neither approved or endorsed by mrdoob.
