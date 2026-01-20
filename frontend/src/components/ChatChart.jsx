import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
);

export default function ChatChart({ data }) {
    const labels = data.map(d => d.date);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Active Users',
                data: data.map(d => d.activeUsers),
                backgroundColor: 'rgba(54, 162, 235, 0.7)'
            },
            {
                label: 'New Users',
                data: data.map(d => d.newUsers),
                backgroundColor: 'rgba(255, 159, 64, 0.7)'
            }
        ]
    };
    return (
        <>
            <h2>Active Users and New Users Over Last 7 Days</h2>
            <Bar data={chartData}/>;
        </>
    )  
}