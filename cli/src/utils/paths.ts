import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { readdirSync, statSync, existsSync, mkdirSync } from 'node:fs';

// Get the project root (parent of cli/)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const PROJECT_ROOT = resolve(__dirname, '../../../');

export const PATHS = {
  notes: join(PROJECT_ROOT, 'notes'),
  misc: join(PROJECT_ROOT, 'notes', 'misc'),
} as const;

/**
 * Get all topic folders in the notes directory
 * (excludes 'misc' folder)
 */
export function getTopicFolders(): string[] {
  try {
    const notesDir = PATHS.notes;
    const entries = readdirSync(notesDir);

    return entries.filter(entry => {
      const fullPath = join(notesDir, entry);
      return statSync(fullPath).isDirectory() && entry !== 'misc';
    }).sort();
  } catch (error) {
    return [];
  }
}

/**
 * Ensure a directory exists, creating it if necessary
 */
export function ensureDir(dirPath: string): void {
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Create a topic folder with an attachments subdirectory
 */
export function createTopicFolder(topicName: string): string {
  const topicPath = join(PATHS.notes, topicName);
  const attachmentsPath = join(topicPath, 'attachments');

  ensureDir(topicPath);
  ensureDir(attachmentsPath);

  return topicPath;
}

/**
 * Convert a title to a filename-safe kebab-case string
 */
export function toKebabCase(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_]+/g, '-')  // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, '');  // Remove leading/trailing hyphens
}
