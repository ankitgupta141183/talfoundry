import React from 'react';
import launchSvg from '../../../static/images/baseline-launch-24px.svg';

const PaymentSetting = () => {
    return (
        <div>
            <div className="col-md-12 p-0 mb-4" id="general-setting">
                <div className="row setting-page-input">
                    <div className="col-md-6 col-sm-12 col-xs-12 custom-flex">
                        <div className="custom-card">
                            <div className="mn_heading">
                                <h5 className="info_number">Paypal</h5>
                            </div>
                            <div className="col-md-12">
                                <div className="input-group">
                                    <h4>Braintree Tokenization key </h4>
                                    <div className="input-group-addon">
                                        <img src={launchSvg} alt="" />
                                    </div>
                                    <input type='text' className="form-control mn_input" placeholder='sandbox_pgjcppvs_pd6gznv7zbrx9hb8' />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="input-group">
                                    <h4>Braintree Merchant ID </h4>
                                    <div className="input-group-addon">
                                        <img src={launchSvg} alt="" />
                                    </div>
                                    <input type='text' className="form-control mn_input" placeholder='pd6gznv7zbrx9hb8' />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="input-group">
                                    <h4>Braintree Public key </h4>
                                    <div className="input-group-addon">
                                        <img src={launchSvg} alt="" />
                                    </div>
                                    <input type='text' className="form-control mn_input" placeholder='h8bydrz7gcjkp7d4' />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="input-group">
                                    <h4>Braintree Private key </h4>
                                    <div className="input-group-addon">
                                        <img src={launchSvg} alt="" />
                                    </div>
                                    <input type='text' className="form-control mn_input" placeholder='sandbox_pgjcppvs_pd6gznv7zbrx9hb8' />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="input-group">
                                    <h4>Paypal APP ID </h4>
                                    <div className="input-group-addon">
                                        <img src={launchSvg} alt="" />
                                    </div>
                                    <input type='text' className="form-control mn_input" placeholder='pd6gznv7zbrx9hb8' />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="input-group">
                                    <h4>Paypal Secret Key </h4>
                                    <div className="input-group-addon">
                                        <img src={launchSvg} alt="" />
                                    </div>
                                    <input type='text' className="form-control mn_input" placeholder='h8bydrz7gcjkp7d4' />
                                </div>
                            </div>
                            {/* <div className="col-md-12">
                                <button className="btn-blue">Save</button>
                                <button className="btn-black">Cancel</button>
                            </div> */}
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12 col-xs-12 custom-flex">
                        <div className="custom-card">
                            <div className="mn_heading">
                                <h5 className="info_number">Stripe</h5>
                            </div>
                            <div>
                                <div className="col-md-12">
                                    <div className="input-group">
                                        <h4>Gateway Name </h4>
                                        <div className="input-group-addon">
                                            <img src={launchSvg} alt="" />
                                        </div>
                                        <input type='text' className="form-control mn_input" placeholder='Stripe' />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="input-group">
                                        <h4>API Key </h4>
                                        <div className="input-group-addon">
                                            <img src={launchSvg} alt="" />
                                        </div>
                                        <input type='text' className="form-control mn_input" placeholder='pk_test_AealxxOygZz84AruCGadWvUV00mJQZdLvr' />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="input-group">
                                        <h4>Rest Key </h4>
                                        <div className="input-group-addon">
                                            <img src={launchSvg} alt="" />
                                        </div>
                                        <input type='text' className="form-control mn_input" placeholder='sk_test_8HwqAWwBd4C4E77bgAO1jUgk00hDlERgn3' />
                                    </div>
                                </div>
                                {/* <div className="col-md-12">
                                    <button className="btn-blue">Save</button>
                                    <button className="btn-black">Cancel</button>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentSetting