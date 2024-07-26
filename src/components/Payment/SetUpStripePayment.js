import React from "react";
import { useHistory } from "react-router-dom";
import ProjectManagerHeader from "../miscellaneous/ProjectManagerHeader";
import StripePaymentElement from "./StripePayment";

function SetUpStripePayment() {
    const history = useHistory()
    return (
        <div className="">
            <ProjectManagerHeader history={history} />
            {/* {(currentUser.role === "Freelancer") ? (<FreelancerHeader history={this.props.history} />) : (<ProjectManagerHeader history={this.props.history} />)} */}
            <div className="tf_inter setup-payment-header">
                    <StripePaymentElement />
            </div>
        </div>
    )
}

export default SetUpStripePayment