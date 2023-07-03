export const validateCardDetails = ({ cardNumber, expiration, cvv }) => {
  const cardNumberRegex = /^[0-9]{12,19}$/;
  const expirationDateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
  const cvvRegex = /^[0-9]{3,4}$/;
  let errors = { cardNumber: true, expiration: true, cvv: true };
  if (!cardNumberRegex.test(cardNumber)) {
    errors = { ...errors, cardNumber: false };
  }

  if (!expirationDateRegex.test(expiration)) {
    errors = { ...errors, expiration: false };
  }

  if (!cvvRegex.test(cvv)) {
    errors = { ...errors, cvv: false };
  }

  return errors; // All card details are valid
};

// Example usage
const cardNumber = "1234567890123456";
const expirationDate = "12/24";
const cvv = "123";

const isValid = validateCardDetails(cardNumber, expirationDate, cvv);
console.log(isValid); // Output: true
