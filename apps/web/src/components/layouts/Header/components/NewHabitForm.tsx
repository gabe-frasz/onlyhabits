import { Button, Checkbox, Input, Label } from "@c6r/react";
import { Check, Note } from "phosphor-react";
import { useState } from "react";

export const NewHabitForm = () => {
  const [checked, setChecked] = useState<boolean | "indeterminate">(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="flex flex-col gap-4"
    >
      <Label>
        What&apos;s your assignment?
        <Input.Root>
          <Note size={20} />
          <Input.Field placeholder="e.g. Workout, sleep well..." autoFocus />
        </Input.Root>
      </Label>

      <fieldset className="flex flex-col gap-2">
        <Label>How often?</Label>

        <Label flex="row">
          <Checkbox checked={checked} onCheckedChange={setChecked} />
          Sunday
        </Label>
      </fieldset>

      <Button
        type="submit"
        variant="success"
        className="w-full justify-center text-white"
      >
        <Check weight="bold" size={20} />
        Save
      </Button>
    </form>
  );
};
