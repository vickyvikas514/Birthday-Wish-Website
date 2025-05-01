// Screen navigation
const pages = document.querySelectorAll('.page');
const screens = document.querySelectorAll('.screen');
let currentPage = 0;
let currentScreen = 0;
let isIntro = true;

// Initialize first screen
pages[0].classList.add('active');
setTimeout(() => {
    const firstContent = pages[0].querySelector('.content');
    if (firstContent) firstContent.classList.add('active');
    triggerPageAnimation(0);
}, 100);

async function showNextPage() {
    if (isIntro) {
        const current = pages[currentPage];
        const currentContent = current.querySelector('.content') || current.querySelector('.whatsapp-container');
        if (currentContent) currentContent.style.opacity = '0';

        setTimeout(() => {
            current.classList.remove('active');
            currentPage++;
            if (currentPage < pages.length) {
                pages[currentPage].classList.add('active');
                const nextContent = pages[currentPage].querySelector('.content') || pages[currentPage].querySelector('.whatsapp-container');
                if (nextContent) {
                    setTimeout(async () => {
                        nextContent.classList.add('active');
                        nextContent.style.opacity = '1';
                        // Trigger WhatsApp animation for page 3
                        if (currentPage === 2) {
                            const whatsappMessage = document.getElementById('whatsapp-message');
                            if (whatsappMessage) {
                                const messageText = "Happy Birthday Nishtha";
                                whatsappMessage.textContent = '';
                                whatsappMessage.classList.remove('sent');
                                await typeMessage(whatsappMessage, messageText);
                            }
                        }
                    }, 100);
                }
                triggerPageAnimation(currentPage);
            } else {
                isIntro = false;
                screens[currentScreen].classList.add('active');
                const galleryText = screens[currentScreen].querySelector('h2');
                const nameItems = screens[currentScreen].querySelectorAll('.name-item');
                if (galleryText) {
                    setTimeout(() => { galleryText.classList.add('active'); }, 100);
                }
                if (nameItems.length > 0) {
                    nameItems.forEach((item, index) => {
                        setTimeout(() => { item.classList.add('active'); }, index * 500);
                    });
                }
                // Initialize carousel for gallery screen
                if (screens[currentScreen].id === 'gallery') {
                    initializeCarousel();
                }
            }
        }, 500);
    } else {
        const currentMainScreen = screens[currentScreen];
        const currentMainText = currentMainScreen.querySelector('h2') || currentMainScreen.querySelector('p');
        if (currentMainText) currentMainText.style.opacity = '0';

        setTimeout(() => {
            currentMainScreen.classList.remove('active');
            currentScreen = (currentScreen + 1) % screens.length;
            screens[currentScreen].classList.add('active');
            const nextMainText = screens[currentScreen].querySelector('h2');
            const nextNameItems = screens[currentScreen].querySelectorAll('.name-item');
            if (nextMainText) {
                setTimeout(() => { 
                    nextMainText.classList.add('active'); 
                    nextMainText.style.opacity = '1'; 
                }, 100);
            }
            if (nextNameItems.length > 0) {
                nextNameItems.forEach((item, index) => {
                    setTimeout(() => { item.classList.add('active'); }, index * 500);
                });
            }
            // Initialize carousel for gallery screen
            if (screens[currentScreen].id === 'gallery') {
                initializeCarousel();
            }
        }, 500);
    }
}

function typeMessage(element, text) {
    return new Promise((resolve) => {
        let index = 0;
        function type() {
            if (index < text.length) {
                element.textContent += text[index];
                index++;
                setTimeout(type, 100);
            } else {
                element.classList.add('sent');
                setTimeout(resolve, 1000);
            }
        }
        setTimeout(type, 500);
    });
}

function triggerPageAnimation(pageIndex) {
    if (pageIndex === 0) {
        // Sparkles
        for (let i = 0; i < 5; i++) {
            createParticle('sparkle', Math.random() * canvas.width, Math.random() * canvas.height);
        }
    } else if (pageIndex === 1) {
        // Confetti
        confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#99004d', '#f7c1d3', '#ffe6f0']
        });
    } else if (pageIndex === 3) {
        // Balloons
        for (let i = 0; i < 3; i++) {
            createParticle('balloon', Math.random() * canvas.width, canvas.height);
        }
    } else if (pageIndex === 4) {
        // Sparkles and confetti
        for (let i = 0; i < 5; i++) {
            createParticle('sparkle', Math.random() * canvas.width, Math.random() * canvas.height);
        }
        confetti({
            particleCount: 30,
            spread: 50,
            origin: { y: 0.6 },
            colors: ['#99004d', '#f7c1d3', '#ffe6f0']
        });
    } else if (pageIndex === 5) {
        // Confetti bursts, balloons, hearts
        setTimeout(() => {
            confetti({
                particleCount: 30,
                spread: 80,
                angle: 45,
                origin: { x: 0, y: 0.5 },
                colors: ['#99004d', '#f7c1d3', '#ffe6f0']
            });
            createParticle('balloon', Math.random() * canvas.width, canvas.height);
            createParticle('heart', Math.random() * canvas.width, canvas.height);
        }, 1000);
        setTimeout(() => {
            confetti({
                particleCount: 30,
                spread: 80,
                angle: 135,
                origin: { x: 1, y: 0.5 },
                colors: ['#99004d', '#f7c1d3', '#ffe6f0']
            });
            createParticle('balloon', Math.random() * canvas.width, canvas.height);
        }, 1500);
    }
}

function handleAdvance(e) {
    // Prevent advancing during scrolling or swiping
    if (e.target.closest('.letter-message-container') || 
        e.target.closest('.carousel-item') || 
        e.target.closest('#surprise-btn')) {
        return;
    }
    // Allow advance on page 6 or after intro
    if ((currentPage === 5 || !isIntro)) {
        if (currentPage === 5) {
            particles.length = 0; // Clear particles
        }
        showNextPage();
    }
}

document.addEventListener('click', handleAdvance);
document.addEventListener('touchstart', handleAdvance);

// Auto-advance intro pages
async function autoAdvance() {
    if (isIntro && currentPage < pages.length - 1) {
        showNextPage();
        if (currentPage < pages.length - 1) {
            setTimeout(autoAdvance, 3000);
        }
    }
}
setTimeout(autoAdvance, 3000);

// Canvas animations
const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
function createParticle(type, x, y) {
    const speed = type === 'balloon' || type === 'heart' ? Math.random() * -1.5 - 0.5 : Math.random() * 1 + 0.5;
    const size = type === 'sparkle' ? 4 : 15;
    particles.push({ x, y, type, size, speed, life: type === 'sparkle' ? 30 : 80 });
}

function animateBackground() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(255, 230, 240, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (isIntro && currentPage === 2 && Math.random() < 0.03) {
        createParticle('heart', Math.random() * canvas.width, Math.random() * canvas.height);
    }

    particles.forEach((p, i) => {
        if (p.type === 'balloon' || p.type === 'heart') {
            p.y += p.speed;
            if (p.y < -p.size) particles.splice(i, 1);
        } else {
            p.life--;
            if (p.life <= 0) particles.splice(i, 1);
        }

        ctx.fillStyle = p.type === 'heart' || p.type === 'balloon' ? '#99004d' : '#f7c1d3';
        if (p.type === 'heart' || p.type === 'balloon') {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.bezierCurveTo(p.x - 8, p.y - 8, p.x - 8, p.y + 8, p.x, p.y + 16);
            ctx.bezierCurveTo(p.x + 8, p.y + 8, p.x + 8, p.y - 8, p.x, p.y);
            ctx.fill();
        } else {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        }
    });

    requestAnimationFrame(animateBackground);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

animateBackground();

// Timer
var birthDate = new Date("May 3, 2003 00:00:00").getTime();
var x = setInterval(function() {
    var now = new Date().getTime();
    var elapsed = now - birthDate;
    const timer = document.getElementById("timer");
    if (timer) {
        if (elapsed < 0) {
            clearInterval(x);
            timer.innerHTML = "Happy Birthday, My Love!";
            timer.style.color = "#99004d";
        } else {
            var days = Math.floor(elapsed / (1000 * 60 * 60 * 24));
            var hours = Math.floor((elapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((elapsed % (1000 * 60)) / 1000);
            document.getElementById("days").innerHTML = days;
            document.getElementById("hours").innerHTML = hours;
            document.getElementById("minutes").innerHTML = minutes;
            document.getElementById("seconds").innerHTML = seconds;
        }
    }
}, 1000);

// Surprise button
const surpriseBtn = document.getElementById('surprise-btn');
if (surpriseBtn) {
    function handleSurprise(e) {
        e.preventDefault();
        var content = document.getElementById('surprise-content');
        content.style.display = 'block';
        this.style.display = 'none';
        confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#99004d', '#f7c1d3', '#ffe6f0']
        });
    }
    surpriseBtn.addEventListener('touchstart', handleSurprise);
    surpriseBtn.addEventListener('click', handleSurprise);
}

// Carousel
let currentImageIndex = 0;
let touchStartX = 0;
let touchEndX = 0;

function initializeCarousel() {
    const carouselItems = document.querySelectorAll('.carousel-item');
    if (carouselItems.length > 0) {
        carouselItems[0].classList.add('active');
    }

    const galleryScreen = document.getElementById('gallery');
    if (galleryScreen) {
        galleryScreen.addEventListener('touchstart', handleTouchStart);
        galleryScreen.addEventListener('touchend', handleTouchEnd);
    }
}

function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
}

function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
}

function handleSwipe() {
    const swipeThreshold = 30;
    const swipeDistance = touchEndX - touchStartX;

    if (swipeDistance > swipeThreshold) {
        showPreviousImage();
    } else if (swipeDistance < -swipeThreshold) {
        showNextImage();
    }
}

function showNextImage() {
    const carouselItems = document.querySelectorAll('.carousel-item');
    if (carouselItems.length === 0) return;

    const currentItem = carouselItems[currentImageIndex];
    currentItem.classList.remove('active');

    currentImageIndex = (currentImageIndex + 1) % carouselItems.length;
    const nextItem = carouselItems[currentImageIndex];
    nextItem.classList.add('active');
}

function showPreviousImage() {
    const carouselItems = document.querySelectorAll('.carousel-item');
    if (carouselItems.length === 0) return;

    const currentItem = carouselItems[currentImageIndex];
    currentItem.classList.remove('active');

    currentImageIndex = (currentImageIndex - 1 + carouselItems.length) % carouselItems.length;
    const prevItem = carouselItems[currentImageIndex];
    prevItem.classList.add('active');
}

// Floating hearts
function createHeart(e) {
    if (!e.target.closest('#surprise-btn') && !e.target.closest('.carousel-item')) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤️';
        const x = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        const y = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 1500);
    }
}
document.addEventListener('touchstart', createHeart);
document.addEventListener('click', createHeart);