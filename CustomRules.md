# Custom Linting Rules

TODO





The example shows how to add two linting rules to a settings.json file:

```json
    "unicodesubsitutions.rules": [
        {
            "invalid": "\\u058A",
            "valid": "\\u002D",
            "message": "Armenian hyphen should be a hyphen."
        },
        {
            "invalid": "\\u05BE",
            "valid": "\\u002D",
            "message": "Hebrew punctuation maqaf should be a hyphen."
        }
    ]
```

**Invalid** is the character the is be searched for by the linter in the format of a unicode escape sequence.  
**Valid** is the character that will replace the invalid character during document formatting or a code action.  
**Message** is the text that will appear in the problems window.

Note: The extension [Unicode code point of current character](https://marketplace.visualstudio.com/items?itemName=zeithaste.cursorCharCode) will help identify the unicode value.