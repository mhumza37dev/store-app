import { useToast } from '@/hooks/use-toast';
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast';

export function Toaster() {
  const { toasts, dismiss } = useToast();

  const positions: Array<
    'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
  > = ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'];

  return (
    <ToastProvider>
      {positions.map((pos) => {
        const grouped = toasts.filter((t) => (t.position || 'top-right') === pos);
        if (grouped.length === 0) return null;

        return (
          <ToastViewport key={pos} position={pos}>
            {grouped.map(function ({ id, title, description, action, ...props }) {
              return (
                <Toast key={id} {...props}>
                  <div className="grid gap-1">
                    {title && <ToastTitle>{title}</ToastTitle>}
                    {description && <ToastDescription>{description}</ToastDescription>}
                  </div>
                  {action}
                  <ToastClose onClick={() => dismiss(id)} />
                </Toast>
              );
            })}
          </ToastViewport>
        );
      })}
    </ToastProvider>
  );
}
