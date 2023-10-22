import { AppLayout } from "@/layouts/app-layout";
import { PageProps } from "@/types";

export default function HomePage(props: PageProps) {
    const user = props.user.whoami!;
    return (
        <AppLayout>
            <h1 className="text-2xl">
                Hi <span className="font-bold">{user.name}!</span>
            </h1>
        </AppLayout>
    );
}
