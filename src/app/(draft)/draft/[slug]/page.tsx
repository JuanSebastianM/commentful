import Link from 'next/link';
import { notFound } from 'next/navigation';

import {
  ControlledDraftErrorCode,
  ErrorCodes,
  isDraftErrorCode,
} from 'lib/errors/draft';
import { getServerSession } from 'lib/next-auth/get-server-session';
import { getDraftById } from 'lib/server-only/draft/get-draft-by-id';

import { Draft } from '@prisma/client';

import { CommentsSidebar } from '~/components/(draft)/sidebar/comments-sidebar';
import Tiptap from '~/components/editor/tiptap';

interface DraftPageProps {
  params: {
    slug: string;
  };
}

const DraftPage = async ({ params }: DraftPageProps) => {
  const { slug } = params;

  let draft: Draft | null = null;

  try {
    const { user } = await getServerSession();

    if (!user) {
      throw new Error(ErrorCodes.UNAUTHORIZED_USER);
    }

    draft = await getDraftById({
      userEmail: user.email,
      draftId: slug,
    });
  } catch (error) {
    if (
      isDraftErrorCode<ControlledDraftErrorCode>(error) &&
      error.message === ErrorCodes.NO_DRAFT_FOUND
    ) {
      notFound();
    }

    throw error;
  }

  return (
    <div className="px-8">
      <header className="flex items-center justify-between py-8">
        <h1>Blog {draft?.title}</h1>
        <Link href="/preview">Preview</Link>
      </header>
      <main>
        <article className="wysiwyg-editor container relative grid grid-cols-12">
          <Tiptap>
            <CommentsSidebar />
          </Tiptap>
        </article>
      </main>
    </div>
  );
};

export default DraftPage;
