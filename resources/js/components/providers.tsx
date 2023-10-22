import * as React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

export const Providers = ({ children }: React.PropsWithChildren) => {
    return (
        <ThemeProvider defaultTheme="system" storageKey="app-ui-theme">
            {children}
            <Toaster />
        </ThemeProvider>
    );
};
