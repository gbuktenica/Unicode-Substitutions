import * as vscode from 'vscode';
import * as defaultRulesJson from "./defaultRules.json"
let diagnosticCollection = null;
diagnosticCollection = vscode.languages.createDiagnosticCollection("extensionDisplayName");

// this method is called when vs code is activated
export function activate(context: vscode.ExtensionContext) {
    //
    // Common section
    //
    console.log('Unicode Substitutions is activated');

    //Common definitions
    let activeEditor = vscode.window.activeTextEditor;

    // Read from configuration from workspace (Package.json, Settings.json etc) and default rule json.
    let supportedLanguages = vscode.workspace.getConfiguration().get('unicodesubsitutions.enabledLanguageIds')
    let enableDefaultRules = vscode.workspace.getConfiguration().get('unicodesubsitutions.enableDefaultRules')
    let enableFormatting = vscode.workspace.getConfiguration().get('unicodesubsitutions.enableFormatting')
    let lintingRules: Array<any> = [];
    lintingRules = vscode.workspace.getConfiguration().get('unicodesubsitutions.rules');
    if (enableDefaultRules){
        lintingRules = lintingRules.concat(defaultRulesJson.defaultRules);
    }
    console.log(supportedLanguages)
    console.log(enableDefaultRules)
    console.log(enableFormatting)
    console.log(lintingRules)

    function stringToRegex(string) {
        //Convert unicode string values to a regex global
        let regex = new RegExp(string, 'g');
        return regex
    }

    function unicodeToChar(text) {
        //Convert a \u representation to a unicode string
        // e.g. convert \u002D to -
        return text.replace(/\\u[\dA-F]{4}/gi,
            function (match) {
                return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
            });
    }
    //
    // Code Action section
    //
    const clickForInfo = "Click for more information about ";
    vscode.languages.registerCodeActionsProvider(supportedLanguages, {
        "provideCodeActions": provideCodeActions
    });

    function provideCodeActions(document, range, codeActionContext) {
        const codeActions = [];
        const diagnostics = codeActionContext.diagnostics || [];
        // diagnostics
        //     .filter((diagnostic) => diagnostic.source === "extensionDisplayName")
        //     .forEach((diagnostic) => {
        //         const ruleNameAlias = diagnostic.message.split(":")[0];
        //         const ruleName = ruleNameAlias.split("/")[0];
        //         // Provide code action for information about the violation
        //         const infoTitle = clickForInfo + ruleNameAlias;
        //         const infoAction = new vscode.CodeAction(infoTitle, vscode.CodeActionKind.QuickFix);
        //         infoAction.command = {
        //             "title": infoTitle,
        //             "command": "vscode.open",
        //             "arguments": [vscode.Uri.parse(diagnostic.code)]
        //         };
        //         infoAction.diagnostics = [diagnostic];
        //         codeActions.push(infoAction);
        //         // Provide code action to fix the violation
        //         if (diagnostic.range.isSingleLine && fixFunctions[ruleName]) {
        //             const fixTitle = clickToFix + ruleNameAlias;
        //             const fixAction = new vscode.CodeAction(fixTitle, vscode.CodeActionKind.QuickFix);
        //             fixAction.command = {
        //                 "title": fixTitle,
        //                 "command": fixLineCommandName,
        //                 "arguments": [
        //                     diagnostic.range,
        //                     ruleName
        //                 ]
        //             };
        //             fixAction.diagnostics = [diagnostic];
        //             codeActions.push(fixAction);
        //         }
        //     });
        return codeActions;
    }
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
        const diagnostics = []
        let match
        const text = activeEditor.document.getText();
        context.subscriptions.push(diagnosticCollection);
        //Loop through each linting rule
        lintingRules.forEach(rule => {
            let regEx = stringToRegex(rule.invalid)
            //Loop through each regex match of a rule.
            while (match = regEx.exec(text)){
                const startPos = activeEditor.document.positionAt(match.index);
                const endPos = activeEditor.document.positionAt(match.index + match[0].length);
                let range = new vscode.Range(startPos, endPos);
                let message = rule.message;
                let diagnostic = new vscode.Diagnostic(range, message, vscode.DiagnosticSeverity.Warning);
                diagnostic.source = "Unicode Substitutions";
                diagnostics.push(diagnostic);
            }
        });
        // Push diagnostics to VS Code
        diagnosticCollection.set(activeEditor.document.uri, diagnostics);
    }

    //
    // Formatter section
    //
    if (enableFormatting) {
        vscode.languages.registerDocumentFormattingEditProvider(supportedLanguages, {
            provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
                console.log(lintingRules)
                let arrayText = []
                const text = activeEditor.document.getText();
                let match, matchIndex
                //Loop through each linting rule
                lintingRules.forEach(rule => {
                    let regEx = stringToRegex(rule.invalid)
                    let stringValid = unicodeToChar(rule.valid)
                    //Loop through character match to the current linting rule
                    while (match = regEx.exec(text)) {
                        // Loop through each regex match.
                        const startPos = activeEditor.document.positionAt(match.index);
                        const endPos = activeEditor.document.positionAt(match.index + match[0].length);
                        let range = new vscode.Range(startPos, endPos)
                        arrayText.push(vscode.TextEdit.replace(range, stringValid));
                    }
                });
                return arrayText
            }
        });
    }
}
