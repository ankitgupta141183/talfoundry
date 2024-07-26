import React from 'react';
import launchSvg from '../../../static/images/baseline-launch-24px.svg';

const SocialLinks = () => {
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
                                    <br />
                                    <div className='custom_d-flex social_action-row'>
                                        <button className='social_btn'><i className='fa fa-facebook'></i></button>
                                        <input type='text' className="form-control mn_input" placeholder='https://www.facebook.com' />
                                        <button className='trash_btn'><i className='fa fa-trash'></i></button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="input-group">
                                    <div className='custom_d-flex social_action-row'>
                                        <button className='social_btn'><i className='fa fa-twitter'></i></button>
                                        <input type='text' className="form-control mn_input" placeholder='https://www.facebook.com' />
                                        <button className='trash_btn'><i className='fa fa-trash'></i></button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="input-group">
                                    <div className='custom_d-flex social_action-row'>
                                        <button className='social_btn'><i className='fa fa-youtube-play'></i></button>
                                        <input type='text' className="form-control mn_input" placeholder='https://www.facebook.com' />
                                        <button className='trash_btn'><i className='fa fa-trash'></i></button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="input-group">
                                    <div className='custom_d-flex social_action-row'>
                                        <button className='social_btn'><i className='fa fa-linkedin-square'></i></button>
                                        <input type='text' className="form-control mn_input" placeholder='https://www.facebook.com' />
                                        <button className='trash_btn'><i className='fa fa-trash'></i></button>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-12'>
                                <button className='add-links'><i className='fa fa-plus mr-2'></i>&nbsp;Add More</button>
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
    )
}
export default SocialLinks