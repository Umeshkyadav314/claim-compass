import React from 'react';
import { FormSection } from '../form/FormSection';
import { FormField } from '../form/FormField';
import { AutoLossFormData } from '@/types/autoLossForm';

interface LossSectionProps {
  formData: AutoLossFormData;
  updateField: <K extends keyof AutoLossFormData>(field: K, value: AutoLossFormData[K]) => void;
  errors: Partial<Record<keyof AutoLossFormData, string>>;
}

export const LossSection: React.FC<LossSectionProps> = ({ formData, updateField, errors }) => {
  return (
    <FormSection title="Loss">
      <div className="grid md:grid-cols-2 gap-4">
        <FormField 
          label="Location of Loss" 
          name="loss_location"
          value={formData.loss_location}
          onChange={(e) => updateField('loss_location', e.target.value)}
        />
        <FormField 
          label="Police or Fire Department Contacted" 
          name="loss_department"
          value={formData.loss_department}
          onChange={(e) => updateField('loss_department', e.target.value)}
        />
        <FormField 
          label="Street" 
          name="loss_street" 
          className="md:col-span-2"
          value={formData.loss_street}
          onChange={(e) => updateField('loss_street', e.target.value)}
        />
        <FormField 
          label="City, State, ZIP" 
          name="loss_city_state_zip"
          value={formData.loss_city_state_zip}
          onChange={(e) => updateField('loss_city_state_zip', e.target.value)}
        />
        <FormField 
          label="Report Number" 
          name="loss_report_number"
          value={formData.loss_report_number}
          onChange={(e) => updateField('loss_report_number', e.target.value)}
        />
        <FormField 
          label="Country" 
          name="loss_country"
          value={formData.loss_country}
          onChange={(e) => updateField('loss_country', e.target.value)}
        />
        <FormField 
          label="Describe Location of Loss if Not at Specific Street Address" 
          name="loss_location_desc" 
          type="textarea"
          className="md:col-span-2"
          value={formData.loss_location_desc}
          onChange={(e) => updateField('loss_location_desc', e.target.value)}
        />
        <FormField 
          label="Description of Accident (ACORD 101, Additional Remarks Schedule, may be attached if more space is required)" 
          name="loss_accident_desc" 
          type="textarea"
          rows={5}
          className="md:col-span-2"
          value={formData.loss_accident_desc}
          onChange={(e) => updateField('loss_accident_desc', e.target.value)}
          error={errors.loss_accident_desc}
          required
        />
      </div>
    </FormSection>
  );
};
