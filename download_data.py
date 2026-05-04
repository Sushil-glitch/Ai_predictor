import kagglehub
import os
import shutil

print("Downloading Student Performance dataset...")
perf_path = kagglehub.dataset_download("devansodariya/student-performance-data")
print("Performance dataset downloaded to:", perf_path)

print("Downloading Student Dropout dataset...")
# Note: the user linked kaggle.com/code/... which is a notebook, but it might have a dataset attached.
# Wait, "jeevabharathis/student-dropout-analysis-for-school-education" is a notebook URL.
# Notebook URLs don't work directly with kagglehub.dataset_download unless it's a dataset URL.
# Let's see what happens.
try:
    drop_path = kagglehub.dataset_download("jeevabharathis/student-dropout-analysis-for-school-education")
    print("Dropout dataset downloaded to:", drop_path)
except Exception as e:
    print(f"Error downloading dropout dataset: {e}")

