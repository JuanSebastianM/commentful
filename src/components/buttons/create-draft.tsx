'use client';

import { useRouter } from 'next/navigation';

import { ERROR_MESSAGES, ErrorCodes } from 'lib/errors/draft';
import { trpc } from 'lib/trpc/react';

import { TRPCClientError } from '@trpc/client';

import { Button } from '~/components/ui/button';
import { type ButtonProps } from '~/components/ui/button';
import { useToast } from '~/components/ui/use-toast';

export const CreateDraftButton = ({ children, ...props }: ButtonProps) => {
  const { toast } = useToast();

  const router = useRouter();

  const { mutateAsync: createDraft } = trpc.draft.create.useMutation();

  const handleOnClick = async () => {
    try {
      const draft = await createDraft();

      if (draft) {
        toast({
          title: 'Draft succesfully created!',
          description:
            'Your draft was created successfully. You can now start working on it and invite people to contribute.',
        });
      }

      router.push(`/draft/${draft.id}`);
    } catch (error) {
      console.error(error);

      let description = ERROR_MESSAGES[ErrorCodes.UNKNOWN_ERROR];

      if (error instanceof TRPCClientError && error.data?.code === 'BAD_REQUEST') {
        description = error.message;
      }

      toast({ variant: 'destructive', description });
    }
  };

  return (
    <Button onClick={handleOnClick} {...props}>
      {children}
    </Button>
  );
};
