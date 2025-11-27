import { useState, useCallback } from "react";

type TFunction<T> = () => T;

type TResult = {
  isModalOpen: boolean;
  openModal: TFunction<void>;
  closeModal: TFunction<void>;
};

type TUseModal = TFunction<TResult>;

export const useModal: TUseModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal: TFunction<void> = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal: TFunction<void> = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
};
