// Auto show main content
    setTimeout(() => {
      document.getElementById('main-content').style.display = 'block';
    }, 3200);

    const toggleBtn = document.getElementById('theme-toggle');
  const body = document.body;

  // Load saved theme from localStorage
  const themeToggle = document.getElementById("theme-toggle");
const icon = themeToggle.querySelector("i");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  } else {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  }
});


        // Mobile menu toggle
         const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate__animated');
            entry.target.classList.add('animate__fadeInUp');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-card').forEach(item => {
    observer.observe(item);
});
document.querySelector('.profile-pic').onerror = function() {
    this.src = 'https://via.placeholder.com/150';
    this.alt = 'Profile Picture Placeholder';
};
