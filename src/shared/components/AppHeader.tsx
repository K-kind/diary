import Link from "next/link";
import { Container, Flex, Header, Title, useMantineTheme } from "@mantine/core";
import { format } from "date-fns";

export const AppHeader = () => {
  const theme = useMantineTheme();
  const homePath = `/diaries/${format(new Date(), "yyyy-MM-dd")}`;

  return (
    <Header height={55} px="md">
      <Container>
        <Flex align="center" h={55}>
          <Link href={homePath} style={{ textDecoration: "none" }}>
            <Title size="h3" c={theme.primaryColor}>
              シンプル日記
            </Title>
          </Link>
        </Flex>
      </Container>
    </Header>
  );
};
