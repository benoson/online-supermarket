export default class CartItem {
    public constructor(
        public itemID: number,
        public productID: number,
        public cartID: number,
        public amount: number,
        public totalPrice: number
    ) {};
}