import React from 'react';
import launchSvg from '../../../static/images/baseline-launch-24px.svg';

const Localization=()=>{
    return(
        <div>
            <div className="col-md-12 p-0 mb-4" id="general-setting">
                <div className="row setting-page-input">
                    <div className="col-md-6 col-sm-12 col-xs-12 custom-flex">
                        <div className="custom-card">
                            <div className="mn_heading">
                                <h5 className="info_number">Localization Details</h5>
                            </div>
                            <div className="col-md-12">
                                <div className="input-group">
                                    <h4>Time Zone </h4>
                                    <div className="input-group-addon">
                                        <img src={launchSvg} alt="" />
                                    </div>
                                    <select className="form-control mn_input">
                                        <option>Time1</option>
                                        <option>Time2</option>
                                        <option>Time3</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="input-group">
                                    <h4>Date Format</h4>
                                    <div className="input-group-addon">
                                        <img src={launchSvg} alt="" />
                                    </div>
                                    <select className="form-control mn_input">
                                        <option>Date1</option>
                                        <option>Date2</option>
                                        <option>Date3</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="input-group">
                                    <h4>Time Format</h4>
                                    <div className="input-group-addon">
                                        <img src={launchSvg} alt="" />
                                    </div>
                                    <select className="form-control mn_input">
                                        <option>Time1</option>
                                        <option>Time2</option>
                                        <option>Time3</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="input-group">
                                    <h4>Currency Symbol</h4>
                                    <div className="input-group-addon">
                                        <img src={launchSvg} alt="" />
                                    </div>
                                    <select className="form-control mn_input">
                                        <option>$</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <button className="btn-blue">Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Localization