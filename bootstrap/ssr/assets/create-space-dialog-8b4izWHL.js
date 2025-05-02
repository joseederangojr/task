import { jsx, jsxs } from "react/jsx-runtime";
import { B as Button } from "./button-BLClV2bc.js";
import { D as Dialog, b as DialogContent, c as DialogHeader, d as DialogTitle, f as DialogDescription, e as DialogFooter } from "./dialog-CIQG8v2s.js";
import { F as Form, a as FormField, b as FormItem, c as FormLabel, d as FormControl, I as Input, e as FormMessage } from "./input-BZBbPD7X.js";
import { useForm } from "@inertiajs/react";
import "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "../ssr.js";
import "@inertiajs/react/server";
import "react-dom/server";
import "@radix-ui/react-icons";
import "@radix-ui/react-toast";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "@radix-ui/react-label";
function CreateSpaceDialog(props) {
  const form = useForm({ name: "", type: "team" });
  const handleSubmit = (e) => {
    e.preventDefault();
    form.post("/api/space", {
      preserveState: true,
      onSuccess: () => {
        props.onOpenChange(false);
      }
    });
  };
  return /* @__PURE__ */ jsx(Dialog, { open: props.open, onOpenChange: props.onOpenChange, children: /* @__PURE__ */ jsx(DialogContent, { className: "sm:max-w-[425px]", children: /* @__PURE__ */ jsx(Form, { ...form, children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
    /* @__PURE__ */ jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsx(DialogTitle, { children: "Create Space" }),
      /* @__PURE__ */ jsx(DialogDescription, { children: "Organize your task by spaces" })
    ] }),
    /* @__PURE__ */ jsx(
      FormField,
      {
        data: form.data,
        name: "name",
        render: ({ field, setValue }) => /* @__PURE__ */ jsxs(FormItem, { children: [
          /* @__PURE__ */ jsx(FormLabel, { htmlFor: field.id }),
          /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
            Input,
            {
              ...field,
              onChange: (e) => setValue(e.target.value)
            }
          ) }),
          /* @__PURE__ */ jsx(FormMessage, {})
        ] })
      }
    ),
    /* @__PURE__ */ jsx(DialogFooter, { className: "mt-4", children: /* @__PURE__ */ jsx(
      Button,
      {
        type: "submit",
        disabled: form.processing,
        children: form.processing ? "Creating ..." : "Create"
      }
    ) })
  ] }) }) }) });
}
export {
  CreateSpaceDialog,
  CreateSpaceDialog as default
};
