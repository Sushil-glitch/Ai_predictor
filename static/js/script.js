/**
 * Client-side script for Student Predictor (Static Version for GitHub Pages)
 */

document.addEventListener('DOMContentLoaded', () => {
    // Handling Student Performance Prediction Form
    const predictForm = document.getElementById('predictForm');
    if (predictForm) {
        predictForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const study_hours = parseFloat(document.getElementById('studyHours').value);
            const school_type = document.getElementById('schoolType').value;
            const board = document.getElementById('board').value;
            const resultBox = document.getElementById('resultBox');
            const spinner = document.getElementById('spinner');

            // Show Spinner
            spinner.style.display = 'block';
            resultBox.style.display = 'none';

            // Simulate 'Processing' Delay
            setTimeout(() => {
                spinner.style.display = 'none';

                // Simulation Logic (Formerly on Backend)
                const randomNoise = Math.random() * 10;
                let score = (study_hours * 10) + randomNoise;
                score = Math.min(Math.round(score * 100) / 100, 100);
                
                const status = score >= 40 ? "PASS" : "FAIL";

                // Display Result
                resultBox.style.display = 'block';
                resultBox.innerHTML = `
                    <h3>Predicted Result</h3>
                    <p style="font-size: 2rem; font-weight: 700; margin: 10px 0;">${score}%</p>
                    <span class="badge ${status === 'PASS' ? 'badge-pass' : 'badge-fail'}">
                        ${status}
                    </span>
                    <p style="margin-top: 15px; color: #636e72;">Prediction successful (Static Engine)</p>
                `;
            }, 1000);
        });
    }

    // Handling Dropout Risk Prediction Form
    const dropoutForm = document.getElementById('dropoutForm');
    if (dropoutForm) {
        dropoutForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const attendance = parseFloat(document.getElementById('attendance').value);
            const marks = parseFloat(document.getElementById('marks').value);
            const resultBox = document.getElementById('dropoutResult');
            const spinner = document.getElementById('dropoutSpinner');

            spinner.style.display = 'block';
            resultBox.style.display = 'none';

            setTimeout(() => {
                spinner.style.display = 'none';

                // Simulation Logic (Formerly on Backend)
                let risk = "LOW RISK";
                if (attendance < 50 || marks < 40) {
                    risk = "HIGH RISK";
                }

                resultBox.style.display = 'block';
                const isHighRisk = risk === 'HIGH RISK';
                resultBox.innerHTML = `
                    <h3>Risk Assessment</h3>
                    <p style="font-size: 1.8rem; font-weight: 700; color: ${isHighRisk ? '#d63031' : '#00b894'}; margin: 10px 0;">
                        ${risk}
                    </p>
                    <p>Based on attendance of ${attendance}% and prev marks of ${marks}.</p>
                `;
            }, 1000);
        });
    }
});
