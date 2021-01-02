const ServerError = require('../errors/ServerError')
const ErrorType = require('../errors/errorType')
const crypto = require('crypto')

class UsersUtils {
    constructor() {}

    // ----- Validations

    static validateUserID = (ID) => {
        if (typeof ID === "number") {
            const IDToString = ID.toString();
            if (IDToString.length == 9) {
                return true;
            }
            throw new ServerError(ErrorType.INVALID_ID_LENGTH)
        }
        throw new ServerError(ErrorType.INVALID_ID);
    }
    
    static validateUserEmail = (email) => {
        if (typeof email === "string") {
            const trimmedEmail = email.trim();
        
            // validating the email is in valid format, using RegExp
            const emailRegExp = /\S+@\S+\.\S+/;
            const isEmailRegExpValid = emailRegExp.test(trimmedEmail);
    
            if (isEmailRegExpValid) {
                if (trimmedEmail.length <= 25) {
                    return true;
                }
                throw new ServerError(ErrorType.INVALID_EMAIL_LENGTH);
            }
            throw new ServerError(ErrorType.INVALID_EMAIL_FORMAT);
        }
        throw new ServerError(ErrorType.INVALID_EMAIL_TYPE);
    }
    
    static validateUserPassword = (password, verifiedPassword) => {
        const passwordToString = password.toString();
        const verifiedPasswordToString = verifiedPassword.toString();

        const trimmedPassword = passwordToString.trim();
        const trimmedVerifiedPassword = verifiedPasswordToString.trim();
    
        if (trimmedPassword.length >= 6 && trimmedPassword.length <= 15) {
            if (trimmedPassword === trimmedVerifiedPassword) {
                return true;
            }
            throw new ServerError(ErrorType.PASSWORDS_DO_NOT_MATCH);
        }
        throw new ServerError(ErrorType.INVALID_PASSWORD_LENGTH);
    }
    
    static validateUserFirstName = (firstName) => {
        if (typeof firstName === "string") {
            const trimmedFirstName = firstName.trim();
    
            if (trimmedFirstName.length >= 2 && trimmedFirstName.length <= 15) {
                return true;
            }
            throw new ServerError(ErrorType.INVALID_FIRST_NAME_LENGTH);
        }
        throw new ServerError(ErrorType.INVALID_FIRST_NAME_TYPE);
    }
    
    static validateUserLastName = (lastName) => {
        if (typeof lastName === "string") {
            const trimmedLastName = lastName.trim();
    
            if (trimmedLastName.length >= 2 && trimmedLastName.length <= 15) {
                return true;
            }
            throw new ServerError(ErrorType.INVALID_LAST_NAME_LENGTH);
        }
        throw new ServerError(ErrorType.INVALID_LAST_NAME_TYPE);
    }
    
    static validateUserCity = (city) => {
        if (typeof city === "string") {
            const trimmedCity = city.trim();
    
            if (trimmedCity.length >= 2 && trimmedCity.length <= 15) {
                return true;
            }
            throw new ServerError(ErrorType.INVALID_CITY_LENGTH);
        }
        throw new ServerError(ErrorType.INVALID_CITY_TYPE);
    }
    
    static validateUserStreet = (street) => {
        if (typeof street === "string") {
            const trimmedStreet = street.trim();
    
            if (trimmedStreet.length >= 2 && trimmedStreet.length <= 15) {
                return true;
            }
            throw new ServerError(ErrorType.INVALID_STREET_LENGTH);
        }
        throw new ServerError(ErrorType.INVALID_STREET_TYPE);
    }

    
    // ----- Hashing

    /**
     * This function salts the password
     * @param password of type string
     */
    static getSaltedPassword = (password) => {
        const leftPasswordSalt = '!@$g00gl3A$$i$t4nt$@!';
        const rightPasswordSalt = 'I-L0v3-Fu115t4ck';
        const saltedPassword = leftPasswordSalt + password + rightPasswordSalt;

        return saltedPassword;
    }

    /**
     * This function hashes the password
     * @param saltedPassword of type string
     */
    static generateHashedPassword = (saltedPassword) => {
        return crypto.createHash('md5').update(saltedPassword).digest('hex');
    }
}

module.exports = UsersUtils;