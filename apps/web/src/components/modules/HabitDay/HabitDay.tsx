import { Checkbox, Label, Popover, Progress, Text } from "@c6r/react";
import clsx from "clsx";
import dayjs from "dayjs";
import { useState } from "react";

interface HabitDayProps {
  date: Date;
  completed?: number;
  amount?: number;
}

export const HabitDay = ({
  date,
  completed = 0,
  amount = 0,
}: HabitDayProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const progressPercentage =
    amount > 0 ? Math.round((completed / amount) * 100) : 0;

  const weekDay = dayjs(date).format("dddd");
  const dayAndMonth = dayjs(date).format("DD/MM");

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
        <Text className="mb-1 font-semibold text-zinc-400">{weekDay}</Text>

        <Text className="text-3xl font-extrabold leading-tight">
          {dayAndMonth}
        </Text>

        <Progress.Root className="bg-base-100 my-6 h-3">
          <Progress.Indicator progress={progressPercentage} />
        </Progress.Root>

        <div className="flex flex-col gap-3">
          <Label flex="row" className="w-fit cursor-pointer">
            <Checkbox variant="success" className="bg-base-100" />

            <Text className="transition-colors peer-data-[state=checked]:text-zinc-400 peer-data-[state=checked]:line-through">
              Drink
            </Text>
          </Label>
        </div>
      </Popover.Content>
    </Popover.Root>
  );
};
