import { PageProps, Space } from "@/types";
import { usePage, useRemember } from "@inertiajs/react";

export const useSpace = (space: Space) => {
    const { props } = usePage<PageProps>();
    const personalSpace = props.spaces.find((space) => space.type === "personal");
    const teamSpaces = props.spaces.filter((space) => space.type === "team");
    const [selectedSpace, setSelectedSpace] = useRemember<string>(
        space.id as unknown as string,
        `selected-space${props.whoami.id}`,
    );

    return {
        spaces: props.spaces,
        selectedSpace,
        personalSpace: personalSpace!,
        teamSpaces,
        setSelectedSpace,
    };
};
