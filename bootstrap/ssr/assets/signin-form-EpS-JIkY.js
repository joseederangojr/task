import { jsx, jsxs } from "react/jsx-runtime";
import { F as Form, a as FormField, b as FormItem, c as FormLabel, d as FormControl, I as Input, e as FormMessage, f as FormDescription } from "./input-BZBbPD7X.js";
import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { c as cn } from "../ssr.js";
import { B as Button } from "./button-BLClV2bc.js";
import { useForm, Link } from "@inertiajs/react";
import "@radix-ui/react-slot";
import "@radix-ui/react-label";
import "class-variance-authority";
import "@inertiajs/react/server";
import "react-dom/server";
import "@radix-ui/react-toast";
import "clsx";
import "tailwind-merge";
const Checkbox = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  CheckboxPrimitive.Root,
  {
    ref,
    className: cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(
      CheckboxPrimitive.Indicator,
      {
        className: cn("flex items-center justify-center text-current"),
        children: /* @__PURE__ */ jsx(CheckIcon, { className: "h-4 w-4" })
      }
    )
  }
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;
function SignInForm() {
  const form = useForm({
    email: "",
    password: "",
    remember: true
  });
  const onSubmit = async (event) => {
    event.preventDefault();
    form.post("/api/auth/signin");
  };
  return /* @__PURE__ */ jsx(Form, { ...form, children: /* @__PURE__ */ jsxs("form", { className: "flex flex-col space-y-4", onSubmit, children: [
    /* @__PURE__ */ jsx(
      FormField,
      {
        data: form.data,
        name: "email",
        render: ({ setValue, error, field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
          /* @__PURE__ */ jsx(FormLabel, { htmlFor: field.id, children: "Email" }),
          /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
            Input,
            {
              type: "email",
              onChange: (event) => setValue(event.target.value),
              ...field
            }
          ) }),
          error ? /* @__PURE__ */ jsx(FormMessage, {}) : /* @__PURE__ */ jsx(FormDescription, { children: "We won't sell your email address" })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      FormField,
      {
        data: form.data,
        name: "password",
        render: ({ setValue, field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
          /* @__PURE__ */ jsx(FormLabel, { htmlFor: field.id, children: "Password" }),
          /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
            Input,
            {
              type: "password",
              onChange: (event) => setValue(event.target.value),
              ...field
            }
          ) }),
          /* @__PURE__ */ jsx(FormMessage, {})
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      FormField,
      {
        data: form.data,
        name: "remember",
        render: ({ field, setValue }) => /* @__PURE__ */ jsxs(FormItem, { className: "flex items-center space-x-2 space-y-0", children: [
          /* @__PURE__ */ jsx(
            Checkbox,
            {
              id: field.id,
              checked: field.value,
              onCheckedChange: (checked) => setValue(
                checked === "indeterminate" ? false : checked
              )
            }
          ),
          /* @__PURE__ */ jsx(FormLabel, { htmlFor: field.id, className: "cursor-pointer", children: "Remember me" })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(FormItem, { children: /* @__PURE__ */ jsx(Button, { className: "w-full", type: "submit", disabled: form.processing, children: form.processing ? "Signing in..." : "Sign in" }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex  justify-center text-sm", children: [
      /* @__PURE__ */ jsx("span", { className: "text-muted-foreground pr-2", children: "Don't have account yet?" }),
      /* @__PURE__ */ jsx(
        Link,
        {
          href: "/signup",
          className: "text-primary font-bold hover:underline",
          children: "Sign up"
        }
      )
    ] })
  ] }) });
}
export {
  SignInForm
};
