import { create } from 'zustand';
import type { ToasterToast, ToastState } from '@/types/toast-types';

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;

let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

type State = ToastState;

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) return;

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    // call removeToast from the store
    useToastStore.getState().removeToast(toastId);
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

export const useToastStore = create<State>((set, get) => ({
  toasts: [],

  addToast: (toast) =>
    set((state) => ({
      toasts: [toast, ...state.toasts].slice(0, TOAST_LIMIT),
    })),

  updateToast: (toast) =>
    set((state) => ({
      toasts: state.toasts.map((t) => (t.id === toast.id ? { ...t, ...toast } : t)),
    })),

  dismissToast: (toastId) => {
    if (toastId) {
      addToRemoveQueue(toastId);
    } else {
      get().toasts.forEach((t) => addToRemoveQueue(t.id));
    }

    set((state) => ({
      toasts: state.toasts.map((t) =>
        t.id === toastId || toastId === undefined ? { ...t, open: false } : t,
      ),
    }));
  },

  removeToast: (toastId) =>
    set((state) => ({
      toasts: toastId === undefined ? [] : state.toasts.filter((t) => t.id !== toastId),
    })),

  toast: (props) => {
    const id = genId();

    const update = (p: Partial<ToasterToast>) => get().updateToast({ ...p, id });
    const dismiss = () => get().dismissToast(id);

    get().addToast({
      ...(props as ToasterToast),
      id,
      open: true,
      onOpenChange: (open: boolean) => {
        if (!open) dismiss();
      },
    });

    return { id, dismiss, update };
  },
}));

export default useToastStore;
