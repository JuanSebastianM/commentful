import Link from 'next/link';

import { CommentsSidebar } from '~/components/(draft)/sidebar/comments-sidebar';
import Tiptap from '~/components/editor/tiptap';

const DraftPage = () => {
  return (
    <div className="px-8">
      <header className="flex items-center justify-between py-8">
        <h1>Blog</h1>
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
