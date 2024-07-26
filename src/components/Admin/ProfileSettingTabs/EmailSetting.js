import React from 'react';
import launchSvg from '../../../static/images/baseline-launch-24px.svg';

const EmailSetting = () => {
    return (
        <div>
            <div className="col-md-12 p-0 mb-4" id="general-setting">
                <div className="row setting-page-input">
                    <div className="col-md-6 col-sm-12 col-xs-12 custom-flex">
                        <div className="custom-card">
                            <div className="mn_heading">
                                <h5 className="info_number">PHP Mail</h5>
                            </div>
                            <div className="col-md-12">
                                <div className="input-group">
                                    <h4>Email From Address </h4>
                                    <div className="input-group-addon">
                                        <img src={launchSvg} alt="" />
                                    </div>
                                    <input type='text' className="form-control mn_input" placeholder='' />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="input-group">
                                    <h4>Email Password </h4>
                                    <div className="input-group-addon">
                                        <img src={launchSvg} alt="" />
                                    </div>
                                    <input type='password' className="form-control mn_input" placeholder='' />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="input-group">
                                    <h4>Emails From Name </h4>
                                    <div className="input-group-addon">
                                        <img src={launchSvg} alt="" />
                                    </div>
                                    <input type='text' className="form-control mn_input" placeholder='' />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <button className="btn-blue">Submit</button>
                                <button className="btn-black">Cancel</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12 col-xs-12 custom-flex">
                        <div className="custom-card">
                            <div className="mn_heading">
                                <h5 className="info_number">SMTP</h5>
                            </div>
                            <div>
                                <div className="col-md-12">
                                    <div className="input-group">
                                        <h4>Email From Address </h4>
                                        <div className="input-group-addon">
                                            <img src={launchSvg} alt="" />
                                        </div>
                                        <input type='text' className="form-control mn_input" placeholder='' />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="input-group">
                                        <h4>Email Password </h4>
                                        <div className="input-group-addon">
                                            <img src={launchSvg} alt="" />
                                        </div>
                                        <input type='password' className="form-control mn_input" placeholder='' />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="input-group">
                                        <h4>Email Host </h4>
                                        <div className="input-group-addon">
                                            <img src={launchSvg} alt="" />
                                        </div>
                                        <input type='text' className="form-control mn_input" placeholder='' />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="input-group">
                                        <h4>Email Port </h4>
                                        <div className="input-group-addon">
                                            <img src={launchSvg} alt="" />
                                        </div>
                                        <input type='text' className="form-control mn_input" placeholder='' />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <button className="btn-blue">Submit</button>
                                    <button className="btn-black">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmailSetting