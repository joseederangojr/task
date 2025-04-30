"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { UserAvatar } from "@/components/user-avatar";
import { User } from "@/types";
import { CheckIcon } from "@radix-ui/react-icons";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { User as UserIcon, CaretUpDown as CaretUpDownIcon } from "@phosphor-icons/react";

interface UserSelectProps {
    users: User[];
    user?: User;
    onUserChange: (user: User) => void;
}

export const UserSelect = React.memo(
    ({ users, user: selectedUser, onUserChange }: UserSelectProps) => {
        const [open, setOpen] = React.useState(false);
        return (
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        className="justify-between w-full h-10 transition-all border-input"
                        aria-expanded={open}
                        data-dusk="user-select-trigger">
                        {selectedUser ? (
                            <div className="flex items-center gap-2">
                                <UserAvatar user={selectedUser} size="sm" />
                                <span data-dusk="user-select-label">
                                    {selectedUser.name}
                                </span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <UserIcon className="h-4 w-4" />
                                <span data-dusk="user-select-label">Select user</span>
                            </div>
                        )}
                        <CaretUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                    <Command>
                        <CommandInput placeholder="Search users..." />
                        <CommandList>
                            <CommandEmpty>No users found.</CommandEmpty>
                            <CommandGroup>
                                {users.map((user) => (
                                    <CommandItem
                                        key={user.id}
                                        data-dusk={`user-select-item-${user.id}`}
                                        onSelect={() => {
                                            onUserChange(user);
                                            setOpen(false);
                                        }}
                                        className="flex items-center gap-2 py-2">
                                        <UserAvatar user={user} size="sm" />
                                        <span>{user.name}</span>
                                        <CheckIcon
                                            className={cn(
                                                "ml-auto h-4 w-4",
                                                selectedUser?.id === user.id
                                                    ? "opacity-100"
                                                    : "opacity-0",
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        );
    },
);

UserSelect.displayName = "UserSelect";
