"use client";

import { Button, Modal } from "@c6r/react";
import { Plus } from "phosphor-react";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { Form } from "./Form";

export const NewHabitModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleFormSubmit() {
    setIsModalOpen(false);
    toast.success("Habit created!");
  }

  return (
    <Modal.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
      <Modal.Trigger asChild>
        <Button variant="outline" className="group py-2 sm:ml-auto">
          New habit
          <Plus
            weight="bold"
            className="transition-transform group-hover:rotate-180"
          />
        </Button>
      </Modal.Trigger>

      <Modal.Content className="w-full sm:max-w-xs">
        <Modal.Title className="mb-8">Create Habit</Modal.Title>

        <Form onSuccess={handleFormSubmit} />
      </Modal.Content>
    </Modal.Root>
  );
};
