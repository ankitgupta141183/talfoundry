import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import Loader from "react-loader-spinner";
import JobCategoryCheckboxes from "../../../utills/JobCategoryCheckboxes";
import Checkbox from "../../../utills/Checkbox";
import { useDispatch } from "react-redux";
import { AdminProfileEditAction } from "../../../Actions/profileCreationActions";
import './PopupModals.css';



const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        //   marginRight: '-50%',
        //   transform: 'translate(-50%, -50%)',
        border: 'none',
        position: 'unset',
        margin: '1rem auto',
        padding: '0',
        background: 'transparent',
    },
};


const ClientEditModal = ({ openModal, closeModals, applicationIsLoading, ce_details, editProfile, Client_detail }) => {

    // console.log(openModal , "openModa ======");
    const [CE_details, setCE_details] = useState('')
    const [Client_details, setClient_details] = useState("")

    const dispatch = useDispatch()
    useEffect(() => {
        if (ce_details && openModal) {
            setCE_details(ce_details)
        } else if (Client_detail && openModal) {
            setClient_details(Client_detail)
        console.log(Client_detail, "====Client_detail=====" , ce_details);
        }
    }, [Client_detail ,ce_details])
    const handleSubmit = (e) => {
        e.preventDefault();
        const { username, firstname, lastname, company, status } = e.target
        if ((username.value.length || firstname.value.length || lastname.value.length) === 0) return;
        let data;
        console.log(status , "====Status====");
        if (CE_details !== "") {
            const cat = CE_details.profile.category.join(",");
            data = {
                user: {
                    id: CE_details.uuid,
                    user_name: username.value,
                    last_name: lastname.value,
                    first_name: firstname.value,
                    profile_attributes: {
                        category: cat,
                        visibility: CE_details.profile.visibility,
                        id: ce_details.profile.id
                    }
                }
            }
        }
        else if (Client_details !== "") {
            data = {
                user: {
                    id: Client_details.uuid,
                    last_name: lastname.value,
                    first_name: firstname.value,
                    
                    account_active: status.value,
                    company_attributes:{
                        id: Client_details.company !== null ? Client_details.company.id : null ,
                        name: company.value
                    }
                }
            }

        }
        const UUID = Client_details !== "" ? Client_details.uuid : CE_details.uuid
        console.log(UUID, "---data" , data , "--data");
        dispatch(AdminProfileEditAction(UUID, data)).then((data) => {
            console.log(data , "---datat update ");
            editProfile(data.data)
            setClient_details("")
            setCE_details("")
        }).catch((err) => {
            console.log(err.message, "error message");
        })
        // console.log(username.value);
        closeModals()
        // setCE_details('')
    }
    const handleCategoryChange = (e) => {
        let cloneCE_details = { ...CE_details };
        let index
        if (e.target.checked) {
            cloneCE_details.profile.category.push(e.target.name)
        } else {
            index = cloneCE_details.profile.category.indexOf(e.target.name)
            cloneCE_details.profile.category.splice(index, 1)
        }
        setCE_details(cloneCE_details)
    }

    const onValChange = (e) => {
        console.log(e.target.value);
        const cloneCE_details = { ...CE_details }
        cloneCE_details.profile.visibility = e.target.value
        console.log(cloneCE_details);
        setCE_details(cloneCE_details)
    }
    // console.log(CE_details, "----cloneCE_details-----", Client_detail);
    return (
        <ReactModal isOpen={openModal} style={customStyles} onRequestClose={closeModals}>
            <div className="modal-dialog" style={{ overflow: 'auto' }}>
                {applicationIsLoading &&
                    (
                        <div className="grid-loader my-feed-loader col-md-12">
                            <Loader
                                type="Grid"
                                color="#00BFFF"
                                height={100}
                                width={100}
                            />
                        </div>
                    )
                }
                {!applicationIsLoading && (CE_details !== "" || Client_details !== "") &&
                    <div className="modal-content modal-header-shape">

                        <div className="modal-headr">

                            <div className="row">
                                <div className="col-md">
                                    <h3 className="job-title-in-popup text-center">
                                        {/* {this.state.profileDetail.full_name} */}
                                        {Client_details !== "" ? <>
                                            Edit Client
                                        </>
                                            : <>Edit Cloud Expert</>
                                        }
                                    </h3>
                                </div>

                                <div className="col-md">
                                    <button type="button" className="close- close-modal-custom-btn" onClick={closeModals}>
                                        <span aria-hidden="true">×</span>
                                        <span className="sr-only">Close</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="clearfix"></div>


                        <div className="modal-body maxh-auto">
                            <form className="pt-3" onSubmit={(e) => handleSubmit(e)}>
                                <>{
                                    Client_details !== "" ?
                                        <>
                                            <div class="form-group">
                                                <label>Company Name</label>
                                                <input type="text" name="company" class="form-control" defaultValue={Client_details.company !== null ? Client_details.company.name : ""} />
                                            </div>
                                            <div class="form-group">
                                                <label>First Name</label>
                                                <input type="text" name="firstname" class="form-control" defaultValue={Client_details.first_name} />
                                            </div>
                                            <div class="form-group">
                                                <label>Last Name</label>
                                                <input type="text" name="lastname" class="form-control" defaultValue={Client_details.last_name} />
                                            </div>
                                            <div class="form-group" style={{ display: "none" }}>
                                                <label>User Name</label>
                                                <input type="text" name="username" class="form-control" defaultValue={Client_details.user_name} />
                                            </div>
                                            <div class="form-group">
                                                <label>Status</label>
                                                <select name="status" class="form-control form-select"  defaultValue={Client_details && Client_details.account_active ? "true" : "false"} >
                                                    <option selected disabled>Select Status</option>
                                                    <option value="true">Active</option>
                                                    <option value="false">Inactive</option>
                                                </select>
                                            </div>
                                        </>
                                        : <>
                                            <div class="form-group">
                                                <label>First Name</label>
                                                <input type="text" name="firstname" class="form-control" defaultValue={ce_details.first_name} />
                                            </div>
                                            <div class="form-group">
                                                <label>Last Name</label>
                                                <input type="text" name="lastname" class="form-control" defaultValue={ce_details.last_name} />
                                            </div>
                                            <div class="form-group">
                                                <label>User Name</label>
                                                <input type="text" name="username" class="form-control" defaultValue={ce_details.user_name} />
                                            </div>

                                            <div class="form-group">
                                                <label>Platform</label>
                                                <div className="tf_profile float-none m-0">
                                                    <div className="mn_margin job-Category">
                                                        <div className="">
                                                            <div className="job-category">
                                                                <div className="label-floating tf_step_3 p-3">
                                                                    <div className="">
                                                                        {/*<label className="control-label mb-15">Platform*</label>*/}
                                                                    </div>
                                                                    <div className="clearfix"></div>

                                                                    {
                                                                        JobCategoryCheckboxes.map(item => {
                                                                            let category = CE_details && CE_details.profile.category.map(val => val.trim())
                                                                            return (
                                                                                <div className="details-option mb-10" key={item.key}>
                                                                                    <Checkbox name={item.name} checked={category && category.includes(item.name)} onChange={(e) => handleCategoryChange(e)} />
                                                                                    <span>{item.name}</span>
                                                                                </div>
                                                                            )
                                                                        }
                                                                        )
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label>Visibility</label>
                                                <select class="form-control form-select" onChange={(e) => onValChange(e)} defaultValue={CE_details && CE_details.profile.visibility} >
                                                    <option selected disabled>Select Visibility</option>
                                                    <option value="Public">Public</option>
                                                    <option value="Private">Private</option>
                                                </select>
                                            </div>


                                        </>
                                }
                                </>
                                <div class="pt-1">
                                    <button type="submit" class="btn btn-blue btn-block">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                }
            </div >
        </ReactModal >
    )
}

export default ClientEditModal;