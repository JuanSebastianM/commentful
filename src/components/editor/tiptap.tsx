'use client';

import type { ReactNode } from 'react';

import Placeholder from '@tiptap/extension-placeholder';
import { EditorProvider } from '@tiptap/react';
import type { EditorEvents, EditorOptions, Extensions } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Markdown } from 'tiptap-markdown';

interface TiptapProps {
  children: ReactNode;
}

const Tiptap = ({ children }: TiptapProps) => {
  const extensions: Extensions | undefined = [
    StarterKit,
    Placeholder.configure({
      placeholder: ({ node }) => {
        if (node.type.name === 'heading') {
          return `Heading ${node.attrs.level}`;
        }

        return 'Write something...';
      },
      includeChildren: true,
    }),
    Markdown,
  ];

  const editorProps: EditorOptions['editorProps'] = {
    attributes: {
      class:
        'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl my-5 focus:outline-none',
    },
  };

  const onUpdate = ({ editor, transaction }: EditorEvents['update']) => {
    // This is so we don't save when the editor is empty but when there's content
    if (
      transaction.doc.content.childCount === 1 &&
      transaction.doc.content.firstChild?.content.size === 0
    )
      return null;
  };

  return (
    <EditorProvider extensions={extensions} editorProps={editorProps} onUpdate={onUpdate}>
      {children}
    </EditorProvider>
  );
};

export default Tiptap;
