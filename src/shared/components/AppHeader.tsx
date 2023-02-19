import Link from "next/link";
import { Container, Flex, Header, Title, useMantineTheme } from "@mantine/core";
import { format } from "@/shared/utils/date";

export const AppHeader = () => {
  const theme = useMantineTheme();
  const homePath = `/diaries/${format(new Date(), "yyyy-MM-dd")}`;

  return (
    <Header height={55} px="md">
      <Container size="xl">
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
