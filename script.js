// Project data with multiple images
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

// Modal functionality
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

// Open modal
function openModal(projectKey) {
    currentProject = projectData[projectKey];
    currentImageIndex = 0;

    if (currentProject) {
        modalTitle.textContent = currentProject.title;
        modalDescription.textContent = currentProject.description;

        // Update tech stack
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

// Update modal image
function updateModalImage() {
    if (currentProject && currentProject.images) {
        modalImage.src = currentProject.images[currentImageIndex];
        imageCounter.textContent = `${currentImageIndex + 1} / ${currentProject.images.length}`;

        // Update navigation buttons
        prevBtn.disabled = currentImageIndex === 0;
        nextBtn.disabled = currentImageIndex === currentProject.images.length - 1;
    }
}

// Close modal
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    currentProject = null;
    currentImageIndex = 0;
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Add click event to project cards
    const viewProjectBtns = document.querySelectorAll('.view-project');
    viewProjectBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const projectCard = this.closest('.project-card');
            const projectKey = projectCard.getAttribute('data-project');
            openModal(projectKey);
        });
    });

    // Also allow clicking on the entire project card
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on external link
            if (e.target.closest('a[href]')) {
                return;
            }
            const projectKey = this.getAttribute('data-project');
            openModal(projectKey);
        });
    });

    // Modal close events
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Navigation events
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

    // Keyboard navigation
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
});