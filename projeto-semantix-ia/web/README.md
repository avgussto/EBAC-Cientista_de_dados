## 🫀 Heartly Web Interface

Esta é a camada de interface do projeto Previsão de Doenças Cardíacas, desenvolvida para tornar o modelo de Machine Learning acessível a usuários finais através de uma aplicação web moderna e responsiva.

Clique [aqui](https://heartly-y6hj.onrender.com) para acessar o site ou no link https://heartly-y6hj.onrender.com

## Tecnologias Utilizadas
Backend: Flask (Python)

Frontend: HTML5, CSS3 e JavaScript 

Servidor de Produção: Gunicorn

Deploy: Render

## Aquitetura da Solução
A aplicação segue uma estrutura de SPA (Single Page Application):

Coleta de Dados: O formulário captura parâmetros clínicos do usuário.

Processamento Assíncrono: O JavaScript envia os dados via fetch (JSON) para evitar o recarregamento da página.

Inferência em Tempo Real: O servidor Flask carrega o pipeline de Stacking (joblib) e processa a predição.

Feedback Visual: A interface exibe o resultado instantaneamente com estilos dinâmicos (ex: cores diferentes para risco alto/baixo).

## Estrutura de Pastas
```
web/
├── static/              # Arquivos de estilo (CSS), imagens e lógica JS
├── templates/           # Arquivos HTML (index.html)
├── app.py               # Servidor Flask e carregamento da IA
├── requirements.txt     # Dependências para o ambiente de produção
├── modelo_final_previsao_cardiaca.joblib # Modelo para ser carregado
├── Procfile             # Arquivo essencial para o deploy
├── README.md            # Readme que você está lendo :)
```

## Como Executar Localmente
Se quiser rodar esta interface na sua máquina:

Certifique-se de ter o Python 3.11 instalado.

Instale as dependências:
```
pip install -r requirements.txt
```

Inicie o servidor:
```
python app.py
```

Acesse http://localhost:8000 no seu navegador ou rode com o LiveServer no VS Code

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