import { Checkbox, CheckboxIndicator, Label, Spinner, Text } from "@c6r/react";
import { useAuth } from "@clerk/nextjs";
import dayjs from "dayjs";

import { env } from "@/env";
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
    const habitListWithToggledItem = data?.habits.map((habit) =>
      habit.id === habitId ? { ...habit, completed: !habit.completed } : habit,
    );

    const completedHabits = habitListWithToggledItem?.filter(
      (habit) => habit.completed,
    );
    props.onCompletedChange(completedHabits?.length ?? 0);

    await Promise.all([
      fetch(env.NEXT_PUBLIC_SERVER_API_URL + `/habits/${habitId}/toggle`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${await getToken()}` },
      }),

      mutate({ habits: habitListWithToggledItem! }, { revalidate: false }),
    ]);
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
              >
                <CheckboxIndicator />
              </Checkbox>

              <Text className="cursor-pointer transition-colors peer-disabled:cursor-not-allowed peer-data-[state=checked]:text-zinc-400 peer-data-[state=checked]:line-through">
                {habit.title}
              </Text>
            </Label>
          ))}
    </div>
  );
};
