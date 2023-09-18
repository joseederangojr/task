import { ThemeProvider } from "./theme-provider";

export const Providers = ({ children }: React.PropsWithChildren) => {
    return (
        <ThemeProvider defaultTheme="system" storageKey="app-ui-theme">
            {children}
        </ThemeProvider>
    );
};
