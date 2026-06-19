lightbox,Option({
    'resizeDuration': 200,
    'wrapAround' : true,
    'fadeDuration' : 300
})
// 1. Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// 2. Dark/Light mode toggle
const toggleBtn = document.createElement('button');
toggleBtn.textContent = '🌙';
toggleBtn.className = 'btn';
toggleBtn.style.position = 'fixed';
toggleBtn.style.bottom = '20px';
toggleBtn.style.right = '20px';
toggleBtn.style.zIndex = '1000';
document.body.appendChild(toggleBtn);

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  toggleBtn.textContent = document.body.classList.contains('light-mode') ? '🌙' : '☀️';
});

// 3. Add light-mode CSS variables dynamically
const style = document.createElement('style');
style.innerHTML = `
  .light-mode {
    --bg: #f8fafc;
    --card: #ffffff;
    --text: #1e293b;
    --muted: #64748b;
    --accent: #0ea5e9;
  }
`;
document.head.appendChild(style);

// 4. Fade-in animation when scrolling
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
});

document.querySelectorAll('section, .card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
// 7. Hide loader when page finishes loading
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  loader.style.opacity = '0';
  setTimeout(() => loader.style.display = 'none', 500);
});

// 8. Parallax tilt effect - blocks move with cursor
document.querySelectorAll('.tilt').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // mouse x inside card
    const y = e.clientY - rect.top;  // mouse y inside card
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10; // tilt up/down
    const rotateY = (centerX - x) / 10; // tilt left/right
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
  });
});
const serviceSliderTrack = document.querySelector('.services-slider-section .slider-track');
if (serviceSliderTrack) {
    let isSliding = false;

    const slideForward = () => {
        if (isSliding || serviceSliderTrack.children.length === 0) return;
        isSliding = true;
        const firstSlide = serviceSliderTrack.firstElementChild;
        if (firstSlide) {
            firstSlide.classList.add('slide-exit');
        }
        serviceSliderTrack.style.transition = 'transform 0.8s ease';
        serviceSliderTrack.style.transform = 'translateX(-25%)';
    };

    const resetSlide = () => {
        const firstSlide = serviceSliderTrack.firstElementChild;
        if (firstSlide) {
            firstSlide.classList.remove('slide-exit');
        }
        serviceSliderTrack.style.transition = 'none';
        serviceSliderTrack.style.transform = 'translateX(0)';
        serviceSliderTrack.appendChild(serviceSliderTrack.firstElementChild);
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                serviceSliderTrack.style.transition = 'transform 0.8s ease';
                isSliding = false;
            });
        });
    };

    serviceSliderTrack.addEventListener('transitionend', resetSlide);
    setInterval(slideForward, 5300);
}