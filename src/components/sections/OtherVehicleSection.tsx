import React from 'react';
import { FormSection } from '../form/FormSection';
import { FormField } from '../form/FormField';
import { CheckboxOption } from '../form/CheckboxOption';
import { AutoLossFormData } from '@/types/autoLossForm';

interface OtherVehicleSectionProps {
  formData: AutoLossFormData;
  updateField: <K extends keyof AutoLossFormData>(field: K, value: AutoLossFormData[K]) => void;
  errors: Partial<Record<keyof AutoLossFormData, string>>;
}

export const OtherVehicleSection: React.FC<OtherVehicleSectionProps> = ({ formData, updateField, errors }) => {
  return (
    <FormSection title="Other Vehicle / Property Damaged">
      <div className="flex gap-4 mb-4">
        <CheckboxOption label="Non-Vehicle?" name="other_non_vehicle" checked={formData.other_non_vehicle} onChange={(e) => updateField('other_non_vehicle', e.target.checked)} />
      </div>
      
      {!formData.other_non_vehicle && (
        <div className="grid md:grid-cols-6 gap-4 mb-6">
          <FormField label="Veh #" name="other_vehicle_number" value={formData.other_vehicle_number} onChange={(e) => updateField('other_vehicle_number', e.target.value)} />
          <FormField label="Year" name="other_vehicle_year" value={formData.other_vehicle_year} onChange={(e) => updateField('other_vehicle_year', e.target.value)} />
          <FormField label="Make" name="other_vehicle_make" value={formData.other_vehicle_make} onChange={(e) => updateField('other_vehicle_make', e.target.value)} />
          <FormField label="Model" name="other_vehicle_model" value={formData.other_vehicle_model} onChange={(e) => updateField('other_vehicle_model', e.target.value)} />
          <FormField label="Body Type" name="other_vehicle_body_type" value={formData.other_vehicle_body_type} onChange={(e) => updateField('other_vehicle_body_type', e.target.value)} />
          <FormField label="V.I.N." name="other_vehicle_vin" className="md:col-span-2" value={formData.other_vehicle_vin} onChange={(e) => updateField('other_vehicle_vin', e.target.value)} />
          <FormField label="Plate Number" name="other_vehicle_plate" value={formData.other_vehicle_plate} onChange={(e) => updateField('other_vehicle_plate', e.target.value)} />
          <FormField label="State" name="other_vehicle_state" value={formData.other_vehicle_state} onChange={(e) => updateField('other_vehicle_state', e.target.value)} />
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <FormField label="Describe Property (Other Than Vehicle)" name="other_property_desc" className="md:col-span-2" value={formData.other_property_desc} onChange={(e) => updateField('other_property_desc', e.target.value)} />
        <div className="flex flex-col">
          <label className="form-label">Other Veh/Prop Ins?</label>
          <div className="flex items-center gap-4 h-[38px]">
            <label className="flex items-center gap-1.5 cursor-pointer text-sm">
              <input type="radio" name="other_has_insurance" value="yes" className="w-4 h-4" checked={formData.other_has_insurance === 'yes'} onChange={() => updateField('other_has_insurance', 'yes')} />
              <span>Y</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer text-sm">
              <input type="radio" name="other_has_insurance" value="no" className="w-4 h-4" checked={formData.other_has_insurance === 'no'} onChange={() => updateField('other_has_insurance', 'no')} />
              <span>N</span>
            </label>
          </div>
        </div>
      </div>

      {formData.other_has_insurance === 'yes' && (
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <FormField label="Carrier or Agency Name" name="other_carrier" value={formData.other_carrier} onChange={(e) => updateField('other_carrier', e.target.value)} />
          <FormField label="NAIC Code" name="other_naic_code" value={formData.other_naic_code} onChange={(e) => updateField('other_naic_code', e.target.value)} />
          <FormField label="Policy Number" name="other_policy_number" value={formData.other_policy_number} onChange={(e) => updateField('other_policy_number', e.target.value)} />
        </div>
      )}

      <div className="border-t border-form-border pt-4 mb-4">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">Owner's Information</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <FormField label="Owner's Name and Address" name="other_owner_name_address" className="md:col-span-2" value={formData.other_owner_name_address} onChange={(e) => updateField('other_owner_name_address', e.target.value)} />
          <FormField label="Primary Phone #" name="other_owner_phone_primary" type="tel" value={formData.other_owner_phone_primary} onChange={(e) => updateField('other_owner_phone_primary', e.target.value)} />
          <FormField label="Secondary Phone #" name="other_owner_phone_secondary" type="tel" value={formData.other_owner_phone_secondary} onChange={(e) => updateField('other_owner_phone_secondary', e.target.value)} />
          <FormField label="Primary E-mail Address" name="other_owner_email_primary" type="email" value={formData.other_owner_email_primary} onChange={(e) => updateField('other_owner_email_primary', e.target.value)} />
          <FormField label="Secondary E-mail Address" name="other_owner_email_secondary" type="email" value={formData.other_owner_email_secondary} onChange={(e) => updateField('other_owner_email_secondary', e.target.value)} />
        </div>
      </div>

      <div className="border-t border-form-border pt-4 mb-4">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">Driver's Information</h4>
        <div className="flex gap-4 mb-4">
          <CheckboxOption label="Check if same as owner" name="other_driver_same_as_owner" checked={formData.other_driver_same_as_owner} onChange={(e) => updateField('other_driver_same_as_owner', e.target.checked)} />
        </div>
        {!formData.other_driver_same_as_owner && (
          <div className="grid md:grid-cols-2 gap-4">
            <FormField label="Driver's Name and Address" name="other_driver_name_address" className="md:col-span-2" value={formData.other_driver_name_address} onChange={(e) => updateField('other_driver_name_address', e.target.value)} />
            <FormField label="Primary Phone #" name="other_driver_phone_primary" type="tel" value={formData.other_driver_phone_primary} onChange={(e) => updateField('other_driver_phone_primary', e.target.value)} />
            <FormField label="Secondary Phone #" name="other_driver_phone_secondary" type="tel" value={formData.other_driver_phone_secondary} onChange={(e) => updateField('other_driver_phone_secondary', e.target.value)} />
            <FormField label="Primary E-mail Address" name="other_driver_email_primary" type="email" value={formData.other_driver_email_primary} onChange={(e) => updateField('other_driver_email_primary', e.target.value)} />
            <FormField label="Secondary E-mail Address" name="other_driver_email_secondary" type="email" value={formData.other_driver_email_secondary} onChange={(e) => updateField('other_driver_email_secondary', e.target.value)} />
          </div>
        )}
      </div>

      <div className="border-t border-form-border pt-4">
        <FormField label="Describe Damage" name="other_damage" type="textarea" rows={3} value={formData.other_damage} onChange={(e) => updateField('other_damage', e.target.value)} />
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <FormField label="Estimate Amount" name="other_estimate" value={formData.other_estimate} onChange={(e) => updateField('other_estimate', e.target.value)} />
          <FormField label="Where Can Damage Be Seen?" name="other_where_seen" value={formData.other_where_seen} onChange={(e) => updateField('other_where_seen', e.target.value)} />
        </div>
      </div>
    </FormSection>
  );
};
