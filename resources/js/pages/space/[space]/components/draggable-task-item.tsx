import * as React from "react";
import { Task } from "@/types";
import { useDraggable } from "@dnd-kit/core";

type DraggableTaskItemProps = {
    task: Task;
} & React.PropsWithChildren;

export const DraggableTaskItem = ({ task, children }: DraggableTaskItemProps) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: `draggable-task-${task.id}`,
        data: { task },
    });

    if (transform) return null;

    return (
        <div ref={setNodeRef}>
            {React.Children.map(children, (el) =>
                React.cloneElement(el as React.ReactElement, {
                    ...listeners,
                    ...attributes,
                }),
            )}
        </div>
    );
};
