# Heartly - Healthcare Analytics: Predição de Risco Cardíaco com Stacking de IA

#### Este projeto combina técnicas avançadas de Machine Learning (Stacking), Business Intelligence e um site com o modelo de IA em funcionamento para fornecer uma ferramenta de suporte à decisão clínica, identificando pacientes com alto risco de doenças cardiovasculares.

## Índice
- Contexto e Problema

- Estrutura do Projeto

- A Inteligência Artificial

- O Dashboard de Analytics

- Tecnologias Utilizadas


## Contexto e Problema
As doenças cardiovasculares são a principal causa de morte no mundo. O desafio enfrentado por instituições de saúde é constante, e com isso em mente percebi que a IA pode fazer mais do que gerar vídeos engraçados e dar respostas de pesquisas, a Inteligência artificial pode auxiliar no salvamento de vidas. Este projeto entrega:

- Precisão: Um modelo que identifica 86% dos casos críticos (Recall).

- Agilidade: Um dashboard que informa e aponta pontos importantes sobre os pacientes da base utilizada e o modelo treinado.

- Transparência: Explicação de quais fatores mais influenciam o risco e quão bem o modelo foi nas métricas de teste.

## Estrutura do Projeto
A organização deste repositório é modular para facilitar a manutenção e auditoria:

- /notebook: Contém todo o ciclo de vida da IA (Limpeza, EDA, Treinamento, Stacking, Hiperparâmetros, etc).

- /dashboard: Arquivo .pbix e documentação das KPIs de impacto de negócio.

- /web: Código-fonte da interface web para consultas em tempo real.

## A Inteligência Artificial
Utilizei uma arquitetura de Stacking Ensemble, combinando o poder de três modelos distintos para reduzir o viés e a variância:

- Modelos Base: XGBoost, CatBoost e Random Forest.

- Meta-Learner: Regressão Logística para o veredito final.

- Resultado: Alcancei um ROC AUC de 0.93, demonstrando alta capacidade de distinção entre classes.

## O Dashboard de Analytics
O painel no Power BI foi desenhado seguindo princípios de Storytelling de Dados:

- Página de Informações Gerais: Gráficos, KPIs e um filtro de faixa etária para auxiliar na busca por padrões dentro da base

- Página de Previsões: Segmentação por grupos de risco, histograma de distribuição e features mais importantes nas previsões do modelo.

- Página de Métricas: Matriz de Confusão, métricas e scores do modelo (f1-score, recall, roc-AUC e accuracy), hiperparâmetros otimizados finais e um filtro para observar os hiperparâmetros de cada modelo.

## Tecnologias Utilizadas no projeto
- Python 3.10+ (Pandas, Scikit-Learn, XGBoost, CatBoost, etc)

- Power BI (DAX, Power Query)

- Flask, HTML, CSS e JS para a página web

- Git/GitHub (Versionamento)

## Como Executar
- Clone este repositório.

- Instale as dependências: pip install -r requirements.txt.

- Para ver o modelo: navegue até /notebooks e execute o Jupyter.

- Para o Dashboard: abra o arquivo na pasta /dashboard com o Power BI Desktop.

- Para o site: clique [aqui](https://heartly-y6hj.onrender.com) ou copie e cole o link https://heartly-y6hj.onrender.com

# Contato
Sergio Augusto Soares – [LinkedIn](https://www.linkedin.com/in/sergio-augusto-soares/)

# Nota Importante
Este projeto é apenas para fins acadêmicos e não substitui um diagnóstico médico profissional. Sempre consulte um médico para diagnósticos reais.