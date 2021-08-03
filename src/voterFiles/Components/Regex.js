const REGEX_CNIC = /^[0-9]{9}$/;
const REGEX_EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const ValidateCnic = cnic => {
    return REGEX_CNIC.test(cnic) ? true : false;
}

export const ValidateEmail = email => {
    return REGEX_EMAIL.test(email) ? true : false;
}