import { ReactNode, useCallback, useContext, useEffect, useMemo } from "react";
import { getUser } from "@/features/auth/api/getUser";
import { onStateChanged } from "@/features/auth/api/onStateChanged";
import { AuthContext } from "@/shared/providers/auth";
import { ContentLoader } from "@/shared/components/ContentLoader";
import { useRouter } from "next/router";
import { format } from "@/shared/utils/date";

const GUEST_PATH = ["/", "/signup"];

type Props = {
  children: ReactNode;
};

export const AuthGuard = ({ children }: Props) => {
  const router = useRouter();
  const isGuestPath = useMemo(
    () => GUEST_PATH.includes(router.pathname),
    [router]
  );

  const { user, setUser, authError, setAuthError } = useContext(AuthContext);

  const fetchAndSetUser = useCallback(async () => {
    if (user !== undefined) return user;

    let u;
    try {
      u = (await getUser()).user;
      setUser(u);
    } catch (e) {
      setAuthError(e as Error);
    }

    return u;
  }, [user, setUser, setAuthError]);

  useEffect(() => {
    fetchAndSetUser().then((u) => {
      if (u == null && !isGuestPath) {
        router.push("/");
      } else if (u != null && isGuestPath) {
        router.push(`/diaries/${format(new Date(), "yyyy-MM-dd")}`);
      }
    });
  }, [fetchAndSetUser, isGuestPath, router]);

  useEffect(() => {
    return onStateChanged({
      TOKEN_REFRESHED: (session) => {
        setUser(session?.user ?? null);
      },
      SIGNED_IN: (session) => {
        setUser(session?.user ?? null);
      },
      SIGNED_OUT: (session) => {
        setUser(session?.user ?? null);
      },
    });
  }, [setUser]);

  if (authError === undefined && user === undefined) {
    return <ContentLoader />;
  }

  return <>{children}</>;
};
