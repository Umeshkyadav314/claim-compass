import React from 'react';
import { cn } from '@/lib/utils';

interface YesNoRadioProps {
  label: string;
  name: string;
  className?: string;
  value?: 'yes' | 'no' | '';
  onChange?: (value: 'yes' | 'no') => void;
}

export const YesNoRadio: React.FC<YesNoRadioProps> = ({ label, name, className, value, onChange }) => {
  return (
    <div className={cn('flex items-center justify-between gap-4 py-2 border-b border-form-border last:border-0', className)}>
      <span className="text-sm flex-1">{label}</span>
      <div className="flex items-center gap-4 shrink-0">
        <label className="flex items-center gap-1.5 cursor-pointer text-sm">
          <input 
            type="radio" 
            name={name} 
            value="yes" 
            className="w-4 h-4"
            checked={value === 'yes'}
            onChange={() => onChange?.('yes')}
          />
          <span>Y</span>
        </label>
        <label className="flex items-center gap-1.5 cursor-pointer text-sm">
          <input 
            type="radio" 
            name={name} 
            value="no" 
            className="w-4 h-4"
            checked={value === 'no'}
            onChange={() => onChange?.('no')}
          />
          <span>N</span>
        </label>
      </div>
    </div>
  );
};
