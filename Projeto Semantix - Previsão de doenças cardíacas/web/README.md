# Heartly - Sistema de Previsão de Doenças Cardíacas

Sistema web para previsão de risco de doenças cardíacas usando inteligência artificial.

## Instalação

### 1. Instalar dependências Python

```bash
pip install -r requirements.txt
```

### 2. Iniciar o servidor Flask

```bash
python app.py
```

O servidor Flask estará rodando em `http://localhost:5000`

### 3. Abrir a aplicação web

Abra o arquivo `index.html` no seu navegador ou use um servidor local:

```bash
# Usando Python
python -m http.server 8000

# Ou usando Node.js
npx http-server
```

Depois acesse `http://localhost:8000`

## Funcionalidades

### Análise Individual
- Preencha o formulário com os dados do paciente
- Clique em "Analisar Risco"
- O sistema retornará: **Sem risco (0)** ou **Situação de Risco (1)**

### Processamento em Lote
- Faça upload de um arquivo CSV com dados dos pacientes
- O sistema processará todos os pacientes
- Os resultados serão exibidos em uma tabela
- Você pode baixar os resultados como CSV

## Formato do CSV

O arquivo CSV deve conter as seguintes colunas:

- **Idade** (número)
- **Sexo** (M/F)
- **Tipo de dor peitoral** (ATA/NAP/ASY/TA)
- **Declive de ST** (Up/Flat/Down)
- **Glicose em Jejum** (Y/N)
- **Freq. cardíaca máxima** (número)
- **Colesterol** (número)
- **Angina de esforço** (Y/N)
- **Depressão de ST** (número)

## Estrutura do Projeto

- `index.html` - Interface web
- `styles.css` - Estilos CSS
- `script.js` - Lógica JavaScript
- `app.py` - Servidor Flask com API
- `modelo_final_previsao_cardiaca.joblib` - Modelo de IA treinado
- `requirements.txt` - Dependências Python

## API Endpoints

### POST /predict
Predição para um único paciente.

**Request:**
```json
{
  "age": 45,
  "sex": "M",
  "chestPain": "ATA",
  "cholesterol": 200,
  "maxHeartRate": 150,
  "exerciseAngina": "N",
  "stSlope": "Up",
  "stDepression": 0.5,
  "fastingGlucose": "N"
}
```

**Response:**
```json
{
  "prediction": 0,
  "risk_label": "Sem risco",
  "probability": 0.85
}
```

### POST /predict-batch
Predição em lote via arquivo CSV.

**Request:** FormData com arquivo CSV

**Response:**
```json
{
  "results": [
    {
      "Idade": 45,
      "Sexo": "M",
      "Risco": 0,
      "Risco_Label": "Sem risco"
    }
  ],
  "count": 1
}
```

### GET /health
Verifica se o servidor e o modelo estão funcionando.

## Nota Importante

⚠️ **Este sistema é apenas para fins acadêmicos e não substitui um diagnóstico médico profissional. Sempre consulte um médico para diagnósticos reais.**