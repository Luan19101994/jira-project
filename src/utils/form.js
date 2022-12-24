export const emailValidator = (_, value) => {
    if (!value || /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(value)) {
        return Promise.resolve();
    } else {
        return Promise.reject('Please enter the correct email format !');
    }
}
export const passwordValidtor = (rule, value, callback) => {
    if (!value || /^[a-zA-Z0-9]{6,}$/.test(value)) {
        return Promise.resolve();
    } else {
        return Promise.reject('Password must be at least 6 characters!');
    }
};
export const phoneNumberValidtor = (rule, value, callback) => {
    if (!value || /((09|03|07|08|05|\+849|\+843|\+847|\+848|\+845)+([0-9]{8})\b)/g.test(value)) {
        return Promise.resolve();
    } else {
        return Promise.reject('Enter the correct phone number format!');
    }
};