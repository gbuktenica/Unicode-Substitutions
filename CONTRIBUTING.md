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

```plaintext
choco install nodejs.install
```

Visual Studio Code Extensions

```plaintext
npm install -g vsce
```

### Clone

Clone this repository

### Debug

```plaintext
npm run compile
npm run unittest
npm run test
```

### Update

NPM packages frequently require updates

```plaintext
npm audit fix
```

### Package

```plaintext
npm install
vsce package
```

### Publish

Push the updated extension to the marketplace. This must be done by the organisation owner.

```plaintext
vsce publish <TOKEN>
```

Manually if required

<http://marketplace.visualstudio.com/manage/publishers/glenbuktenica>
