// Navbar scroll effect
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// 3D Parallax effect on scroll with cocktail glasses
const cocktailGlasses = document.querySelectorAll(".floating-cocktail");

window.addEventListener("scroll", () => {
  // Disable heavy 3D calculations on mobile for performance
  if (window.innerWidth <= 768) return;

  const scrolled = window.pageYOffset;

  // Hero parallax
  const heroBg = document.querySelector(".hero-bg");
  if (heroBg) {
    heroBg.style.transform = `translateZ(-100px) scale(1.1) translateY(${
      scrolled * 0.5
    }px)`;
  }

  // Background layers parallax
  const layers = document.querySelectorAll(
    ".about-layer, .cocktails-bg, .experience-bg"
  );
  layers.forEach((layer, index) => {
    const speed = 0.3 + index * 0.1;
    const yPos = -(scrolled * speed);
    layer.style.transform = `translateZ(-${50 + index * 10}px) scale(${
      1.05 + index * 0.01
    }) translateY(${yPos}px)`;
  });

  // Animate 3D cocktail glasses based on scroll
  cocktailGlasses.forEach((glass, index) => {
    const rect = glass.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Check if element is in viewport
    if (rect.top < windowHeight && rect.bottom > 0) {
      glass.classList.add("visible");

      // Calculate scroll progress for this element
      const progress = (windowHeight - rect.top) / (windowHeight + rect.height);

      // Different movement patterns for each glass
      const speeds = [0.3, -0.4, 0.5, -0.3];
      const rotations = [0.1, -0.15, 0.12, -0.1];
      const depths = [100, 150, 80, 120];

      const speed = speeds[index % speeds.length];
      const rotation = rotations[index % rotations.length];
      const depth = depths[index % depths.length];

      const yMove = scrolled * speed;
      const rotate = scrolled * rotation;
      const zMove = Math.sin(scrolled * 0.001 + index) * 30;

      glass.style.transform = `
                  translateY(${yMove}px) 
                  translateZ(${depth + zMove}px) 
                  rotateZ(${rotate}deg)
                  rotateY(${progress * 20 - 10}deg)
                  scale(${0.8 + progress * 0.4})
              `;
    }
  });
});

// Initial trigger
window.dispatchEvent(new Event("scroll"));

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".scroll-element").forEach((el) => {
  observer.observe(el);
});

// Custom cursor
const cursor = document.querySelector(".cursor");
const cursorFollower = document.querySelector(".cursor-follower");

let mouseX = 0,
  mouseY = 0;
let followerX = 0,
  followerY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  cursor.style.left = mouseX + "px";
  cursor.style.top = mouseY + "px";
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.1;
  followerY += (mouseY - followerY) * 0.1;

  cursorFollower.style.left = followerX + "px";
  cursorFollower.style.top = followerY + "px";

  requestAnimationFrame(animateFollower);
}

animateFollower();

// Cursor hover effects
const links = document.querySelectorAll("a, button, .cocktail-card");
links.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1.5)";
    cursor.style.borderColor = "rgba(212, 175, 55, 0.8)";
  });
  link.addEventListener("mouseleave", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1)";
    cursor.style.borderColor = "rgba(212, 175, 55, 0.4)";
  });
});

// Smooth anchor scrolling (only for internal navigation links)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    // Only prevent default for actual anchor links (not just "#")
    if (href && href !== "#" && href.startsWith("#")) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop,
          behavior: "smooth",
        });
      }
    }
  });
});

// Stagger animation delays for cards
document.querySelectorAll(".cocktail-card").forEach((card, index) => {
  card.style.transitionDelay = `${index * 0.15}s`;
});

// Hide cursor on touch devices
if ("ontouchstart" in window) {
  cursor.style.display = "none";
  cursorFollower.style.display = "none";
}

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        // Prevent scrolling when menu is open
        if (mobileMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
}

// Close mobile menu when a link is clicked
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});