import * as z from 'zod'
import { FieldPath, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from "@tanstack/react-query";
import { Form, FormField, FormItem, FormLabel, FormMessage, FormDescription, FormControl } from '@/components/ui/form'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { axios } from '@/lib/axios'
import { AppError, UnknownError, ValidationError } from "@/lib/errors";
import { AppResponseData, AppResponseError } from '@/types';
import { ToastAction } from '@/components/ui/toast';
import { Link, router } from '@inertiajs/react';



const schema = z.object({
  name: z.string().nonempty(),
  email: z.string().email(),
  password: z.string().nonempty().min(8),
  passwordConfirmation: z.string().nonempty(),
}).refine(data => data.password === data.passwordConfirmation, {
  message: 'Passwords do not match',
  path: ['passwordConfirmation']
})

type FormData = z.infer<typeof schema>

type AuthSignUpResponse = {
  authorization: {
    token: string,
    type: 'bearer',
  }
}

const signUp = async (data: FormData) => {
  return await axios.post('/auth/signup', data)
    .catch((err: Error) => {
      console.error('signUp error', err)
      if (err instanceof ValidationError) {
        throw err
      }

      if (err instanceof AppError) {
        throw new UnknownError(err.data.message);
      }

      throw new UnknownError(err.message);
    })
}

function SignUpForm() {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  })
  const signUpMutatio = useMutation<
    AppResponseData<AuthSignUpResponse>,
    AppResponseError<FormData>,
    FormData
  >(signUp);

  const onSubmit = async (data: FormData): Promise<void> => {
    const response = await signUpMutatio.mutateAsync(data).catch((err: Error) => {
      if (err instanceof ValidationError) {
        for (const k in err.errors) {
          const errorKey = k as FieldPath<FormData>
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">Name</FormLabel>
              <FormControl>
                <Input id="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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

        <FormField
          control={form.control}
          name="passwordConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="passwordConfirmation">Password Confirmation</FormLabel>
              <FormControl>
                <Input type="password" id="passwordConfirmation" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        <FormItem>
          <Button className='mt-2 w-full' type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Signing up...' : 'Sign up'}
          </Button>
        </FormItem>
        <div className='flex  justify-center text-sm'>
          <span className='text-muted-foreground pr-2'>Already have account?</span>
          <Link href='/signin' className='text-primary font-bold hover:underline'>Sign In</Link>
        </div>
      </form>
    </Form>
  )
}



export { SignUpForm }
