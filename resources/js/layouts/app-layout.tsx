import * as React from "react";
import { Sidebar, SidebarItemProps } from "@/components/sidebar";
import { Breadcrumb } from "@/components/breadcrumb";
import { DashboardIcon, MixIcon, GearIcon } from "@radix-ui/react-icons";
import { usePage, useRemember } from "@inertiajs/react";
import { PageProps } from "@/types";
import { UserProfile } from "@/components/user-profile";
import { format } from "date-fns";
import { SpaceSelect } from "@/components/space-select";
import { Separator } from "@/components/ui/separator";
import { CreateSpaceDialog } from "@/components/create-space-dialog";

const sidebarItems: SidebarItemProps[] = [
    {
        label: "Dashboard",
        icon: <DashboardIcon />,
        href: "/",
    },
    {
        label: "Spaces",
        icon: <MixIcon />,
        href: "/space",
    },
    {
        label: "Settings",
        icon: <GearIcon />,
        href: "/setting",
    },
];

function AppLayout(props: React.PropsWithChildren) {
    const {
        props: {
            breadcrumbs,
            user: { whoami: user, spaces },
        },
    } = usePage<PageProps>();
    const [createSpaceDialogIsOpen, setCreateSpaceDialogIsOpen] = useRemember<boolean>(
        false,
        "create-space-dialog-is-open",
    );
    const personalSpaces = spaces.find((space) => space.type === "personal");
    const teamSpaces = spaces.filter((space) => space.type === "team");

    return (
        <>
            <div className="flex h-screen w-screen overflow-hidden">
                <div className="w-[250px] h-screen border-r p-2">
                    <SpaceSelect
                        personal={personalSpaces!}
                        team={teamSpaces}
                        onCreateNewSpace={() => setCreateSpaceDialogIsOpen(true)}
                    />
                    <Separator className="my-2" />
                    <Sidebar items={sidebarItems} />
                </div>
                <div data-dusk="app-layout-content" className="w-full p-4">
                    <div className="flex mb-2 justify-between">
                        <Breadcrumb items={breadcrumbs} />
                        <UserProfile
                            name={user!.name}
                            joinedDate={format(new Date(user!.created_at), "MMMM yyyy")}
                        />
                    </div>

                    {props.children}
                </div>
            </div>
            <CreateSpaceDialog
                open={createSpaceDialogIsOpen}
                onOpenChange={(state) => setCreateSpaceDialogIsOpen(state)}
            />
        </>
    );
}

export { AppLayout };
