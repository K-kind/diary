import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { MainLayout } from "@/shared/components/MainLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotificationsProvider } from "@mantine/notifications";
import { AuthGuard } from "@/features/auth/components/AuthGuard";
import { Suspense } from "react";
import { ContentLoader } from "@/shared/components/ContentLoader";
import { AuthProvider } from "@/shared/providers/auth";

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
          <Suspense fallback={<ContentLoader />}>
            <AuthProvider>
              <AuthGuard>
                <MainLayout>
                  <Component {...pageProps} />
                </MainLayout>
              </AuthGuard>
            </AuthProvider>
          </Suspense>
        </QueryClientProvider>
      </NotificationsProvider>
    </MantineProvider>
  );
}
