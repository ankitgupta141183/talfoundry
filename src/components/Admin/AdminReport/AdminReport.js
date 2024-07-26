import React, { useEffect, useState } from "react";
import ReactLoaderSpinner from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { getActiveJobReportPage } from "../../../Actions/SearchActions";
import AdminBarGraph from "../AdminBarGraph/AdminBarGraph";
import CommonHeaderSidebar from "../AdminCommanComponents/AdminCommanHearderSideBar";
import "./AdminReport.css";

function AdminReportUsers() {
    const [isLoding, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const [JobsData, setJobs] = useState({ jobs: [], Report_jobs: {} })
    const CurrentDate = new Date();
    let CurrentYear = CurrentDate.getFullYear();

    const GetJobsDetails = (searchedYear) => {
        dispatch(getActiveJobReportPage(searchedYear)).then((data) => {
            setTimeout(() => {
                setIsLoading(false)
            }, 1000)
            if (data.jobs || data.total_jobs) {
                setJobs({ jobs: data.jobs, Report_jobs: data.total_jobs })
            } else {
                setJobs({ jobs: [], Report_jobs: {} })
            }
        })
    }

    useEffect(() => {
        setIsLoading(true)
        GetJobsDetails(CurrentYear)
    }, [])


    const Yearofoption = () => {
        var year = [];
    
        for (let i = 2019; i <= CurrentYear; i++) {
            year.push(<option key={i} value={i}>{i}</option>)
        }
        return year;
    }

    const handleSelectYear = (e) => {
        const selectedYear = e.target.value
        GetJobsDetails(selectedYear)
    }
    return (
        <CommonHeaderSidebar lable="Reports">
            <div className="col-md-12 col-sm-12">
                <div className="">
                    {isLoding ? (
                        <div className="grid-loader m-0">
                            <ReactLoaderSpinner type="Grid" color="#00BFFF" height={100} width={100} />
                        </div>)
                        : <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            {/* <div className="row">
                                <div className="tf_app_search bg-white box-shadow p-3" id="searchbox-approved-unapproved-cloud-expert">
                                    <div className="col-md-12 p-3 bg-light d-flex vt-center">
                                        <div className="col-md-2">
                                            <h4 className="manager-welcome-title">Reports</h4>
                                        </div>
                                        <div className="pull-right col-md-10">

                                        </div>
                                    </div>

                                </div>
                            </div> */}
                            <div className="row">
                                <div>
                                    <div className="card bg-white mt-20 box-shadow">
                                        <div className="row">
                                            <div className="col-lg-6 mt-20">
                                                <h4 className="">Jobs Reports</h4>
                                            </div>
                                            <div className="col-lg-2 pull-right mt-20">
                                                <span>
                                                    <select className="form-control" defaultValue={CurrentYear} onChange={handleSelectYear}>
                                                        {Yearofoption()}
                                                    </select>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div className="bg-light admin-report-graph-div">
                                                    {JobsData.Report_jobs && <AdminBarGraph ProfileVIew={JobsData.Report_jobs} />}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div>
                                    <div className="card bg-white mt-20 box-shadow">
                                        <div className="row">
                                            <div className="col-lg-6 mt-20">
                                                <h4 className="">Jobs</h4>
                                            </div>
                                            <div className="col-lg-2 pull-right mt-20">

                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div className="">
                                                    <div className="card bg-white mt-20 box-shadow">
                                                        <div className="card-body projects__table-sec p-4">
                                                            <div className="table-responsive">
                                                                <table className="table box-shadow bg-white">
                                                                    <thead className="bg-light">
                                                                        <tr>
                                                                            <th>Name</th>
                                                                            <th>Job Name</th>
                                                                            <th>Start Date</th>
                                                                            <th>End date</th>
                                                                            <th>Freelancer</th>
                                                                            <th>Status</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {JobsData.jobs.length > 0 ? JobsData.jobs.map((job) => {
                                                                            return (
                                                                                <tr >
                                                                                    <td>{job.manager}</td>
                                                                                    <td>{job.job_name}</td>
                                                                                    <td>{new Date(job.start_date).toDateString()}</td>
                                                                                    <td>{new Date(job.end_date).toDateString()}</td>
                                                                                    <td>{job.freelancer}</td>
                                                                                    <td>{job.job_status}</td>
                                                                                </tr>
                                                                            )
                                                                        }) : <tr><td colSpan={6} className="txt_center">No Data</td></tr>}

                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </CommonHeaderSidebar>
    )
}

export default AdminReportUsers