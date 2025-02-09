document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('validationForm');
    const submitBtn = document.getElementById('submitBtn');
    const resetBtn = document.getElementById('resetBtn');
    const validationToggle = document.getElementById('validationToggle');
    const resultContainer = document.getElementById('resultContainer');
    const resultTable = document.getElementById('resultTable');

    const validationRules = {
        fullName: {
            regex: /^[A-Za-z ]{3,}$/,
            errorMessage: 'Full name must contain only alphabets and be at least 3 characters long.'
        },
        email: {
            regex: /^\S+@\S+\.\S+$/,
            errorMessage: 'Please enter a valid email address.'
        },
        phone: {
            regex: /^\d{10,15}$/,
            errorMessage: 'Phone number must contain 10-15 digits only.'
        },
        username: {
            regex: /^[A-Za-z0-9]{5,}$/,
            errorMessage: 'Username must be alphanumeric and at least 5 characters long.'
        },
        password: {
            regex: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
            errorMessage: 'Password must be at least 8 characters long, contain 1 uppercase letter and 1 number.'
        },
        zipCode: {
            regex: /^\d{5,6}$/,
            errorMessage: 'ZIP code must be 5 or 6 digits.'
        },
        dob: {
            regex: /^\d{2}\/\d{2}\/\d{4}$/,
            errorMessage: 'Date of Birth must be in DD/MM/YYYY format.'
        }
    };

    function validateInput(input) {
        if (!validationToggle.checked) {
            clearValidation(input);
            return;
        }

        const field = input.id;
        const value = input.value;
        const validationMessage = document.getElementById(`${field}Validation`);
        const rule = validationRules[field];

        if (rule.regex.test(value)) {
            validationMessage.textContent = '✅ Valid';
            validationMessage.className = 'validation-message valid';
            input.setCustomValidity('');
        } else {
            validationMessage.textContent = `❌ ${rule.errorMessage}`;
            validationMessage.className = 'validation-message invalid';
            input.setCustomValidity(rule.errorMessage);
        }
    }

    function clearValidation(input) {
        const field = input.id;
        const validationMessage = document.getElementById(`${field}Validation`);
        validationMessage.textContent = '';
        validationMessage.className = 'validation-message';
        input.setCustomValidity('');
    }

    function toggleValidation() {
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            if (validationToggle.checked) {
                input.required = true;
                if (input.type === 'email') {
                    input.type = 'email';
                }
                validateInput(input);
            } else {
                input.required = false;
                if (input.type === 'email') {
                    input.type = 'text';
                }
                clearValidation(input);
            }
        });
    }

    // Add event listeners to all input fields
    Object.keys(validationRules).forEach(field => {
        const input = document.getElementById(field);
        input.addEventListener('input', () => validateInput(input));
    });

    validationToggle.addEventListener('change', toggleValidation);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!validationToggle.checked || form.checkValidity()) {
            displayResults();
        } else {
            alert('Please fill out all fields correctly.');
        }
    });

    resetBtn.addEventListener('click', () => {
        const validationMessages = document.querySelectorAll('.validation-message');
        validationMessages.forEach(message => {
            message.textContent = '';
            message.className = 'validation-message';
        });
        resultContainer.style.display = 'none';
    });

    function displayResults() {
        const tbody = resultTable.querySelector('tbody');
        tbody.innerHTML = '';

        Object.keys(validationRules).forEach(field => {
            const input = document.getElementById(field);
            const row = document.createElement('tr');
            const fieldCell = document.createElement('td');
            const valueCell = document.createElement('td');

            fieldCell.textContent = input.previousElementSibling.textContent;
            valueCell.textContent = input.value;

            row.appendChild(fieldCell);
            row.appendChild(valueCell);
            tbody.appendChild(row);
        });

        resultContainer.style.display = 'block';
    }

    // Initial toggle to set the correct state
    toggleValidation();
});