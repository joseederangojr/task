import * as React from "react";
import { Button } from "@/components/ui/button";
import { InertiaLinkProps, Link, router } from "@inertiajs/react";
import { PinLeftIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

type Props = {
    items: SidebarItemProps[];
};

export type SidebarItemProps = {
    label: string;
    icon?: React.ReactNode;
    active?: boolean;
} & InertiaLinkProps;

function SidebarItem({ label, icon, active, className, ...props }: SidebarItemProps) {
    return (
        <Button
            variant={active ? "secondary" : "ghost"}
            className={cn("justify-start", className)}
            asChild>
            <Link {...props}>
                <span className="mr-2">{icon}</span> <span>{label}</span>
            </Link>
        </Button>
    );
}

function Sidebar(props: Props) {
    const signout = () => {
        router.post("/api/auth/signout");
    };
    return (
        <div className="h-full flex flex-col space-y-1">
            {props.items.map((item) => (
                <SidebarItem
                    {...item}
                    key={item.label}
                    data-dusk={`sidebar-item-${item.label}`}
                    active={item.active}
                />
            ))}
            <SidebarItem
                data-dusk="sidebar-item-Signout"
                as="button"
                icon={<PinLeftIcon />}
                label="Signout"
                onClick={signout}
                href="/"
            />
        </div>
    );
}

export { Sidebar, SidebarItem };
