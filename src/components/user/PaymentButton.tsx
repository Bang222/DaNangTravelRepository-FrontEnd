import {FC} from 'react';
import * as React from "react";
import Button from '@mui/joy/Button';
import {FUNDING, PayPalButtons, PayPalScriptProvider} from "@paypal/react-paypal-js";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";

interface PaymentButtonProps {
    InputTotalPrice: number
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    setPayment: React.Dispatch<React.SetStateAction<boolean>>
    userId: string
    accessToken: string
    paymentId:string | undefined
    mutateBooking: () => void
}

const PaymentButton: FC<PaymentButtonProps> = ({mutateBooking, accessToken, userId, InputTotalPrice, openModal, setOpenModal, setPayment,paymentId}) => {
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    const vndToDollar: number = 24000
    const [errorDataBaking, setErrorDataBaking] = React.useState<string>()
    const [successDataBaking, setSuccessDataBaking] = React.useState<boolean>(false)
    const [paidFor, setPaidFor] = React.useState<boolean>(false)
    const styleButtonPaypal = {
        color: "silver",
        layout: "horizontal",
        tagline: 'false',
        shape: 'pill',
        borderRadius: '30px'
    }
    const initialOptions  = {
        clientId: paymentId,
        currency: "USD",
        intent: "capture",
    };
    console.log("null",paymentId)
    return (
        <div className={'w-full'}>
            <div className={'nh:flex justify-between'}>
                <button className={'w-full'}>
                   <PayPalScriptProvider options={initialOptions}>
                        <PayPalButtons
                            style={styleButtonPaypal}
                            createOrder={(data, actions) => {
                                return actions.order.create({
                                    purchase_units: [{
                                        amount: {
                                            value: `${(InputTotalPrice / vndToDollar).toFixed(2)}`,
                                            currency_code: "USD"
                                        }

                                    }],
                                    application_context: {
                                        shipping_preference:"NO_SHIPPING",
                                    },

                                    payment_source: {
                                        paypal: {
                                            experience_context: {
                                                user_action:"PAY_NOW"
                                            }
                                        }
                                    }
                                });
                            }}
                            fundingSource={"paypal"}
                            onClick={(data, action)=>{
                                // mutateBooking()
                            }}
                            // onCancel={(data, actions)=>{
                            //
                            // }}
                            onApprove={(data, actions) => {
                                return actions.order?.capture().then(function (details) {
                                   setSuccessDataBaking(true)
                                    mutateBooking()

                               })
                            }}
                            onError={(err)=> toast.error("can u choose another tour this tour out of day")}
                        />
                    </PayPalScriptProvider>
                </button>
                <Button variant="solid" color="secondary"
                        sx={{
                            width: {lg: "30%", xs: "100%"},
                            borderRadius: '30px',
                            backgroundColor: '#fdfd96',
                            color: 'black',
                            height: ''
                        }} onClick={() => {
                    setPayment(false)
                }}>
                    Edit
                </Button>
            </div>
            {errorDataBaking}
        </div>
    );
}

export default PaymentButton;
