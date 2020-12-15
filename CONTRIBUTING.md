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

```bash
choco install vscode.install
```

[NodeJS](https://nodejs.org/en/)

```bash
choco install nodejs.install
```

[Visual Studio Code Extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)

```bash
npm install -g vsce
```

[NPM Check Updates](https://www.npmjs.com/package/npm-check-updates) for updating the package.json

```bash
npm install -g npm-check-updates
```

### Clone

Clone this repository

### Debug

```bash
npm run compile
npm run unittest
npm run test
```

### Update

NPM packages frequently require updates

```bash
npm upgrade
npm audit fix
```

To upgrade all dev dependencies to latest and update the package.json

```bash
npm-check-updates -u
```

### Package

```bash
npm install
vsce package
```

### Publish

Push the updated extension to the marketplace. This must be done by the organisation owner.

Tokens can be created [here](https://dev.azure.com/GlenBuktenica/_usersSettings/tokens)

```bash
vsce publish <TOKEN>
```

Manually if required

<http://marketplace.visualstudio.com/manage/publishers/glenbuktenica>
