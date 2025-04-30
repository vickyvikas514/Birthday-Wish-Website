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
        if (currentContent) currentContent.classList.add('blur');

        setTimeout(() => {
            current.classList.remove('active');
            currentPage++;
            if (currentPage < pages.length) {
                pages[currentPage].classList.add('active');
                const nextContent = pages[currentPage].querySelector('.content') || pages[currentPage].querySelector('.whatsapp-container');
                if (nextContent) {
                    setTimeout(async () => {
                        nextContent.classList.add('active');
                        nextContent.classList.remove('blur');
                        // Trigger WhatsApp animation for page 3
                        if (currentPage === 2) {
                            const whatsappMessage = document.getElementById('whatsapp-message');
                            if (whatsappMessage) {
                                const messageText = "Happy Birthday Nishtha";
                                whatsappMessage.textContent = ''; // Clear any previous text
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
                console.log('Activating screen:', screens[currentScreen].id); // Debug log
                const galleryText = screens[currentScreen].querySelector('h2');
                const nameLetters = screens[currentScreen].querySelectorAll('.name-letter');
                const acrosticWords = screens[currentScreen].querySelectorAll('.acrostic-word');
                if (galleryText) {
                    setTimeout(() => { galleryText.classList.add('active'); }, 100);
                }
                if (nameLetters.length > 0) {
                    nameLetters.forEach(letter => {
                        setTimeout(() => { letter.classList.add('animate'); }, 100);
                    });
                }
                if (acrosticWords.length > 0) {
                    acrosticWords.forEach(word => {
                        setTimeout(() => { word.classList.add('animate'); }, 100);
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
        if (currentMainText) currentMainText.classList.add('blur');

        setTimeout(() => {
            currentMainScreen.classList.remove('active');
            currentScreen = (currentScreen + 1) % screens.length;
            screens[currentScreen].classList.add('active');
            console.log('Activating screen:', screens[currentScreen].id); // Debug log
            const nextMainText = screens[currentScreen].querySelector('h2');
            const nextNameLetters = screens[currentScreen].querySelectorAll('.name-letter');
            const nextAcrosticWords = screens[currentScreen].querySelectorAll('.acrostic-word');
            if (nextMainText) {
                setTimeout(() => { 
                    nextMainText.classList.add('active'); 
                    nextMainText.classList.remove('blur'); 
                }, 100);
            }
            if (nextNameLetters.length > 0) {
                nextNameLetters.forEach(letter => {
                    setTimeout(() => { letter.classList.add('animate'); }, 100);
                });
            }
            if (nextAcrosticWords.length > 0) {
                nextAcrosticWords.forEach(word => {
                    setTimeout(() => { word.classList.add('animate'); }, 100);
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
                setTimeout(resolve, 1000); // 1-second hold after checkmarks
            }
        }
        setTimeout(type, 500); // Initial delay
    });
}

function triggerPageAnimation(pageIndex) {
    if (pageIndex === 0) {
        // Sparkles
        for (let i = 0; i < 10; i++) {
            createParticle('sparkle', Math.random() * canvas.width, Math.random() * canvas.height);
        }
    } else if (pageIndex === 1) {
        // Confetti
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#99004d', '#f7c1d3', '#ffe6f0']
        });
    } else if (pageIndex === 3) {
        // Balloons
        for (let i = 0; i < 5; i++) {
            createParticle('balloon', Math.random() * canvas.width, canvas.height);
        }
    } else if (pageIndex === 4) {
        // Sparkles and confetti
        for (let i = 0; i < 10; i++) {
            createParticle('sparkle', Math.random() * canvas.width, Math.random() * canvas.height);
        }
        confetti({
            particleCount: 50,
            spread: 50,
            origin: { y: 0.6 },
            colors: ['#99004d', '#f7c1d3', '#ffe6f0']
        });
    } else if (pageIndex === 5) {
        // Three bursts of confetti from edges, balloons, hearts
        setTimeout(() => {
            // Burst 1
            confetti({
                particleCount: 50,
                spread: 100,
                angle: 45,
                origin: { x: 0, y: 0.5 },
                colors: ['#99004d', '#f7c1d3', '#ffe6f0']
            });
            confetti({
                particleCount: 50,
                spread: 100,
                angle: 135,
                origin: { x: 1, y: 0.5 },
                colors: ['#99004d', '#f7c1d3', '#ffe6f0']
            });
            createParticle('balloon', Math.random() * canvas.width, canvas.height);
            createParticle('heart', Math.random() * canvas.width, canvas.height);
        }, 1000);

        setTimeout(() => {
            // Burst 2
            confetti({
                particleCount: 50,
                spread: 100,
                angle: 45,
                origin: { x: 0, y: 0.5 },
                colors: ['#99004d', '#f7c1d3', '#ffe6f0']
            });
            confetti({
                particleCount: 50,
                spread: 100,
                angle: 135,
                origin: { x: 1, y: 0.5 },
                colors: ['#99004d', '#f7c1d3', '#ffe6f0']
            });
            createParticle('balloon', Math.random() * canvas.width, canvas.height);
            createParticle('heart', Math.random() * canvas.width, canvas.height);
        }, 1500);

        setTimeout(() => {
            // Burst 3
            confetti({
                particleCount: 50,
                spread: 100,
                angle: 45,
                origin: { x: 0, y: 0.5 },
                colors: ['#99004d', '#f7c1d3', '#ffe6f0']
            });
            confetti({
                particleCount: 50,
                spread: 100,
                angle: 135,
                origin: { x: 1, y: 0.5 },
                colors: ['#99004d', '#f7c1d3', '#ffe6f0']
            });
            createParticle('balloon', Math.random() * canvas.width, canvas.height);
            createParticle('heart', Math.random() * canvas.width, canvas.height);
        }, 2000);
    }
}

function handleAdvance(e) {
    // Allow advance on page 6 (currentPage === 5) or any screen after intro (!isIntro)
    if ((currentPage === 5 || !isIntro) && !e.target.closest('#surprise-btn') && !e.target.closest('.carousel-item') && !e.target.closest('.modal') && !e.target.closest('.modal-close')) {
        if (currentPage === 5) {
            particles.length = 0; // Clear particles when leaving page 6
        }
        showNextPage();
    }
}

document.addEventListener('click', handleAdvance);

// Auto-advance intro pages
async function autoAdvance() {
    if (isIntro && currentPage < pages.length - 1) {
        showNextPage();
        if (currentPage < pages.length - 1) {
            setTimeout(autoAdvance, 3500);
        }
    }
}
setTimeout(autoAdvance, 3500);

// Canvas animations
const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
function createParticle(type, x, y) {
    const speed = type === 'balloon' || type === 'heart' ? Math.random() * -2 - 1 : Math.random() * 2 + 1;
    const size = type === 'sparkle' ? 5 : 20;
    particles.push({ x, y, type, size, speed, life: type === 'sparkle' ? 50 : 100 });
}

function animateBackground() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(255, 230, 240, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (isIntro && currentPage === 2 && Math.random() < 0.05) {
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
            ctx.bezierCurveTo(p.x - 10, p.y - 10, p.x - 10, p.y + 10, p.x, p.y + 20);
            ctx.bezierCurveTo(p.x + 10, p.y + 10, p.x + 10, p.y - 10, p.x, p.y);
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

// Timer counting time since birth
var birthDate = new Date("Jan 15, 2000 00:00:00").getTime();
var x = setInterval(function() {
    var now = new Date().getTime();
    var elapsed = now - birthDate;
    const timer = document.getElementById("timer");
    if (timer) {
        if (elapsed < 0) {
            // Birth date is in the future
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

// Surprise button with confetti
const surpriseBtn = document.getElementById('surprise-btn');
if (surpriseBtn) {
    function handleSurprise(e) {
        e.preventDefault();
        var content = document.getElementById('surprise-content');
        content.style.display = 'block';
        this.style.display = 'none';
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#99004d', '#f7c1d3', '#ffe6f0']
        });
    }
    surpriseBtn.addEventListener('touchstart', handleSurprise);
    surpriseBtn.addEventListener('click', handleSurprise);
}

// Image modal
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalCaption = document.getElementById('modal-caption');
function attachModalListeners() {
    document.querySelectorAll('.carousel-item img').forEach(img => {
        function handleImageClick(e) {
            e.preventDefault();
            modal.style.display = 'flex';
            modalImg.src = this.src;
            modalCaption.innerHTML = this.dataset.caption;
        }
        img.addEventListener('touchstart', handleImageClick);
        img.addEventListener('click', handleImageClick);
    });
}

const modalClose = document.querySelector('.modal-close');
if (modalClose) {
    function handleModalClose(e) {
        e.preventDefault();
        modal.style.display = 'none';
    }
    modalClose.addEventListener('touchstart', handleModalClose);
    modalClose.addEventListener('click', handleModalClose);
}

modal.addEventListener('touchstart', function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Carousel functionality
let currentImageIndex = 0;
let touchStartX = 0;
let touchEndX = 0;
let mouseStartX = 0;
let mouseEndX = 0;
let isDragging = false;

function initializeCarousel() {
    const carouselItems = document.querySelectorAll('.carousel-item');
    if (carouselItems.length > 0) {
        carouselItems[0].classList.add('active');
        attachModalListeners();
    }

    const galleryScreen = document.getElementById('gallery');
    if (galleryScreen) {
        // Touch events
        galleryScreen.addEventListener('touchstart', handleTouchStart);
        galleryScreen.addEventListener('touchend', handleTouchEnd);
        // Mouse events for laptop testing
        galleryScreen.addEventListener('mousedown', handleMouseDown);
        galleryScreen.addEventListener('mouseup', handleMouseUp);
        // Keyboard events
        document.addEventListener('keydown', handleKeyDown);
    }
}

function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
}

function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
}

function handleMouseDown(e) {
    if (e.target.closest('.carousel-item')) {
        isDragging = true;
        mouseStartX = e.clientX;
    }
}

function handleMouseUp(e) {
    if (isDragging) {
        mouseEndX = e.clientX;
        handleMouseSwipe();
        isDragging = false;
    }
}

function handleKeyDown(e) {
    if (screens[currentScreen].id === 'gallery') {
        if (e.key === 'ArrowLeft') {
            showNextImage();
        } else if (e.key === 'ArrowRight') {
            showPreviousImage();
        }
    }
}

function handleSwipe() {
    const swipeThreshold = 50; // Minimum swipe distance
    const swipeDistance = touchEndX - touchStartX;

    if (swipeDistance > swipeThreshold) {
        // Swipe right: Previous image
        showPreviousImage();
    } else if (swipeDistance < -swipeThreshold) {
        // Swipe left: Next image
        showNextImage();
    }
}

function handleMouseSwipe() {
    const swipeThreshold = 50; // Minimum drag distance
    const swipeDistance = mouseEndX - mouseStartX;

    if (swipeDistance > swipeThreshold) {
        // Drag right: Previous image
        showPreviousImage();
    } else if (swipeDistance < -swipeThreshold) {
        // Drag left: Next image
        showNextImage();
    }
}

function showNextImage() {
    const carouselItems = document.querySelectorAll('.carousel-item');
    if (carouselItems.length === 0) return;

    const currentItem = carouselItems[currentImageIndex];
    currentItem.classList.remove('active');
    currentItem.classList.add('rotate-left');

    currentImageIndex = (currentImageIndex + 1) % carouselItems.length;
    const nextItem = carouselItems[currentImageIndex];
    nextItem.classList.remove('rotate-left', 'rotate-right');
    nextItem.classList.add('active');

    setTimeout(() => {
        currentItem.classList.remove('rotate-left');
    }, 500);
}

function showPreviousImage() {
    const carouselItems = document.querySelectorAll('.carousel-item');
    if (carouselItems.length === 0) return;

    const currentItem = carouselItems[currentImageIndex];
    currentItem.classList.remove('active');
    currentItem.classList.add('rotate-right');

    currentImageIndex = (currentImageIndex - 1 + carouselItems.length) % carouselItems.length;
    const prevItem = carouselItems[currentImageIndex];
    prevItem.classList.remove('rotate-left', 'rotate-right');
    prevItem.classList.add('active');

    setTimeout(() => {
        currentItem.classList.remove('rotate-right');
    }, 500);
}

// Modified touch handling to prevent navigation on carousel swipe
document.addEventListener('touchstart', function(e) {
    if (screens[currentScreen].id === 'gallery' && e.target.closest('.carousel-item')) {
        handleTouchStart(e);
    } else {
        handleAdvance(e);
    }
});

document.addEventListener('touchend', function(e) {
    if (screens[currentScreen].id === 'gallery' && e.target.closest('.carousel-item')) {
        handleTouchEnd(e);
    }
});

// Floating hearts on interaction
function createHeart(e) {
    if (!e.target.closest('#surprise-btn') && !e.target.closest('.carousel-item') && !e.target.closest('.modal') && !e.target.closest('.modal-close')) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤️';
        const x = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        const y = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 2000);
    }
}
document.addEventListener('touchstart', createHeart);
document.addEventListener('click', createHeart);