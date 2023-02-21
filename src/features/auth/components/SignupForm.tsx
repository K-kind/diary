import { useSignUp } from "@/features/auth/api/signUp";
import { useNotification } from "@/shared/hooks/useNotification";
import { format } from "@/shared/utils/date";
import { Button, Card, Flex, Group, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";

type FormValues = { email: string; password: string };

export const SignupForm = () => {
  const form = useForm<FormValues>({
    initialValues: { email: "", password: "" },
    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "無効なメールアドレスです",
      password: (value) =>
        value.length > 5 ? null : "6文字以上で入力してください",
    },
  });

  const signUpMutation = useSignUp();
  const { notifyError, notifySuccess } = useNotification();
  const router = useRouter();

  const handleSubmit = async (formValues: FormValues) => {
    try {
      await signUpMutation.mutateAsync(formValues);
      notifySuccess({ message: "登録が完了しました" });
    } catch (e) {
      notifyError();
    }
  };

  return (
    <Card w={{ base: 300, sm: 320 }} withBorder shadow="sm" radius="md">
      <Card.Section withBorder inheritPadding py="xs">
        <Text weight={400}>新規登録</Text>
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
            <Button type="submit">登録</Button>
          </Flex>
        </form>
      </Card.Section>
    </Card>
  );
};
