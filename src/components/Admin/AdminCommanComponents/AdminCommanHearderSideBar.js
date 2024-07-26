import React from "react";
import { useHistory } from "react-router-dom";
import AdminHeader from "../../miscellaneous/AdminHeader";
import NewBreadCrumb from "../../miscellaneous/BreadCrumb/NewBreadCrumb";
import AdminDashboardSidebar from "../AdminDashboardSidebar";

function CommonHeaderSidebar(props) {
    const history = useHistory()
    return (
        <div className="admin-side-list-view-banner">
            <div className="">
                <div className="tf_superadim admin_jobs_filters">
                    <AdminHeader history={history} />
                    <div id="tf-project-manager-dashboard-root">
                        <NewBreadCrumb lable={props?.lable} />
                    </div>
                    <div className="">
                        <div className="mains" id="">
                            <div className="">
                                <div className="row custom_row">
                                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 p-0">
                                        <div className="custom_sticky_container">
                                            <div className="position-sticky">
                                                <AdminDashboardSidebar />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                                        {props.children}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CommonHeaderSidebar