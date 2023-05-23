import { Button, Heading, Text } from "@c6r/react";
import Link from "next/link";

import { Logo } from "@/components/modules";

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <Heading className="mb-12 text-3xl font-bold" asChild>
        <h1>
          <Logo />
        </h1>
      </Heading>

      <Heading className="mb-4">
        Welcome to OnlyHabits! We are glad to have you here.
      </Heading>

      <Text className="mb-2 max-w-md text-center text-zinc-500">
        This app is currently under development but you can use its main
        features if you want to, just sign up and you're good to go!
      </Text>

      <Text className="mb-12 text-zinc-500">
        Check out the source code{" "}
        <a
          href="https://github.com/gabe-frasz/onlyhabits"
          className="underline underline-offset-2"
        >
          right here
        </a>
        .
      </Text>

      <Button asChild>
        <Link href="/summary">See your habits summary</Link>
      </Button>
    </main>
  );
}
