import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import successWeekStyles from './SuccessWeek.module.scss';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
  scales: {
    y: {
      suggestedMax: 40,
    },
  },
};

export default function SuccessWeek({ dataChart, dataTable }) {
  let data = '';
  if (dataChart.length !== 0) {
    data = {
      labels: dataChart.data.date,
      datasets: [
        {
          label: 'All',
          data: dataChart.data.all,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Kangnam',
          data: dataChart.data.kn,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
          hidden: true,
        },
        {
          label: 'Đông Á',
          data: dataChart.data.da,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          hidden: true,
        },
        {
          label: 'Hồng Hà',
          data: dataChart.data.hh,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
          hidden: true,
        },
        {
          label: 'Paris',
          data: dataChart.data.pr,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          hidden: true,
        },
      ],
    };
  }

  return (
    <div className={successWeekStyles['expenseContent']}>
      <div className={successWeekStyles['expenseTable']}>
        <div className={successWeekStyles['expenseTableService']}>
          <div className={successWeekStyles['dropdown']}></div>
        </div>
        <table className={[`table ${successWeekStyles['table--default']}`]}>
          <thead className={successWeekStyles['table__head']}>
            <tr>
              <th>STT</th>
              <th>Dịch vụ</th>
              <th>Số lượng</th>
            </tr>
          </thead>
          <tbody className={successWeekStyles['table__body']}>
            {dataTable.length !== 0 &&
              dataTable.so_luong.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.group_service}</td>
                  <td>{item.so_luong}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className={successWeekStyles['expenseContent__chart']}>
        {dataChart.length !== 0 && <Line options={options} data={data} />}
      </div>
    </div>
  );
}
