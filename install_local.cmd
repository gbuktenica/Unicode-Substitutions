# Prerequisites
choco install nodejs.install
npm install vsce

# Package
npm install
vsce package
code --install-extension unicode-substitutions-2.0.0.vsix

# Update
npm audit fix