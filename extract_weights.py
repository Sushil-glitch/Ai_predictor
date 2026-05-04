import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
import joblib

# Load dataset
data_path = r"C:\Users\vasan\.cache\kagglehub\datasets\devansodariya\student-performance-data\versions\1\student_data.csv"
df = pd.read_csv(data_path)

# Data prep
df['gender'] = df['sex'].map({'M': 'male', 'F': 'female'})
np.random.seed(42)
df['studyHours'] = df['studytime'].apply(lambda x: np.random.randint(0, 3) if x==1 else (np.random.randint(3, 6) if x==2 else (np.random.randint(6, 9) if x==3 else np.random.randint(9, 12))))
df['parentEdu'] = df['Medu'].apply(lambda x: 'masters' if x == 4 else ('bachelors' if x == 3 else 'high_school'))
df['schoolType'] = df['school'].apply(lambda x: 'government' if x == 'GP' else 'private')
df['board'] = np.random.choice(['cbse', 'icse', 'state', 'ib', 'igcse'], size=len(df))

def assign_test_prep(g3_score):
    if g3_score >= 15: return np.random.choice(['completed', '75_percent', '50_percent'], p=[0.6, 0.3, 0.1])
    elif g3_score >= 10: return np.random.choice(['completed', '75_percent', '50_percent', 'none'], p=[0.2, 0.4, 0.3, 0.1])
    else: return np.random.choice(['75_percent', '50_percent', 'none'], p=[0.1, 0.4, 0.5])

df['testPrep'] = df['G3'].apply(assign_test_prep)
df['target_score'] = df['G3'] * 5

features = ['gender', 'studyHours', 'parentEdu', 'schoolType', 'board', 'testPrep']
X = df[features]
y = df['target_score']

# Get dummies
X_encoded = pd.get_dummies(X, drop_first=False)

# Train Linear Regression to easily export to JS
model = LinearRegression()
model.fit(X_encoded, y)

print("Intercept:", model.intercept_)
print("Coefficients:")
for col, coef in zip(X_encoded.columns, model.coef_):
    print(f"'{col}': {coef:.4f},")
