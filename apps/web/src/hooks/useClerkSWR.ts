import { useAuth } from "@clerk/nextjs";
import useSWR from "swr";

export function useClerkSWR<T>(key: string) {
  const { getToken } = useAuth();

  const fetcher = async (key: string) => {
    return (await fetch(`http://localhost:3333${key}`, {
      headers: { Authorization: `Bearer ${await getToken()}` },
    }).then((res) => res.json())) as any;
  };

  return useSWR<T>(key, fetcher);
}
