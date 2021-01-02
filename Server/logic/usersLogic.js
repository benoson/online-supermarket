const ErrorType = require('../errors/errorType');
const ServerError = require('../errors/ServerError');
const UsersUtils = require('../models/UsersUtils');
const usersDao = require('../dao/usersDao');


/**
  @param userInfo of type `UserRegistrationDetails`
**/
const validateUserInfo = (userInfo) => {
    UsersUtils.validateUserID(userInfo.ID);
    UsersUtils.validateUserEmail(userInfo.email);
    UsersUtils.validateUserPassword(userInfo.password, userInfo.verifiedPassword);
    UsersUtils.validateUserFirstName(userInfo.firstName);
    UsersUtils.validateUserLastName(userInfo.lastName);
    UsersUtils.validateUserCity(userInfo.city);
    UsersUtils.validateUserStreet(userInfo.street);
    return true;
}

const addUser = async (userInfo) => {
    const isUserExistByID = await usersDao.isUserExistByID(userInfo.ID);

    // checking if the user's ID already exists
    if (isUserExistByID) {
        throw new ServerError(ErrorType.ID_ALREADY_EXIST);
    }

    // checking if the user info is valid
    const isUserInfoValid = validateUserInfo(userInfo);

    if (isUserInfoValid) {
        const saltedPassword = UsersUtils.getSaltedPassword(userInfo.password);
        const hashedPassword = UsersUtils.generateHashedPassword(saltedPassword);
        userInfo.hashedPassword = hashedPassword;

        await usersDao.addUser(userInfo);

        const succesfulLoginData = login(userInfo, true);
        return succesfulLoginData;

        return {
            token: "b1e2n3",
            userType: "USER",
            firstName: userInfo.firstName
        }
    }
}

const login = async (userInfo, isFreshUser) => {

    // Checking if the user is fresh (sent here from the registration function)
    if (!isFreshUser) {

        // Salting the user's password for a better Hash protection
        const saltedPassword = UsersUtils.getSaltedPassword(userInfo.password);

        // Changing the user's password to a Hashed password
        userInfo.hashedPassword = UsersUtils.generateHashedPassword(saltedPassword);
    }

    // Sending the user's data to the DAO preset, and waiting to get the response
    const userLoginData = await usersDao.login(userInfo);

    // Getting the user's type and name from the data received from the DAO preset
    const userID = userLoginData.ID;
    const userType = userLoginData.userType;
    const userFirstName = userLoginData.firstName;
    
    // Salting the user's email for a better token protection
    const saltedEmail = UsersUtils.generateSaltedEmail(userInfo.email);

    // Getting a token based on the salted email and a secret
    const token = UsersUtils.generateJWTtoken(saltedEmail);

    // Saving The User's Data To The Server's Cache
    saveUserDataToServerCache(userID, userName, userType, token);

    // Defining the result object that will be sent back to the 'controller' preset
    const userSuccessfulLoginServerResponse = {
        token: token,
        userType: userType,
        userName: userName
    }

    // Returning the 'successful login response' object to the 'controller' preset
    return userSuccessfulLoginServerResponse;
}

module.exports = {
    addUser
}