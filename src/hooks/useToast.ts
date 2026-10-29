import { useState, useCallback } from 'react';
import { ToastMessage } from '../components/Toast';

export function useToast(duration = 3000) {
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const showToast = useCallback(
    (message: string, icon?: string) => {
      const id = Date.now().toString();
      setToast({ id, message, icon });
      setTimeout(() => {
        setToast((current) => (current?.id === id ? null : current));
      }, duration);
    },
    [duration]
  );

  return { toast, showToast };
}
