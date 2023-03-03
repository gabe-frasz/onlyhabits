import { Popover, Progress } from "@c6r/react";
import clsx from "clsx";
import { useState } from "react";

interface HabitDayProps {
  completed: number;
  amount: number;
}

export const HabitDay = ({ completed, amount }: HabitDayProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const progressPercentage = Math.round((completed / amount) * 100);

  return (
    <Popover.Root onOpenChange={setIsPopoverOpen}>
      <Popover.Trigger
        className={clsx("h-10 w-10 rounded-lg border-2", {
          "border-base-100 bg-base-200": progressPercentage === 0,
          "bg-primary-900 border-primary-700":
            progressPercentage > 0 && progressPercentage <= 20,
          "bg-primary-800 border-primary-600":
            progressPercentage > 20 && progressPercentage <= 40,
          "bg-primary-700 border-primary-500":
            progressPercentage > 40 && progressPercentage <= 60,
          "bg-primary-600 border-primary-500":
            progressPercentage > 60 && progressPercentage <= 80,
          "bg-primary-500 border-primary-400": progressPercentage > 80,
        })}
      />

      <Popover.Content
        open={isPopoverOpen}
        className="z-50 flex w-screen max-w-sm flex-col p-6"
      >
        <span className="mb-1 font-semibold text-zinc-400">Thursday</span>
        <span className="text-3xl font-extrabold leading-tight">02/03</span>

        <Progress.Root className="bg-base-100 my-3 h-3">
          <Progress.Indicator progress={progressPercentage} />
        </Progress.Root>
      </Popover.Content>
    </Popover.Root>
  );
};
