import * as React from 'react';
import type { ToastActionElement, ToastProps } from '@/components/ui/toast';

export type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export type ToastState = {
  toasts: ToasterToast[];
  addToast: (toast: ToasterToast) => void;
  updateToast: (toast: Partial<ToasterToast> & { id: string }) => void;
  dismissToast: (toastId?: string) => void;
  removeToast: (toastId?: string) => void;
  toast: (props: Omit<ToasterToast, 'id'>) => {
    id: string;
    dismiss: () => void;
    update: (props: Partial<ToasterToast>) => void;
  };
};
