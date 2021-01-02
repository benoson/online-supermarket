import crypto from 'crypto';
import ServerError from '../errors/ServerError';
import ErrorType from '../errors/errorType';


export default class UsersUtils {
    constructor() {}

    // ----- Validations

    public static validateUserID = (ID: number): boolean => {
        const IDToString = ID.toString();
        if (IDToString.length == 9) {
            return true;
        }
        throw new ServerError(ErrorType.INVALID_ID);
    }
    
    public static validateUserEmail = (email: string): boolean => {
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
    
    public static validateUserPassword = (password: string | number, verifiedPassword: string | number): boolean => {
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
    
    public static validateUserFirstName = (firstName: string): boolean => {
        const trimmedFirstName = firstName.trim();

        if (trimmedFirstName.length >= 2 && trimmedFirstName.length <= 15) {
            return true;
        }
        throw new ServerError(ErrorType.INVALID_FIRST_NAME_LENGTH);
    }
    
    public static validateUserLastName = (lastName: string): boolean => {
        const trimmedLastName = lastName.trim();

        if (trimmedLastName.length >= 2 && trimmedLastName.length <= 15) {
            return true;
        }
        throw new ServerError(ErrorType.INVALID_LAST_NAME_LENGTH);
    }
    
    public static validateUserCity = (city: string): boolean => {
        const trimmedCity = city.trim();

        if (trimmedCity.length >= 2 && trimmedCity.length <= 15) {
            return true;
        }
        throw new ServerError(ErrorType.INVALID_CITY_LENGTH);
    }
    
    public static validateUserStreet = (street: string): boolean => {
        const trimmedStreet = street.trim();

        if (trimmedStreet.length >= 2 && trimmedStreet.length <= 15) {
            return true;
        }
        throw new ServerError(ErrorType.INVALID_STREET_LENGTH);
    }

    
    // ----- Hashing

    /*
        @This function salts the password
    */
    public static getSaltedPassword = (password: string): string => {
        const leftPasswordSalt = '!@$g00gl3A$$i$t4nt$@!';
        const rightPasswordSalt = 'I-L0v3-Fu115t4ck';
        const saltedPassword = leftPasswordSalt + password + rightPasswordSalt;

        return saltedPassword;
    }

    public static getHashedPassword = (saltedPassword: string): string => {
        return crypto.createHash('md5').update(saltedPassword).digest('hex');
    }
}