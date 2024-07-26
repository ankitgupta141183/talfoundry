import React, { Component } from "react";
import FreelancerHeader from "../miscellaneous/FreelancerHeader";
import Footer from "../miscellaneous/Footer";
import { fetchContractDetails } from "../../Actions/freelancerActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fieldError } from "../../utills/formatting";
import {
  getConversation,
  getConversations,
  updateConversation,
  createMessage,
} from "../../Actions/conversationActions";
import fileLogo from "../../static/images/file.png";
import faceImg from "../../static/images/profile-placeholder.png";
import { ActionCableConsumer } from "react-actioncable-provider";
import Cable from "../../components/miscellaneous/Cable";
import ReadMoreAndLess from "react-read-more-less";
import { isEmpty } from "lodash";
import iconMoreFilled from "../../static/images/Icon_More_Filled.svg";
import msgAudio from "../../static/Audio/sharp.mp3";
import Modal from "react-modal";
import { submitWork } from "../../Actions/PaymentActions";
import dollarIcon from "../../static/images/$.svg";
import FreelancerDashboardSideBar from "./FreelancerDashboardSideBar";
import BreadCrumb from "../miscellaneous/BreadCrumb";
import SuccessSweetAlert from "../CommonComponets/SweetAlert/SuccessSweetAlert";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
  },
}
class ContractDetails extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      newConversation: [],
      conversations: [],
      activeConversation: null,
      disableSubmitForMilestone: false,
      errorSubmit: "",
    }
  }
  componentDidMount() {
    this.props.getContract(this.props.match.params.id)
  }

  handleSection = (e) => {
    if (e.target.id === "messaageSection") {
      const hiredId =
        !isEmpty(this.props.contractDetails) && this.props.contractDetails.hired_by_id;
      this.props.getConversation(hiredId).then((res) => {
        console.log(res, "sdfghjkl;");
        this.setState({ newConversation: res })
      })
    }
    this.props.getConversations().then((res) => {
      this.setState({ conversations: res })
    })
  }

  messageSubmit = (conversationId, e) => {
    e.preventDefault()
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
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    e.target.elements[0].value = "";
  }

  handleReceivedConversation = (response) => {
    const { conversation } = response;
    let newState = Object.assign({}, this.state)
    const hasConv = newState.conversations.find((a) => a.id === conversation.id)
    if (!hasConv) {
      newState.conversations.push(conversation)
    }
    this.setState(newState)
  }

  handleReceivedMessage = (response) => {
    const { message } = response;
    let newState = Object.assign({}, this.state)
    let conversation = newState.conversations.find(
      (conversation) => conversation.id === message.conversation_id
    )
    if (conversation.messages.find((a) => a.id === message.id)) {
      console.log("duplicate")
    } else {
      conversation.messages = [...conversation.messages, message];
    }

    if (newState.newConversation.messages.find((a) => a.id === message.id)) {
      console.log("duplicate")
    } else {
      newState.newConversation.messages = [...newState.newConversation.messages, message];
    }

    if (
      response.message.user_id !== (this.props.currentUser.user_id || this.props.currentUser.id)
    ) {
      var audio = new Audio(msgAudio)
      audio.play()
    }
    this.setState(newState)
    let elmt = document.getElementsByClassName("msg")
    elmt[elmt.length - 1].scrollIntoView()
  }

  handleSubmitWorkModal = () => {
    this.setState({
      isWorkSubmit: !this.state.isWorkSubmit,
      messageToClient: "",
      errorSubmit: "",
      work_documents: [],
      selecttedMilestoneAmount: "",
    })
  }

  handleMileStoneChange = (e) => {
    if (e.target.value === "Select a milestone") {
      this.setState({ disableSubmitForMilestone: true, errorSubmit: "" })
      return;
    } else {
      const { contractDetails } = this.props;
      const milestones = contractDetails.milestones ? contractDetails.milestones : [];
      const selectedMilestone = milestones[e.target.selectedIndex - 1];
      this.setState({
        selectedMilestone: selectedMilestone,
        selectedMilestoneAmount: selectedMilestone.deposite_amount,
        milestoneError: false,
        disableSubmitForMilestone: false,
        errorSubmit: "",
      })
    }
  }

  uploadDocument = (e) => {
    let file = e.target.files[0];
    // let fileName = file.name;
    // let reader = new FileReader()
    let work_documents_data = this.state.work_documents;
    work_documents_data.push(file)
    this.setState({
      work_documents: work_documents_data
    })
  }

  removeWorkAttachments = (doc) => {
    let newState = Object.assign({}, this.state);
    newState.work_documents = newState.work_documents.filter(a => a.name !== doc.name)
    this.setState(newState)
  }

  removeAttachment = () => {
    this.setState({ fileName: "", document: "" })
  }

  submitWork = () => {
    const { selectedMilestone, messageToClient, selectedMilestoneAmount, work_documents } = this.state;
    const { contractDetails, submitWork } = this.props;
    let data = {
      requested_payments: {
        freelancer_id: contractDetails.freelancer_id,
        manager_id: contractDetails.hired_by_id,
        amount_requested: selectedMilestoneAmount || parseInt(this.refs.some.value),
        contract_id: contractDetails.id,
        request_message: messageToClient,
        status: "Payment Requested"
      },
    }

    var form_data = new FormData();
    for (var key in data.requested_payments) {
      form_data.append(`requested_payments[${key}]`, data.requested_payments[key])
    }

    if (contractDetails.milestones && contractDetails.milestones.length > 0) {
      form_data.append(`requested_payments[milestone_id]`, selectedMilestone.id)
    }

    work_documents.map((p, index) => {
      form_data.append(`requested_payments[work_documents[${index}]]`, p)
      return p
    })

    if (!selectedMilestone && messageToClient && contractDetails.milestones.length < 1) {
      console.log("tjois if run");
      submitWork(form_data).then((res) => {
        if (res.status === 200) {
          this.setState({ isRequested: true })
          this.props.getContract(this.props.match.params.id)
        }

        if (res.status === 200) {
          this.setState({ isRequested: true })
          this.props.getContract(this.props.match.params.id)
        }
      })
    }

    if (selectedMilestone && messageToClient) {
      console.log("next if run");
      submitWork(data).then((res) => {
        if (res.status === 200 && res.data.invalid_request) {
          this.setState({ errorSubmit: res.data.message })
          return;
        }

        if (res.status === 200 && !res.data.invalid_request) {
          this.setState({ isRequested: true })
          this.props.getContract(this.props.match.params.id)
        }
      })
    } else {
      this.setState({
        milestoneError: !selectedMilestone,
        messageToClientError: !messageToClient,
      })
    }
  }

  returnAttachements = () => {
    const { contractDetails } = this.props;
    let attachment = []

    if (contractDetails && contractDetails.attachments && contractDetails.attachments.length > 0) {
      contractDetails.attachments.map(jobPer => {
        attachment.push(<div className="">
          <a target="_blank" rel="noopener noreferrer" href={jobPer} title={jobPer.split('/')[jobPer.split('/').length - 1]}>
            <img src={fileLogo} alt="fileLogo" />
            <span style={{ fontSize: '13px' }}>&nbsp;&nbsp;{jobPer.split('/')[jobPer.split('/').length - 1]} </span>
          </a>
        </div>
        )
        return jobPer
      })

    }
    else {
      attachment = 'None'
    }
    return <div className="row"> {attachment} </div>
  }


  returnDocs = () => {
    const { contractDetails } = this.props;
    let attachment = []

    if (contractDetails.payment_requested[0].changes_requested &&
      contractDetails.payment_requested[0].changes_requested[0].length > 0) {
      contractDetails.payment_requested[0].changes_requested[0].documents.map(jobPer => {
        attachment.push(<div className="">
          <a target="_blank" rel="noopener noreferrer" href={jobPer} title={jobPer.split('/')[jobPer.split('/').length - 1]}>
            <img src={fileLogo} alt="fileLogo" />
            <span style={{ fontSize: '13px' }}>&nbsp;&nbsp;{jobPer.split('/')[jobPer.split('/').length - 1]} </span>
          </a>
        </div>
        )
        return jobPer
      })

    }
    else {
      attachment = 'None'
    }
    return <div className="row"> {attachment} </div>
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      [e.target.name + "Error"]: false,
      errorSubmit: "",
    })
  }

  handleFilesToShow = (projectFileArray) => {
    let fileToDisplay = []
    if (projectFileArray && projectFileArray.length > 0) {
      projectFileArray.map((proj, id) => {
        fileToDisplay.push(
          <div
            className="row multi-file-upload-files-list mt-10"
            id={proj.name}
            key={`file_${id}`}
          >
            <div className="col-md-8">
              <i className="fa fa-check" aria-hidden="true"></i> {proj.name}
            </div>
            <div>
              <i
                className="fa fa-trash"
                id={proj.blob}
                onClick={this.removeWorkAttachments.bind(this, proj)}
                aria-hidden="true"
              ></i>
            </div>
          </div>
        )
        return proj
      })
    }
    return fileToDisplay
  }

  hideAlert = () => {
    this.setState({ isRequested: false, isWorkSubmit: false, errorSubmit: "" })
  }

  returnWordDocs = () => {
    const { contractDetails } = this.props;
    let attachment = []
    if (contractDetails && contractDetails.payment_requested &&
      contractDetails.payment_requested[0] &&
      contractDetails.payment_requested[0].work_documents &&
      contractDetails.payment_requested[0].work_documents.length > 0) {
      contractDetails.payment_requested[0].work_documents.map(jobPer => {
        attachment.push(<div className="col-md-1">
          <a target="_blank" rel="noopener noreferrer" href={jobPer} title={jobPer.split('/')[jobPer.split('/').length - 1]}>
            <img src={fileLogo} alt="fileLogo" /> </a>
        </div>
        )
        return jobPer
      })

    }
    else {
      attachment = <h5 style={{ fontSize: '24px', marginLeft: '15px' }}><strong>No Data</strong></h5>
    }
    return <div className="row" style={{ marginLeft: '-15px' }}> {attachment} </div>
  }

  render() {
    const { contractDetails, isLoading } = this.props;
    const rate =
      contractDetails.payment_mode !== "fixed"
        ? contractDetails.hourly_rate
        : contractDetails.fixed_price_amount;
    const {
      conversations,
      newConversation,
      selectedMilestone,
      messageToClient,
      isRequested,
      milestoneError,
      messageToClientError,
      disableSubmitForMilestone,
      errorSubmit,
    } = this.state;
    let selectedMilestoneAmount;
    let disableReviewnPay = true;

    if (
      contractDetails.weekly_payment &&
      (contractDetails.weekly_payment || contractDetails.fixed_price_amount) &&
      contractDetails.fixed_price_amount &&
      contractDetails.milestones &&
      contractDetails.milestones.length < 1
    ) {
      selectedMilestoneAmount =
        contractDetails.weekly_payment || contractDetails.fixed_price_amount;
      disableReviewnPay = false;
    } else {
      contractDetails.milestones &&
        contractDetails.milestones.map((ms, i) => {
          if (ms && ms.payment_requested.length === 0) {
            disableReviewnPay = false;
            return ms;
          }
          if (
            ms &&
            ms.payment_requested &&
            ms.payment_requested[0] &&
            ms.payment_requested.length > 0 &&
            ms.payment_requested[0].status !== "requested"
          ) {
            disableReviewnPay = false;
            return ms;
          }
          return ms
        })

      selectedMilestoneAmount = this.state.selectedMilestoneAmount;
    }

    const activeDate = !isEmpty(contractDetails)
      ? new Date(contractDetails.status_updated_at)
      : new Date()
    const startDate = !isEmpty(contractDetails) ? new Date(contractDetails.start_date) : new Date()
    const due_date = !isEmpty(contractDetails) ? new Date(contractDetails.due_date) : ''
    const conversationDate = new Date(newConversation.created_at)
    function formatAMPM(date) {
      date = new Date(date)
      var hours = date.getHours()
      var minutes = date.getMinutes()
      var ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? "0" + minutes : minutes;
      var strTime = hours + ":" + minutes + " " + ampm;
      return strTime;
    }

    console.log(contractDetails, "contractDetails.milestones");
    console.log(disableSubmitForMilestone, selectedMilestone ,"34567890");
    return (
      <div className="all-contracts-milestones-details term-desc">
        <FreelancerHeader history={this.props.history} />
        <div id="tf-project-manager-dashboard-root">
          <BreadCrumb step={"step6"} link="Contract Details" />
        </div>
        {/* <FreelancerDashboardSideBar history={this.props.history}/> */}
        <ActionCableConsumer
          channel={{ channel: "ConversationsChannel" }}
          onReceived={this.handleReceivedConversation}
        />
        {this.state.conversations.length ? (
          <Cable conversations={conversations} handleReceivedMessage={this.handleReceivedMessage} />
        ) : null}
        {isRequested && (
          // <div className="app-pro2-swal">
          //   <SweetAlert
          //     success
          //     confirmBtnText="Ok"
          //     confirmBtnBsStyle="success"
          //     onConfirm={this.hideAlert}
          //   >
          //     Payment Requested successfully
          //   </SweetAlert>
            

          // </div>
          <SuccessSweetAlert 
            show={true}
            handleConfirm={this.hideAlert}
            message={"Payment Requested successfully."}
            />
        )}
        <div className="">
          <div className="row custom_row">
            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 p-0">
              <div className="custom_sticky_container">
                <div className="position-sticky">
                  <FreelancerDashboardSideBar history={this.props.history} />
                </div>
              </div>
            </div>
            <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
              <div className="tf_aws tf_contracts_mile term-desc mt-0">
                <div className="col-md-12 ">

                  <div className="tf_contracts_mile_main">
                    <div className="col-md-7 col-sm-5 col-xs-12">
                      <div className="tf_free_name" style={{ marginTop: '-10px' }}>
                        <h4>{!isEmpty(contractDetails) && contractDetails.title}</h4>
                        <p>
                          Active Since{" "}
                          {`${activeDate.toLocaleString("default", {
                            month: "short",
                          })} ${activeDate.getDate()}, ${activeDate.getFullYear()}`}
                        </p>
                      </div>
                    </div>
                    <div className="col-md-5 col-sm-7 col-xs-12 tf_full_width">
                      <div className="tf_contracts_mile_img_2 user-avatar-default">
                        {!isEmpty(contractDetails) &&
                          contractDetails.hired_by &&
                          contractDetails.hired_by.image_url ? (
                          <img
                            src={
                              contractDetails &&
                              contractDetails.hired_by &&
                              contractDetails.hired_by.image_url
                            }
                            className="avatar-img update-img"
                            alt="profile_pic"
                          />
                        ) : (
                          <img className="avatar-img update-img" src={faceImg} alt="User" />
                        )}
                        <Link>
                          <div className="tf_round2"></div>
                        </Link>
                      </div>
                      <div className="tf_image_content">
                        <h3 style={{ fontSize: '18px' }}>
                          {!isEmpty(contractDetails) && contractDetails.hired_by.full_name}
                        </h3>
                        <p>
                          2:29PM Saturday in{" "}
                          {!isEmpty(contractDetails) && contractDetails.hired_by.country}
                        </p>
                      </div>
                      <div className="clearfix"></div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="tabbable-panel">
                    <div className="tabbable-line">
                      <div className="tab-content tf_all_m">
                        <div className="invite_freelancer tf_all_mile_tab">
                          <ul className="nav nav-tabs" role="tablist">
                            <li role="presentation" className="active">
                              <a href="#SEARCH"
                                aria-controls="SEARCH"
                                role="tab"
                                data-toggle="tab"
                                style={{
                                  fontSize: '12px',
                                  fontWeight: 'bold'
                                }}>
                                TIME & EARNINGS
                              </a>
                            </li>
                            <li role="presentation">
                              <a
                                href="#INVITED"
                                onClick={this.handleSection}
                                id="messaageSection"
                                aria-controls="profile"
                                role="tab"
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
                              <div className="tf_dropdown">
                                <div className="dropdown">
                                  <span
                                    className="dropdown-toggle"
                                    type="button"
                                    id="dropdownMenuButton"
                                    data-toggle="dropdown">
                                    <i className="fa fa-ellipsis-v" style={{ fontSize: '20px' }}></i>
                                  </span>
                                  <div className="dropdown-menu ml-20" aria-labelledby="dropdownMenuButton">
                                    {this.props.currentUser.role === "Freelancer" &&
                                      !(contractDetails && contractDetails.freelancer_rating_id)
                                      ?
                                      contractDetails && contractDetails.hired_by && <Link className="col-sm-12 mt-10 mb-10 dropdown-item"
                                        to={{
                                          pathname: `/freelancer-end-contract/${contractDetails.id}`,
                                          state: {
                                            uuid: `${contractDetails.uuid}`,
                                            rated_user_id: `${contractDetails.hired_by.id}`,
                                            userId: `${this.props.currentUser.user_id}`,
                                            jobId: `${contractDetails.job_id}`
                                          }
                                        }}
                                      >
                                        End Contract
                                      </Link>
                                      : ''}


                                    {!(contractDetails.freelancer_rating_id && contractDetails.manager_rating_id)
                                      ?
                                      <Link className="col-sm-12 mt-10 mb-10 dropdown-item"
                                        to={{
                                          pathname: `/freelancer-show-rating/${contractDetails.id}`,
                                          state: {
                                            uuid: `${contractDetails.uuid}`,
                                            freelancer_rating_id: `${contractDetails.freelancer_rating_id}`,
                                            manager_rating_id: `${contractDetails.manager_rating_id}`
                                          }
                                        }}
                                      >
                                        Show Rating
                                      </Link> : ''
                                    }
                                  </div>

                                </div>
                              </div>
                            </li>
                          </ul>

                          <div className="tab-content">
                            <div role="tabpanel" className="tab-pane active" id="SEARCH">
                              <div className="tf_main_filter tf_bdr_btm">
                                <div className="col-md-12">
                                  <div className="col-tf-3 col-sm-6 col-xs-6 tf_full_width">
                                    <div className="tf_f_content">
                                      <h6>
                                        {contractDetails.payment_mode === "fixed"
                                          ? "Budget"
                                          : "Hourly rate"}{" "}
                                      </h6>
                                      <h5 style={{ fontSize: '16px' }}>
                                        <strong>
                                          $
                                          {contractDetails.payment_mode === "fixed"
                                            ? parseFloat(
                                              contractDetails.fixed_price_amount
                                            ).toFixed(2)
                                            : parseFloat(contractDetails.hourly_rate).toFixed(2)}
                                        </strong>
                                      </h5>
                                    </div>
                                  </div>
                                  <div className="col-tf-3 col-sm-6 col-xs-6 tf_full_width">
                                    <div className="tf_f_content">
                                      <h6>In Escrow</h6>
                                      <h5 style={{ fontSize: '16px' }}>
                                        <strong>
                                          $
                                          {contractDetails.escrow_amount
                                            ? parseFloat(contractDetails.escrow_amount).toFixed(2)
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

                                {!isEmpty(contractDetails.milestones) && (
                                  <div className="col-md-12">
                                    <div
                                      className="panel-group"
                                      id="accordion"
                                      role="tablist"
                                      aria-multiselectable="true"
                                    >
                                      <div className="panel panel-default tf_defualt_panel">
                                        <div className="panel-heading" role="tab" id="headingOne">
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
                                              MILESTONES ({contractDetails.milestones.length})
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
                                              <table className="table">
                                                <tbody>
                                                  {contractDetails.milestones.map((ms, i) => {
                                                    return (
                                                      <tr key={i}>
                                                        <td>
                                                          <strong>
                                                            {i + 1} - {ms && ms.description ? ms.description : ''}
                                                          </strong>
                                                        </td>
                                                        <td>${ms.deposite_amount}</td>
                                                        <td align="right" className="tf_italic">
                                                          <td>
                                                            {ms.payment_requested &&
                                                              ms.payment_requested.length > 0
                                                              ? `${String(
                                                                ms.payment_requested[0].status[0]
                                                              ).toUpperCase()}${String(
                                                                ms.payment_requested[0].status.substring(
                                                                  1,
                                                                  ms.payment_requested[0].status
                                                                    .length
                                                                )
                                                              )}`
                                                              : "Not Started"}
                                                          </td>
                                                        </td>
                                                      </tr>
                                                    )
                                                  })}
                                                </tbody>
                                              </table>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                                <div className="clearfix"></div>
                                <Modal
                                  isOpen={this.state.isWorkSubmit}
                                  onRequestClose={this.handleSubmitWorkModal}
                                  style={customStyles}
                                >
                                  <div>
                                    <div className="tf_model request-payment-for-a-milestone-popup">
                                      <div className="modal-header">
                                        <button
                                          type="button"
                                          className="close"
                                          onClick={this.handleSubmitWorkModal}
                                        >
                                          <span aria-hidden="true">×</span>
                                        </button>
                                        <h4 className="modal-title" id="myModalLabel">
                                          Submit work or request payment for a milestone
                                        </h4>
                                      </div>
                                      <div className="modal-body">
                                        <div className="errorMessage">
                                          {errorSubmit && errorSubmit.length > 0 ? errorSubmit : ""}
                                        </div>
                                        <div className="col-md-12">
                                          <p>
                                            Use this to request approval for the work you've
                                            completed. Your payment will be released on approval.
                                          </p>
                                          <div className="clearfix"></div>
                                        </div>
                                        {contractDetails.milestones &&
                                          contractDetails.milestones.length > 0 && (
                                            <div className="col-md-12">
                                              <div className="input-group tf_loca">
                                                <label>Milestone</label>
                                                <div className="selectedwrap">
                                                  <select
                                                    className="form-control mn_input mySelectBoxClass"
                                                    onChange={this.handleMileStoneChange}
                                                    defaultValue={selectedMilestone}
                                                  >
                                                    <option selected id="select">
                                                      Select a milestone
                                                    </option>
                                                    {contractDetails.milestones &&
                                                      contractDetails.milestones.map((ms, i) => {
                                                        return (
                                                          <option
                                                            id={i}
                                                            key={i}
                                                            disabled={
                                                              ms &&
                                                              ms.payment_requested[0] &&
                                                              (ms.payment_requested[0].status ===
                                                                "requested" ||
                                                                ms) &&
                                                              ms.payment_requested[0] &&
                                                              ms.payment_requested[0].status ===
                                                              "approved"
                                                            }
                                                          >
                                                            {ms && ms.description ? ms.description : ''}
                                                          </option>
                                                        )
                                                      })}
                                                  </select>
                                                  {milestoneError && fieldError()}
                                                </div>
                                              </div>
                                            </div>
                                          )}

                                        <div className="col-md-12">
                                          <div className="input-group tf_loca">
                                            <label>Amount $</label>
                                            <div className="clearfix"></div>
                                            <div className="input-group-addon_dollor1"></div>
                                            <input
                                              type="Full Name"
                                              className="form-control mn_input mn_input2"
                                              name="selectedMilestoneAmount"
                                              placeholder="0.00"
                                              onChange={this.handleChange}
                                              ref="some"
                                              value={selectedMilestoneAmount}
                                            />
                                            <span className="input-group-addon3 add-on">
                                              <img src={dollarIcon} alt="icon" />
                                            </span>
                                          </div>
                                        </div>
                                        <div className="col-md-12">
                                          <div className="input-group tf_loca">
                                            <label>Message to Client</label>
                                            <textarea
                                              className="form-control mn_input tf_loca1"
                                              value={messageToClient}
                                              name="messageToClient"
                                              rows="5"
                                              onChange={this.handleChange}
                                            ></textarea>
                                            {messageToClientError && fieldError()}
                                          </div>
                                        </div>
                                        <div className="col-md-12">
                                          <div className="files file-upload-button">
                                            <input
                                              type="file"
                                              className="form-control"
                                              onChange={this.uploadDocument}
                                              name="uploadDocument"
                                            />
                                          </div>
                                          <div className="clearfix"></div>
                                          {this.handleFilesToShow(this.state.work_documents || [])}
                                        </div>
                                        <div className="col-md-12">
                                          <p>
                                            Attaching work is recommended, but not required if you
                                            have already delivered.
                                          </p>
                                        </div>
                                      </div>
                                      <div className="modal-footer tf_btns tf_ftr_btn">
                                        {contractDetails.milestones &&
                                          contractDetails.milestones.length > 0 ? (
                                          <button
                                            type="button"
                                            onClick={this.submitWork}
                                            disabled={
                                              (disableSubmitForMilestone ||
                                                !selectedMilestone ||
                                                selectedMilestone) &&
                                              !(!isEmpty(selectedMilestone) ? selectedMilestone.description : selectedMilestone)
                                            }
                                            className="btn btn-primary"
                                          >
                                            Submit
                                          </button>
                                        ) : (
                                          <button
                                            type="button"
                                            onClick={this.submitWork}
                                            className="btn btn-primary"
                                          >
                                            Submit
                                          </button>
                                        )}

                                        <button
                                          type="button"
                                          onClick={this.handleSubmitWorkModal}
                                          className="btn btn-default"
                                        >
                                          Cancel
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </Modal>
                              </div>
                            </div>
                            <div role="tabpanel" className="tab-pane " id="INVITED">
                              <div className="tf_search_icons">
                                <div className="col-md-12 tf_full_width_2">
                                  <div className="col-md-4 col-sm-12 tf_full_width_2">
                                    <div className="input-group">
                                      <div className="input-group-addon1">
                                        <img src="images/Icon_Search.svg" alt="" />
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
                                  <div className="col-md-7 col-sm-12 col-xs-12 tf_resp_padd_1 tf_full_width_2 pull-right">
                                    <div className="col-lg-4 col-md-5 col-sm-5 col-xs-6 tf_full_width_2 tf_full_width">
                                      <div className="tf_proposal_right">
                                        {contractDetails &&
                                          contractDetails.proposal_id && (
                                            <a
                                              href={`/proposal-details/${contractDetails.proposal_id}`}
                                              className="tf_invite_button">
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
                                          {newConversation.messages &&
                                            <h4>{`${conversationDate.toLocaleDateString("default", {
                                              weekday: "long",
                                            })}, ${conversationDate.toLocaleString("default", {
                                              month: "short",
                                            })} ${conversationDate.getDate()}, ${conversationDate.getFullYear()}`}</h4>
                                          }
                                        </div>
                                      </div>
                                      <div className="row content-wrap messages">
                                        {newConversation.messages &&
                                          newConversation.messages.map((msg, idx) => {
                                            const user =
                                              newConversation.sender.id === msg.user_id
                                                ? newConversation.sender
                                                : newConversation.receiver;
                                            return (
                                              <div className="msg" key={idx}>
                                                <div className="col-md-1 col-sm-2 col-xs-2 tf_full_width">
                                                  <div className="tf_contracts_mile_img">
                                                    {user && user.user_name ? (
                                                      <img
                                                        className="img-circle"
                                                        src={user.user_name}
                                                        alt="img"
                                                      />
                                                    ) : (
                                                      <img
                                                        className="img-circle"
                                                        src={faceImg}
                                                        alt="User"
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
                                                    <Link href={`#`}>
                                                      <img src={iconMoreFilled} alt="icon" />
                                                    </Link>
                                                    <small className="pull-right time">
                                                      {formatAMPM(msg.created_at)}
                                                    </small>
                                                  </div>
                                                </div>
                                              </div>
                                            )
                                          })}
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
                                              <input type="submit" value="SEND" />
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
                            <div role="tabpanel" className="tab-pane " id="HIRES">
                              <div className="tf_main_filter tf_mile_cont">
                                <div className="col-md-12 padding_0">
                                  <div className="col-md-8 padding_0">
                                    <div className="tf_terms_settings">
                                      <h4>Contract info</h4>
                                      <div className="clearfix"></div>
                                      <div className="col-md-6 col-sm-6 col-xs-6 tf_full_width">
                                        <p>
                                          <strong>Status</strong>
                                        </p>
                                      </div>
                                      <div className="col-md-6 col-sm-6 col-xs-6 tf_full_width">
                                        <p>
                                          {contractDetails && contractDetails.status}
                                        </p>
                                      </div>
                                      <div className="col-md-6 col-sm-6 col-xs-6 tf_full_width">
                                        <p>
                                          <strong>Job Title</strong>
                                        </p>
                                      </div>
                                      <div className="col-md-6 col-sm-6 col-xs-6 tf_full_width">
                                        <p style={{ color: '#0DA4DE' }}>
                                          {contractDetails && contractDetails.job_title}
                                        </p>
                                      </div>

                                      <div className="col-md-6 col-sm-6 col-xs-6 tf_full_width">
                                        <p>
                                          <strong>Contract Title</strong>
                                        </p>
                                      </div>
                                      <div className="col-md-6 col-sm-6 col-xs-6 tf_full_width">
                                        <p>
                                          {contractDetails && contractDetails.title}
                                        </p>
                                      </div>

                                      <div className="col-md-6 col-sm-6 col-xs-6 tf_full_width">
                                        <p>
                                          <strong>Platform</strong>
                                        </p>
                                      </div>
                                      <div className="col-md-6 col-sm-6 col-xs-6 tf_full_width">
                                        <p>
                                          {contractDetails && contractDetails.job_category}
                                        </p>
                                      </div>

                                      <div className="col-md-6 col-sm-6 col-xs-6 tf_full_width">
                                        <p>
                                          <strong>Start Date</strong>
                                        </p>
                                      </div>
                                      <div className="col-md-6 col-sm-6 col-xs-6 tf_full_width">
                                        <p>
                                          {`${startDate.toLocaleString("default", {
                                            month: "short",
                                          })} ${startDate.getDate()}, ${startDate.getFullYear()}`}
                                        </p>
                                      </div>

                                      {contractDetails && contractDetails.due_date &&
                                        <React.Fragment>
                                          <div className="col-md-6 col-sm-6 col-xs-6 tf_full_width">
                                            <p>
                                              <strong>Offer expires</strong>
                                            </p>
                                          </div>
                                          <div className="col-md-6 col-sm-6 col-xs-6 tf_full_width">
                                            <p>
                                              {`${due_date.toLocaleString("default", {
                                                month: "short",
                                              })} ${due_date.getDate()}, ${due_date.getFullYear()}`}
                                            </p>
                                          </div>
                                        </React.Fragment>
                                      }

                                    </div>
                                  </div>
                                  <div className="col-md-4 padding_0">
                                    <div className="tf_terms_settings_right">
                                      <div className="col-md-12 work-descripion-flow">
                                        <h4>Description of Work</h4>
                                        {contractDetails && contractDetails.description ? contractDetails.description : '' && (
                                          <ReadMoreAndLess
                                            className="read-more-content"
                                            charLimit={150}
                                            readMoreText="Read more"
                                            readLessText="Read less"
                                          >
                                            {contractDetails && contractDetails.description ? contractDetails.description : ''}
                                          </ReadMoreAndLess>
                                        )}
                                      </div>
                                      <div className="clearfix"></div>
                                      <hr />
                                      <div className="col-md-12">
                                        <Link to={`/job-details/${contractDetails.job_uuid}`}>
                                          <p>
                                            <span>
                                              <img src="images/baseline-launch-24px.svg" alt="" />{" "}
                                              View original job posting
                                            </span>
                                          </p>
                                        </Link>
                                        {contractDetails.proposal_id && (
                                          <Link
                                            to={`/proposal-details/${contractDetails.proposal_id}`}
                                          >
                                            <p>
                                              <span>
                                                <img src="images/baseline-launch-24px.svg" alt="" />{" "}
                                                View original proposals
                                              </span>
                                            </p>
                                          </Link>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="tf_main_filter tf_mile_cont tf_whiute">
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
                                      {!isEmpty(contractDetails) &&
                                        contractDetails.hired_by.full_name}
                                    </p>
                                  </div>
                                  <div className="col-md-6 col-sm-6 col-xs-6 tf_full_width">
                                    <p>
                                      <strong>Contract ID</strong>
                                    </p>
                                  </div>
                                  <div className="col-md-6 col-sm-6 col-xs-6 tf_full_width">
                                    <p>
                                      {!isEmpty(contractDetails) &&
                                        contractDetails.contract_uniq_id}
                                    </p>
                                  </div>

                                  <div className="col-md-6 col-sm-6 col-xs-6 tf_full_width">
                                    <p>
                                      <strong>Attachments</strong>
                                    </p>
                                  </div>
                                  <div className="col-md-6 col-sm-6 col-xs-6 tf_full_width">
                                    {this.returnAttachements()}
                                  </div>
                                  <div className="clearfix"></div>
                                  <div className="col-md-6 col-sm-6 col-xs-6 tf_full_width">
                                    <p><strong>
                                      {contractDetails.payment_mode === "fixed"
                                        ? "Budget"
                                        : "Hourly rate"}{" "}
                                    </strong></p>
                                  </div>
                                  <div className="col-md-6 col-sm-6 col-xs-6 tf_full_width">
                                    <p>$
                                      {
                                        (contractDetails.payment_mode === "fixed") ? `${parseFloat(contractDetails.fixed_price_amount).toFixed(2)}`
                                          : `${parseFloat(contractDetails.hourly_rate).toFixed(2)}/hr`
                                      }
                                    </p>
                                  </div>

                                  <div className="clearfix"></div>
                                  <hr />

                                  <div className="col-md-12">
                                    <div className="tf_freelancer_pro tf_status_1">
                                      <div className="col-md-6 nopad">
                                        <p><strong>3% TalFoundry Service Fee</strong></p>
                                      </div>
                                      <div className="col-md-2 tf_status_2">
                                        <h4 className="term-desc">
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
                                        <p><strong>You’ll Receive</strong></p>
                                        <p>
                                          The estimate amount you will receive after
                                          service fee
                                        </p>
                                      </div>
                                      <div className="col-md-2">
                                        <h4 className="term-desc">
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
                                  <div className="clearfix"></div>

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

              {contractDetails.payment_requested && contractDetails.payment_requested.length > 0 && !isLoading ?
                <div
                  className="tf_aws tf_contracts_mile term-desc col-md-12"
                  style={{ marginTop: '-10px' }}
                >
                  <div className="tf_contracts_mile_main">
                    <div className="row">
                      <h4
                        className="col-md-12"
                        style={{
                          color: '#0DA4DE',
                          marginBottom: '2px',
                          paddingBottom: '2px',
                          borderBottom: '2px solid #e1f4fb'
                        }}>
                        Submitted Work
                      </h4>
                      <div className="col-md-3">
                        <div className="tf_f_content">
                          <h6 style={{ fontSize: '16px', color: '#999' }}>
                            <b>
                              Amount Requested
                            </b>
                          </h6>

                          {contractDetails.payment_requested && contractDetails.payment_requested.length > 0
                            ?
                            <h5>
                              <strong style={{ fontSize: '16px' }}>
                                ${contractDetails.payment_requested[0].amount_requested}
                              </strong>
                            </h5>
                            :
                            <h5>
                              <strong style={{ fontSize: '16px' }}>
                                No Data
                              </strong>
                            </h5>
                          }

                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="tf_f_content">
                          <h6 style={{ fontSize: '14px', color: '#999' }}>
                            <b>
                              Date
                            </b>
                          </h6>
                          <h5 style={{ fontSize: '16px' }}>
                            <strong>
                              {contractDetails.payment_requested &&
                                contractDetails.payment_requested[0] &&
                                contractDetails.payment_requested[0].created_at
                                ?
                                <React.Fragment>
                                  {String(contractDetails.payment_requested[0].created_at).substring(0, 10)}
                                </React.Fragment>
                                : 'No Data'
                              }
                            </strong>
                          </h5>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="tf_f_content">
                          <h6 style={{ fontSize: '14px', color: '#999' }}>
                            <b> Work Documents</b>
                          </h6>
                          <h5>
                            {this.returnWordDocs()}
                          </h5>
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="tf_f_content">
                          <h6 style={{ fontSize: '14px', color: '#999' }}>
                            <b>
                              Request Message
                            </b>
                          </h6>
                          <h5 style={{ fontSize: '16px' }}>
                            <strong>
                              {contractDetails.payment_requested && contractDetails.payment_requested.length > 0
                                ? contractDetails.payment_requested[0].request_message : 'No Data'}
                            </strong>
                          </h5>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
                :
                ''
              }
              {contractDetails.payment_requested && contractDetails.payment_requested.length > 0
                && contractDetails.payment_requested[0].changes_requested
                && contractDetails.payment_requested[0].changes_requested.length > 0
                ?
                <div
                  className="tf_aws tf_contracts_mile term-desc col-md-12"
                  style={{ marginTop: '-10px' }}
                >
                  <div className="tf_contracts_mile_main">
                    <div className="row">
                      <h4
                        className="col-md-12"
                        style={{
                          color: '#0DA4DE',
                          marginBottom: '2px',
                          borderBottom: '2px solid #e1f4fb',
                          paddingBottom: '2px'
                        }}>
                        Requested Changes
                      </h4>


                      <div className="col-md-3">
                        <div className="tf_f_content">
                          <h6 style={{ fontSize: '14px', color: '#999' }}>
                            <b>
                              Description
                            </b>
                          </h6>
                          <h5 style={{ fontSize: '16px' }}>
                            <strong>
                              {
                                contractDetails.payment_requested &&
                                  contractDetails.payment_requested.length > 0
                                  ?
                                  contractDetails.payment_requested[0].changes_requested[0].description
                                  :
                                  'No Data'
                              }
                            </strong>
                          </h5>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="tf_f_content">
                          <h6 style={{ fontSize: '14px', color: '#999' }}>
                            <b>
                              Dcouments
                            </b>
                          </h6>
                          <h5 style={{ fontSize: '16px' }}>
                            <strong>
                              {this.returnDocs()}
                            </strong>
                          </h5>
                        </div>
                      </div>
                      <div className="tf_invite">
                        <Link
                          style={{
                            "background-color": "#0DA4DE"
                          }}
                          onClick={(e) => { e.preventDefault(); this.handleSubmitWorkModal() }}
                        >
                          SUBMIT WORK / REQUEST PAYMENT
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                :
                <div className="tf_invite">
                <Link
                  style={{
                    "background-color": "#0DA4DE"
                  }}
                  onClick={(e) => { e.preventDefault(); this.handleSubmitWorkModal() }}
                >
                  SUBMIT WORK / REQUEST PAYMENT
                </Link>
              </div>
              }

             
            </div>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    contractDetails: state.contractDetails,
    isLoading: state.applicationIsLoading,
    currentUser: state.currentUser,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getContract: (id) => dispatch(fetchContractDetails(id)),
    updateConversation: (id) => dispatch(updateConversation(id)),
    createMessage: (data) => dispatch(createMessage(data)),
    getConversations: () => dispatch(getConversations()),
    getConversation: (id) => dispatch(getConversation(id)),
    submitWork: (data) => dispatch(submitWork(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContractDetails)
