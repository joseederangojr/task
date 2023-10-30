import { PageProps, Space } from "@/types";
import { Link } from "@inertiajs/react";

type SpacePageProps = {
    spaces: Space[];
};

function SpacePage(props: PageProps<SpacePageProps>) {
    return (
        <div className="flex flex-col items-center w-screen min-h-screen">
            <h1 className="mt-10 mb-5 text-3xl font-bold">Select Space</h1>
            <div className="w-full min-h-[25vh]">
                <ul className="flex flex-wrap max-w-md items-center space-x-4 mx-auto">
                    {props.spaces.map((space) => (
                        <li
                            key={`space-${space.id}`}
                            className="text-center border border-dashed hover:border-solid rounded px-4 py-2">
                            <Link
                                data-dusk={`space-${space.id}`}
                                href={`/space/${space.id}`}>
                                {space.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SpacePage;
