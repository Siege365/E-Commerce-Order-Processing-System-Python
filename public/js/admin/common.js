/**
 * Common Utilities
 * Shared functions for kebab menus across admin pages
 */

/**
 * Position dropdown with fixed positioning
 */
function positionDropdown(button, dropdown) {
    const buttonRect = button.getBoundingClientRect();
    const dropdownHeight = dropdown.offsetHeight || 200; // Estimate if not rendered yet
    const viewportHeight = window.innerHeight;
    
    // Calculate if there's space below
    const spaceBelow = viewportHeight - buttonRect.bottom;
    const spaceAbove = buttonRect.top;
    
    if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
        // Show above if not enough space below
        dropdown.style.top = `${buttonRect.top - dropdownHeight - 4}px`;
    } else {
        // Show below
        dropdown.style.top = `${buttonRect.bottom + 4}px`;
    }
    
    // Position horizontally - align right edge with button
    dropdown.style.left = `${buttonRect.right - dropdown.offsetWidth}px`;
}

/**
 * Initialize kebab menu dropdowns
 */
function initKebabMenus() {
    // Kebab menu functionality
    document.querySelectorAll('.kebab-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const menu = this.parentElement;
            const dropdown = menu.querySelector('.kebab-dropdown');
            
            // Close all other open menus
            document.querySelectorAll('.kebab-menu.open').forEach(otherMenu => {
                if (otherMenu !== menu) {
                    otherMenu.classList.remove('open');
                }
            });
            
            // Toggle current menu
            const isOpening = !menu.classList.contains('open');
            menu.classList.toggle('open');
            
            // Position dropdown if opening
            if (isOpening && dropdown) {
                // Small delay to ensure dropdown is rendered
                setTimeout(() => positionDropdown(this, dropdown), 10);
            }
        });
    });

    // Close kebab menus when clicking outside
    document.addEventListener('click', function() {
        document.querySelectorAll('.kebab-menu.open').forEach(menu => {
            menu.classList.remove('open');
        });
    });

    // Prevent dropdown clicks from closing the menu
    document.querySelectorAll('.kebab-dropdown').forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
    
    // Reposition dropdowns on scroll or resize
    window.addEventListener('scroll', function() {
        document.querySelectorAll('.kebab-menu.open').forEach(menu => {
            const btn = menu.querySelector('.kebab-btn');
            const dropdown = menu.querySelector('.kebab-dropdown');
            if (btn && dropdown) {
                positionDropdown(btn, dropdown);
            }
        });
    }, true);
    
    window.addEventListener('resize', function() {
        document.querySelectorAll('.kebab-menu.open').forEach(menu => {
            const btn = menu.querySelector('.kebab-btn');
            const dropdown = menu.querySelector('.kebab-dropdown');
            if (btn && dropdown) {
                positionDropdown(btn, dropdown);
            }
        });
    });
}
