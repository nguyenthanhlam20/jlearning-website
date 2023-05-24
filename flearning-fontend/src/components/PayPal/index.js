
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
const PayPal = (props) => {
    const { isOpen, setIsOpen } = props;
    return <>
         <Dialog open={isOpen} >
            <DialogTitle >MUA KHÓA HỌC</DialogTitle>
            <DialogContent>
                <PayPalScriptProvider options={{ "client-id": "test" }}>
                    <PayPalButtons

                        createOrder={(data, actions) => {
                            return actions.order.create({
                                purchase_units: [
                                    {
                                        amount: {
                                            value: "1000000",
                                            currency_code: "USD"
                                        }
                                    }
                                ]
                            });
                        }}
                        onApprove={(data, actions) => {
                            return actions.order.capture().then(function (details) {
                                // Show a success message to the buyer
                            });
                        }}
                        onCancel={() => {
                            window.alert("cancel");
                        }}
                        style={{ layout: "horizontal" }} />
                </PayPalScriptProvider>
            </DialogContent>
        </Dialog>
    </>
}

export default PayPal;