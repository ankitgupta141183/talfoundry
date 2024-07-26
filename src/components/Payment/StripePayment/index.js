import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckOutForm/CheckoutForm";
import { loadStripe } from '@stripe/stripe-js';
import "../StripePayment/CheckOutForm/CheckoutForm.css"
import Modal from 'react-modal';
import "./StripePayment.css"
import { useHistory, useLocation } from "react-router-dom";

const ELEMENTS_OPTIONS = {
    fonts: [
        {
            // cssSrc: "https://fonts.googleapis.com/css?family=Roboto"
        }
    ]
};

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        // marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: 'none',
        background: 'transparent'
    }
}

const stripePromise = loadStripe('pk_test_51LnKtZKeEcjfSzbinTcEVBRTPeDQpMVOQMoRHqY9opoZt3hM8aQvk2DQ3uUGUKup5hjgnUpMcJKfKbmpx2b4Xv1h00WXOXNgDi');

const StripePaymentElement = (props) => {

    const { onOpen, onClose  , clientSecret} = props
 
    const appearance = {
        theme: 'stripe',
      };
      const options = {
        clientSecret:`${clientSecret}`,
        appearance,
      };

    return (
        <Modal isOpen={onOpen} onRequestClose={() => onClose("isAddMethodModal")} style={customStyles}>
            <div id="myModal" tabIndex="-1" role="dialog">
                <div className="modal-dialog tf_model1">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" onClick={() => onClose("isAddMethodModal")}><span>×</span></button>
                            <h4 className="modal-title" id="myModalLabel">Stripe Payment</h4>

                            <div className="modal-body ">
                                {
                                 clientSecret &&    
                                <Elements stripe={stripePromise} options={options}>
                                    <CheckoutForm  onClose={onClose} {...props} clientSecret={clientSecret} />
                                </Elements>
                                  }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>

    )
}

export default StripePaymentElement;