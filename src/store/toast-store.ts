import { create } from 'zustand';
import type { ToasterToast, ToastState } from '@/types/toast-types';

const TOAST_REMOVE_DELAY = 10000; // 10 seconds

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
    // first mark toast as closed, then removal will be scheduled by dismissToast
    useToastStore.getState().dismissToast(toastId);
    console.log(`Toast ${toastId} auto-dismissed after timeout`);
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

export const useToastStore = create<State>((set, get) => ({
  toasts: [],

  addToast: (toast) =>
    set((state) => ({
      toasts: [toast, ...state.toasts],
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

    // schedule auto-dismiss after configured delay
    addToRemoveQueue(id);

    return { id, dismiss, update };
  },
}));

export default useToastStore;
