import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { MainLayout } from "@/shared/components/MainLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotificationsProvider } from "@mantine/notifications";

const queryClient = new QueryClient({
  defaultOptions: { queries: { suspense: true } },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        components: {
          Button: {
            defaultProps: () => ({
              loaderPosition: "center",
            }),
          },
        },
      }}
    >
      <NotificationsProvider>
        <QueryClientProvider client={queryClient}>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </QueryClientProvider>
      </NotificationsProvider>
    </MantineProvider>
  );
}
