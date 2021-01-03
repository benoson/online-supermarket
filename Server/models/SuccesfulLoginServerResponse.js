class SuccesfulLoginServerResponse {
    constructor(token, userType, userFirstName) {
        this.token = token,
        this.userType = userType,
        this.userFirstName = userFirstName
     };
}

module.exports = SuccesfulLoginServerResponse;