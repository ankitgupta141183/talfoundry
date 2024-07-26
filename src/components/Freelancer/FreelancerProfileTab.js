import React, { useState } from "react"
import BreadCrumb from "../miscellaneous/BreadCrumb"
import FreelancerHeader from "../miscellaneous/FreelancerHeader"
import FreelancerSettingPage from "../miscellaneous/FreelancerSettingPage"
import FreelancerDashboardSideBar from "./FreelancerDashboardSideBar"
import FreelancerPrfile from "./FreelancerProfile"

const FreelancerProfileTab = (props) => {
    const [isActive, setIsActive] = useState(false)
    const showASection = (type) => {
        if (type === "MP") {
            setIsActive(false)
        } else {
            setIsActive(true)
        }
    }
    return (

        <div>
            <FreelancerHeader history={props.history} />
            <div id="tf-project-manager-dashboard-root">
                <BreadCrumb step5 link="My Profile" />
            </div>
            <div className="" id="">
                <div className={""} id="">

                    <div className="">
                        <div className="row custom_row">
                            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 p-0">
                                <div className="custom_sticky_container">
                                    <div className="position-sticky">
                                        <FreelancerDashboardSideBar history={props.history} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                                <div className=" tf_saved_jobs m-0">
                                    <div className="invitesTabBox">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <ul className="nav tabcustom job-tab" role="tablist">
                                                <li className={!isActive ? "active" : ""}>
                                                    <a
                                                        href="#tab_default_1"
                                                        id="active"
                                                        onClick={() => showASection("MP")}
                                                        data-toggle="tab"
                                                    >
                                                        My Profile
                                                    </a>
                                                </li>
                                                <li className={isActive ? "active" : ""}>
                                                    <a
                                                        href="#tab_default_2"
                                                        id="archive"
                                                        onClick={() => showASection("PS")}
                                                        data-toggle="tab"
                                                    >
                                                        Profile Settings
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    {
                                        !isActive ?
                                            <div>
                                                <FreelancerPrfile history={props.history} />
                                            </div>
                                            : <div>
                                                <FreelancerSettingPage history={props.history} ProfileactiveTab="freelancerprofile" />
                                            </div>
                                    }
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FreelancerProfileTab