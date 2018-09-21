import * as vscode from 'vscode';

// this method is called when vs code is activated
export function activate(context: vscode.ExtensionContext) {

    console.log('Unicode Substitutions is activated');

    // Trigger linting
    let activeEditor = vscode.window.activeTextEditor;
    if (activeEditor) {
        triggerupdateLinting();
    }

    vscode.window.onDidChangeActiveTextEditor(editor => {
        activeEditor = editor;
        if (editor) {
            triggerupdateLinting();
        }
    }, null, context.subscriptions);

    vscode.workspace.onDidChangeTextDocument(event => {
        if (activeEditor && event.document === activeEditor.document) {
            triggerupdateLinting();
        }
    }, null, context.subscriptions);

    var timeout = null;
    function triggerupdateLinting() {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(updateLinting, 500);
    }

    function updateLinting() {
        if (!activeEditor) {
            return;
        }
        let diagnosticCollection = null;
        const diagnostics = []
        let match;
        const text = activeEditor.document.getText();

        diagnosticCollection = vscode.languages.createDiagnosticCollection("extensionDisplayName");
        context.subscriptions.push(diagnosticCollection);

        // Regex rules to detect unicode characters.
        const regEx = /\u2013|\u2014|\u201C|\u201D|\u2018|\u2019/g;

        while (match = regEx.exec(text)) {
            // Loop through each regex match and push diagnostics to array.
            const startPos = activeEditor.document.positionAt(match.index);
            const endPos = activeEditor.document.positionAt(match.index + match[0].length);
            let range = new vscode.Range(startPos, endPos)
            let diagnostic = new vscode.Diagnostic(range, 'Suspicious unicode character found', vscode.DiagnosticSeverity.Warning);
            diagnostic.source = "Unicode Substitutions";
            diagnostics.push(diagnostic);
        }
        // Push diagnostics to VS Code
        diagnosticCollection.set(activeEditor.document.uri, diagnostics);
    }
}