const ErrorType = require('../errors/errorType.js');
const ServerError = require('../errors/ServerError.js');
const UsersUtils = require('../models/UsersUtils.js');


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
    // if (isUserExistByID) {
        // throw new ServerError(ErrorType.ID_ALREADY_EXIST);
    // }

    // checking if the user info is valid
    const isUserInfoValid = validateUserInfo(userInfo);

    if (isUserInfoValid) {
        const saltedPassword = UsersUtils.getSaltedPassword(userInfo.password);
        const hashedPassword = UsersUtils.generateHashedPassword(saltedPassword);
        userInfo.password = hashedPassword;

        // await usersDao.addUser(userInfo);

        return {
            token: "b1e2n3",
            userType: "USER",
            firstName: userInfo.firstName
        }
    }
}

module.exports = {
    addUser
}