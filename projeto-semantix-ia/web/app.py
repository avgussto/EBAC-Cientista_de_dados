from flask import Flask, request, jsonify, send_file, render_template
from flask_cors import CORS
import joblib
import pandas as pd
import numpy as np
import io
import csv
from sklearn.base import BaseEstimator, TransformerMixin
import pandas as pd
import os

class OrdinalMapper(BaseEstimator, TransformerMixin):
    def __init__(self, mapping):
        self.mapping = mapping
        
    def fit(self, X, y=None):
        return self
        
    def transform(self, X):
        X_out = X.copy()
        for col, map_dict in self.mapping.items():
            X_out[col] = X_out[col].map(map_dict)
            X_out[col] = X_out[col].fillna(-1) 
        X_out = X_out.astype(int)
        return X_out
    
app = Flask(__name__)
CORS(app)

import __main__
__main__.OrdinalMapper = OrdinalMapper

try:
    model = joblib.load('modelo_final_previsao_cardiaca.joblib')
    print("Model loaded successfully!")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

@app.route('/')
def home():
    return render_template('index.html')

EXPECTED_COLUMNS_ORDER = [
    'Age', 'Sex', 'ChestPainType', 'Cholesterol', 
    'FastingBS', 'MaxHR', 'ExerciseAngina', 
    'Oldpeak', 'ST_Slope'
]

CATEGORICAL_COLS = ['Sex', 'ChestPainType', 'ExerciseAngina', 'ST_Slope']

NUMERIC_COLS = ['Age', 'Cholesterol', 'FastingBS', 'MaxHR', 'Oldpeak']
# -------------------------------------------------------------

def preprocess_data(data):   
    if isinstance(data, dict):
        df = pd.DataFrame([data])
    elif isinstance(data, list):
        df = pd.DataFrame(data)
    else: 
        df = data.copy()
        
    def normalize_col_name(col):
        if pd.isna(col): return col
        col_str = str(col).lower().strip()
        replacements = {'á': 'a', 'à': 'a', 'ã': 'a', 'â': 'a', 'é': 'e', 'ê': 'e', 'í': 'i', 'ó': 'o', 'ô': 'o', 'õ': 'o', 'ú': 'u', 'ü': 'u', 'ç': 'c', '.': '', ',': '', '-': '', '_': '', ' ': ''}
        for old, new in replacements.items(): col_str = col_str.replace(old, new)
        return col_str
    
    column_mapping = {
        'age': 'Age', 'idade': 'Age', 'sex': 'Sex', 'sexo': 'Sex',
        'chestpaintype': 'ChestPainType', 'chestpain': 'ChestPainType', 'tipodordorpeitoral': 'ChestPainType',
        'cholesterol': 'Cholesterol', 'colesterol': 'Cholesterol',
        'maxhr': 'MaxHR', 'maxheartrate': 'MaxHR', 'freqcardiacamaxima': 'MaxHR',
        'exerciseangina': 'ExerciseAngina', 'anginadeesforco': 'ExerciseAngina',
        'stslope': 'ST_Slope', 'declivedest': 'ST_Slope',
        'oldpeak': 'Oldpeak', 'stdepression': 'Oldpeak', 'depressaodest': 'Oldpeak',
        'fastingbs': 'FastingBS', 'fastingglucose': 'FastingBS', 'glicoseemjejum': 'FastingBS'
    }
    
    rename_dict = {}
    for col in df.columns:
        normalized = normalize_col_name(col)
        if normalized in column_mapping:
            rename_dict[col] = column_mapping[normalized]
    
    df = df.rename(columns=rename_dict)
    
    
    for col in NUMERIC_COLS:
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors='coerce')
    
    for col in CATEGORICAL_COLS:
        if col in df.columns:
            df[col] = df[col].astype(str)
            
    current_cols = df.columns.tolist()
        
    for col in EXPECTED_COLUMNS_ORDER:
        if col not in current_cols:
            if col in CATEGORICAL_COLS:
                    df[col] = 'N/A' 
            elif col in NUMERIC_COLS:
                    df[col] = 0.0
            
        if col in NUMERIC_COLS:
                df[col] = pd.to_numeric(df[col], errors='coerce').fillna(0.0)
                df[col] = df[col].astype(str).str.replace(',', '.', regex=False) 
        elif col in CATEGORICAL_COLS:
                df[col] = df[col].astype(str)
                df[col] = df[col].replace('nan', 'N/A')

    df = df[EXPECTED_COLUMNS_ORDER]
        
    return df

@app.route('/predict', methods=['POST'])
def predict():
    """Endpoint for single patient prediction"""
    if model is None:
        return jsonify({'error': 'Model not loaded'}), 500
    
    try:
        data = request.json
        
        df = preprocess_data(data)
        
        prediction = model.predict(df)
        probability = model.predict_proba(df) if hasattr(model, 'predict_proba') else None
        
        result = {
            'prediction': int(prediction[0]),
            'risk_label': 'Situação de Risco' if prediction[0] == 1 else 'Sem risco',
            'probability': float(probability[0][prediction[0]]) if probability is not None else None
        }
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/predict-batch', methods=['POST'])
def predict_batch():
    """Endpoint for batch CSV prediction"""
    if model is None:
        return jsonify({'error': 'Model not loaded'}), 500
    
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['file']
        
        df = pd.read_csv(file)
        
        original_df = df.copy()
        
        processed_df = preprocess_data(df)
        
        predictions = model.predict(processed_df)
        probabilities = model.predict_proba(processed_df) if hasattr(model, 'predict_proba') else None
        
        original_df['Risco'] = predictions
        original_df['Risco_Label'] = original_df['Risco'].map({0: 'Sem risco', 1: 'Situação de Risco'})
        
        results = original_df.to_dict('records')
        
        return jsonify({
            'results': results,
            'count': len(results)
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None
    })

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)

