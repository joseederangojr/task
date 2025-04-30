import * as React from "react";
import { Task } from "@/types";
import { cn } from "@/lib/utils";

interface TaskItemProps extends React.HTMLAttributes<HTMLDivElement> {
    task: Task;
}

export const TaskItem = React.forwardRef<HTMLDivElement, TaskItemProps>(
    ({ task, className, ...props }: TaskItemProps, ref) => {
        return (
            <div
                ref={ref}
                {...props}
                className={cn(
                    "z-10 w-[300px] cursor-pointer p-4 rounded-lg border border-dashed hover:border-solid shadow",
                    className,
                )}>
                <h3 className="text-lg font-bold">
                    #{task.id} {task.title}
                </h3>
                <p>{task.description}</p>
            </div>
        );
    },
);
