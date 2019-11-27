// Integration tests for Unicode-Substitutions.

import * as assert from 'assert';
import * as vscode from 'vscode';

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
    test('Given a bad unsaved document, there should be validation errors', async () => {
        // Arrange
        const unsavedFile = vscode.Uri.parse('untitled:unsavedFile');

        // Act
        const unsavedDocument: vscode.TextDocument = await vscode.workspace.openTextDocument(unsavedFile);
        await vscode.window.showTextDocument(unsavedDocument).then(editor => {
            editor.edit(edit => {
                edit.insert(new vscode.Position(0, 0), "Em Dash —");
            });
        });
        await sleep(3000); // Give it time to show the validation errors, if any
        const diagnostics: vscode.Diagnostic[] = vscode.languages.getDiagnostics(unsavedFile);

        // Assert
        assert.equal(unsavedDocument.languageId, 'plaintext');
        assert.equal(diagnostics.length, 1);
    });
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
        const markdownFiles: vscode.Uri[] = await vscode.workspace.findFiles('badMarkdown.md');
        const markdownFile: vscode.Uri = markdownFiles[0];

        // Act
        const markdownDocument: vscode.TextDocument = await vscode.workspace.openTextDocument(markdownFile);
        await vscode.window.showTextDocument(markdownDocument);
        await sleep(3000); // Give it time to show the validation errors, if any
        const diagnostics: vscode.Diagnostic[] = vscode.languages.getDiagnostics(markdownFile);

        // Assert
        assert.equal(markdownDocument.languageId, 'markdown');
        assert.equal(diagnostics.length, 11);
    });
    test('Given a bad PowerShell document, there should be validation errors', async () => {
        // Arrange
        const powershellFiles: vscode.Uri[] = await vscode.workspace.findFiles('badPowerShell.ps1');
        const powershellFile: vscode.Uri = powershellFiles[0];

        // Act
        const powershellDocument: vscode.TextDocument = await vscode.workspace.openTextDocument(powershellFile);
        await vscode.window.showTextDocument(powershellDocument);
        await sleep(3000); // Give it time to show the validation errors, if any
        const diagnostics: vscode.Diagnostic[] = vscode.languages.getDiagnostics(powershellFile);

        // Assert
        assert.equal(powershellDocument.languageId, 'powershell');
        assert.equal(diagnostics.length, 10);
    });

});

suite('Formatting Tests', function () {
    this.timeout(20000);
    test('Given a bad Markdown document, after formatting there should be no validation errors', async () => {
        // Arrange
        const markdownFiles: vscode.Uri[] = await vscode.workspace.findFiles('badMarkdown.md');
        const markdownFile: vscode.Uri = markdownFiles[0];

        // Act
        const markdownDocument: vscode.TextDocument = await vscode.workspace.openTextDocument(markdownFile);
        await vscode.window.showTextDocument(markdownDocument);
        await vscode.commands.executeCommand('editor.action.formatDocument');
        await sleep(3000); // Give it time to show the validation errors, if any
        const diagnostics: vscode.Diagnostic[] = vscode.languages.getDiagnostics(markdownFile);

        // Assert
        assert.equal(markdownDocument.languageId, 'markdown');
        assert.equal(diagnostics.length, 0);
    });
    test('Given a bad PowerShell document, after formatting there should be no validation errors', async () => {
        // Arrange
        const powershellFiles: vscode.Uri[] = await vscode.workspace.findFiles('badPowerShell.ps1');
        const powershellFile: vscode.Uri = powershellFiles[0];

        // Act
        const powershellDocument: vscode.TextDocument = await vscode.workspace.openTextDocument(powershellFile);
        await vscode.window.showTextDocument(powershellDocument);
        await vscode.commands.executeCommand('editor.action.formatDocument');
        await sleep(3000); // Give it time to show the validation errors, if any
        const diagnostics: vscode.Diagnostic[] = vscode.languages.getDiagnostics(powershellFile);

        // Assert
        assert.equal(powershellDocument.languageId, 'powershell');
        assert.equal(diagnostics.length, 0);
    });
});
async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
