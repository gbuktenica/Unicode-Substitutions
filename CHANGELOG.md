# Change Log

All notable changes to the "unicode-substitutions" extension will be documented in this file.

## Release

- 2.3.2

Run a vsce "Package" as a part of the test pipeline.

- 2.3.1

Fix [lodash - Command Injection via the template function](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-23337)

Update all dev dependencies to latest.

Add pre-commit hooks for master / main.

Migrated pipeline to Github Actions

- 2.3.0

Update all dev dependencies to latest.

 @types/glob            ^7.1.1  →     ^7.1.3
 @types/mocha           ^5.2.7  →     ^8.2.0
 @types/node         ^12.12.34  →  ^14.14.13
 @types/vscode         ^1.43.0  →    ^1.52.0
 diff                  >=4.0.1  →    >=5.0.0
 mocha                  ^6.2.3  →     ^8.2.1
 source-map-support    ^0.5.12  →    ^0.5.19
 tar                   >=5.0.5  →    >=6.0.5
 typescript             ^3.8.3  →     ^4.1.3
 vscode-test            ^1.2.3  →     ^1.4.1

Remove incomplete unit tests from master branch.

Updated developer documentation.

- 2.2.8

Fix [lodash - Prototype Pollution](https://snyk.io/test/npm/lodash/4.17.15?tab=issues).

- 2.2.7

Align engine and types for vscode.

- 2.2.6

Fix [CVE-2020-7598](https://nvd.nist.gov/vuln/detail/CVE-2020-7598).

- 2.2.5

Stable Release.
Removed regression that prevented unsaved files being linted.
Added detailed instructions for writing custom rules.

- 2.2.4

Stable Release.
Additional default rules for emoticons.
Note: Regex for Unicode higher than FFFF need to be surrogate pairs.

- 2.2.3

Stable Release.
Additional default rules for high and low double quotes.
Tests for multi formatter support.

- 2.2.2

Stable Release.
Refactoring to move code out of activate.

- 2.2.1

Stable Release.  
Feature Request 4, add default rule for Horizontal Bar.
<https://github.com/gbuktenica/Unicode-Substitutions/issues/4>

- 2.2.0

Stable Release.  
Format Selection feature added.

- 2.1.2

Stable Release.  
Bug fix WS-2018-0590.

- 2.1.1

Stable Release.  
Bug fixes WS-2019-0100 and [CVE-2018-20834](https://nvd.nist.gov/vuln/detail/CVE-2018-20834).

- 2.1.0

Stable Release.  
Bug fix [CVE-2018-16491](https://nvd.nist.gov/vuln/detail/CVE-2018-16491)
Prevision for Format Library.

- 2.0.0

Stable Release.  
Added code actions so that individual violations can be fixed.

- 1.4.1

Stable Release.  
Added issues link to package.json

- 1.4.0

Stable Release.  
Added options to disable default rules and formatting.

- 1.3.1

Stable Release.  
Breaking change in README custom rule example.

- 1.3.0

Stable Release.  
Separated default rules from custom rules.  
Custom rules now correctly listed as an array of objects.  
Updated README with an example of two custom rules.

- 1.2.1

Stable Release.  
Fixed minor regression in linting.

- 1.2.0

Stable Release.  
Moved Rules to Package.json  
All rules in \uNNNN format to prevent extension linting itself.

- 1.0.0

Stable Release.  
Added Document formatting for all languages.  
Added package icon.

## [Unreleased]

- 0.0.2

Development release  
Converted highlighting to diagnostics (Linting).

- 0.0.1

Development release  
Contains very basic working code.
