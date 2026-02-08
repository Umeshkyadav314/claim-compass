import React from 'react';
import { FormSection } from '../form/FormSection';
import { FormField } from '../form/FormField';
import { CheckboxOption } from '../form/CheckboxOption';
import { YesNoRadio } from '../form/YesNoRadio';
import { AutoLossFormData } from '@/types/autoLossForm';

interface InsuredVehicleSectionProps {
  formData: AutoLossFormData;
  updateField: <K extends keyof AutoLossFormData>(field: K, value: AutoLossFormData[K]) => void;
  errors: Partial<Record<keyof AutoLossFormData, string>>;
}

export const InsuredVehicleSection: React.FC<InsuredVehicleSectionProps> = ({ formData, updateField, errors }) => {
  return (
    <FormSection title="Insured Vehicle" accent>
      <div className="grid md:grid-cols-6 gap-4 mb-6">
        <FormField label="Veh #" name="vehicle_number" value={formData.vehicle_number} onChange={(e) => updateField('vehicle_number', e.target.value)} />
        <FormField label="Year" name="vehicle_year" value={formData.vehicle_year} onChange={(e) => updateField('vehicle_year', e.target.value)} />
        <FormField label="Make" name="vehicle_make" value={formData.vehicle_make} onChange={(e) => updateField('vehicle_make', e.target.value)} />
        <FormField label="Model" name="vehicle_model" value={formData.vehicle_model} onChange={(e) => updateField('vehicle_model', e.target.value)} />
        <FormField label="Body Type" name="vehicle_body_type" value={formData.vehicle_body_type} onChange={(e) => updateField('vehicle_body_type', e.target.value)} />
        <FormField label="V.I.N." name="vehicle_vin" className="md:col-span-2" value={formData.vehicle_vin} onChange={(e) => updateField('vehicle_vin', e.target.value)} />
        <FormField label="Plate Number" name="vehicle_plate" value={formData.vehicle_plate} onChange={(e) => updateField('vehicle_plate', e.target.value)} />
        <FormField label="State" name="vehicle_state" value={formData.vehicle_state} onChange={(e) => updateField('vehicle_state', e.target.value)} />
      </div>

      <div className="border-t border-form-border pt-4 mb-4">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">Owner's Information</h4>
        <div className="flex gap-4 mb-4">
          <CheckboxOption label="Check if same as insured" name="owner_same_as_insured" checked={formData.owner_same_as_insured} onChange={(e) => updateField('owner_same_as_insured', e.target.checked)} />
        </div>
        {!formData.owner_same_as_insured && (
          <div className="grid md:grid-cols-2 gap-4">
            <FormField label="Owner's Name and Address" name="owner_name_address" className="md:col-span-2" value={formData.owner_name_address} onChange={(e) => updateField('owner_name_address', e.target.value)} />
            <FormField label="Primary Phone #" name="owner_phone_primary" type="tel" value={formData.owner_phone_primary} onChange={(e) => updateField('owner_phone_primary', e.target.value)} />
            <FormField label="Secondary Phone #" name="owner_phone_secondary" type="tel" value={formData.owner_phone_secondary} onChange={(e) => updateField('owner_phone_secondary', e.target.value)} />
            <FormField label="Primary E-mail Address" name="owner_email_primary" type="email" value={formData.owner_email_primary} onChange={(e) => updateField('owner_email_primary', e.target.value)} />
            <FormField label="Secondary E-mail Address" name="owner_email_secondary" type="email" value={formData.owner_email_secondary} onChange={(e) => updateField('owner_email_secondary', e.target.value)} />
          </div>
        )}
      </div>

      <div className="border-t border-form-border pt-4 mb-4">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">Driver's Information</h4>
        <div className="flex gap-4 mb-4">
          <CheckboxOption label="Check if same as owner" name="driver_same_as_owner" checked={formData.driver_same_as_owner} onChange={(e) => updateField('driver_same_as_owner', e.target.checked)} />
        </div>
        {!formData.driver_same_as_owner && (
          <div className="grid md:grid-cols-2 gap-4">
            <FormField label="Driver's Name and Address" name="driver_name_address" className="md:col-span-2" value={formData.driver_name_address} onChange={(e) => updateField('driver_name_address', e.target.value)} />
            <FormField label="Primary Phone #" name="driver_phone_primary" type="tel" value={formData.driver_phone_primary} onChange={(e) => updateField('driver_phone_primary', e.target.value)} />
            <FormField label="Secondary Phone #" name="driver_phone_secondary" type="tel" value={formData.driver_phone_secondary} onChange={(e) => updateField('driver_phone_secondary', e.target.value)} />
            <FormField label="Primary E-mail Address" name="driver_email_primary" type="email" value={formData.driver_email_primary} onChange={(e) => updateField('driver_email_primary', e.target.value)} />
            <FormField label="Secondary E-mail Address" name="driver_email_secondary" type="email" value={formData.driver_email_secondary} onChange={(e) => updateField('driver_email_secondary', e.target.value)} />
          </div>
        )}
        <div className="grid md:grid-cols-5 gap-4 mt-4">
          <FormField label="Relation to Insured" name="driver_relation" value={formData.driver_relation} onChange={(e) => updateField('driver_relation', e.target.value)} />
          <FormField label="Date of Birth" name="driver_dob" type="date" value={formData.driver_dob} onChange={(e) => updateField('driver_dob', e.target.value)} />
          <FormField label="Driver's License Number" name="driver_license" value={formData.driver_license} onChange={(e) => updateField('driver_license', e.target.value)} />
          <FormField label="State" name="driver_license_state" value={formData.driver_license_state} onChange={(e) => updateField('driver_license_state', e.target.value)} />
          <FormField label="Purpose of Use" name="driver_purpose" value={formData.driver_purpose} onChange={(e) => updateField('driver_purpose', e.target.value)} />
          <div className="flex flex-col">
            <label className="form-label">Used with Permission?</label>
            <div className="flex items-center gap-4 h-[38px]">
              <label className="flex items-center gap-1.5 cursor-pointer text-sm">
                <input type="radio" name="driver_permission" value="yes" className="w-4 h-4" checked={formData.driver_permission === 'yes'} onChange={() => updateField('driver_permission', 'yes')} />
                <span>Y</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer text-sm">
                <input type="radio" name="driver_permission" value="no" className="w-4 h-4" checked={formData.driver_permission === 'no'} onChange={() => updateField('driver_permission', 'no')} />
                <span>N</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-form-border pt-4 mb-4">
        <FormField label="Describe Damage" name="vehicle_damage" type="textarea" rows={3} value={formData.vehicle_damage} onChange={(e) => updateField('vehicle_damage', e.target.value)} />
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          <FormField label="Estimate Amount" name="vehicle_estimate" value={formData.vehicle_estimate} onChange={(e) => updateField('vehicle_estimate', e.target.value)} />
          <FormField label="Where Can Vehicle Be Seen?" name="vehicle_where_seen" value={formData.vehicle_where_seen} onChange={(e) => updateField('vehicle_where_seen', e.target.value)} />
          <FormField label="When Can Vehicle Be Seen?" name="vehicle_when_seen" value={formData.vehicle_when_seen} onChange={(e) => updateField('vehicle_when_seen', e.target.value)} />
        </div>
      </div>

      <div className="border-t border-form-border pt-4 mb-4">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">Child Passenger Restraint System</h4>
        <div className="space-y-1">
          <YesNoRadio 
            label="1. Was a standard child passenger restraint system (child seat) installed in the vehicle at the time of the accident?" 
            name="child_seat_installed"
            value={formData.child_seat_installed}
            onChange={(val) => updateField('child_seat_installed', val)}
          />
          <YesNoRadio 
            label="2. Was the child passenger restraint system (child seat) in use by a child during the time of the accident?" 
            name="child_seat_in_use"
            value={formData.child_seat_in_use}
            onChange={(val) => updateField('child_seat_in_use', val)}
          />
          <YesNoRadio 
            label="3. Did the child passenger restraint system (child seat) sustain a loss at the time of the accident?" 
            name="child_seat_loss"
            value={formData.child_seat_loss}
            onChange={(val) => updateField('child_seat_loss', val)}
          />
        </div>
      </div>

      <div className="border-t border-form-border pt-4">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">Other Insurance on Vehicle</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <FormField label="Carrier" name="other_ins_carrier" value={formData.other_ins_carrier} onChange={(e) => updateField('other_ins_carrier', e.target.value)} />
          <FormField label="Policy Number" name="other_ins_policy" value={formData.other_ins_policy} onChange={(e) => updateField('other_ins_policy', e.target.value)} />
        </div>
      </div>
    </FormSection>
  );
};
