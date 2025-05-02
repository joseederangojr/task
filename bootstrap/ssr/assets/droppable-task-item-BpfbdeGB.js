import { jsxs, jsx } from "react/jsx-runtime";
import { useDroppable } from "@dnd-kit/core";
import { TaskItemEmpty } from "./task-item-empty-Dgdp-cwr.js";
const DroppableTaskItem = ({ task, children }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: `droppable-task-${task.id}`,
    data: { task }
  });
  return /* @__PURE__ */ jsxs("div", { ref: setNodeRef, children: [
    isOver ? /* @__PURE__ */ jsx(TaskItemEmpty, {}) : void 0,
    children
  ] });
};
export {
  DroppableTaskItem
};
