import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Appbar from "../components/Appbar";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  Bot,
  Calendar,
  CheckCircle2,
  CircleUser,
  Clock3,
  Download,
  HeartPulse,
  Home,
  MapPin,
  NotepadText,
  Phone,
  Pill,
  Plus,
  Scan,
  Share2,
  SquarePen,
  Stethoscope,
  UserPlus,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const FullRecords: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>("Overview");
  const tabs = ["Overview", "Visit History", "Medications", "Vital Signs", "Lab Results"];

  const clearStorageAndNavigate = (path: string) => {
    localStorage.removeItem("saveFormData");
    localStorage.removeItem("saveData");
    localStorage.removeItem("saveImage");
    localStorage.removeItem("medicalHistory");
    navigate(path);
  };

  const isActive = (path: string) => location.pathname === path;

  const summaryCards = [
    {
      title: "Health Status",
      value: "Stable",
      icon: CheckCircle2,
      border: "border-emerald-200",
      bg: "bg-emerald-50",
      accent: "text-emerald-600",
    },
    {
      title: "Risk Level",
      value: "Moderate",
      icon: AlertTriangle,
      border: "border-amber-200",
      bg: "bg-amber-50",
      accent: "text-amber-600",
    },
    {
      title: "Total Visits",
      value: "3",
      icon: Stethoscope,
      border: "border-sky-200",
      bg: "bg-sky-50",
      accent: "text-sky-600",
    },
    {
      title: "Active Meds",
      value: "3",
      icon: Pill,
      border: "border-cyan-200",
      bg: "bg-cyan-50",
      accent: "text-cyan-600",
    },
  ];

  const allergies = ["Penicillin", "Shellfish", "Latex"];
  const chronicConditions = ["Hypertension", "Type 2 Diabetes"];
  const visitStatusStyles: Record<string, string> = {
    Completed: "bg-emerald-50 text-emerald-700",
    Scheduled: "bg-blue-50 text-blue-700",
    Pending: "bg-amber-50 text-amber-700",
  };
  const medicationStatusStyles: Record<string, string> = {
    Active: "bg-emerald-50 text-emerald-700",
    "On Hold": "bg-amber-50 text-amber-700",
    Discontinued: "bg-gray-100 text-gray-600",
  };
  const labStatusStyles: Record<string, string> = {
    Clear: "bg-emerald-50 text-emerald-700",
    Borderline: "bg-amber-50 text-amber-700",
    High: "bg-rose-50 text-rose-700",
  };

  const visitHistory = [
    {
      date: "2026-02-10",
      type: "Telehealth",
      summary: "Reviewed latest labs and adjusted medication timings.",
      provider: "NP Santos",
      status: "Scheduled",
    },
    {
      date: "2025-12-18",
      type: "Follow-up",
      summary: "Blood pressure check and medication refill.",
      provider: "Dr. Li",
      status: "Completed",
    },
    {
      date: "2025-11-02",
      type: "ER Visit",
      summary: "Managed acute migraine; discharged same day.",
      provider: "Dr. Singh",
      status: "Completed",
    },
  ];

  const medications = [
    {
      name: "Metformin",
      dose: "500 mg",
      schedule: "Twice daily with meals",
      started: "2024-08-01",
      status: "Active",
    },
    {
      name: "Lisinopril",
      dose: "10 mg",
      schedule: "Once daily",
      started: "2025-01-15",
      status: "Active",
    },
    {
      name: "Atorvastatin",
      dose: "20 mg",
      schedule: "Nightly",
      started: "2025-03-10",
      status: "On Hold",
    },
  ];

  const vitalSigns = [
    { label: "Blood Pressure", value: "126/80", note: "sitting" },
    { label: "Heart Rate", value: "72 bpm", note: "resting" },
    { label: "SpO2", value: "98%", note: "room air" },
    { label: "Temperature", value: "36.8 C", note: "oral" },
    { label: "Weight", value: "75 kg", note: "" },
    { label: "BMI", value: "27.5", note: "" },
  ];

  const labResults = [
    {
      test: "CBC",
      result: "Within normal limits",
      reference: "WNL",
      date: "2026-02-08",
      status: "Clear",
    },
    {
      test: "HbA1c",
      result: "6.7%",
      reference: "< 7.0%",
      date: "2026-02-08",
      status: "Borderline",
    },
    {
      test: "Lipid Panel",
      result: "LDL 108 mg/dL",
      reference: "< 100 mg/dL",
      date: "2025-12-15",
      status: "High",
    },
  ];
  const vitalsUpdated = "2026-02-10";

  const renderTabContent = () => {
    switch (activeTab) {
      case "Visit History":
        return (
          <div className="p-5 md:p-6 bg-gray-50">
            <div className="space-y-3">
              {visitHistory.map((visit) => (
                <div
                  key={`${visit.date}-${visit.type}`}
                  className="flex items-start justify-between gap-3 rounded-lg border border-gray-100 bg-white px-3 py-3 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1 h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <Clock3 className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{visit.type}</p>
                      <p className="text-sm text-gray-600">{visit.summary}</p>
                      <p className="text-xs text-gray-400">
                        {visit.date} - {visit.provider}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-semibold rounded-full px-3 py-1 ${
                      visitStatusStyles[visit.status] ?? "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {visit.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      case "Medications":
        return (
          <div className="p-5 md:p-6 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {medications.map((med) => (
                <div
                  key={med.name}
                  className="flex items-center justify-between rounded-lg border border-gray-100 bg-white px-3 py-3 shadow-sm"
                >
                  <div>
                    <p className="font-semibold text-gray-900">{med.name}</p>
                    <p className="text-gray-600">
                      {med.dose} - {med.schedule}
                    </p>
                    <p className="text-xs text-gray-400">Started {med.started}</p>
                  </div>
                  <span
                    className={`text-xs font-semibold rounded-full px-3 py-1 ${
                      medicationStatusStyles[med.status] ?? "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {med.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      case "Vital Signs":
        return (
          <div className="p-5 md:p-6 bg-gray-50">
            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5 shadow-sm">
              <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <HeartPulse className="h-5 w-5 text-primary" />
                Latest Vital Signs
              </h4>
              <p className="text-xs text-gray-500 mt-1">Updated: {vitalsUpdated}</p>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm text-gray-700">
                {vitalSigns.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between rounded-lg border border-gray-100 px-3 py-2"
                  >
                    <div>
                      <p className="text-xs text-gray-500">{item.label}</p>
                      <p className="text-base font-semibold text-gray-900">{item.value}</p>
                    </div>
                    {item.note && <span className="text-xs text-gray-400">{item.note}</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "Lab Results":
        return (
          <div className="p-5 md:p-6 bg-gray-50">
            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5 shadow-sm">
              <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <NotepadText className="h-5 w-5 text-primary" />
                Lab Results
              </h4>
              <div className="mt-4 divide-y divide-gray-100 text-sm text-gray-700">
                {labResults.map((lab) => (
                  <div
                    key={lab.test}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 gap-2"
                  >
                    <div>
                      <p className="font-semibold text-gray-900">{lab.test}</p>
                      <p className="text-gray-600">{lab.result}</p>
                      <p className="text-xs text-gray-400">Collected {lab.date}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-500">Ref: {lab.reference}</span>
                      <span
                        className={`text-xs font-semibold rounded-full px-3 py-1 ${
                          labStatusStyles[lab.status] ?? "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {lab.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "Overview":
      default:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-5 md:p-6 bg-gray-50">
            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5 shadow-sm">
              <h4 className="text-lg font-semibold text-gray-900">Contact Information</h4>
              <div className="mt-3 space-y-3 text-sm text-gray-700">
                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold">09171234567</p>
                    <p className="text-gray-500">Primary Phone</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold">123 Rizal St., Makati City</p>
                    <p className="text-gray-500">Home Address</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5 shadow-sm">
              <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Medical Alerts
              </h4>
              <div className="mt-3 text-sm text-gray-700 space-y-3">
                <div>
                  <p className="font-semibold text-gray-900 mb-2">Allergies:</p>
                  <div className="flex flex-wrap gap-2">
                    {allergies.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-rose-100 text-rose-700 px-3 py-1 text-xs font-semibold"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-2">Chronic Conditions:</p>
                  <div className="flex flex-wrap gap-2">
                    {chronicConditions.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-cyan-100 text-cyan-700 px-3 py-1 text-xs font-semibold"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fullRecords flex flex-col lg:flex-row min-h-screen overflow-hidden bg-gray-50">
      {/* Sidebar (hidden on mobile) */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="main-content flex-1 flex flex-col overflow-y-auto lg:ml-70">
        <Appbar iconTitle={NotepadText} title="Patient Records" icon={CircleUser} />

        <div className="px-4 sm:px-6 lg:px-10 pb-24">
          {/* Top bar */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mt-4">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-1 text-primary font-semibold hover:underline"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
              <span className="hidden sm:block text-gray-300">|</span>
              <div className="flex items-center gap-2">
                <Home className="h-4 w-4 text-gray-400" />
                <span className="text-gray-500">Patient Records</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition">
                <Clock3 className="h-4 w-4 text-primary" />
                View Timeline
              </button>
              <button className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition">
                <Share2 className="h-4 w-4 text-primary" />
                Share Records
              </button>
              <button className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow hover:shadow-md transition">
                <UserPlus className="h-4 w-4" />
                Add Patient
              </button>
            </div>
          </div>

          {/* Summary cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
            {summaryCards.map((card) => (
              <div
                key={card.title}
                className={`flex items-center justify-between rounded-xl border ${card.border} ${card.bg} px-4 py-4 shadow-sm`}
              >
                <div>
                  <p className="text-xs font-medium text-gray-500">{card.title}</p>
                  <p className="text-lg font-semibold text-gray-900 mt-1">{card.value}</p>
                </div>
                <div className={`rounded-full p-3 ${card.bg.replace("50", "100")}`}>
                  <card.icon className={`h-6 w-6 ${card.accent}`} />
                </div>
              </div>
            ))}
          </div>

          {/* Patient card */}
          <div className="mt-6 bg-white rounded-xl border border-gray-200 shadow-sm p-5 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-indigo-50 text-primary flex items-center justify-center">
                <CircleUser className="h-7 w-7" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Maria Santos Dela Cruz</h3>
                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                  <span className="font-medium">Patient ID:</span>
                  <span className="text-gray-700">PT-2024-001234</span>
                  <span className="text-gray-300">|</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    Born: 1985-03-15
                  </span>
                  <span className="text-gray-300">|</span>
                  <span className="flex items-center gap-1">
                    <HeartPulse className="h-4 w-4 text-gray-400" />
                    O+
                  </span>
                  <span className="text-gray-300">|</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-emerald-700 font-semibold">
                    <Activity className="h-4 w-4" />
                    Active Patient
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition">
                <SquarePen className="h-4 w-4" />
                Edit Info
              </button>
              <button className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition">
                <Download className="h-4 w-4" />
                Export Records
              </button>
              <button className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow hover:shadow-md transition">
                <Plus className="h-4 w-4" />
                New Visit
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-6 bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="flex flex-wrap text-sm font-semibold text-gray-600">
              {tabs.map((label) => (
                <button
                  key={label}
                  onClick={() => setActiveTab(label)}
                  className={`px-4 sm:px-6 py-3 border-b transition ${
                    activeTab === label
                      ? "text-primary border-primary font-semibold"
                      : "border-transparent hover:text-primary"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {renderTabContent()}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md flex justify-around py-3 z-50 lg:hidden">
        <button
          onClick={() => clearStorageAndNavigate("/dashboard")}
          className={`flex flex-col items-center transition ${
            isActive("/dashboard")
              ? "text-primary"
              : "text-secondary hover:text-primary"
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs font-medium">Dashboard</span>
        </button>

        <button
          onClick={() => clearStorageAndNavigate("/scanid")}
          className={`flex flex-col items-center transition ${
            isActive("/scanid")
              ? "text-primary"
              : "text-secondary hover:text-primary"
          }`}
        >
          <Scan className="w-6 h-6" />
          <span className="text-xs font-medium">Scan ID</span>
        </button>

        <button
          onClick={() => clearStorageAndNavigate("/records")}
          className={`flex flex-col items-center transition ${
            isActive("/records")
              ? "text-primary"
              : "text-secondary hover:text-primary"
          }`}
        >
          <NotepadText className="w-6 h-6" />
          <span className="text-xs font-medium">Records</span>
        </button>

        <button
          onClick={() => clearStorageAndNavigate("/chatassistant")}
          className={`flex flex-col items-center transition ${
            isActive("/chatassistant")
              ? "text-primary"
              : "text-secondary hover:text-primary"
          }`}
        >
          <Bot className="w-6 h-6" />
          <span className="text-xs font-medium">Assistant</span>
        </button>
      </div>
    </div>
  );
};

export default FullRecords;
