'use client';

import Link from 'next/link';

import {
  ERROR_MESSAGES,
  ErrorCodes,
} from 'lib/errors/draft';

import { Button } from '~/components/ui/button';

interface ErrorPageProps {
  error: Error & { digest?: string };
}

const ErrorPage = ({ error }: ErrorPageProps) => {
  let errorMessage = 'Unknown error';
  let errorDetails =
    ERROR_MESSAGES[ErrorCodes.UNKNOWN_ERROR];

  if (error.message === ErrorCodes.UNAUTHORIZED_USER) {
    errorMessage = 'Unauthorized User';
    errorDetails =
      ERROR_MESSAGES[ErrorCodes.UNAUTHORIZED_USER];
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h2>{errorMessage}</h2>
      <p className="mt-12">{errorDetails}</p>
      <div className="mt-12">
        <Button variant="link" asChild>
          <Link href="/">Go back to the main page</Link>
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
