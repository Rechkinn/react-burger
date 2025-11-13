import { useState, useCallback } from "react";

type TResult = {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

type TUseModal = () => TResult;

export const useModal: TUseModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  type TFunction = () => void;

  const openModal: TFunction = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal: TFunction = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
};
