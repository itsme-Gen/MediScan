

export const dataset = [
  { week: "W1", er: 62, clinic: 88, tele: 54, followup: 32 },
  { week: "W2", er: 74, clinic: 92, tele: 58, followup: 36 },
  { week: "W3", er: 68, clinic: 105, tele: 64, followup: 40 },
  { week: "W4", er: 81, clinic: 110, tele: 70, followup: 44 },
  { week: "W5", er: 77, clinic: 120, tele: 74, followup: 46 },
  { week: "W6", er: 69, clinic: 114, tele: 66, followup: 38 },
  { week: "W7", er: 92, clinic: 130, tele: 78, followup: 52 },
  { week: "W8", er: 88, clinic: 138, tele: 84, followup: 55 },
];


export const valueFormatter = (value: number | null) => {
  if (value === null) return "-";
  return value + " pts";
};
