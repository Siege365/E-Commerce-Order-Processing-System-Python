/**
 * Admin Dashboard
 * Chart.js integration for revenue and orders visualization
 */

document.addEventListener('DOMContentLoaded', function() {

    // Revenue Chart
    const revenueCtx = document.getElementById('revenue-chart');
    if (revenueCtx && window.chartData) {
        try {
            const revenueLabels = window.chartData.revenueLabels;
            const revenueData = window.chartData.revenueData;
            
            
        
            new Chart(revenueCtx, {
                type: 'line',
                data: {
                    labels: revenueLabels,
                    datasets: [{
                        label: 'Revenue ($)',
                        data: revenueData,
                        borderColor: 'rgb(99, 102, 241)',
                        backgroundColor: 'rgba(99, 102, 241, 0.1)',
                        fill: true,
                        tension: 0.4,
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { 
                            display: true,
                            position: 'top'
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return 'Revenue: $' + context.parsed.y.toFixed(2);
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return '$' + value.toFixed(0);
                                }
                            }
                        },
                        x: {
                            ticks: {
                                maxRotation: 45,
                                minRotation: 45
                            }
                        }
                    }
                }
            });
            
        } catch (error) {
            console.error('Error creating revenue chart:', error);
        }
    } else {
        // No data to initialize revenue chart
    }

    // Orders Chart
    const ordersCtx = document.getElementById('orders-chart');
    if (ordersCtx && window.chartData) {
        try {
            const ordersByStatus = window.chartData.ordersByStatus;
            
            
            
            new Chart(ordersCtx, {
            type: 'doughnut',
            data: {
                labels: ordersByStatus.labels,
                datasets: [{
                    data: ordersByStatus.data,
                    backgroundColor: [
                        'rgb(245, 158, 11)',  // Pending - Orange
                        'rgb(59, 130, 246)',   // Processing - Blue
                        'rgb(139, 92, 246)',   // Shipped - Purple
                        'rgb(34, 197, 94)',    // Delivered - Green
                        'rgb(239, 68, 68)'     // Cancelled - Red
                    ],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed || 0;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                                return label + ': ' + value + ' (' + percentage + '%)';
                            }
                        }
                    }
                }
            }
        });
            
        } catch (error) {
            console.error('Error creating orders chart:', error);
        }
    } else {
        // No data to initialize orders chart
    }
});
