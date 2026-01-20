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

export default function CumulativeGrowthChart({ dailyStats }) {
    const dates = Object.keys(dailyStats).sort();

    let cumulativeTotal = 0;
    const cumulativeData = dates.map(date => {
        cumulativeTotal += dailyStats[date].newUsers;
        return cumulativeTotal;
    });

    const chartData = {
        labels: dates,
        datasets: [
            {
                label: "Cumulative Users Joined",
                data: cumulativeData,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.3,
                fill: true
            }
        ]
    };

    return <Line data={chartData} />;
}