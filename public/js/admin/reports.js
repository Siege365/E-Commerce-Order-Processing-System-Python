/**
 * Admin Reports
 * Chart.js visualization and date range filtering
 */

document.addEventListener('DOMContentLoaded', function() {
    // Date range toggle
    const periodSelect = document.getElementById('period');
    const dateFromGroup = document.getElementById('date-from-group');
    const dateToGroup = document.getElementById('date-to-group');

    if (periodSelect) {
        periodSelect.addEventListener('change', function() {
            if (this.value === 'custom') {
                dateFromGroup.style.display = 'block';
                dateToGroup.style.display = 'block';
            } else {
                dateFromGroup.style.display = 'none';
                dateToGroup.style.display = 'none';
            }
        });
    }

    // Revenue Chart
    const revenueCtx = document.getElementById('revenue-chart');
    if (revenueCtx && window.chartData) {
        new Chart(revenueCtx, {
            type: 'line',
            data: {
                labels: window.chartData.revenueLabels,
                datasets: [{
                    label: 'Daily Revenue',
                    data: window.chartData.revenueData,
                    borderColor: 'rgb(99, 102, 241)',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { 
                        display: true,
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 15
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return 'Revenue: $' + context.parsed.y.toLocaleString();
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    },
                    x: {
                        ticks: {
                            maxRotation: 45,
                            minRotation: 0
                        }
                    }
                }
            }
        });
    }

    // Category Chart
    const categoryCtx = document.getElementById('category-chart');
    if (categoryCtx && window.chartData) {
        new Chart(categoryCtx, {
            type: 'doughnut',
            data: {
                labels: window.chartData.categoryLabels,
                datasets: [{
                    label: 'Revenue by Category',
                    data: window.chartData.categoryData,
                    backgroundColor: [
                        'rgb(99, 102, 241)',
                        'rgb(34, 197, 94)',
                        'rgb(245, 158, 11)',
                        'rgb(239, 68, 68)',
                        'rgb(139, 92, 246)',
                        'rgb(59, 130, 246)'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            padding: 15,
                            generateLabels: function(chart) {
                                const data = chart.data;
                                const total = data.datasets[0].data.reduce((a, b) => a + b, 0);
                                return data.labels.map((label, i) => {
                                    const value = data.datasets[0].data[i];
                                    const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                                    return {
                                        text: `${label} (${percentage}%)`,
                                        fillStyle: data.datasets[0].backgroundColor[i],
                                        strokeStyle: data.datasets[0].backgroundColor[i],
                                        lineWidth: 0,
                                        pointStyle: 'circle',
                                        hidden: false,
                                        index: i
                                    };
                                });
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = total > 0 ? ((context.raw / total) * 100).toFixed(1) : 0;
                                return `${context.label}: $${context.raw.toLocaleString()} (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    }

    // Status Chart
    const statusCtx = document.getElementById('status-chart');
    if (statusCtx && window.chartData) {
        new Chart(statusCtx, {
            type: 'doughnut',
            data: {
                labels: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
                datasets: [{
                    label: 'Orders by Status',
                    data: window.chartData.statusData,
                    backgroundColor: [
                        'rgb(245, 158, 11)',
                        'rgb(59, 130, 246)',
                        'rgb(139, 92, 246)',
                        'rgb(34, 197, 94)',
                        'rgb(239, 68, 68)'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            padding: 15,
                            generateLabels: function(chart) {
                                const data = chart.data;
                                const total = data.datasets[0].data.reduce((a, b) => a + b, 0);
                                return data.labels.map((label, i) => {
                                    const value = data.datasets[0].data[i];
                                    const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                                    return {
                                        text: `${label}: ${value} (${percentage}%)`,
                                        fillStyle: data.datasets[0].backgroundColor[i],
                                        strokeStyle: data.datasets[0].backgroundColor[i],
                                        lineWidth: 0,
                                        pointStyle: 'circle',
                                        hidden: false,
                                        index: i
                                    };
                                });
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = total > 0 ? ((context.raw / total) * 100).toFixed(1) : 0;
                                return `${context.label}: ${context.raw} orders (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Export Modal functionality
    const exportModal = document.getElementById('export-modal');
    const exportCsvBtn = document.getElementById('export-csv-btn');
    const exportPdfBtn = document.getElementById('export-pdf-btn');
    const exportModalClose = document.getElementById('export-modal-close');
    const cancelExport = document.getElementById('cancel-export');
    const confirmExport = document.getElementById('confirm-export');
    
    let exportType = null;
    
    function openExportModal(type) {
        exportType = type;
        if (exportModal) {
            exportModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeExportModal() {
        if (exportModal) {
            exportModal.classList.remove('active');
            document.body.style.overflow = '';
            exportType = null;
        }
    }
    
    if (exportCsvBtn) {
        exportCsvBtn.addEventListener('click', () => openExportModal('csv'));
    }
    
    if (exportPdfBtn) {
        exportPdfBtn.addEventListener('click', () => openExportModal('pdf'));
    }
    
    if (exportModalClose) exportModalClose.addEventListener('click', closeExportModal);
    if (cancelExport) cancelExport.addEventListener('click', closeExportModal);
    
    if (exportModal) {
        exportModal.querySelector('.modal-backdrop').addEventListener('click', closeExportModal);
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && exportModal && exportModal.classList.contains('active')) {
            closeExportModal();
        }
    });
    
    if (confirmExport) {
        confirmExport.addEventListener('click', function() {
            const selectedReport = document.querySelector('input[name="export_report"]:checked');
            const reportType = selectedReport ? selectedReport.value : 'all';
            
            const baseUrl = window.exportBaseUrl || '?';
            const separator = baseUrl.includes('?') && baseUrl.length > 1 ? '&' : '';
            const url = baseUrl + separator + 'export=' + exportType + '&export_report=' + reportType;
            
            // Open in new tab for PDF, download for CSV
            if (exportType === 'pdf') {
                window.open(url, '_blank');
            } else {
                window.location.href = url;
            }
            
            closeExportModal();
            
            if (typeof showToast === 'function') {
                showToast('Report export started', 'success');
            }
        });
    }
});
