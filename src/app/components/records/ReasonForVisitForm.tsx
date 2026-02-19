import React from 'react';
import { Stethoscope } from 'lucide-react';

type Props = {
  reasonForVisit: string;
  onChange: (value: string) => void;
};

const ReasonForVisitForm: React.FC<Props> = ({ reasonForVisit, onChange }) => (
  <div className="reason-for-visit-card border border-gray-300 mt-10 rounded-lg shadow-sm">
    <div className="title flex flex-col gap-1 m-4 sm:m-6">
      <div className="main-text flex items-center gap-2">
        <Stethoscope className="text-secondary h-5 w-5" />
        <h3 className="text-xl sm:text-2xl font-semibold text-primary">Reason for Visit</h3>
      </div>
    </div>

    <div className="text-area px-6 sm:px-10 mb-6">
      <label htmlFor="reasonForVisit" className="font-semibold text-sm text-gray-700">
        Reason
      </label>
      <textarea
        id="reasonForVisit"
        value={reasonForVisit}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type something here..."
        rows={5}
        className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
      />
    </div>
  </div>
);

export default ReasonForVisitForm;
