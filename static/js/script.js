/**
 * Client-side script for Student Predictor Application
 */

document.addEventListener('DOMContentLoaded', () => {
    // Handling Student Performance Prediction Form
    const predictForm = document.getElementById('predictForm');
    if (predictForm) {
        predictForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = {
                gender: document.getElementById('gender').value,
                study_hours: document.getElementById('studyHours').value,
                parent_edu: document.getElementById('parentEdu').value,
                lunch: document.getElementById('lunch').value,
                test_prep: document.getElementById('testPrep').value
            };

            const resultBox = document.getElementById('resultBox');
            const spinner = document.getElementById('spinner');

            // Show Spinner, hide previous results
            spinner.style.display = 'block';
            resultBox.style.display = 'none';

            try {
                const response = await fetch('/predict_score', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();
                
                // Hide Spinner
                spinner.style.display = 'none';

                // Display Result
                resultBox.style.display = 'block';
                resultBox.innerHTML = `
                    <h3>Predicted Result</h3>
                    <p style="font-size: 2rem; font-weight: 700; margin: 10px 0;">${result.score}%</p>
                    <span class="badge ${result.status === 'PASS' ? 'badge-pass' : 'badge-fail'}">
                        ${result.status}
                    </span>
                    <p style="margin-top: 15px; color: #636e72;">${result.message}</p>
                `;
            } catch (error) {
                spinner.style.display = 'none';
                alert('An error occurred during prediction. Please try again.');
                console.error(error);
            }
        });
    }

    // Handling Dropout Risk Prediction Form
    const dropoutForm = document.getElementById('dropoutForm');
    if (dropoutForm) {
        dropoutForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = {
                attendance: document.getElementById('attendance').value,
                study_hours: document.getElementById('studyHours').value,
                marks: document.getElementById('marks').value
            };

            const resultBox = document.getElementById('dropoutResult');
            const spinner = document.getElementById('dropoutSpinner');

            spinner.style.display = 'block';
            resultBox.style.display = 'none';

            try {
                const response = await fetch('/predict_dropout', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();
                
                spinner.style.display = 'none';
                resultBox.style.display = 'block';

                const isHighRisk = result.risk === 'HIGH RISK';
                resultBox.innerHTML = `
                    <h3>Risk Assessment</h3>
                    <p style="font-size: 1.8rem; font-weight: 700; color: ${isHighRisk ? '#d63031' : '#00b894'}; margin: 10px 0;">
                        ${result.risk}
                    </p>
                    <p>Based on attendance of ${result.attendance}% and prev marks of ${result.marks}.</p>
                `;
            } catch (error) {
                spinner.style.display = 'none';
                alert('Error fetching prediction.');
                console.error(error);
            }
        });
    }
});
