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

        <div className="flex items-center space-x-2">
          <Checkbox id="terms" checked={form.data.remember} onCheckedChange={checked => form.setData('remember', checked === 'indeterminate' ? false : checked)} />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Remember me
          </label>
        </div>

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
