import Link from 'next/link';

import Tiptap from '~/components/editor/tiptap';

const DraftPage = () => {
  return (
    <div className="px-8">
      <header className="flex items-center justify-between py-8">
        <h1>Blog Title</h1>
        <Link href="/preview">Preview</Link>
      </header>
      <main>
        <article className="wysiwyg-editor container relative grid grid-cols-12">
          <Tiptap></Tiptap>
        </article>
      </main>
    </div>
  );
};

export default DraftPage;
