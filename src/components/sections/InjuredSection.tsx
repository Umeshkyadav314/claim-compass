import React from 'react';
import { FormSection } from '../form/FormSection';
import { Plus, Trash2 } from 'lucide-react';
import { AutoLossFormData, InjuredPerson } from '@/types/autoLossForm';

interface InjuredSectionProps {
  formData: AutoLossFormData;
  updateField: <K extends keyof AutoLossFormData>(field: K, value: AutoLossFormData[K]) => void;
}

export const InjuredSection: React.FC<InjuredSectionProps> = ({ formData, updateField }) => {
  const addInjured = () => {
    const newPerson: InjuredPerson = { 
      id: Date.now(), 
      name_address: '', 
      phone: '', 
      ped: false, 
      ins_veh: false, 
      oth_veh: false, 
      age: '', 
      extent_of_injury: '' 
    };
    updateField('injured_persons', [...formData.injured_persons, newPerson]);
  };

  const removeInjured = (id: number) => {
    if (formData.injured_persons.length > 1) {
      updateField('injured_persons', formData.injured_persons.filter(p => p.id !== id));
    }
  };

  const updateInjured = (id: number, field: keyof InjuredPerson, value: string | boolean) => {
    updateField('injured_persons', formData.injured_persons.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  return (
    <FormSection title="Injured">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-form-border">
              <th className="text-left py-2 px-2 form-label font-medium">Name & Address</th>
              <th className="text-left py-2 px-2 form-label font-medium">Phone (A/C, No)</th>
              <th className="text-center py-2 px-1 form-label font-medium w-10">PED</th>
              <th className="text-center py-2 px-1 form-label font-medium w-12">INS VEH</th>
              <th className="text-center py-2 px-1 form-label font-medium w-12">OTH VEH</th>
              <th className="text-left py-2 px-2 form-label font-medium w-16">Age</th>
              <th className="text-left py-2 px-2 form-label font-medium">Extent of Injury</th>
              <th className="w-10"></th>
            </tr>
          </thead>
          <tbody>
            {formData.injured_persons.map((person) => (
              <tr key={person.id} className="border-b border-form-border/50">
                <td className="py-2 px-2">
                  <textarea 
                    className="form-field text-xs resize-none" 
                    rows={2}
                    placeholder="Name and Address"
                    value={person.name_address}
                    onChange={(e) => updateInjured(person.id, 'name_address', e.target.value)}
                  />
                </td>
                <td className="py-2 px-2">
                  <input 
                    type="tel" 
                    className="form-field text-xs" 
                    placeholder="(000) 000-0000"
                    value={person.phone}
                    onChange={(e) => updateInjured(person.id, 'phone', e.target.value)}
                  />
                </td>
                <td className="py-2 px-1 text-center">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4"
                    checked={person.ped}
                    onChange={(e) => updateInjured(person.id, 'ped', e.target.checked)}
                  />
                </td>
                <td className="py-2 px-1 text-center">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4"
                    checked={person.ins_veh}
                    onChange={(e) => updateInjured(person.id, 'ins_veh', e.target.checked)}
                  />
                </td>
                <td className="py-2 px-1 text-center">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4"
                    checked={person.oth_veh}
                    onChange={(e) => updateInjured(person.id, 'oth_veh', e.target.checked)}
                  />
                </td>
                <td className="py-2 px-2">
                  <input 
                    type="text" 
                    className="form-field text-xs" 
                    placeholder="Age"
                    value={person.age}
                    onChange={(e) => updateInjured(person.id, 'age', e.target.value)}
                  />
                </td>
                <td className="py-2 px-2">
                  <input 
                    type="text" 
                    className="form-field text-xs" 
                    placeholder="Extent of Injury"
                    value={person.extent_of_injury}
                    onChange={(e) => updateInjured(person.id, 'extent_of_injury', e.target.value)}
                  />
                </td>
                <td className="py-2 px-1">
                  <button
                    type="button"
                    onClick={() => removeInjured(person.id)}
                    className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                    disabled={formData.injured_persons.length === 1}
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
        onClick={addInjured}
        className="mt-4 flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
      >
        <Plus className="w-4 h-4" />
        Add Injured Person
      </button>
    </FormSection>
  );
};
