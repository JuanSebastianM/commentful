'use client';

import { useRouter } from 'next/navigation';

import { ERROR_MESSAGES, ErrorCodes } from 'lib/errors/next-auth';
import { ZPasswordSchema } from 'lib/trpc/server/auth-router/schema';

import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '~/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { useToast } from '~/components/ui/use-toast';

const ZSignInFormSchema = z.object({
  email: z.string().email(),
  password: ZPasswordSchema,
});

type TSignInFormSchema = z.infer<typeof ZSignInFormSchema>;

const SignInForm = () => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<TSignInFormSchema>({
    resolver: zodResolver(ZSignInFormSchema),
    defaultValues: { email: '', password: '' },
  });

  const isSubmitting = form.formState.isSubmitting;

  const onFormSubmit = async (values: TSignInFormSchema) => {
    try {
      const result = await signIn('credentials', {
        callbackUrl: '/',
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      if (!result?.url) {
        throw new Error(ERROR_MESSAGES[ErrorCodes.UNKNOWN_ERROR]);
      }

      window.location.href = result.url;
    } catch (error) {
      let description = ERROR_MESSAGES[ErrorCodes.UNKNOWN_ERROR];

      if (error instanceof Error && ERROR_MESSAGES[error.message as keyof typeof ErrorCodes]) {
        description = ERROR_MESSAGES[error.message as keyof typeof ErrorCodes];
      }

      toast({ variant: 'destructive', description });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)}>
        <fieldset disabled={isSubmitting}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>

        <Button
          type="submit"
          variant="default"
          disabled={isSubmitting}
          className="my-2 w-full p-2 duration-300"
        >
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
