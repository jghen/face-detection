// Name must contain at least 1 character
export const validateName = (myName) => {
  return (
    typeof myName === 'string' &&
    /[A-Za-z]/.test(myName)
  );
};

// email must be a@b.c
export const validateEmail = (email) => {
  if (typeof email !== "string") return false;
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};

// password must contain at least 1 number and 1 character
export const validatePassword = (password) => {
  return (
    typeof password === "string" &&
    password.length > 4 &&
    /[a-zA-z]/.test(password) &&
    /[0-9]/.test(password)
  );
};

// export const validatePassword = (password) => {
//   return (
//     typeof password === "string" &&
//     password.length > 4 &&
//     /[A-Z]/.test(password) &&
//     /[a-z]/.test(password) &&
//     /[0-9]/.test(password) &&
//     /[^A-Za-z0-9]/.test(password)
//   );
// };
