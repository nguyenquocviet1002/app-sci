import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

import LFWeekStyles from './LFWeek.module.scss';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
  scales: {
    y: {
      suggestedMax: 10,
    },
  },
};

export default function LFWeek({ dataChart, dataTable }) {
  const data = {
    labels: dataChart.labels,
    datasets: [
      {
        label: 'Form',
        data: dataChart.lead,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Booking',
        data: dataChart.booking,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <div className={LFWeekStyles['expenseContent']}>
      <div className={LFWeekStyles['expenseContent__chart']}>
        <Bar options={options} data={data} />
      </div>
      <div className={LFWeekStyles['expenseContent__table']}>
        <table className={`table ${LFWeekStyles['table--default']}`}>
          <thead className={LFWeekStyles['table__head']}>
            <tr>
              <th>STT</th>
              <th>Thương hiệu</th>
              <th>Form</th>
              <th>Booking</th>
            </tr>
          </thead>
          <tbody className={LFWeekStyles['table__body']}>
            {dataTable.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.lead}</td>
                <td>{item.booking}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
