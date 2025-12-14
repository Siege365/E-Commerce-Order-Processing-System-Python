/**
 * Admin Customers
 * Customer deletion with kebab menu and modal
 */

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('delete-modal');
    const modalClose = document.getElementById('modal-close');
    const cancelDelete = document.getElementById('cancel-delete');
    const confirmDelete = document.getElementById('confirm-delete');
    const customerNameEl = document.getElementById('delete-customer-name');
    const customerEmailEl = document.getElementById('delete-customer-email');
    let customerToDelete = null;

    // Kebab menu functionality
    document.querySelectorAll('.kebab-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const menu = this.closest('.kebab-menu');
            const wasOpen = menu.classList.contains('open');
            
            // Close all other menus
            document.querySelectorAll('.kebab-menu.open').forEach(m => {
                if (m !== menu) m.classList.remove('open');
            });
            
            menu.classList.toggle('open', !wasOpen);
        });
    });

    // Close kebab menus when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.kebab-menu')) {
            document.querySelectorAll('.kebab-menu.open').forEach(menu => {
                menu.classList.remove('open');
            });
        }
    });

    // Open delete modal
    document.querySelectorAll('.delete-customer-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            customerToDelete = this.dataset.customerId;
            customerNameEl.textContent = this.dataset.customerName;
            customerEmailEl.textContent = this.dataset.customerEmail;
            // Close kebab menu
            document.querySelectorAll('.kebab-menu.open').forEach(menu => {
                menu.classList.remove('open');
            });
            modal.classList.add('show');
        });
    });

    // Close modal
    function closeModal() {
        modal.classList.remove('show');
        customerToDelete = null;
    }

    modalClose.addEventListener('click', closeModal);
    cancelDelete.addEventListener('click', closeModal);
    document.querySelector('#delete-modal .modal-backdrop').addEventListener('click', closeModal);

    // Confirm delete
    confirmDelete.addEventListener('click', function() {
        if (!customerToDelete) return;

        this.disabled = true;
        this.innerHTML = '<span class="spinner-small"></span> Deleting...';

        // Submit delete form
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = `/customers/${customerToDelete}/delete/`;
        
        const csrfInput = document.createElement('input');
        csrfInput.type = 'hidden';
        csrfInput.name = 'csrfmiddlewaretoken';
        csrfInput.value = window.csrfToken;
        form.appendChild(csrfInput);
        
        document.body.appendChild(form);
        form.submit();
    });
});
