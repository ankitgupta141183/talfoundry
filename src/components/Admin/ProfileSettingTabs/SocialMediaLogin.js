import React from 'react';
import launchSvg from '../../../static/images/baseline-launch-24px.svg';

const SocialMediaLogin = () => {
    return (
        <div>
            <div className="col-md-12 p-0 mb-4" id="general-setting">
                <div className="row setting-page-input">
                    <div className="col-md-6 col-sm-12 col-xs-12 custom-flex">
                        <div className="custom-card">
                            <div className="mn_heading">
                                <h5 className="info_number">Google Login Credential</h5>
                            </div>
                            <div className="col-md-12">
                                <div className="input-group">
                                    <h4>Client ID </h4>
                                    <div className="input-group-addon">
                                        <img src={launchSvg} alt="" />
                                    </div>
                                    <input type='text' className="form-control mn_input" placeholder='' />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="input-group">
                                    <h4>Client Secret </h4>
                                    <div className="input-group-addon">
                                        <img src={launchSvg} alt="" />
                                    </div>
                                    <input type='text' className="form-control mn_input" placeholder='' />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <button className="btn-blue">Save</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12 col-xs-12 custom-flex">
                        <div className="custom-card">
                            <div className="mn_heading">
                                <h5 className="info_number">Facebook</h5>
                            </div>
                            <div>
                                <div className="col-md-12">
                                    <div className="input-group">
                                        <h4>App ID </h4>
                                        <div className="input-group-addon">
                                            <img src={launchSvg} alt="" />
                                        </div>
                                        <input type='text' className="form-control mn_input" placeholder='' />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="input-group">
                                        <h4>App Secret </h4>
                                        <div className="input-group-addon">
                                            <img src={launchSvg} alt="" />
                                        </div>
                                        <input type='text' className="form-control mn_input" placeholder='' />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <button className="btn-blue">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12 col-xs-12 custom-flex">
                        <div className="custom-card">
                            <div className="mn_heading">
                                <h5 className="info_number">Twiter Login Credential</h5>
                            </div>
                            <div>
                                <div className="col-md-12">
                                    <div className="input-group">
                                        <h4>Client ID </h4>
                                        <div className="input-group-addon">
                                            <img src={launchSvg} alt="" />
                                        </div>
                                        <input type='text' className="form-control mn_input" placeholder='' />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="input-group">
                                        <h4>Client Secret </h4>
                                        <div className="input-group-addon">
                                            <img src={launchSvg} alt="" />
                                        </div>
                                        <input type='text' className="form-control mn_input" placeholder='' />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <button className="btn-blue">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SocialMediaLogin