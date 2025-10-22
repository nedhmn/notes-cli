import { input, confirm } from '@inquirer/prompts';
import { join } from 'node:path';
import { writeFileSync } from 'node:fs';
import { createTopicFolder, toKebabCase, getTopicFolders } from '../utils/paths.js';
import { openInEditor } from '../utils/editor.js';
import { createDatedFilename } from '../utils/date.js';
import { generateNoteTemplate } from '../utils/template.js';

export async function createTopic(): Promise<void> {
  try {
    // Ask for topic name
    const topicName = await input({
      message: 'What is the topic name?',
      required: true,
      validate: (value: string) => {
        const kebabName = toKebabCase(value);
        const existingTopics = getTopicFolders();

        if (existingTopics.includes(kebabName)) {
          return `Topic '${kebabName}' already exists!`;
        }

        if (kebabName.length === 0) {
          return 'Topic name cannot be empty';
        }

        return true;
      },
    });

    const kebabName = toKebabCase(topicName);

    // Create the topic folder with attachments/
    const topicPath = createTopicFolder(kebabName);

    console.log(`\n✓ Topic created: notes/${kebabName}/`);
    console.log(`  - attachments/ directory created`);

    // Ask if they want to create a first note
    const createFirstNote = await confirm({
      message: 'Do you want to create the first note in this topic?',
      default: true,
    });

    if (createFirstNote) {
      const noteTitle = await input({
        message: 'What is the title of the first note?',
        required: true,
      });

      const kebabTitle = toKebabCase(noteTitle);
      const filename = createDatedFilename(kebabTitle);
      const filePath = join(topicPath, filename);

      // Create the file with template (YAML frontmatter + heading)
      const content = generateNoteTemplate(noteTitle);
      writeFileSync(filePath, content, 'utf-8');

      console.log(`\n✓ Note created: notes/${kebabName}/${filename}`);

      // Open in editor
      console.log('\nOpening in editor...\n');
      await openInEditor(filePath);
    }

    console.log('\n✓ Done!');
  } catch (error) {
    if (error instanceof Error) {
      console.error(`\n✗ Error: ${error.message}`);
    }
    process.exit(1);
  }
}
