'use client';

import type { ReactNode } from 'react';

import { useParams } from 'next/navigation';

import { trpc } from 'lib/trpc/react';

import Placeholder from '@tiptap/extension-placeholder';
import { EditorProvider } from '@tiptap/react';
import type { EditorEvents, EditorOptions, Extensions } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Markdown } from 'tiptap-markdown';
import { useDebouncedCallback } from 'use-debounce';

interface TiptapProps {
  children: ReactNode;
}

const DEBOUNCE_DURATION = 750;

const Tiptap = ({ children }: TiptapProps) => {
  const { slug } = useParams();

  const draftId = slug as string;

  const { mutateAsync: updateContent } = trpc.draft.updateContent.useMutation();

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

  const debouncedUpdates = useDebouncedCallback(
    async ({ editor, transaction }: EditorEvents['update']) => {
      const markdown = editor.storage.markdown.getMarkdown();
      const html = editor.getHTML();

      // TODO: replace this with the logic to update the savedIds field
      console.log({ transaction });

      await updateContent({ draftId, html, markdown });
    },
    DEBOUNCE_DURATION,
  );

  const onUpdate = ({ editor, transaction }: EditorEvents['update']) => {
    // This is so we don't save when the editor is empty but when there's content
    if (
      transaction.doc.content.childCount === 1 &&
      transaction.doc.content.firstChild?.content.size === 0
    )
      return null;

    debouncedUpdates({ editor, transaction });
  };

  return (
    <EditorProvider
      extensions={extensions}
      editorProps={editorProps}
      onUpdate={onUpdate}
      editable={false}
    >
      {children}
    </EditorProvider>
  );
};

export default Tiptap;
