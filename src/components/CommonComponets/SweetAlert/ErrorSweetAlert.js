import React from "react";
import SweetAlert from "react-bootstrap-sweetalert/lib/dist/SweetAlert";
import ErrorImg from "../../../static/images/oops.png";

function ErrorSweetAlert (props) {
    const {show , handleConfirm , message} = props

    return(
        <div className="app-pro2-swal">
          <SweetAlert
            show={show}
            confirmBtnBsStyle="danger"
            onConfirm={() => handleConfirm()}
          >
            <div id="EditJobSuccessMessagePopupInnerContent">
              <img src={ErrorImg} alt="" id="rightCheckIconImage" />
              <h4>
                <strong>
                 {message}
                </strong>
              </h4>
            </div>
          </SweetAlert>
        </div>
    )
}

export default ErrorSweetAlert