import { SigninForm } from "@/features/auth/components/SigninForm";
import { Box, Button, Flex } from "@mantine/core";
import Head from "next/head";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>シンプル日記</title>
      </Head>

      <Flex direction="column" align="center" justify="center" pt="xl">
        <SigninForm />
        <Box component={Link} href="/signup" mt="xl">
          <Button
            variant="subtle"
            sx={{ ":hover": { backgroundColor: "unset" } }}
          >
            新規登録はこちら
          </Button>
        </Box>
      </Flex>
    </>
  );
}
