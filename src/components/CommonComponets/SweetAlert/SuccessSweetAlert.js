import React from "react";
import SweetAlert from "react-bootstrap-sweetalert/lib/dist/SweetAlert";
import inviteIcon from "../../../static/images/invite.png";

function SuccessSweetAlert(props) {
    const { show, handleConfirm, message } = props

    return (
        <div className="app-pro2-swal">
            <SweetAlert
                title=""
                show={show}
                onConfirm={handleConfirm}
                showConfirm={show}>
                <img src={inviteIcon} alt="" />
                <h4>
                    <strong>
                        {message} <br />
                    </strong>
                </h4>
            </SweetAlert>
        </div>
    )
}

export default SuccessSweetAlert