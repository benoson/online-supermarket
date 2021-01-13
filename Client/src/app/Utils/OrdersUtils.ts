import Order from "../models/Order";
import UsersUtils from "./UsersUtils";

export default class OrdersUtils {
    public constructor() {};


    // ----- UI validations

    static validateOrderDetails = (orderDetails: Order): boolean | void => {
        UsersUtils.validateUserCity(orderDetails.deliveryCity);
        UsersUtils.validateUserStreet(orderDetails.deliveryStreet);
        OrdersUtils.validateDeliveryDate(orderDetails.deliveryDate);
        OrdersUtils.validateCreditCardNumber(orderDetails.creditCardNumber);

        return true;
    }

    static validateDeliveryDate = (deliveryDate: string) => {
        const currentDate = new Date().setHours(0, 0, 0, 0);
        const deliveryDateToBe = new Date(deliveryDate).setHours(0, 0, 0, 0);

        // Checking if the delivery date is not in the past
        if (deliveryDateToBe >= currentDate) {
            return true;
        }

        else {
            throw Error("Delivery date can't be in the past");
        }
    }

    static validateCreditCardNumber = (creditCardNumber: any): boolean | Error => {
        if (typeof creditCardNumber === "number") {
            const creditCardNumberTrimmedStr = creditCardNumber.toString().trim();
            if (creditCardNumberTrimmedStr.length === 16) {
                return true;
            }
            throw Error("Credit card must be 16 digits long");
        }
        throw Error("Invalid credit card");
    }
}