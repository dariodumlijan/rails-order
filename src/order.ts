import * as vscode from 'vscode';

function handleSort(a: string, b: string) {
  if (a === ':id') return -1; // ':id' comes before everything else
	if (b === ':id') return 1; // ':id' comes before everything else

	return a.localeCompare(b); // Alphabetical sorting for other elements
}

function extractAttributes(line: string) {
  const attributesRegex = /attributes\s+(.*)/;
  const match = line.match(attributesRegex);
  return match ? match[1] : '';
}

export const handleOrderSerializer = () => {
  const editor = vscode.window.activeTextEditor;
    if (!editor) return;

		let attributesLineRange;
		let attributesLine = '';
    const document = editor.document;
		for (let index = 0; index < document.lineCount; index++) {
			const { text, range } = document.lineAt(index);
			if (text.includes('attributes')) {
				attributesLineRange = range;
				attributesLine = text;
				break;
			}
		}
		if (!attributesLineRange) return;

		const attributes = extractAttributes(attributesLine);
		const sortedAttributes = attributes.split(', ').sort(handleSort);
		const formatedAttributes = sortedAttributes.join(', ');

		const edit = new vscode.WorkspaceEdit();
		edit.replace(document.uri, attributesLineRange, attributesLine.replace(/attributes\s+.*/, `attributes ${formatedAttributes}`));
		vscode.workspace.applyEdit(edit);
};