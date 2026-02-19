import React from 'react';
import { Activity } from 'lucide-react';
import type { LabResult } from '../../types/records';

type Props = {
  labResults: LabResult[];
  flagOptions: string[];
  onChange: (index: number, field: keyof LabResult, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
};

const LabResultsForm: React.FC<Props> = ({ labResults, flagOptions, onChange, onAdd, onRemove }) => (
  <div className="lab-results-card border border-gray-300 mt-10 rounded-lg w-full">
    <div className="title flex flex-col px-4 sm:px-6 md:px-8 py-4">
      <div className="main-text flex flex-cols items-center gap-2 flex-wrap">
        <Activity className="text-secondary h-5" />
        <h3 className="text-xl sm:text-2xl font-semibold text-primary">Lab Results</h3>
      </div>
      <p className="text-sm text-gray-500">
        <em>Type "None" if not applicable</em>
      </p>
    </div>

    {labResults.map((l, index) => (
      <div
        key={index}
        className="relative border border-gray-300 rounded-lg p-4 sm:p-5 mb-5 mx-2 sm:mx-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-3">
          {[
            { id: 'testName', label: 'Test Name', type: 'text' },
            { id: 'testDate', label: 'Test Date', type: 'date' },
            { id: 'testResult', label: 'Result', type: 'text' },
            { id: 'referenceRange', label: 'Reference Range', type: 'text' },
            { id: 'testFlag', label: 'Flag', type: 'select' },
          ].map((field) => (
            <div className="flex flex-col" key={field.id}>
              <label
                htmlFor={`${field.id}-${index}`}
                className="font-semibold text-sm text-gray-700"
              >
                {field.label}
              </label>

              {field.type === 'select' ? (
                <select
                  id={`${field.id}-${index}`}
                  value={l[field.id as keyof LabResult] || ''}
                  onChange={(e) => onChange(index, field.id as keyof LabResult, e.target.value)}
                  className="p-2 rounded border border-gray-400 outline-primary"
                >
                  <option value="">Select {field.label}</option>
                  {flagOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={`${field.id}-${index}`}
                  type={field.type}
                  placeholder={field.label}
                  value={l[field.id as keyof LabResult]}
                  onChange={(e) => onChange(index, field.id as keyof LabResult, e.target.value)}
                  className="p-2 rounded border border-gray-400 outline-primary"
                />
              )}
            </div>
          ))}
        </div>

        {labResults.length > 1 && (
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
        + Add Test
      </button>
    </div>
  </div>
);

export default LabResultsForm;
