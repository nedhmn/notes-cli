/**
 * Format current date as YYYY-MM-DD
 */
export function getCurrentDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

/**
 * Create a dated filename with optional title
 * Format: YYYY-MM-DD-title.md or YYYY-MM-DD.md
 */
export function createDatedFilename(title?: string): string {
  const date = getCurrentDate();

  if (title) {
    return `${date}-${title}.md`;
  }

  return `${date}.md`;
}
