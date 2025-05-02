import { jsxs, jsx } from "react/jsx-runtime";
import * as React from "react";
import { c as cn } from "../ssr.js";
import "@inertiajs/react";
import "@inertiajs/react/server";
import "react-dom/server";
import "@radix-ui/react-icons";
import "@radix-ui/react-toast";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
const TaskItem = React.forwardRef(
  ({ task, className, ...props }, ref) => {
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        ...props,
        className: cn(
          "z-10 w-[300px] cursor-pointer p-4 rounded-lg border border-dashed hover:border-solid shadow",
          className
        ),
        children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold", children: [
            "#",
            task.id,
            " ",
            task.title
          ] }),
          /* @__PURE__ */ jsx("p", { children: task.description })
        ]
      }
    );
  }
);
export {
  TaskItem
};
