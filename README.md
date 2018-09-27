# Unicode Substitutions

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Copyright Glen Buktenica](https://img.shields.io/badge/Copyright-Glen_Buktenica-blue.svg)](http://buktenica.com)

## Overview

This Visual Studio Code extension will lint common unicode substitutions when code is copied from various sources such web pages and document editors. Some substitutions such as using an En Dash instead of a Hyphen will pass language linting and then fail to execute.

![Animation](/images/Animation.gif)

## Features

Lints the below Unicode:

| Character Name     | Character | Unicode | Replace with | Character | Replace with Unicode |
| ------------------ | --------- | ------- | ------------ | --------- | -------------------- |
| En Dash            | –         | \\u2013 | Hyphen       | -         | \\u002D              |
| Em Dash            | —         | \\u2014 | Hyphen       | -         | \\u002D              |
| Start Double Quote | “         | \\u201C | Double Quote | "         | \\u0022              |
| End Double Quote   | ”         | \\u201D | Double Quote | "         | \\u0022              |
| Start Single Quote | ‘         | \\u2018 | Single Quote | '         | \\u0027              |
| End Single Quote   | ’         | \\u2019 | Single Quote | '         | \\u0027              |

Format Document (Alt + Shift + F) is supported for all languages.

## Requirements

Visual Studio code 1.27 or higher.

## Extension Settings

N/A

## Release Notes

This is the first release.

## Installation Guide

### Install from the Market Place

1. Open Extensions (Control + Shift + X)

1. Search for "Unicode-Substitutions"

### Manually Install

1. In a command window open the extension folder.

    ```plaintext
    cd %userprofile%\.vscode\extensions
    ```

1. Clone this repository.

    ```plaintext
    git clone <REPO>
    ```

1. Open the subfolder Unicode-Substitutions.

1. Install the dependencies

    ```plaintext
    npm install
    ```

1. Compile the dependencies.

    ```plaintext
    npm run compile
    ```

1. Restart Visual Studio code if it was open.