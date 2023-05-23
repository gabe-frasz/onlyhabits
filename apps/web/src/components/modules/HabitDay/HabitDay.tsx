"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  ProgressIndicator,
  Text,
} from "@c6r/react";
import dayjs from "dayjs";
import { useState } from "react";
import c from "tm-cl";

import { HabitsList } from "./components/HabitsList";

interface HabitDayProps {
  stringifiedDate: string;
  defaultCompleted?: number;
  amount?: number;
}

export const HabitDay = ({
  stringifiedDate,
  defaultCompleted = 0,
  amount = 0,
}: HabitDayProps) => {
  const [completed, setCompleted] = useState(defaultCompleted);

  const progressPercentage =
    amount > 0 ? Math.round((completed / amount) * 100) : 0;

  const date = new Date(stringifiedDate);
  const weekDay = dayjs(date).format("dddd");
  const dayAndMonth = dayjs(date).format("DD/MM");

  function handleCompletedChange(completed: number) {
    setCompleted(completed);
  }

  return (
    <Popover>
      <PopoverTrigger
        className={c("h-10 w-10 rounded-lg border-2 transition-colors", {
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

      <PopoverContent className="z-50 flex w-screen max-w-sm flex-col p-6">
        <Text className="mb-1 font-semibold text-zinc-400">{weekDay}</Text>

        <Text className="text-3xl font-extrabold leading-tight">
          {dayAndMonth}
        </Text>

        <Progress value={progressPercentage} className="bg-base-100 my-6 h-3">
          <ProgressIndicator />
        </Progress>

        <HabitsList date={date} onCompletedChange={handleCompletedChange} />
      </PopoverContent>
    </Popover>
  );
};
