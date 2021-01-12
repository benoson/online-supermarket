export default class CartItem {
    public constructor(
        public productID: number,
        public productName: string,
        public amount: number,
        public totalPrice: number
    ) { }
}