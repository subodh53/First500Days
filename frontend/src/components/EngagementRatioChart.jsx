import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
    Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
    Legend
);

export default function EngagementRaioChart({ dailyStats }) {
const dates = Object.keys(dailyStats).sort();

const enagagementData = dates.map(date => {
    const { activeUsers, newUsers } = dailyStats[date];
    const total = activeUsers + newUsers;

    if (total === 0) return 0; 
    return ((activeUsers / total) * 100).toFixed(2);
});

const chartData = {
    labels: dates,
    datasets: [
        {
            label: "Engagement Ratio (%)",
            data: enagagementData,
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            tension: 0.3,
            fill: true
        }
    ]
};
const options = {
    scales: {
        y: {
            min: 0,
            max: 100,
            title: {
                display: true,
                text: 'Engagement (%)'
            }
        }
    }
};

return <Line data={chartData} options={options} />;
}