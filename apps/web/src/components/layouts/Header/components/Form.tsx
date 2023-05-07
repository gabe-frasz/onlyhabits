import { Button, Checkbox, Input, Label } from "@c6r/react";
import { useAuth } from "@clerk/nextjs";
import { Check } from "phosphor-react";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

import { env } from "@/env";

const staticWeekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

interface FormProps {
  onSuccess?: () => void;
}

export const Form = ({ onSuccess = () => {} }: FormProps) => {
  const { getToken } = useAuth();
  const [title, setTitle] = useState("");
  const [weekDays, setHabitWeekDays] = useState<number[]>([]);

  function handleToggleWeekDays(weekDay: number) {
    if (weekDays.includes(weekDay)) {
      const filteredWeekDays = weekDays.filter((day) => day !== weekDay);
      setHabitWeekDays(filteredWeekDays);
      return;
    }

    setHabitWeekDays([...weekDays, weekDay]);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (title.trim() === "" || weekDays.length === 0) {
      toast.error("Cannot submit with empty fields!");
      return;
    }

    try {
      await fetch(env.NEXT_PUBLIC_SERVER_API_URL + "/habits", {
        method: "POST",
        body: JSON.stringify({ title, weekDays }),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
      });
    } catch (error) {
      return console.log(error);
    }

    onSuccess();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <Label>
        What&apos;s your assignment?
        <Input.Root>
          <Input.Field
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Workout, sleep well..."
            autoFocus
          />
        </Input.Root>
      </Label>

      <fieldset className="flex flex-col gap-2">
        <Label>How often?</Label>

        {staticWeekDays.map((day, i) => (
          <Label key={day} flex="row" className="w-fit cursor-pointer">
            <Checkbox onCheckedChange={() => handleToggleWeekDays(i)} />

            {day}
          </Label>
        ))}
      </fieldset>

      <Button type="submit" theme="success" className="w-full justify-center">
        <Check weight="bold" size={20} />
        Save
      </Button>
    </form>
  );
};
