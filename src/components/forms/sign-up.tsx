'use client';

import { useRouter } from 'next/navigation';

import { ERROR_MESSAGES, ErrorCodes } from 'lib/errors/next-auth';
import { trpc } from 'lib/trpc/react';
import { ZPasswordSchema } from 'lib/trpc/server/auth-router/schema';

import { zodResolver } from '@hookform/resolvers/zod';
import { TRPCClientError } from '@trpc/client';
import { TRPCError } from '@trpc/server';
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

const ZSignUpFormSchema = z.object({
  name: z.string().min(1, { message: 'Please enter a valid name' }),
  email: z.string().email(),
  password: ZPasswordSchema,
});

type TSignUpFormSchema = z.infer<typeof ZSignUpFormSchema>;

const SignUpForm = () => {
  const { toast } = useToast();
  const router = useRouter();

  const { mutateAsync: signUp, isPending, isSuccess } = trpc.auth.signup.useMutation();

  const form = useForm<TSignUpFormSchema>({
    resolver: zodResolver(ZSignUpFormSchema),
    defaultValues: { name: '', email: '', password: '' },
  });

  const onFormSubmit = async (values: TSignUpFormSchema) => {
    try {
      const { id, name, email, password } = await signUp({
        name: values.name,
        email: values.email,
        password: values.password,
      });

      if (id) {
        toast({
          title: 'Account succesfully created!',
          description:
            'Your account was created successfully. You can now work on your Markdown drafts.',
        });
      }

      const result = await signIn('credentials', {
        callbackUrl: '/',
        id,
        name,
        email,
        password,
        redirect: false,
      });

      if (!result?.url) {
        throw new Error(ErrorCodes.UNKNOWN_ERROR);
      }

      router.push(result.url);
    } catch (error) {
      let description = ERROR_MESSAGES[ErrorCodes.UNKNOWN_ERROR];

      if (error instanceof TRPCClientError && error.data?.code === 'BAD_REQUEST') {
        description = error.message;
      }

      toast({ variant: 'destructive', description });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)}>
        <fieldset disabled={isPending || isSuccess}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="youremail@example.com" {...field} />
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
          disabled={isPending || isSuccess}
          className="my-2 w-full p-2 duration-300"
        >
          {isPending ? 'Signing up...' : 'Sign up'}
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
