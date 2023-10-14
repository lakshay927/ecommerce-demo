
import { PayPalButtons } from "@paypal/react-paypal-js";
export default function PayPalApis() {
    const createOrder = (data) => {
        // Order is created on the server and the order id is returned
        return fetch("http://localhost:5000/api/neworder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // use the "body" param to optionally pass additional order information
            // like product skus and quantities
            body: JSON.stringify({
                cart: {
                    description: "toy",
                    cost: "200",

                    //"YOUR_PRODUCT_STOCK_KEEPING_UNIT",
                    sku: "ABC12",
                    // "YOUR_PRODUCT_QUANTITY",
                    quantity: "1",
                },

            }),
        })
            .then((response) => response.json())
            .then((order) => order.id);
    };
    const onApprove = (data) => {
        // Order is captured on the server and the response is returned to the browser
        return fetch("http://localhost:5000/api/capture-paypal-order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                orderID: data.orderID
            })
        })
            .then((response) => response.json());
    };
    return (
        <PayPalButtons
            createOrder={(data, actions) => createOrder(data, actions)}
            onApprove={(data, actions) => onApprove(data, actions)}
        />
    );
}
