import { jsx } from "react/jsx-runtime";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { c as cn } from "../ssr.js";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva } from "class-variance-authority";
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  LabelPrimitive.Root,
  {
    ref,
    className: cn(labelVariants(), className),
    ...props
  }
));
Label.displayName = LabelPrimitive.Root.displayName;
const FormContext = React.createContext(void 0);
const FormFieldContext = React.createContext(void 0);
const Form = ({
  children,
  ...form
}) => {
  return /* @__PURE__ */ jsx(FormContext.Provider, { value: form, children });
};
const useFormContext = () => {
  const context = React.useContext(FormContext);
  if (context === void 0) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
const useFormFieldContext = () => {
  return React.useContext(FormFieldContext);
};
const FormField = (props) => {
  const id = React.useId();
  const formContext = useFormContext();
  if (!formContext) {
    throw new Error("useFormContext should be used within <Form>");
  }
  const value = formContext.data[props.name];
  const error = formContext.errors[props.name];
  const renderProps = {
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    error,
    setValue(value2) {
      formContext.setData(props.name, value2);
    },
    field: {
      id,
      name: props.name,
      value
    }
  };
  return /* @__PURE__ */ jsx(
    FormFieldContext.Provider,
    {
      value: { id, name: props.name },
      children: props.render(renderProps)
    }
  );
};
const useFormField = () => {
  const formContext = useFormContext();
  const fieldContext = useFormFieldContext();
  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }
  const id = fieldContext.id;
  const value = formContext.data[fieldContext.name];
  const error = formContext.errors[fieldContext.name];
  return {
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    error,
    setValue(value2) {
      formContext.setData(fieldContext.name, value2);
    },
    field: {
      ...fieldContext,
      value
    }
  };
};
const FormItem = React.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsx("div", { ref, className: cn("space-y-2", className), ...props });
  }
);
FormItem.displayName = "FormItem";
const FormLabel = React.forwardRef(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();
  return /* @__PURE__ */ jsx(
    Label,
    {
      ref,
      className: cn(error && "text-destructive", className),
      htmlFor: formItemId,
      ...props
    }
  );
});
FormLabel.displayName = "FormLabel";
const FormControl = React.forwardRef(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
  return /* @__PURE__ */ jsx(
    Slot,
    {
      ref,
      id: formItemId,
      "aria-describedby": !error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`,
      "aria-invalid": !!error,
      ...props
    }
  );
});
FormControl.displayName = "FormControl";
const FormDescription = React.forwardRef(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();
  return /* @__PURE__ */ jsx(
    "p",
    {
      ref,
      id: formDescriptionId,
      className: cn("text-[0.8rem] text-muted-foreground", className),
      ...props
    }
  );
});
FormDescription.displayName = "FormDescription";
const FormMessage = React.forwardRef(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error) : children;
  if (!body) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    "p",
    {
      ref,
      id: formMessageId,
      className: cn("text-[0.8rem] font-medium text-destructive", className),
      ...props,
      children: body
    }
  );
});
FormMessage.displayName = "FormMessage";
const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
export {
  Form as F,
  Input as I,
  FormField as a,
  FormItem as b,
  FormLabel as c,
  FormControl as d,
  FormMessage as e,
  FormDescription as f
};
