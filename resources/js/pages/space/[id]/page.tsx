import { AppLayout } from "@/layouts/app-layout";
import { PageProps, Space } from "@/types";

type Props = {
    space: Space;
};

export default function SpaceByIdPage(props: PageProps<Props>) {
    return (
        <AppLayout>
            <h1 className="text-2xl border-b">
                Welcome to your <span className="italic">{props.space.name}</span> space.
            </h1>
        </AppLayout>
    );
}
