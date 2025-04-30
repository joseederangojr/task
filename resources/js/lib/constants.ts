import { TaskStatus } from "@/types";
import {
    CheckCircle,
    Icon,
    ListChecks,
    MagicWand,
    WarningCircle,
    XCircle,
} from "@phosphor-icons/react";
export const statusConfig = {
    triage: {
        label: "Triage",
        color: "bg-yellow/20 text-yellow dark:bg-yellow/20 dark:text-yellow border-yellow/30 dark:border-yellow/30",
        iconColor: "text-yellow dark:text-yellow",
    },
    todo: {
        label: "To Do",
        color: "bg-blue/20 text-blue dark:bg-blue/20 dark:text-blue border-blue/30 dark:border-blue/30",
        iconColor: "text-blue dark:text-blue",
    },
    doing: {
        label: "Doing",
        color: "bg-mauve/20 text-mauve dark:bg-mauve/20 dark:text-mauve border-mauve/30 dark:border-mauve/30",
        iconColor: "text-mauve dark:text-mauve",
    },
    done: {
        label: "Done",
        color: "bg-green/20 text-green dark:bg-green/20 dark:text-green border-green/30 dark:border-green/30",
        iconColor: "text-green dark:text-green",
    },
    abandon: {
        label: "Abandoned",
        color: "bg-muted text-muted-foreground border-muted hover:text-foreground",
        iconColor: "text-muted-foreground",
    },
};

type StatusIcons = Record<TaskStatus, Icon>;
export const statusIcons: StatusIcons = {
    triage: WarningCircle,
    todo: ListChecks,
    doing: MagicWand,
    done: CheckCircle,
    abandon: XCircle,
};

type StatusOption = {
    value: TaskStatus;
    label: string;
    Icon: Icon;
    color: string;
};
export const statusOptions: StatusOption[] = [
    {
        value: "triage",
        label: "Triage",
        Icon: statusIcons.triage,
        color: "text-yellow dark:text-yellow",
    },
    {
        value: "todo",
        label: "To Do",
        Icon: statusIcons.todo,
        color: "text-blue dark:text-blue",
    },
    {
        value: "doing",
        label: "Doing",
        Icon: statusIcons.doing,
        color: "text-mauve dark:text-mauve",
    },
    {
        value: "done",
        label: "Done",
        Icon: statusIcons.done,
        color: "text-green dark:text-green",
    },
    {
        value: "abandon",
        label: "Abandoned",
        Icon: statusIcons.abandon,
        color: "text-muted-foreground",
    },
];
