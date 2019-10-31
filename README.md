# Unicode Substitutions

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Copyright Glen Buktenica](https://img.shields.io/badge/Copyright-Glen_Buktenica-blue.svg)](http://buktenica.com)

## Overview

This Visual Studio Code extension will lint common unicode substitutions when code is copied from various sources such web pages and document editors. Some substitutions such as using an En Dash instead of a Hyphen will pass language linting and then fail to execute.

![Animation](/images/Animation.gif)

## Features

Lints the below Unicode by default:

| Character Name     | Character | Unicode | Replace with | Character | Replace with Unicode |
| ------------------ | --------- | ------- | ------------ | --------- | -------------------- |
| En Dash            | –         | 2013    | Hyphen       | -         | 002D                 |
| Em Dash            | —         | 2014    | Hyphen       | -         | 002D                 |
| Horizontal Bar     | ―         | 2015    | Hyphen       | -         | 002D                 |
| Start Double Quote | “         | 201C    | Double Quote | "         | 0022                 |
| End Double Quote   | ”         | 201D    | Double Quote | "         | 0022                 |
| Start Single Quote | ‘         | 2018    | Single Quote | '         | 0027                 |
| End Single Quote   | ’         | 2019    | Single Quote | '         | 0027                 |

Format Document (Alt + Shift + F) is supported for all languages.

## Extension Settings

### Custom linting rules

Linting rules can be added in the user and workspace settings.  
The example shows how to add two linting rules to a settings.json file:

```json
    "unicodesubsitutions.rules": [
        {
            "invalid": "   058A",
            "valid": "   002D",
            "message": "Armenian hyphen should be a hyphen."
        },
        {
            "invalid": "   05BE",
            "valid": "   002D",
            "message": "Hebrew punctuation maqaf should be a hyphen."
        }
    ]
```

**Invalid** is the character the is be searched for by the linter in the format of a unicode escape sequence.  
**Valid** is the character that will replace the invalid character during document formatting or a code action.  
**Message** is the text that will appear in the problems window.

Note: The extension [Unicode code point of current character](https://marketplace.visualstudio.com/items?itemName=zeithaste.cursorCharCode) will help identify the unicode value.

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
