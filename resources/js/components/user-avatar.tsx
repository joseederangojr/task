"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User } from "@/types";
import { cn } from "@/lib/utils";
import { memo } from "react";

interface UserAvatarProps {
    user: User;
    size?: "sm" | "md" | "lg";
    className?: string;
}

export const UserAvatar = memo(({ user, size = "md", className }: UserAvatarProps) => {
    const sizeClasses = {
        sm: "h-6 w-6",
        md: "h-7 w-7",
        lg: "h-9 w-9",
    };

    return (
        <Avatar
            className={cn(sizeClasses[size], "border-2 border-background", className)}>
            <AvatarImage src={"/placeholder.svg"} alt={user.name} />
            <AvatarFallback className="text-xs bg-mauve dark:bg-mauve text-white">
                {user.name.substring(0, 2)}
            </AvatarFallback>
        </Avatar>
    );
});

UserAvatar.displayName = "UserAvatar";
