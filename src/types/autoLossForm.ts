export interface AutoLossFormData {
  // Agency Information
  agency_name: string;
  agency_contact: string;
  agency_phone: string;
  agency_fax: string;
  agency_email: string;
  agency_address: string;
  agency_code: string;
  agency_subcode: string;
  agency_customer_id: string;

  // Policy Information
  form_date: string;
  insured_location_code: string;
  loss_date: string;
  loss_time: string;
  loss_time_period: 'am' | 'pm' | '';
  carrier: string;
  naic_code: string;
  policy_number: string;
  line_of_business: string;

  // Insured Information
  insured_name: string;
  insured_address: string;
  insured_dob: string;
  insured_fein: string;
  insured_marital_status: string;
  insured_phone_primary: string;
  insured_phone_secondary: string;
  insured_email_primary: string;
  insured_email_secondary: string;

  // Contact Information
  contact_is_insured: boolean;
  contact_name: string;
  contact_address: string;
  contact_phone_primary: string;
  contact_phone_secondary: string;
  contact_email_primary: string;
  contact_email_secondary: string;
  contact_when: string;

  // Loss Information
  loss_location: string;
  loss_department: string;
  loss_street: string;
  loss_city_state_zip: string;
  loss_report_number: string;
  loss_country: string;
  loss_location_desc: string;
  loss_accident_desc: string;

  // Vehicle Information
  vehicle_number: string;
  vehicle_year: string;
  vehicle_make: string;
  vehicle_model: string;
  vehicle_body_type: string;
  vehicle_vin: string;
  vehicle_plate: string;
  vehicle_state: string;
  owner_same_as_insured: boolean;
  owner_name_address: string;
  owner_phone_primary: string;
  owner_phone_secondary: string;
  owner_email_primary: string;
  owner_email_secondary: string;
  driver_same_as_owner: boolean;
  driver_name_address: string;
  driver_phone_primary: string;
  driver_phone_secondary: string;
  driver_email_primary: string;
  driver_email_secondary: string;
  driver_relation: string;
  driver_dob: string;
  driver_license: string;
  driver_license_state: string;
  driver_purpose: string;
  driver_permission: 'yes' | 'no' | '';
  vehicle_damage: string;
  vehicle_estimate: string;
  vehicle_where_seen: string;
  vehicle_when_seen: string;
  child_seat_installed: 'yes' | 'no' | '';
  child_seat_in_use: 'yes' | 'no' | '';
  child_seat_loss: 'yes' | 'no' | '';
  other_ins_carrier: string;
  other_ins_policy: string;

  // Other Vehicle/Property
  other_non_vehicle: boolean;
  other_vehicle_number: string;
  other_vehicle_year: string;
  other_vehicle_make: string;
  other_vehicle_model: string;
  other_vehicle_body_type: string;
  other_vehicle_vin: string;
  other_vehicle_plate: string;
  other_vehicle_state: string;
  other_property_desc: string;
  other_has_insurance: 'yes' | 'no' | '';
  other_carrier: string;
  other_naic_code: string;
  other_policy_number: string;
  other_owner_name_address: string;
  other_owner_phone_primary: string;
  other_owner_phone_secondary: string;
  other_owner_email_primary: string;
  other_owner_email_secondary: string;
  other_driver_same_as_owner: boolean;
  other_driver_name_address: string;
  other_driver_phone_primary: string;
  other_driver_phone_secondary: string;
  other_driver_email_primary: string;
  other_driver_email_secondary: string;
  other_damage: string;
  other_estimate: string;
  other_where_seen: string;

  // Injured persons
  injured_persons: InjuredPerson[];

  // Witnesses
  witnesses: Witness[];

  // Remarks
  reported_by: string;
  reported_to: string;
  remarks: string;
}

export interface InjuredPerson {
  id: number;
  name_address: string;
  phone: string;
  ped: boolean;
  ins_veh: boolean;
  oth_veh: boolean;
  age: string;
  extent_of_injury: string;
}

export interface Witness {
  id: number;
  name_address: string;
  phone: string;
  ins_veh: boolean;
  oth_veh: boolean;
  other: string;
}

export const initialFormData: AutoLossFormData = {
  // Agency
  agency_name: '',
  agency_contact: '',
  agency_phone: '',
  agency_fax: '',
  agency_email: '',
  agency_address: '',
  agency_code: '',
  agency_subcode: '',
  agency_customer_id: '',

  // Policy
  form_date: '',
  insured_location_code: '',
  loss_date: '',
  loss_time: '',
  loss_time_period: '',
  carrier: '',
  naic_code: '',
  policy_number: '',
  line_of_business: '',

  // Insured
  insured_name: '',
  insured_address: '',
  insured_dob: '',
  insured_fein: '',
  insured_marital_status: '',
  insured_phone_primary: '',
  insured_phone_secondary: '',
  insured_email_primary: '',
  insured_email_secondary: '',

  // Contact
  contact_is_insured: false,
  contact_name: '',
  contact_address: '',
  contact_phone_primary: '',
  contact_phone_secondary: '',
  contact_email_primary: '',
  contact_email_secondary: '',
  contact_when: '',

  // Loss
  loss_location: '',
  loss_department: '',
  loss_street: '',
  loss_city_state_zip: '',
  loss_report_number: '',
  loss_country: '',
  loss_location_desc: '',
  loss_accident_desc: '',

  // Vehicle
  vehicle_number: '',
  vehicle_year: '',
  vehicle_make: '',
  vehicle_model: '',
  vehicle_body_type: '',
  vehicle_vin: '',
  vehicle_plate: '',
  vehicle_state: '',
  owner_same_as_insured: false,
  owner_name_address: '',
  owner_phone_primary: '',
  owner_phone_secondary: '',
  owner_email_primary: '',
  owner_email_secondary: '',
  driver_same_as_owner: false,
  driver_name_address: '',
  driver_phone_primary: '',
  driver_phone_secondary: '',
  driver_email_primary: '',
  driver_email_secondary: '',
  driver_relation: '',
  driver_dob: '',
  driver_license: '',
  driver_license_state: '',
  driver_purpose: '',
  driver_permission: '',
  vehicle_damage: '',
  vehicle_estimate: '',
  vehicle_where_seen: '',
  vehicle_when_seen: '',
  child_seat_installed: '',
  child_seat_in_use: '',
  child_seat_loss: '',
  other_ins_carrier: '',
  other_ins_policy: '',

  // Other Vehicle
  other_non_vehicle: false,
  other_vehicle_number: '',
  other_vehicle_year: '',
  other_vehicle_make: '',
  other_vehicle_model: '',
  other_vehicle_body_type: '',
  other_vehicle_vin: '',
  other_vehicle_plate: '',
  other_vehicle_state: '',
  other_property_desc: '',
  other_has_insurance: '',
  other_carrier: '',
  other_naic_code: '',
  other_policy_number: '',
  other_owner_name_address: '',
  other_owner_phone_primary: '',
  other_owner_phone_secondary: '',
  other_owner_email_primary: '',
  other_owner_email_secondary: '',
  other_driver_same_as_owner: false,
  other_driver_name_address: '',
  other_driver_phone_primary: '',
  other_driver_phone_secondary: '',
  other_driver_email_primary: '',
  other_driver_email_secondary: '',
  other_damage: '',
  other_estimate: '',
  other_where_seen: '',

  // Injured
  injured_persons: [{ id: 1, name_address: '', phone: '', ped: false, ins_veh: false, oth_veh: false, age: '', extent_of_injury: '' }],

  // Witnesses
  witnesses: [{ id: 1, name_address: '', phone: '', ins_veh: false, oth_veh: false, other: '' }],

  // Remarks
  reported_by: '',
  reported_to: '',
  remarks: '',
};
