import { SignupForm } from "@/features/auth/components/SignupForm";
import Head from "next/head";

export default function SignupPage() {
  return (
    <>
      <Head>
        <title>シンプル日記</title>
      </Head>

      <SignupForm />
    </>
  );
}
