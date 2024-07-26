import React from "react";
const customStylesNew = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "0px",
    },
  }
 
function HireModal(props){
    const {modalIsOpen , afterOpenModal ,  closeModal , subtitle } = props

    return (
        <>
        <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStylesNew}
              contentLabel="Example Modal"
            >
              <div className="add-payment-method-popup">
                <div className="modal-header">
                  <button
                    type="button"
                    className="close"
                    onClick={this.closeModal}
                    data-dismiss="modal"
                  >
                    <span aria-hidden="true">×</span>
                    <span className="sr-only">Close</span>
                  </button>

                  <h2
                    className="modal-title"
                    ref={(subtitle) =>
                      (this.subtitle = subtitle)
                    }
                  >
                    Payment Method
                  </h2>
                </div>

                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-12">
                      <p>
                        You have not added any payment method.
                        Please add one by{" "}
                        <a href="/settings">Clicking Here </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
        </>
    )

}

export default HireModal