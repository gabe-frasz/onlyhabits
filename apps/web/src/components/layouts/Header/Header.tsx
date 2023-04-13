import { NewHabitModal } from "./components";

// TODO: Fix Heading component
export const Header = () => {
  return (
    <header className="mx-auto flex w-full max-w-3xl flex-col items-center justify-between gap-4 sm:flex-row sm:gap-0">
      {/* <Heading className="text-3xl font-bold" asChild>
        <h1>
          <Logo />
        </h1>
      </Heading> */}

      <NewHabitModal />
    </header>
  );
};
