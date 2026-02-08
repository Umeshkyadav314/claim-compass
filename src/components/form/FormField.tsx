import React from 'react';
import { cn } from '@/lib/utils';

interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'date' | 'tel' | 'email' | 'textarea';
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  rows?: number;
  error?: string;
  required?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  placeholder,
  className,
  value,
  onChange,
  rows = 3,
  error,
  required,
}) => {
  return (
    <div className={cn('flex flex-col', className)}>
      <label htmlFor={name} className="form-label">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          className={cn('form-field resize-none', error && 'border-destructive focus:ring-destructive/30')}
          value={value}
          onChange={onChange}
          rows={rows}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          className={cn('form-field', error && 'border-destructive focus:ring-destructive/30')}
          value={value}
          onChange={onChange}
        />
      )}
      {error && <span className="text-xs text-destructive mt-1">{error}</span>}
    </div>
  );
};
