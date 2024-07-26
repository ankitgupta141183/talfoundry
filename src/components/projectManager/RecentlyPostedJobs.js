import React, { useEffect, useState } from "react"
import Pagination from "react-js-pagination"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getMyJobsForFreelancer } from "../../Actions/freelancerJobActions"
import { getMyJobs } from "../../Actions/ProjectManagerFreelancerActions"
import NoDataFoundMessage from "../Common/NodataFoundMessage/NoDataFoundMessage"

const RecentlyPostedJobs = ({type}) => {
    const dishpatch = useDispatch()
    const [postedJobs, setPostedJobs] = useState([])
    const [activePage, setActivePage] = useState(1)
    const [showJobs, setShowJobs] = useState(0)
    useEffect(() => {
        if(type === "PM"){
        dishpatch(getMyJobs("new")).then((res) => {
            // console.log('---', res)
            setPostedJobs(res)
        })
    }else{
        dishpatch(getMyJobsForFreelancer(1, "")).then((jobs) => {
            // this.setState({ jobs, isLoading: false })
            // console.log(jobs , "---- jobs-----");
            setPostedJobs(jobs)
          })
    }
    }, [])
    function JobCreated(date) {
        let newDate = new Date(date);
        return newDate.getDate() + "/" + (newDate.getMonth() + 1) + "/" + newDate.getFullYear()
    }
    const handlePageChange = (pageNumber) => {
        // console.log(pageNumber, "---pageNumber---");
        setActivePage(pageNumber)
        setShowJobs((pageNumber * 5) - 5)
    }
    return (
        <div className="projects__table-sec">
            <h4 className="m-0 pb-3"><b>{type === "CE" ? "Projects" : "Recently Posted Jobs" } </b></h4>
            <table className="table">
                <thead>
                    <tr className="bg-light">
                        <th>Job Title</th>
                        <th>Job Type</th>
                        <th>Budget</th>
                        <th>Created on</th>
                        <th>Proposals</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                      postedJobs && postedJobs.length > 0 ? postedJobs.slice(showJobs, showJobs + 5).map((value, ind) => {
                            // console.log(value , "valueeeee");
                            return (
                                <tr key={ind}>
                                    <td>{value.job_title}</td>
                                    <td>{value.job_type}</td>
                                    <td>{value.job_pay_value !== "" ? value.job_pay_value : "N/A"}</td>
                                    <td>{JobCreated(value.created_at)}</td>
                                    <td>{value.proposal_count}</td>
                                    <td><Link to={type === "CE" ? `job-details/${value.uuid}` :`/job/${value.uuid}/${value.id}`} >View</Link></td>
                                </tr>
                            )
                        })
                        :<tr style={{textAlign:"center"}}>
                            <td colSpan={6}><NoDataFoundMessage 
                            message={postedJobs?.message ||  "No Record Found!"}
                            /></td>
                        </tr>
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <th colSpan={5}>
                            <div aria-label="Page navigation example">
                               {postedJobs.length > 5 &&  <Pagination
                                    activePage={activePage}
                                    itemsCountPerPage={5}
                                    totalItemsCount={postedJobs.length}
                                    pageRangeDisplayed={5}
                                    onChange={handlePageChange}
                                    hideFirstLastPages={true}
                                    prevPageText={"⟨ Previous"}
                                    nextPageText={"Next ⟩"}
                                />}
                                {/* <ul class="pagination">
                                    <li class="page-item"><a class="page-link" href="#"><i className="fa fa-chevron-left"></i></a></li>
                                    <li class="page-item active"><a class="page-link" href="#">1</a></li>


                                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                                    <li class="page-item"><a class="page-link" href="#"><i className="fa fa-chevron-right"></i></a></li>
                                </ul> */}
                            </div>
                        </th>
                    </tr>
                </tfoot>
            </table>
        </div>

    )
}

export default RecentlyPostedJobs