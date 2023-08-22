import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useQuery } from 'react-query';
import 'chartjs-adapter-date-fns';

function LineCharts() {
  const { data, error, isLoading } = useQuery('apiData', async () => {
    const response = await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
    const data = await response.json();
    return data;
  });

  const chartInstance = useRef(null);

  useEffect(() => {
    if (data && data.cases) {
      const dates = Object.keys(data.cases).map(dateString => new Date(dateString)); // Convert dates to Date objects
      const cases = Object.values(data.cases);

      const ctx = document.getElementById('lineChart').getContext('2d');

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: dates,
          datasets: [{
            label: 'Total Cases',
            data: cases,
            borderColor: 'blue',
            fill: false,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'A line graph showing case fluctuations'
            }
          },
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day',
                tooltipFormat: 'PPP', // Format for tooltip display
              },
              title: {
                display: true,
                text: 'Date'
              }
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Cases'
              }
            }
          }
        }
      });
    }
  }, [data]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
  
  <canvas id="lineChart"></canvas>
  );
}

export default LineCharts;
