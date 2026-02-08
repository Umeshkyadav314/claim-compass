import React from 'react';
import { FormSection } from '../form/FormSection';
import { FormField } from '../form/FormField';
import { PhoneGroup } from '../form/PhoneGroup';
import { AutoLossFormData } from '@/types/autoLossForm';

interface AgencySectionProps {
  formData: AutoLossFormData;
  updateField: <K extends keyof AutoLossFormData>(field: K, value: AutoLossFormData[K]) => void;
  errors: Partial<Record<keyof AutoLossFormData, string>>;
}

export const AgencySection: React.FC<AgencySectionProps> = ({ formData, updateField, errors }) => {
  return (
    <FormSection title="Agency Information">
      <div className="grid md:grid-cols-2 gap-4">
        <FormField 
          label="Agency Name" 
          name="agency_name" 
          className="md:col-span-2"
          value={formData.agency_name}
          onChange={(e) => updateField('agency_name', e.target.value)}
          error={errors.agency_name}
        />
        <FormField 
          label="Contact Name" 
          name="agency_contact"
          value={formData.agency_contact}
          onChange={(e) => updateField('agency_contact', e.target.value)}
        />
        <FormField 
          label="Phone (A/C, No, Ext)" 
          name="agency_phone"
          type="tel"
          value={formData.agency_phone}
          onChange={(e) => updateField('agency_phone', e.target.value)}
        />
        <FormField 
          label="Fax (A/C, No)" 
          name="agency_fax" 
          type="tel"
          value={formData.agency_fax}
          onChange={(e) => updateField('agency_fax', e.target.value)}
        />
        <FormField 
          label="E-mail Address" 
          name="agency_email" 
          type="email"
          value={formData.agency_email}
          onChange={(e) => updateField('agency_email', e.target.value)}
          error={errors.agency_email}
        />
        <FormField 
          label="Address" 
          name="agency_address" 
          className="md:col-span-2"
          value={formData.agency_address}
          onChange={(e) => updateField('agency_address', e.target.value)}
        />
        <FormField 
          label="Code" 
          name="agency_code"
          value={formData.agency_code}
          onChange={(e) => updateField('agency_code', e.target.value)}
        />
        <FormField 
          label="Subcode" 
          name="agency_subcode"
          value={formData.agency_subcode}
          onChange={(e) => updateField('agency_subcode', e.target.value)}
        />
        <FormField 
          label="Agency Customer ID" 
          name="agency_customer_id"
          value={formData.agency_customer_id}
          onChange={(e) => updateField('agency_customer_id', e.target.value)}
        />
      </div>
    </FormSection>
  );
};
