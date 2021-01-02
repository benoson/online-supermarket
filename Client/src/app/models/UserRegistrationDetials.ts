export default class UserRegistrationDetails {
    public constructor(
        public ID: number,
        public email: string,
        public password: string,
        public verifiedPassword: string,
        public firstName: string,
        public lastName: string,
        public city: string,
        public street: string
    ) {}
}