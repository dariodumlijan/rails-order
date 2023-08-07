import * as vscode from 'vscode';
import { handleOrderSerializer } from './order';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('rails-order.serializer', handleOrderSerializer);

  context.subscriptions.push(disposable);
}

export function deactivate() {}
