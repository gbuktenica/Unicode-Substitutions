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
        const testFiles: vscode.Uri[] = await vscode.workspace.findFiles('testFile.yml');
        const testFile: vscode.Uri = testFiles[0];

        // Act
        const testDocument: vscode.TextDocument = await vscode.workspace.openTextDocument(testFile);
        await vscode.window.showTextDocument(testDocument);
        await sleep(3000); // Give it time to show the validation errors, if any
        const diagnostics: vscode.Diagnostic[] = vscode.languages.getDiagnostics(testFile);

        // Assert
        assert.equal(testDocument.languageId, 'yaml');
        assert.equal(diagnostics.length, 0);
    });
    test('Given a bad markdown document, there should be validation errors', async () => {
        // Arrange
        const testFiles: vscode.Uri[] = await vscode.workspace.findFiles('badMarkdown.md');
        const testFile: vscode.Uri = testFiles[0];

        // Act
        const testDocument: vscode.TextDocument = await vscode.workspace.openTextDocument(testFile);
        await vscode.window.showTextDocument(testDocument);
        await sleep(3000); // Give it time to show the validation errors, if any
        const diagnostics: vscode.Diagnostic[] = vscode.languages.getDiagnostics(testFile);

        // Assert
        assert.equal(testDocument.languageId, 'markdown');
        assert.equal(diagnostics.length, 11);
    });
    test('Given a bad PowerShell document, there should be validation errors', async () => {
        // Arrange
        const testFiles: vscode.Uri[] = await vscode.workspace.findFiles('badPowerShell.ps1');
        const testFile: vscode.Uri = testFiles[0];

        // Act
        const testDocument: vscode.TextDocument = await vscode.workspace.openTextDocument(testFile);
        await vscode.window.showTextDocument(testDocument);
        await sleep(3000); // Give it time to show the validation errors, if any
        const diagnostics: vscode.Diagnostic[] = vscode.languages.getDiagnostics(testFile);

        // Assert
        assert.equal(testDocument.languageId, 'powershell');
        assert.equal(diagnostics.length, 9);
    });
});

suite('Formatting Tests', function () {
});

async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}