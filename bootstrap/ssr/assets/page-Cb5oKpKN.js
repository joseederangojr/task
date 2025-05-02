import { jsx, jsxs } from "react/jsx-runtime";
import { A as AuthLayout } from "./auth-layout-Cp0f2hIE.js";
import { MixIcon } from "@radix-ui/react-icons";
import { SignUpForm } from "./signup-form-D5ANjX2G.js";
import "./input-BZBbPD7X.js";
import "react";
import "@radix-ui/react-slot";
import "../ssr.js";
import "@inertiajs/react";
import "@inertiajs/react/server";
import "react-dom/server";
import "@radix-ui/react-toast";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
import "./button-BLClV2bc.js";
function SignInPage() {
  return /* @__PURE__ */ jsx(AuthLayout, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-2 w-[500px] -mt-20", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-center items-center", children: [
      /* @__PURE__ */ jsx(MixIcon, { className: "h-8 w-8 mr-2" }),
      " ",
      /* @__PURE__ */ jsx("h1", { className: "text-3xl text-center", children: "Task" })
    ] }),
    /* @__PURE__ */ jsx("h3", { className: "text-sm text-muted-foreground text-center", children: "Manage your tasks from multiple spaces in one place" }),
    /* @__PURE__ */ jsx(SignUpForm, {})
  ] }) });
}
export {
  SignInPage as default
};
