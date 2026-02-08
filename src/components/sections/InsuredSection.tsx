import React from 'react';
import { FormSection } from '../form/FormSection';
import { FormField } from '../form/FormField';
import { AutoLossFormData } from '@/types/autoLossForm';

interface InsuredSectionProps {
  formData: AutoLossFormData;
  updateField: <K extends keyof AutoLossFormData>(field: K, value: AutoLossFormData[K]) => void;
  errors: Partial<Record<keyof AutoLossFormData, string>>;
}

export const InsuredSection: React.FC<InsuredSectionProps> = ({ formData, updateField, errors }) => {
  return (
    <FormSection title="Insured">
      <div className="grid md:grid-cols-2 gap-4">
        <FormField 
          label="Name of Insured (First, Middle, Last)" 
          name="insured_name" 
          className="md:col-span-2"
          value={formData.insured_name}
          onChange={(e) => updateField('insured_name', e.target.value)}
          error={errors.insured_name}
          required
        />
        <FormField 
          label="Insured's Mailing Address" 
          name="insured_address" 
          className="md:col-span-2"
          value={formData.insured_address}
          onChange={(e) => updateField('insured_address', e.target.value)}
        />
        <FormField 
          label="Date of Birth" 
          name="insured_dob" 
          type="date"
          value={formData.insured_dob}
          onChange={(e) => updateField('insured_dob', e.target.value)}
        />
        <FormField 
          label="FEIN (if applicable)" 
          name="insured_fein"
          value={formData.insured_fein}
          onChange={(e) => updateField('insured_fein', e.target.value)}
        />
        <div className="flex flex-col">
          <label className="form-label">Marital Status / Civil Union (if applicable)</label>
          <select 
            name="insured_marital_status" 
            className="form-field"
            value={formData.insured_marital_status}
            onChange={(e) => updateField('insured_marital_status', e.target.value)}
          >
            <option value="">Select...</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
            <option value="civil_union">Civil Union</option>
          </select>
        </div>
        <FormField 
          label="Primary Phone #" 
          name="insured_phone_primary"
          type="tel"
          value={formData.insured_phone_primary}
          onChange={(e) => updateField('insured_phone_primary', e.target.value)}
        />
        <FormField 
          label="Secondary Phone #" 
          name="insured_phone_secondary"
          type="tel"
          value={formData.insured_phone_secondary}
          onChange={(e) => updateField('insured_phone_secondary', e.target.value)}
        />
        <FormField 
          label="Primary E-mail Address" 
          name="insured_email_primary" 
          type="email"
          value={formData.insured_email_primary}
          onChange={(e) => updateField('insured_email_primary', e.target.value)}
          error={errors.insured_email_primary}
        />
        <FormField 
          label="Secondary E-mail Address" 
          name="insured_email_secondary" 
          type="email"
          value={formData.insured_email_secondary}
          onChange={(e) => updateField('insured_email_secondary', e.target.value)}
        />
      </div>
    </FormSection>
  );
};
