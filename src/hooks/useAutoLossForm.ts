import { useState, useEffect, useCallback } from 'react';
import { AutoLossFormData, initialFormData } from '@/types/autoLossForm';

const STORAGE_KEY = 'auto_loss_form_draft';

export const useAutoLossForm = () => {
  const [formData, setFormData] = useState<AutoLossFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof AutoLossFormData, string>>>({});
  const [isDirty, setIsDirty] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData({ ...initialFormData, ...parsed.data });
        setLastSaved(new Date(parsed.timestamp));
      } catch (e) {
        console.error('Failed to load saved form data:', e);
      }
    }
  }, []);

  // Auto-save to localStorage when form changes
  useEffect(() => {
    if (isDirty) {
      const timeoutId = setTimeout(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          data: formData,
          timestamp: new Date().toISOString(),
        }));
        setLastSaved(new Date());
        setIsDirty(false);
      }, 1000); // Debounce by 1 second

      return () => clearTimeout(timeoutId);
    }
  }, [formData, isDirty]);

  const updateField = useCallback(<K extends keyof AutoLossFormData>(
    field: K,
    value: AutoLossFormData[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  const validateForm = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof AutoLossFormData, string>> = {};

    // Required fields validation
    if (!formData.insured_name?.trim()) {
      newErrors.insured_name = 'Insured name is required';
    }
    if (!formData.policy_number?.trim()) {
      newErrors.policy_number = 'Policy number is required';
    }
    if (!formData.loss_date) {
      newErrors.loss_date = 'Date of loss is required';
    }
    if (!formData.loss_accident_desc?.trim()) {
      newErrors.loss_accident_desc = 'Description of accident is required';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.insured_email_primary && !emailRegex.test(formData.insured_email_primary)) {
      newErrors.insured_email_primary = 'Invalid email format';
    }
    if (formData.agency_email && !emailRegex.test(formData.agency_email)) {
      newErrors.agency_email = 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const clearForm = useCallback(() => {
    setFormData(initialFormData);
    setErrors({});
    localStorage.removeItem(STORAGE_KEY);
    setLastSaved(null);
    setIsDirty(false);
  }, []);

  const getFormDataForSubmission = useCallback(() => {
    return {
      ...formData,
      insured_vehicle: {
        number: formData.vehicle_number,
        year: formData.vehicle_year,
        make: formData.vehicle_make,
        model: formData.vehicle_model,
        body_type: formData.vehicle_body_type,
        vin: formData.vehicle_vin,
        plate: formData.vehicle_plate,
        state: formData.vehicle_state,
        owner: {
          same_as_insured: formData.owner_same_as_insured,
          name_address: formData.owner_name_address,
          phone_primary: formData.owner_phone_primary,
          phone_secondary: formData.owner_phone_secondary,
          email_primary: formData.owner_email_primary,
          email_secondary: formData.owner_email_secondary,
        },
        driver: {
          same_as_owner: formData.driver_same_as_owner,
          name_address: formData.driver_name_address,
          phone_primary: formData.driver_phone_primary,
          phone_secondary: formData.driver_phone_secondary,
          email_primary: formData.driver_email_primary,
          email_secondary: formData.driver_email_secondary,
          relation: formData.driver_relation,
          dob: formData.driver_dob,
          license: formData.driver_license,
          license_state: formData.driver_license_state,
          purpose: formData.driver_purpose,
          permission: formData.driver_permission,
        },
        damage: formData.vehicle_damage,
        estimate: formData.vehicle_estimate,
        where_seen: formData.vehicle_where_seen,
        when_seen: formData.vehicle_when_seen,
        child_seat: {
          installed: formData.child_seat_installed,
          in_use: formData.child_seat_in_use,
          loss: formData.child_seat_loss,
        },
        other_insurance: {
          carrier: formData.other_ins_carrier,
          policy: formData.other_ins_policy,
        },
      },
      other_vehicle: {
        non_vehicle: formData.other_non_vehicle,
        number: formData.other_vehicle_number,
        year: formData.other_vehicle_year,
        make: formData.other_vehicle_make,
        model: formData.other_vehicle_model,
        body_type: formData.other_vehicle_body_type,
        vin: formData.other_vehicle_vin,
        plate: formData.other_vehicle_plate,
        state: formData.other_vehicle_state,
        property_desc: formData.other_property_desc,
        has_insurance: formData.other_has_insurance,
        carrier: formData.other_carrier,
        naic_code: formData.other_naic_code,
        policy_number: formData.other_policy_number,
        owner: {
          name_address: formData.other_owner_name_address,
          phone_primary: formData.other_owner_phone_primary,
          phone_secondary: formData.other_owner_phone_secondary,
          email_primary: formData.other_owner_email_primary,
          email_secondary: formData.other_owner_email_secondary,
        },
        driver: {
          same_as_owner: formData.other_driver_same_as_owner,
          name_address: formData.other_driver_name_address,
          phone_primary: formData.other_driver_phone_primary,
          phone_secondary: formData.other_driver_phone_secondary,
          email_primary: formData.other_driver_email_primary,
          email_secondary: formData.other_driver_email_secondary,
        },
        damage: formData.other_damage,
        estimate: formData.other_estimate,
        where_seen: formData.other_where_seen,
      },
    };
  }, [formData]);

  return {
    formData,
    errors,
    isDirty,
    lastSaved,
    updateField,
    validateForm,
    clearForm,
    getFormDataForSubmission,
  };
};
