from flask import Flask, render_template, request, jsonify
import random
import time
import joblib
import pandas as pd
import os

app = Flask(__name__)

# Load ML model if exists
model_path = 'model/performance_model.pkl'
columns_path = 'model/model_columns.pkl'
if os.path.exists(model_path) and os.path.exists(columns_path):
    model = joblib.load(model_path)
    model_columns = joblib.load(columns_path)
else:
    model = None
    model_columns = None

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
    API for Performance Prediction using ML model.
    """
    data = request.json
    
    # Simulate a slight delay for the 'AI Processing' feel
    time.sleep(1)
    
    if model is not None and model_columns is not None:
        try:
            # Extract features from request
            input_dict = {
                'gender': data.get('gender', 'male'),
                'studyHours': float(data.get('studyHours', 0)),
                'parentEdu': data.get('parentEdu', 'high_school'),
                'schoolType': data.get('schoolType', 'government'),
                'board': data.get('board', 'state'),
                'testPrep': data.get('testPrep', 'none')
            }
            
            # Convert to DataFrame
            input_df = pd.DataFrame([input_dict])
            
            # One-hot encode
            input_encoded = pd.get_dummies(input_df)
            
            # Reindex to match model columns (fill missing with 0)
            input_encoded = input_encoded.reindex(columns=model_columns, fill_value=0)
            
            # Predict
            score = model.predict(input_encoded)[0]
            score = min(max(round(score, 2), 0), 100) # Cap at 0-100
            
            status = "PASS" if score >= 40 else "FAIL"
            
            return jsonify({
                'score': score,
                'status': status,
                'message': f"ML Prediction successful."
            })
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    else:
        # Fallback simulated logic if model not found
        study_hours = float(data.get('studyHours', 0))
        score = (study_hours * 10) + random.uniform(0, 10)
        score = min(round(score, 2), 100)
        status = "PASS" if score >= 40 else "FAIL"
        
        return jsonify({
            'score': score,
            'status': status,
            'message': f"Simulated Prediction successful."
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
