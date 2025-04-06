///toggle About us section

document.getElementById('toggleAbout').addEventListener('click',
      function() {

            const moreAbout = document.getElementById('moreAbout');
            if (moreAbout.style.display === 'none') {moreAbout.style.display = 'block';
                  this.textContent = 'show less';
            } else {moreAbout.style.display ='none';
                  this.textContent ='show more';
            }
      }
);

document.addEventListener('DOMContentLoaded', function() {
      const loginForm = document.getElementById('loginForm');
      const errorMessage = document.getElementById('error-message');
      
      // Check for remember me cookie
      if (localStorage.getItem('rememberEmail')) {
          document.getElementById('email').value = localStorage.getItem('rememberEmail');
          document.getElementById('remember').checked = true;
      }
      
      loginForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          const email = document.getElementById('email').value;
          const password = document.getElementById('password').value;
          const remember = document.getElementById('remember').checked;
          
          // Client-side validation
          if (!email || !password) {
              errorMessage.textContent = 'Please fill in all fields';
              return;
          }
          
          // Store email if remember me is checked
          if (remember) {
              localStorage.setItem('rememberEmail', email);
          } else {
              localStorage.removeItem('rememberEmail');
          }
          
          // Submit form via AJAX
          const formData = new FormData(loginForm);
          
          fetch('index.php', {
              method: 'POST',
              body: formData
          })
          .then(response => response.json())
          .then(data => {
              if (data.success) {
                  window.location.href = 'dashboard.php';
              } else {
                  errorMessage.textContent = data.message || 'Login failed';
              }
          })
          .catch(error => {
              errorMessage.textContent = 'An error occurred. Please try again.';
          });
      });
  });