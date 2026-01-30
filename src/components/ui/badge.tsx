import * as React from 'react';

export type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
}

function variantClasses(variant: BadgeVariant | undefined) {
  switch (variant) {
    case 'secondary':
      return 'border-transparent bg-secondary text-secondary-foreground';
    case 'destructive':
      return 'border-transparent bg-destructive text-destructive-foreground shadow-xs';
    case 'outline':
      return 'border border-slate-200 bg-transparent text-slate-700';
    case 'default':
    default:
      return 'border-transparent bg-primary text-white shadow-xs';
  }
}

export function Badge({ className = '', variant = 'default', ...props }: BadgeProps) {
  const base =
    'whitespace-nowrap inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

  const classes = `${base} ${variantClasses(variant)} ${className}`.trim();

  return <div className={classes} {...props} />;
}

export default Badge;
