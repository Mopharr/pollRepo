export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-+])[A-Za-z\d!@#$%^&*()-+]{8,}$/;

  return passwordRegex.test(password);
};

export const validatePhoneNumber = (phoneNumber: string): boolean => {
  // Assuming phone number consists only of digits and is maximum 12 characters long
  const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;

  return phoneRegex.test(phoneNumber);
};

export const validateString = (value: string): boolean => {
  return value.trim().length > 3;
};

export const validateSecondPassword = (
  password_1: string,
  password_2: string
): boolean => {
  return password_1 === password_2;
};

type Dob = {
  day: string;
  month: string;
  year: string;
};

export const validateDob = (dob: Dob) => {
  return dob.day.length > 0 && dob.month.length > 0 && dob.year.length > 0;
};

export const validateGender = (gender: string): boolean => {
  return gender.trim().length > 0;
};
