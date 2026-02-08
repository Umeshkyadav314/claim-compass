import React from 'react';
import { cn } from '@/lib/utils';

interface PhoneGroupProps {
  label: string;
  name: string;
  className?: string;
}

export const PhoneGroup: React.FC<PhoneGroupProps> = ({ label, name, className }) => {
  return (
    <div className={cn('flex flex-col', className)}>
      <label className="form-label">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="tel"
          name={`${name}_number`}
          placeholder="(000) 000-0000"
          className="form-field flex-1"
        />
        <div className="form-checkbox-group shrink-0">
          <label className="flex items-center gap-1 cursor-pointer">
            <input type="radio" name={`${name}_type`} value="home" className="w-3 h-3" />
            <span>HOME</span>
          </label>
          <label className="flex items-center gap-1 cursor-pointer">
            <input type="radio" name={`${name}_type`} value="bus" className="w-3 h-3" />
            <span>BUS</span>
          </label>
          <label className="flex items-center gap-1 cursor-pointer">
            <input type="radio" name={`${name}_type`} value="cell" className="w-3 h-3" />
            <span>CELL</span>
          </label>
        </div>
      </div>
    </div>
  );
};
