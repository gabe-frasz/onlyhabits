import { useAuth } from "@clerk/nextjs";
import useSWR from "swr";

import { env } from "@/env";

export function useClerkSWR<T>(key: string) {
  const { getToken } = useAuth();

  const fetcher = async (key: string) => {
    const res = await fetch(env.NEXT_PUBLIC_SERVER_API_URL + key, {
      headers: { Authorization: `Bearer ${await getToken()}` },
    });

    return res.json() as any;
  };

  return { ...useSWR<T>(key, fetcher), getToken };
}
