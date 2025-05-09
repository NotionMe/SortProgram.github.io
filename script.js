document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.getElementById('hero');
    const featureImages = document.querySelectorAll('.feature-image');
    // Select ALL content sections that need to be animated
    const contentSections = document.querySelectorAll('.content-section');

    const observerOptions = {
        root: null, // relative to document viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of item is visible
    };

    // Observer for hero (if specific hero animations are needed)
    if (heroSection) {
        const heroObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // Placeholder for hero-specific animations
            });
        }, observerOptions);
        heroObserver.observe(heroSection);
    }

    // Observer for feature images (from original request)
    if (featureImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { ...observerOptions, threshold: 0.2 });

        featureImages.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Observer for all general content sections
    if (contentSections.length > 0) {
        const sectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { ...observerOptions, threshold: 0.1 }); // Trigger when 10% of the section is visible

        contentSections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link highlighting
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split("/").pop();
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
});
