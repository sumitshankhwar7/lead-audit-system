export const validateEmail = (email) => {
  return String(email).toLowerCase().match(/\S+@\S+\.\S+/);
};

// ✅ ADD THIS
export const validateForm = (data) => {
  const errors = {};

  if (!data.businessName) {
    errors.businessName = 'Business name is required';
  }

  if (!data.industry) {
    errors.industry = 'Industry is required';
  }

  if (data.email && !validateEmail(data.email)) {
    errors.email = 'Invalid email';
  }

  return errors;
};
