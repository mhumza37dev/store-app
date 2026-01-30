import * as React from 'react';
import { X } from 'lucide-react';

// A lightweight Tailwind-only replacement for the original Radix-based toast.
// This keeps the same exported symbols but uses plain HTML + Tailwind classes.

const ToastProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return <div>{children}</div>;
};

type Position =
  | 'top-left'
  | 'top-right'
  | 'top-center'
  | 'bottom-left'
  | 'bottom-right'
  | 'bottom-center';

const ToastViewport = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { position?: Position }
>(({ className = '', position = 'top-right', ...props }, ref) => {
  const base = 'fixed z-[100] p-4 flex gap-2 pointer-events-none';

  let posClass = 'top-4 right-4 items-end';

  switch (position) {
    case 'top-left':
      posClass = 'top-4 left-4 items-start';
      break;
    case 'top-center':
      posClass = 'top-4 left-1/2 -translate-x-1/2 items-center';
      break;
    case 'top-right':
      posClass = 'top-4 right-4 items-end';
      break;
    case 'bottom-left':
      posClass = 'bottom-4 left-4 items-start';
      break;
    case 'bottom-center':
      posClass = 'bottom-4 left-1/2 -translate-x-1/2 items-center';
      break;
    case 'bottom-right':
      posClass = 'bottom-4 right-4 items-end';
      break;
  }

  // For bottom positions we stack upward
  const flexDir = position.startsWith('bottom') ? 'flex-col-reverse' : 'flex-col';

  return <div ref={ref} className={`${base} ${posClass} ${flexDir} ${className}`} {...props} />;
});
ToastViewport.displayName = 'ToastViewport';

const Toast = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { open?: boolean }
>(({ className = '', children, ...props }, ref) => {
  const isOpen = (props as any).open ?? true;
  const variant = (props as any).variant as 'success' | 'error' | 'info' | 'warning' | undefined;

  const base =
    'group pointer-events-auto relative flex items-start justify-between space-x-4 overflow-hidden rounded-md border p-4 pr-8 shadow-lg transform transition-all duration-300 ease-out w-full max-w-[380px] sm:max-w-[380px]';

  const stateClass = isOpen
    ? 'opacity-100 translate-y-0 scale-100'
    : 'opacity-0 -translate-y-2 scale-95 pointer-events-none';

  // color mapping
  const colorClass =
    variant === 'success'
      ? 'bg-green-50 border-green-200 text-green-800'
      : variant === 'error'
        ? 'bg-red-50 border-red-200 text-red-800'
        : variant === 'warning'
          ? 'bg-yellow-50 border-yellow-200 text-yellow-800'
          : variant === 'info'
            ? 'bg-blue-50 border-blue-200 text-blue-800'
            : 'bg-white border-gray-200 text-gray-900';

  return (
    <div
      ref={ref}
      role="status"
      className={`${base} ${colorClass} ${stateClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});
Toast.displayName = 'Toast';

const ToastAction = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className = '', children, ...props }, ref) => (
  <button
    ref={ref}
    className={
      'inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ' +
      className
    }
    {...props}
  >
    {children}
  </button>
));
ToastAction.displayName = 'ToastAction';

const ToastClose = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className = '', ...props }, ref) => (
  <button
    ref={ref}
    aria-label="Close"
    className={
      'absolute right-2 top-2 rounded-md p-1 text-gray-500 opacity-0 transition-opacity hover:text-gray-700 focus:opacity-100 focus:outline-none group-hover:opacity-100 ' +
      className
    }
    {...props}
  >
    <X className="h-4 w-4" />
  </button>
));
ToastClose.displayName = 'ToastClose';

const ToastTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = '', children, ...props }, ref) => (
    <div ref={ref} className={'text-sm font-semibold ' + className} {...props}>
      {children}
    </div>
  ),
);
ToastTitle.displayName = 'ToastTitle';

const ToastDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = '', children, ...props }, ref) => (
    <div ref={ref} className={'text-sm opacity-90 ' + className} {...props}>
      {children}
    </div>
  ),
);
ToastDescription.displayName = 'ToastDescription';

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;
type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};
