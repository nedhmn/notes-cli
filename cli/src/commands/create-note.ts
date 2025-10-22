import { input, select } from '@inquirer/prompts';
import { join } from 'node:path';
import { writeFileSync } from 'node:fs';
import { PATHS, getTopicFolders, toKebabCase } from '../utils/paths.js';
import { openInEditor } from '../utils/editor.js';
import { createDatedFilename } from '../utils/date.js';
import { generateNoteTemplate } from '../utils/template.js';

export async function createNote(): Promise<void> {
  try {
    // Get available topics
    const topics = getTopicFolders();

    // Build choices for location
    const locationChoices = [
      { name: 'notes/misc/ (one-off notes)', value: 'misc' },
      ...topics.map(topic => ({
        name: `notes/${topic}/`,
        value: topic,
      })),
    ];

    // Ask where to create the note
    const location = await select({
      message: 'Where do you want to create the note?',
      choices: locationChoices,
    });

    // Ask for title
    const title = await input({
      message: 'What is the title of the note?',
      required: true,
    });

    const kebabTitle = toKebabCase(title);

    // Determine the file path and name based on location
    let filePath: string;

    if (location === 'misc') {
      // Misc: simple title (no date)
      const filename = `${kebabTitle}.md`;
      filePath = join(PATHS.misc, filename);
    } else {
      // Topic folder: use dated filename with title
      const filename = createDatedFilename(kebabTitle);
      filePath = join(PATHS.notes, location, filename);
    }

    // Create the file with template (YAML frontmatter + heading)
    const content = generateNoteTemplate(title);
    writeFileSync(filePath, content, 'utf-8');

    console.log(`\n✓ Note created: ${filePath}`);

    // Open in editor at line 11 (after Overview header)
    console.log('\nOpening in editor...\n');
    await openInEditor(filePath, 11);

    console.log('\n✓ Done!');
  } catch (error) {
    if (error instanceof Error) {
      console.error(`\n✗ Error: ${error.message}`);
    }
    process.exit(1);
  }
}
