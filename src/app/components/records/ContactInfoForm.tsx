import React from 'react';
import { Phone } from 'lucide-react';
import type { ContactInfo } from '../../types/records';

type Props = {
  contact: ContactInfo;
  onChange: (updates: Partial<ContactInfo>) => void;
};

const ContactInfoForm: React.FC<Props> = ({ contact, onChange }) => (
  <div className="contact-info-card border border-gray-300 mt-10 rounded-lg shadow-sm">
    <div className="title flex flex-col gap-1 m-4 sm:m-6">
      <div className="main-text flex items-center gap-2">
        <Phone className="text-secondary h-5 w-5" />
        <h3 className="text-xl sm:text-2xl font-semibold text-primary">Contact Information</h3>
      </div>
      <p className="text-xs sm:text-sm text-gray-500">
        <em>Type N/A if not applicable</em>
      </p>
    </div>

    <div className="contact-info flex justify-center items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-[90%] mb-10">
        <div className="flex flex-col">
          <label htmlFor="emailAddress" className="font-semibold text-sm text-gray-700">
            Email Address
          </label>
          <input
            id="emailAddress"
            type="email"
            placeholder="Email Address"
            value={contact.emailAddress}
            onChange={(e) => onChange({ emailAddress: e.target.value })}
            className="border border-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none p-2 rounded transition-all duration-200"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="homeAddress" className="font-semibold text-sm text-gray-700">
            Home Address
          </label>
          <input
            id="homeAddress"
            type="text"
            placeholder="Home Address"
            value={contact.homeAddress}
            onChange={(e) => onChange({ homeAddress: e.target.value })}
            className="border border-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none p-2 rounded transition-all duration-200"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="contactNumber" className="font-semibold text-sm text-gray-700">
            Contact Number
          </label>
          <input
            id="contactNumber"
            type="number"
            placeholder="Contact Number"
            value={contact.contactNumber}
            onChange={(e) => onChange({ contactNumber: e.target.value })}
            className="border border-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none p-2 rounded transition-all duration-200"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="emergencyContact" className="font-semibold text-sm text-gray-700">
            Emergency Contact
          </label>
          <input
            id="emergencyContact"
            type="number"
            placeholder="Emergency Contact"
            value={contact.emergencyContact}
            onChange={(e) => onChange({ emergencyContact: e.target.value })}
            className="border border-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none p-2 rounded transition-all duration-200"
          />
        </div>
      </div>
    </div>
  </div>
);

export default ContactInfoForm;
