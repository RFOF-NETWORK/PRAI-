// MANIFEST: Nur Menü-Logik für das globale Menü.
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navList = document.getElementById('navLinks');

    if (hamburger && navList) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation(); 
            navList.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Schließt das mobile Menü bei Klick außerhalb
    document.addEventListener('click', (event) => {
        if (navList.classList.contains('active')) {
            if (!navList.contains(event.target) && !hamburger.contains(event.target)) {
                navList.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });

    // Stellt sicher, dass das seiteninterne Menü bei Klick auf einen Ankerlink schließt (falls das Hauptmenü offen ist)
    document.querySelectorAll('.page-dropdown-content a').forEach(anchor => {
        anchor.addEventListener('click', () => {
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
});
