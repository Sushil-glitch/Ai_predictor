from flask import Flask, render_template, request, jsonify
import random
import time

app = Flask(__name__)

# --- ROUTES ---

@app.route('/')
def home():
    """Home Page route."""
    return render_template('index.html')

@app.route('/predict')
def predict():
    """Student Performance Prediction Page route."""
    return render_template('predict.html')

@app.route('/dropout')
def dropout():
    """Dropout Prediction Page route."""
    return render_template('dropout.html')

@app.route('/dashboard')
def dashboard():
    """Analytics Dashboard Page route."""
    return render_template('dashboard.html')

@app.route('/about')
def about():
    """About Page route."""
    return render_template('about.html')

# --- API ENDPOINTS ---

@app.route('/predict_score', methods=['POST'])
def predict_score():
    """
    API for Performance Prediction.
    Logic: (study_hours * 10) + random(0-10)
    """
    data = request.json
    study_hours = float(data.get('study_hours', 0))
    
    # Simulate a slight delay for the 'AI Processing' feel
    time.sleep(1)
    
    # Simple simulation logic
    score = (study_hours * 10) + random.uniform(0, 10)
    score = min(round(score, 2), 100) # Cap at 100
    
    status = "PASS" if score >= 40 else "FAIL"
    
    return jsonify({
        'score': score,
        'status': status,
        'message': f"Prediction successful for student."
    })

@app.route('/predict_dropout', methods=['POST'])
def predict_dropout():
    """
    API for Dropout Prediction.
    Logic: attendance < 50 OR marks < 40 -> HIGH RISK
    """
    data = request.json
    attendance = float(data.get('attendance', 0))
    marks = float(data.get('marks', 0))
    
    # Simulate processing delay
    time.sleep(1)
    
    risk = "LOW RISK"
    if attendance < 50 or marks < 40:
        risk = "HIGH RISK"
        
    return jsonify({
        'risk': risk,
        'attendance': attendance,
        'marks': marks
    })

@app.route('/api/dashboard_data')
def get_dashboard_data():
    """
    API to provide live statistics for the dashboard.
    Simulates dynamic data.
    """
    # Sample data that could eventually come from a database
    data = {
        'avg_scores': {
            'math': random.randint(60, 70),
            'reading': random.randint(65, 75),
            'writing': random.randint(62, 72)
        },
        'pass_fail': {
            'pass': random.randint(70, 85),
            'fail': random.randint(15, 30)
        },
        'study_trend': [
            random.randint(5, 15), 
            random.randint(20, 35), 
            random.randint(40, 55), 
            random.randint(60, 75), 
            random.randint(80, 90), 
            random.randint(92, 100)
        ]
    }
    return jsonify(data)

if __name__ == '__main__':
    # Running on debug mode for easier development
    app.run(debug=True)
