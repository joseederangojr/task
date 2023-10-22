import {
    Breadcrumb as UIBreadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbItemProps as UIBreadcrumbItemProps,
} from "@/components/ui/breadcrumb";
import { Link } from "@inertiajs/react";

export type BreadcrumbItemProps = {
    label: string;
    href: string;
} & UIBreadcrumbItemProps;
type BreadcrumbProps = {
    items: BreadcrumbItemProps[];
};

const Breadcrumb = (props: BreadcrumbProps) => {
    return (
        <UIBreadcrumb>
            {props.items.map((breadcrumb) => (
                <BreadcrumbItem
                    key={"bc-" + breadcrumb.label}
                    isCurrentPage={breadcrumb?.isCurrentPage}
                    isLastChild={breadcrumb?.isLastChild}>
                    <BreadcrumbLink as={Link} href={breadcrumb.href}>
                        {breadcrumb.label}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            ))}
        </UIBreadcrumb>
    );
};

export { Breadcrumb };
