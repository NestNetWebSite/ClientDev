export const EMAIL_REGEXP =
    /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))/;
export const ID_REGEXP = /^(?=.*[a-zA-Z])(?=.*\d).{8,20}$/;
export const PASSWORD_REGEXP = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[\d]).{8,20}$/;
