import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Json } from '@/integrations/supabase/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AgencySection } from './sections/AgencySection';
import { PolicySection } from './sections/PolicySection';
import { InsuredSection } from './sections/InsuredSection';
import { ContactSection } from './sections/ContactSection';
import { LossSection } from './sections/LossSection';
import { InsuredVehicleSection } from './sections/InsuredVehicleSection';
import { OtherVehicleSection } from './sections/OtherVehicleSection';
import { InjuredSection } from './sections/InjuredSection';
import { WitnessesSection } from './sections/WitnessesSection';
import { RemarksSection } from './sections/RemarksSection';
import { FraudWarningsSection } from './sections/FraudWarningsSection';
import { AutoLossFormData } from '@/types/autoLossForm';
import { useAuth } from '@/hooks/useAuth';
import { generatePDF } from '@/utils/pdfExport';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { FileText, Printer, Download, ArrowLeft, Save, LogOut } from 'lucide-react';

interface EditableAutoLossFormProps {
  formId: string;
  initialData: AutoLossFormData;
  status: string | null;
}

export const EditableAutoLossForm: React.FC<EditableAutoLossFormProps> = ({
  formId,
  initialData,
  status,
}) => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [formData, setFormData] = useState<AutoLossFormData>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof AutoLossFormData, string>>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const updateField = useCallback(<K extends keyof AutoLossFormData>(
    field: K,
    value: AutoLossFormData[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  const validateForm = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof AutoLossFormData, string>> = {};

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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors before saving');
      return;
    }

    if (!user) {
      toast.error('You must be logged in to save');
      return;
    }

    setIsSaving(true);
    try {
      const submissionData = getFormDataForSubmission();

      const { error } = await supabase.from('auto_loss_forms').update({
        agency_name: submissionData.agency_name,
        agency_contact: submissionData.agency_contact,
        agency_phone: submissionData.agency_phone,
        agency_fax: submissionData.agency_fax,
        agency_email: submissionData.agency_email,
        agency_address: submissionData.agency_address,
        agency_code: submissionData.agency_code,
        agency_subcode: submissionData.agency_subcode,
        agency_customer_id: submissionData.agency_customer_id,
        form_date: submissionData.form_date || null,
        insured_location_code: submissionData.insured_location_code,
        loss_date: submissionData.loss_date || null,
        loss_time: submissionData.loss_time,
        carrier: submissionData.carrier,
        naic_code: submissionData.naic_code,
        policy_number: submissionData.policy_number,
        line_of_business: submissionData.line_of_business,
        insured_name: submissionData.insured_name,
        insured_address: submissionData.insured_address,
        insured_dob: submissionData.insured_dob || null,
        insured_fein: submissionData.insured_fein,
        insured_marital_status: submissionData.insured_marital_status,
        insured_phone_primary: submissionData.insured_phone_primary,
        insured_phone_secondary: submissionData.insured_phone_secondary,
        insured_email_primary: submissionData.insured_email_primary,
        insured_email_secondary: submissionData.insured_email_secondary,
        contact_is_insured: submissionData.contact_is_insured,
        contact_name: submissionData.contact_name,
        contact_address: submissionData.contact_address,
        contact_phone_primary: submissionData.contact_phone_primary,
        contact_phone_secondary: submissionData.contact_phone_secondary,
        contact_email_primary: submissionData.contact_email_primary,
        contact_email_secondary: submissionData.contact_email_secondary,
        contact_when: submissionData.contact_when,
        loss_location: submissionData.loss_location,
        loss_department: submissionData.loss_department,
        loss_street: submissionData.loss_street,
        loss_city_state_zip: submissionData.loss_city_state_zip,
        loss_report_number: submissionData.loss_report_number,
        loss_country: submissionData.loss_country,
        loss_location_desc: submissionData.loss_location_desc,
        loss_accident_desc: submissionData.loss_accident_desc,
        insured_vehicle: JSON.parse(JSON.stringify(submissionData.insured_vehicle)) as Json,
        other_vehicle: JSON.parse(JSON.stringify(submissionData.other_vehicle)) as Json,
        injured_persons: JSON.parse(JSON.stringify(submissionData.injured_persons)) as Json,
        witnesses: JSON.parse(JSON.stringify(submissionData.witnesses)) as Json,
        reported_by: submissionData.reported_by,
        reported_to: submissionData.reported_to,
        remarks: submissionData.remarks,
      }).eq('id', formId);

      if (error) throw error;

      toast.success('Changes saved successfully!');
      setHasChanges(false);
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save changes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = () => {
    generatePDF(formData);
    toast.success('PDF downloaded successfully!');
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'submitted':
        return <Badge className="bg-primary text-primary-foreground">Submitted</Badge>;
      case 'draft':
        return <Badge variant="secondary">Draft</Badge>;
      case 'processing':
        return <Badge className="bg-accent text-accent-foreground">Processing</Badge>;
      default:
        return <Badge variant="outline">{status || 'Unknown'}</Badge>;
    }
  };

  return (
    <form onSubmit={handleSave} className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-foreground">Edit Submission</h1>
                {getStatusBadge()}
              </div>
              <p className="text-sm text-muted-foreground">ACORD 2 (2016/10)</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 no-print">
            {hasChanges && (
              <span className="text-xs text-destructive mr-2">
                Unsaved changes
              </span>
            )}
            <Button type="button" variant="outline" size="sm" onClick={() => navigate('/submissions')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={handleExportPDF}>
              <Download className="w-4 h-4 mr-2" />
              PDF
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
            <Button type="submit" size="sm" disabled={isSaving || !hasChanges}>
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save'}
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Tabbed Form Sections */}
      <Tabs defaultValue="agency" className="w-full">
        <TabsList className="w-full flex flex-wrap h-auto gap-1 bg-card border border-border p-2 rounded-lg mb-6 no-print">
          <TabsTrigger value="agency" className="flex-1 min-w-[100px]">Agency</TabsTrigger>
          <TabsTrigger value="insured" className="flex-1 min-w-[100px]">Insured</TabsTrigger>
          <TabsTrigger value="loss" className="flex-1 min-w-[100px]">Loss</TabsTrigger>
          <TabsTrigger value="vehicle" className="flex-1 min-w-[100px]">Vehicle</TabsTrigger>
          <TabsTrigger value="other" className="flex-1 min-w-[100px]">Other Party</TabsTrigger>
          <TabsTrigger value="injured" className="flex-1 min-w-[100px]">Injured</TabsTrigger>
          <TabsTrigger value="remarks" className="flex-1 min-w-[100px]">Remarks</TabsTrigger>
        </TabsList>

        <TabsContent value="agency" className="space-y-6">
          <AgencySection formData={formData} updateField={updateField} errors={errors} />
          <PolicySection formData={formData} updateField={updateField} errors={errors} />
        </TabsContent>

        <TabsContent value="insured" className="space-y-6">
          <InsuredSection formData={formData} updateField={updateField} errors={errors} />
          <ContactSection formData={formData} updateField={updateField} errors={errors} />
        </TabsContent>

        <TabsContent value="loss" className="space-y-6">
          <LossSection formData={formData} updateField={updateField} errors={errors} />
        </TabsContent>

        <TabsContent value="vehicle" className="space-y-6">
          <InsuredVehicleSection formData={formData} updateField={updateField} errors={errors} />
        </TabsContent>

        <TabsContent value="other" className="space-y-6">
          <OtherVehicleSection formData={formData} updateField={updateField} errors={errors} />
        </TabsContent>

        <TabsContent value="injured" className="space-y-6">
          <InjuredSection formData={formData} updateField={updateField} />
          <WitnessesSection formData={formData} updateField={updateField} />
        </TabsContent>

        <TabsContent value="remarks" className="space-y-6">
          <RemarksSection formData={formData} updateField={updateField} errors={errors} />
          <FraudWarningsSection />
        </TabsContent>
      </Tabs>

      {/* Footer */}
      <div className="mt-8 p-4 bg-muted rounded-lg text-center text-xs text-muted-foreground">
        <p>ACORD 2 (2016/10) © 1988-2016 ACORD CORPORATION. All rights reserved.</p>
        <p className="mt-1">The ACORD name and logo are registered marks of ACORD</p>
      </div>
    </form>
  );
};
