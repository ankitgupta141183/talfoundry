import React, { Component } from "react";
import FreelancerHeader from "../miscellaneous/FreelancerHeader";
import {
  fetchJobOffer,
  responseToOffer,
} from "../../Actions/freelancerActions";
// import Footer from "../miscellaneous/Footer";
import ReadMoreAndLess from "react-read-more-less";
import { connect } from "react-redux";
import Modal from "react-modal";
import { isEmpty } from "lodash";
import Avatar from "react-avatar";
import faceImg from "../../static/images/profile-placeholder.png";
import { Link } from "react-router-dom";
import fileLogo from "../../static/images/file.png";
import FreelancerDashboardSideBar from "./FreelancerDashboardSideBar";
import BreadCrumb from "../miscellaneous/BreadCrumb";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    background: "transparent",
    width: "60%",
  },
}

const customStylesNew = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0px",
  },
}

class OfferDetails extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      isTermsChecked: false,
      termsError: true,
      messageToClient: "",
      acceptOfferModal: false,
      acceptPayModal: false,
      messageError: false,
      declineModal: false,
    }
    this.checkboxRef = React.createRef()
  }

  componentDidMount() {
    this.props.fetchJobOffer(this.props.match.params.id)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.props.fetchJobOffer(nextProps.match.params.id)
    }
  }

  handleChange = (e) => {
    this.setState({
      isTermsChecked: this.checkboxRef.current.checked,
      termsError: true,
    })
  }

  messageChange = (e) => {
    this.setState({ messageToClient: e.target.value, messageError: false })
  }

  closeModal = () => {
    this.setState({ acceptOfferModal: false, declineModal: false })
  }

  openModal = () => {
    this.setState({ messageToClient: "", acceptOfferModal: true })
  }

  openDeclineModal = () => {
    this.setState({ declineModal: true })
  }


  afterOpenModal = () => {
    this.subtitle.style.color = "#000";
  }

  paycloseModal = () => {
    this.setState({ acceptPayModal: false })
  }

  openPaymentModal = () => {
    this.setState({ acceptPayModal: true })
  }

  returnAttachements = () => {
    const {offerDetails} = this.props;
    let attachment = []

    if(offerDetails && offerDetails.attachments && offerDetails.attachments.length > 0){
      offerDetails.attachments.map(jobPer => {
         attachment.push(<div className="">
          <a target="_blank" rel="noopener noreferrer" href={jobPer} title={jobPer.split('/')[jobPer.split('/').length - 1]}>
            <img src={fileLogo} alt="fileLogo"/>
            <span style={{fontSize: '13px'}}>&nbsp;&nbsp;{jobPer.split('/')[jobPer.split('/').length - 1]} </span>
            </a>
          </div>
          )
          return jobPer
        })

    }
    else{
      attachment = 'None'
    }
    return <div className="row"> {attachment} </div>
  }

  offerResponse = (e) => {
    const offerResponse = e.target.id;
    if (offerResponse === "Accepted") {
      if (this.checkboxRef.current.checked && !this.state.messageError) {
        console.log("no error")
        this.props
          .responseToOffer(this.props.match.params.id, { status: e.target.id })
          .then((res) => {
            if (res.status === 200) {
              this.props.history.push("/all-contracts/active")
            }
          })
      } else {
        this.setState({
          termsError: this.checkboxRef.current.checked,
          messageError: this.state.messageToClient === "",
        })
      }
    }
    if (offerResponse === "Declined") {
      this.props
        .responseToOffer(this.props.match.params.id, { status: e.target.id })
        .then((res) => {
          if (res.status === 200) {
            this.props.history.push("/")
          }
        })
    }
  }

  fieldError(message) {
    return (
      <p id="firstName" className="error-field">
        {message ? message : "This field can't be blank."}
      </p>
    )
  }

  render() {
    const { offerDetails } = this.props;
    const { messageToClient } = this.state;
    const date = !isEmpty(offerDetails)
      ? new Date(offerDetails.created_at)
      : new Date()

    const due_date = !isEmpty(offerDetails) ? new Date(offerDetails.due_date) : ''

    const rate =
      offerDetails.payment_mode !== "fixed"
        ? offerDetails.hourly_rate
        : offerDetails.fixed_price_amount;
    return (
      <div>
          <FreelancerHeader history={this.props.history} />
        <div>

          <div className="view-offer-header-section">
            <div className="tf_inter " id="">
            <div className="d-flex">
              <div className="col-md-12 mt-20">
            <BreadCrumb step={"step6"} link="Offer Details" />
            </div >
              <div className="col-md-2 p-0 ">
                <FreelancerDashboardSideBar history={this.props.history}/>
              </div>
              <div className="col-md-10">
                <div className="project-manager-all-page-equal-top-shifting">
                  <div className="tf_aws_1">
                    <div className="col-lg-9 col-md-8">
                      <div className="margin-tops offers-details-table-display">
                          <h2>View Offer</h2>
                          <hr />

                          <div className="col-md-12">
                            <div className="col-md-6 nopad">
                              <p>
                                <strong>Status</strong>
                              </p>
                            </div>
                            <div className="col-md-6 nopad">
                              <p>{offerDetails.status}</p>
                            </div>
                          </div>
                          <div className="clearfix"></div>

                          <div className="col-md-12">
                            <div className="col-md-6 nopad">
                              <p>
                                <strong>Contract title</strong>
                              </p>
                            </div>
                            <div className="col-md-6 nopad">
                              <p>{offerDetails.title}</p>
                            </div>
                          </div>
                          <div className="clearfix"></div>

                          <div className="col-md-12">
                            <div className="col-md-6 nopad">
                              <p>
                                <strong>Related job openings</strong>
                              </p>
                            </div>
                            <div className="col-md-6 nopad">
                              <p style={{color:'#0DA4DE'}}>{offerDetails.job_title}</p>
                            </div>
                          </div>
                          <div className="clearfix"></div>

                          <div className="col-md-12">
                            <div className="col-md-6 nopad">
                              <p>
                                <strong>Platform</strong>
                              </p>
                            </div>
                            <div className="col-md-6 nopad">
                              <p>{offerDetails.job_category}</p>
                            </div>
                          </div>
                          <div className="clearfix"></div>

                          {offerDetails && offerDetails.due_date &&
                           <React.Fragment>
                            <div className="col-md-12">
                              <div className="col-md-6 nopad">
                                <p>
                                  <strong>Offer expires</strong>
                                </p>
                              </div>
                              <div className="col-md-6 nopad">
                                <p>{`${due_date.toLocaleString("default", {
                                            month: "short",
                                          })} ${due_date.getDate()}, ${due_date.getFullYear()}`}
                                </p>
                              </div>
                            </div>

                            <div className="clearfix"></div>
                           </React.Fragment>
                          }

                          <div className="col-md-12">
                            <div className="col-md-6 nopad">
                              <p>
                                <strong>Offer date</strong>
                              </p>
                            </div>
                            <div className="col-md-6 nopad">
                              <p>{`${date.toLocaleString("default", {
                                month: "short",
                              })} ${date.getDate()}, ${date.getFullYear()}`}</p>
                            </div>
                          </div>
                          <div className="clearfix"></div>
                      </div>


                      <div className="margin-tops">

                          <div className="col-md-12">
                            <div className="tf_freelancer_pro tf_status_1">
                              <div className="col-md-6 nopad">
                                <h5>Bid</h5>
                                <p>This is the amount the client will see</p>
                              </div>
                              <div className="col-md-2 nopad">
                                <h4>${rate && parseFloat(rate).toFixed(2)}</h4>
                              </div>
                              <div className="col-md-4 nopad"></div>
                            </div>
                          </div>
                          <div className="clearfix"></div>
                          <hr />

                          <div className="col-md-12">
                            <div className="tf_freelancer_pro tf_status_1">
                              <div className="col-md-7 nopad">
                                <h5>Attachments</h5>
                              </div>
                              <div className="col-md-4 nopad">
                                {this.returnAttachements()}
                              </div>
                            </div>
                          </div>
                          <div className="clearfix"></div>
                          <hr />

                          <div className="col-md-12">
                            <div className="tf_freelancer_pro tf_status_1">
                              <div className="col-md-6 nopad">
                                <h5>3% TalFoundry Service Fee</h5>
                              </div>
                              <div className="col-md-2 tf_status_2 nopad">
                                <h4>
                                  $
                                  {isNaN((rate * 3) / 100)
                                    ? "0.00"
                                    : parseFloat((rate * 3) / 100).toFixed(2)}
                                </h4>
                              </div>
                              <div className="col-md-4 nopad"></div>
                            </div>
                          </div>
                          <div className="clearfix"></div>
                          <hr />

                          <div className="col-md-12">
                            <div className="tf_freelancer_pro tf_status_1">
                              <div className="col-md-6 nopad">
                                <h5>You’ll Receive</h5>
                                <p>
                                  The estimate amount you will receive after
                                  service fee
                                </p>
                              </div>
                              <div className="col-md-2 nopad">
                                <h4>
                                  $
                                  {isNaN(rate - (rate * 3) / 100)
                                    ? "00"
                                    : parseFloat(rate - (rate * 3) / 100).toFixed(
                                        2
                                      )}
                                </h4>
                              </div>
                              <div className="col-md-4 nopad"></div>
                            </div>
                          </div>
                          <div className="clearfix"></div>
                          <hr />

                          <div className="col-md-12 work-description">
                            <h5><strong>Work Description</strong></h5>
                            {offerDetails.description && (
                              <ReadMoreAndLess
                                ref={this.ReadMore}
                                className="read-more-content"
                                charLimit={250}
                                readMoreText="Read more"
                                readLessText="Read less"
                              >
                                {offerDetails.description}
                              </ReadMoreAndLess>
                            )}
                            {offerDetails.attachment && (
                              <a
                                href={offerDetails.attachment}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Attached File
                              </a>
                            )}
                          </div>
                          <div className="clearfix"></div>

                      </div>

                    </div>
                    <div className="col-lg-3 col-md-4">
                      <div className="margin-tops project-manager-details-box">

                          <div className="tf_contracts_mile_img_1">
                            {offerDetails &&
                            offerDetails.hired_by &&
                            offerDetails.hired_by.image_url ? (
                              <img
                                className="img-circle"
                                src={offerDetails.hired_by.image_url}
                                alt="img"
                              />
                            ) : (
                              !isEmpty(offerDetails) && (
                                <Avatar
                                  src={faceImg}
                                  color="#FFB4B6"
                                  round="50px"
                                  size="80"
                                />
                              )
                            )}
                            <h3>
                              {!isEmpty(offerDetails) &&
                                offerDetails.hired_by.full_name}
                            </h3>
                            <h4>
                              {!isEmpty(offerDetails) &&
                                offerDetails.hired_by.country}
                            </h4>
                          </div>
                          <div className="tf_freelancer_pro_right accept-message-decline-box">
                            {  offerDetails && offerDetails.freelancer && offerDetails.freelancer.payment_method === "" ?
                                <Link to={{ pathname: "/settings", state: "getPaidPay" }} className="tf_invite_button" >
                                ACCEPT OFFER
                              </Link>

                              :
                                offerDetails.status === "Pending" ? (
                                  <Link
                                    className="tf_invite_button"
                                    onClick={this.openModal}
                                  >
                                    ACCEPT OFFER
                                  </Link>
                                ) : (
                                  <Link href="#" className="tf_invite_disabled">
                                    ACCEPT OFFER
                                  </Link>
                                ) }
                                <Link to="/messages" className="tf_invite_button">
                                  MESSAGE
                                </Link>
                                {offerDetails.status === "Pending" ? (
                                  <Link
                                    href="#"
                                    onClick={this.openDeclineModal}
                                    className="tf_invite_button"
                                  >
                                    DECLINE OFFER
                                  </Link>
                                ) : (
                                  <Link href="#" className="tf_invite_disabled">
                                    DECLINE OFFER
                                  </Link>
                                )}
                          </div>
                      </div>
                      <Modal
                          isOpen={this.state.acceptPayModal}
                          onAfterOpen={this.afterOpenModal}
                          onRequestClose={this.paycloseModal}
                          style={customStylesNew}
                          contentLabel="Example Modal"
                        >
                          <div className="add-payment-method-popup">
                            <div className="modal-header">
                              <button
                                type="button"
                                className="close"
                                onClick={this.paycloseModal}
                                data-dismiss="modal"
                              >
                                <span aria-hidden="true">×</span>
                              <span className="sr-only">Close</span>
                              </button>
                              <h2
                                className="modal-title"
                                ref={(subtitle) => (this.subtitle = subtitle)}
                              >
                                Payment Method
                              </h2>
                            </div>
                            <div className="modal-body">
                              <div className="row">
                                <div className="col-md-12">
                                  <p>
                                    You have not added any payment method. Please add one by{" "}
                                    <a href="/settings">Clicking Here </a>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Modal>
                      <Modal
                        isOpen={this.state.acceptOfferModal}
                        style={customStyles}
                        onRequestClose={this.closeModal}
                      >
                        <div className="modal-dialog tf_model details_conditions">
                          <div className="modal-content">
                            <div className="modal-header">
                              <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                onClick={this.closeModal}
                                aria-label="Close"
                              >
                                <span aria-hidden="true">×</span>
                              </button>
                              <h4 className="modal-title" id="myModalLabel">
                                Accept Offer
                              </h4>
                            </div>
                            <div className="modal-body">
                              <div className="col-md-12">
                                <div className="input-group tf_loca">
                                  <label>Message to Client</label>
                                  <textarea
                                    onChange={this.messageChange}
                                    value={messageToClient}
                                    className="form-control mn_input tf_loca1 offer-details-page"
                                    rows="5"
                                  ></textarea>
                                  {this.state.messageError && this.fieldError()}
                                </div>
                              </div>
                              <div className="col-md-12">
                                <div className="tf_slot1">
                                  <h5>Agree to Terms</h5>
                                </div>
                              </div>
                              <div className="col-md-12">
                                <div className="tf_sound tf_sound2">
                                  <input
                                    type="checkbox"
                                    id="agree1"
                                    ref={this.checkboxRef}
                                    onChange={this.handleChange}
                                    checked={this.state.isTermsChecked}
                                    name="agreementPolicy"
                                  />
                                  <label htmlFor="agree1">
                                    Yes, I understand and agree to the Talfoundry
                                    Terms of Service, including the User Agreement
                                    and Privacy Policy.
                                  </label>
                                  {!this.state.termsError &&
                                    this.fieldError(
                                      "You need to accept the terms of service."
                                    )}
                                </div>
                              </div>
                            </div>
                            <div className="modal-footer tf_btns tf_ftr_btn">
                              <button
                                onClick={this.offerResponse}
                                id="Accepted"
                                type="button"
                                className="btn btn-primary"
                              >
                                Accept Offer
                              </button>
                              <button
                                type="button"
                                onClick={this.closeModal}
                                className="btn btn-default"
                                data-dismiss="modal"
                                aria-label="Close"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      </Modal>
                      <Modal
                        isOpen={this.state.declineModal}
                        style={customStyles}
                        onRequestClose={this.closeModal}
                      >
                        <div className="modal-body admin-applicant-pop-up">
                          <div className="tf_appl_ace">
                            <p>Are you sure you want to decline this offer?</p>
                            <button
                              onClick={this.closeModal}
                              type="button"
                              className="btn btn-not-ban"
                            >
                              Don't Decline
                            </button>
                            <button
                              onClick={this.offerResponse}
                              id="Declined"
                              type="button"
                              className="btn btn-ban"
                            >
                              Decline
                            </button>
                          </div>
                        </div>
                      </Modal>
                    </div>
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

const mapStateToProps = (state) => ({
  ...state,
})

const mapDispatchToProps = (dispatch) => {
  return {
    fetchJobOffer: (id) => dispatch(fetchJobOffer(id)),
    responseToOffer: (id, data) => dispatch(responseToOffer(id, data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OfferDetails)