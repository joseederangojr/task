import { jsx, jsxs } from "react/jsx-runtime";
import { A as AppLayout } from "./app-layout-BEvtKoCZ.js";
import "react";
import "@radix-ui/react-icons";
import "@radix-ui/react-select";
import "../ssr.js";
import "@inertiajs/react";
import "@inertiajs/react/server";
import "react-dom/server";
import "@radix-ui/react-toast";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-separator";
import "./button-BLClV2bc.js";
import "@radix-ui/react-slot";
import "./avatar-CMi-SjUC.js";
import "@radix-ui/react-avatar";
import "@radix-ui/react-dropdown-menu";
function DashboardPage(props) {
  return /* @__PURE__ */ jsx(AppLayout, { children: /* @__PURE__ */ jsxs("h1", { className: "text-2xl", children: [
    "Hi ",
    /* @__PURE__ */ jsxs("span", { className: "font-bold", children: [
      props.whoami.name,
      "!"
    ] })
  ] }) });
}
export {
  DashboardPage as default
};
