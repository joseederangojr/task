import { jsx, jsxs } from "react/jsx-runtime";
import { F as Form, a as FormField, b as FormItem, c as FormLabel, d as FormControl, I as Input, e as FormMessage, f as FormDescription } from "./input-BZBbPD7X.js";
import { B as Button } from "./button-BLClV2bc.js";
import { useForm, Link } from "@inertiajs/react";
import "react";
import "@radix-ui/react-slot";
import "../ssr.js";
import "@inertiajs/react/server";
import "react-dom/server";
import "@radix-ui/react-icons";
import "@radix-ui/react-toast";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
function SignUpForm() {
  const form = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });
  const onSubmit = async (event) => {
    event.preventDefault();
    form.post("/api/auth/signup");
  };
  return /* @__PURE__ */ jsx(Form, { ...form, children: /* @__PURE__ */ jsxs("form", { className: "flex flex-col space-y-4", onSubmit, children: [
    /* @__PURE__ */ jsx(
      FormField,
      {
        data: form.data,
        name: "name",
        render: ({ field, setValue }) => /* @__PURE__ */ jsxs(FormItem, { children: [
          /* @__PURE__ */ jsx(FormLabel, { htmlFor: field.id, children: "Name" }),
          /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
            Input,
            {
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
        name: "email",
        render: ({ field, error, setValue }) => /* @__PURE__ */ jsxs(FormItem, { children: [
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
        render: ({ field, setValue }) => /* @__PURE__ */ jsxs(FormItem, { children: [
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
        name: "password_confirmation",
        render: ({ field, setValue }) => /* @__PURE__ */ jsxs(FormItem, { children: [
          /* @__PURE__ */ jsx(FormLabel, { htmlFor: field.id, children: "Password Confirmation" }),
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
    /* @__PURE__ */ jsx(FormItem, { children: /* @__PURE__ */ jsx(
      Button,
      {
        className: "mt-2 w-full",
        type: "submit",
        disabled: form.processing,
        children: form.processing ? "Signing up..." : "Sign up"
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "flex  justify-center text-sm", children: [
      /* @__PURE__ */ jsx("span", { className: "text-muted-foreground pr-2", children: "Already have account?" }),
      /* @__PURE__ */ jsx(
        Link,
        {
          href: "/signin",
          className: "text-primary font-bold hover:underline",
          children: "Sign In"
        }
      )
    ] })
  ] }) });
}
export {
  SignUpForm
};
