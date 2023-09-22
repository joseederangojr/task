import * as React from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from '@/components/ui/toaster';


export const Providers = ({ children }: React.PropsWithChildren) => {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <ThemeProvider defaultTheme="light" storageKey="app-ui-theme">
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  );
};
