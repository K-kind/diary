import Link from "next/link";
import { Container, Flex, Header, Title, useMantineTheme } from "@mantine/core";
import { format } from "@/shared/utils/date";
import { AuthContext } from "@/shared/providers/auth";
import { useContext, useMemo } from "react";
import { HeaderMenu } from "@/shared/components/HeaderMenu";

export const AppHeader = () => {
  const theme = useMantineTheme();
  const { user } = useContext(AuthContext);
  const homePath = useMemo(
    () => (user ? `/diaries/${format(new Date(), "yyyy-MM-dd")}` : "/"),
    [user]
  );

  return (
    <Header height={55} px="md">
      <Container size="xl">
        <Flex align="center" justify="space-between" h={55}>
          <Link href={homePath} style={{ textDecoration: "none" }}>
            <Title size="h3" c={theme.primaryColor}>
              シンプル日記
            </Title>
          </Link>

          {user && <HeaderMenu />}
        </Flex>
      </Container>
    </Header>
  );
};
