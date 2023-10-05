import * as React from 'react'
import { Sidebar, SidebarItemProps } from '@/components/sidebar'
import { Breadcrumb } from '@/components/breadcrumb'
import { DashboardIcon, MixIcon, GearIcon } from '@radix-ui/react-icons'
import { usePage } from '@inertiajs/react'
import { PageProps } from '@/types'
import { UserProfile } from '@/components/user-profile'
import { format } from 'date-fns'

const sidebarItems: SidebarItemProps[] = [
  {
    label: 'Dashboard',
    icon: <DashboardIcon />,
    href: '/'
  },
  {
    label: 'Spaces',
    icon: <MixIcon />,
    href: '/space'
  },
  {
    label: 'Settings',
    icon: <GearIcon />,
    href: '/setting'
  },
]

function AppLayout(props: React.PropsWithChildren) {
  const { props: { breadcrumbs, auth: { user } } } = usePage<PageProps>()
  return (
    <div className='flex h-screen w-screen overflow-hidden'>
      <div className='w-[250px] h-screen border-r p-2'>
        <Sidebar items={sidebarItems} />
      </div>
      <div className='w-full p-4'>
        <div className='flex mb-2 justify-between'>
          <Breadcrumb items={breadcrumbs} />
          <UserProfile name={user!.name} joinedDate={format(new Date(user!.created_at), 'MMMM yyyy')} />
        </div>

        {props.children}
      </div>
    </div>
  )
}

export { AppLayout }
