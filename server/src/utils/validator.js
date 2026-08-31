const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const isPasswordStrong = (password) => {
    return password.length >= 6;
};

module.exports = {
    isEmailValid,
    isPasswordStrong
};