import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { AutoLossFormData, initialFormData, InjuredPerson, Witness } from '@/types/autoLossForm';
import { toast } from 'sonner';
import { EditableAutoLossForm } from '@/components/EditableAutoLossForm';

interface DatabaseForm {
  id: string;
  user_id: string | null;
  status: string | null;
  created_at: string;
  updated_at: string;
  form_date: string | null;
  loss_date: string | null;
  loss_time: string | null;
  insured_location_code: string | null;
  carrier: string | null;
  naic_code: string | null;
  policy_number: string | null;
  line_of_business: string | null;
  insured_name: string | null;
  insured_address: string | null;
  insured_dob: string | null;
  insured_fein: string | null;
  insured_marital_status: string | null;
  insured_phone_primary: string | null;
  insured_phone_secondary: string | null;
  insured_email_primary: string | null;
  insured_email_secondary: string | null;
  contact_is_insured: boolean | null;
  contact_name: string | null;
  contact_address: string | null;
  contact_phone_primary: string | null;
  contact_phone_secondary: string | null;
  contact_email_primary: string | null;
  contact_email_secondary: string | null;
  contact_when: string | null;
  loss_location: string | null;
  loss_department: string | null;
  loss_street: string | null;
  loss_city_state_zip: string | null;
  loss_report_number: string | null;
  loss_country: string | null;
  loss_location_desc: string | null;
  loss_accident_desc: string | null;
  agency_name: string | null;
  agency_contact: string | null;
  agency_phone: string | null;
  agency_fax: string | null;
  agency_email: string | null;
  agency_address: string | null;
  agency_code: string | null;
  agency_subcode: string | null;
  agency_customer_id: string | null;
  insured_vehicle: any;
  other_vehicle: any;
  injured_persons: any;
  witnesses: any;
  reported_by: string | null;
  reported_to: string | null;
  remarks: string | null;
}

const FormEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<AutoLossFormData | null>(null);
  const [formStatus, setFormStatus] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchForm(id);
    }
  }, [id]);

  const fetchForm = async (formId: string) => {
    try {
      const { data, error } = await supabase
        .from('auto_loss_forms')
        .select('*')
        .eq('id', formId)
        .maybeSingle();

      if (error) throw error;
      if (!data) {
        toast.error('Form not found');
        navigate('/submissions');
        return;
      }

      const dbForm = data as DatabaseForm;
      setFormStatus(dbForm.status);
      
      // Map database record to form data
      const mappedData = mapDatabaseToFormData(dbForm);
      setFormData(mappedData);
    } catch (error: any) {
      console.error('Error loading form:', error);
      toast.error('Failed to load form');
      navigate('/submissions');
    } finally {
      setLoading(false);
    }
  };

  const mapDatabaseToFormData = (db: DatabaseForm): AutoLossFormData => {
    const vehicle = db.insured_vehicle || {};
    const otherVehicle = db.other_vehicle || {};
    
    // Parse injured persons
    let injuredPersons: InjuredPerson[] = [{ id: 1, name_address: '', phone: '', ped: false, ins_veh: false, oth_veh: false, age: '', extent_of_injury: '' }];
    if (db.injured_persons && Array.isArray(db.injured_persons)) {
      injuredPersons = db.injured_persons.map((p: any, idx: number) => ({
        id: p.id || idx + 1,
        name_address: p.name_address || '',
        phone: p.phone || '',
        ped: p.ped || false,
        ins_veh: p.ins_veh || false,
        oth_veh: p.oth_veh || false,
        age: p.age || '',
        extent_of_injury: p.extent_of_injury || '',
      }));
    }

    // Parse witnesses
    let witnesses: Witness[] = [{ id: 1, name_address: '', phone: '', ins_veh: false, oth_veh: false, other: '' }];
    if (db.witnesses && Array.isArray(db.witnesses)) {
      witnesses = db.witnesses.map((w: any, idx: number) => ({
        id: w.id || idx + 1,
        name_address: w.name_address || '',
        phone: w.phone || '',
        ins_veh: w.ins_veh || false,
        oth_veh: w.oth_veh || false,
        other: w.other || '',
      }));
    }

    return {
      ...initialFormData,
      // Agency
      agency_name: db.agency_name || '',
      agency_contact: db.agency_contact || '',
      agency_phone: db.agency_phone || '',
      agency_fax: db.agency_fax || '',
      agency_email: db.agency_email || '',
      agency_address: db.agency_address || '',
      agency_code: db.agency_code || '',
      agency_subcode: db.agency_subcode || '',
      agency_customer_id: db.agency_customer_id || '',
      // Policy
      form_date: db.form_date || '',
      insured_location_code: db.insured_location_code || '',
      loss_date: db.loss_date || '',
      loss_time: db.loss_time || '',
      carrier: db.carrier || '',
      naic_code: db.naic_code || '',
      policy_number: db.policy_number || '',
      line_of_business: db.line_of_business || '',
      // Insured
      insured_name: db.insured_name || '',
      insured_address: db.insured_address || '',
      insured_dob: db.insured_dob || '',
      insured_fein: db.insured_fein || '',
      insured_marital_status: db.insured_marital_status || '',
      insured_phone_primary: db.insured_phone_primary || '',
      insured_phone_secondary: db.insured_phone_secondary || '',
      insured_email_primary: db.insured_email_primary || '',
      insured_email_secondary: db.insured_email_secondary || '',
      // Contact
      contact_is_insured: db.contact_is_insured || false,
      contact_name: db.contact_name || '',
      contact_address: db.contact_address || '',
      contact_phone_primary: db.contact_phone_primary || '',
      contact_phone_secondary: db.contact_phone_secondary || '',
      contact_email_primary: db.contact_email_primary || '',
      contact_email_secondary: db.contact_email_secondary || '',
      contact_when: db.contact_when || '',
      // Loss
      loss_location: db.loss_location || '',
      loss_department: db.loss_department || '',
      loss_street: db.loss_street || '',
      loss_city_state_zip: db.loss_city_state_zip || '',
      loss_report_number: db.loss_report_number || '',
      loss_country: db.loss_country || '',
      loss_location_desc: db.loss_location_desc || '',
      loss_accident_desc: db.loss_accident_desc || '',
      // Vehicle from JSON
      vehicle_number: vehicle.number || '',
      vehicle_year: vehicle.year || '',
      vehicle_make: vehicle.make || '',
      vehicle_model: vehicle.model || '',
      vehicle_body_type: vehicle.body_type || '',
      vehicle_vin: vehicle.vin || '',
      vehicle_plate: vehicle.plate || '',
      vehicle_state: vehicle.state || '',
      owner_same_as_insured: vehicle.owner?.same_as_insured || false,
      owner_name_address: vehicle.owner?.name_address || '',
      owner_phone_primary: vehicle.owner?.phone_primary || '',
      owner_phone_secondary: vehicle.owner?.phone_secondary || '',
      owner_email_primary: vehicle.owner?.email_primary || '',
      owner_email_secondary: vehicle.owner?.email_secondary || '',
      driver_same_as_owner: vehicle.driver?.same_as_owner || false,
      driver_name_address: vehicle.driver?.name_address || '',
      driver_phone_primary: vehicle.driver?.phone_primary || '',
      driver_phone_secondary: vehicle.driver?.phone_secondary || '',
      driver_email_primary: vehicle.driver?.email_primary || '',
      driver_email_secondary: vehicle.driver?.email_secondary || '',
      driver_relation: vehicle.driver?.relation || '',
      driver_dob: vehicle.driver?.dob || '',
      driver_license: vehicle.driver?.license || '',
      driver_license_state: vehicle.driver?.license_state || '',
      driver_purpose: vehicle.driver?.purpose || '',
      driver_permission: vehicle.driver?.permission || '',
      vehicle_damage: vehicle.damage || '',
      vehicle_estimate: vehicle.estimate || '',
      vehicle_where_seen: vehicle.where_seen || '',
      vehicle_when_seen: vehicle.when_seen || '',
      child_seat_installed: vehicle.child_seat?.installed || '',
      child_seat_in_use: vehicle.child_seat?.in_use || '',
      child_seat_loss: vehicle.child_seat?.loss || '',
      other_ins_carrier: vehicle.other_insurance?.carrier || '',
      other_ins_policy: vehicle.other_insurance?.policy || '',
      // Other Vehicle from JSON
      other_non_vehicle: otherVehicle.non_vehicle || false,
      other_vehicle_number: otherVehicle.number || '',
      other_vehicle_year: otherVehicle.year || '',
      other_vehicle_make: otherVehicle.make || '',
      other_vehicle_model: otherVehicle.model || '',
      other_vehicle_body_type: otherVehicle.body_type || '',
      other_vehicle_vin: otherVehicle.vin || '',
      other_vehicle_plate: otherVehicle.plate || '',
      other_vehicle_state: otherVehicle.state || '',
      other_property_desc: otherVehicle.property_desc || '',
      other_has_insurance: otherVehicle.has_insurance || '',
      other_carrier: otherVehicle.carrier || '',
      other_naic_code: otherVehicle.naic_code || '',
      other_policy_number: otherVehicle.policy_number || '',
      other_owner_name_address: otherVehicle.owner?.name_address || '',
      other_owner_phone_primary: otherVehicle.owner?.phone_primary || '',
      other_owner_phone_secondary: otherVehicle.owner?.phone_secondary || '',
      other_owner_email_primary: otherVehicle.owner?.email_primary || '',
      other_owner_email_secondary: otherVehicle.owner?.email_secondary || '',
      other_driver_same_as_owner: otherVehicle.driver?.same_as_owner || false,
      other_driver_name_address: otherVehicle.driver?.name_address || '',
      other_driver_phone_primary: otherVehicle.driver?.phone_primary || '',
      other_driver_phone_secondary: otherVehicle.driver?.phone_secondary || '',
      other_driver_email_primary: otherVehicle.driver?.email_primary || '',
      other_driver_email_secondary: otherVehicle.driver?.email_secondary || '',
      other_damage: otherVehicle.damage || '',
      other_estimate: otherVehicle.estimate || '',
      other_where_seen: otherVehicle.where_seen || '',
      // Injured and Witnesses
      injured_persons: injuredPersons,
      witnesses: witnesses,
      // Remarks
      reported_by: db.reported_by || '',
      reported_to: db.reported_to || '',
      remarks: db.remarks || '',
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading form...</div>
      </div>
    );
  }

  if (!formData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <EditableAutoLossForm 
        formId={id!} 
        initialData={formData} 
        status={formStatus}
      />
    </div>
  );
};

export default FormEdit;
