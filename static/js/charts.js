/**
 * Charts script using Chart.js (Static Version for GitHub Pages)
 */

document.addEventListener('DOMContentLoaded', () => {
    // Generate simulated data locally
    const liveData = {
        avg_scores: {
            math: Math.floor(Math.random() * 10) + 60,
            reading: Math.floor(Math.random() * 10) + 65,
            writing: Math.floor(Math.random() * 10) + 62
        },
        pass_fail: {
            pass: Math.floor(Math.random() * 15) + 70,
            fail: Math.floor(Math.random() * 15) + 15
        },
        study_trend: [
            Math.floor(Math.random() * 10) + 5,
            Math.floor(Math.random() * 10) + 20,
            Math.floor(Math.random() * 10) + 40,
            Math.floor(Math.random() * 10) + 60,
            Math.floor(Math.random() * 10) + 80,
            Math.floor(Math.random() * 10) + 90
        ]
    };

    // 1. Bar Chart
    const ctxBar = document.getElementById('scoresBarChart');
    if (ctxBar) {
        new Chart(ctxBar, {
            type: 'bar',
            data: {
                labels: ['Math', 'Reading', 'Writing'],
                datasets: [{
                    label: 'Average Score',
                    data: [liveData.avg_scores.math, liveData.avg_scores.reading, liveData.avg_scores.writing],
                    backgroundColor: ['rgba(108, 92, 231, 0.7)', 'rgba(0, 184, 148, 0.7)', 'rgba(250, 177, 160, 0.7)'],
                    borderColor: ['#6c5ce7', '#00b894', '#fab1a0'],
                    borderWidth: 1
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }

    // 2. Pie Chart
    const ctxPie = document.getElementById('passFailPieChart');
    if (ctxPie) {
        new Chart(ctxPie, {
            type: 'pie',
            data: {
                labels: ['Pass', 'Fail'],
                datasets: [{
                    data: [liveData.pass_fail.pass, liveData.pass_fail.fail],
                    backgroundColor: ['#00b894', '#d63031'],
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }

    // 3. Line Chart
    const ctxLine = document.getElementById('studyTrendLineChart');
    if (ctxLine) {
        new Chart(ctxLine, {
            type: 'line',
            data: {
                labels: ['0h', '2h', '4h', '6h', '8h', '10h'],
                datasets: [{
                    label: 'Predicted Score',
                    data: liveData.study_trend,
                    borderColor: '#6c5ce7',
                    backgroundColor: 'rgba(108, 92, 231, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }
});
