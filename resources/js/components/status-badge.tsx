"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { type TaskStatus } from "@/types";
import { memo } from "react";
import { statusConfig, statusIcons } from "@/lib/constants";

interface StatusBadgeProps {
    status: TaskStatus;
    className?: string;
    onClick?: () => void;
}
export const StatusBadge = memo(({ status, className, onClick }: StatusBadgeProps) => {
    const config = statusConfig[status];
    const StatusIcon = statusIcons[status];

    return (
        <Badge
            className={cn(
                "shrink-0 flex items-center gap-1 font-normal",
                config.color,
                onClick && "cursor-pointer hover:bg-opacity-30 dark:hover:bg-opacity-30",
                className,
            )}
            onClick={onClick}>
            <StatusIcon className={cn("h-3 w-3", config.iconColor)} />
            {config.label}
        </Badge>
    );
});

StatusBadge.displayName = "StatusBadge";
