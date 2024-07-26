import React, { useState } from "react";
// import { getFilteredDataForJobs } from '../../Actions/SearchActions';
// import { getAllFreelancers, approveFreelancer, banFreelancer } from '../../Actions/AdminActions';
// import AdminHeader from "../miscellaneous/AdminHeader";
// import countryList from 'react-select-country-list';
// import { isEmpty } from 'lodash';
// import LANGUAGES from '../../constants/languages';
// import AdminDashboardSidebar from "./AdminDashboardSidebar";
// import _ from "lodash";
// import Loader from "react-loader-spinner";
// import BreadCrumb from "../miscellaneous/BreadCrumb";
import './AdminSetting.css';
import GeneralSetting from "./ProfileSettingTabs/GeneralSetting";
import Localization from "./ProfileSettingTabs/Localization";
import PaymentSetting from "./ProfileSettingTabs/PaymentSetting";
import EmailSetting from "./ProfileSettingTabs/EmailSetting";
import SocialMediaLogin from "./ProfileSettingTabs/SocialMediaLogin";
import SocialLinks from "./ProfileSettingTabs/SocialLinks";
import SeoSetting from "./ProfileSettingTabs/SeoSettings";
import Others from "./ProfileSettingTabs/Others";
// import NewBreadCrumb from "../miscellaneous/BreadCrumb/NewBreadCrumb";
import CommonHeaderSidebar from "./AdminCommanComponents/AdminCommanHearderSideBar";
import ResetPassword from "./ProfileSettingTabs/ResetPassword";
// import userSvg from '../../../static/images/user.svg';
// import webSvg from '../../static/images/outline-language-24px.svg';
// import launchSvg from '../../../../static/images/baseline-launch-24px.svg';
// import uploadSvg from '../../static/images/outline-save_alt-24px.svg';
// import GeneralSetting from "./ProfileSettingTabs/GeneratSetting";
// import userSvg from '../../static/images/user.svg';
// import { event } from "jquery";

const AdminSetting = () => {
    const [activeTab, setactiveTab] = useState('general-setting')
    const showAsSection = (e) => {
        // let idForFilter = e.target.id;
        // sortItem: idForFilter,
        //   jobs: [],
        //   activeTab: e.target.id,
        //   jobSearchItem: "",
        setactiveTab(e.target.id)
    }
    return (
        <CommonHeaderSidebar lable="Settings">
            <div className="col-md-12 col-sm-12">
                <div className="p-4 bg-white box-shadow mb-4">
                    {/* Start Row */}
                    <div className="row" id="tabs--search-box-container">
                        <div className="col-md-12">
                            <div className="super-admin-cloud-expert-tabs">
                                <ul className="nav tabcustom">
                                    <li className="active"><a href="#GENERALSETTING" id="general-setting" onClick={showAsSection} data-toggle="tab">General Settings</a></li>
                                    <li className=""><a href="#LOCALIZED" id="localized" onClick={showAsSection} data-toggle="tab">Localization</a></li>
                                    <li><a href="#PAYMENTSETTING" id="payment-setting" onClick={showAsSection} data-toggle="tab">Payment Settings</a></li>
                                    <li><a href="#RESETPASSWORD" id="reset-password" onClick={showAsSection} data-toggle="tab">Reset Password</a></li>
                                    <li><a href="#EMAILSETTING" id="email-setting" onClick={showAsSection} data-toggle="tab">Email Settings</a></li>
                                    <li><a href="#SOCIALLOGIN" id="social-login" onClick={showAsSection} data-toggle="tab">Social Media Login</a></li>
                                    <li><a href="#SOCIALLINKS" id="social-links" onClick={showAsSection} data-toggle="tab">Social Links</a></li>
                                    <li><a href="#SEOSETTING" id="seo-setting" onClick={showAsSection} data-toggle="tab">SEO Settings</a></li>
                                    <li><a href="#OTHERS" id="others" onClick={showAsSection} data-toggle="tab">Others</a></li>
                                </ul>
                            </div>
                            {/* End Tabs */}

                            {/* Start Search Box */}
                            <div className="tf_app_search" id="searchbox-approved-unapproved-cloud-expert">
                                {activeTab === 'general-setting' ?
                                    <GeneralSetting />
                                    : activeTab === 'localized' ?
                                        <div>
                                            <Localization />
                                        </div>
                                        : activeTab === 'payment-setting' ?
                                            <div>
                                                <PaymentSetting />
                                            </div>
                                            : activeTab === 'email-setting' ?
                                                <div>
                                                    <EmailSetting />
                                                </div>
                                                : activeTab === 'social-login' ?
                                                    <div>
                                                        <SocialMediaLogin />
                                                    </div>
                                                    : activeTab === 'social-links' ?
                                                        <div>
                                                            <SocialLinks />
                                                        </div>
                                                        : activeTab === 'seo-setting' ?
                                                            <div>
                                                                <SeoSetting />
                                                            </div>
                                                            : activeTab === "reset-password" ? 
                                                              <ResetPassword />
                                                            :

                                                            <div>
                                                                <Others />
                                                            </div>
                                }

                            </div>
                            {/* End Start Box */}
                        </div>
                    </div>
                    {/* End Row  */}
                </div>
            </div>
        </CommonHeaderSidebar>
    );
}
export default AdminSetting
