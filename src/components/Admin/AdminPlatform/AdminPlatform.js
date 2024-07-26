import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import './AdminPlatform.css';
import { useDispatch } from "react-redux";
import { AdminTechCreate, AdminTechDelete, AdminTechEdit, Fetch_Platform } from "../../../Actions/AdminPlateFormAction";
import { useHistory } from "react-router-dom";
import AdminPopup from "../AdminPopup/adminpopup";
import CommonHeaderSidebar from "../AdminCommanComponents/AdminCommanHearderSideBar";
import UpdateDetailsSweetAlert from "../../Common/updateDetailsSweetAlert/updateDetailsSweetAlert";
import Pagination from "react-js-pagination";
import PaginationComponent from "../../Common/PaginationComponent/PaginationComponnent";


function AdminPlatform() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [loadingPlatform, setLoadingPlatform] = useState(false)

    const [activeTab, setActiuveTab] = useState("AWS")
    const [technologies, setTechnologies] = useState([])
    const [copyTech, setCopyTech] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [modalDetails, setModalDetails] = useState({})
    const [isRequested, setIsRequested] = useState({ status: false, message: "", statusType: "success" })
    const [skillInputValue, setSkillInputValue] = useState("")
    const [timer, setTimer] = useState(null)
    const [showTech, setShowTech] = useState(0)
    const [activePage, setActivePage] = useState(1)


    useEffect(() => {
        setLoadingPlatform(true)
        dispatch(Fetch_Platform(activeTab)).then((data) => {
            setTechnologies(data)
            setCopyTech(data)
            setLoadingPlatform(false)
        })
    }, [])
    // const [showASection, setshowASection] = useState('AWS')

    const showASection = (e) => {
        const platform = e.target.id

        setActiuveTab(platform)
        setActivePage(1)
        setShowTech(0)
        dispatch(Fetch_Platform(platform)).then((data) => {
            setTechnologies(data)
        })
    }

    const handlePopup = (type, tech) => {
        if (type === "Add") {
            setShowModal(true)
            setModalDetails({ type: "add", data: { tech_type: "AWS" }, buttonText: "Add", heading: "Add technology", FormData: [{ lable: "Technology Name", placeholder: "Enter technology name", inputType: "text" }] })
        } else if (type === "delete") {
            setShowModal(true)
            setModalDetails({ type: "delete", data: tech, buttonText: "Delete", heading: "Delete technology", text: "Are you sure want to delete?" })

        } else if (type === "Edit") {
            setShowModal(true)
            setModalDetails({ type: "edit", data: tech, buttonText: "Edit", heading: "Edit technology", FormData: [{ lable: "Technology Name", placeholder: "Enter technology name", inputType: "text" }] })
        }

    }

    const closeModals = () => {
        setShowModal(false)
    }

    const handleSubmit = (type,) => {
        if (type === "delete") {
            dispatch(AdminTechDelete(modalDetails.data.id)).then((data) => {
                setShowModal(false)
                setIsRequested({ status: true, message: "Technology deleted successfully.", statusType: "success" })
                dispatch(Fetch_Platform(activeTab)).then((data) => {
                    setTechnologies(data)
                    setCopyTech(data)
                })
            })
        } else if (type === "edit") {
            if (modalDetails.data.tech_name?.length > 3) {
                dispatch(AdminTechEdit(modalDetails.data.id, modalDetails.data)).then((data) => {
                    setShowModal(false)
                    setIsRequested({ status: true, message: "Technology updated successfully.", statusType: "success" })
                    dispatch(Fetch_Platform(activeTab)).then((data) => {
                        setTechnologies(data)
                        setCopyTech(data)
                    })
                })
            } else {
                setIsRequested({ status: true, message: "Please enter a correct technology. ", statusType: "error" })
            }
        } else if (type === "add") {

            if (modalDetails.data.tech_name?.length > 3) {
                dispatch(AdminTechCreate(modalDetails.data)).then((data) => {
                    setShowModal(false)
                    setIsRequested({ status: true, message: "Technology added successfully.", statusType: "success" })
                    dispatch(Fetch_Platform(activeTab)).then((data) => {
                        setTechnologies(data)
                        setCopyTech(data)
                    })
                })
            } else {
                setIsRequested({ status: true, message: "Please enter a correct technology. ", statusType: "error" })
            }

        }

    }

    const handleChange = (e) => {
        const UpdateValue = { ...modalDetails, data: { ...modalDetails.data, [e.target.name]: e.target.value } }
        console.log(UpdateValue, "UpdateValue");
        setModalDetails(UpdateValue)
    }

    const hideAlert = () => {
        setIsRequested({ status: false, message: "" })
    }

    const filterSkill = (skill) => {
        const CloneData = [...copyTech]
        const FilterTech = CloneData.filter((tech) => tech.tech_name && tech.tech_name.toLocaleLowerCase().includes(skill))
        setTechnologies(FilterTech)
    }
    const handleSkillSearch = (e) => {
        const skill = e.target.value
        setSkillInputValue(skill.toLocaleLowerCase())
        clearTimeout(timer)
        const newTimer = setTimeout(() => {
            if (skill.length > 0) {
                filterSkill(skill.toLocaleLowerCase())
            } else {
                setTechnologies(copyTech)
            }
        }, 500)
        setActivePage(1)
        setShowTech(0)
        setTimer(newTimer)


    }

    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber)
        setShowTech((pageNumber * 5) - 5)
    }
    return (
        <CommonHeaderSidebar lable="Platforms">
            {isRequested.status && <UpdateDetailsSweetAlert hideAlert={hideAlert} alertDetails={isRequested} />}
            <div className="col-md-12 col-sm-12">
                <div className="">
                    {loadingPlatform && (
                        <div className="grid-loader">
                            <Loader type="Grid" color="#00BFFF" height={100} width={100} />
                        </div>
                    )}
                    {!loadingPlatform && <React.Fragment>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="admin-transaction-content">
                                <div className="transaction-listing">
                                    <div className="row">
                                        <div class="col-md-12 p-0 mb-4">
                                            <ul className="nav tabcustom">
                                                <li className="active">
                                                    <a
                                                        href="#AWS"
                                                        id="AWS"
                                                        onClick={showASection}
                                                        data-toggle="tab"
                                                    >
                                                        AWS
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#NEW"
                                                        id="Salesforce"
                                                        onClick={showASection}
                                                        data-toggle="tab"
                                                    >
                                                        Salesforce
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#NEW"
                                                        id="Google Cloud"
                                                        onClick={showASection}
                                                        data-toggle="tab"
                                                    >
                                                        Google Cloud
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#NEW"
                                                        id="Oracle"
                                                        onClick={showASection}
                                                        data-toggle="tab"
                                                    >
                                                        Oracle
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#NEW"
                                                        id="MS Azure"
                                                        onClick={showASection}
                                                        data-toggle="tab"
                                                    >
                                                        MS Azure
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="tf_app_search bg-white box-shadow p-3" id="searchbox-approved-unapproved-cloud-expert">
                                            <div className="col-md-12 p-3 bg-light d-flex Platform-container">

                                                <div className="col-lg-11">
                                                    <input
                                                        type="text"
                                                        className="no-resize-bar form-control"
                                                        id="admin-side-find-jobs-search-box"
                                                        placeholder="Search Skills"
                                                        value={skillInputValue}
                                                        onChange={(e) => handleSkillSearch(e)}
                                                    />
                                                </div>
                                                {/* End Found Message */}
                                                <div className="" id="admin-platform-plus-btn">
                                                    <button className="" role="button" onClick={() => handlePopup("Add")}>
                                                        <i className="fa fa-plus" aria-hidden="true"></i>
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    
                                    <div className="">
                                        <div className="row">
                                            <div className="transaction-content_body">
                                                <div className="card bg-white box-shadow">
                                                   
                                                    <div className="card-body projects__table-sec p-4">
                                                        <div className="">
                                                            <table className="table">
                                                                <thead className="bg-light">
                                                                    <tr>
                                                                        <th>S.No</th>
                                                                        <th>Technology Name</th>
                                                                        <th className="text-right">Actions</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        technologies.length > 0 ? technologies.slice(showTech, showTech + 5).map((tech, index) => {
                                                                            return (
                                                                                <tr>
                                                                                    <td>{index + 1}</td>
                                                                                    <td>{tech.tech_name}</td>
                                                                                    <td className="text-right">
                                                                                        <i className="fa fa-edit action-grey-btn" onClick={() => handlePopup("Edit", tech)}></i>
                                                                                        <i className="fa fa-trash action-danger-btn" onClick={() => handlePopup("delete", tech)} ></i>
                                                                                    </td>
                                                                                </tr>
                                                                            )
                                                                        })
                                                                            : <tr>
                                                                                <td colSpan={6} className="txt_center">No Data</td>
                                                                            </tr>
                                                                    }

                                                                </tbody>
                                                                <tfoot>
                                                                    <tr>
                                                                        <th colSpan={5}>
                                                                            <div aria-label="Page navigation example">
                                                                                <PaginationComponent
                                                                                    activePage={activePage}
                                                                                    itemsCountPerPage={5}
                                                                                    totalItemsCount={technologies.length}
                                                                                    pageRangeDisplayed={5}
                                                                                    onChange={handlePageChange}
                                                                                />
                                                                            </div>
                                                                        </th>
                                                                    </tr>
                                                                </tfoot>
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
                    </React.Fragment>
                    }
                    {
                        <AdminPopup showModal={showModal} modalDetails={modalDetails} closeModal={closeModals} handleSubmit={handleSubmit} handleChange={handleChange} />
                    }
                </div>
            </div>
        </CommonHeaderSidebar>
    )
}

export default AdminPlatform