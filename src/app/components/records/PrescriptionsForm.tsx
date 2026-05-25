import React from 'react';
import { Save } from 'lucide-react';
import type { Prescription } from '../../types/records';

type Props = {
  prescriptions: Prescription[];
  onChange: (index: number, field: keyof Prescription, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
};

const PrescriptionsForm: React.FC<Props> = ({ prescriptions, onChange, onAdd, onRemove }) => (
  <div className="prescriptions-card border border-gray-300 mt-10 rounded-lg w-full">
    <div className="title flex flex-col px-4 sm:px-6 md:px-8 py-4">
      <div className="main-text flex flex-cols items-center gap-2 flex-wrap">
        <Save className="text-secondary h-5" />
        <h3 className="text-xl sm:text-2xl font-semibold text-primary">Prescriptions</h3>
      </div>
    </div>

    {prescriptions.map((p, index) => (
      <div
        key={index}
        className="relative border border-gray-300 rounded-lg p-4 sm:p-5 mb-5 mx-2 sm:mx-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-3">
          {[
            { id: 'medicationName', label: 'Medication Name', type: 'text' },
            { id: 'dosage', label: 'Dosage', type: 'text' },
            { id: 'quantity', label: 'Quantity', type: 'text' },
            { id: 'frequency', label: 'Frequency', type: 'text' },
            { id: 'datePrescribed', label: 'Date Prescribed', type: 'date' },
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
                type={field.type}
                placeholder={field.label}
                value={p[field.id as keyof Prescription]}
                onChange={(e) => onChange(index, field.id as keyof Prescription, e.target.value)}
                className="p-2 rounded border border-gray-400 outline-primary"
              />
            </div>
          ))}
        </div>

        {prescriptions.length > 1 && (
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
        + Add Prescription
      </button>
    </div>
  </div>
);

export default PrescriptionsForm;
