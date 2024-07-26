import React, {Component} from "react";
import { connect } from "react-redux";
import FreelancerHeader from "../miscellaneous/FreelancerHeader";
import ProjectManagerHeader from "../miscellaneous/ProjectManagerHeader";
import Footer from '../miscellaneous/Footer';
import { Link } from "react-router-dom";


class PaymentSchedule extends Component {

  render() {
    const {currentUser} = this.props;
    return (
        <div>
          {(currentUser.role === "Freelancer") ? (<FreelancerHeader history={this.props.history} />) : (<ProjectManagerHeader history={this.props.history} />)}
            <div className="tf_inter">
              <div className="container">
                <div className="col-md-12 tf_pad_res">
                  <div className="col-md-12">
                    <div className="tf_back_job">
                      <h2>Set up Payments: PayPal</h2>
                      <p>PayPal (john@doe.com) <br />Earnings will be sent here according to the following schedule.</p>
                    </div>
                  </div>
                  <div className="">
                    <div className="col-lg-12">
                      <div className="margin-tops">
                        <div className="tf_freelancer_pro tf_paypal">
                          <div className="col-md-12  col-sm-12 col-xs-12 tf_full_width">
                            <h5>Withdrawal Fee</h5>
                            <p>$2.00 per payment <br />Additional PayPal fees may apply.</p>
                            <h5>Preferred Payment Schedule</h5>
                            <p>Earnings will be released upon your request. <Link>Learn more</Link> </p>

                            <div className="col-md-12 nopad">
                              <div className="tf_deposit">
                                <div className="form-check-inline">
                                  <label className="customradio" htmlFor="Deposit_1"><span className="radiotextsty">Quarterly (Jun 24,
                                      2019)</span>
                                    <input type="radio" name="radio" id="Deposit_1"/>
                                    <span className="checkmark"></span>
                                  </label>
                                  <label className="customradio" htmlFor="Deposit_2"><span className="radiotextsty">Monthly (last Wednesday of
                                      each month)</span>
                                    <input type="radio" id="Deposit_2" name="radio"/>
                                    <span className="checkmark"></span>
                                  </label>
                                  <label className="customradio" htmlFor="Deposit_3"><span className="radiotextsty">Twice per month (1st and 3rd
                                      Wednesday of each month)</span>
                                    <input type="radio" name="radio" id="Deposit_3"/>
                                    <span className="checkmark"></span>
                                  </label>
                                  <label className="customradio" htmlFor="Deposit_4"><span className="radiotextsty">Weekly (every
                                      Wednesday)</span>
                                    <input type="radio" id="Deposit_4" name="radio"/>
                                    <span className="checkmark"></span>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="clearfix"></div>
                            <div className="col-md-8 tf_top_2 nopad">
                              <label>Only When Balance Is</label>
                              <div className="input-group tf_loca">
                                <div className="selectedwrap">
                                  <select className="form-control mn_input mySelectBoxClassName">
                                    <option>$100.00 or more</option>
                                    <option>$1000.00 or more</option>
                                  </select>
                                </div>
                                <p>Minimise withdrawal fees by choosing larger amounts. <Link> Learn more</Link></p>
                              </div>
                            </div>
                            <div className="clearfix"></div>
                            <div className="col-md-8 nopad">
                              <label>Maintain A Reserve Balance</label>
                              <div className="input-group tf_loca">
                                <div className="selectedwrap">
                                  <select className="form-control mn_input mySelectBoxClassName">
                                    <option>$100.00</option>
                                    <option>$1000.00</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="clearfix"></div>
                            <div className="col-md-8 nopad">
                              <h5>Next Payment (based on your schedule)</h5>
                              <p>June 24, 2019</p>
                            </div>
                          </div>
                          <div className="clearfix"></div>
                          <div className="col-md-12">
                            <Link className="tf_submit">NEXT</Link>
                            <Link onClick={(e) => {e.preventDefault(); this.props.history.goBack()}} className="tf_back1">BACK</Link>
                            <Link onClick={(e) => {e.preventDefault(); this.props.history.push('/settings')}} className="tf_cancel">CANCEL</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
        </div>
      )
    }
  }

const mapStateToProps = state => ({
  ...state
})


export default connect(mapStateToProps, null)(PaymentSchedule)