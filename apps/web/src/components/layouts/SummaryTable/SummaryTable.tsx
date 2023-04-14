import { auth } from "@clerk/nextjs/app-beta";
import dayjs from "dayjs";

import { HabitDay } from "@/components/modules";
import { generateDatesFromYearBeginning, weekDays } from "@/utils";

type Summary = {
  id: string;
  date: Date;
  amount: number;
  completed: number;
}[];

const getSummary = async () => {
  const { getToken } = auth();

  const res = await fetch("http://localhost:3333/habits/summary", {
    cache: "no-store",
    headers: { Authorization: `Bearer ${await getToken()}` },
  });

  return res.json() as unknown as Summary;
};

export async function SummaryTable() {
  const summary = await getSummary();

  const dates = generateDatesFromYearBeginning();
  const minimumDatesLength = 18 * 7; // 18 weeks in days
  const amountOfDaysToFill = minimumDatesLength - dates.length;

  return (
    <section className="flex w-full flex-col sm:flex-row">
      <div className="bg-base-300 sticky top-0 flex justify-between gap-3 sm:flex-col">
        {weekDays.map((day, i) => (
          <div
            key={day + i}
            className="flex h-10 w-10 items-center justify-center text-xl font-bold text-zinc-400"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="sm:max-h-none overflow-y-scroll sm:overflow-y-auto sm:overflow-x-scroll">
        <div className="sm:grid-rows-7 grid min-w-fit grid-flow-row grid-cols-7 place-items-center gap-3 sm:grid sm:grid-flow-col sm:grid-cols-none">
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
    </section>
  );
}
