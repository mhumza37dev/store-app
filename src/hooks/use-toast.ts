import { useCallback } from 'react';
import useToastStore from '@/store/toast-store';

export function useToast() {
  const toasts = useToastStore((s) => s.toasts);
  const toast = useToastStore((s) => s.toast);

  const dismiss = useCallback((toastId?: string) => {
    useToastStore.getState().dismissToast(toastId);
  }, []);

  return {
    toasts,
    toast,
    dismiss,
  };
}

export default useToast;
