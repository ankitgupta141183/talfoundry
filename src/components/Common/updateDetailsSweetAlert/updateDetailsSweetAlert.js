import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";

function UpdateDetailsSweetAlert({hideAlert , alertDetails}) {
    return (
        <div className="app-pro2-swal">
        <SweetAlert
            success={alertDetails.statusType === "success"}
            error={alertDetails.statusType === "error"}
            confirmBtnText="Ok"
            confirmBtnBsStyle="success"
            onConfirm={hideAlert}
        >
            {alertDetails.message}
        </SweetAlert>
        </div>
    )
}

export default UpdateDetailsSweetAlert;