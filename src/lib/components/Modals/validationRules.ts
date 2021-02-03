export const emailValidationObj = {
  required: {
    value: true,
    message: "Це поле є обов'язковим",
  },
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: 'Неправильний формат email',
  },
};

export const passwordValidationObj = {
  required: {
    value: true,
    message: "Це поле є обов'язковим",
  },
  minLength: {
    value: 4,
    message: 'Пароль повинен містити щонайменше 4 символи',
  },
  maxLength: {
    value: 16,
    message: 'Пароль повинен містити щонайбільше 16 символів',
  },
};
