import React, { Component } from "react";
import ProjecetManagerHeader from "../miscellaneous/ProjectManagerHeader";
import Footer from "../miscellaneous/Footer";
import {
  getConversation,
  getConversations,
  updateConversation,
  createMessage,
} from "../../Actions/conversationActions";
import { fetchContractDetailsForHM } from "../../Actions/ProjectManagerFreelancerActions";
import { connect } from "react-redux";
import ReadMoreAndLess from "react-read-more-less";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import faceImg from "../../static/images/profile-placeholder.png";
import { isEmpty } from "lodash";
import { ActionCableConsumer } from "react-actioncable-provider";
import Cable from "../../components/miscellaneous/Cable";
import msgAudio from "../../static/Audio/sharp.mp3";
import { Multiselect } from 'multiselect-react-dropdown';
import PMDashboardSideBar from "./PMDashboardSideBar";
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

class ContractDetailsForHM extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      newConversation: [],
      conversations: [],
      activeConversation: null,
      removeModal: false,
      errors: {},
      hireJobIdError: false,
      hireJobId: "",
      freelancerToHire: {},
    }
  }
  componentDidMount() {
    this.props.getContract(this.props.match.params.id);
  }

  handleSection = (e) => {
    if (e.target.id === "messaageSection") {
      const freelancerId =
        !isEmpty(this.props.contractDetails) &&
        this.props.contractDetails.freelancer_id;
      this.props.getConversation(freelancerId).then((res) => {
        this.setState({ newConversation: res });
      });
    }
    this.props.getConversations().then((res) => {
      this.setState({ conversations: res });
    });
  }
  messageSubmit = (conversationId, e) => {
    e.preventDefault();
    const textVal = e.target.elements[0].value;
    const data = {
      text: textVal,
      user_id: this.props.currentUser.id || this.props.currentUser.user_id,
      conversation_id: conversationId,
    }
    if (textVal !== "") {
      this.props
        .createMessage(data)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    e.target.elements[0].value = "";
  }

  handleReceivedConversation = (response) => {
    const { conversation } = response;
    let newState = Object.assign({}, this.state);
    const hasConv = newState.conversations.find(
      (a) => a.id === conversation.id
    );
    if (!hasConv) {
      newState.conversations.push(conversation);
    }
    this.setState(newState);
  }

  handleReceivedMessage = (response) => {
    const { message } = response;
    let newState = Object.assign({}, this.state);
    let conversation = newState.conversations.find(
      (conversation) => conversation.id === message.conversation_id
    );
    if (conversation.messages.find((a) => a.id === message.id)) {
    } else {
      conversation.messages = [...conversation.messages, message];
    }

    if (newState.newConversation.messages.find((a) => a.id === message.id)) {
    } else {
      newState.newConversation.messages = [
        ...newState.newConversation.messages,
        message,
      ];
    }

    if (
      response.message.user_id !==
      (this.props.currentUser.user_id || this.props.currentUser.id)
    ) {
      var audio = new Audio(msgAudio);
      audio.play();
    }
    this.setState(newState);
    let elmt = document.getElementsByClassName("msg");
    elmt[elmt.length - 1].scrollIntoView();
  }

  handlePaymentRemove = () => {
    this.setState({ removeModal: true });
  }

  closeModal = () => {
    this.setState({ removeModal: false });
  }

  handleRateType = (e) => {
    this.setState({ rateType: e.target.value });
  }

  handleJobChange = (e) => {
    let { errors } = this.state;
    if (e.target.value) {
      errors["inviteJobId"] = "";
    }
    this.setState({
      inviteJobId: e.target.value,
      errors: errors,
      hireJobId: e.target.value,
    });
  }

  onSelect = (selectedList, selectedItem) => {
    // console.log(selectedList, '-------' ,selectedItem)
    let { errors } = this.state;
    if (!isEmpty(selectedItem)) {
      errors["inviteJobId"] = "";
    }

    this.setState({
      errors: errors,
      inviteJobId: selectedItem.id,
      hireJobId: selectedItem.id
    });
  }

  handleHireClose = () => {
    this.setState({ removeModal: false, hireText: "", hireJobId: "" });
  }

  hireFreelancer = (freelancer) => {
    this.setState({
      removeModal: true,
      freelancerToHire: freelancer,
      hireText: "",
      freelancerIdToHire: freelancer.freelancer && freelancer.freelancer.uuid,
    });
  }

  goToHiringPage = (e) => {
    if (this.state.hireJobId) {
      this.props.history.push({
        pathname: `/hire-a-freelancer/${this.state.freelancerIdToHire}/${this.state.hireJobId}`,
        state: { rateType: this.state.rateType },
      });
      this.setState({ removeModal: false });
    } else {

      let { errors } = this.state;
      errors["inviteJobId"] = "Please select a job.";

      this.setState({
        errors: errors
      });
    }
  }

  render() {
    const { contractDetails } = this.props;
    const {
      conversations,
      newConversation,
      removeModal,
      rateType,
      errors,
      freelancerToHire,
    } = this.state;
    const conversationDate = new Date(newConversation.created_at);
    const startDate = !isEmpty(contractDetails)
      ? new Date(contractDetails.start_date)
      : new Date();

    function formatAMPM(date) {
      date = new Date(date);
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? "0" + minutes : minutes;
      var strTime = hours + ":" + minutes + " " + ampm;
      return strTime;
    }
    return (
      <div className="all-contracts-milestones-details">
        <ProjecetManagerHeader history={this.props.history} />
        <div id="tf-project-manager-dashboard-root">
        <BreadCrumb step={"step6"} link="Contract Details" />
        </div>
        <ActionCableConsumer
          channel={{ channel: "ConversationsChannel" }}
          onReceived={this.handleReceivedConversation}
        />
        {this.state.conversations.length ? (
          <Cable
            conversations={conversations}
            handleReceivedMessage={this.handleReceivedMessage}
          />
        ) : null}
        <Modal
          isOpen={removeModal}
          style={customStyles}
          onRequestClose={this.closeModal}
        >
          <div className="modal-dialog" id="invite-freelancer-popup">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  onClick={this.closeModal}
                >
                  <span aria-hidden="true">×</span>
                  <span className="sr-only">Close</span>
                </button>
                <h3 className="invite-freelancer-popup-heading">
                  Hire {contractDetails.freelacer_name}
                </h3>
              </div>

              <div className="modal-body">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 padding_12">
                  <div className="col-lg-2 col-md-2 col-sm-2 col-xs-3 tf_full_width">
                    <div className="tf_image"></div>
                  </div>
                </div>

                <div className="clearfix"></div>

                <div className="col-md-12">
                  <div className="form-group">
                    <div className="input-group">
                      <label>Choose a Job</label>
                      <div className="selectedwrap">
                        <Multiselect
                          options={freelancerToHire.available_jobs_for_contract}
                          singleSelect
                          displayValue="title"
                          onSelect={this.onSelect}
                          selectedValues={this.state.selectedValue}
                          className="form-control mn_input"
                          placeholder="Select Job."
                        />

                        <p className="form-error">{errors["inviteJobId"]}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="clearfix"></div>
                <div className="col-md-12 col-sm-12 col-xs-12">
                  <div className="form-group">
                    <label className="labeltext">Job Type</label>
                    <br />
                    <div
                      className="form-check-inline"
                      onChange={this.handleRateType}
                    >
                      <label className="customradio">
                        <span className="radiotextsty">Hourly</span>
                        <input
                          type="radio"
                          checked={rateType === "hourly"}
                          name="radio"
                          value="hourly"
                        />
                        <span className="checkmark"></span>
                      </label>{" "}

                      <label className="customradio">
                        <span className="radiotextsty">Fixed - Price</span>
                        <input
                          type="radio"
                          value="fixed price"
                          checked={rateType === "fixed price"}
                          name="radio"
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="clearfix"></div>
                <div className="modal-footer tf_model_footer1">
                  <div className="col-md-12 nopad">
                    <div className="col-md-3 col-sm-4 col-xs-6">
                      <button
                        onClick={this.goToHiringPage}
                        type="button"
                        className="btn btn-fill btn-cyan btn-wd pm_contract_details"
                      >
                        Continue
                      </button>
                    </div>
                    <div className="col-md-3 col-sm-4 col-xs-6">
                      <button
                        onClick={this.handleHireClose}
                        type="button"
                        className="btn btn-fill btn-elegant btn-wd"
                        data-dismiss="modal"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        <div className="mn_center freelanceraccountcontactsDetails pb-0 ">

          <div className="">
            <div className="row custom_row">
              <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 p-0">
                <div className="custom_sticky_container">
                  <div className="position-sticky">
              <PMDashboardSideBar history={this.props.history} />
                  </div>
                </div>
            </div>
            <div className="col-md-10 col-md-10 col-sm-10 col-xs-10">
              <div className="col-md-12 tf_resp_padd">
                <div className="tf_aws tf_contracts_mile mt-0">
                  <div className="col-md-12 px-0">
                    <div className="tf_contracts_mile_main">
                      <div className="col-md-7 col-sm-12 col-xs-12">
                        <div className="col-md-2 col-sm-2 col-xs-4 tf_full_width nopad-left">
                          <div className="tf_contracts_mile_img_1 tf_image">
                            {!isEmpty(contractDetails) &&
                              !isEmpty(contractDetails.freelancer) &&
                              !isEmpty(contractDetails.freelancer.user_picture) ? (
                              <img
                                src={contractDetails.freelancer.user_picture}
                                className="img-circle-invite"
                                alt="img"
                              />
                            ) : (
                              <img
                                src={faceImg}
                                className="img-circle-invite"
                                alt="img"
                              />
                            )}
                          </div>
                        </div>
                        <div className="col-md-10 col-sm-10 col-xs-8 tf_full_width nopad">
                          <div className="tf_free_name">
                            <h4>{contractDetails.freelacer_name}</h4>
                            <p>{contractDetails.title}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-5 col-sm-12 col-xs-12 pull-right">
                        <div className="col-md-7 col-sm-7 col-xs-10 tf_full_width tf_padding_left"></div>
                        <div className="col-md-4 col-sm-4 col-xs-5 tf_full_width">
                          <div className="tf_hire">
                            {(!isEmpty(contractDetails) && !isEmpty(contractDetails.hired_by.payment_method)) ? (
                              <Link
                                href="hire_freelancer.html"
                                onClick={this.hireFreelancer.bind(
                                  this,
                                  contractDetails
                                )}
                              >
                                Rehire
                              </Link>
                            ) : (
                              <Link to={{ pathname: "/settings", state: "payMethodPresent" }}>
                                Rehire
                              </Link>
                            )}
                          </div>
                          <div className="tf_dropdown">
                            <div className="dropdown">
                              <span
                                className="dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                              >
                                <i
                                  className="fa fa-ellipsis-v"
                                  style={{ fontSize: "25px" }}
                                ></i>
                              </span>

                              <div
                                className="dropdown-menu mt-30 ml-20"
                                aria-labelledby="dropdownMenuButton"
                              >
                                {this.props.currentUser.role ===
                                  "Project Manager" &&
                                  !(
                                    contractDetails &&
                                    contractDetails.manager_rating_id
                                  )
                                  ? contractDetails &&
                                  contractDetails.freelancer && (
                                    <Link
                                      className="col-sm-12 mt-10 mb-10 dropdown-item"
                                      to={{
                                        pathname: `/end-contract/${contractDetails.id}`,
                                        state: {
                                          uuid: `${contractDetails.uuid}`,
                                          id: `${contractDetails.id}`,
                                          rated_user_id: `${contractDetails.freelancer.id}`,
                                          userId: `${this.props.currentUser.user_id}`,
                                          job_Id:`${contractDetails.job_id}`
                                        },
                                      }}
                                    >
                                      End Contract
                                    </Link>
                                  )
                                  : ""}

                                {!contractDetails.freelancer_rating_id &&
                                  !contractDetails.manager_rating_id ? (
                                  ""
                                ) : (
                                  <Link
                                    className="col-sm-12 mt-10 mb-10 dropdown-item"
                                    to={{
                                      pathname: `/manager-show-rating/${contractDetails.id}`,
                                      state: {
                                        uuid: `${contractDetails.uuid}`,
                                        id: `${contractDetails.id}`,
                                        manager_rating_id: `${contractDetails.manager_rating_id}`,
                                        freelancer_rating_id: `${contractDetails.freelancer_rating_id}`,
                                        userId: `${this.props.currentUser.user_id}`,
                                      },
                                    }}
                                  >
                                    Show Rating
                                  </Link>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-1 col-sm-1 col-xs-3 tf_full_width">
                          <div className="tf_dot">
                            <Link href={`#`}>
                              <img src="images/Icon_More_Filled.svg" alt="" />
                            </Link>
                          </div>
                        </div>
                        <div className="clearfix"></div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="modal fade tf_sent"
                    id="myModal1"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="myModalLabel"
                  >
                    <div className="modal-dialog tf_moderl_sent" role="document">
                      <div className="modal-content tf_float">
                        <div className="modal-header">
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                          >
                            <span aria-hidden="true">×</span>
                            <span className="sr-only">Close</span>
                          </button>
                        </div>
                        <div className="modal-body" align="center">
                          <div className="col-md-12">
                            <img src="images/invite.png" alt="" />
                            <h5>
                              Invite Sent. <br /> Carolyn will get back to you
                              shortly.
                            </h5>
                          </div>
                          <div className="clearfix"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 px-0">
                    <div className="tabbable-panel">
                      <div className="tabbable-line">
                        <div className="tab-content">
                          <div className="invite_freelancer tf_all__mile_tab">
                            <ul className="nav nav-tabs" role="tablist">
                              <li role="presentation" className="active">
                                <a
                                  href="#SEARCH"
                                  aria-controls="SEARCH"
                                  role="tab"
                                  data-toggle="tab"
                                  style={{
                                    fontSize: '12px',
                                    fontWeight: 'bold'
                                  }}
                                >
                                  MILESTONES & PAYMENTS
                                </a>
                              </li>
                              <li role="presentation">
                                <a
                                  href="#INVITED"
                                  aria-controls="profile"
                                  id="messaageSection"
                                  role="tab"
                                  onClick={this.handleSection}
                                  data-toggle="tab"
                                  style={{
                                    fontSize: '12px',
                                    fontWeight: 'bold'
                                  }}
                                >
                                  MESSAGES & FILES
                                </a>
                              </li>
                              <li role="presentation">
                                <a
                                  href="#HIRES"
                                  aria-controls="messages"
                                  role="tab"
                                  data-toggle="tab"
                                  style={{
                                    fontSize: '12px',
                                    fontWeight: 'bold'
                                  }}
                                >
                                  TERMS & SETTINGS
                                </a>
                              </li>
                              <li role="presentation">
                                <Link>
                                  <img src="images/Icon_More_Filled.svg" alt="" />
                                </Link>
                              </li>
                            </ul>
                            <div className="tab-content">
                              <div
                                role="tabpanel"
                                className="tab-pane active"
                                id="SEARCH"
                              >
                                <div className="tf_main_filter tf_bdr_btm">
                                  <div className="col-md-12">
                                    <div className="col-tf-3 col-sm-6 col-xs-6 tf_full_width">
                                      <div className="tf_f_content">
                                        <h6>
                                          {contractDetails.payment_mode ===
                                            "fixed"
                                            ? "Budget"
                                            : "Hourly rate"}
                                        </h6>
                                        <h5 style={{ fontSize: '16px' }}>
                                          <strong>
                                            $
                                            {contractDetails.payment_mode ===
                                              "fixed"
                                              ? parseFloat(
                                                contractDetails.fixed_price_amount
                                              ).toFixed(2)
                                              : parseFloat(
                                                contractDetails.hourly_rate
                                              ).toFixed(2)}
                                          </strong>
                                        </h5>
                                      </div>
                                    </div>
                                    <div className="col-tf-3 col-sm-6 col-xs-6 tf_full_width">
                                      <div className="tf_f_content">
                                        <h6>In Escrow</h6>
                                        <h5 style={{ fontSize: '16px' }}>
                                          <strong>
                                            ${" "}
                                            {contractDetails.escrow_amount
                                              ? parseFloat(
                                                contractDetails.escrow_amount
                                              ).toFixed(2)
                                              : "0.00"}
                                          </strong>
                                        </h5>
                                      </div>
                                    </div>
                                    <div className="col-tf-3 col-sm-6 col-xs-6 tf_full_width">
                                      <div className="tf_f_content">
                                        <h6>Milestones Paid</h6>
                                        <h5 style={{ fontSize: '16px' }}>
                                          <strong>$0.00 earned</strong>
                                        </h5>
                                      </div>
                                    </div>
                                    <div className="col-tf-3 col-sm-6 col-xs-6 tf_full_width">
                                      <div className="tf_f_content">
                                        <h6>Remaining</h6>
                                        <h5 style={{ fontSize: '16px' }}>
                                          <strong>$0.00</strong>
                                        </h5>
                                      </div>
                                    </div>
                                    <div className="col-tf-3 col-sm-6 col-xs-6 tf_full_width">
                                      <div className="tf_f_content">
                                        <h6>Total Payments</h6>
                                        <h5 style={{ fontSize: '16px' }}>
                                          <strong>$0.00</strong>
                                        </h5>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="clearfix"></div>
                                  <hr />
                                  {!isEmpty(contractDetails.milestones) && (
                                    <div className="col-md-12">
                                      <div
                                        className="panel-group"
                                        id="accordion"
                                        role="tablist"
                                        aria-multiselectable="true"
                                      >
                                        <div className="panel panel-default tf_defualt_panel">
                                          <div
                                            className="panel-heading"
                                            role="tab"
                                            id="headingOne"
                                          >
                                            <div
                                              className="title"
                                              data-role="title"
                                              data-toggle="collapse"
                                              data-parent="#accordion"
                                              href="#collapseOne"
                                              aria-expanded="true"
                                              aria-controls="collapseOne"
                                            >
                                              <h4>
                                                MILESTONES (
                                                {
                                                  contractDetails.milestones
                                                    .length
                                                }
                                                )
                                              </h4>
                                              <div className="pull-right">
                                                <i className="fa fa-chevron-down"></i>
                                              </div>
                                            </div>
                                            <div className="clearfix"></div>
                                          </div>
                                          <div className="clearfix"></div>
                                          <div
                                            id="collapseOne"
                                            className="panel-collapse collapse in"
                                            role="tabpanel"
                                            aria-labelledby="headingOne"
                                            aria-expanded="true"
                                          >
                                            <div className="panel-body">
                                              <div className="col-md-12 padding_0">
                                                <table
                                                  className="table"
                                                  cellspacing="0"
                                                  id="manager-side-review-and-pay"
                                                >
                                                  <tbody>
                                                    {contractDetails.milestones.map(
                                                      (ms, i) => {
                                                        return (
                                                          <tr key={i}>
                                                            <td>
                                                              <strong>
                                                                {i + 1} -{" "}
                                                                {ms &&
                                                                  ms.description}
                                                              </strong>
                                                            </td>
                                                            <td>
                                                              To Pay:{" "}
                                                               <strong>
                                                               { ms.deposite_amount ?  `${"$"}${parseFloat(
                                                                  ms.deposite_amount
                                                                ).toFixed(2)}` :""} 
                                                              </strong>
                                                            </td>
                                                            <td
                                                              className="review-and-pay-td"
                                                              align="right"
                                                            >
                                                              {(contractDetails && contractDetails.payment_requested[0] && (contractDetails.payment_requested[0].status === 'Payment Requested')) ? (
                                                                <div className="tf_invite">
                                                                  <Link
                                                                    to={{
                                                                      pathname:
                                                                        "/review-pay",
                                                                      state: {
                                                                        contractDetails: contractDetails,
                                                                        deposite_amount:
                                                                          ms.deposite_amount,
                                                                      },
                                                                    }}
                                                                  >
                                                                    REVIEW & PAY
                                                                  </Link>
                                                                </div>
                                                              ) : (
                                                                ""
                                                              )}
                                                            </td>
                                                          </tr>
                                                        );
                                                      }
                                                    )}
                                                  </tbody>
                                                </table>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  <div className="col-md-12">
                                    {(contractDetails && contractDetails?.payment_requested && contractDetails?.payment_requested?.[0]?.status === 'Payment Requested') ? (
                                      <div className="tf_invite">
                                        <Link
                                          to={{
                                            pathname: "/review-pay",
                                            state: {
                                              contractDetails: contractDetails,
                                            },
                                          }}
                                        >
                                          REVIEW & PAY
                                        </Link>
                                      </div>
                                    ) : (
                                      ""
                                    )}

                                    <div className="clearfix"></div>
                                  </div>
                                </div>
                              </div>
                              <div
                                role="tabpanel"
                                className="tab-pane"
                                id="INVITED"
                              >
                                <div className="tf_search_icons">
                                  <div className="col-md-12">
                                    <div className="col-md-4 col-sm-12">
                                      <div className="input-group">
                                        <div className="input-group-addon1">
                                          <img
                                            src="images/Icon_Search.svg"
                                            alt=""
                                          />
                                        </div>
                                        <div className="tf_search">
                                          <input
                                            type="text"
                                            className="form-control mn_input"
                                            placeholder="Search this conversation…"
                                            value=""
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-7 col-sm-12 col-xs-12 tf_resp_padd_1 pull-right">
                                      <div className="col-lg-4 col-md-5 col-sm-7 col-xs-6 tf_full_width">
                                        <div className="tf_proposal_right">
                                          {contractDetails &&
                                            contractDetails.proposal_id && (
                                              <a
                                                href={`/freelancer-proposal/${contractDetails.proposal_id}/${contractDetails.job_uuid}`}
                                                className="tf_invite_button"
                                              >
                                                VIEW PROPOSAL
                                              </a>
                                            )}
                                        </div>
                                      </div>

                                    </div>
                                  </div>
                                </div>
                                <div className="tf_main_filter">
                                  <div className="col-md-12">
                                    <div className="panel-wrap">
                                      <div className="section-wrap" id="Messages">
                                        <div className="row header-wrap">
                                          <div className="chat-header col-sm-12">
                                            {newConversation.messages && <h4>{`${conversationDate.toLocaleDateString(
                                              "default",
                                              { weekday: "long" }
                                            )}, ${conversationDate.toLocaleString(
                                              "default",
                                              { month: "short" }
                                            )} ${conversationDate.getDate()}, ${conversationDate.getFullYear()}`}</h4>}
                                          </div>
                                        </div>
                                        <div className="row content-wrap messages">
                                          {newConversation.messages &&
                                            newConversation.messages.map(
                                              (msg) => {
                                                const user =
                                                  newConversation.sender.id ===
                                                    msg.user_id
                                                    ? newConversation.sender
                                                    : newConversation.receiver;
                                                return (
                                                  <div className="msg">
                                                    <div className="col-md-1 col-sm-2 col-xs-2 tf_full_width">
                                                      <div className="tf_contracts_mile_img">
                                                        {/* <img src={user.user_picture || ellipseIcon} alt=""/> */}
                                                        {user &&
                                                          user.user_name ? (
                                                          <img
                                                            className="img-circle"
                                                            src={user.user_name}
                                                            alt="img"
                                                          />
                                                        ) : (
                                                          // <Avatar name={  user.first_name && user.first_name.split(' ')[0]} color="#FFB4B6" round="50px" size="50"/>
                                                          <img
                                                            className="img-circle"
                                                            src={faceImg}
                                                            alt="img"
                                                          />
                                                        )}
                                                        <Link href={`#`}>
                                                          <div className="tf_round"></div>
                                                        </Link>
                                                      </div>
                                                    </div>
                                                    <div className="col-md-9 col-sm-8 col-xs-8 tf_full_width">
                                                      <div className="media-body">
                                                        <h5 className="media-heading">{`${user.first_name} ${user.last_name}`}</h5>
                                                        <small>{msg.text}</small>
                                                      </div>
                                                    </div>
                                                    <div className="col-md-2 col-sm-2 col-xs-2 tf_full_width">
                                                      <div className="media-body">
                                                        {/* <Link href={`#`}><img src={iconMoreFilled} alt="icon"/></Link> */}
                                                        <small className="pull-right time">
                                                          {formatAMPM(
                                                            msg.created_at
                                                          )}
                                                        </small>
                                                      </div>
                                                    </div>
                                                  </div>
                                                );
                                              }
                                            )}
                                        </div>
                                        <form
                                          onSubmit={this.messageSubmit.bind(
                                            this,
                                            this.state.newConversation.id
                                          )}
                                        >
                                          <div className="row send-wrap">
                                            <div className="col-md-1  col-sm-1 col-xs-1 tf_full_width">
                                              <div className="tf_attach">
                                                <Link>
                                                  <img
                                                    src="images/baseline-attach_file-24px.svg"
                                                    alt=""
                                                  />
                                                </Link>
                                              </div>
                                            </div>
                                            <div className="col-md-9 col-sm-8 col-xs-8 padding_0 tf_full_width">
                                              <div className="send-message">
                                                <div className="message-text">
                                                  <input
                                                    type=""
                                                    name=""
                                                    className="no-resize-bar form-control"
                                                    placeholder="Input Text"
                                                  />
                                                  <div className="tf_emoji">
                                                    <Link>
                                                      <img
                                                        src="images/baseline-tag_faces-24px.svg"
                                                        alt=""
                                                      />
                                                    </Link>
                                                    <Link>
                                                      <img
                                                        src="images/baseline-settings-20px.svg"
                                                        alt=""
                                                      />
                                                    </Link>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="col-md-2 col-sm-3 col-xs-3 tf_full_width">
                                              <div className="tf_send chatting_message_send_button_container">
                                                <input
                                                  type="submit"
                                                  value="SEND"
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </form>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="clearfix"></div>
                                </div>
                              </div>
                              <div
                                role="tabpanel"
                                className="tab-pane"
                                id="HIRES"
                              >
                                <div className="tf_main_filter tf_mile_cont">
                                  <div className="col-md-12 padding_0">
                                    <div className="col-md-8 padding_0">
                                      <div className="tf_terms_settings">
                                        <h4>Contract info</h4>
                                        <div className="clearfix"></div>

                                        <div className="col-md-6 col-sm-6 col-xs-6 tf_full_width">
                                          <p>
                                            <strong>Job Title</strong>
                                          </p>
                                        </div>
                                        <div className="col-md-6 col-sm-6 col-xs-6 tf_full_width">
                                          <p>
                                            <strong>
                                              {contractDetails.job_title}
                                            </strong>
                                          </p>
                                        </div>

                                        <div className="col-md-6 col-sm-6 col-xs-6 tf_full_width">
                                          <p>
                                            <strong>Hourly Rate</strong>
                                          </p>
                                        </div>
                                        {contractDetails &&
                                          contractDetails.hourly_rate ? (
                                          <div className="col-md-6 col-sm-6 col-xs-6 tf_full_width">
                                            <p>
                                              $
                                              <strong>{`${contractDetails.hourly_rate}`}</strong>
                                              /hr
                                            </p>
                                          </div>
                                        ) : (
                                          <div className="col-md-6 col-sm-6 col-xs-6 tf_full_width">
                                            <p>
                                              $<strong>0.00</strong>/hr
                                            </p>
                                          </div>
                                        )}

                                        <div className="col-md-6 col-sm-6 col-xs-6 tf_full_width">
                                          <p>
                                            <strong>Start Date</strong>
                                          </p>
                                        </div>
                                        <div className="col-md-6 col-sm-6 col-xs-6 tf_full_width">
                                          <p>
                                            <strong>{`${startDate.toLocaleString(
                                              "default",
                                              { month: "short" }
                                            )} ${startDate.getDate()}, ${startDate.getFullYear()}`}</strong>
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-4 padding_0">
                                      <div className="tf_terms_settings_right">
                                        <div className="col-md-12 work-descripion-flow">
                                          <h4>Description of Work</h4>
                                          {contractDetails &&
                                            contractDetails.description && (
                                              <ReadMoreAndLess
                                                // ref={this.ReadMore}
                                                className="read-more-content"
                                                charLimit={150}
                                                readMoreText="Read more"
                                                readLessText="Read less"
                                              >
                                                {contractDetails &&
                                                  contractDetails.description}
                                              </ReadMoreAndLess>
                                            )}
                                        </div>
                                        <div className="clearfix"></div>
                                        <hr />
                                        <div className="col-md-12">
                                          <Link
                                            to={`/job/${contractDetails.job_uuid}/1`}
                                          >
                                            <p>
                                              <span>
                                                <img
                                                  src="images/baseline-launch-24px.svg"
                                                  alt=""
                                                />{" "}
                                                View original job posting
                                              </span>
                                            </p>
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="tf_main_filter tf_mile_cont">
                                  <div className="tf_terms_hire col-md-8">
                                    <div className="col-md-6 col-sm-6 col-xs-6 tf_full_width">
                                      <p>
                                        <strong>Hired By</strong>
                                      </p>
                                    </div>
                                    <div className="col-md-6 col-sm-6 col-xs-6 tf_full_width">
                                      <p>
                                        {!isEmpty(contractDetails) &&
                                          contractDetails.hired_by.full_name}
                                      </p>
                                    </div>

                                    <div className="col-md-6 col-sm-6 col-xs-6 tf_full_width">
                                      <p>
                                        <strong>Contact Person</strong>
                                      </p>
                                    </div>
                                    <div className="col-md-6 col-sm-6 col-xs-6 tf_full_width">
                                      <p>
                                        <strong>
                                          {!isEmpty(contractDetails) &&
                                            contractDetails.hired_by.full_name}
                                        </strong>
                                      </p>
                                    </div>
                                    <div className="col-md-6 col-sm-6 col-xs-6 tf_full_width">
                                      <p>
                                        <strong>Contract ID</strong>
                                      </p>
                                    </div>
                                    <div className="col-md-6 col-sm-6 col-xs-6 tf_full_width">
                                      <p>
                                        <strong>
                                          {!isEmpty(contractDetails) &&
                                            contractDetails.contract_uniq_id}
                                        </strong>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contractDetails: state.contractDetailsForHiringManager,
    isLoading: state.applicationIsLoading,
    currentUser: state.currentUser,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getContract: (id) => dispatch(fetchContractDetailsForHM(id)),
    updateConversation: (id) => dispatch(updateConversation(id)),
    createMessage: (data) => dispatch(createMessage(data)),
    getConversations: () => dispatch(getConversations()),
    getConversation: (id) => dispatch(getConversation(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractDetailsForHM);
