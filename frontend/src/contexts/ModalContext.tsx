import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
interface ModalContextType {
  isCreateExamModalOpen: boolean;
  openCreateExamModal: () => void;
  closeCreateExamModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isCreateExamModalOpen, setCreateExamModalOpen] = useState(false);

  const openCreateExamModal = () => setCreateExamModalOpen(true);
  const closeCreateExamModal = () => setCreateExamModalOpen(false);

  const value = {
    isCreateExamModalOpen,
    openCreateExamModal,
    closeCreateExamModal,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
