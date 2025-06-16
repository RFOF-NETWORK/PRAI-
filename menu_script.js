document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const praiDropdownButton = document.querySelector('.praibox-dropdown-button');
    const praiDropdownContent = document.querySelector('.praibox-dropdown-content');

    // Toggle Global Navigation (Hamburger Menu) for mobile
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            // Close PRAI dropdown if global is opened/closed
            if (praiDropdownContent.style.display === 'block') {
                praiDropdownContent.style.display = 'none';
            }
        });
    }

    // Toggle PRAI-specific Dropdown for click (mobile) and hover (desktop)
    if (praiDropdownButton && praiDropdownContent) {
        // For mobile, make it clickable
        praiDropdownButton.addEventListener('click', function() {
            // Only toggle if screen is small (mobile breakpoint from CSS)
            if (window.innerWidth <= 768) {
                praiDropdownContent.style.display = praiDropdownContent.style.display === 'block' ? 'none' : 'block';
                // Ensure global menu is closed if PRAI menu is opened
                if (navLinks.classList.contains('active') && praiDropdownContent.style.display === 'block') {
                     // Do nothing, it's already integrated as a sub-menu
                }
            }
        });

        // For desktop, handle hover for global menu container
        const globalDropdown = document.querySelector('.global-dropdown');
        if (globalDropdown) {
             globalDropdown.addEventListener('mouseenter', function() {
                if (window.innerWidth > 768) {
                    navLinks.style.display = 'block';
                }
            });
            globalDropdown.addEventListener('mouseleave', function() {
                if (window.innerWidth > 768) {
                    navLinks.style.display = 'none';
                }
            });
        }
    }


    // Close menu when a global link is clicked (especially for mobile)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // Close PRAI menu when an internal link is clicked (especially for mobile)
    praiDropdownContent.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) { // Only close on click if it's a mobile view
                praiDropdownContent.style.display = 'none';
            }
            // If global menu is also open, close it too for clean navigation
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // Close menus if clicked outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.main-header')) { // If click is outside header
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
            if (praiDropdownContent.style.display === 'block' && window.innerWidth > 768) {
                praiDropdownContent.style.display = 'none';
            }
        }
    });

    // Ensure correct display on resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active'); // Hide mobile menu on desktop
            hamburger.classList.remove('active'); // Reset hamburger icon
            praiDropdownContent.style.display = ''; // Reset PRAI dropdown display for desktop hover
            navLinks.style.display = ''; // Reset global dropdown display for desktop hover
        } else {
             navLinks.style.display = ''; // Allow hamburger to control display on mobile
             praiDropdownContent.style.display = 'none'; // Ensure PRAI dropdown is closed initially on mobile
        }
    });
});
