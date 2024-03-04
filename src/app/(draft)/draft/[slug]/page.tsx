'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import Tiptap from '~/components/editor/tiptap';

const DraftPage = () => {
  const { slug } = useParams();

  return (
    <div className="px-8">
      <header className="flex items-center justify-between py-8">
        {/* remove this after adding authentication validation */}
        <h1>Blog {typeof slug === 'string' ? slug : 'null'}</h1>
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
