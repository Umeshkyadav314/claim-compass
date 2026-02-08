import React from 'react';
import { FormSection } from '../form/FormSection';
import { FormField } from '../form/FormField';
import { CheckboxOption } from '../form/CheckboxOption';
import { AutoLossFormData } from '@/types/autoLossForm';

interface ContactSectionProps {
  formData: AutoLossFormData;
  updateField: <K extends keyof AutoLossFormData>(field: K, value: AutoLossFormData[K]) => void;
  errors: Partial<Record<keyof AutoLossFormData, string>>;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ formData, updateField, errors }) => {
  return (
    <FormSection title="Contact">
      <div className="flex gap-4 mb-4">
        <CheckboxOption 
          label="Contact Insured" 
          name="contact_is_insured"
          checked={formData.contact_is_insured}
          onChange={(e) => updateField('contact_is_insured', e.target.checked)}
        />
      </div>
      {!formData.contact_is_insured && (
        <div className="grid md:grid-cols-2 gap-4">
          <FormField 
            label="Name of Contact (First, Middle, Last)" 
            name="contact_name" 
            className="md:col-span-2"
            value={formData.contact_name}
            onChange={(e) => updateField('contact_name', e.target.value)}
          />
          <FormField 
            label="Contact's Mailing Address" 
            name="contact_address" 
            className="md:col-span-2"
            value={formData.contact_address}
            onChange={(e) => updateField('contact_address', e.target.value)}
          />
          <FormField 
            label="Primary Phone #" 
            name="contact_phone_primary"
            type="tel"
            value={formData.contact_phone_primary}
            onChange={(e) => updateField('contact_phone_primary', e.target.value)}
          />
          <FormField 
            label="Secondary Phone #" 
            name="contact_phone_secondary"
            type="tel"
            value={formData.contact_phone_secondary}
            onChange={(e) => updateField('contact_phone_secondary', e.target.value)}
          />
          <FormField 
            label="Primary E-mail Address" 
            name="contact_email_primary" 
            type="email"
            value={formData.contact_email_primary}
            onChange={(e) => updateField('contact_email_primary', e.target.value)}
          />
          <FormField 
            label="Secondary E-mail Address" 
            name="contact_email_secondary" 
            type="email"
            value={formData.contact_email_secondary}
            onChange={(e) => updateField('contact_email_secondary', e.target.value)}
          />
          <FormField 
            label="When to Contact" 
            name="contact_when" 
            className="md:col-span-2"
            value={formData.contact_when}
            onChange={(e) => updateField('contact_when', e.target.value)}
          />
        </div>
      )}
    </FormSection>
  );
};
