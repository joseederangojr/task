import { statusIcons, statusOptions } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { TaskStatus } from "@/types";
import * as React from "react";

type StatusDisplayProps = {
    status: TaskStatus;
};

export const StatusDisplay = React.memo(({ status }: StatusDisplayProps) => {
    const statusOption = statusOptions.find((s) => s.value === status);
    if (!statusOption) return null;

    const Icon = statusIcons[status];

    return (
        <div className="flex items-center gap-2">
            <Icon className={cn("h-4 w-4", statusOption.color)} />
            <span data-dusk="status-display-label">{statusOption.label}</span>
        </div>
    );
});
