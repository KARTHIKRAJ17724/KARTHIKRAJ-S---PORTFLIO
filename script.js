document.addEventListener('DOMContentLoaded', function() {
    // Custom cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        setTimeout(function() {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });

    document.addEventListener('mousedown', function() {
        cursor.style.width = '8px';
        cursor.style.height = '8px';
        cursorFollower.style.width = '25px';
        cursorFollower.style.height = '25px';
    });

    document.addEventListener('mouseup', function() {
        cursor.style.width = '10px';
        cursor.style.height = '10px';
        cursorFollower.style.width = '30px';
        cursorFollower.style.height = '30px';
    });

    // Hover effect for links and buttons
    const links = document.querySelectorAll('a, button');

    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            cursor.style.width = '0';
            cursor.style.height = '0';
            cursorFollower.style.width = '50px';
            cursorFollower.style.height = '50px';
            cursorFollower.style.borderWidth = '3px';
            cursorFollower.style.backgroundColor = 'rgba(74, 99, 231, 0.1)';
        });

        link.addEventListener('mouseleave', function() {
            cursor.style.width = '10px';
            cursor.style.height = '10px';
            cursorFollower.style.width = '30px';
            cursorFollower.style.height = '30px';
            cursorFollower.style.borderWidth = '2px';
            cursorFollower.style.backgroundColor = 'transparent';
        });
    });

    // Mobile menu toggle
    const navToggler = document.querySelector('.nav-toggler');
    const navMenu = document.querySelector('.site-navbar ul');

    navToggler.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.site-navbar') && !e.target.closest('.nav-toggler')) {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        }
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    // Close mobile menu if open
                    if (navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                    }

                    window.scrollTo({
                        top: targetSection.offsetTop - 70, // Offset for fixed navbar
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Sticky navbar
    const navbar = document.querySelector('.navbar-area');
    const headerHeight = document.querySelector('.header-area').offsetHeight;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    });

    // Reveal animations for sections
    const revealElements = document.querySelectorAll('.section-title, .about-content, .education-grid, .skills-content, .projects-grid, .certifications-grid, .contact-content, .social-links');

    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('revealed');
            }
        });
    }

    // Add CSS classes for animations
    revealElements.forEach(element => {
        element.classList.add('reveal-element');
    });

    // Check on load
    revealOnScroll();

    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);

    // Form submission (prevent default for demo)
    const contactForm = document.querySelector('.contact-form form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData.entries());

            // Show success message (in a real app, you would send this data to a server)
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitBtn.disabled = true;

            // Reset form after delay
            setTimeout(() => {
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 3000);
        });
    }

    // Add CSS variables for animation
    document.documentElement.style.setProperty('--animate-delay', '0.3s');

    // Image download functionality
    function downloadImage(imgSrc, imgName) {
        // Create a temporary link element
        const link = document.createElement('a');

        // Set the download attribute with the provided name
        link.download = imgName || 'image.jpg';

        // Create a temporary canvas to handle the image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Create a new image object
        const img = new Image();
        img.crossOrigin = 'Anonymous'; // Handle CORS issues

        // Set up the image load event
        img.onload = function() {
            // Set canvas dimensions to match the image
            canvas.width = img.width;
            canvas.height = img.height;

            // Draw the image on the canvas
            ctx.drawImage(img, 0, 0);

            // Convert canvas to data URL
            try {
                // Try to get the data URL
                const dataURL = canvas.toDataURL('image/jpeg', 1.0);
                link.href = dataURL;

                // Trigger the download
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } catch (err) {
                console.error('Error downloading image:', err);
                alert('Unable to download this image. It might be protected by CORS policy.');
            }
        };

        // Set the image source to start loading
        img.src = imgSrc;

        // Handle errors
        img.onerror = function() {
            console.error('Error loading image for download');
            alert('Unable to download this image. Please try again later.');
        };
    }

    // Add event listeners to all download buttons
    document.querySelectorAll('.download-btn, .download-overlay-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const imgSrc = this.getAttribute('data-img-src');
            const imgName = this.getAttribute('data-img-name');
            if (imgSrc) {
                downloadImage(imgSrc, imgName);
            }
        });
    });
});
