import SuccessfulLoginServerResponse from "../models/SuccessfulLoginServerResponse";
import UserRegistrationDetails from "../models/UserRegistrationDetials";


export default class UsersUtils {
    public constructor() { };


    // ----- Succesful login handler

    /**
     * Inserting a succesfull server response data into the session storage.
     * @param succesfulServerResponse - of type `SuccesfulLoginServerResponse`.
     */
    static insertUserInfoToSessionStorage = (succesfulServerResponse: SuccessfulLoginServerResponse): void => {
        console.log(succesfulServerResponse);
        
        const userToken = succesfulServerResponse.token;
        const userType = succesfulServerResponse.userType;
        const firstName = succesfulServerResponse.firstName;
        const userInfoFromServer = new SuccessfulLoginServerResponse(userToken, userType, firstName);
  
        // inserting the user's info to the sessionStorage
        sessionStorage.setItem('userInfo', JSON.stringify(userInfoFromServer));
    }


    // ----- UI validations

    static validateAllRegistrationFields = (userRegistrationDetails: UserRegistrationDetails): void | boolean => {
        UsersUtils.validateUserID(userRegistrationDetails.ID);
        UsersUtils.validateUserEmail(userRegistrationDetails.email);
        UsersUtils.validateUserPassword(userRegistrationDetails.password, userRegistrationDetails.verifiedPassword);
        UsersUtils.validateUserFirstName(userRegistrationDetails.firstName);
        UsersUtils.validateUserLastName(userRegistrationDetails.lastName);
        UsersUtils.validateUserCity(userRegistrationDetails.city);
        UsersUtils.validateUserStreet(userRegistrationDetails.street);
    }

    static validateUserID = (ID: any): boolean | string => {
        if (typeof ID === "number") {
            const IDToString = ID.toString();
            if (IDToString.length == 9) {
                return true;
            }
            throw Error("ID must be 9 digits long");
        }
        throw Error("Invalid ID");
    };
    
    static validateUserEmail = (email: any): boolean | string => {
        const trimmedEmail = email.trim();
    
        // validating the email is in valid format, using RegExp
        const emailRegExp = /\S+@\S+\.\S+/;
        const isEmailRegExpValid = emailRegExp.test(trimmedEmail);

        if (isEmailRegExpValid) {
            if (trimmedEmail.length <= 35) {
                return true;
            }
            throw Error("Email can't exceed 35 characters");
        }
        throw Error("Email format should be as follows: john@doe.com");
    };
    
    static validateUserPassword = (password: any, verifiedPassword: any): boolean | string => {
        const passwordToString = password.toString();
        const verifiedPasswordToString = verifiedPassword.toString();

        const trimmedPassword = passwordToString.trim();
        const trimmedVerifiedPassword = verifiedPasswordToString.trim();
    
        if (trimmedPassword.length >= 6 && trimmedPassword.length <= 15) {
            if (trimmedPassword === trimmedVerifiedPassword) {
                return true;
            }
            throw Error("Passwords do not match");
        }
        throw Error("Password should be between 6 - 15 characters");
    };
    
    static validateUserFirstName = (firstName: string): boolean | string => {
        const trimmedFirstName = firstName.trim();

        if (trimmedFirstName.length >= 2 && trimmedFirstName.length <= 15) {
            return true;
        }
        throw Error("First name should be between 2 - 15 characters");
    };
    
    static validateUserLastName = lastName => {
        const trimmedLastName = lastName.trim();

        if (trimmedLastName.length >= 2 && trimmedLastName.length <= 15) {
            return true;
        }
        throw Error("Last name should be between 2 - 15 characters");
    };
    
    static validateUserCity = city => {
        const trimmedCity = city.trim();

        if (trimmedCity.length >= 2 && trimmedCity.length <= 15) {
            return true;
        }
        throw Error("City should be between 2 - 15 characters");
    };
    
    static validateUserStreet = street => {
        const trimmedStreet = street.trim();

        if (trimmedStreet.length >= 2 && trimmedStreet.length <= 15) {
            return true;
        }
        throw Error("Street should be between 2 - 15 characters");
    };
}