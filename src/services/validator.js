export const validateAmount = (value) => {
  if (!value) return { Amount: "Field required" };

  const regEx = /^-?\d+(\.\d{1,2})?$/g;
  let isValid = regEx.test(value);
  if (!isValid)
    return { Amount: "Amount must be a valid number" };
  if (Number(value) <= 0)
    return { Amount: "Amount must be a positive number"};
  return {};
}

export const validateEmail = (email) => {
  if (!email) return { Email: "Field required" };
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))
    return { Email: "Username should be and email" };
  return {};
};

export const validatePassword = (password) => {
  if (!password) return { Password: "Field required" };
  if (password.length < 8) return { Password: "Password must have at least 8 chars"}
  return {};
};