import dayjs from "dayjs";

import { HabitDay } from "@/components/modules";
import { generateDatesFromYearBeginning } from "@/utils";

const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

type Summary = {
  id: string;
  date: Date;
  amount: number;
  completed: number;
}[];

export async function SummaryTable() {
  const summary = (await fetch("http://localhost:3333/habits/summary", {
    cache: "no-store",
  }).then((res) => res.json())) as Summary;

  const dates = generateDatesFromYearBeginning();

  const minimumDatesLength = 18 * 7; // 18 weeks in days
  const amountOfDaysToFill = minimumDatesLength - dates.length;

  return (
    <div className="flex w-full">
      <div className="grid-rows-7 grid grid-flow-row gap-3">
        {weekDays.map((day, i) => (
          <div
            key={day + i}
            className="flex h-10 w-10 items-center justify-center text-xl font-bold text-zinc-400"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid-rows-7 grid grid-flow-col gap-3">
        {dates.map((date) => {
          const dayInSummary = summary.find((day) =>
            dayjs(date).isSame(day.date, "day"),
          );

          return (
            <HabitDay
              key={date.toString()}
              stringifiedDate={date.toDateString()}
              defaultCompleted={dayInSummary?.completed}
              amount={dayInSummary?.amount}
            />
          );
        })}

        {amountOfDaysToFill > 0
          ? Array.from({ length: amountOfDaysToFill }).map((_, i) => (
              <div
                key={i}
                className="bg-base-200 border-base-100 h-10 w-10 cursor-not-allowed rounded-lg border-2 opacity-40"
              />
            ))
          : null}
      </div>
    </div>
  );
}
