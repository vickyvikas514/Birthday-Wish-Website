const allScreens = document.querySelectorAll('.page, .screen');
let currentIndex = 0;
let isTransitioning = false;

// Initialize first screen
allScreens[0].classList.add('active');
setTimeout(() => {
    const firstContent = allScreens[0].querySelector('.content');
    if (firstContent) firstContent.classList.add('active');
    triggerPageAnimation(0);
}, 100);

async function showNextPage() {
    if (isTransitioning || currentIndex >= allScreens.length - 1) return;
    isTransitioning = true;

    const current = allScreens[currentIndex];
    const currentContent = current.querySelector('.content') || current.querySelector('.whatsapp-container') || current.querySelector('h2');
    if (currentContent) currentContent.style.opacity = '0';

    // Clean up gallery and acrostic
    if (current.id === 'gallery') {
        const carouselItems = current.querySelectorAll('.carousel-item');
        carouselItems.forEach(item => {
            item.classList.remove('active');
            item.style.opacity = '0';
            item.style.display = 'none';
        });
    }
    if (current.id === 'acrostic') {
        const nameItems = current.querySelectorAll('.name-item');
        nameItems.forEach(item => item.classList.remove('active'));
    }

    setTimeout(() => {
        current.classList.remove('active');
        currentIndex++;
        if (currentIndex < allScreens.length) {
            const next = allScreens[currentIndex];
            next.classList.add('active');
            console.log('Showing:', next.id);
            const nextContent = next.querySelector('.content') || next.querySelector('.whatsapp-container') || next.querySelector('h2');
            if (nextContent) {
                setTimeout(async () => {
                    nextContent.classList.add('active');
                    nextContent.style.opacity = '1';
                    if (next.id === 'page-3') {
                        const whatsappMessage = document.getElementById('whatsapp-message');
                        if (whatsappMessage) {
                            const messageText = "Happy Birthday Nishtha";
                            whatsappMessage.textContent = '';
                            whatsappMessage.classList.remove('sent');
                            await typeMessage(whatsappMessage, messageText);
                        }
                    }
                    if (next.id === 'acrostic') {
                        const nameItems = next.querySelectorAll('.name-item');
                        nameItems.forEach((item, index) => {
                            setTimeout(() => item.classList.add('active'), index * 300);
                        });
                    }
                    if (next.id === 'gallery') {
                        initializeCarousel();
                    }
                    triggerPageAnimation(currentIndex);
                }, 100);
            }
        }
        isTransitioning = false;
    }, 300);
}

function typeMessage(element, text) {
    return new Promise((resolve) => {
        let index = 0;
        function type() {
            if (index < text.length) {
                element.textContent += text[index];
                index++;
                setTimeout(type, 80);
            } else {
                element.classList.add('sent');
                setTimeout(resolve, 600);
            }
        }
        setTimeout(type, 300);
    });
}

function triggerPageAnimation(index) {
    if (index === 0) {
        confetti({ particleCount: 10, spread: 30, colors: ['#99004d', '#f7c1d3'] });
    } else if (index === 1) {
        confetti({ particleCount: 10, spread: 30, colors: ['#99004d', '#f7c1d3'] });
    } else if (index === 3) {
        for (let i = 0; i < 1; i++) {
            createParticle('balloon', Math.random() * canvas.width, canvas.height);
        }
    } else if (index === 4) {
        confetti({ particleCount: 10, spread: 30, colors: ['#99004d', '#f7c1d3'] });
    } else if (index === 5) {
        confetti({ particleCount: 10, spread: 30, colors: ['#99004d', '#f7c1d3'] });
        for (let i = 0; i < 1; i++) {
            createParticle('balloon', Math.random() * canvas.width, canvas.height);
        }
    }
}

function handleAdvance(e) {
    if (isTransitioning) return;
    if (e.target.closest('.letter-message-container') || 
        e.target.closest('.carousel-item') || 
        e.target.closest('#surprise-btn')) {
        return;
    }
    showNextPage();
}

document.addEventListener('click', handleAdvance);
document.addEventListener('touchstart', handleAdvance);

// Auto-advance intro pages
async function autoAdvance() {
    if (currentIndex < 5) { // Stop at page-6
        showNextPage();
        setTimeout(autoAdvance, 2000);
    }
}
setTimeout(autoAdvance, 2000);

// Canvas animations (disabled on mobile)
const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

function createParticle(type, x, y) {
    if (isMobile) return;
    const speed = type === 'balloon' ? -0.5 : 0.5;
    const size = type === 'sparkle' ? 2 : 10;
    particles.push({ x, y, type, size, speed, life: type === 'sparkle' ? 15 : 50 });
}

function animateBackground() {
    if (isMobile) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(255, 230, 240, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
        if (p.type === 'balloon') {
            p.y += p.speed;
            if (p.y < -p.size) particles.splice(i, 1);
        } else {
            p.life--;
            if (p.life <= 0) particles.splice(i, 1);
        }

        ctx.fillStyle = p.type === 'balloon' ? '#99004d' : '#f7c1d3';
        if (p.type === 'balloon') {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.bezierCurveTo(p.x - 5, p.y - 5, p.x - 5, p.y + 5, p.x, p.y + 10);
            ctx.bezierCurveTo(p.x + 5, p.y + 5, p.x + 5, p.y - 5, p.x, p.y);
            ctx.fill();
        } else {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        }
    });

    requestAnimationFrame(animateBackground);
}

if (!isMobile) animateBackground();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

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
        confetti({ particleCount: 10, spread: 30, colors: ['#99004d', '#f7c1d3'] });
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
    carouselItems.forEach(item => {
        item.classList.remove('active');
        item.style.opacity = '0';
        item.style.display = 'none';
    });
    if (carouselItems.length > 0) {
        carouselItems[0].classList.add('active');
        carouselItems[0].style.opacity = '1';
        carouselItems[0].style.display = 'block';
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
    const swipeThreshold = 20;
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

    carouselItems[currentImageIndex].classList.remove('active');
    carouselItems[currentImageIndex].style.opacity = '0';
    carouselItems[currentImageIndex].style.display = 'none';

    currentImageIndex = (currentImageIndex + 1) % carouselItems.length;
    carouselItems[currentImageIndex].classList.add('active');
    carouselItems[currentImageIndex].style.opacity = '1';
    carouselItems[currentImageIndex].style.display = 'block';
}

function showPreviousImage() {
    const carouselItems = document.querySelectorAll('.carousel-item');
    if (carouselItems.length === 0) return;

    carouselItems[currentImageIndex].classList.remove('active');
    carouselItems[currentImageIndex].style.opacity = '0';
    carouselItems[currentImageIndex].style.display = 'none';

    currentImageIndex = (currentImageIndex - 1 + carouselItems.length) % carouselItems.length;
    carouselItems[currentImageIndex].classList.add('active');
    carouselItems[currentImageIndex].style.opacity = '1';
    carouselItems[currentImageIndex].style.display = 'block';
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
        setTimeout(() => heart.remove(), 1000);
    }
}
document.addEventListener('touchstart', createHeart);
document.addEventListener('click', createHeart);