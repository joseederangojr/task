import { PageProps } from "@/types";

type Props = {
    canLogin: boolean;
    canRegister: boolean;
    laravelVersion: string;
    phpVersion: string;
} & PageProps;

export default function IndexPage(props: Props) {
    return (
        <ul>
            <li>Can Login: {props.canLogin ? "Yes" : "No"}</li>
            <li>Can Register: {props.canRegister ? "Yes" : "No"}</li>
            <li>Laravel: {props.laravelVersion}</li>
            <li>PHP Version: {props.phpVersion}</li>
            {props.auth?.user && <li>User: {props.auth.user.name}</li>}
        </ul>
    );
}
