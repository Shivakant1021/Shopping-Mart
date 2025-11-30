export const validationRegx = {
    username: /^[a-zA-Z\s]{3,30}$/, // only allows alphabets and spaces, min 3 to max 30 characters
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // simple email validation
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@#$%^&+=!]{8,}$/,

};
