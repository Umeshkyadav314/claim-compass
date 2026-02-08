import React from 'react';
import { cn } from '@/lib/utils';

interface CheckboxOptionProps {
  label: string;
  name: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const CheckboxOption: React.FC<CheckboxOptionProps> = ({
  label,
  name,
  checked,
  onChange,
  className,
}) => {
  return (
    <label className={cn('flex items-center gap-2 cursor-pointer text-sm', className)}>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 rounded border-form-border text-primary focus:ring-primary/30"
      />
      <span>{label}</span>
    </label>
  );
};
