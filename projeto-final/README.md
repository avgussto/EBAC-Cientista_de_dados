# Modelo Preditivo para Prever a Equipe Vencedora em League of Legends

## Sobre o Projeto

Este projeto tem como objetivo desenvolver um modelo de Machine Learning capaz de prever a equipe vencedora (blue team ou red team) com base exclusivamente em estatísticas dos **10 primeiros minutos** de partidas de League of Legends.

A proposta central é responder à seguinte pergunta:

> É possível prever o vencedor de uma partida analisando apenas os dados iniciais do jogo?

---

## Sobre o Dataset

- 9.879 partidas
- Dados referentes aos **10 primeiros minutos**
- Apenas estatísticas agregadas
- Sem informações sobre draft de campeões
- Sem dados individuais dos jogadores (KDA, Elo, Win%, etc)

### Principais variáveis:
- Ouro total e diferença de ouro
- Experiência total e diferença de experiência
- Abates, mortes e assistências
- Farm (CS) total e por minuto
- Objetivos (dragões, monstros épicos)
---

## Etapas do Projeto

### Carregamento e tratamento dos dados
- Tratamento de outliers
- Remoção de multicolinearidade por meio de colunas redundantes


### Análise Exploratória (EDA)
- Seleção de features mais influentes na base
- Teste de hipóteses
- Relações entre variáveis
- Análise de correlação

### Feature Engineering

Foram criadas novas variáveis com foco em vantagem estrutural:

- Diferenças de ouro e experiência
- Razões (gold/xp ratio, cs_ratio)
- Combat score
- Diferença de objetivos

O objetivo foi transformar estatísticas brutas em métricas mais informativas.

### Treinamento do Modelo

Modelo utilizado:

**XGBoost (Gradient Boosting)**

Técnicas aplicadas:

- Randomized Search
- Validação cruzada
- Ajuste de hiperparâmetros
- Avaliação com ROC-AUC, Accuracy, F1-score, Recall e Precision

---

## Resultados

Modelo final:

- Accuracy: 0.73
- F1-score: 0.73
- ROC-AUC: 0.81

O modelo demonstrou boa capacidade de ranqueamento entre vitórias e derrotas, considerando que utiliza apenas dados dos 10 primeiros minutos.

---

## Principais Insights

- Vantagem de ouro e experiência são os principais indicadores de vitória.
- Ritmo de crescimento (ouro/min, CS/min) é mais relevante que eventos isolados.
- Objetivos reforçam vantagem já construída.
- Mesmo com vantagem inicial, o resultado não é determinístico.

---

## Limitações

O dataset contém apenas estatísticas agregadas e não inclui:

- Draft de campeões
- Sinergias e counters
- Diferenças individuais de habilidade
- Fatores humanos (AFK, trolls, smurfs)
- Decisões estratégicas em tempo real

League of Legends é um jogo dinâmico e parcialmente imprevisível. Parte do resultado está associada a fatores não capturados nos dados, indicando um possível teto de explicabilidade da base.

---

## Conclusão

O projeto demonstra que é possível prever o vencedor de uma partida com boa precisão utilizando apenas os 10 primeiros minutos de jogo. No entanto, o desempenho do modelo sugere que existe um limite estrutural na capacidade preditiva quando não se consideram fatores estratégicos e humanos.

A análise reforça que vantagem acumulada e crescimento consistente são os principais determinantes estatísticos da vitória, mas o jogo permanece influenciado por variáveis imprevisíveis.

---

## Tecnologias Utilizadas

- Python
- Pandas
- NumPy
- Seaborn / Matplotlib
- Scikit-learn
- XGBoost
 