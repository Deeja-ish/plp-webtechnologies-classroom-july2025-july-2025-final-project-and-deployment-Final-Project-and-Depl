document.addEventListener('DOMContentLoaded', () => {

    // 1. Navigation Smooth Scrolling Logic
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); 
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });


    // --- 2. Hero Image Carousel/Slider Logic ---
    const slides = document.querySelectorAll('.hero_slider .slide');
    const totalSlides = slides.length;
    let slideIndex = 0;
    const intervalTime = 5000;

    if (totalSlides > 0) {
        
        function showSlide(index) {
            slides.forEach(slide => {
                slide.classList.remove('active');
            });
            // 2. Calculate the new index, ensuring it loops
            if (index >= totalSlides) {
                slideIndex = 0;
            } else if (index < 0) {
                slideIndex = totalSlides - 1;
            } else {
                slideIndex = index; 
            }

            // 3. Add 'active' class to the current slide
            slides[slideIndex].classList.add('active');
        }

        // Function to move to the next slide
        function nextSlide() {
            showSlide(slideIndex + 1);
        }

        showSlide(0);

        setInterval(nextSlide, intervalTime);
    }
    
    // Outline for manual controls (if needed in future)
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.nav_list a');
    // --- 3. Contact Form Validation Logic
    const form = document.getElementById('contact_form'); 
    
    if (form) {
        // Helper function to display errors
        const displayError = (elementId, message) => {
            const errorElement = document.getElementById(elementId);
            const inputElement = document.getElementById(elementId.replace('Error', ''));
            
            if (errorElement) {
                errorElement.textContent = message;
            }
            if (inputElement) {
                inputElement.closest('.form_group').classList.add('error');
            }
        };

        // Helper function to clear errors
        const clearError = (elementId) => {
            const errorElement = document.getElementById(elementId);
            const inputElement = document.getElementById(elementId.replace('Error', ''));
            
            if (errorElement) {
                errorElement.textContent = '';
            }
            if (inputElement) {
                inputElement.closest('.form_group').classList.remove('error');
            }
        };

        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        // Validation function
        const validateForm = () => {
            let isValid = true;
            
            // 1. Name Validation (Required, Min 2 chars)
            const name = document.getElementById('name').value.trim();
            if (name === "") {
                displayError('nameError', 'Full Name is required.');
                isValid = false;
            } else if (name.length < 2) {
                displayError('nameError', 'Name must be at least 2 characters.');
                isValid = false;
            } else {
                clearError('nameError');
            }

            // 2. Email Validation (Required, Valid format)
            const email = document.getElementById('email').value.trim();
            if (email === "") {
                displayError('emailError', 'Email Address is required.');
                isValid = false;
            } else if (!emailRegex.test(email)) {
                displayError('emailError', 'Please enter a valid email address.');
                isValid = false;
            } else {
                clearError('emailError');
            }

            // 3. Subject Validation (Optional, but if entered, Min 5 chars)
            const subject = document.getElementById('subject').value.trim();
            if (subject.length > 0 && subject.length < 5) {
                displayError('subjectError', 'Subject must be at least 5 characters or left blank.');
                isValid = false;
            } else {
                clearError('subjectError');
            }

            // 4. Message Validation (Required, Min 10 chars)
            const message = document.getElementById('message').value.trim();
            if (message === "") {
                displayError('messageError', 'Message content is required.');
                isValid = false;
            } else if (message.length < 10) {
                displayError('messageError', 'Message must be at least 10 characters long.');
                isValid = false;
            } else {
                clearError('messageError');
            }
            
            return isValid;
        };

 
        form.addEventListener('submit', (event) => {
            if (!validateForm()) {
                event.preventDefault();
                alert('Please correct the errors in the form before submitting.'); 
            } else {
              
                alert('Form submitted successfully! (Simulated)');
            }
        });
        document.querySelectorAll('#name, #email, #subject, #message').forEach(input => {
            input.addEventListener('blur', validateForm);
            input.addEventListener('input', () => { 
                if (input.value.trim().length > 0) {
                    clearError(input.id + 'Error');
                }
            });
        });
    }
});