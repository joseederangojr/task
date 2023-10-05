import { Form, FormField, FormItem, FormLabel, FormMessage, FormDescription, FormControl } from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, useForm } from '@inertiajs/react';


function SignInForm() {
  const form = useForm({
    email: '',
    password: '',
    remember: true
  })

  const onSubmit = async (event: React.BaseSyntheticEvent) => {
    event.preventDefault();
    form.post('/api/auth/signin')
  }

  return (
    <Form {...form}>
      <form className='flex flex-col space-y-4' onSubmit={onSubmit}>
        <FormField
          data={form.data}
          name='email'
          render={({ setValue, error, field }) => (
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
          render={({ setValue, field }) => (
            <FormItem>
              <FormLabel htmlFor={field.id}>Password</FormLabel>
              <FormControl>
                <Input type="password" onChange={event => setValue(event.target.value)} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          data={form.data}
          name='remember'
          render={({ field, setValue }) => (
            <FormItem className='flex items-center space-x-2 space-y-0'>
              <Checkbox id={field.id} checked={field.value} onCheckedChange={checked => setValue(checked === 'indeterminate' ? false : checked)} />
              <FormLabel
                htmlFor={field.id}
                className='cursor-pointer'
              >
                Remember me
              </FormLabel>
            </FormItem>
          )}
        />

        <FormItem>
          <Button className='w-full' type="submit" disabled={form.processing}>
            {form.processing ? 'Signing in...' : 'Sign in'}
          </Button>
        </FormItem>
        <div className='flex  justify-center text-sm'>
          <span className='text-muted-foreground pr-2'>Don&apos;t have account yet?</span>
          <Link href='/signup' className='text-primary font-bold hover:underline'>Sign up</Link>
        </div>
      </form>
    </Form>
  )
}



export { SignInForm }
