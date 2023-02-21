import { useSignOut } from "@/features/auth/api/signOut";
import { useNotification } from "@/shared/hooks/useNotification";
import { Button, Menu } from "@mantine/core";
import { IconLogout, IconMenu2 } from "@tabler/icons";
import { useCallback } from "react";

export const HeaderMenu = () => {
  const signOutMutation = useSignOut();
  const { notifyError, notifySuccess } = useNotification();

  const signout = useCallback(async () => {
    try {
      await signOutMutation.mutateAsync();
      notifySuccess({ message: "ログアウトしました" });
    } catch (e) {
      notifyError();
    }
  }, [notifyError, notifySuccess, signOutMutation]);

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button variant="subtle" size="xs" ml={{ sm: "sm" }} color="gray">
          <IconMenu2 />
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item icon={<IconLogout size={14} />} onClick={signout}>
          ログアウト
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
