import { Button, Heading } from "@c6r/react";
import { Plus } from "phosphor-react";
import { Logo } from "../../modules";

export const Header = () => {
  return (
    <header className="mx-auto flex w-full max-w-3xl items-center justify-between">
      <Heading size="lg" className="font-bold" asChild>
        <h1>
          <Logo />
        </h1>
      </Heading>

      <Button variant="outline" className="group py-2">
        New habit
        <Plus
          weight="bold"
          className="transition-transform group-hover:rotate-180"
        />
      </Button>
    </header>
  );
};
