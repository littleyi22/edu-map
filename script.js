document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('lightbox-modal');
  const modalBody = document.getElementById('modal-body');
  const btnCloseModal = document.getElementById('btn-close-modal');
  
  // Modal Logic
  window.openModal = function(type, src) {
    modalBody.innerHTML = ''; // clear previous content
    
    if (type === 'pdf') {
      const iframe = document.createElement('iframe');
      iframe.src = src;
      modalBody.appendChild(iframe);
    } else if (type === 'image') {
      const img = document.createElement('img');
      img.src = src;
      modalBody.appendChild(img);
    } else if (type === 'youtube') {
      const iframe = document.createElement('iframe');
      
      // Auto-parse YouTube URL to Embed format to fix Error 153 (playback restricted)
      let videoId = '';
      if (src.includes('youtu.be/')) {
        videoId = src.split('youtu.be/')[1].split('?')[0];
      } else if (src.includes('/shorts/')) {
        videoId = src.split('/shorts/')[1].split('?')[0];
      } else if (src.includes('v=')) {
        videoId = src.split('v=')[1].split('&')[0];
      } else if (src.includes('/embed/')) {
        videoId = src.split('/embed/')[1].split('?')[0];
      }
      
      if (videoId) {
        iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0`;
      } else {
        iframe.src = src;
      }
      
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      modalBody.appendChild(iframe);
    }
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };
  
  window.closeModal = function() {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
    setTimeout(() => {
      modalBody.innerHTML = ''; // clear memory after animation
    }, 300);
  };
  
  btnCloseModal.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (modal.classList.contains('active') && e.key === 'Escape') {
      closeModal();
    }
  });

  // Intersection Observer for Scroll Reveal Animation
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Optional: only animate once
      }
    });
  }, observerOptions);

  document.querySelectorAll('.scroll-reveal').forEach(el => {
    observer.observe(el);
  });
});
