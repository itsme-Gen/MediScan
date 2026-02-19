import React from 'react'
import { BarChart } from '@mui/x-charts/BarChart';
import { dataset, valueFormatter } from "../../dataset/patient"

const BarGraph = () => {
  const chartSetting = {
    xAxis: [
      {
        label: 'Patients per week',
        min: 0,
        max: 400,
      },
    ],
    height: 360,
    margin: { left: 0, right: 20, top: 20, bottom: 40 },
  };

  return (
    <div className='barProps'>
      <BarChart
        dataset={dataset}
        yAxis={[{ scaleType: 'band', dataKey: 'week' }]}
        series={[
          { dataKey: 'clinic', label: 'Clinic', stack: 'total', color: '#2563eb', valueFormatter },
          { dataKey: 'er', label: 'ER', stack: 'total', color: '#ea580c', valueFormatter },
          { dataKey: 'tele', label: 'Telehealth', stack: 'total', color: '#14b8a6', valueFormatter },
          { dataKey: 'followup', label: 'Follow-up', stack: 'total', color: '#6366f1', valueFormatter },
        ]}
        layout="horizontal"
        {...chartSetting}
      />
    </div>
  )
}

export default BarGraph
