import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Json } from '@/integrations/supabase/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
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
import { useAutoLossForm } from '@/hooks/useAutoLossForm';
import { useAuth } from '@/hooks/useAuth';
import { generatePDF } from '@/utils/pdfExport';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { FileText, Save, Printer, Send, Download, Trash2, Clock, List, LogOut } from 'lucide-react';

export const AutoLossForm: React.FC = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const {
    formData,
    errors,
    lastSaved,
    updateField,
    validateForm,
    clearForm,
    getFormDataForSubmission,
  } = useAutoLossForm();
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors before submitting');
      return;
    }

    if (!user) {
      toast.error('You must be logged in to submit');
      return;
    }

    setIsSubmitting(true);
    try {
      const submissionData = getFormDataForSubmission();
      
      const { data, error } = await supabase.from('auto_loss_forms').insert([{
        user_id: user.id,
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
        status: 'submitted',
      }]).select('id').single();

      if (error) throw error;

      // Send email notification (will gracefully handle if Resend not configured)
      try {
        await supabase.functions.invoke('send-notification', {
          body: {
            recipientEmail: user.email,
            insuredName: submissionData.insured_name,
            policyNumber: submissionData.policy_number,
            lossDate: submissionData.loss_date,
            submissionId: data?.id,
          },
        });
      } catch (notifyError) {
        console.log('Email notification skipped:', notifyError);
      }

      toast.success('Form submitted successfully!');
      clearForm();
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = () => {
    generatePDF(formData);
    toast.success('PDF downloaded successfully!');
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all form data? This cannot be undone.')) {
      clearForm();
      toast.info('Form cleared');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">AUTOMOBILE LOSS NOTICE</h1>
              <p className="text-sm text-muted-foreground">ACORD 2 (2016/10)</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 no-print">
            {lastSaved && (
              <span className="text-xs text-muted-foreground flex items-center gap-1 mr-2">
                <Clock className="w-3 h-3" />
                Saved {lastSaved.toLocaleTimeString()}
              </span>
            )}
            <Button type="button" variant="ghost" size="sm" onClick={() => navigate('/submissions')}>
              <List className="w-4 h-4 mr-2" />
              History
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={handleClear}>
              <Trash2 className="w-4 h-4 mr-2" />
              Clear
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={handleExportPDF}>
              <Download className="w-4 h-4 mr-2" />
              PDF
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
            <Button type="submit" size="sm" disabled={isSubmitting}>
              <Send className="w-4 h-4 mr-2" />
              {isSubmitting ? 'Submitting...' : 'Submit'}
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
