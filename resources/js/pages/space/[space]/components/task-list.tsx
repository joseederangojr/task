import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Space, Column, User } from "@/types";
import { useDroppable } from "@dnd-kit/core";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { CreateTaskDialog } from "./create-task-dialog";

type TaskListProps = {
    space: Space;
    column: Column;
    team: User[];
};

export const TaskList = ({
    children,
    ...props
}: React.PropsWithChildren<TaskListProps>) => {
    const { setNodeRef } = useDroppable({
        id: `column-${props.column.id}`,
        data: { column: props.column },
    });

    const [open, setOpen] = React.useState(false);

    return (
        <div
            ref={setNodeRef}
            className="flex flex-col flex-shrink-0 p-4 border rounded-lg h-[80vh]">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">{props.column.name}</h2>
                <CreateTaskDialog {...props} open={open} onOpenChange={setOpen}>
                    <Button variant="ghost">
                        <PlusIcon />
                    </Button>
                </CreateTaskDialog>
            </div>
            <ScrollArea className="w-full h-full mt-4 !overflow-[unset]">
                <div className="flex flex-col flex-1 space-y-4 mr-4">
                    <div className="w-[300px]" />
                    {children}
                </div>
            </ScrollArea>
        </div>
    );
};
