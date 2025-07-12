// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Navigation smooth scrolling
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.btn-add-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const perfumeCard = this.closest('.perfume-card');
            const perfumeName = perfumeCard.querySelector('h3').textContent;
            const perfumePrice = perfumeCard.querySelector('.price').textContent;

            // Create success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <div class="success-content">
                    <i class="fas fa-check-circle"></i>
                    <span>${perfumeName} added to cart</span>
                </div>
            `;

            // Add styles for success message
            successMessage.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: linear-gradient(135deg, #d4af37 0%, #b8941f 100%);
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 10px;
                box-shadow: 0 5px 20px rgba(212, 175, 55, 0.3);
                z-index: 10000;
                transform: translateX(400px);
                transition: transform 0.3s ease;
            `;

            successMessage.querySelector('.success-content').style.cssText = `
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-weight: 500;
            `;

            document.body.appendChild(successMessage);

            // Animate in
            setTimeout(() => {
                successMessage.style.transform = 'translateX(0)';
            }, 100);

            // Animate out and remove
            setTimeout(() => {
                successMessage.style.transform = 'translateX(400px)';
                setTimeout(() => {
                    document.body.removeChild(successMessage);
                }, 300);
            }, 3000);

            // Update button text temporarily
            const originalText = this.textContent;
            this.textContent = 'Added!';
            this.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';

            setTimeout(() => {
                this.textContent = originalText;
                this.style.background = 'linear-gradient(135deg, #d4af37 0%, #b8941f 100%)';
            }, 2000);
        });
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;

            // Create success message
            const successMessage = document.createElement('div');
            successMessage.className = 'newsletter-success';
            successMessage.innerHTML = `
                <div class="success-content">
                    <i class="fas fa-envelope"></i>
                    <span>Thank you for subscribing!</span>
                </div>
            `;

            successMessage.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, #d4af37 0%, #b8941f 100%);
                color: white;
                padding: 2rem 3rem;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                z-index: 10000;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;

            successMessage.querySelector('.success-content').style.cssText = `
                display: flex;
                align-items: center;
                gap: 1rem;
                font-weight: 500;
                font-size: 1.1rem;
            `;

            document.body.appendChild(successMessage);

            // Animate in
            setTimeout(() => {
                successMessage.style.opacity = '1';
            }, 100);

            // Animate out and remove
            setTimeout(() => {
                successMessage.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(successMessage);
                }, 300);
            }, 3000);

            // Reset form
            this.reset();
        });
    }

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    const floatingBottle = document.querySelector('.floating-bottle');

    if (hero && floatingBottle) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            floatingBottle.style.transform = `translateY(${rate}px)`;
        });
    }

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.perfume-card, .review-card, .story-item');

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Search functionality
    const searchIcon = document.querySelector('.nav-icons a[href="#search"]');

    if (searchIcon) {
        searchIcon.addEventListener('click', function(e) {
            e.preventDefault();

            // Create search overlay
            const searchOverlay = document.createElement('div');
            searchOverlay.className = 'search-overlay';
            searchOverlay.innerHTML = `
                <div class="search-content">
                    <div class="search-header">
                        <h3>Search Fragrances</h3>
                        <button class="close-search">&times;</button>
                    </div>
                    <div class="search-input-container">
                        <input type="text" placeholder="Search by name, notes, or mood..." class="search-input">
                        <button class="search-btn">
                            <i class="fas fa-search"></i>
                        </button>
                    </div>
                    <div class="search-suggestions">
                        <h4>Popular Searches</h4>
                        <div class="suggestion-tags">
                            <span class="tag">Floral</span>
                            <span class="tag">Oriental</span>
                            <span class="tag">Fresh</span>
                            <span class="tag">Woody</span>
                            <span class="tag">Citrus</span>
                        </div>
                    </div>
                </div>
            `;

            searchOverlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(5px);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;

            searchOverlay.querySelector('.search-content').style.cssText = `
                background: white;
                padding: 3rem;
                border-radius: 20px;
                width: 90%;
                max-width: 600px;
                transform: scale(0.9);
                transition: transform 0.3s ease;
            `;

            searchOverlay.querySelector('.search-header').style.cssText = `
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 2rem;
            `;

            searchOverlay.querySelector('.close-search').style.cssText = `
                background: none;
                border: none;
                font-size: 2rem;
                cursor: pointer;
                color: #8a8a8a;
                transition: color 0.3s ease;
            `;

            searchOverlay.querySelector('.search-input-container').style.cssText = `
                display: flex;
                gap: 1rem;
                margin-bottom: 2rem;
            `;

            searchOverlay.querySelector('.search-input').style.cssText = `
                flex: 1;
                padding: 1rem 1.5rem;
                border: 2px solid #e0e0e0;
                border-radius: 25px;
                font-size: 1rem;
                outline: none;
                transition: border-color 0.3s ease;
            `;

            searchOverlay.querySelector('.search-btn').style.cssText = `
                background: linear-gradient(135deg, #d4af37 0%, #b8941f 100%);
                color: white;
                border: none;
                padding: 1rem 1.5rem;
                border-radius: 25px;
                cursor: pointer;
                transition: all 0.3s ease;
            `;

            searchOverlay.querySelector('.suggestion-tags').style.cssText = `
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
            `;

            searchOverlay.querySelectorAll('.tag').forEach(tag => {
                tag.style.cssText = `
                    background: #f8f6f0;
                    color: #2c2c2c;
                    padding: 0.5rem 1rem;
                    border-radius: 20px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-size: 0.9rem;
                `;

                tag.addEventListener('mouseenter', function() {
                    this.style.background = '#d4af37';
                    this.style.color = 'white';
                });

                tag.addEventListener('mouseleave', function() {
                    this.style.background = '#f8f6f0';
                    this.style.color = '#2c2c2c';
                });
            });

            document.body.appendChild(searchOverlay);

            // Animate in
            setTimeout(() => {
                searchOverlay.style.opacity = '1';
                searchOverlay.querySelector('.search-content').style.transform = 'scale(1)';
            }, 100);

            // Focus on input
            setTimeout(() => {
                searchOverlay.querySelector('.search-input').focus();
            }, 300);

            // Close functionality
            const closeSearch = searchOverlay.querySelector('.close-search');
            closeSearch.addEventListener('click', function() {
                searchOverlay.style.opacity = '0';
                searchOverlay.querySelector('.search-content').style.transform = 'scale(0.9)';
                setTimeout(() => {
                    document.body.removeChild(searchOverlay);
                }, 300);
            });

            // Close on overlay click
            searchOverlay.addEventListener('click', function(e) {
                if (e.target === searchOverlay) {
                    closeSearch.click();
                }
            });
        });
    }

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';

        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
});