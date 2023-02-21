import { SignupForm } from "@/features/auth/components/SignupForm";
import { Box, Button, Flex } from "@mantine/core";
import Head from "next/head";
import Link from "next/link";

export default function SignupPage() {
  return (
    <>
      <Head>
        <title>シンプル日記</title>
      </Head>

      <Flex direction="column" align="center" justify="center" pt="xl">
        <SignupForm />
        <Box component={Link} href="/" mt="xl">
          <Button
            variant="subtle"
            sx={{ ":hover": { backgroundColor: "unset" } }}
          >
            ログインはこちら
          </Button>
        </Box>
      </Flex>
    </>
  );
}
