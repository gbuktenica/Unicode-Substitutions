import * as vscode from 'vscode';

let diagnosticCollection = null;
diagnosticCollection = vscode.languages.createDiagnosticCollection("extensionDisplayName");

// this method is called when vs code is activated
export function activate(context: vscode.ExtensionContext) {
    var lintingRules = require('./LintingRules.json')
    console.log('Unicode Substitutions is activated');
    //
    // Common section
    //
    const findRegExs = [/\u2013/g, /\u2014/g, /\u201C/g, /\u201D/g, /\u2018/g, /\u2019/g];
    const replaceRegExs = ["\u002D", "\u002D", "\u0022", "\u0022", "\u0027", "\u0027"];
    const replaceChars = ["-", "-", '"', '"', '\'', '\''];
    const invalidChars = ["–", "—", '“', '”', '‘', '’'];
    const supportedLanguages = ['*']
    let activeEditor = vscode.window.activeTextEditor;

    //
    // Linting section
    //
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

        // Read linting rules from workspace (settings.json etc)
        let lintingRules = vscode.workspace.getConfiguration().get('unicodesubsitutions.rules');
        console.log(lintingRules)

        const diagnostics = []
        let match, matchIndex, lastMatchIndex;
        const text = activeEditor.document.getText();

        context.subscriptions.push(diagnosticCollection);

        //Loop through each linting rule
        lintingRules.forEach(rule => {
            lastMatchIndex=-1;
            while ((matchIndex = text.indexOf(rule.invalid)) > -1 && matchIndex>lastMatchIndex) {

                //Loop through character match to the current linting rule
                match = text.substring(matchIndex,matchIndex+rule.invalid.length);
                const startPos = activeEditor.document.positionAt(matchIndex);
                const endPos = activeEditor.document.positionAt(matchIndex+rule.invalid.length);
                let range = new vscode.Range(startPos, endPos);
                let message = rule.message;
                let diagnostic = new vscode.Diagnostic(range, message, vscode.DiagnosticSeverity.Warning);
                diagnostic.source = "Unicode Substitutions";
                diagnostics.push(diagnostic);
                lastMatchIndex = text.indexOf(rule.invalid)
            }
        });

        // Push diagnostics to VS Code
        diagnosticCollection.set(activeEditor.document.uri, diagnostics);
    }

    //
    // Formatter section
    //
    vscode.languages.registerDocumentFormattingEditProvider(supportedLanguages, {
        provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
            // Read linting rules from workspace (settings.json etc)
            let lintingRules = vscode.workspace.getConfiguration().get('unicodesubsitutions.rules');
            console.log(lintingRules)

            let arrayText = []
            const text = activeEditor.document.getText();
            let match, matchIndex, lastMatchIndex;

            //Loop through each linting rule
            lintingRules.forEach(rule => {
                lastMatchIndex=-1;

                //Loop through character match to the current linting rule
                while ((matchIndex = text.indexOf(rule.invalid)) > -1 && matchIndex>lastMatchIndex) {
                    // Loop through each regex match.
                    match = text.substring(matchIndex,matchIndex+rule.invalid.length);
                    const startPos = activeEditor.document.positionAt(matchIndex);
                    const endPos = activeEditor.document.positionAt(matchIndex + rule.invalid.length);
                    let range = new vscode.Range(startPos, endPos)
                    arrayText.push(vscode.TextEdit.replace(range, replaceChars[getCharIndex(match)]));
                    lastMatchIndex = text.indexOf(rule.invalid)
                }
            });
            return arrayText
        }
    });

    function getCharIndex(matchedChar){
        var test = lintingRules;
        for(let i in invalidChars)
            if(matchedChar==invalidChars[i])
            return i;
    }
}
