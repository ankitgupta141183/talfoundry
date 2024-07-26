import React, { useState } from "react";

import PayPalPaymentMethod from "../PayPalPaymentMethod/PaypalPaymentMethod";
// import AddPaymentModal from "../AddPaymentModal";
import StripePaymentElement from "../StripePayment";
import "./PaymentType.css"




function PaymentType(props) {
    const { GetStripePaymentclientSecret } = props;
    
    const handlePaymentTab = (e) => {
            GetStripePaymentclientSecret()
    }
    return (
        <>
            <div>
                <div className="container-fluid">
                    <div className="row d-flex">
                        <div>
                            <button className={`btn btn-primary paymentTypeButton`} name="creditCard" onClick={handlePaymentTab} >Payment By Stripe</button>
                        </div>
                        <div>
                            <button className={`btn btn-primary paymentTypeButton p-0`} name="other" ><PayPalPaymentMethod /></button>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
        </>
    )
}

export default PaymentType