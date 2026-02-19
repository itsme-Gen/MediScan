import React from 'react';
import { Heart } from 'lucide-react';
import type { MedicalHistoryItem } from '../../types/records';

type Props = {
  medicalHistory: MedicalHistoryItem[];
  conditionTypes: string[];
  conditionStatusOptions: string[];
  severityOptions: string[];
  onChange: (index: number, field: keyof MedicalHistoryItem, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
};

const MedicalHistoryForm: React.FC<Props> = ({
  medicalHistory,
  conditionTypes,
  conditionStatusOptions,
  severityOptions,
  onChange,
  onAdd,
  onRemove,
}) => (
  <div className="medical-history-card border border-gray-300 mt-10 rounded-lg w-full">
    <div className="title flex flex-col px-4 sm:px-6 md:px-8 py-4">
      <div className="main-text flex flex-cols items-center gap-2 flex-wrap">
        <Heart className="text-secondary h-5" />
        <h3 className="text-xl sm:text-2xl font-semibold text-primary">Medical History</h3>
      </div>
      <p className="text-sm text-gray-500">
        <em>Past medical conditions</em> / <em>Type "None" if not applicable</em>
      </p>
    </div>

    {medicalHistory.map((h, index) => (
      <div
        key={index}
        className="relative border border-gray-300 rounded-lg p-4 sm:p-5 mb-5 mx-2 sm:mx-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-3">
          {[
            { id: 'conditionName', label: 'Condition Name', type: 'text' },
            { id: 'diagnosedDate', label: 'Diagnosed Date', type: 'date' },
            { id: 'conditionType', label: 'Condition Type', type: 'select-type' },
            { id: 'severity', label: 'Severity', type: 'select-severity' },
            { id: 'conditionStatus', label: 'Status', type: 'select-status' },
            { id: 'resolutionDate', label: 'Resolution Date', type: 'date' },
          ].map((field) => (
            <div className="flex flex-col" key={field.id}>
              <label
                htmlFor={`${field.id}-${index}`}
                className="font-semibold text-sm text-gray-700"
              >
                {field.label}
              </label>

              {field.type === 'select-type' && (
                <select
                  id={`${field.id}-${index}`}
                  value={h[field.id as keyof MedicalHistoryItem]}
                  onChange={(e) => onChange(index, field.id as keyof MedicalHistoryItem, e.target.value)}
                  className="p-2 rounded border border-gray-400 outline-primary"
                >
                  <option value="">Select Type</option>
                  {conditionTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              )}

              {field.type === 'select-severity' && (
                <select
                  id={`${field.id}-${index}`}
                  value={h[field.id as keyof MedicalHistoryItem]}
                  onChange={(e) => onChange(index, field.id as keyof MedicalHistoryItem, e.target.value)}
                  className="p-2 rounded border border-gray-400 outline-primary"
                >
                  <option value="">Select Severity</option>
                  {severityOptions.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              )}

              {field.type === 'select-status' && (
                <select
                  id={`${field.id}-${index}`}
                  value={h[field.id as keyof MedicalHistoryItem]}
                  onChange={(e) => onChange(index, field.id as keyof MedicalHistoryItem, e.target.value)}
                  className="p-2 rounded border border-gray-400 outline-primary"
                >
                  <option value="">Select Status</option>
                  {conditionStatusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              )}

              {(field.type === 'text' || field.type === 'date') && (
                <input
                  id={`${field.id}-${index}`}
                  type={field.type}
                  placeholder={field.label}
                  value={h[field.id as keyof MedicalHistoryItem]}
                  onChange={(e) => onChange(index, field.id as keyof MedicalHistoryItem, e.target.value)}
                  className="p-2 rounded border border-gray-400 outline-primary"
                />
              )}
            </div>
          ))}
        </div>

        {medicalHistory.length > 1 && (
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
        + Add Condition
      </button>
    </div>
  </div>
);

export default MedicalHistoryForm;
