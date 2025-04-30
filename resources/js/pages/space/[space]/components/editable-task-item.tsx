"use client";

import { useState, useRef, useEffect } from "react";
import {
    CalendarIcon,
    Clock,
    ListTodo,
    AlertCircle,
    CheckCircle2,
    XCircle,
    Pencil,
    Check,
    X,
} from "lucide-react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { TaskDialog } from "@/components/task-dialog";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";

export type TaskStatus = "triage" | "todo" | "doing" | "done" | "abandon";

export interface User {
    id: string;
    name: string;
    avatar?: string;
    initials: string;
}

export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    assignedTo: User;
    dueDate: Date;
}

interface EditableKanbanCardProps {
    task: Task;
    users: User[];
    onTaskUpdate: (updatedTask: Task) => void;
}

export const statusOptions = [
    {
        value: "triage",
        label: "Triage",
        icon: AlertCircle,
        color: "text-yellow dark:text-yellow",
    },
    {
        value: "todo",
        label: "To Do",
        icon: ListTodo,
        color: "text-blue dark:text-blue",
    },
    {
        value: "doing",
        label: "Doing",
        icon: Clock,
        color: "text-mauve dark:text-mauve",
    },
    {
        value: "done",
        label: "Done",
        icon: CheckCircle2,
        color: "text-green dark:text-green",
    },
    {
        value: "abandon",
        label: "Abandoned",
        icon: XCircle,
        color: "text-muted-foreground",
    },
];

const statusConfig = {
    triage: {
        label: "Triage",
        icon: AlertCircle,
        color: "bg-yellow/20 text-yellow dark:bg-yellow/20 dark:text-yellow border-yellow/30 dark:border-yellow/30",
        iconColor: "text-yellow dark:text-yellow",
    },
    todo: {
        label: "To Do",
        icon: ListTodo,
        color: "bg-blue/20 text-blue dark:bg-blue/20 dark:text-blue border-blue/30 dark:border-blue/30",
        iconColor: "text-blue dark:text-blue",
    },
    doing: {
        label: "Doing",
        icon: Clock,
        color: "bg-mauve/20 text-mauve dark:bg-mauve/20 dark:text-mauve border-mauve/30 dark:border-mauve/30",
        iconColor: "text-mauve dark:text-mauve",
    },
    done: {
        label: "Done",
        icon: CheckCircle2,
        color: "bg-green/20 text-green dark:bg-green/20 dark:text-green border-green/30 dark:border-green/30",
        iconColor: "text-green dark:text-green",
    },
    abandon: {
        label: "Abandoned",
        icon: XCircle,
        color: "bg-muted text-muted-foreground border-muted",
        iconColor: "text-muted-foreground",
    },
};

export function EditableKanbanCard({
    task,
    users,
    onTaskUpdate,
}: EditableKanbanCardProps) {
    const [editingTitle, setEditingTitle] = useState(false);
    const [editingDescription, setEditingDescription] = useState(false);
    const [editingStatus, setEditingStatus] = useState(false);
    const [editingAssignee, setEditingAssignee] = useState(false);
    const [editingDueDate, setEditingDueDate] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [status, setStatus] = useState(task.status);
    const [assignedTo, setAssignedTo] = useState(task.assignedTo);
    const [dueDate, setDueDate] = useState(task.dueDate);

    const titleInputRef = useRef<HTMLInputElement>(null);
    const descriptionInputRef = useRef<HTMLTextAreaElement>(null);

    const config = statusConfig[status];
    const StatusIcon = config.icon;

    useEffect(() => {
        if (editingTitle && titleInputRef.current) {
            titleInputRef.current.focus();
        }
        if (editingDescription && descriptionInputRef.current) {
            descriptionInputRef.current.focus();
        }
    }, [editingTitle, editingDescription]);

    const saveChanges = () => {
        onTaskUpdate({
            ...task,
            title,
            description,
            status,
            assignedTo,
            dueDate,
        });
    };

    const handleTitleSave = () => {
        setEditingTitle(false);
        saveChanges();
    };

    const handleDescriptionSave = () => {
        setEditingDescription(false);
        saveChanges();
    };

    const handleStatusChange = (newStatus: TaskStatus) => {
        setStatus(newStatus);
        setEditingStatus(false);
        onTaskUpdate({
            ...task,
            status: newStatus,
        });
    };

    const handleAssigneeChange = (userId: string) => {
        const newAssignee = users.find((user) => user.id === userId) || task.assignedTo;
        setAssignedTo(newAssignee);
        setEditingAssignee(false);
        onTaskUpdate({
            ...task,
            assignedTo: newAssignee,
        });
    };

    const handleDateChange = (date: Date | undefined) => {
        if (date) {
            setDueDate(date);
            setEditingDueDate(false);
            onTaskUpdate({
                ...task,
                dueDate: date,
            });
        }
    };

    const handleTaskUpdate = (updatedTask: Task) => {
        setTitle(updatedTask.title);
        setDescription(updatedTask.description);
        setStatus(updatedTask.status);
        setAssignedTo(updatedTask.assignedTo);
        setDueDate(updatedTask.dueDate);
        onTaskUpdate(updatedTask);
    };

    return (
        <>
            <Card
                className={cn(
                    "w-full max-w-[350px] shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border-l-4",
                    status === "triage" && "border-l-yellow dark:border-l-yellow",
                    status === "todo" && "border-l-blue dark:border-l-blue",
                    status === "doing" && "border-l-mauve dark:border-l-mauve",
                    status === "done" && "border-l-green dark:border-l-green",
                    status === "abandon" && "border-l-muted-foreground",
                )}>
                <CardHeader className="pb-2 pt-4">
                    <div className="flex justify-between items-start gap-2">
                        {editingTitle ? (
                            <div className="flex-1">
                                <Input
                                    ref={titleInputRef}
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="text-lg font-medium"
                                    onBlur={handleTitleSave}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") handleTitleSave();
                                        if (e.key === "Escape") {
                                            setTitle(task.title);
                                            setEditingTitle(false);
                                        }
                                    }}
                                />
                                <div className="flex gap-1 mt-1">
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-6 w-6"
                                        onClick={handleTitleSave}>
                                        <Check className="h-3 w-3" />
                                    </Button>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-6 w-6"
                                        onClick={() => {
                                            setTitle(task.title);
                                            setEditingTitle(false);
                                        }}>
                                        <X className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <CardTitle
                                className="text-lg font-medium line-clamp-1 group flex items-center gap-1 cursor-pointer hover:text-mauve dark:hover:text-mauve"
                                onClick={() => setEditingTitle(true)}>
                                {title}
                                <Pencil className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </CardTitle>
                        )}

                        <Popover open={editingStatus} onOpenChange={setEditingStatus}>
                            <PopoverTrigger asChild>
                                <Badge
                                    className={cn(
                                        "shrink-0 flex items-center gap-1 font-normal cursor-pointer hover:bg-opacity-30 dark:hover:bg-opacity-30",
                                        config.color,
                                    )}>
                                    <StatusIcon
                                        className={cn("h-3 w-3", config.iconColor)}
                                    />
                                    {config.label}
                                </Badge>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                                <Command>
                                    <CommandList>
                                        <CommandGroup>
                                            {statusOptions.map((statusOption) => (
                                                <CommandItem
                                                    key={statusOption.value}
                                                    onSelect={() =>
                                                        handleStatusChange(
                                                            statusOption.value as TaskStatus,
                                                        )
                                                    }
                                                    className="flex items-center gap-2 py-2">
                                                    <statusOption.icon
                                                        className={cn(
                                                            "h-4 w-4",
                                                            statusOption.color,
                                                        )}
                                                    />
                                                    <span>{statusOption.label}</span>
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>

                    {editingDescription ? (
                        <div className="mt-2">
                            <Textarea
                                ref={descriptionInputRef}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="min-h-[60px] text-sm resize-none"
                                onBlur={handleDescriptionSave}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && e.ctrlKey)
                                        handleDescriptionSave();
                                    if (e.key === "Escape") {
                                        setDescription(task.description);
                                        setEditingDescription(false);
                                    }
                                }}
                            />
                            <div className="flex gap-1 mt-1">
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-6 w-6"
                                    onClick={handleDescriptionSave}>
                                    <Check className="h-3 w-3" />
                                </Button>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-6 w-6"
                                    onClick={() => {
                                        setDescription(task.description);
                                        setEditingDescription(false);
                                    }}>
                                    <X className="h-3 w-3" />
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <CardDescription
                            className="line-clamp-2 mt-1 group flex items-start gap-1 cursor-pointer hover:text-foreground"
                            onClick={() => setEditingDescription(true)}>
                            {description}
                            <Pencil className="h-3 w-3 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </CardDescription>
                    )}
                </CardHeader>

                <CardContent className="pb-2">
                    <Popover open={editingDueDate} onOpenChange={setEditingDueDate}>
                        <PopoverTrigger asChild>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer hover:text-foreground group">
                                <CalendarIcon className="h-4 w-4" />
                                <span>{format(dueDate, "MMM d, yyyy")}</span>
                                <Pencil className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={dueDate}
                                onSelect={handleDateChange}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </CardContent>

                <CardFooter className="pt-0 pb-4 flex justify-between items-center">
                    <Popover open={editingAssignee} onOpenChange={setEditingAssignee}>
                        <PopoverTrigger asChild>
                            <div className="flex items-center gap-2 cursor-pointer group">
                                <Avatar className="h-7 w-7 border-2 border-background">
                                    <AvatarImage
                                        src={assignedTo.avatar || "/placeholder.svg"}
                                        alt={assignedTo.name}
                                    />
                                    <AvatarFallback className="text-xs bg-mauve dark:bg-mauve text-white">
                                        {assignedTo.initials}
                                    </AvatarFallback>
                                </Avatar>
                                <span className="text-sm font-medium group-hover:text-mauve dark:group-hover:text-mauve transition-colors">
                                    {assignedTo.name}
                                </span>
                                <Pencil className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                            <Command>
                                <CommandInput placeholder="Search users..." />
                                <CommandList>
                                    <CommandEmpty>No users found.</CommandEmpty>
                                    <CommandGroup>
                                        {users.map((user) => (
                                            <CommandItem
                                                key={user.id}
                                                onSelect={() =>
                                                    handleAssigneeChange(user.id)
                                                }
                                                className="flex items-center gap-2 py-2">
                                                <Avatar className="h-6 w-6">
                                                    <AvatarImage
                                                        src={
                                                            user.avatar ||
                                                            "/placeholder.svg"
                                                        }
                                                    />
                                                    <AvatarFallback className="text-xs bg-mauve dark:bg-mauve text-white">
                                                        {user.initials}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span>{user.name}</span>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>

                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 rounded-full hover:bg-muted"
                        onClick={() => setDialogOpen(true)}>
                        Edit
                    </Button>
                </CardFooter>
            </Card>

            <TaskDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                mode="edit"
                task={task}
                users={users}
                onTaskUpdate={handleTaskUpdate}
            />
        </>
    );
}
