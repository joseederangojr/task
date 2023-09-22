import * as z from 'zod'
import { FieldPath, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from "@tanstack/react-query";
import { Form, FormField, FormItem, FormLabel, FormMessage, FormDescription, FormControl } from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { axios } from '@/lib/axios'
import { AppError, UnknownError, ValidationError } from "@/lib/errors";
import { AppResponseData, AppResponseError, User } from '@/types';
import { ToastAction } from '@/components/ui/toast';
import { router } from '@inertiajs/react';



const schema = z.object({
  email: z.string().email(),
  password: z.string().nonempty(),
  remember: z.boolean()
})

type FormData = z.infer<typeof schema>
type Credentials = Omit<FormData, 'remember'>

type AuthLoginResponse = {
  authorization: {
    token: string,
    type: 'bearer',
  },
  user: User
}

class InvalidCredentialError extends Error {
  static STATUS_CODE = 400;
}

const signIn = async (data: Credentials) => {
  return await axios.post('/auth/signin', data)
    .catch((err: Error) => {
      if (err instanceof AppError && err.status === InvalidCredentialError.STATUS_CODE) {
        throw new InvalidCredentialError()
      }

      if (err instanceof ValidationError) {
        throw new ValidationError(err.errors);
      }

      if (err instanceof AppError) {
        throw new UnknownError(err.data.message);
      }

      console.error(err)
      throw new UnknownError(err.message);
    })
}

function SignInForm() {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: window.localStorage.getItem('task.auth.email') ?? '',
      password: '',
      remember: true
    }
  })
  const signInMutation = useMutation<
    AppResponseData<AuthLoginResponse>,
    AppResponseError<Credentials>,
    Credentials
  >(signIn);

  const onSubmit = async (data: FormData): Promise<void> => {
    const action = data.remember ? 'setItem' : 'removeItem'
    window.localStorage[action]('task.auth.email', data.email)
    const response = await signInMutation.mutateAsync({
      email: data.email,
      password: data.password
    }).catch((err: Error) => {
      if (err instanceof InvalidCredentialError) {
        return form.setError('email', {
          type: 'manual',
          message: 'Invalid email or password'
        })
      }

      if (err instanceof ValidationError) {
        for (const k in err.errors) {
          const errorKey = k as FieldPath<Credentials>
          return form.setError(errorKey, {
            type: 'manual',
            message: err.errors[errorKey]?.[0]
          })
        }
        return;
      }

      if (err instanceof UnknownError) {

        toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again" onClick={() => router.reload()}>Reload</ToastAction>,
        })
        return;
      }
    })

    if (!response) return
    window.localStorage.setItem('task.auth.token', response.data.authorization.token)
    router.visit('/', { replace: true })
  }

  return (
    <Form {...form}>
      <form className='flex flex-col space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormControl>
                <Input type="email" id="email" {...field} />
              </FormControl>
              {
                fieldState?.error ? <FormMessage /> : (
                  <FormDescription>
                    We won&apos;t sell your email address
                  </FormDescription>
                )
              }
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormControl>
                <Input type="password" id="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center space-x-2">
          <Checkbox id="terms" checked={form.watch('remember')} onCheckedChange={checked => form.setValue('remember', checked === 'indeterminate' ? false : checked)} />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Remember me
          </label>
        </div>

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>
    </Form>
  )
}



export { SignInForm }
