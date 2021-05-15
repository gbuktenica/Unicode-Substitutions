# Unicode Substitutions

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Copyright Glen Buktenica](https://img.shields.io/badge/Copyright-Glen_Buktenica-blue.svg)](http://buktenica.com)
[![Version](https://vsmarketplacebadge.apphb.com/version/glenbuktenica.Unicode-Substitutions.svg)](https://marketplace.visualstudio.com/manage/publishers/glenbuktenica)
[![Downloads](https://vsmarketplacebadge.apphb.com/downloads-short/glenbuktenica.Unicode-Substitutions.svg)](https://marketplace.visualstudio.com/manage/publishers/glenbuktenica)

## Overview

This Visual Studio Code extension will lint common unicode substitutions when code is copied from various sources such web pages and document editors. Some substitutions such as using an En Dash instead of a Hyphen will pass language linting and then fail to execute.

![Animation](/images/Animation.gif)

## Features

Lints the below Unicode substitutions by default:

| Character Name                 | Character | Unicode   | Replace with        | Character | Replace with Unicode |
|--------------------------------|-----------|-----------|---------------------|-----------|----------------------|
| En Dash                        | –         | 2013      | Hyphen              | -         | 002D                 |
| Em Dash                        | —         | 2014      | Hyphen              | -         | 002D                 |
| Horizontal Bar                 | ―         | 2015      | Hyphen              | -         | 002D                 |
| Start Single Quote             | ‘         | 2018      | Single Quote        | '         | 0027                 |
| End Single Quote               | ’         | 2019      | Single Quote        | '         | 0027                 |
| Start Double Quote             | “         | 201C      | Double Quote        | "         | 0022                 |
| End Double Quote               | ”         | 201D      | Double Quote        | "         | 0022                 |
| Low Double Quote               | „         | 201E      | Double Quote        | "         | 0022                 |
| High Double Quote              | ‟         | 201F      | Double Quote        | "         | 0022                 |
| Slightly smiling face          | 🙂        | D83D DE42 | Colon & parentheses | :)        | 003A 0029            |
| Smiling face with smiling eyes | 😊        | D83D DE0A | Colon & parentheses | :)        | 003A 0029            |

Format Document (Alt + Shift + F) is supported for all languages.

### Multiple formatter support

[With the 1.33 release](https://code.visualstudio.com/updates/v1_33#_default-formatter-selection) of Visual Studio Code multiple document formatters are supported. These cannot be run synchronously but must be triggered separately using **Format Document with**.

## Extension Settings

### Custom linting rules

Linting rules can be added in the user and workspace settings.  
[For instructions on how to write your own rules read: Custom Rules](./CustomRules.md)

### Disable Default linting rules

The default linting rules can be disabled so that you can use your own rules only instead of merging the two.

```json
    "unicodesubsitutions.enableDefaultRules": false,
```

### Disable Auto Document Formatting

Auto document formatting can be disabled to prevent automatic changes to your document.

```json
    "unicodesubsitutions.enableFormatting": false
```

## Installation Guide

### Install from the Marketplace

1. Open Extensions (Control + Shift + X)

1. Search for "Unicode-Substitutions"
