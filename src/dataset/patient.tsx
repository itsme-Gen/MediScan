import React from "react";

// Updated dataset with general categories
export const dataset = [
  { month: "Jan", accidents: 100, infectious: 200, chronic: 70, others: 500 },
  { month: "Feb", accidents: 120, infectious: 80, chronic: 70, others: 52 },
  { month: "Mar", accidents: 800, infectious: 600, chronic: 502, others: 400 },
  { month: "Apr", accidents: 20, infectious: 15, chronic: 10, others: 15 },
  { month: "May", accidents: 30, infectious: 25, chronic: 20, others: 15 },
  { month: "June", accidents: 10, infectious: 5, chronic: 8, others: 7 },
  { month: "July", accidents: 900, infectious: 800, chronic: 450, others: 200 },
  { month: "Aug", accidents: 1100, infectious: 900, chronic: 800, others: 323 },
  { month: "Sep", accidents: 20, infectious: 15, chronic: 15, others: 10 },
  { month: "Oct", accidents: 30, infectious: 25, chronic: 20, others: 15 },
  { month: "Nov", accidents: 30, infectious: 30, chronic: 20, others: 10 },
  { month: "Dec", accidents: 25, infectious: 25, chronic: 20, others: 20 },
];

// Value formatter for patients
export const valueFormatter = (value: number | null) => {
  if (value === null) return "-";
  if (value >= 1000) return (value / 1000).toFixed(1) + "k patients";
  return value + " patients";
};
