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
        <article className="draft-container relative mx-auto grid grid-cols-10 md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl">
          <Tiptap></Tiptap>
        </article>
      </main>
    </div>
  );
};

export default DraftPage;
