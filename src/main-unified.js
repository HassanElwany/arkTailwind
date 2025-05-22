// Hamburger Menu Toggle
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenu = document.getElementById("mobile-menu");
  const toggleButton = document.getElementById("menu-toggle");
  const isRTL = document.documentElement.dir === "rtl"; // Detect page direction

  // Toggle menu when hamburger is clicked
  toggleButton.addEventListener("click", (e) => {
    e.stopPropagation();
    const isExpanded = toggleButton.getAttribute("aria-expanded") === "true";
    mobileMenu.classList.toggle("hidden");
    toggleButton.setAttribute("aria-expanded", !isExpanded);
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!mobileMenu.contains(e.target) && !toggleButton.contains(e.target)) {
      mobileMenu.classList.add("hidden");
      toggleButton.setAttribute("aria-expanded", "false");
    }
  });

  // Close menu when clicking on a mobile menu link
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      toggleButton.setAttribute("aria-expanded", "false");
    });
  });

  // Project Carousels
  const carousels = document.querySelectorAll(".project-carousel");

  carousels.forEach((carousel) => {
    const slides = Array.from(carousel.querySelectorAll(".carousel-inner img"));
    const prevBtn = carousel.querySelector(".carousel-prev");
    const nextBtn = carousel.querySelector(".carousel-next");
    let currentSlide = 0;
    let autoSlideInterval;

    // Function to show specific slide
    const showSlide = (index) => {
      slides.forEach((slide) => {
        slide.style.opacity = "0";
        slide.classList.remove("active");
      });

      slides[index].style.opacity = "1";
      slides[index].classList.add("active");
      currentSlide = index;
    };

    // Function to show next slide
    const nextSlide = (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      const nextIndex = (currentSlide + 1) % slides.length;
      showSlide(nextIndex);
      if (e && e.type === "click") {
        resetAutoSlide();
      }
    };

    // Function to show previous slide
    const prevSlide = (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(prevIndex);
      if (e && e.type === "click") {
        resetAutoSlide();
      }
    };

    // Initialize the carousel
    if (slides.length > 0) {
      slides.forEach((slide) => {
        slide.style.transition = "opacity 0.5s ease-in-out";
        slide.style.position = "absolute";
        slide.style.inset = "0";
        slide.style.opacity = "0";
      });
      showSlide(0);

      // Set up button event listeners - Handles both LTR and RTL
      if (prevBtn && nextBtn) {
        if (isRTL) {
          // In RTL mode, swap the behavior of prev and next buttons
          prevBtn.addEventListener("click", nextSlide); // Right arrow moves to next slide in RTL
          nextBtn.addEventListener("click", prevSlide); // Left arrow moves to previous slide in RTL
        } else {
          prevBtn.addEventListener("click", prevSlide);
          nextBtn.addEventListener("click", nextSlide);
        }

        // Prevent click events from bubbling up to parent elements
        prevBtn.addEventListener("mousedown", (e) => e.stopPropagation());
        nextBtn.addEventListener("mousedown", (e) => e.stopPropagation());
      }

      // Add keyboard navigation - Handles both LTR and RTL
      carousel.setAttribute("tabindex", "0");
      carousel.addEventListener("keydown", (e) => {
        if (isRTL) {
          // In RTL layout, swap arrow key behavior
          if (e.key === "ArrowRight") {
            prevSlide(e); // Right arrow moves to previous in RTL
          } else if (e.key === "ArrowLeft") {
            nextSlide(e); // Left arrow moves to next in RTL
          }
        } else {
          if (e.key === "ArrowLeft") {
            prevSlide(e);
          } else if (e.key === "ArrowRight") {
            nextSlide(e);
          }
        }
      });

      // Auto-sliding functionality
      const startAutoSlide = () => {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(() => nextSlide(), 5000);
      };

      // Reset auto-slide timer
      const resetAutoSlide = () => {
        clearInterval(autoSlideInterval);
        startAutoSlide();
      };

      // Initialize auto-sliding
      startAutoSlide();

      // Pause auto-sliding when mouse enters the carousel
      carousel.addEventListener("mouseenter", () => {
        clearInterval(autoSlideInterval);
      });

      // Resume auto-sliding when mouse leaves the carousel
      carousel.addEventListener("mouseleave", startAutoSlide);
    }
  });

  // Hero Background Transition
  const heroImage = document.getElementById("hero-image");
  const heroVideo = document.getElementById("hero-video");
  if (window.innerWidth >= 768) {
    setTimeout(() => {
      heroImage.classList.add(
        "opacity-0",
        "transition-opacity",
        "duration-1000"
      );
      heroVideo.classList.remove("hidden");
      heroVideo
        .play()
        .catch((error) => console.error("Video playback failed:", error));
    }, 2000);
  }

  // Enhanced smooth scroll for navigation links with custom easing
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      const headerOffset = 80; // Account for fixed header
      
      if (targetElement) {
        // Use getBoundingClientRect for more accurate positioning
        const elementPosition = targetElement.getBoundingClientRect().top;
        const startPosition = window.pageYOffset;
        const distance = elementPosition + startPosition - headerOffset;
        const duration = 1200; // Slightly longer duration for even smoother effect
        let start = null;
        
        function easeInOutCubic(t) {
          return t < 0.5 
            ? 4 * t * t * t 
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }
        
        function animation(currentTime) {
          if (start === null) start = currentTime;
          const timeElapsed = currentTime - start;
          const progress = Math.min(timeElapsed / duration, 1);
          
          window.scrollTo({
            top: startPosition + ((distance - startPosition) * easeInOutCubic(progress)),
            left: 0,
          });
          
          if (timeElapsed < duration) {
            requestAnimationFrame(animation);
          }
        }
        
        requestAnimationFrame(animation);
      }
    });
  });
});
