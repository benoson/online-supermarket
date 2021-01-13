export default class Order {
    public constructor(
        public deliveryCity: string,
        public deliveryStreet: string,
        public deliveryDate: string,
        public creditCardNumber: number
    ) {}
}