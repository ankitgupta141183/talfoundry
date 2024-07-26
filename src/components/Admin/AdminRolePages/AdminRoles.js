import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { GetRoleAndPermissions } from "../../../Actions/AdminRoleAction";
import NoDataFoundMessage from "../../Common/NodataFoundMessage/NoDataFoundMessage";
import CommonHeaderSidebar from "../AdminCommanComponents/AdminCommanHearderSideBar";
import "./AdminRole.css"


function AdminRoles() {
    const history = useHistory()

    const dispatch = useDispatch();
    const [Roles, setRoles] = useState([])
    const [errorMessage , setErrorMessage] = useState("")
    useEffect(() => {
        dispatch(GetRoleAndPermissions()).then((data) => {
            if(data.status === 200){
                setRoles(data.data)
            }else{
                setRoles([])
                setErrorMessage(data.message)
            }
        })
    }, [])

    const handleIconClick = (id) => {
        history.push({
            pathname: `/roles-permission/${id}`,
        })
    }
    return (
        <CommonHeaderSidebar lable={"Roles"}>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="admin-transaction-content">
                    <div className="transaction-listing">
                        <div className="row">
                            <div className="tf_app_search bg-white box-shadow p-3" id="searchbox-approved-unapproved-cloud-expert">
                                <div className="col-md-12 p-3 bg-light d-flex Platform-container">

                                    <div className="col-lg-11">
                                        <input
                                            type="text"
                                            className="no-resize-bar form-control"
                                            id="admin-side-find-jobs-search-box"
                                            placeholder="Search Role"
                                        // value={skillInputValue}
                                        // onChange={(e) => handleSkillSearch(e)}
                                        />
                                    </div>
                                    {/* End Found Message */}
                                    <div className="" id="admin-role-plus-btn">
                                        <button className="" role="button" >
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
                                        {
                                            Roles.length === 0 ? <div className="grid-loader">
                                                {
                                                    errorMessage ? <NoDataFoundMessage 
                                                    message={ errorMessage}
                                                    />
                                                    :
                                                <Loader type="Grid" color="#00BFFF" height={100} width={100} />
                                                }
                                            </div>
                                                : <div className="card-body projects__table-sec p-4">
                                                    <div className="">
                                                        <table className="table">
                                                            <thead className="bg-light">
                                                                <tr>
                                                                    <th>Role Name</th>
                                                                    <th className="text-right">Actions</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    Roles.map((role) => {
                                                                        return (
                                                                            <tr>
                                                                                <td>{role.role}</td>
                                                                                <td className="text-right">
                                                                                    {/* <i className="fa fa-user-shield action-border-btn" onClick={() => handleIconClick("Admin")}></i> */}
                                                                                    <i className="fa fa-edit action-grey-btn" onClick={() => handleIconClick(role.uuid)}></i>
                                                                                    {/* <i className="fa fa-trash action-danger-btn" onClick={() => { }} ></i> */}
                                                                                </td>
                                                                            </tr>
                                                                        )
                                                                    })
                                                                }
                                                             


                                                            </tbody>

                                                        </table>
                                                    </div>
                                                </div>

                                        }

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

export default AdminRoles