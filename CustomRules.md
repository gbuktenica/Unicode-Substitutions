# Custom Linting Rules

## How it works

This extension uses regex to find the characters undesired characters and a regex to replace.
The following example is a linting rule that would be added to a settings.json file:

```json
    "unicodesubsitutions.rules": [
        {
            "invalid": "\\u058A",
            "valid": "\\u002D",
            "message": "Armenian hyphen should be a hyphen."
        }
    ]
```

**Invalid** is the character the is be searched for by the linter.  
**Valid** is the character that will replace the invalid character during document formatting or a code action.  
**Message** is the text that will appear in the problems window and code action tool tip.

## How to create a rule

### Find the Unicode UTF-16 values

Firstly you will need the UTF-16 values for the character that you want to find and the UTF-16 value for the character you want to replace it with.

1. Install the extension [Unicode code point of current character](https://marketplace.visualstudio.com/items?itemName=zeithaste.cursorCharCode)

1. Type or copy the good and bad characters into Visual Studio code.

1. Replace characters to \uFFFF form using the above extension.

    ```plaintext
    Press: Control + Shift + P
    Type:  CursorCharCode: Replace character to \uFFFF form
    Press: Enter
    ```

![Animation](/images/AnimationRules.gif)

### Create the Json

You will now have a pair of strings in the format \uXXXX
One for the "Bad" or invalid character and one for the "Good" or valid character.
Insert them into the JSON below remembering to escape the backslash.

```json
    "unicodesubsitutions.rules": [
        {
            "invalid": "[INSERT_INVALID_uFFFF]",
            "valid": "[INSERT_VALID_uFFFF]",
            "message": "[INSERT_RULE_DESCRIPTION_HERE]"
        }
    ]
```

The following example is based on the above animation:

```json
    "unicodesubsitutions.rules": [
        {
            "invalid": "\\ud83d\\ude42",
            "valid": "\\u003a\\u0029",
            "message": "Smiling face should be a Colon and Bracket."
        },
        {
            "invalid": "\\u2012",
            "valid": "\\u002D",
            "message": "Figure Dash should be a hyphen."
        }
    ]
```

Note the double back slashes.
Note the smiling face is a double UTF-16.

### Add it to your settings.json

1. Open Settings.json

    ```plaintext
    Press: Control + Shift + P
    Type:  Preferences: Open Settings (JSON)
    ```

1. Paste in the rules
