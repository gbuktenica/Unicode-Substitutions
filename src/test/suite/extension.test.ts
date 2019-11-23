import * as assert from 'assert';
import { after } from 'mocha';
import * as vscode from 'vscode';
//import * as extension from '../../extension';
//https://github.com/microsoft/azure-pipelines-vscode/blob/master/src/test/extension.test.ts

const extensionId = "glenbuktenica.Unicode-Substitutions";

suite('Extension Setup Tests', function () {
    this.timeout(20000);

    test("Extension is active", async () => {
        // Arrange and Act
        await sleep(2000);
        const started = vscode.extensions.getExtension(extensionId).isActive;

        // Assert
        assert.equal(started, true);
    });
});

suite('Linting Tests', function () {
    this.timeout(20000);

    test('Given an empty yaml document, there should be no validation errors', async () => {
        // Arrange
        const emptyFiles: vscode.Uri[] = await vscode.workspace.findFiles('emptyFile.yml');
        const emptyFile: vscode.Uri = emptyFiles[0];

        // Act
        const emptyDocument: vscode.TextDocument = await vscode.workspace.openTextDocument(emptyFile);
        await vscode.window.showTextDocument(emptyDocument);
        await sleep(3000); // Give it time to show the validation errors, if any
        const diagnostics: vscode.Diagnostic[] = vscode.languages.getDiagnostics(emptyFile);

        // Assert
        assert.equal(emptyDocument.languageId, 'yaml');
        assert.equal(diagnostics.length, 0);
    });
    test('Given a bad markdown document, there should be validation errors', async () => {
        // Arrange
        const emptyFiles: vscode.Uri[] = await vscode.workspace.findFiles('badMarkdown.md');
        const emptyFile: vscode.Uri = emptyFiles[0];

        // Act
        const emptyDocument: vscode.TextDocument = await vscode.workspace.openTextDocument(emptyFile);
        await vscode.window.showTextDocument(emptyDocument);
        await sleep(3000); // Give it time to show the validation errors, if any
        const diagnostics: vscode.Diagnostic[] = vscode.languages.getDiagnostics(emptyFile);

        // Assert
        assert.equal(emptyDocument.languageId, 'markdown');
        assert.equal(diagnostics.length, 11);
    });
    test('Given a bad PowerShell document, there should be validation errors', async () => {
        // Arrange
        const emptyFiles: vscode.Uri[] = await vscode.workspace.findFiles('badPowerShell.ps1');
        const emptyFile: vscode.Uri = emptyFiles[0];

        // Act
        const emptyDocument: vscode.TextDocument = await vscode.workspace.openTextDocument(emptyFile);
        await vscode.window.showTextDocument(emptyDocument);
        await sleep(3000); // Give it time to show the validation errors, if any
        const diagnostics: vscode.Diagnostic[] = vscode.languages.getDiagnostics(emptyFile);

        // Assert
        assert.equal(emptyDocument.languageId, 'powershell');
        assert.equal(diagnostics.length, 9);
    });
});

suite('Formatting Tests', function () {
});

async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}