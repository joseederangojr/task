import { jsxs, jsx } from "react/jsx-runtime";
import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { c as cn } from "../ssr.js";
import { useDroppable } from "@dnd-kit/core";
import { B as Button } from "./button-BLClV2bc.js";
import { PlusIcon } from "@radix-ui/react-icons";
import { CreateTaskDialog } from "./create-task-dialog-DxlEwKMJ.js";
const ScrollArea = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  ScrollAreaPrimitive.Root,
  {
    ref,
    className: cn("relative overflow-hidden", className),
    ...props,
    children: [
      /* @__PURE__ */ jsx(ScrollAreaPrimitive.Viewport, { className: "h-full w-full rounded-[inherit]", children }),
      /* @__PURE__ */ jsx(ScrollBar, {}),
      /* @__PURE__ */ jsx(ScrollAreaPrimitive.Corner, {})
    ]
  }
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;
const ScrollBar = React.forwardRef(({ className, orientation = "vertical", ...props }, ref) => /* @__PURE__ */ jsx(
  ScrollAreaPrimitive.ScrollAreaScrollbar,
  {
    ref,
    orientation,
    className: cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(ScrollAreaPrimitive.ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" })
  }
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;
const TaskList = ({
  children,
  ...props
}) => {
  const { setNodeRef } = useDroppable({
    id: `column-${props.column.id}`,
    data: { column: props.column }
  });
  const [open, setOpen] = React.useState(false);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: setNodeRef,
      className: "flex flex-col flex-shrink-0 p-4 border rounded-lg h-[80vh]",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold", children: props.column.name }),
          /* @__PURE__ */ jsx(CreateTaskDialog, { ...props, open, onOpenChange: setOpen, children: /* @__PURE__ */ jsx(Button, { variant: "ghost", children: /* @__PURE__ */ jsx(PlusIcon, {}) }) })
        ] }),
        /* @__PURE__ */ jsx(ScrollArea, { className: "w-full h-full mt-4 !overflow-[unset]", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col flex-1 space-y-4 mr-4", children: [
          /* @__PURE__ */ jsx("div", { className: "w-[300px]" }),
          children
        ] }) })
      ]
    }
  );
};
const taskList = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  TaskList
}, Symbol.toStringTag, { value: "Module" }));
export {
  ScrollArea as S,
  TaskList as T,
  ScrollBar as a,
  taskList as t
};
