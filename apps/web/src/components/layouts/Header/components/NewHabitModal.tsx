import { Button, Modal } from "@c6r/react";
import { Plus } from "phosphor-react";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { NewHabitForm } from "./NewHabitForm";

export const NewHabitModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleFormSubmit() {
    setIsModalOpen(false);
    toast.success("Habit created!");
  }

  return (
    <Modal.Root onOpenChange={setIsModalOpen}>
      <Modal.Trigger asChild>
        <Button variant="outline" className="group ml-auto py-2">
          New habit
          <Plus
            weight="bold"
            className="transition-transform group-hover:rotate-180"
          />
        </Button>
      </Modal.Trigger>

      <Modal.Content open={isModalOpen} className="w-full max-w-xs">
        <Modal.Title className="mb-8">Create Habit</Modal.Title>

        <NewHabitForm onSuccess={handleFormSubmit} />
      </Modal.Content>
    </Modal.Root>
  );
};
