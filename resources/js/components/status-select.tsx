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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { type TaskStatus } from "@/types";
import { statusOptions } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { StatusDisplay } from "./status-display";
import { CaretUpDown, QuestionMark } from "@phosphor-icons/react";

interface StatusSelectProps {
    value: TaskStatus;
    onSelect: (value: TaskStatus) => void;
}

export const StatusSelect = React.memo(({ value, onSelect }: StatusSelectProps) => {
    const [open, setOpen] = React.useState(false);
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    className="justify-between w-full h-10 transition-all border-input"
                    data-dusk="status-select-trigger"
                    aria-expanded={open}>
                    {value ? (
                        <StatusDisplay status={value} />
                    ) : (
                        <div className="flex items-center gap-2">
                            <QuestionMark className="h-4 w-4 text-muted-foreground" />
                            <span>Select status</span>
                        </div>
                    )}
                    <CaretUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput placeholder="Search status..." />
                    <CommandList>
                        <CommandEmpty>No status found.</CommandEmpty>
                        <CommandGroup>
                            {statusOptions.map((statusOption) => {
                                return (
                                    <CommandItem
                                        key={statusOption.value}
                                        data-dusk={`status-select-item-${statusOption.value}`}
                                        onSelect={() => {
                                            onSelect(statusOption.value as TaskStatus);
                                            setOpen(false);
                                        }}
                                        className="flex items-center gap-2 py-2">
                                        <statusOption.Icon
                                            className={cn("h-4 w-4", statusOption.color)}
                                        />
                                        <span>{statusOption.label}</span>
                                    </CommandItem>
                                );
                            })}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
});

StatusSelect.displayName = "StatusSelect";
