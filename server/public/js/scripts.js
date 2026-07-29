// Hero Carousel
const heroImages = [
    "/images/undraw_online-learning_tgmv.svg",
    "/images/undraw_books_wxzz (2).svg",
    "/images/undraw_teaching_58yg.svg"
];

let currentHeroIndex = 0;
const heroImgElement = document.querySelector("#hero-carousel-img");

if (heroImgElement) {
    setInterval(() => {
        currentHeroIndex = (currentHeroIndex + 1) % heroImages.length;
        heroImgElement.src = heroImages[currentHeroIndex];
    }, 3000); // Changed to 3 seconds for better UX
}

// Features Carousel
const featureCards = document.querySelectorAll('.home-feature-card');
let currentFeatureIndex = 0;

if (featureCards.length > 0) {
    setInterval(() => {
        featureCards[currentFeatureIndex].classList.remove('home-feature-card--active');
        featureCards[currentFeatureIndex].classList.add('opacity-0', 'z-0', 'scale-90');
        
        currentFeatureIndex = (currentFeatureIndex + 1) % featureCards.length;
        
        featureCards[currentFeatureIndex].classList.remove('opacity-0', 'z-0', 'scale-90');
        featureCards[currentFeatureIndex].classList.add('home-feature-card--active');
    }, 2000); // Changed to 3 seconds for better UX
}


// Mobile Menu Toggle (single implementation)
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('.header__mobile-menu');
    const mobileNav = document.querySelector('.header__mobile-nav');
    
    if (mobileMenuButton && mobileNav) {
        mobileMenuButton.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileNav.classList.toggle('active');
            document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
        });
        
        const mobileLinks = document.querySelectorAll('.header__mobile-nav-link, .header__mobile-login, .header__mobile-signup');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuButton.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
});


  // Apply saved theme on load
  document.addEventListener('DOMContentLoaded', () => {
    const savedMode = localStorage.getItem('lightMode');
    const body = document.body;
    const thumb = document.querySelector('.header__theme-thumb');
    
    if (savedMode === 'true') {
      body.classList.add('light-mode');
      body.classList.remove('dark-mode');
      thumb.style.transform = 'translateX(24px)';
    } else {
      body.classList.add('dark-mode');
      body.classList.remove('light-mode');
      thumb.style.transform = 'translateX(0)';
    }
  });

  function toggleDarkMode() {
    const body = document.body;
    const thumb = document.querySelector('.header__theme-thumb');
    
    if (body.classList.contains('dark-mode')) {
      body.classList.remove('dark-mode');
      body.classList.add('light-mode');
      thumb.style.transform = 'translateX(24px)';
      localStorage.setItem('lightMode', 'true');
    } else {
      body.classList.remove('light-mode');
      body.classList.add('dark-mode');
      thumb.style.transform = 'translateX(0)';
      localStorage.setItem('lightMode', 'false');
    }
  }
