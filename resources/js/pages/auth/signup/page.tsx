import { AuthLayout } from "@/layouts/auth-layout";
import { MixIcon } from '@radix-ui/react-icons'
import { SignUpForm } from "./components/signup-form";


function SignInPage() {
  return (
    <AuthLayout>
      <div className="flex flex-col space-y-2 w-[500px] -mt-20">
        <div className="flex justify-center items-center">
          <MixIcon className="h-8 w-8 mr-2" /> <h1 className="text-3xl text-center">Task</h1>
        </div>

        <h3 className="text-sm text-muted-foreground text-center">Manage your tasks from multiple spaces in one place</h3>
        <SignUpForm />
      </div>
    </AuthLayout>
  )
}

export default SignInPage
