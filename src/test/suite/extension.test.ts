import * as assert from 'assert';
import { after } from 'mocha';
import * as vscode from 'vscode';
//import * as extension from '../../extension';

suite('Extension Test Suite', () => {
    after(() => {
        vscode.window.showInformationMessage('All tests done!');
    });

    //Extension tests
    test("Should start extension", async () => {
        const started = vscode.extensions.getExtension(
            "glenbuktenica.Unicode-Substitutions",
        ).isActive;
        assert.equal(started, true);
    });

    //Format tests

    //Linting tests

});

function sleep(ms: number): Promise<void> {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}