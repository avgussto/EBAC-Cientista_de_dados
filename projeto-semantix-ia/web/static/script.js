// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Patient Form Submission
document.addEventListener('DOMContentLoaded', function() {
    const patientForm = document.getElementById('patient-form');
    const resultsContent = document.getElementById('results-content');
    
    if (patientForm) {
        patientForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
           // --- VERSÃO CORRIGIDA NO JS ---
        const formData = {
            // VARIÁVEIS NUMÉRICAS/BINÁRIAS
            'Age': document.getElementById('age').value, // Mapeado de 'age' (HTML ID) para 'Age' (Coluna do Modelo)
            'Cholesterol': document.getElementById('cholesterol').value,
            'FastingBS': document.getElementById('fasting-glucose').value, // Modelo usa FastingBS
            'MaxHR': document.getElementById('max-heart-rate').value, // Modelo usa MaxHR
            'Oldpeak': document.getElementById('st-depression').value, // Modelo usa Oldpeak
            // VARIÁVEIS CATEGÓRICAS (Strings originais)
            'Sex': document.getElementById('sex').value,
            'ChestPainType': document.getElementById('chest-pain').value, // Modelo usa ChestPainType
            'ExerciseAngina': document.getElementById('exercise-angina').value,
            'ST_Slope': document.getElementById('st-slope').value // Modelo usa ST_Slope
        };
            
            // Call Flask API for prediction
            predictPatient(formData, resultsContent);
        });
    }
    
    // CSV Upload functionality
    const uploadArea = document.getElementById('upload-area');
    const csvFileInput = document.getElementById('csv-file');
    const processBtn = document.getElementById('process-btn');
    const batchResultsContent = document.getElementById('batch-results-content');
    const downloadExampleBtn = document.getElementById('download-example');
    
    if (uploadArea && csvFileInput) {
        uploadArea.addEventListener('click', function() {
            csvFileInput.click();
        });
        
        csvFileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                uploadArea.querySelector('p').textContent = `Arquivo selecionado: ${file.name}`;
            }
        });
        
        // Drag and drop
        uploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            uploadArea.style.background = 'rgba(255, 255, 255, 0.2)';
        });
        
        uploadArea.addEventListener('dragleave', function(e) {
            e.preventDefault();
            uploadArea.style.background = 'transparent';
        });
        
        uploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            uploadArea.style.background = 'transparent';
            const file = e.dataTransfer.files[0];
            if (file && file.name.endsWith('.csv')) {
                csvFileInput.files = e.dataTransfer.files;
                uploadArea.querySelector('p').textContent = `Arquivo selecionado: ${file.name}`;
            }
        });
    }
    
    if (processBtn && batchResultsContent) {
        processBtn.addEventListener('click', function() {
            const file = csvFileInput.files[0];
            if (!file) {
                alert('Por favor, selecione um arquivo CSV primeiro.');
                return;
            }
            
            // Call Flask API for batch processing
            processBatchCSV(file, batchResultsContent);
        });
    }
    
    if (downloadExampleBtn) {
        downloadExampleBtn.addEventListener('click', function() {
            downloadExampleCSV();
        });
    }
    
    // Setup download results CSV button
    const downloadResultsBtn = document.getElementById('download-results-csv');
    if (downloadResultsBtn) {
        downloadResultsBtn.addEventListener('click', function() {
            if (window.batchResults) {
                downloadResultsCSV(window.batchResults);
            } else {
                alert('Nenhum resultado disponível para download');
            }
        });
    }
});

// Predict single patient using Flask API
function predictPatient(formData, resultsContainer) {
    // Show loading state
    resultsContainer.innerHTML = `
        <div class="analysis-icon">
            <img src="/static/imagens/analysis_icon.png" alt="Analysis icon" />
        </div>
        <p class="results-placeholder">Analisando dados...</p>
    `;
    
    // Call Flask API
    fetch('/predict', {  
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            throw new Error(data.error);
        }
        
        const riskLabel = data.risk_label;
        const riskValue = data.prediction;
        const riskColor = riskValue === 1 ? '#f87171' : '#4ade80';
        const probability = data.probability ? (data.probability * 100).toFixed(1) : 'N/A';
        
        resultsContainer.innerHTML = `
            <div style="text-align: center; color: white;">
                <div style="background: rgba(255, 255, 255, 0.1); border-radius: 10px; padding: 30px; margin-bottom: 20px;">
                    <p style="font-size: 18px; margin-bottom: 15px;">Nível de Risco:</p>
                    <p style="font-size: 48px; font-weight: 500; color: ${riskColor}; margin-bottom: 15px;">${riskLabel}</p>
                    ${probability !== 'N/A' ? `<p style="font-size: 16px; opacity: 0.9;">Confiança: ${probability}%</p>` : ''}
                </div>
            </div>
        `;
    })
    .catch(error => {
        console.error('Error:', error);
        resultsContainer.innerHTML = `
            <div style="text-align: center; color: white;">
                <p style="color: #f87171; margin-bottom: 10px;">Erro ao processar análise</p>
                <p style="font-size: 14px; opacity: 0.8;">${error.message}</p>
                <p style="font-size: 12px; opacity: 0.6; margin-top: 10px;">Certifique-se de que o servidor Flask está rodando.</p>
            </div>
        `;
    });
}

// Process batch CSV using Flask API
function processBatchCSV(file, resultsContainer) {
    // Show loading state
    resultsContainer.innerHTML = `
        <div class="analysis-icon">
            <img src="/static/imagens/analysis_icon.png" alt="Analysis icon" />
        </div>
        <p class="results-placeholder">Processando arquivo...</p>
    `;
    
    // Hide table initially
    const tableContainer = document.getElementById('results-table-container');
    if (tableContainer) {
        tableContainer.style.display = 'none';
    }
    
    // Prepare form data
    const formData = new FormData();
    formData.append('file', file);
    
    // Call Flask API
    fetch('/predict', {  
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            throw new Error(data.error);
        }
        
        // Store results globally for CSV download
        window.batchResults = data.results;
        
        // Display results table
        displayResultsTable(data.results, resultsContainer);
    })
    .catch(error => {
        console.error('Error:', error);
        resultsContainer.innerHTML = `
            <div style="text-align: center; color: white;">
                <p style="color: #f87171; margin-bottom: 10px;">Erro ao processar arquivo</p>
                <p style="font-size: 14px; opacity: 0.8;">${error.message}</p>
                <p style="font-size: 12px; opacity: 0.6; margin-top: 10px;">Certifique-se de que o servidor Flask está rodando.</p>
            </div>
        `;
    });
}

// Display results table
function displayResultsTable(results, resultsContainer) {
    // Hide placeholder content
    resultsContainer.style.display = 'none';
    
    // Show table container
    const tableContainer = document.getElementById('results-table-container');
    const tableBody = document.getElementById('results-table-body');
    
    if (!tableContainer || !tableBody) {
        console.error('Table elements not found');
        return;
    }
    
    // Clear existing rows
    tableBody.innerHTML = '';
    
    // Add rows
    results.forEach((row, index) => {
        const tr = document.createElement('tr');
        
        // Map data to table columns
        const age = row.Idade || row.Age || row.idade || row.age || '';
        const sex = row.Sexo || row.Sex || row.sex || '';
        const chestPain = row['Tipo de dor peitoral'] || row.ChestPainType || row.chestPain || row['Tipo de dor peitoral'] || '';
        const cholesterol = row.Colesterol || row.Cholesterol || row.cholesterol || '';
        const maxHR = row['Freq. cardíaca máxima'] || row.MaxHR || row.maxHeartRate || row['Freq. cardíaca máxima'] || '';
        const exerciseAngina = row['Angina de esforço'] || row.ExerciseAngina || row.exerciseAngina || row['Angina de esforço'] || '';
        const risk = row.Risco !== undefined ? row.Risco : (row.Risco_Label === 'Situação de Risco' ? 1 : 0);
        const riskLabel = row.Risco_Label || (risk === 1 ? 'Situação de Risco' : 'Sem risco');
        
        tr.innerHTML = `
            <td>${age}</td>
            <td>${sex}</td>
            <td>${chestPain}</td>
            <td>${cholesterol}</td>
            <td>${maxHR}</td>
            <td>${exerciseAngina}</td>
            <td class="risk-cell risk-${risk}">${riskLabel}</td>
        `;
        
        tableBody.appendChild(tr);
    });
    
    // Show table
    tableContainer.style.display = 'flex';
    
    // Setup download button
    const downloadBtn = document.getElementById('download-results-csv');
    if (downloadBtn) {
        downloadBtn.onclick = () => downloadResultsCSV(results);
    }
}

// Download results as CSV
function downloadResultsCSV(results) {
    if (!results || results.length === 0) {
        alert('Nenhum resultado para baixar');
        return;
    }
    
    // Get all unique keys from results
    const allKeys = new Set();
    results.forEach(row => {
        Object.keys(row).forEach(key => allKeys.add(key));
    });
    
    const headers = Array.from(allKeys);
    
    // Create CSV content
    let csvContent = headers.join(',') + '\n';
    
    results.forEach(row => {
        const values = headers.map(header => {
            const value = row[header];
            // Handle values with commas or quotes
            if (value === null || value === undefined) return '';
            const stringValue = String(value);
            if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
                return `"${stringValue.replace(/"/g, '""')}"`;
            }
            return stringValue;
        });
        csvContent += values.join(',') + '\n';
    });
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `resultados_analise_${new Date().getTime()}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Download Example CSV
function downloadExampleCSV() {
    const csvContent = `Idade,Sexo,Tipo de dor peitoral,Declive de ST,Glicose em Jejum,Freq. cardíaca máxima,Colesterol,Angina de esforço,Depressão de ST
45,M,ATA,Up,N,150,200,N,0.5
55,F,NAP,Flat,Y,140,220,Y,1.0
60,M,ASY,Down,N,120,180,N,2.0
35,F,TA,Up,N,160,190,N,0.0
50,M,ATA,Flat,Y,130,210,Y,1.5`;
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'exemplo_pacientes.csv');
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}