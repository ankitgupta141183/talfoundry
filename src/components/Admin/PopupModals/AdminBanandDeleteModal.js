import React from "react";
import Modal from "react-modal";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        border: "none",
        background: "transparent",
    },
}


const AdminBanAndDelModal = ({ isOpen, Action_Type, closeModal, banFreelancer, freelancer_Ban_id }) => {
    return (
        <Modal isOpen={isOpen} style={customStyles}>
            <div className="modal-body admin-applicant-pop-up bg-white">
                {Action_Type === "suspend_user" ?
                    <div className="tf_appl_ace modal-header-shape bg-white">
                         <br /><br /><br />
                        <p>Are you sure you want to suspend this account?</p>
                        <button onClick={closeModal} type="button" className="btn btn-ban">Cancel</button>
                        <button onClick={() => banFreelancer(freelancer_Ban_id, false)} type="button" className="btn btn-not-ban">Suspend</button>
                    </div>
                    : Action_Type === "suspend_user_Admin" ?
                        <div className="tf_appl_ace modal-header-shape">
                            <br /><br /><br />
                            <p>Are you sure you want to suspend <br />this account?</p>
                            <button onClick={closeModal} type="button" className="btn btn-ban">Cancel</button>
                            <button onClick={() => banFreelancer(freelancer_Ban_id , false)} type="button" className="btn btn-not-ban">Suspend</button>
                        </div>
                        : Action_Type === "active_user" ?
                            <div className="tf_appl_ace modal-header-shape">
                                <br /><br /><br />
                                <p>Are you sure you want to approve this account?</p>
                                <button onClick={closeModal} type="button" className="btn btn-ban">Cancel</button>
                                <button onClick={() => banFreelancer(freelancer_Ban_id, true)} type="button" className="btn btn-not-ban">Approve</button>
                            </div>
                            :
                            <div className="tf_appl_ace modal-header-shape">
                                <h4>Delete</h4>
                                <p>Are you sure want to delete?</p>
                                <button onClick={closeModal} type="button" className="btn btn-not-ban">Cancel</button>
                                <button type="button" className="btn btn-ban">Delete</button>
                            </div>
                }
            </div>
        </Modal>
    )
}

export default AdminBanAndDelModal;