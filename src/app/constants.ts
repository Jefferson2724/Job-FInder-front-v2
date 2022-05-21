export const constants = {
    /* REGEX */
    NAME_REGEX: /^[a-zA-Z0-9àÀáéíóúÁÉÍÓÚâêôÂÊÔãñõÃÑÕäëïöüÄËÏÖÜçÇ]+([\ ]([a-zA-Z0-9àÀáéíóúÁÉÍÓÚâêôÂÊÔãñõÃÑÕäëïöüÄËÏÖÜçÇ])+)*$/i,
    CPF_REGEX: /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/,
    PASSWORD_REGEX: /(.*[A-Z]+.*[\W_]+.*)|(.*[\W_]+.*[A-Z]+.*)/,
    PHONE_NUMBER_REGEX: /^\d+$/,
    VERIFICATION_CODE_REGEX: /^\d{6}$/,
    PHONE_BASIC_REGEX: /^\d{5,16}$/,
    APPLICATION_USER_LOGIN_REGEX: /^([a-z0-9]+([\._\-]?[a-z0-9]+)*)$/i,
    ONLY_NUMBER_REGEX: /^[0-9]*$/,
    EMAIL_LOCAL_PART_REGEX: /^[a-z0-9]+([\._\-]?[a-z0-9]+)*$/i,
    EMAIL_DOMAIN_REGEX: /^[a-z0-9]+(([\-]?[a-z0-9]+)+\.)+[a-z]+$/i,
}
