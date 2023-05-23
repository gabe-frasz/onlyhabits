"use client";

import {
  Button,
  Modal,
  ModalContent,
  ModalTitle,
  ModalTrigger,
} from "@c6r/react";
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
    <Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
      <ModalTrigger asChild>
        <Button variant="outline" className="group py-2 sm:ml-auto">
          New habit
          <Plus
            weight="bold"
            className="transition-transform group-hover:rotate-180"
          />
        </Button>
      </ModalTrigger>

      <ModalContent className="w-full sm:max-w-xs">
        <ModalTitle className="mb-8">Create Habit</ModalTitle>

        <Form onSuccess={handleFormSubmit} />
      </ModalContent>
    </Modal>
  );
};
