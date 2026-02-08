import React from 'react';
import { FormSection } from '../form/FormSection';
import { FormField } from '../form/FormField';
import { AutoLossFormData } from '@/types/autoLossForm';

interface RemarksSectionProps {
  formData: AutoLossFormData;
  updateField: <K extends keyof AutoLossFormData>(field: K, value: AutoLossFormData[K]) => void;
  errors: Partial<Record<keyof AutoLossFormData, string>>;
}

export const RemarksSection: React.FC<RemarksSectionProps> = ({ formData, updateField, errors }) => {
  return (
    <FormSection title="Remarks">
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <FormField 
          label="Reported By" 
          name="reported_by"
          value={formData.reported_by}
          onChange={(e) => updateField('reported_by', e.target.value)}
        />
        <FormField 
          label="Reported To" 
          name="reported_to"
          value={formData.reported_to}
          onChange={(e) => updateField('reported_to', e.target.value)}
        />
      </div>
      <FormField 
        label="Remarks (ACORD 101, Additional Remarks Schedule, may be attached if more space is required)" 
        name="remarks" 
        type="textarea"
        rows={6}
        value={formData.remarks}
        onChange={(e) => updateField('remarks', e.target.value)}
      />
    </FormSection>
  );
};
