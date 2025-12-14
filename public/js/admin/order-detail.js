/**
 * Admin Order Detail
 * Status update and print functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Modal elements
    const modal = document.getElementById('status-modal');
    const modalClose = document.getElementById('modal-close');
    const cancelUpdate = document.getElementById('cancel-update');
    const confirmUpdate = document.getElementById('confirm-update');
    const modalNewStatus = document.getElementById('modal-new-status');
    
    // Update status elements
    const updateBtn = document.getElementById('update-status-btn');
    const statusSelect = document.getElementById('update-status');
    
    let pendingStatus = null;
    
    function openModal() {
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeModal() {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            pendingStatus = null;
        }
    }
    
    // Close modal handlers
    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (cancelUpdate) cancelUpdate.addEventListener('click', closeModal);
    if (modal) {
        modal.querySelector('.modal-backdrop').addEventListener('click', closeModal);
    }
    
    // ESC key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });

    if (updateBtn) {
        updateBtn.addEventListener('click', function() {
            const newStatus = statusSelect.value;
            
            // Check if status is same as current
            if (newStatus === window.currentStatus) {
                if (typeof showToast === 'function') {
                    showToast('Status is already set to ' + newStatus, 'info');
                }
                return;
            }
            
            // Show confirmation modal
            pendingStatus = newStatus;
            
            // Update modal display
            if (modalNewStatus) {
                modalNewStatus.textContent = newStatus.charAt(0).toUpperCase() + newStatus.slice(1);
                modalNewStatus.className = 'status ' + newStatus;
            }
            
            openModal();
        });
    }
    
    // Confirm update handler
    if (confirmUpdate) {
        confirmUpdate.addEventListener('click', function() {
            if (!pendingStatus) return;
            
            const btn = this;
            btn.disabled = true;
            btn.innerHTML = '<span class="spinner-small"></span> Updating...';
            
            fetch(window.orderUrls.updateStatus, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': window.csrfToken
                },
                body: JSON.stringify({
                    order_id: window.orderId,
                    status: pendingStatus
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    if (typeof showToast === 'function') {
                        showToast('Order status updated successfully', 'success');
                    }
                    // Reload after brief delay to show toast
                    setTimeout(() => location.reload(), 500);
                } else {
                    if (typeof showToast === 'function') {
                        showToast(data.message || 'Failed to update status', 'error');
                    } else {
                        alert(data.message || 'Failed to update status');
                    }
                    btn.disabled = false;
                    btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Confirm Update';
                }
            })
            .catch(() => {
                if (typeof showToast === 'function') {
                    showToast('An error occurred', 'error');
                } else {
                    alert('An error occurred');
                }
                btn.disabled = false;
                btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Confirm Update';
                closeModal();
            });
        });
    }

    // Print invoice
    const printBtn = document.getElementById('print-order');
    if (printBtn) {
        printBtn.addEventListener('click', function() {
            window.print();
        });
    }
});
