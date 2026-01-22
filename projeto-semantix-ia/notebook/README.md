## Projeto de Data Science: Modelagem Preditiva de Doenças Cardíacas

Este notebook contém todo o pipeline de Ciência de Dados, desde o tratamento inicial dos dados, análise exploratória (EDA) até a criação de um modelo de Ensemble (Stacking) para detecção precoce de riscos cardíacos.

## Pipeline de Desenvolvimento
Etapas executadas:

- Carregamento dos dados e tratamento inicial: Observando a existência de nulos, valores inconsistentes, distribuição dos dados e tratamento de possíveis outliers

- Análise Exploratória (EDA): Identificação de padrões comparando variáveis e a correlação entre as elas na base 

- Pré-processamento: Seleção de features, normalização dos dados, e criação do pipeline para treinamento

- Treinamento e Avaliação: Treinamento do modelo de Stacking e avaliação com testes de validação cruzada

## A Arquitetura do Modelo
Utilização de Stacking com modelos robustos para formar o melhor modelo possível para a base

- Base Learners: XGBoost, CatBoost e Random Forest

- Meta-Learner: Logistic Regression (Para combinar as previsões e evitar overfitting).

## Resultados e Métricas

- Acurácia: 88%

- F1-Score: 0,90 para a classe 1 (Pacientes doentes)

- ROC-AUC: 0,93