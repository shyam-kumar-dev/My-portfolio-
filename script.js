document.addEventListener("DOMContentLoaded", function() {
        let btn = document.getElementById("backToTop");
        
        // Initially hide the button
        btn.style.display = "none";

        window.onscroll = function() {
            if (document.documentElement.scrollTop > 100) {
                btn.style.display = "block";
            } else {
                btn.style.display = "none";
            }
        };
    });

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
      document.getElementById("year").textContent = new Date().getFullYear();