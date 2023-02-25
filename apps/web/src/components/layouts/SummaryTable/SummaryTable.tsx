import { generateDatesFromYearBeginning } from "@/utils";
import { HabitDay } from "../../modules";

const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

export const SummaryTable = () => {
  const dates = generateDatesFromYearBeginning();

  const minimumDatesSize = 18 * 7; // 18 weeks in days
  const amountOfDaysToFill = minimumDatesSize - dates.length;

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
        {dates.map((date) => (
          <HabitDay key={date.toString()} />
        ))}

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
};
