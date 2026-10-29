import React from 'react';
import { getLucideIcon } from './DocIcon';

export interface ToastMessage {
  id: string;
  message: string;
  icon?: string;
}

interface ToastProps {
  toast: ToastMessage | null;
}

export const Toast: React.FC<ToastProps> = ({ toast }) => {
  if (!toast) return null;

  return (
    <div className="toast">
      {toast.icon && getLucideIcon(toast.icon, 'w-4 h-4 text-teal-400')}
      <span>{toast.message}</span>
    </div>
  );
};
