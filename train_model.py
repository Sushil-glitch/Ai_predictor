import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
import joblib
import os

# Create model directory
os.makedirs('model', exist_ok=True)

# Load dataset
data_path = r"C:\Users\vasan\.cache\kagglehub\datasets\devansodariya\student-performance-data\versions\1\student_data.csv"
df = pd.read_csv(data_path)

# 1. We need to map the dataset to our form inputs as closely as possible.
# Form inputs: gender, studyHours, parentEdu, schoolType, board, testPrep

# Map gender
df['gender'] = df['sex'].map({'M': 'male', 'F': 'female'})

# Study hours (studytime in dataset: 1: <2 hrs, 2: 2-5 hrs, 3: 5-10 hrs, 4: >10 hrs)
# We will simulate studyHours (0-10) based on studytime
np.random.seed(42)
df['studyHours'] = df['studytime'].apply(lambda x: np.random.randint(0, 3) if x==1 else (np.random.randint(3, 6) if x==2 else (np.random.randint(6, 9) if x==3 else np.random.randint(9, 12))))

# Parent Education: Form has high_school, bachelors, masters. Dataset has 0-4.
df['parentEdu'] = df['Medu'].apply(lambda x: 'masters' if x == 4 else ('bachelors' if x == 3 else 'high_school'))

# School Type: Form has private, government. Map 'school' (GP, MS)
df['schoolType'] = df['school'].apply(lambda x: 'government' if x == 'GP' else 'private')

# Board: CBSE, ICSE, state, ib, igcse (Randomly assign since it doesn't exist)
df['board'] = np.random.choice(['cbse', 'icse', 'state', 'ib', 'igcse'], size=len(df))

# *USER REQUEST*: Add test preparation feature (no option, 50%, 75%, completed)
# To make it realistic, higher preparation correlates slightly with higher G3 (final grade)
def assign_test_prep(g3_score):
    if g3_score >= 15:
        return np.random.choice(['completed', '75_percent', '50_percent'], p=[0.6, 0.3, 0.1])
    elif g3_score >= 10:
        return np.random.choice(['completed', '75_percent', '50_percent', 'none'], p=[0.2, 0.4, 0.3, 0.1])
    else:
        return np.random.choice(['75_percent', '50_percent', 'none'], p=[0.1, 0.4, 0.5])

df['testPrep'] = df['G3'].apply(assign_test_prep)

# Target variable: Scale G3 (0-20) to percentage (0-100)
df['target_score'] = df['G3'] * 5

# Select features for training
features = ['gender', 'studyHours', 'parentEdu', 'schoolType', 'board', 'testPrep']
X = df[features]
y = df['target_score']

# One-hot encoding
X_encoded = pd.get_dummies(X, drop_first=False)

# Train the model
X_train, X_test, y_train, y_test = train_test_split(X_encoded, y, test_size=0.2, random_state=42)

model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

score = model.score(X_test, y_test)
print(f"Model R^2 Score: {score:.2f}")

# Save the model and columns
joblib.dump(model, 'model/performance_model.pkl')
joblib.dump(list(X_encoded.columns), 'model/model_columns.pkl')

print("Model trained and saved to model/ directory.")
