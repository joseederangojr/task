
import { Form, FormField, FormItem, FormLabel, FormMessage, FormDescription, FormControl } from '@/components/ui/form'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, useForm } from '@inertiajs/react';





function SignUpForm() {
  const form = useForm({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })


  const onSubmit = async (event: React.BaseSyntheticEvent) => {
    event.preventDefault()
    form.post('/api/auth/signup')
  }

  return (
    <Form {...form}>
      <form className='flex flex-col space-y-4' onSubmit={onSubmit}>
        <FormField
          data={form.data}
          name="name"
          render={({ field, setValue }) => (
            <FormItem>
              <FormLabel htmlFor={field.id}>Name</FormLabel>
              <FormControl>
                <Input onChange={event => setValue(event.target.value)} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          data={form.data}
          name="email"
          render={({ field, error, setValue }) => (
            <FormItem>
              <FormLabel htmlFor={field.id}>Email</FormLabel>
              <FormControl>
                <Input type="email" onChange={event => setValue(event.target.value)} {...field} />
              </FormControl>
              {
                error ? <FormMessage /> : (
                  <FormDescription>
                    We won&apos;t sell your email address
                  </FormDescription>
                )
              }
            </FormItem>
          )}
        />

        <FormField
          data={form.data}
          name="password"
          render={({ field, setValue }) => (
            <FormItem>
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormControl>
                <Input type="password" onChange={event => setValue(event.target.value)} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          data={form.data}
          name="passwordConfirmation"
          render={({ field, setValue }) => (
            <FormItem>
              <FormLabel htmlFor={field.id}>Password Confirmation</FormLabel>
              <FormControl>
                <Input type="password" onChange={event => setValue(event.target.value)} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        <FormItem>
          <Button className='mt-2 w-full' type="submit" disabled={form.processing}>
            {form.processing ? 'Signing up...' : 'Sign up'}
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
