import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";


import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { useForm } from '@inertiajs/react'

type TFieldValues = Record<string, any>;
type UseFormContext<T extends TFieldValues = TFieldValues> = ReturnType<typeof useForm<T>>;
type FormProviderProps<T extends TFieldValues = TFieldValues> = {
  children: React.ReactNode;
} & UseFormContext<T>;
type UseFormFieldContext<T extends TFieldValues = TFieldValues> = {
  id: string;
  name: keyof T;
}
type UseFormField = {
  formItemId: string,
  formDescriptionId: string,
  formMessageId: string,
  error?: string,
  setValue: (value: any) => void,
  field: {
    id: string,
    name: string,
    value: any
  }
}
type FormFieldProps<T extends TFieldValues = TFieldValues> = {
  data: UseFormContext<T>['data'],
  name: keyof UseFormContext<T>['data'],
  render: (props: UseFormField) => React.ReactNode,
}

const FormContext = React.createContext<UseFormContext | undefined>(undefined);
const FormFieldContext = React.createContext<UseFormFieldContext | undefined>(undefined);
const Form = <T extends TFieldValues = TFieldValues>({ children, ...form }: FormProviderProps<T>) => {
  return (
    <FormContext.Provider value={form as unknown as UseFormContext}>
      {children}
    </FormContext.Provider>
  )
}

const useFormContext = <T extends TFieldValues = TFieldValues>() => {
  const context = React.useContext(FormContext) as UseFormContext<T>;
  if (context === undefined) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
const useFormFieldContext = <T extends TFieldValues = TFieldValues>() => {
  return React.useContext(FormFieldContext) as UseFormFieldContext<T>;
}


const FormField = <
  T extends TFieldValues = TFieldValues
>(props: FormFieldProps<T>) => {
  const id = React.useId();

  const formContext = useFormContext<T>();

  if (!formContext) {
    throw new Error("useFormContext should be used within <Form>");
  }

  const value = formContext.data[props.name]
  const error = formContext.errors[props.name]
  const renderProps = {
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    error,
    setValue(value: any) {
      formContext.setData(props.name, value)
    },
    field: {
      id,
      name: props.name,
      value
    }
  };

  return (
    <FormFieldContext.Provider value={{ id, name: props.name } as unknown as UseFormFieldContext}>
      {props.render(renderProps as UseFormField)}
    </FormFieldContext.Provider>
  )
};



const useFormField = (): UseFormField => {
  const formContext = useFormContext();
  const fieldContext = useFormFieldContext();

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const id = fieldContext.id
  const value = formContext.data[fieldContext.name]
  const error = formContext.errors[fieldContext.name]
  return {
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    error,
    setValue(value) {
      formContext.setData(fieldContext.name, value)
    },
    field: {
      ...fieldContext,
      value
    }
  };
};


const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("space-y-2", className)} {...props} />
});
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  );
});
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-[0.8rem] text-muted-foreground", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error) : children;
  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn(
        "text-[0.8rem] font-medium text-destructive",
        className,
      )}
      {...props}
    >
      {body}
    </p>
  )

});
FormMessage.displayName = "FormMessage";

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
};
