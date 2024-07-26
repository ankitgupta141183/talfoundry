import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loader from "react-loader-spinner";
import { useLocation, useParams } from "react-router-dom";

import { GetRoleAndPermissionsByID, RolePermissionEdit } from "../../../Actions/AdminRoleAction";
import CommonHeaderSidebar from "../AdminCommanComponents/AdminCommanHearderSideBar";
import "./AdminRolesPermission.css";

function AdminRolesPermission() {
    const location = useLocation()
    const params = useParams()
    const dispatch = useDispatch();
    const [roleData, setRoleData] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [CardBoxCheckData, setCardBoxCheckData] = useState([
        {
            // Show all projects
            heading: "Show active contracts",
            checked: false,
            keyName: "show_active_contracts"

        },
        {
            // Show running projects
            heading: "Show active jobs",
            checked: true,
            keyName: "show_active_jobs"
        },
        {
            //Show open projects
            heading: "Show completed jobs",
            checked: false,
            keyName: "show_completed_jobs"
        },
        {
            //Show cancelled projects
            heading: "Show new jobs",
            checked: false,
            keyName: "show_new_jobs"
        },
        {
            //Show project cancel requests
            heading: "Show pending contracts",
            checked: true,
            keyName: "show_pending_contracts"
        },
        {
            heading: "Show project category",
            checked: false,
            keyName: "Show_project_category"
        },
        {
            heading: "Show verification requests",
            checked: true,
            keyName: 'Show_verification_requests'
        },
        {
            heading: "Show user chats",
            checked: false,
            keyName: "Show_user_chats"
        },
    ])

    useEffect(() => {
        setIsLoading(true)
        dispatch(GetRoleAndPermissionsByID(params.id)).then((data) => {
            setRoleData(data)
            const CloneData = [...CardBoxCheckData]
            const GetApiData = CloneData.map(item => (
                { ...item, checked: data[`${item.keyName}`] ? data[`${item.keyName}`] : false }
            ))
            setCardBoxCheckData(GetApiData)
            setIsLoading(false)
        })
    }, [])

    const handleChange = (e) => {
        const cloneBox = [...CardBoxCheckData]

        const updateedData = {
            ...roleData,
            [e.target.name]: e.target.checked
        }
  
        setIsLoading(true)
        const targetKey = e.target.name
        dispatch(RolePermissionEdit(params.id, updateedData)).then((data) => {
            setIsLoading(false)
            if (data.succes) {
                const ChangeData = cloneBox.map((item) => item.keyName === targetKey ? { ...item, checked: !item.checked } : item)
                setRoleData(updateedData)
                setCardBoxCheckData(ChangeData)
            }else{
                alert("Something wrong")
            }
        })
        // console.log(updateedData, "updateedData");
    }

    return (
        <CommonHeaderSidebar lable="Permission">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="admin-transaction-content">
                    <div className="transaction-listing">
                        <div className="row">
                            <div className="transaction-content_body">
                                <div className="card bg-white box-shadow">

                                    <div className="card-body projects__table-sec p-4">
                                        <div className="">
                                            <div className="col-md-12 p-3 d-flex Platform-container">
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-4">
                                                    <div class="super-admin-cloud-expert-tabs mb-4"><h4>{roleData.role}</h4></div>
                                                    <hr />
                                                </div>
                                                {
                                                // isLoading ?
                                                //     <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                //         <div className="grid-loader m-0" >
                                                //             <Loader type="Grid" color="#00BFFF" />
                                                //         </div>
                                                //     </div>
                                                //     :
                                                    CardBoxCheckData.map((item, index) => {
                                                        return (
                                                            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 mb-4">
                                                                <div class="d-flex m-2 bg-light">
                                                                    <div class="card flex-fill">
                                                                        <div class="card-body p-3 text-center">
                                                                            <p class="card-text f-12"> {item.heading} </p>
                                                                        </div>
                                                                        <hr />
                                                                        <div class="card-footer text-center">
                                                                            <label class="switch mb-0" for={`checkbox${index}`}>
                                                                                <input type="checkbox" id={`checkbox${index}`} checked={item.checked} name={item.keyName} onChange={handleChange} />
                                                                                <div class="slider round"></div>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>

        </CommonHeaderSidebar>
    )

}
export default AdminRolesPermission