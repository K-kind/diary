import { useSignIn } from "@/features/auth/api/signIn";
import { useNotification } from "@/shared/hooks/useNotification";
import { format } from "@/shared/utils/date";
import { Button, Card, Flex, Group, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";

type FormValues = { email: string; password: string };

export const SigninForm = () => {
  const form = useForm<FormValues>({
    initialValues: { email: "", password: "" },
    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "無効なメールアドレスです",
      password: (value) => (value ? null : "入力してください"),
    },
  });

  const signInMutation = useSignIn();
  const { notifyError, notifySuccess } = useNotification();
  const router = useRouter();

  const handleSubmit = async (formValues: FormValues) => {
    try {
      await signInMutation.mutateAsync(formValues);
      notifySuccess({ message: "ログインしました" });
    } catch (e) {
      notifyError({ message: "ログインに失敗しました" });
    }
  };

  return (
    <Card w={{ base: 300, sm: 320 }} withBorder shadow="sm" radius="md">
      <Card.Section withBorder inheritPadding py="xs">
        <Text weight={400}>ログイン</Text>
      </Card.Section>

      <Card.Section withBorder inheritPadding py="xs">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="メールアドレス"
            mb="lg"
            required
            type="email"
            {...form.getInputProps("email")}
          />
          <TextInput
            label="パスワード"
            mb="lg"
            required
            type="password"
            {...form.getInputProps("password")}
          />

          <Flex justify="center" align="center">
            <Button type="submit">ログイン</Button>
          </Flex>
        </form>
      </Card.Section>
    </Card>
  );
};
