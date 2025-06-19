document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const successMessage = document.getElementById('successMessage');
    
    // Password strength indicator
    const passwordInput = document.getElementById('password');
    const passwordStrength = document.getElementById('passwordStrength');
    
    passwordInput.addEventListener('input', function() {
        const strength = calculatePasswordStrength(this.value);
        updateStrengthIndicator(strength);
    });
    
    function calculatePasswordStrength(password) {
        let strength = 0;
        
        // Length check
        if (password.length > 0) strength += 20;
        if (password.length >= 8) strength += 20;
        
        // Character diversity
        if (password.match(/[A-Z]/)) strength += 20;
        if (password.match(/[0-9]/)) strength += 20;
        if (password.match(/[^A-Za-z0-9]/)) strength += 20;
        
        return Math.min(strength, 100);
    }
    
    function updateStrengthIndicator(strength) {
        passwordStrength.style.width = strength + '%';
        
        if (strength < 40) {
            passwordStrength.style.backgroundColor = '#ef4444';
        } else if (strength < 70) {
            passwordStrength.style.backgroundColor = '#f59e0b';
        } else {
            passwordStrength.style.backgroundColor = '#10b981';
        }
    }
    
    // Form validation
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset previous states
        resetValidation();
        
        // Validate fields
        const isValidName = validateName();
        const isValidEmail = validateEmail();
        const isValidPhone = validatePhone();
        const isValidPassword = validatePassword();
        const isValidConfirmPassword = validateConfirmPassword();
        const isValidBirthdate = validateBirthdate();
        const isValidTerms = validateTerms();
        
        if (isValidName && isValidEmail && isValidPassword && isValidConfirmPassword && isValidTerms) {
            // Form is valid - show success message
            successMessage.style.display = 'block';
            form.reset();
            passwordStrength.style.width = '0%';
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        }
    });
    
    function resetValidation() {
        // Reset all error states
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.classList.remove('input-error');
            input.classList.remove('input-success');
        });
        
        const errorMessages = form.querySelectorAll('.error-message');
        errorMessages.forEach(message => {
            message.style.display = 'none';
        });
    }
    
    function validateName() {
        const nameInput = document.getElementById('fullName');
        const nameError = document.getElementById('nameError');
        
        if (nameInput.value.trim().length < 3) {
            nameInput.classList.add('input-error');
            nameError.style.display = 'block';
            return false;
        }
        
        nameInput.classList.add('input-success');
        return true;
    }
    
    function validateEmail() {
        const emailInput = document.getElementById('email');
        const emailError = document.getElementById('emailError');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(emailInput.value)) {
            emailInput.classList.add('input-error');
            emailError.style.display = 'block';
            return false;
        }
        
        emailInput.classList.add('input-success');
        return true;
    }
    
    function validatePhone() {
        const phoneInput = document.getElementById('phone');
        const phoneError = document.getElementById('phoneError');
        
        // Phone is optional, but if provided, validate it
        if (phoneInput.value && !/^\d{10}$/.test(phoneInput.value.replace(/\D/g, ''))) {
            phoneInput.classList.add('input-error');
            phoneError.style.display = 'block';
            return false;
        }
        
        if (phoneInput.value) {
            phoneInput.classList.add('input-success');
        }
        return true;
    }
    
    function validatePassword() {
        const passwordInput = document.getElementById('password');
        const passwordError = document.getElementById('passwordError');
        
        if (passwordInput.value.length < 8 || 
            !passwordInput.value.match(/[0-9]/) || 
            !passwordInput.value.match(/[^A-Za-z0-9]/)) {
            passwordInput.classList.add('input-error');
            passwordError.style.display = 'block';
            return false;
        }
        
        passwordInput.classList.add('input-success');
        return true;
    }
    
    function validateConfirmPassword() {
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirmPassword');
        const confirmPasswordError = document.getElementById('confirmPasswordError');
        
        if (confirmPasswordInput.value !== passwordInput.value) {
            confirmPasswordInput.classList.add('input-error');
            confirmPasswordError.style.display = 'block';
            return false;
        }
        
        confirmPasswordInput.classList.add('input-success');
        return true;
    }
    
    function validateBirthdate() {
        const birthdateInput = document.getElementById('birthdate');
        const birthdateError = document.getElementById('birthdateError');
        
        // Birthdate is optional, but if provided, validate age
        if (birthdateInput.value) {
            const birthdate = new Date(birthdateInput.value);
            const today = new Date();
            const age = today.getFullYear() - birthdate.getFullYear();
            
            if (age < 13) {
                birthdateInput.classList.add('input-error');
                birthdateError.style.display = 'block';
                return false;
            }
            
            birthdateInput.classList.add('input-success');
        }
        
        return true;
    }
    
    function validateTerms() {
        const termsInput = document.getElementById('terms');
        const termsError = document.getElementById('termsError');
        
        if (!termsInput.checked) {
            termsInput.classList.add('input-error');
            termsError.style.display = 'block';
            return false;
        }
        
        termsInput.classList.add('input-success');
        return true;
    }
    
    // Real-time validation for better UX
    document.getElementById('fullName').addEventListener('blur', validateName);
    document.getElementById('email').addEventListener('blur', validateEmail);
    document.getElementById('phone').addEventListener('blur', validatePhone);
    document.getElementById('password').addEventListener('blur', validatePassword);
    document.getElementById('confirmPassword').addEventListener('blur', validateConfirmPassword);
    document.getElementById('birthdate').addEventListener('change', validateBirthdate);
    document.getElementById('terms').addEventListener('change', validateTerms);
});
