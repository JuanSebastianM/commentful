import Link from 'next/link';

import { Button } from '~/components/ui/button';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h2>404 Draft Not Found</h2>
      <p className="mt-12">
        The draft you are looking for might have been
        removed or might have never existed.
      </p>
      <div className="mt-12">
        <Button variant="link" asChild>
          <Link href="/">Go back to the main page</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
