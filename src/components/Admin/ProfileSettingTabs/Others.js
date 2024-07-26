import React from 'react';
import launchSvg from '../../../static/images/baseline-launch-24px.svg';

const Others = () => {
    return (
        <div>
            <div className="col-md-12 p-0 mb-4" id="general-setting">
                <div className="row setting-page-input">
                    <div className="col-md-6 col-sm-12 col-xs-12 custom-flex">
                        <div className="custom-card">
                            <div className="mn_heading">
                                <h5 className="info_number">Enable Google Analytics</h5>
                            </div>
                            <div className="col-md-12">
                                <div className="input-group">
                                    <h4>Google Analytics </h4>
                                    <textarea type='text' className="" placeholder='Google Analytics' rows='4' />
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
                                <h5 className="info_number">Enable Google Adsense Code</h5>
                            </div>
                            <div className="col-md-12">
                                <div className="input-group">
                                    <h4>Google Adsense Code </h4>
                                    <textarea type='text' className="" placeholder='Google Adsense Code' rows='4' />
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
                                <h5 className="info_number">Display Facebook Messenger</h5>
                            </div>
                            <div className="col-md-12">
                                <div className="input-group">
                                    <h4>Facebook Messenger </h4>
                                    <textarea type='text' className="" placeholder='Facebook Messenger' rows='4' />
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
                                <h5 className="info_number">Display Facebook Pixel</h5>
                            </div>
                            <div className="col-md-12">
                                <div className="input-group">
                                    <h4>Google Adsense Code </h4>
                                    <textarea type='text' className="" placeholder='Google Adsense Code' rows='4' />
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
                                <h5 className="info_number">Display Google Recaptcha</h5>
                            </div>
                            <div>
                                <div className="col-md-12">
                                    <div className="input-group">
                                        <h4>Google Rechaptcha Site Key </h4>
                                        <div className="input-group-addon">
                                            <img src={launchSvg} alt="" />
                                        </div>
                                        <input type='text' className="form-control mn_input" placeholder='6LcnPoEaAAAAAF6QhKPZ8V4744yiEnr41li3SYDn' />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="input-group">
                                        <h4>Google Rechaptcha Secret Key </h4>
                                        <div className="input-group-addon">
                                            <img src={launchSvg} alt="" />
                                        </div>
                                        <input type='text' className="form-control mn_input" placeholder='6LcnPoEaAAAAACV_xC4jdPqumaYKBnxz9Sj6y0zk' />
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
                                <h5 className="info_number">Cookies Agreement</h5>
                            </div>
                            <div>
                                <div className="col-md-12">
                                    <div className="input-group">
                                        <h4>Cookies Agreement Text </h4>
                                        <div>
                                            <textarea
                                                class="form-control"
                                                id="editor"
                                                rows="7"
                                                placeholder=""
                                                v-tinymce-editor="content">
                                            </textarea>
                                        </div>
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

export default Others