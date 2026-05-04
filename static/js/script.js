/**
 * Client-side script for Student Predictor (Static Version for GitHub Pages)
 */

document.addEventListener('DOMContentLoaded', () => {
    // Handling Student Performance Prediction Form
    const predictForm = document.getElementById('predictForm');
    if (predictForm) {
        predictForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const gender = document.getElementById('gender').value;
            const studyHours = parseFloat(document.getElementById('studyHours').value);
            const parentEdu = document.getElementById('parentEdu').value;
            const schoolType = document.getElementById('schoolType').value;
            const board = document.getElementById('board').value;
            const testPrep = document.getElementById('testPrep').value;
            
            const resultBox = document.getElementById('resultBox');
            const spinner = document.getElementById('spinner');

            // Simulate 'Processing' Delay
            setTimeout(() => {
                spinner.style.display = 'none';

                // ML Logic (Linear Regression Weights derived from Kaggle Student Performance Dataset)
                let score = 49.55; // Intercept
                score += studyHours * 0.5260;
                
                if (gender === 'female') score += -1.5495;
                if (gender === 'male') score += 1.5495;
                
                if (parentEdu === 'bachelors') score += -0.8446;
                if (parentEdu === 'high_school') score += -2.3488;
                if (parentEdu === 'masters') score += 3.1934;
                
                if (schoolType === 'government') score += 0.8508;
                if (schoolType === 'private') score += -0.8508;
                
                if (board === 'cbse') score += -0.3226;
                if (board === 'ib') score += 2.3353;
                if (board === 'icse') score += 0.1808;
                if (board === 'igcse') score += -2.9386;
                if (board === 'state') score += 0.7451;
                
                if (testPrep === '50_percent') score += -5.2042;
                if (testPrep === '75_percent') score += 5.1842;
                if (testPrep === 'completed') score += 19.2584;
                if (testPrep === 'none') score += -19.2383;
                
                // Add some slight realistic noise
                score += (Math.random() * 6 - 3);
                
                // Bound the score between 0 and 100
                score = Math.min(Math.max(Math.round(score * 100) / 100, 0), 100);
                
                const status = score >= 40 ? "PASS" : "FAIL";

                // Display Result
                resultBox.style.display = 'block';
                resultBox.innerHTML = `
                    <h3>Predicted Result</h3>
                    <p style="font-size: 2rem; font-weight: 700; margin: 10px 0;">${score}%</p>
                    <span class="badge ${status === 'PASS' ? 'badge-pass' : 'badge-fail'}">
                        ${status}
                    </span>
                    <p style="margin-top: 15px; color: #636e72;">Prediction successful (Static ML Engine)</p>
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
    // Handling Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('overlay');

    if (mobileMenuBtn && mobileMenu && overlay) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            
            // Animate hamburger to X (optional, but nice)
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (mobileMenu.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(5px, -5px)';
                } else {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                }
            });
        });

        overlay.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        });
    }
});
