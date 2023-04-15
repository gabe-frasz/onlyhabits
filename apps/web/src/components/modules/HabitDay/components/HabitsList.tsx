import { Checkbox, Label, Spinner, Text } from "@c6r/react";
import { useAuth } from "@clerk/nextjs";
import dayjs from "dayjs";

import { useClerkSWR } from "@/hooks";

interface HabitsResponse {
  habits: {
    id: string;
    title: string;
    weekDays: number[];
    completed: boolean;
    createdAt: Date;
  }[];
}

interface HabitsListProps {
  date: Date;
  onCompletedChange: (completed: number) => void;
}

export const HabitsList = (props: HabitsListProps) => {
  const { data, isLoading, error, mutate } = useClerkSWR<HabitsResponse>(
    `/habits?date=${props.date.toISOString()}`,
  );
  const { getToken } = useAuth();

  const isDateInPast = dayjs(props.date).isBefore(new Date(), "day");

  async function handleToggleHabit(habitId: string) {
    await fetch(`http://localhost:3333/habits/${habitId}/toggle`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${await getToken()}` },
    });

    await mutate(data, {
      optimisticData(currentData?) {
        const habitListWithToggledItem = currentData?.habits.map((habit) =>
          habit.id === habitId
            ? { ...habit, completed: !habit.completed }
            : habit,
        );

        const completedHabits = habitListWithToggledItem?.filter(
          (habit) => habit.completed,
        ).length;
        props.onCompletedChange(completedHabits!);

        return { habits: habitListWithToggledItem! };
      },
    });
  }

  if (isLoading) return <Spinner size={32} />;
  if (error || !data) return <div>Error</div>;

  return (
    <div className="flex flex-col gap-3">
      {data.habits.length === 0
        ? "No habits were registered on this date"
        : data.habits.map((habit) => (
            <Label key={habit.id} flex="row" className="w-fit">
              <Checkbox
                theme="success"
                checked={habit.completed}
                onCheckedChange={() => handleToggleHabit(habit.id)}
                disabled={isDateInPast}
                className="bg-base-100 peer disabled:cursor-not-allowed"
              />

              <Text className="cursor-pointer transition-colors peer-disabled:cursor-not-allowed peer-data-[state=checked]:text-zinc-400 peer-data-[state=checked]:line-through">
                {habit.title}
              </Text>
            </Label>
          ))}
    </div>
  );
};
