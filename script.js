document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Responsive Connectors ---
    const updateConnectors = () => {
        const isMobile = window.innerWidth <= 900;
        const connectors = document.querySelectorAll('.line-svg');
        connectors.forEach(svg => {
            const bgPath = svg.querySelector('.connection-path-bg');
            const flowPath = svg.querySelector('.connection-path-flow');
            const d = isMobile ? "M50,0 L50,100" : "M0,50 L100,50";
            bgPath.setAttribute('d', d);
            flowPath.setAttribute('d', d);
        });
    };
    updateConnectors();
    window.addEventListener('resize', updateConnectors);


    // --- 2. Intersection Observers ---

    // Card Observer (Fires both card entry and starting internal animations via 'visible' class)
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // The animation logic is now primarily handled by the presence of the 'visible' class in CSS.
                // This ensures perfect JS-free sync for the sewing machine and other smooth transitions.
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.step-card').forEach(card => cardObserver.observe(card));

    // Connector flow trigger
    const connectorObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.connector-line').forEach(conn => connectorObserver.observe(conn));
});
