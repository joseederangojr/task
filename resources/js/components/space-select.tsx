import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { PlusIcon } from "@radix-ui/react-icons";
import { Space } from "@/types";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

type SpaceSelectProps = {
    personal: Space;
    team: Space[];
    selectedSpace: string;
    onCreateNewSpace: () => void;
    onSpaceSelected: (id: string) => void;
};

function SpaceSelect(props: SpaceSelectProps) {
    return (
        <Select defaultValue={props.selectedSpace} onValueChange={props.onSpaceSelected}>
            <SelectTrigger data-dusk="space-select-trigger">
                <SelectValue placeholder="Select a space" />
            </SelectTrigger>
            <SelectContent data-dusk="space-select-items">
                <SelectGroup>
                    <SelectLabel>Personal</SelectLabel>
                    <SelectItem
                        key={props.personal.id}
                        data-dusk={`space-select-item-${props.personal.id}`}
                        value={props.personal.id as unknown as string}>
                        {props.personal.name}
                    </SelectItem>
                </SelectGroup>
                <SelectGroup>
                    <SelectLabel>Team</SelectLabel>
                    {props.team.map((space) => (
                        <SelectItem
                            key={space.id}
                            data-dusk={`space-select-item-${space.id}`}
                            value={space.id as unknown as string}>
                            {space.name}
                        </SelectItem>
                    ))}
                </SelectGroup>
                <Separator className="mb-1" />
                <Button
                    data-dusk="space-select-new"
                    variant="ghost"
                    className="w-full font-bold"
                    onClick={props.onCreateNewSpace}>
                    <PlusIcon className="mr-1" />
                    <span>New Space</span>
                </Button>
            </SelectContent>
        </Select>
    );
}

export { SpaceSelect };
