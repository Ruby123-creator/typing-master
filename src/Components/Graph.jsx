import React from 'react'
import 'chart.js/auto'
import { Line } from 'react-chartjs-2'
import { useTheme } from '../ContextFiles/ThemeContext';

function Graph({ graphData }) {
  //  console.log(graphData)
  const { theme } = useTheme();
  return (
    <div >
      <Line 
        data={
          {
            labels: graphData.map(i => i[0]),
            datasets: [
              {
                data: graphData.map(i => i[1]),
                label: 'WPM',
                borderColor: theme.textColor
              }
            ]
          }
        }
      />
    </div>

  )
}

export default Graph