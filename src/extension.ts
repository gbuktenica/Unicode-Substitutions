import * as vscode from 'vscode';
import * as defaultRulesJson from "./defaultRules.json";
let diagnosticCollection = null;
diagnosticCollection = vscode.languages.createDiagnosticCollection("extensionDisplayName");
const fixLineCommandName = "unicodesubsitutions.fixLine";
let activeEditor = vscode.window.activeTextEditor;
// Read from configuration from workspace (Package.json, Settings.json etc) and default rule json.
let supportedLanguages = vscode.workspace.getConfiguration().get('unicodesubsitutions.enabledLanguageIds');
let enableDefaultRules = vscode.workspace.getConfiguration().get('unicodesubsitutions.enableDefaultRules');
let enableFormatting = vscode.workspace.getConfiguration().get('unicodesubsitutions.enableFormatting');
let documentSelector = {
    "scheme": '*',
    "file": supportedLanguages
};
let lintingRules: Array<any> = [];
lintingRules = vscode.workspace.getConfiguration().get('unicodesubsitutions.rules');
if (enableDefaultRules) {
    lintingRules = lintingRules.concat(defaultRulesJson.defaultRules);
}


// This method is called when Visual Studio Code is activated
export function activate(context: vscode.ExtensionContext) {
    console.log('Unicode Substitutions is activated');

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

    // Register Formatters
    if (enableFormatting) {
        // Formats the whole document when triggered by "Format Document"
        vscode.languages.registerDocumentFormattingEditProvider(documentSelector, {
            provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
                return formatDocument(context, document, null);
            }
        });
        vscode.languages.registerDocumentRangeFormattingEditProvider(documentSelector, {
            provideDocumentRangeFormattingEdits(document: vscode.TextDocument, range: vscode.Range, options: vscode.FormattingOptions, token: vscode.CancellationToken): vscode.ProviderResult<vscode.TextEdit[]> {
                return formatDocument(context, document, range);
            }
        });
    }

    // Register Linting
    if (activeEditor) {
        updateLinting(context);
    }
    vscode.window.onDidChangeActiveTextEditor(editor => {
        activeEditor = editor;
        if (editor) {
            updateLinting(context);
        }
    }, null, context.subscriptions);

    vscode.workspace.onDidChangeTextDocument(event => {
        if (activeEditor && event.document === activeEditor.document) {
            updateLinting(context);
        }
    }, null, context.subscriptions);
}

function stringToRegex(string) {
    //Convert unicode string values to a regex global object
    let regex = new RegExp(string, 'g');
    return regex;
}

function unicodeToChar(text) {
    //Convert a \u representation to a unicode string
    // e.g. convert \u002D to -
    return text.replace(/\\u[\dA-F]{4}/gi,
        function (match) {
            return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
        });
}

export function formatDocument(context: vscode.ExtensionContext, document: vscode.TextDocument, range: vscode.Range){
    // Document Formatting
    if (range === null) {
        let start = new vscode.Position(0, 0);
        let end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
        range = new vscode.Range(start, end);
    }
    let edits: vscode.TextEdit[] = [];
    const text = document.getText(range);
    let match;
    //Loop through each rule
    lintingRules.forEach(rule => {
        let regEx = stringToRegex(rule.invalid);
        let stringValid = unicodeToChar(rule.valid);
        //Loop through character match to the current linting rule
        while (match = regEx.exec(text)) {
            // Loop through each regex match.
            let offset = document.offsetAt(range.start);
            let startPos = document.positionAt(offset + match.index);
            let endPos = document.positionAt(offset + match.index + match[0].length);
            let newRange = new vscode.Range(startPos, endPos);
            edits.push(vscode.TextEdit.replace(newRange, stringValid));
        }
    });
    return edits;
}

function updateLinting(context) {
    // Lint the document and push diagnostics to Visual Studio Code
    if (!activeEditor) {
        return;
    }
    //console.log('Unicode Substitutions linting has started');
    const diagnostics = [];
    let match;
    const text = activeEditor.document.getText();
    context.subscriptions.push(diagnosticCollection);
    //Loop through each linting rule
    let ruleIndex = 0;
    lintingRules.forEach(rule => {
        let regEx = stringToRegex(rule.invalid);
        //Loop through each regex match of a rule.
        while (match = regEx.exec(text)) {
            const startPos = activeEditor.document.positionAt(match.index);
            const endPos = activeEditor.document.positionAt(match.index + match[0].length);
            let range = new vscode.Range(startPos, endPos);
            let message = rule.message;
            let diagnostic = new vscode.Diagnostic(range, message, vscode.DiagnosticSeverity.Warning);
            diagnostic.code = ruleIndex;
            diagnostic.source = "Unicode Substitutions";
            diagnostics.push(diagnostic);
        }
        ruleIndex++;
    });
    // Push diagnostics to Visual Studio Code
    diagnosticCollection.set(activeEditor.document.uri, diagnostics);
}

function provideCodeActions(document, range, codeActionContext) {
    // Provide the light bulb on individual violations.
    const codeActions = [];
    const diagnostics = codeActionContext.diagnostics || [];
    diagnostics
        .filter((diagnostic) => diagnostic.source === "Unicode Substitutions")
        .forEach((diagnostic) => {
            // Provide code action to fix the violation
            const vscode = require("vscode");
            const fixTitle = lintingRules[diagnostic.code].message;
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

function fixLine(range, ruleName) {
    // Fixes individual linting violations when the light bulb is clicked.
    let edit = new vscode.WorkspaceEdit();
    // Read linting fix from Linting Rules array
    let stringValid = unicodeToChar(lintingRules[ruleName].valid);
    edit.replace(activeEditor.document.uri, range, stringValid);
    return vscode.workspace.applyEdit(edit);
}