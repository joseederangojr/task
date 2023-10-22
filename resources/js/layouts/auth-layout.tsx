import * as React from "react";

function AuthLayout(props: React.PropsWithChildren) {
    return (
        <div className="relative w-screen h-screen flex items-center justify-center">
            {props.children}
        </div>
    );
}

export { AuthLayout };
