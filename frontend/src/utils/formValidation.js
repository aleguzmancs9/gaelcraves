// src/utils/validation.js

export const validators = {
  email: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  required: (value) => {
    return value !== null && value !== undefined && value !== '';
  },

  minLength: (value, length) => {
    return value && value.length >= length;
  },

  maxLength: (value, length) => {
    return value && value.length <= length;
  },

  phone: (phone) => {
    const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
    return phoneRegex.test(phone);
  },

  creditCard: (number) => {
    // Basic Luhn algorithm check
    const digits = number.replace(/\s/g, '');
    let sum = 0;
    let alternate = false;

    for (let i = digits.length - 1; i >= 0; i--) {
      let n = parseInt(digits[i], 10);

      if (alternate) {
        n *= 2;
        if (n > 9) {
          n = (n % 10) + 1;
        }
      }

      sum += n;
      alternate = !alternate;
    }

    return sum % 10 === 0;
  },
};

export const validateForm = (formData, rules) => {
  const errors = {};

  Object.keys(rules).forEach((field) => {
    const fieldRules = rules[field];
    const value = formData[field];

    fieldRules.forEach((rule) => {
      if (typeof rule === 'function') {
        const isValid = rule(value);
        if (!isValid) {
          if (!errors[field]) errors[field] = [];
          errors[field].push(`${field} is invalid`);
        }
      } else if (typeof rule === 'object') {
        const { validator, message } = rule;
        const isValid = validator(value);
        if (!isValid) {
          if (!errors[field]) errors[field] = [];
          errors[field].push(message);
        }
      }
    });
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const commonValidationRules = {
  email: [
    { validator: validators.required, message: 'Email is required' },
    { validator: validators.email, message: 'Please enter a valid email' },
  ],
  password: [
    { validator: validators.required, message: 'Password is required' },
    { validator: (value) => validators.minLength(value, 8), message: 'Password must be at least 8 characters' },
  ],
  name: [
    { validator: validators.required, message: 'Name is required' },
    { validator: (value) => validators.minLength(value, 2), message: 'Name must be at least 2 characters' },
  ],
};
