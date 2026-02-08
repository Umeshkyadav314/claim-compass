import React from 'react';
import { FormSection } from '../form/FormSection';
import { FormField } from '../form/FormField';
import { AutoLossFormData } from '@/types/autoLossForm';

interface PolicySectionProps {
  formData: AutoLossFormData;
  updateField: <K extends keyof AutoLossFormData>(field: K, value: AutoLossFormData[K]) => void;
  errors: Partial<Record<keyof AutoLossFormData, string>>;
}

export const PolicySection: React.FC<PolicySectionProps> = ({ formData, updateField, errors }) => {
  return (
    <FormSection title="Policy & Loss Information" accent>
      <div className="grid md:grid-cols-3 gap-4">
        <FormField 
          label="Date (MM/DD/YYYY)" 
          name="form_date" 
          type="date"
          value={formData.form_date}
          onChange={(e) => updateField('form_date', e.target.value)}
        />
        <FormField 
          label="Insured Location Code" 
          name="insured_location_code"
          value={formData.insured_location_code}
          onChange={(e) => updateField('insured_location_code', e.target.value)}
        />
        <div className="flex flex-col">
          <label className="form-label">
            Date of Loss and Time
            <span className="text-destructive ml-1">*</span>
          </label>
          <div className="flex gap-2">
            <input 
              type="date" 
              name="loss_date" 
              className={`form-field flex-1 ${errors.loss_date ? 'border-destructive' : ''}`}
              value={formData.loss_date}
              onChange={(e) => updateField('loss_date', e.target.value)}
            />
            <input 
              type="time" 
              name="loss_time" 
              className="form-field w-24"
              value={formData.loss_time}
              onChange={(e) => updateField('loss_time', e.target.value)}
            />
            <div className="flex items-center gap-2 text-xs shrink-0">
              <label className="flex items-center gap-1 cursor-pointer">
                <input 
                  type="radio" 
                  name="loss_time_period" 
                  value="am" 
                  className="w-3 h-3"
                  checked={formData.loss_time_period === 'am'}
                  onChange={() => updateField('loss_time_period', 'am')}
                />
                <span>AM</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <input 
                  type="radio" 
                  name="loss_time_period" 
                  value="pm" 
                  className="w-3 h-3"
                  checked={formData.loss_time_period === 'pm'}
                  onChange={() => updateField('loss_time_period', 'pm')}
                />
                <span>PM</span>
              </label>
            </div>
          </div>
          {errors.loss_date && <span className="text-xs text-destructive mt-1">{errors.loss_date}</span>}
        </div>
        <FormField 
          label="Carrier" 
          name="carrier"
          value={formData.carrier}
          onChange={(e) => updateField('carrier', e.target.value)}
        />
        <FormField 
          label="NAIC Code" 
          name="naic_code"
          value={formData.naic_code}
          onChange={(e) => updateField('naic_code', e.target.value)}
        />
        <FormField 
          label="Policy Number" 
          name="policy_number"
          value={formData.policy_number}
          onChange={(e) => updateField('policy_number', e.target.value)}
          error={errors.policy_number}
          required
        />
        <FormField 
          label="Line of Business" 
          name="line_of_business"
          value={formData.line_of_business}
          onChange={(e) => updateField('line_of_business', e.target.value)}
        />
      </div>
    </FormSection>
  );
};
