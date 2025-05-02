import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import * as React from "react";
import { CaretSortIcon, CheckIcon, PlusIcon, ChevronRightIcon, DotFilledIcon, MixIcon } from "@radix-ui/react-icons";
import * as SelectPrimitive from "@radix-ui/react-select";
import { c as cn, g as getInitials } from "../ssr.js";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { B as Button } from "./button-BLClV2bc.js";
import { A as Avatar, a as AvatarFallback } from "./avatar-CMi-SjUC.js";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Link, usePage, useRemember, router } from "@inertiajs/react";
const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;
const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(CaretSortIcon, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  SelectPrimitive.Content,
  {
    ref,
    className: cn(
      "relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: /* @__PURE__ */ jsx(
      SelectPrimitive.Viewport,
      {
        className: cn(
          "p-1",
          position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        ),
        children
      }
    )
  }
) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
const SelectLabel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(CheckIcon, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
const Separator = React.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ jsx(
  SeparatorPrimitive.Root,
  {
    ref,
    decorative,
    orientation,
    className: cn(
      "shrink-0 bg-border",
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
      className
    ),
    ...props
  }
));
Separator.displayName = SeparatorPrimitive.Root.displayName;
function SpaceSelect(props) {
  return /* @__PURE__ */ jsxs(Select, { defaultValue: props.selectedSpace, onValueChange: props.onSpaceSelected, children: [
    /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select a space" }) }),
    /* @__PURE__ */ jsxs(SelectContent, { children: [
      /* @__PURE__ */ jsxs(SelectGroup, { children: [
        /* @__PURE__ */ jsx(SelectLabel, { children: "Personal" }),
        /* @__PURE__ */ jsx(
          SelectItem,
          {
            "data-dusk": `space-select-item-${props.personal.id}`,
            value: props.personal.id,
            children: props.personal.name
          },
          props.personal.id
        )
      ] }),
      /* @__PURE__ */ jsxs(SelectGroup, { children: [
        /* @__PURE__ */ jsx(SelectLabel, { children: "Team" }),
        props.team.map((space) => /* @__PURE__ */ jsx(
          SelectItem,
          {
            "data-dusk": `space-select-item-${space.id}`,
            value: space.id,
            children: space.name
          },
          space.id
        ))
      ] }),
      /* @__PURE__ */ jsx(Separator, { className: "mb-1" }),
      /* @__PURE__ */ jsxs(
        Button,
        {
          variant: "ghost",
          className: "w-full font-bold",
          onClick: props.onCreateNewSpace,
          children: [
            /* @__PURE__ */ jsx(PlusIcon, { className: "mr-1" }),
            /* @__PURE__ */ jsx("span", { children: "New Space" })
          ]
        }
      )
    ] })
  ] });
}
const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronRightIcon, { className: "ml-auto h-4 w-4" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
const DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
const DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(CheckIcon, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
const DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(DotFilledIcon, { className: "h-4 w-4 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
const DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
    ...props
  }
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
function UserNavigationDropdown(props) {
  const initials = getInitials(props.name);
  return /* @__PURE__ */ jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsx(
      DropdownMenuTrigger,
      {
        className: "flex items-center w-full max-w-max",
        children: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Avatar, { className: "mr-2", children: /* @__PURE__ */ jsx(AvatarFallback, { children: initials }) }),
          /* @__PURE__ */ jsx("span", { children: props.name })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(DropdownMenuContent, { children: /* @__PURE__ */ jsx(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsx(
      Link,
      {
        className: "cursor-pointer",
        href: "/api/auth/signout",
        method: "post",
        children: "Log out"
      }
    ) }) })
  ] });
}
const useSpace = (space) => {
  const { props } = usePage();
  const personalSpace = props.spaces.find((space2) => space2.type === "personal");
  const teamSpaces = props.spaces.filter((space2) => space2.type === "team");
  const [selectedSpace, setSelectedSpace] = useRemember(
    space.id,
    `selected-space${props.whoami.id}`
  );
  return {
    spaces: props.spaces,
    selectedSpace,
    personalSpace,
    teamSpaces,
    setSelectedSpace
  };
};
const CreateSpaceDialog = React.lazy(() => import("./create-space-dialog-8b4izWHL.js"));
function AppLayout(props) {
  const {
    props: { whoami, space }
  } = usePage();
  const { personalSpace, teamSpaces, selectedSpace, setSelectedSpace } = useSpace(space);
  const [createSpaceDialogIsOpen, setCreateSpaceDialogIsOpen] = useRemember(
    false,
    "create-space-dialog-is-open"
  );
  const handleOnSpaceSelected = (id) => {
    setSelectedSpace(id);
    router.get(`/space/${id}`, {
      preserveState: true
    });
  };
  const handleOnCreateNewSpace = () => setCreateSpaceDialogIsOpen(true);
  const handleOnOpenChange = (state) => {
    setCreateSpaceDialogIsOpen(state);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "flex flex-col w-full h-full", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between h-16 w-full px-8 border-b", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex w-full items-center mr-auto", children: [
        /* @__PURE__ */ jsxs(
          Link,
          {
            href: "/space",
            className: "flex items-center text-xl mr-4",
            children: [
              /* @__PURE__ */ jsx(MixIcon, { className: "mr-2 h-5 w-5" }),
              "Task"
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "w-52", children: /* @__PURE__ */ jsx(
          SpaceSelect,
          {
            selectedSpace,
            personal: personalSpace,
            team: teamSpaces,
            onSpaceSelected: handleOnSpaceSelected,
            onCreateNewSpace: handleOnCreateNewSpace
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx(UserNavigationDropdown, { name: whoami.name })
    ] }) }),
    /* @__PURE__ */ jsx(React.Suspense, { children: createSpaceDialogIsOpen && /* @__PURE__ */ jsx(
      CreateSpaceDialog,
      {
        open: createSpaceDialogIsOpen,
        onOpenChange: handleOnOpenChange
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "px-8 py-4", children: props.children })
  ] });
}
export {
  AppLayout as A
};
