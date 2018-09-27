import * as vscode from 'vscode';
import * as lintingRules from './LintingRules.json'

let diagnosticCollection = null;
diagnosticCollection = vscode.languages.createDiagnosticCollection("extensionDisplayName");

// this method is called when vs code is activated
export function activate(context: vscode.ExtensionContext) {

    console.log('Unicode Substitutions is activated');

    // Regex rules to detect unicode characters.
    const findRegExs = [/\u2013/g, /\u2014/g, /\u201C/g, /\u201D/g, /\u2018/g, /\u2019/g];
    const replaceRegExs = ["\u002D", "\u002D", "\u0022", "\u0022", "\u0027", "\u0027"];
    const replaceChars = ["-", "-", '"', '"', '\'', '\''];
    const supportedLanguages = ['PowerShell', 'markdown']
    //
    // Linting section
    //
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

        const diagnostics = []
        let match;
        const text = activeEditor.document.getText();

        context.subscriptions.push(diagnosticCollection);

        let loopDiagnostic = 0
        findRegExs.forEach(regEx => {
            while (match = regEx.exec(text)) {
                // Loop through each regex match and push diagnostics to array.
                const startPos = activeEditor.document.positionAt(match.index);
                const endPos = activeEditor.document.positionAt(match.index + match[0].length);
                let range = new vscode.Range(startPos, endPos)
                let diagnostic = new vscode.Diagnostic(range, 'Suspicious unicode character found', vscode.DiagnosticSeverity.Warning);
                diagnostic.source = "Unicode Substitutions";
                diagnostics.push(diagnostic);
            }
            loopDiagnostic++;
        });
        // Push diagnostics to VS Code
        diagnosticCollection.set(activeEditor.document.uri, diagnostics);
    }
    //
    // Formatter section
    //

    vscode.languages.registerDocumentFormattingEditProvider(supportedLanguages, {
        provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
            let arrayText = []
            let match;
            const text = activeEditor.document.getText();
            let loopFormatter = 0;
            findRegExs.forEach(regEx => {
                while (match = regEx.exec(text)) {
                    // Loop through each regex match.
                    const startPos = activeEditor.document.positionAt(match.index);
                    const endPos = activeEditor.document.positionAt(match.index + match[0].length);
                    let range = new vscode.Range(startPos, endPos)
                    arrayText = [vscode.TextEdit.replace(range, replaceChars[loopFormatter])];
                }
                loopFormatter ++;
            });
            return arrayText
        }
    });
}
