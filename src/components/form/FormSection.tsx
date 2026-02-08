import React from 'react';
import { cn } from '@/lib/utils';

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  accent?: boolean;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  children,
  className,
  accent = false,
}) => {
  return (
    <div className={cn('form-section', className)}>
      <div className={accent ? 'bg-accent text-accent-foreground px-4 py-2.5 font-semibold text-sm uppercase tracking-wide' : 'form-section-header'}>
        {title}
      </div>
      <div className="form-section-content">
        {children}
      </div>
    </div>
  );
};
