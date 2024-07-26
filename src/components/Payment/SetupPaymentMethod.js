import React, {Component} from "react";
import { connect } from "react-redux";
import FreelancerHeader from "../miscellaneous/FreelancerHeader";
import ProjectManagerHeader from "../miscellaneous/ProjectManagerHeader";
import Footer from '../miscellaneous/Footer';
import {setPaymentMethod} from '../../Actions/ProjectManagerFreelancerActions';
import {Link} from 'react-router-dom';
import SuccessSweetAlert from "../CommonComponets/SweetAlert/SuccessSweetAlert";



class AddPaymentModal extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
     isPaymentVerified: false
    }
  }

  submitPaymentDetails = (accountType) => {
    this.props.setPaymentMethod(accountType)
    .then(res => {
      if(res.status === 200) {
        this.props.history.push({
         pathname: '/settings',
         state: "paymentMethodAdded"
         })
      }else{
        alert("Internal server error, please try again later.")
      }
    })
  }

  hideAlert = () => {this.setState({isPaymentVerified: false})}

  render() {
    const {currentUser, isPaymentVerified} = this.props;
    return (
        <div className="">
          {(currentUser.role === "Freelancer") ? (<FreelancerHeader history={this.props.history} />) : (<ProjectManagerHeader history={this.props.history} />)}
          <div className="tf_inter setup-payment-header">
          {isPaymentVerified && 
          // <div className="app-pro2-swal">
          //   <SweetAlert
          //   success
          //   confirmBtnText="Ok"
          //   confirmBtnBsStyle="success"
          //   onConfirm={this.hideAlert}
          //   >
          //     <div id="EditJobSuccessMessagePopupInnerContent">
          //         <img src={inviteIcon} alt="" id="rightCheckIconImage" />
          //         <h4>
          //           <strong>
          //             Account Added Successfully.
          //           </strong>
          //         </h4>
          //       </div>
          //    </SweetAlert>
          // </div>
          <SuccessSweetAlert 
          show={true}
          handleConfirm={this.hideAlert}
          message={"Account Added Successfully."}
          />
          
          }
            <div className="container">
              <div className="col-md-12 tf_pad_res">
                <div className="col-md-12"> 
                  <div className="tf_back_job">
                    <h2>Set up Payments: {this.props.match.params.type}</h2>
                    <p>Transfer funds to your {this.props.match.params.type} account for $2 USD per withdrawal, plus any fees charged by {this.props.match.params.type}.
                    <Link to={`#`}>Learn more about {this.props.match.params.type} withdrawals</Link></p>
                  </div>
                </div>
                <div className="">
                  <div className="col-lg-12">
                    <div className="margin-tops">
                      <div className="tf_freelancer_pro tf_paypal">
                        <div className="col-md-12  col-sm-12 col-xs-12 tf_full_width">
                          <h5>Don’t have a {(this.props.match.params.type).replace(/\b\w/g, l => l.toUpperCase())} account?<Link to={`#`}> Visit {this.props.match.params.type}</Link></h5>
                          <div className="col-md-6 tf_top_2 nopad">
                            <div className="input-group tf_pay">
                              <label>{this.props.match.params.type.replace(/\b\w/g, l => l.toUpperCase())} Email Address</label>
                              <input type="Full Name" className="form-control mn_input" name="Full Name" placeholder="john@doe.com"
                                value={currentUser.email}/>
                              <div className="clearfix"></div>
                              <Link to={`#`}>Not your {this.props.match.params.type} email address?</Link>
                              <p>This payment method will become active in 3 days.</p>
                            </div>
                          </div>
                        </div>
                        <div className="clearfix"></div>
                        <hr/>
                        { currentUser.role === "Freelancer" ?  <div className="col-md-12">
                          <Link to={`#`} onClick={this.submitPaymentDetails.bind(this, this.props.match.params.type)} className="tf_submit">NEXT</Link>
                          <Link to={`#`} onClick={()=> this.props.history.goBack()} className="tf_cancel">CANCEL</Link>
                        </div>
                        :
                        <div className="col-md-12">
                          <Link to={`#`} onClick={() => this.props.history.push('/payment-schedule')} className="tf_submit">NEXT</Link>
                          <Link to={`#`} onClick={()=> this.props.history.goBack()} className="tf_cancel">CANCEL</Link>
                        </div>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <Footer /> */}
        </div>
      )
    }
  }

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = (dispatch) => {
  return {
    setPaymentMethod: (account_type) => dispatch(setPaymentMethod(account_type))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPaymentModal)