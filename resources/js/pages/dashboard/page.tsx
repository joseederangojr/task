import { AppLayout } from "@/layouts/app-layout";
import { PageProps } from "@/types";

export default function DashboardPage(props: PageProps) {
    return (
        <AppLayout>
            <h1 className="text-2xl">
                Hi <span className="font-bold">{props.whoami.name}!</span>
            </h1>
        </AppLayout>
    );
}
