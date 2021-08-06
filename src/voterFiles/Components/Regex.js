const REGEX_CNIC = /^[0-9]{13}$/;
const REGEX_EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const REGEX_ADDRESS = /^0x[a-fA-F0-9]{40}$/;

export const ValidateCnic = cnic => {
    return REGEX_CNIC.test(cnic) ? true : false;
}

export const ValidateEmail = email => {
    return REGEX_EMAIL.test(email) ? true : false;
}

export const ValidateAddress = address => {
    return REGEX_ADDRESS.test(address) ? true : false;
}