import React from 'react';
import { FormSection } from '../form/FormSection';
import { Plus, Trash2 } from 'lucide-react';
import { AutoLossFormData, Witness } from '@/types/autoLossForm';

interface WitnessesSectionProps {
  formData: AutoLossFormData;
  updateField: <K extends keyof AutoLossFormData>(field: K, value: AutoLossFormData[K]) => void;
}

export const WitnessesSection: React.FC<WitnessesSectionProps> = ({ formData, updateField }) => {
  const addWitness = () => {
    const newWitness: Witness = { 
      id: Date.now(), 
      name_address: '', 
      phone: '', 
      ins_veh: false, 
      oth_veh: false, 
      other: '' 
    };
    updateField('witnesses', [...formData.witnesses, newWitness]);
  };

  const removeWitness = (id: number) => {
    if (formData.witnesses.length > 1) {
      updateField('witnesses', formData.witnesses.filter(w => w.id !== id));
    }
  };

  const updateWitness = (id: number, field: keyof Witness, value: string | boolean) => {
    updateField('witnesses', formData.witnesses.map(w => 
      w.id === id ? { ...w, [field]: value } : w
    ));
  };

  return (
    <FormSection title="Witnesses or Passengers">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-form-border">
              <th className="text-left py-2 px-2 form-label font-medium">Name & Address</th>
              <th className="text-left py-2 px-2 form-label font-medium w-36">Phone (A/C, No)</th>
              <th className="text-center py-2 px-1 form-label font-medium w-12">INS VEH</th>
              <th className="text-center py-2 px-1 form-label font-medium w-12">OTH VEH</th>
              <th className="text-left py-2 px-2 form-label font-medium">Other (Specify)</th>
              <th className="w-10"></th>
            </tr>
          </thead>
          <tbody>
            {formData.witnesses.map((witness) => (
              <tr key={witness.id} className="border-b border-form-border/50">
                <td className="py-2 px-2">
                  <textarea 
                    className="form-field text-xs resize-none" 
                    rows={2}
                    placeholder="Name and Address"
                    value={witness.name_address}
                    onChange={(e) => updateWitness(witness.id, 'name_address', e.target.value)}
                  />
                </td>
                <td className="py-2 px-2">
                  <input 
                    type="tel" 
                    className="form-field text-xs" 
                    placeholder="(000) 000-0000"
                    value={witness.phone}
                    onChange={(e) => updateWitness(witness.id, 'phone', e.target.value)}
                  />
                </td>
                <td className="py-2 px-1 text-center">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4"
                    checked={witness.ins_veh}
                    onChange={(e) => updateWitness(witness.id, 'ins_veh', e.target.checked)}
                  />
                </td>
                <td className="py-2 px-1 text-center">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4"
                    checked={witness.oth_veh}
                    onChange={(e) => updateWitness(witness.id, 'oth_veh', e.target.checked)}
                  />
                </td>
                <td className="py-2 px-2">
                  <input 
                    type="text" 
                    className="form-field text-xs" 
                    placeholder="Other"
                    value={witness.other}
                    onChange={(e) => updateWitness(witness.id, 'other', e.target.value)}
                  />
                </td>
                <td className="py-2 px-1">
                  <button
                    type="button"
                    onClick={() => removeWitness(witness.id)}
                    className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                    disabled={formData.witnesses.length === 1}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        type="button"
        onClick={addWitness}
        className="mt-4 flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
      >
        <Plus className="w-4 h-4" />
        Add Witness/Passenger
      </button>
    </FormSection>
  );
};
