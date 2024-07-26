import React, { useEffect, useState } from "react"
import Pagination from "react-js-pagination"
import { Link } from "react-router-dom"
// import faceImg from '../../static/images/profile-placeholder.png';
import Modal from 'react-modal';
import NoDataFoundMessage from "../Common/NodataFoundMessage/NoDataFoundMessage";
const CloudExpertList = ({ Freelancer, checkEst }) => {
    const [postedJobs, setPostedJobs] = useState([])
    const [activePage, setActivePage] = useState(1)
    const [showJobs, setShowJobs] = useState(0)
    const [openModal, setOpenModal] = useState(false)
    // const [freelancer_details, setFreelancerDetails] = useState("")
    const [actionType, setActionType] = useState("")
    useEffect(() => {
        setPostedJobs(Freelancer)
    }, [Freelancer])
    // function JobCreated(date) {
    //     let newDate = new Date(date);
    //     return newDate.getDate() + "/" + (newDate.getMonth() + 1) + "/" + newDate.getFullYear()
    // }
    const handlePageChange = (pageNumber) => {
        console.log(pageNumber, "---pageNumber---");
        setActivePage(pageNumber)
        setShowJobs((pageNumber * 5) - 5)
    }

    // const handleOpenModal = (freelancer, type) => {
    //     setOpenModal(true)
    //     setActionType(type)
    //     setFreelancerDetails(freelancer)
    // }
    const closeModal = () => {
        setOpenModal(false)
    }
    const handledelete = () => {

    }

    return (
        <div className="projects__table-sec">
            {/* <h4 className="m-0 pb-3"><b>{type === "CE" ? "Projects" : "Recently Posted Jobs" } </b></h4> */}
            <div className="table-responsive">
                <table className="table">
                    <thead className="">
                        <tr className="bg-light">
                            <th>Cloud Expert</th>
                            <th>Hourly Rate</th>
                            <th>Availability</th>
                            <th>Experience Level</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            postedJobs && postedJobs.length > 0 ? postedJobs.slice(showJobs, showJobs + 5).map((freelancer, i) => {
                                // console.log(value , "valueeeee");
                                return (
                                    <tr key={i} className="">
                                        {/* Start TD */}

                                        {/* End TD */}
                                        {/* Start TD */}
                                        <td>
                                            {/* <span id="cloud-expert-profile-image">
                                            {
                                                freelancer &&
                                                    freelancer.profile &&
                                                    freelancer.profile.profile_picture ? (
                                                    <img
                                                        src={
                                                            freelancer &&
                                                            freelancer.profile &&
                                                            freelancer.profile.profile_picture
                                                        }
                                                        alt="img"
                                                    />
                                                )
                                                    :
                                                    (
                                                        <img
                                                            className="avatar-img"
                                                            src={faceImg}
                                                            alt="User"
                                                        />
                                                    )
                                            }
                                        </span> */}
                                            <Link key={freelancer.id} to={`/freelancer/${freelancer.uuid}`}>
                                                <span className="cloud-expert-name">{freelancer.full_name}</span>
                                            </Link>

                                        </td>
                                        {/* End TD */}
                                        <td>
                                            {freelancer.profile.hourly_rate || "-"}
                                        </td>
                                        <td>
                                            {checkEst(freelancer.profile.availability) || "-"}
                                        </td>
                                        <td>
                                            {freelancer.profile.experience_level || "-"}
                                        </td>
                                        {/* <td>
                                    <i className="fa fa-edit" onClick={() =>handleOpenModal(freelancer , 'edit')} ></i>
                                    <i className="fa fa-trash" onClick={() =>handleOpenModal(freelancer , 'delete')}></i>
                                    </td> */}
                                        {/* {
                                        this.state.activeTab !== 'approved' &&
                                        <td>
                                            <Link key={freelancer.id} onClick={this.handleApprove.bind(this, freelancer.uuid)}>
                                                <span className="approve-link">APPROVE</span>
                                            </Link>
                                        </td>
                                    } */}


                                    </tr>
                                )
                            })
                                : <tr style={{ textAlign: "center" }}>
                                    <td colSpan={6}><NoDataFoundMessage 
                                    message={"No Record Found!"}
                                    /></td>
                                </tr>
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colSpan={5}>
                                <div aria-label="Page navigation example">
                                    {postedJobs.length > 5 && <Pagination
                                        activePage={activePage}
                                        itemsCountPerPage={5}
                                        totalItemsCount={postedJobs.length}
                                        pageRangeDisplayed={5}
                                        onChange={handlePageChange}
                                        hideFirstLastPages={true}
                                        prevPageText={"⟨ Previous"}
                                        nextPageText={"Next ⟩"}
                                    />}
                                </div>
                            </th>
                        </tr>
                    </tfoot>
                </table>
                <Modal isOpen={openModal} >
                    {
                        actionType === "edit" ?
                            <div>
                                <h1>Edit</h1>
                                <button onClick={closeModal} type="button" className="btn btn-not-ban">cencel</button>
                                <button onClick={closeModal} type="button" className="btn btn-not-ban">Submit</button>

                            </div>
                            : <div className="modal-body admin-applicant-pop-up">
                                <div className="tf_appl_ace">
                                    <button onClick={closeModal} type="button" className="btn btn-not-ban">cencel</button>
                                    <button onClick={() => handledelete()} type="button" className="btn btn-ban">ok</button>
                                </div>
                            </div>
                    }
                </Modal>
            </div>
        </div>

    )
}

export default CloudExpertList

//  {/* <table className="table trans-table" id="cloud-expert-listing-admin-side-table">
//                                     <thead className="">
//                                       <tr className="bg-light">
//                                         <th></th>
//                                         <th>Cloud Expert</th>
//                                         <th>Hourly Rate</th>
//                                         <th>Availability</th>
//                                         <th>Experience Level</th>
//                                         {
//                                           this.state.activeTab !== 'approved' &&
//                                           (<th>Action</th>)
//                                         }
//                                       </tr>
//                                     </thead>
//                                     <tbody>

//                                       {
//                                         freelancers.length > 0 ? freelancers.map((freelancer, i) => {
//                                           return (
//                                             <tr key={i} className="">
//                                               {/* Start TD */}
//                                               <td>
//                                                 <div id="cloud-expert-profile-image">
//                                                   {
//                                                     freelancer &&
//                                                       freelancer.profile &&
//                                                       freelancer.profile.profile_picture ? (
//                                                       <img
//                                                         src={
//                                                           freelancer &&
//                                                           freelancer.profile &&
//                                                           freelancer.profile.profile_picture
//                                                         }
//                                                         alt="img"
//                                                       />
//                                                     )
//                                                       :
//                                                       (
//                                                         <img
//                                                           className="avatar-img"
//                                                           src={faceImg}
//                                                           alt="User"
//                                                         />
//                                                       )
//                                                   }
//                                                 </div>

//                                               </td>
//                                               {/* End TD */}
//                                               {/* Start TD */}
//                                               <td>
//                                                 <Link key={freelancer.id} onClick={this.handleOPenModal.bind(this, freelancer, i)}>
//                                                   <span className="cloud-expert-name">{freelancer.full_name}</span>
//                                                 </Link>

//                                               </td>
//                                               {/* End TD */}
//                                               <td>
//                                                 {freelancer.profile.hourly_rate || "-"}
//                                               </td>
//                                               <td>
//                                                 {this.checkEst(freelancer.profile.availability) || "-"}
//                                               </td>
//                                               <td>
//                                                 {freelancer.profile.experience_level || "-"}
//                                               </td>

//                                               {
//                                                 this.state.activeTab !== 'approved' &&
//                                                 <td>
//                                                   <Link key={freelancer.id} onClick={this.handleApprove.bind(this, freelancer.uuid)}>
//                                                     <span className="approve-link">APPROVE</span>
//                                                   </Link>
//                                                 </td>
//                                               }


//                                             </tr>
//                                           )
//                                         }) :
//                                           <tr>
//                                             <td colSpan="6"><p className="text-center">No users to display.</p></td>
//                                           </tr>
//                                       }
//                                     </tbody>
//                                   </table>