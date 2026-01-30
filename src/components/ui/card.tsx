import React, { forwardRef, type HTMLAttributes } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ as: Component = 'div', className = '', children, ...props }, ref) => (
    <Component
      ref={ref}
      className={`rounded-lg shadow-sm bg-white border border-gray-200 ${className}`}
      role="region"
      aria-label={props['aria-label'] || 'Card'}
      {...props}
    >
      {children}
    </Component>
  ),
);
Card.displayName = 'Card';

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ as: Component = 'div', className = '', children, ...props }, ref) => (
    <Component
      ref={ref}
      className={`p-4 ${className}`}
      role="group"
      aria-label={props['aria-label'] || 'Card Content'}
      {...props}
    >
      {children}
    </Component>
  ),
);
CardContent.displayName = 'CardContent';

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ as: Component = 'div', className = '', children, ...props }, ref) => (
    <Component
      ref={ref}
      className={`px-4 py-3 border-b border-gray-100 ${className}`}
      role="heading"
      aria-label={props['aria-label'] || 'Card Header'}
      {...props}
    >
      {children}
    </Component>
  ),
);
CardHeader.displayName = 'CardHeader';

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: React.ElementType;
}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ as: Component = 'h3', className = 'text-lg font-semibold', children, ...props }, ref) => (
    <Component ref={ref} className={`${className}`} {...props}>
      {children}
    </Component>
  ),
);
CardTitle.displayName = 'CardTitle';
