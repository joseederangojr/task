import * as  React from 'react'
import { axios } from '@/lib/axios';
import { router } from '@inertiajs/react';
import { AppResponseData, User } from '@/types'
import { useToast } from './ui/use-toast';
import { AxiosResponse } from 'axios';

const getcsrfCookie = () => axios.get('/sanctum/csrf-cookie', {
  baseURL: '/'
})

const getWhoAmI = () => axios.get<any, AppResponseData<User>>('/auth/whoami')

const UserContext = React.createContext<User | undefined>(undefined);

const unauthorizedToast = {
  title: 'Unauthorized access',
  description: 'You are not authorized to access the requested page',
}

function UserProvider(props: React.PropsWithChildren) {
  const [user, setUser] = React.useState<User | undefined>(() => {
    const user = window.localStorage.getItem('task.auth.user')
    return user ? JSON.parse(user) : undefined
  })
  const { toast } = useToast()
  const token = window.localStorage.getItem('task.auth.token');

  React.useEffect(() => {
    getcsrfCookie()
    getWhoAmI()
      .then((response) => {
        setUser(response.data)
      })
      .catch(() => {
        window.localStorage.removeItem('task.auth.token')
        window.localStorage.removeItem('task.auth.user')
        router.replace('/login')
        toast(unauthorizedToast)
      })
  }, [token])

  return (
    <UserContext.Provider value={user}>
      {props.children}
    </UserContext.Provider>
  )
}

const useUser = () => {
  return React.useContext(UserContext)
}

export { UserProvider, useUser }
