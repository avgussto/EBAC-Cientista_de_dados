# Dashboard de Indicadores Cardíacos (Power BI)

### Esta pasta contém o arquivo .pbix com a análise exploratória visual e os principais KPIs extraídos do conjunto de dados, além das bases necessárias para rodar o dashboard. Enquanto o modelo de IA foca em previsão, este dashboard foca em diagnóstico e compreensão do histórico dos pacientes.

## Objetivos da Análise
O dashboard foi desenhado para responder a perguntas críticas de negócio e saúde, tais como:

- Distribuição de Risco: Qual a porcentagem de pacientes analisados que apresentam alto risco cardíaco?

- Perfil Demográfico: Como a idade e o sexo influenciam na presença de doenças?

- Correlações Clínicas: Qual o impacto do colesterol e da pressão arterial na saúde do coração dos pacientes monitorados?

## Principais Visualizações
O relatório está dividido em seções estratégicas:

- Página de Informações Gerais: Gráficos e KPIs comparando variáveis da base indicando padrões e auxiliando na descoberta do perfil de paciente mais propício a doenças cardíacas

- Página de Previsões do Modelo de IA: Nessa página as previsões do modelo servem para segmentar clientes em grupos de risco (baixo, médio e alto), mostrar quais são as variáveis mais importantes para as previsões e a distribuição das probabilidades

- Página de Performance do Modelo de IA: Aqui é possível visualizar as métricas de avaliação do modelo nos testes (ROC_AUC, Recall, Acurácia), Hiperparêmetros de cada modelo do Stacking utilizado no modelo e uma matriz de confusão com as previsões

## Tecnologias e Ferramentas
- Ferramenta: Microsoft Power BI Desktop.

- Fonte de Dados: Todas as fontes estão na pasta "data", é necessário baixá-las para utilizar o dashboard

- Linguagem DAX: Utilizada para criação de medidas personalizadas e cálculos de taxas de variação.

## Como Visualizar
- Certifique-se de ter o Power BI Desktop instalado em sua máquina.

- Baixe o arquivo Heartly.pbix.

- Ao abrir, se os dados não carregarem automaticamente, aponte o caminho da fonte para o arquivo heart.csv e os outros csv's localizado na pasta /data.