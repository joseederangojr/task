import * as React from "react";
import { Task } from "@/types";
import { useDroppable } from "@dnd-kit/core";
import { TaskItemEmpty } from "./task-item-empty";

type DroppableTaskItemProps = {
    task: Task;
} & React.PropsWithChildren;

export const DroppableTaskItem = ({ task, children }: DroppableTaskItemProps) => {
    const { isOver, setNodeRef } = useDroppable({
        id: `droppable-task-${task.id}`,
        data: { task },
    });

    return (
        <div ref={setNodeRef}>
            {isOver ? <TaskItemEmpty /> : undefined}
            {children}
        </div>
    );
};
