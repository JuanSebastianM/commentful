'use client';

import { useEffect } from 'react';

import { useParams } from 'next/navigation';

import { trpc } from 'lib/trpc/react';

import { useCurrentEditor } from '@tiptap/react';

import { useToast } from '~/components/ui/use-toast';

export const CommentsSidebar = () => {
  const { slug } = useParams();

  const draftId = slug as string;

  const { toast } = useToast();

  const { editor } = useCurrentEditor();

  const { data, isLoading, error } = trpc.draft.getContentByDraftId.useQuery({
    draftId,
  });

  useEffect(() => {
    if (editor) {
      if (data) {
        editor.commands.setContent(data.html);
      }

      if (!isLoading) {
        editor.setEditable(true);
      }

      if (error) {
        toast({ variant: 'destructive', description: error.message });
      }
    }
  }, [editor, data, isLoading, error, toast]);

  if (!editor) {
    return null;
  }

  // TODO: if there are comments, return this. If not, return null and add the check inside the if from above (!editor && !comments)
  return <div className="col-span-4">Comments</div>;
};
