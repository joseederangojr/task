import { jsx, jsxs } from "react/jsx-runtime";
import { format } from "date-fns";
import { c as cn } from "../ssr.js";
import { b as buttonVariants, B as Button } from "./button-BLClV2bc.js";
import { ChevronRightIcon, ChevronLeftIcon, MagnifyingGlassIcon, CheckIcon, PlusIcon } from "@radix-ui/react-icons";
import { DayPicker } from "react-day-picker";
import * as React from "react";
import { memo } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Calendar as Calendar$1, WarningCircle, ListChecks, MagicWand, CheckCircle, XCircle, QuestionMark, CaretUpDown, User } from "@phosphor-icons/react";
import { Command as Command$1 } from "cmdk";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogFooter } from "./dialog-CIQG8v2s.js";
import { F as Form, a as FormField, b as FormItem, c as FormLabel, d as FormControl, I as Input, e as FormMessage } from "./input-BZBbPD7X.js";
import { A as Avatar, b as AvatarImage, a as AvatarFallback } from "./avatar-CMi-SjUC.js";
import { useForm } from "@inertiajs/react";
import "@inertiajs/react/server";
import "react-dom/server";
import "@radix-ui/react-toast";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-slot";
import "@radix-ui/react-dialog";
import "@radix-ui/react-label";
import "@radix-ui/react-avatar";
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DayPicker,
    {
      showOutsideDays,
      className: cn("p-3", className),
      classNames: {
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent",
          props.mode === "range" ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md" : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames
      },
      components: {
        IconLeft: () => /* @__PURE__ */ jsx(ChevronLeftIcon, { className: "h-4 w-4" }),
        IconRight: () => /* @__PURE__ */ jsx(ChevronRightIcon, { className: "h-4 w-4" })
      },
      ...props
    }
  );
}
Calendar.displayName = "Calendar";
const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverContent = React.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  PopoverPrimitive.Content,
  {
    ref,
    align,
    sideOffset,
    className: cn(
      "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;
const DatePicker = ({ date, onDateChange }) => {
  return /* @__PURE__ */ jsxs(Popover, { children: [
    /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
      Button,
      {
        variant: "outline",
        className: cn(
          "w-full justify-start text-left font-normal",
          !date && "text-muted-foreground"
        ),
        children: [
          /* @__PURE__ */ jsx(Calendar$1, { className: "mr-2 h-4 w-4" }),
          date ? format(date, "PPP") : /* @__PURE__ */ jsx("span", { children: "Pick a date" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(PopoverContent, { className: "w-auto p-0", align: "start", children: /* @__PURE__ */ jsx(
      Calendar,
      {
        mode: "single",
        selected: date,
        onSelect: onDateChange,
        initialFocus: true
      }
    ) })
  ] });
};
const Command = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Command$1,
  {
    ref,
    className: cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className
    ),
    ...props
  }
));
Command.displayName = Command$1.displayName;
const CommandInput = React.forwardRef(({ className, ...props }, ref) => (
  // eslint-disable-next-line react/no-unknown-property
  /* @__PURE__ */ jsxs("div", { className: "flex items-center border-b px-3", "cmdk-input-wrapper": "", children: [
    /* @__PURE__ */ jsx(MagnifyingGlassIcon, { className: "mr-2 h-4 w-4 shrink-0 opacity-50" }),
    /* @__PURE__ */ jsx(
      Command$1.Input,
      {
        ref,
        className: cn(
          "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          className
        ),
        ...props
      }
    )
  ] })
));
CommandInput.displayName = Command$1.Input.displayName;
const CommandList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Command$1.List,
  {
    ref,
    className: cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className),
    ...props
  }
));
CommandList.displayName = Command$1.List.displayName;
const CommandEmpty = React.forwardRef((props, ref) => /* @__PURE__ */ jsx(Command$1.Empty, { ref, className: "py-6 text-center text-sm", ...props }));
CommandEmpty.displayName = Command$1.Empty.displayName;
const CommandGroup = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Command$1.Group,
  {
    ref,
    className: cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    ),
    ...props
  }
));
CommandGroup.displayName = Command$1.Group.displayName;
const CommandSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Command$1.Separator,
  {
    ref,
    className: cn("-mx-1 h-px bg-border", className),
    ...props
  }
));
CommandSeparator.displayName = Command$1.Separator.displayName;
const CommandItem = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Command$1.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props
  }
));
CommandItem.displayName = Command$1.Item.displayName;
const statusIcons = {
  triage: WarningCircle,
  todo: ListChecks,
  doing: MagicWand,
  done: CheckCircle,
  abandon: XCircle
};
const statusOptions = [
  {
    value: "triage",
    label: "Triage",
    Icon: statusIcons.triage,
    color: "text-yellow dark:text-yellow"
  },
  {
    value: "todo",
    label: "To Do",
    Icon: statusIcons.todo,
    color: "text-blue dark:text-blue"
  },
  {
    value: "doing",
    label: "Doing",
    Icon: statusIcons.doing,
    color: "text-mauve dark:text-mauve"
  },
  {
    value: "done",
    label: "Done",
    Icon: statusIcons.done,
    color: "text-green dark:text-green"
  },
  {
    value: "abandon",
    label: "Abandoned",
    Icon: statusIcons.abandon,
    color: "text-muted-foreground"
  }
];
const StatusDisplay = React.memo(({ status }) => {
  const statusOption = statusOptions.find((s) => s.value === status);
  if (!statusOption) return null;
  const Icon = statusIcons[status];
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsx(Icon, { className: cn("h-4 w-4", statusOption.color) }),
    /* @__PURE__ */ jsx("span", { children: statusOption.label })
  ] });
});
const StatusSelect = React.memo(({ value, onSelect }) => {
  const [open, setOpen] = React.useState(false);
  return /* @__PURE__ */ jsxs(Popover, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
      Button,
      {
        variant: "outline",
        role: "combobox",
        className: "justify-between w-full h-10 transition-all border-input",
        "aria-expanded": open,
        children: [
          value ? /* @__PURE__ */ jsx(StatusDisplay, { status: value }) : /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(QuestionMark, { className: "h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsx("span", { children: "Select status" })
          ] }),
          /* @__PURE__ */ jsx(CaretUpDown, { className: "ml-2 h-4 w-4 shrink-0 opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(PopoverContent, { className: "w-full p-0", children: /* @__PURE__ */ jsxs(Command, { children: [
      /* @__PURE__ */ jsx(CommandInput, { placeholder: "Search status..." }),
      /* @__PURE__ */ jsxs(CommandList, { children: [
        /* @__PURE__ */ jsx(CommandEmpty, { children: "No status found." }),
        /* @__PURE__ */ jsx(CommandGroup, { children: statusOptions.map((statusOption) => {
          return /* @__PURE__ */ jsxs(
            CommandItem,
            {
              "data-dusk": `status-select-item-${statusOption.value}`,
              onSelect: () => {
                onSelect(statusOption.value);
                setOpen(false);
              },
              className: "flex items-center gap-2 py-2",
              children: [
                /* @__PURE__ */ jsx(
                  statusOption.Icon,
                  {
                    className: cn("h-4 w-4", statusOption.color)
                  }
                ),
                /* @__PURE__ */ jsx("span", { children: statusOption.label })
              ]
            },
            statusOption.value
          );
        }) })
      ] })
    ] }) })
  ] });
});
StatusSelect.displayName = "StatusSelect";
const Textarea = React.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "textarea",
      {
        className: cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
const UserAvatar = memo(({ user, size = "md", className }) => {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-7 w-7",
    lg: "h-9 w-9"
  };
  return /* @__PURE__ */ jsxs(
    Avatar,
    {
      className: cn(sizeClasses[size], "border-2 border-background", className),
      children: [
        /* @__PURE__ */ jsx(AvatarImage, { src: "/placeholder.svg", alt: user.name }),
        /* @__PURE__ */ jsx(AvatarFallback, { className: "text-xs bg-mauve dark:bg-mauve text-white", children: user.name.substring(0, 2) })
      ]
    }
  );
});
UserAvatar.displayName = "UserAvatar";
const UserSelect = React.memo(
  ({ users, user: selectedUser, onUserChange }) => {
    const [open, setOpen] = React.useState(false);
    return /* @__PURE__ */ jsxs(Popover, { open, onOpenChange: setOpen, children: [
      /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
        Button,
        {
          variant: "outline",
          role: "combobox",
          className: "justify-between w-full h-10 transition-all border-input",
          "aria-expanded": open,
          children: [
            selectedUser ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(UserAvatar, { user: selectedUser, size: "sm" }),
              /* @__PURE__ */ jsx("span", { children: selectedUser.name })
            ] }) : /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
              /* @__PURE__ */ jsx(User, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsx("span", { children: "Select user" })
            ] }),
            /* @__PURE__ */ jsx(CaretUpDown, { className: "ml-2 h-4 w-4 shrink-0 opacity-50" })
          ]
        }
      ) }),
      /* @__PURE__ */ jsx(PopoverContent, { className: "w-full p-0", children: /* @__PURE__ */ jsxs(Command, { children: [
        /* @__PURE__ */ jsx(CommandInput, { placeholder: "Search users..." }),
        /* @__PURE__ */ jsxs(CommandList, { children: [
          /* @__PURE__ */ jsx(CommandEmpty, { children: "No users found." }),
          /* @__PURE__ */ jsx(CommandGroup, { children: users.map((user) => /* @__PURE__ */ jsxs(
            CommandItem,
            {
              "data-dusk": `user-select-item-${user.id}`,
              onSelect: () => {
                onUserChange(user);
                setOpen(false);
              },
              className: "flex items-center gap-2 py-2",
              children: [
                /* @__PURE__ */ jsx(UserAvatar, { user, size: "sm" }),
                /* @__PURE__ */ jsx("span", { children: user.name }),
                /* @__PURE__ */ jsx(
                  CheckIcon,
                  {
                    className: cn(
                      "ml-auto h-4 w-4",
                      (selectedUser == null ? void 0 : selectedUser.id) === user.id ? "opacity-100" : "opacity-0"
                    )
                  }
                )
              ]
            },
            user.id
          )) })
        ] })
      ] }) })
    ] });
  }
);
UserSelect.displayName = "UserSelect";
const CreateTaskDialog = (props) => {
  const form = useForm({
    space_id: props.space.id,
    column_id: props.column.id,
    title: "",
    description: "",
    status: "",
    due_date: void 0,
    assigned_to_id: void 0
  });
  const selectedUser = props.team.find(
    (x) => x.id === form.data.assigned_to_id
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    form.post(`/api/task`, {
      preserveState: true,
      onSuccess: () => {
        props.onOpenChange(false);
        form.reset();
      }
    });
  };
  return /* @__PURE__ */ jsxs(Dialog, { open: props.open, onOpenChange: props.onOpenChange, children: [
    /* @__PURE__ */ jsx(DialogTrigger, { asChild: props.children !== void 0, children: props.children ?? /* @__PURE__ */ jsx(PlusIcon, {}) }),
    /* @__PURE__ */ jsx(DialogContent, { className: "sm:max-w-[600px]", children: /* @__PURE__ */ jsxs("form", { className: "space-y-4", onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsxs(DialogTitle, { children: [
        "Create Task for ",
        props.column.name
      ] }) }),
      /* @__PURE__ */ jsxs(Form, { ...form, children: [
        /* @__PURE__ */ jsx(
          FormField,
          {
            data: form.data,
            name: "title",
            render: ({ field, setValue }) => /* @__PURE__ */ jsxs(FormItem, { children: [
              /* @__PURE__ */ jsx(FormLabel, { children: "Title" }),
              /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
                Input,
                {
                  placeholder: "Enter task title",
                  onChange: (e) => setValue(e.target.value),
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
            name: "description",
            render: ({ field, setValue }) => /* @__PURE__ */ jsxs(FormItem, { children: [
              /* @__PURE__ */ jsx(FormLabel, { children: "Description" }),
              /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
                Textarea,
                {
                  placeholder: "Enter task description",
                  onChange: (e) => setValue(e.target.value),
                  ...field
                }
              ) }),
              /* @__PURE__ */ jsx(FormMessage, {})
            ] })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5", children: [
          /* @__PURE__ */ jsx(
            FormField,
            {
              data: form.data,
              name: "status",
              render: ({ field, setValue }) => /* @__PURE__ */ jsxs(FormItem, { children: [
                /* @__PURE__ */ jsx(FormLabel, { children: "Status" }),
                /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(StatusSelect, { value: field.value, onSelect: setValue }) }),
                /* @__PURE__ */ jsx(FormMessage, {})
              ] })
            }
          ),
          /* @__PURE__ */ jsx(
            FormField,
            {
              data: form.data,
              name: "assigned_to_id",
              render: ({ setValue }) => /* @__PURE__ */ jsxs(FormItem, { children: [
                /* @__PURE__ */ jsx(FormLabel, { children: "Assigned To" }),
                /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
                  UserSelect,
                  {
                    users: props.team,
                    user: selectedUser,
                    onUserChange: (user) => setValue(user.id)
                  }
                ) }),
                /* @__PURE__ */ jsx(FormMessage, {})
              ] })
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          FormField,
          {
            data: form.data,
            name: "due_date",
            render: ({ field, setValue }) => /* @__PURE__ */ jsxs(FormItem, { children: [
              /* @__PURE__ */ jsx(FormLabel, { children: "Due date" }),
              /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(DatePicker, { date: field.value, onDateChange: setValue }) }),
              /* @__PURE__ */ jsx(FormMessage, {})
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsx(Button, { type: "submit", children: "Save Task" }) })
    ] }) })
  ] });
};
export {
  CreateTaskDialog
};
