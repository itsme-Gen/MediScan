import React from 'react';
import { Activity } from 'lucide-react';
import type { VitalSigns } from '../../types/records';

type Props = {
  vitalSigns: VitalSigns;
  onChange: (updates: Partial<VitalSigns>) => void;
};

const fields = [
  { id: 'bodyTemperature', label: 'Body Temperature' },
  { id: 'heartPulse', label: 'Heart Pulse' },
  { id: 'respiratoryRate', label: 'Respiratory Rate' },
  { id: 'bloodPressure', label: 'Blood Pressure' },
];

const VitalSignsForm: React.FC<Props> = ({ vitalSigns, onChange }) => (
  <div className="vital-info-card border border-gray-300 mt-10 rounded-lg shadow-sm">
    <div className="title flex flex-col gap-1 m-4 sm:m-6">
      <div className="main-text flex items-center gap-2">
        <Activity className="text-secondary h-5 w-5" />
        <h3 className="text-xl sm:text-2xl font-semibold text-primary">Vital Signs</h3>
      </div>
      <p className="text-xs sm:text-sm text-gray-500">
        <em>All fields are required*</em>
      </p>
    </div>

    <div className="vital-info flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-[90%] gap-6 mb-10">
        {fields.map((field) => (
          <div className="flex flex-col" key={field.id}>
            <label htmlFor={field.id} className="font-semibold text-sm text-gray-700">
              {field.label}
            </label>
            <input
              id={field.id}
              type="text"
              placeholder={field.label}
              value={vitalSigns[field.id as keyof VitalSigns]}
              onChange={(e) => onChange({ [field.id]: e.target.value } as Partial<VitalSigns>)}
              className="p-2 rounded border border-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-200"
            />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default VitalSignsForm;
