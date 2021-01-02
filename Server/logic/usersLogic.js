const UsersUtils = require('../models/UsersUtils');


const validateUserInfo = (userInfo) => {
    try {
        UsersUtils.validateUserID(userInfo.ID);
        UsersUtils.validateUserEmail(userInfo.email);
        UsersUtils.validateUserPassword(userInfo.password, userInfo.verifiedPassword);
        UsersUtils.validateUserFirstName(userInfo.firstName);
        UsersUtils.validateUserLastName(userInfo.lastName);
        UsersUtils.validateUserCity(userInfo.city);
        UsersUtils.validateUserStreet(userInfo.street);

        return true;
    }
    catch(error) {
        console.log(error);
    }
}

const addUser = async (userInfo) => {
    // const isUserExistByID = await usersDao.isUserExistByID(userInfo.ID);

    // checking if the user's ID already exists
    // if (isUserExistByID) {
        // throw new ServerError(ErrorType.ID_ALREADY_EXIST);
    // }

    // checking if the user info is valid
    const isUserInfoValid = validateUserInfo(userInfo);

    if (isUserInfoValid) {
        const saltedPassword = UsersUtils.getSaltedPassword(userInfo.password);
        const hashedPassword = generateHashedPassword(saltedPassword);
        userInfo.password = hashedPassword;

        // await usersDao.addUser(userInfo);
    }

    return {
        token: "b1e2n3",
        userType: "USER",
        firstName: userInfo.firstName
    }
}

module.exports = {
    addUser
}