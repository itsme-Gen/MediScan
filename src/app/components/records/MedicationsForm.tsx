import React from 'react';
import { Pill } from 'lucide-react';
import type { Medication } from '../../types/records';

type Props = {
  medications: Medication[];
  onChange: (index: number, field: keyof Medication, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
};

const MedicationsForm: React.FC<Props> = ({ medications, onChange, onAdd, onRemove }) => (
  <div className="medication-info-card border border-gray-300 mt-10 rounded-lg w-full">
    <div className="title flex flex-col px-4 sm:px-6 md:px-8 py-4">
      <div className="main-text flex flex-cols items-center gap-2 flex-wrap">
        <Pill className="text-secondary h-5" />
        <h3 className="text-xl sm:text-2xl font-semibold text-primary">Medications</h3>
      </div>
      <p className="text-sm text-gray-500">
        <em>All current and past medications</em>
      </p>
    </div>

    {medications.map((m, index) => (
      <div
        key={index}
        className="relative border border-gray-300 rounded-lg p-4 sm:p-5 mb-5 mx-2 sm:mx-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-3">
          {[
            { id: 'medicationName', label: 'Medication Name' },
            { id: 'dateStarted', label: 'Date Started', type: 'date' },
            { id: 'dosage', label: 'Dosage' },
            { id: 'frequency', label: 'Frequency' },
          ].map((field) => (
            <div className="flex flex-col" key={field.id}>
              <label
                htmlFor={`${field.id}-${index}`}
                className="font-semibold text-sm text-gray-700"
              >
                {field.label}
              </label>
              <input
                id={`${field.id}-${index}`}
                type={field.type || 'text'}
                placeholder={field.label}
                value={m[field.id as keyof Medication]}
                onChange={(e) => onChange(index, field.id as keyof Medication, e.target.value)}
                className="p-2 rounded border border-gray-400 outline-primary"
              />
            </div>
          ))}
        </div>

        {medications.length > 1 && (
          <button
            type="button"
            className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded text-xs sm:text-sm hover:bg-red-600"
            onClick={() => onRemove(index)}
          >
            Remove
          </button>
        )}
      </div>
    ))}

    <div className="flex justify-center mb-6">
      <button
        type="button"
        className="bg-secondary text-white px-4 py-2 rounded hover:bg-secondary/90"
        onClick={onAdd}
      >
        + Add Medication
      </button>
    </div>
  </div>
);

export default MedicationsForm;
