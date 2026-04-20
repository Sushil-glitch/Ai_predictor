/**
 * Charts script using Chart.js with Live Data Fetching
 */

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch live data from the backend
        const response = await fetch('/api/dashboard_data');
        const liveData = await response.json();

        // 1. Bar Chart: Average Scores
        const ctxBar = document.getElementById('scoresBarChart');
        if (ctxBar) {
            new Chart(ctxBar, {
                type: 'bar',
                data: {
                    labels: ['Math', 'Reading', 'Writing'],
                    datasets: [{
                        label: 'Average Score',
                        data: [
                            liveData.avg_scores.math, 
                            liveData.avg_scores.reading, 
                            liveData.avg_scores.writing
                        ],
                        backgroundColor: [
                            'rgba(108, 92, 231, 0.7)',
                            'rgba(0, 184, 148, 0.7)',
                            'rgba(250, 177, 160, 0.7)'
                        ],
                        borderColor: [
                            '#6c5ce7',
                            '#00b894',
                            '#fab1a0'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: { beginAtZero: true, max: 100 }
                    }
                }
            });
        }

        // 2. Pie Chart: Pass vs Fail %
        const ctxPie = document.getElementById('passFailPieChart');
        if (ctxPie) {
            new Chart(ctxPie, {
                type: 'pie',
                data: {
                    labels: ['Pass', 'Fail'],
                    datasets: [{
                        data: [liveData.pass_fail.pass, liveData.pass_fail.fail],
                        backgroundColor: ['#00b894', '#d63031'],
                        hoverOffset: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }

        // 3. Line Chart: Study Hours vs Performance
        const ctxLine = document.getElementById('studyTrendLineChart');
        if (ctxLine) {
            new Chart(ctxLine, {
                type: 'line',
                data: {
                    labels: ['0h', '2h', '4h', '6h', '8h', '10h'],
                    datasets: [{
                        label: 'Predicted Score',
                        data: liveData.study_trend,
                        fill: true,
                        borderColor: '#6c5ce7',
                        backgroundColor: 'rgba(108, 92, 231, 0.1)',
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: { beginAtZero: true, max: 100 }
                    }
                }
            });
        }
    } catch (error) {
        console.error("Error fetching live dashboard data:", error);
    }
});
