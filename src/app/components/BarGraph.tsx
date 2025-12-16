import React from 'react'
import { BarChart } from '@mui/x-charts/BarChart';
import { dataset, valueFormatter } from "../../dataset/patient"

const BarGraph = () => {
  const chartSetting = {
    xAxis: [
      {
        label: 'Number of Patients',
        min: 0,
        max: 1000,
      },
    ],
    height: 500,
    margin: { left: 0},
  };

  return (
    <div className='barProps'>
      <BarChart
        dataset={dataset}
        yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
        series={[
          { dataKey: 'accidents', label: 'Accidents', stack: 'total', color: '#1C6EA4', valueFormatter },
          { dataKey: 'infectious', label: 'Infectious Diseases', stack: 'total', color: '#33A1E0', valueFormatter },
          { dataKey: 'chronic', label: 'Chronic Illnesses', stack: 'total', color: '#92FE9D', valueFormatter },
          { dataKey: 'others', label: 'Other Cases', stack: 'total', color: '#FF6B6B', valueFormatter },
        ]}
        layout="horizontal"
        {...chartSetting}
      />
    </div>
  )
}

export default BarGraph
