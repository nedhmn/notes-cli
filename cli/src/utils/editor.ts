import { spawn } from 'node:child_process';

/**
 * Open a file in the user's preferred editor
 * Uses $EDITOR environment variable, falls back to 'code'
 * If no editor is available, silently skips
 */
export async function openInEditor(filePath: string, line?: number): Promise<void> {
  const editor = process.env.EDITOR || 'code';
  const editorName = editor.toLowerCase();

  let args: string[];

  if (line) {
    // Support different editors' line number syntax
    if (editorName.includes('cursor') || editorName.includes('code')) {
      // VS Code / Cursor: -g file:line
      args = ['-g', `${filePath}:${line}`];
    } else if (editorName.includes('vim') || editorName.includes('nvim')) {
      // Vim / Neovim: +line file
      args = [`+${line}`, filePath];
    } else if (editorName.includes('nano')) {
      // Nano: +line file
      args = [`+${line}`, filePath];
    } else if (editorName.includes('emacs')) {
      // Emacs: +line file
      args = [`+${line}`, filePath];
    } else {
      // Unknown editor, just open the file
      args = [filePath];
    }
  } else {
    args = [filePath];
  }

  return new Promise((resolve) => {
    const child = spawn(editor, args, {
      stdio: 'inherit',
    });

    child.on('exit', () => {
      resolve();
    });

    child.on('error', () => {
      // Silently skip if editor is not available
      resolve();
    });
  });
}
