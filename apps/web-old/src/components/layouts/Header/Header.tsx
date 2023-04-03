import { Heading } from "@c6r/react";

import { Logo } from "../../modules";
import { NewHabitModal } from "./components";

export const Header = () => {
  return (
    <header className="mx-auto flex w-full max-w-3xl items-center justify-between">
      <Heading size="lg" className="font-bold" asChild>
        <h1>
          <Logo />
        </h1>
      </Heading>

      <NewHabitModal />
    </header>
  );
};
