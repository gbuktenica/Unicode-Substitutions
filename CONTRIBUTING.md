# Contributing to Unicode-Substitutions

## Where to report bugs

[Submit an issue](https://github.com/gbuktenica/Unicode-Substitutions/issues/new) on the GitHub repository.

## Where to submit feature requests

[Submit an issue](https://github.com/gbuktenica/Unicode-Substitutions/issues/new) for feature requests.

## Contributing

The following is how to technically develop and contribute to the extension.

### Prerequisites

Install the following prerequisites:

[Visual Studio Code](https://code.visualstudio.com/)

NodeJS

```Command
choco install nodejs.install
```

Visual Studio Code Extensions

```Command
npm install -g vsce
```

### Clone

Clone this repository

### Package

```Command
npm install
vsce package
```

### Debug

Start the Visual Studio Code debugger.

### Update

NPM packages frequently require updates

```command
npm audit fix
```

### Publish

Push the updated extension to the marketplace. This must be done by the organisation owner.

```Command
vsce publish <TOKEN>
```
