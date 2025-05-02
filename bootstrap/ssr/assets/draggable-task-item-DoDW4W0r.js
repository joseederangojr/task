import { jsx } from "react/jsx-runtime";
import * as React from "react";
import { useDraggable } from "@dnd-kit/core";
const DraggableTaskItem = ({ task, children }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `draggable-task-${task.id}`,
    data: { task }
  });
  if (transform) return null;
  return /* @__PURE__ */ jsx("div", { ref: setNodeRef, children: React.Children.map(
    children,
    (el) => React.cloneElement(el, {
      ...listeners,
      ...attributes
    })
  ) });
};
export {
  DraggableTaskItem
};
