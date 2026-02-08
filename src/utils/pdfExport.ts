import { jsPDF } from 'jspdf';
import { AutoLossFormData } from '@/types/autoLossForm';

export const generatePDF = (formData: AutoLossFormData): void => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 20;
  const lineHeight = 7;
  const margin = 15;

  const addTitle = (text: string) => {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 58, 95);
    doc.text(text, margin, y);
    y += lineHeight + 2;
    doc.setDrawColor(30, 58, 95);
    doc.line(margin, y - 3, pageWidth - margin, y - 3);
    y += 3;
  };

  const addField = (label: string, value: string) => {
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(80, 80, 80);
    doc.text(label + ':', margin, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    const valueX = margin + 50;
    const maxWidth = pageWidth - valueX - margin;
    const lines = doc.splitTextToSize(value || 'N/A', maxWidth);
    doc.text(lines, valueX, y);
    y += lineHeight * Math.max(1, lines.length);
  };

  const addSpacer = () => {
    y += 5;
  };

  // Header
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 58, 95);
  doc.text('AUTOMOBILE LOSS NOTICE', pageWidth / 2, y, { align: 'center' });
  y += 5;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text('ACORD 2 (2016/10)', pageWidth / 2, y, { align: 'center' });
  y += 15;

  // Agency Information
  addTitle('AGENCY INFORMATION');
  addField('Agency Name', formData.agency_name);
  addField('Contact', formData.agency_contact);
  addField('Phone', formData.agency_phone);
  addField('Fax', formData.agency_fax);
  addField('Email', formData.agency_email);
  addField('Address', formData.agency_address);
  addField('Code', formData.agency_code);
  addField('Subcode', formData.agency_subcode);
  addField('Customer ID', formData.agency_customer_id);
  addSpacer();

  // Policy Information
  addTitle('POLICY INFORMATION');
  addField('Form Date', formData.form_date);
  addField('Location Code', formData.insured_location_code);
  addField('Date of Loss', formData.loss_date);
  addField('Time of Loss', `${formData.loss_time} ${formData.loss_time_period.toUpperCase()}`);
  addField('Carrier', formData.carrier);
  addField('NAIC Code', formData.naic_code);
  addField('Policy Number', formData.policy_number);
  addField('Line of Business', formData.line_of_business);
  addSpacer();

  // Insured Information
  addTitle('INSURED INFORMATION');
  addField('Name', formData.insured_name);
  addField('Address', formData.insured_address);
  addField('Date of Birth', formData.insured_dob);
  addField('FEIN', formData.insured_fein);
  addField('Marital Status', formData.insured_marital_status);
  addField('Primary Phone', formData.insured_phone_primary);
  addField('Secondary Phone', formData.insured_phone_secondary);
  addField('Primary Email', formData.insured_email_primary);
  addField('Secondary Email', formData.insured_email_secondary);
  addSpacer();

  // Contact Information
  if (formData.contact_name || !formData.contact_is_insured) {
    addTitle('CONTACT INFORMATION');
    if (formData.contact_is_insured) {
      addField('Contact', 'Same as Insured');
    } else {
      addField('Name', formData.contact_name);
      addField('Address', formData.contact_address);
      addField('Primary Phone', formData.contact_phone_primary);
      addField('Primary Email', formData.contact_email_primary);
      addField('When to Contact', formData.contact_when);
    }
    addSpacer();
  }

  // Loss Information
  doc.addPage();
  y = 20;
  addTitle('LOSS INFORMATION');
  addField('Location', formData.loss_location);
  addField('Street', formData.loss_street);
  addField('City, State, ZIP', formData.loss_city_state_zip);
  addField('Country', formData.loss_country);
  addField('Report Number', formData.loss_report_number);
  addField('Department Contacted', formData.loss_department);
  addField('Location Description', formData.loss_location_desc);
  addField('Accident Description', formData.loss_accident_desc);
  addSpacer();

  // Vehicle Information
  addTitle('INSURED VEHICLE');
  addField('Vehicle #', formData.vehicle_number);
  addField('Year/Make/Model', `${formData.vehicle_year} ${formData.vehicle_make} ${formData.vehicle_model}`);
  addField('Body Type', formData.vehicle_body_type);
  addField('VIN', formData.vehicle_vin);
  addField('Plate Number', `${formData.vehicle_plate} ${formData.vehicle_state}`);
  addField('Damage Description', formData.vehicle_damage);
  addField('Estimate Amount', formData.vehicle_estimate);
  addSpacer();

  // Other Vehicle
  if (formData.other_vehicle_make || formData.other_property_desc) {
    addTitle('OTHER VEHICLE / PROPERTY');
    if (formData.other_non_vehicle) {
      addField('Property Description', formData.other_property_desc);
    } else {
      addField('Year/Make/Model', `${formData.other_vehicle_year} ${formData.other_vehicle_make} ${formData.other_vehicle_model}`);
      addField('VIN', formData.other_vehicle_vin);
      addField('Plate Number', `${formData.other_vehicle_plate} ${formData.other_vehicle_state}`);
    }
    addField('Owner', formData.other_owner_name_address);
    addField('Damage Description', formData.other_damage);
    addField('Estimate Amount', formData.other_estimate);
    addSpacer();
  }

  // Injured Persons
  const injuredWithData = formData.injured_persons.filter(p => p.name_address);
  if (injuredWithData.length > 0) {
    addTitle('INJURED PERSONS');
    injuredWithData.forEach((person, i) => {
      addField(`Person ${i + 1}`, person.name_address);
      addField('Phone', person.phone);
      addField('Age', person.age);
      addField('Extent of Injury', person.extent_of_injury);
      y += 3;
    });
    addSpacer();
  }

  // Witnesses
  const witnessesWithData = formData.witnesses.filter(w => w.name_address);
  if (witnessesWithData.length > 0) {
    addTitle('WITNESSES / PASSENGERS');
    witnessesWithData.forEach((witness, i) => {
      addField(`Witness ${i + 1}`, witness.name_address);
      addField('Phone', witness.phone);
      y += 3;
    });
    addSpacer();
  }

  // Remarks
  if (formData.remarks || formData.reported_by || formData.reported_to) {
    addTitle('REMARKS');
    addField('Reported By', formData.reported_by);
    addField('Reported To', formData.reported_to);
    addField('Remarks', formData.remarks);
  }

  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `ACORD 2 (2016/10) - Page ${i} of ${pageCount}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
    doc.text(
      '© 1988-2016 ACORD CORPORATION. All rights reserved.',
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 5,
      { align: 'center' }
    );
  }

  // Save
  const fileName = `ACORD2_${formData.policy_number || 'draft'}_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
};
