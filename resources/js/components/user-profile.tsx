import { CalendarIcon } from "@radix-ui/react-icons"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { getInitials } from "@/lib/utils"

type UserProfileProps = {
  name: string;
  joinedDate: string
}

function UserProfile(props: UserProfileProps) {
  const initials = getInitials(props.name)
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">{props.name}</Button>
      </HoverCardTrigger>
      <HoverCardContent avoidCollisions align="end" className="w-auto">
        <div className="flex space-x-4">
          <Avatar>
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{props.name}</h4>
            <div className="flex items-center pt-2">
              <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Joined {props.joinedDate}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

export { UserProfile }
