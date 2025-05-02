import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { S as ScrollArea, T as TaskList, a as ScrollBar } from "./task-list--vg8FkZc.js";
import { A as AppLayout } from "./app-layout-BEvtKoCZ.js";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { router } from "@inertiajs/react";
import { TaskItem } from "./task-item-CZBFdsos.js";
import { DraggableTaskItem } from "./draggable-task-item-DoDW4W0r.js";
import { DroppableTaskItem } from "./droppable-task-item-BpfbdeGB.js";
import "@radix-ui/react-scroll-area";
import "../ssr.js";
import "@inertiajs/react/server";
import "react-dom/server";
import "@radix-ui/react-icons";
import "@radix-ui/react-toast";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "./button-BLClV2bc.js";
import "@radix-ui/react-slot";
import "./create-task-dialog-DxlEwKMJ.js";
import "date-fns";
import "react-day-picker";
import "@radix-ui/react-popover";
import "@phosphor-icons/react";
import "cmdk";
import "./dialog-CIQG8v2s.js";
import "@radix-ui/react-dialog";
import "./input-BZBbPD7X.js";
import "@radix-ui/react-label";
import "./avatar-CMi-SjUC.js";
import "@radix-ui/react-avatar";
import "@radix-ui/react-select";
import "@radix-ui/react-separator";
import "@radix-ui/react-dropdown-menu";
import "./task-item-empty-Dgdp-cwr.js";
function SpaceByIdPage(props) {
  var _a, _b;
  const [activeTask, setActiveTask] = React.useState(null);
  const handleDragEnd = (event) => {
    var _a2, _b2, _c, _d, _e, _f, _g, _h;
    const active = (_b2 = (_a2 = event.active) == null ? void 0 : _a2.data.current) == null ? void 0 : _b2.task;
    const over = (_c = event.over) == null ? void 0 : _c.data.current;
    setActiveTask(null);
    if (active && over) {
      const isOverTask = over.task && !over.column;
      console.log({ isOverTask, column: over.column, task: over.task });
      const data = {
        from_column_id: active == null ? void 0 : active.column_id,
        from_order: active.order,
        to_column_id: isOverTask ? (_d = over.task) == null ? void 0 : _d.column_id : (_e = over.column) == null ? void 0 : _e.id,
        to_order: isOverTask ? (_f = over.task) == null ? void 0 : _f.order : (_h = (_g = over.column) == null ? void 0 : _g.tasks) == null ? void 0 : _h.length
      };
      router.patch(`/api/task/${active.id}/move`, data);
    }
  };
  const handleDragStart = (event) => {
    var _a2, _b2;
    setActiveTask((_b2 = (_a2 = event.active.data) == null ? void 0 : _a2.current) == null ? void 0 : _b2.task);
  };
  return /* @__PURE__ */ jsx(AppLayout, { children: /* @__PURE__ */ jsx(DndContext, { onDragEnd: handleDragEnd, onDragStart: handleDragStart, children: /* @__PURE__ */ jsxs(ScrollArea, { className: "w-full max-w-[100vw]  whitespace-nowrap", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex w-full mb-4 space-x-5", children: [
      (_b = (_a = props.space) == null ? void 0 : _a.columns) == null ? void 0 : _b.map((column) => {
        var _a2;
        return /* @__PURE__ */ jsx(
          TaskList,
          {
            column,
            space: props.space,
            team: props.team,
            children: (_a2 = column == null ? void 0 : column.tasks) == null ? void 0 : _a2.map((task) => {
              return /* @__PURE__ */ jsx(DroppableTaskItem, { task, children: /* @__PURE__ */ jsx(DraggableTaskItem, { task, children: /* @__PURE__ */ jsx(TaskItem, { task }) }) }, `task-${task.id}`);
            })
          },
          `column-${column.id}`
        );
      }),
      /* @__PURE__ */ jsx(DragOverlay, { children: activeTask ? /* @__PURE__ */ jsx(TaskItem, { task: activeTask }) : void 0 })
    ] }),
    /* @__PURE__ */ jsx(ScrollBar, { orientation: "horizontal" })
  ] }) }) });
}
export {
  SpaceByIdPage as default
};
