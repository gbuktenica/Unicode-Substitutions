# Unicode Substitutions

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Copyright Glen Buktenica](https://img.shields.io/badge/Copyright-Glen_Buktenica-blue.svg)](http://buktenica.com)

## Overview

This Visual Studio Code extension will detect and highlight common unicode substitutions when code is copied from various sources such web pages and document editors.  

![Animation](/images/Animation.gif)

## Features

Highlights the below Unicode:

| Character Name     | Character | Unicode | Replace with | Character | Replace with Unicode |
| ------------------ | --------- | ------- | ------------ | --------- | -------------------- |
| En Dash            | –         | \\u2013 | Hyphen       | -         | \\u002D              |
| Em Dash            | —         | \\u2014 | Hyphen       | -         | \\u002D              |
| Start Double Quote | “         | \\u201C | Double Quote | "         | \\u0022              |
| End Double Quote   | ”         | \\u201D | Double Quote | "         | \\u0022              |
| Start Single Quote | ‘         | \\u2018 | Single Quote | '         | \\u0027              |
| End Single Quote   | ’         | \\u2019 | Single Quote | '         | \\u0027              |

Auto replacement will be release in a future version.

## Requirements

Visual Studio code 1.27 or higher.

## Extension Settings

N/A

## Known Issues

This is extension is still under initial development and has not been released.

## Release Notes

This is extension is still under initial development and has not been released.

## Installation Guide

This extension is not currently published in the Visual Studio Code market place. To install manually:

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