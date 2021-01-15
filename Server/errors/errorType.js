// Defining an ENUM-like list, for specific errors definitions, and the data about the error

const ErrorType = {

    GENERAL_ERROR: {
        id: 1,
        httpCode: 600,
        message: "A General Error Has Occurred",
        isShowStackTrace: true,
    },

    USER_IS_NOT_AUTHENTICATED: {
        id: 2,
        httpCode: 401,
        message: "Login Failed, Invalid Username or Password",
        isShowStackTrace: true,
    },
    
    USER_IS_NOT_AUTHORIZED: {
        id: 3,
        httpCode: 404,
        message: "You are not authorized to do that",
        isShowStackTrace: true,
    },
  
    INVALID_ID: {
        id: 4,
        httpCode: 601,
        message: "Invalid ID",
        isShowStackTrace: true,
    },

    INVALID_ID_LENGTH: {
        id: 10,
        httpCode: 401,
        message: "ID Length should be 9 digits",
        isShowStackTrace: true,
    },

    ID_ALREADY_EXIST: {
        id: 4,
        httpCode: 601,
        message: "ID already exists",
        isShowStackTrace: true,
    },

    EMAIL_ALREADY_EXIST: {
        id: 98,
        httpCode: 401,
        message: "Email already exists",
        isShowStackTrace: true,
    },
  
    INVALID_EMAIL_LENGTH: {
        id: 9,
        httpCode: 401,
        message: "Invalid Email Length",
        isShowStackTrace: true,
    },

    INVALID_EMAIL_TYPE: {
        id: 13,
        httpCode: 401,
        message: "Invalid Email Type",
        isShowStackTrace: true,
    },

    INVALID_EMAIL_FORMAT: {
        id: 9,
        httpCode: 401,
        message: "Invalid Email Format",
        isShowStackTrace: true,
    },

    PASSWORDS_DO_NOT_MATCH: {
        id: 4,
        httpCode: 401,
        message: "Passwords do not match",
        isShowStackTrace: true,
    },
  
    INVALID_PASSWORD_LENGTH: {
        id: 5,
        httpCode: 401,
        message: "Invalid password length",
        isShowStackTrace: true,
    },

    INVALID_FIRST_NAME_TYPE: {
        id: 13,
        httpCode: 401,
        message: "Invalid First Name Type",
        isShowStackTrace: true,
    },
  
    INVALID_FIRST_NAME_LENGTH: {
        id: 10,
        httpCode: 401,
        message: "Invalid First Name Length",
        isShowStackTrace: true,
    },

    INVALID_LAST_NAME_TYPE: {
        id: 13,
        httpCode: 401,
        message: "Invalid Last Name Type",
        isShowStackTrace: true,
    },

    INVALID_LAST_NAME_LENGTH: {
        id: 10,
        httpCode: 401,
        message: "Invalid Last Name Length",
        isShowStackTrace: true,
    },

    INVALID_CITY_TYPE: {
        id: 99,
        httpCode: 401,
        message: "Invalid City Type",
        isShowStackTrace: true,
    },

    INVALID_CITY_LENGTH: {
        id: 10,
        httpCode: 401,
        message: "Invalid City Length",
        isShowStackTrace: true,
    },

    INVALID_STREET_TYPE: {
        id: 10,
        httpCode: 401,
        message: "Invalid Street Type",
        isShowStackTrace: true,
    },

    INVALID_STREET_LENGTH: {
        id: 10,
        httpCode: 401,
        message: "Invalid Street Length",
        isShowStackTrace: true,
    },

    USER_IS_NOT_LOGGED_IN: {
        id: 109,
        httpCode: 401,
        message: "User is not logged in",
        isShowStackTrace: true,
    },

    INVALID_PRODUCT_ID: {
        id: 918,
        httpCode: 401,
        message: 'Invalid product ID',
        isShowStackTrace: true
    },

    INVALID_PRODUCT_AMOUNT: {
        id: 918,
        httpCode: 401,
        message: 'Product amount can be between 1 - 99',
        isShowStackTrace: true
    },

    INVALID_DELIVERY_DATE: {
        id: 919,
        httpCode: 401,
        message: 'Invalid delivery date',
        isShowStackTrace: true
    },
    
    INVALID_CREDIT_CARD: {
        id: 919,
        httpCode: 401,
        message: 'Invalid credit card',
        isShowStackTrace: true
    },

    INVALID_CREDIT_CARD_LENGTH: {
        id: 919,
        httpCode: 401,
        message: 'Credit card number should be 16 digits long',
        isShowStackTrace: true
    },

    INVALID_PRODUCT_NAME: {
        id: 920,
        httpCode: 401,
        message: 'Invalid product name',
        isShowStackTrace: true
    },

    INVALID_PRODUCT_CATEGORY: {
        id: 921,
        httpCode: 401,
        message: 'Invalid product category',
        isShowStackTrace: true
    },

    INVALID_PRODUCT_DESCRIPTION: {
        id: 921,
        httpCode: 401,
        message: 'Invalid product description',
        isShowStackTrace: true
    },

    INVALID_PRODUCT_PRICE: {
        id: 921,
        httpCode: 401,
        message: 'Invalid product price',
        isShowStackTrace: true
    },

    INVALID_PRODUCT_IMAGE_URL: {
        id: 921,
        httpCode: 401,
        message: 'Invalid product image url',
        isShowStackTrace: true
    }
};
  
  module.exports = ErrorType;