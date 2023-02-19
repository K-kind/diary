import { ReactNode } from "react";
import { AppShell, Container } from "@mantine/core";
import { AppHeader } from "@/shared/components/AppHeader";

type Props = {
  children: ReactNode;
};

export const MainLayout = ({ children }: Props) => {
  return (
    <AppShell
      header={<AppHeader />}
      fixed={false}
      styles={{
        root: { minHeight: "100vh", display: "flex", flexDirection: "column" },
        body: { flex: 1 },
      }}
    >
      <Container size="xl">{children}</Container>
    </AppShell>
  );
};
