export default class Product {
    public constructor(
        public ID: number,
        public name: string,
        public description: string,
        public category: string,
        public price: number,
        public imageURL: string
    ) {};
}