const projectData = {
    ecommerce: {
        title: "E-Commerce Platform",
        description: "A comprehensive full-stack e-commerce solution featuring secure payment integration, intuitive admin dashboard, inventory management, order tracking, and responsive design. Built with modern technologies to ensure scalability and performance.",
        tech: ["PHP", "HTML", "MYSQL", "BOOTSTRAP", "JAVASCRIPT", "AJAX"],
        images: [
            "ecommerce.png",
            "ecommerce2.png",
            "ecommerce3.png",
        ]
    },
    fooddelivery: {
        title: "Food Delivery App",
        description: "Complete food delivery solution with real-time GPS tracking, secure payment processing, restaurant management system, customer reviews, and push notifications. Designed for both customers and delivery partners.",
        tech: ["Flutter", "MERN STACK", "Node.js", "Google Maps API"],
        images: [
            "delivery.jpg",
            "delivery2.png",
            "delivery3.png",
            "delivery4.png",
            "delivery5.png",
            "delivery6.png",
        ]
    },
    timekeeping: {
        title: "Time Keeping Mobile App",
        description: "Advanced employee time tracking and attendance management system with GPS location verification, overtime calculations, leave management, reporting dashboard, and biometric authentication support.",
        tech: ["Flutter", "Dart", "Node.js", "MYSQL", "MERN STACK"],
        images: [
            "timekeeping.jpg",
            "timekeeping2.png",
            "timekeeping3.png",
            "timekeeping4.png",
            "timekeeping5.png",
        ]
    },
    accounting: {
        title: "Accounting System",
        description: "Comprehensive accounting system with general ledger, accounts payable, accounts receivable, financial reporting, tax management, and multi-currency support. Designed for small to medium businesses.",
        tech: ["MongoDB", "Express", "React", "Node.js", "Chart.js"],
        images: [
            "accounting2.png",
            "accounting3.png",
            "accounting4.png",
        ]
    },
    pos: {
        title: "POS System",
        description: "Modern Point of Sale system for retail businesses with inventory management, sales analytics, customer management, barcode scanning, receipt printing, and cloud synchronization across web and mobile platforms.",
        tech: ["PHP", "Flutter", "Dart", "MySQL", "Firebase"],
        images: [
            "pos.png",
            "pos2.jpeg",
            "pos3.jpeg",
            "pos4.jpg",
            "pos5.jpg",
            "pos6.jpg",
            "pos7.jpg",
            "pos8.jpg",
        ]
    }
};

let currentProject = null;
let currentImageIndex = 0;

const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalImage = document.getElementById('modal-image');
const modalDescription = document.getElementById('modal-description');
const modalTech = document.getElementById('modal-tech');
const modalClose = document.getElementById('modal-close');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const imageCounter = document.getElementById('image-counter');

function openModal(projectKey) {
    currentProject = projectData[projectKey];
    currentImageIndex = 0;

    if (currentProject) {
        modalTitle.textContent = currentProject.title;
        modalDescription.textContent = currentProject.description;

        modalTech.innerHTML = '';
        currentProject.tech.forEach(tech => {
            const span = document.createElement('span');
            span.textContent = tech;
            modalTech.appendChild(span);
        });

        updateModalImage();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function updateModalImage() {
    if (currentProject && currentProject.images) {
        modalImage.src = currentProject.images[currentImageIndex];
        imageCounter.textContent = `${currentImageIndex + 1} / ${currentProject.images.length}`;

        prevBtn.disabled = currentImageIndex === 0;
        nextBtn.disabled = currentImageIndex === currentProject.images.length - 1;
    }
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    currentProject = null;
    currentImageIndex = 0;
}

document.addEventListener('DOMContentLoaded', function() {
    const viewProjectBtns = document.querySelectorAll('.view-project');
    viewProjectBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const projectCard = this.closest('.project-card');
            const projectKey = projectCard.getAttribute('data-project');
            openModal(projectKey);
        });
    });

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.closest('a[href]')) {
                return;
            }
            const projectKey = this.getAttribute('data-project');
            openModal(projectKey);
        });
    });

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    prevBtn.addEventListener('click', function() {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            updateModalImage();
        }
    });

    nextBtn.addEventListener('click', function() {
        if (currentProject && currentImageIndex < currentProject.images.length - 1) {
            currentImageIndex++;
            updateModalImage();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (modal.classList.contains('active')) {
            switch(e.key) {
                case 'ArrowLeft':
                    if (currentImageIndex > 0) {
                        currentImageIndex--;
                        updateModalImage();
                    }
                    break;
                case 'ArrowRight':
                    if (currentProject && currentImageIndex < currentProject.images.length - 1) {
                        currentImageIndex++;
                        updateModalImage();
                    }
                    break;
                case 'Escape':
                    closeModal();
                    break;
            }
        }
    });

    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
});

const slideshowImages = [];
Object.entries(projectData).forEach(([key, project]) => {
    project.images.forEach((img, idx) => {
        slideshowImages.push({
            src: img,
            projectTitle: project.title,
            projectKey: key,
            index: idx + 1,
            total: project.images.length
        });
    });
});

let slideshowCurrent = 0;
const slideshowTrack = document.getElementById('slideshow-track');
const slideshowPrev = document.getElementById('slideshow-prev');
const slideshowNext = document.getElementById('slideshow-next');
const slideshowInfo = document.getElementById('slideshow-info');

const slideshowImageModal = document.getElementById('slideshow-image-modal');
const modalImg = document.getElementById('modal-img');
const closeModalImg = document.getElementById('close-modal-img');

function renderSlides() {
    if (!slideshowTrack) return;
    slideshowTrack.innerHTML = '';
    const total = slideshowImages.length;
    const isMobile = window.innerWidth <= 700;

    if (isMobile) {
        const imgObj = slideshowImages[slideshowCurrent];
        const slide = document.createElement('div');
        slide.className = 'slideshow-slide active';
        slide.setAttribute('data-index', slideshowCurrent);
        const img = document.createElement('img');
        img.src = imgObj.src;
        img.alt = imgObj.projectTitle;
        slide.appendChild(img);
        slide.addEventListener('click', () => {
            openSlideshowImageModal(imgObj.src, imgObj.projectTitle);
        });
        slideshowTrack.appendChild(slide);
    } else {
        const total = slideshowImages.length;
        const getIndex = (offset) => (slideshowCurrent + offset + total) % total;
        const positions = [-2, -1, 0, 1, 2];
        positions.forEach(offset => {
            const idx = getIndex(offset);
            const imgObj = slideshowImages[idx];
            const slide = document.createElement('div');
            slide.className = 'slideshow-slide';
            if (offset === 0) slide.classList.add('active');
            else if (offset === -1) slide.classList.add('left');
            else if (offset === 1) slide.classList.add('right');
            else slide.classList.add('far');
            slide.setAttribute('data-index', idx);
            const img = document.createElement('img');
            img.src = imgObj.src;
            img.alt = imgObj.projectTitle;
            slide.appendChild(img);
            if (offset !== 0) {
                slide.addEventListener('click', () => {
                    goToSlide(idx);
                });
            } else {
                slide.addEventListener('click', () => {
                    openSlideshowImageModal(imgObj.src, imgObj.projectTitle);
                });
            }
            slideshowTrack.appendChild(slide);
        });
    }
    const active = slideshowImages[slideshowCurrent];
    slideshowInfo.innerHTML = `<span class="slideshow-project-title" style="color: #fff;">${active.projectTitle}</span>
        <span class="slideshow-image-counter" style="color: #fff;">${slideshowCurrent + 1} / ${slideshowImages.length}</span>`;
}

let isSliding = false;
function goToSlide(targetIndex) {
    if (isSliding) return;
    const total = slideshowImages.length;
    let current = slideshowCurrent;
    let target = ((targetIndex % total) + total) % total;
    if (current === target) return;

    isSliding = true;
    let forwardSteps = (target - current + total) % total;
    let backwardSteps = (current - target + total) % total;
    let step, steps;
    if (forwardSteps <= backwardSteps) {
        step = 1;
        steps = forwardSteps;
    } else {
        step = -1;
        steps = backwardSteps;
    }

    function animateStep(remaining) {
        if (remaining === 0) {
            isSliding = false;
            return;
        }
        current = (current + step + total) % total;
        slideshowCurrent = current;
        renderSlides();
        setTimeout(() => animateStep(remaining - 1), 420);
    }
    animateStep(steps);
}

if (slideshowPrev && slideshowNext) {
    slideshowPrev.addEventListener('click', () => {
        if (isSliding) return;
        goToSlide((slideshowCurrent - 1 + slideshowImages.length) % slideshowImages.length, -1);
    });
    slideshowNext.addEventListener('click', () => {
        if (isSliding) return;
        goToSlide((slideshowCurrent + 1) % slideshowImages.length, 1);
    });
}

document.addEventListener('keydown', function(e) {
    if (
        document.activeElement.tagName !== 'INPUT' &&
        document.activeElement.tagName !== 'TEXTAREA' &&
        !modal.classList.contains('active') &&
        (!slideshowImageModal || slideshowImageModal.style.display !== 'flex')
    ) {
        if (e.key === 'ArrowLeft') {
            goToSlide((slideshowCurrent - 1 + slideshowImages.length) % slideshowImages.length, -1);
        } else if (e.key === 'ArrowRight') {
            goToSlide((slideshowCurrent + 1) % slideshowImages.length, 1);
        }
    }
});

function openSlideshowImageModal(src, alt) {
    if (!slideshowImageModal || !modalImg) return;
    modalImg.src = src;
    modalImg.alt = alt || '';
    slideshowImageModal.classList.add('active');
    modalImg.style.animation = 'none';
    void modalImg.offsetWidth;
    modalImg.style.animation = '';
    modalImg.classList.remove('popIn');
    setTimeout(() => {
        modalImg.classList.add('popIn');
    }, 10);
    document.body.style.overflow = 'hidden';
}

if (closeModalImg && slideshowImageModal) {
    closeModalImg.addEventListener('click', closeSlideshowImageModal);
    slideshowImageModal.addEventListener('click', function(e) {
        if (e.target === slideshowImageModal) {
            closeSlideshowImageModal();
        }
    });
}
function closeSlideshowImageModal() {
    if (!slideshowImageModal) return;
    slideshowImageModal.classList.remove('active');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', function(e) {
    if (slideshowImageModal && slideshowImageModal.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeSlideshowImageModal();
        }
    }
});

if (slideshowTrack && slideshowImages.length) {
    renderSlides();
}

window.addEventListener('resize', () => {
    renderSlides();
});
