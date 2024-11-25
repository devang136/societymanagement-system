import { useState } from "react";

type Toast = {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
};

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  return {
    toasts,
    // Add other toast methods as needed
  };
} 