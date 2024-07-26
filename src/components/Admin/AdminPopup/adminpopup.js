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


const AdminPopup = ({ showModal, modalDetails, closeModal, handleSubmit, handleChange }) => {
    const  platrform = ["AWS" , "Salesforce" , "Google Cloud" , "Oracle" , "MS Azure"]

    return (

        <Modal
            isOpen={showModal}
            style={customStyles}
        >
            <div className="modal-body admin-applicant-pop-up bg-white">

                <div className="tf_appl_ace modal-header-shape bg-white">
                    {
                        modalDetails.type === "add" ? (
                            <>
                                <br /><br /><br />
                                <p className="text-left m-0"> Platform Name </p>
                                {/* <input className="form-control" name="tech_type" onChange={handleChange} /> */}
                                <select className="form-control" style={{height: "48px" , marginBottom : "10px"}} name="tech_type" onChange={handleChange}>
                                    {
                                        platrform.map((P_F) =>{
                                           return <option kay={P_F} value={P_F}>{P_F}</option>  
                                        })
                                    }
                                </select>
                                <p className="text-left m-0">Technology Name</p>
                                <input className="form-control" name="tech_name" onChange={handleChange} />
                                <button onClick={closeModal} type="button" className="btn btn-ban">Cancel</button>
                                <button type="submit" onClick={(() => handleSubmit(modalDetails.type))} className="btn btn-not-ban">Submit</button>
                            </>

                        )
                            : modalDetails.type === "delete" ? (
                                <>
                                    <br /><br /><br />
                                    <p >Are you sure want to delete?</p>
                                    <button onClick={closeModal} type="button" className="btn btn-not-ban">Cancel</button>
                                    <button type="button" onClick={(() => handleSubmit(modalDetails.type))} className="btn btn-ban">Delete</button>
                                </>
                            )
                                : <>
                                    <br /><br /><br />
                                    <p className="text-left m-0">Platform Name </p>
                                    <input className="form-control" value={modalDetails?.data?.tech_type} />
                                    <p className="text-left m-0">Technology Name </p>
                                    <input className="form-control" value={modalDetails?.data?.tech_name} name="tech_name" onChange={handleChange} />
                                    <button onClick={closeModal} type="button" className="btn btn-ban">Cancel</button>
                                    <button type="submit" onClick={(() => handleSubmit(modalDetails.type))} className="btn btn-not-ban">Submit</button>
                                </>

                    }

                </div>
            </div>
        </Modal>
    )

}

export default AdminPopup;