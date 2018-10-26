import * as vscode from 'vscode';
import * as defaultRulesJson from "./defaultRules.json"
let diagnosticCollection = null;
diagnosticCollection = vscode.languages.createDiagnosticCollection("extensionDisplayName");
const fixLineCommandName = "unicodesubsitutions.fixLine";
let activeEditor = vscode.window.activeTextEditor;
const documentSelector = {
    "language": '*',
    "scheme": '*'
};
// Read from configuration from workspace (Package.json, Settings.json etc) and default rule json.
let supportedLanguages = vscode.workspace.getConfiguration().get('unicodesubsitutions.enabledLanguageIds');
let enableDefaultRules = vscode.workspace.getConfiguration().get('unicodesubsitutions.enableDefaultRules');
let enableFormatting = vscode.workspace.getConfiguration().get('unicodesubsitutions.enableFormatting');
let lintingRules: Array<any> = [];
lintingRules = vscode.workspace.getConfiguration().get('unicodesubsitutions.rules');
if (enableDefaultRules) {
    lintingRules = lintingRules.concat(defaultRulesJson.defaultRules);
}

//
// Common functions
//
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
// This method is called when vs code is activated
//
export function activate(context: vscode.ExtensionContext) {
    console.log('Unicode Substitutions is activated');

    //
    // Code Action Section
    //

    // Register Code Action Provider
    context.subscriptions.push(
        vscode.languages.registerCodeActionsProvider(documentSelector, {
            "provideCodeActions": provideCodeActions
        })
    );
    // Register Code Action Command
    context.subscriptions.push(
        vscode.commands.registerCommand(fixLineCommandName, fixLine)
    );
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
        let ruleIndex = 0
        lintingRules.forEach(rule => {
            let regEx = stringToRegex(rule.invalid)
            //Loop through each regex match of a rule.
            while (match = regEx.exec(text)){
                const startPos = activeEditor.document.positionAt(match.index);
                const endPos = activeEditor.document.positionAt(match.index + match[0].length);
                let range = new vscode.Range(startPos, endPos);
                let message = rule.message;
                let diagnostic = new vscode.Diagnostic(range, message, vscode.DiagnosticSeverity.Warning);
                diagnostic.code = ruleIndex;
                diagnostic.source = "Unicode Substitutions";
                diagnostics.push(diagnostic);
            }
            ruleIndex ++
        });
        // Push diagnostics to VS Code
        diagnosticCollection.set(activeEditor.document.uri, diagnostics);
    }

    //
    // Document Formatter section (Alt + Shift +F)
    //
    if (enableFormatting) {
        vscode.languages.registerDocumentFormattingEditProvider(supportedLanguages, {
            provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
                console.log(lintingRules)
                let arrayText = []
                const text = activeEditor.document.getText();
                let match
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

//
// Code Actions
//

// Implements CodeActionsProvider.provideCodeActions to provide information and fix rule violations
function provideCodeActions(document, range, codeActionContext) {
    const codeActions = [];
    const diagnostics = codeActionContext.diagnostics || [];
    diagnostics
        .filter((diagnostic) => diagnostic.source === "Unicode Substitutions")
        .forEach((diagnostic) => {
            // Provide code action for information about the violation
            const clickToFix = "Click to fix this violation";
            const vscode = require("vscode");
            // Provide code action to fix the violation
            const fixTitle = clickToFix ;
            const fixAction = new vscode.CodeAction(fixTitle, vscode.CodeActionKind.QuickFix);
            fixAction.command = {
                "title": fixTitle,
                "command": fixLineCommandName,
                "arguments": [
                    diagnostic.range,
                    diagnostic.code
                ]
            };
            fixAction.diagnostics = [diagnostic];
            codeActions.push(fixAction);
        });
    return codeActions;
}

// Fixes violations of a rule on a line
function fixLine(range, ruleName) {
    console.log(lintingRules[ruleName].invalid)
    console.log(lintingRules[ruleName].valid)
    let edit = new vscode.WorkspaceEdit();
    let stringValid = unicodeToChar(lintingRules[ruleName].valid)
    edit.replace(activeEditor.document.uri, range, stringValid);
    return vscode.workspace.applyEdit(edit);
}