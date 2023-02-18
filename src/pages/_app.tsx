import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { MainLayout } from "@/shared/components/MainLayout";

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
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </MantineProvider>
  );
}
