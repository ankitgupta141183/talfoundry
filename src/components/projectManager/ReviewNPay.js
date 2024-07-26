// @Archives.js
// * This component contains the proposals which are archived by the Project Manager

import React, { Component } from "react";
import ProjectManagerHeader from "../miscellaneous/ProjectManagerHeader";
// import Footer from "../miscellaneous/Footer";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { approvePayment, payContract } from "../../Actions/ProjectManagerFreelancerActions";
import fileLogo from '../../static/images/file.png';
import Dropzone from "react-dropzone";
import PMDashboardSideBar from "./PMDashboardSideBar";
// import inviteIcon from "../../static/images/invite.png";
import SuccessSweetAlert from "../CommonComponets/SweetAlert/SuccessSweetAlert";
import ErrorSweetAlert from "../CommonComponets/SweetAlert/ErrorSweetAlert";



class ReviewnPay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEdit: false,
      isBonus: false,
      bonusAmount: "",
      checkAmount: [],
      hourlyRate: "",
      description: "",
      contractDetails: {},
      deposite_amount: "",
      requested_payments: {
        manager_id: "",
        amount_requested: "",
        amount_paid: "",
        contract_id: "",
        milestone_id: "",
        response_message: "",
        freelancer_id: "",
        payment_id: "",
        status: "",
        bonus: "",
        paymentDone: false,
        paymentFailed: false,
        contract_attributes: {
          id: "",
          status: "Payment Requested"
        },
        projectFileArray: []
      }
    }
  }

  componentDidMount() {
    if (!this.props.location.state) {
      this.props.history.push('all-contracts')
    }
    const { contractDetails, deposite_amount, uuid } = this.props.location.state;
    console.log(contractDetails, deposite_amount, uuid, "uuui");
    const payment_requested = contractDetails.payment_requested.find(a => a.status === 'Payment Requested') || {};

    let data = {
      manager_id: payment_requested.manager_id,
      amount_requested: payment_requested.amount_requested,
      amount_paid: payment_requested.amount_paid,
      contract_id: payment_requested.contract_id,
      milestone_id: payment_requested.milestone_id || '',
      response_message: "response",
      freelancer_id: payment_requested.freelancer_id,
      payment_id: payment_requested.id,
      status: "approved",
      bonus: "",
      work_documents: payment_requested.work_documents || [],
      request_message: payment_requested.request_message,
      // contract_attributes: {
      //   id: contractDetails.payment_requested.contract_id,
      //   status: "Payment Requested"
      // }
    }

    this.setState({
      requested_payments: data,
      contractDetails: contractDetails,
      deposite_amount: deposite_amount ? deposite_amount : payment_requested.amount_requested,
      uuid: uuid
    })
  }


  handleContractStatus = (e) => {
    // let data = this.state.requested_payments;
    // data.contract_attributes.status = e.target.id;
    // this.setState({ requested_payments: data });
  }

  handleBonusChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleBonusBlur = (e) => {
    this.setState({
      [e.target.name]: !isNaN(parseFloat(e.target.value).toFixed(2))
        ? parseFloat(e.target.value).toFixed(2)
        : ""
    });
  }

  handleBonus = (e) => {
    if (e.target.checked) {
      this.setState({ isBonus: true, checkAmount: e.target.value });
    } else {
      this.setState({ isBonus: false, checkAmount: "" });
    }
  }

  handleFileDrop = (files) => {
    let projectFileArrayVar = this.state.projectFileArray || [];
    let file = files[0];
    // let fileName = files[0].name;
    let isPresent = false;

    if (projectFileArrayVar > 0) {
      isPresent = projectFileArrayVar.find(a => a.path === file.path)
    }

    if (!isPresent) {
      projectFileArrayVar.push(file)
      this.setState({
        projectFileArray: projectFileArrayVar
      })
    }
  }

  handleDrop = (files, event) => {
    let reader = new FileReader();
    let file = files[0] ? files[0] : files.target.files[0];
    let fileName = files[0].name;
    let isDocTypeImage = file.type.includes("image");
    const target = event ? event.target.id : files.target.id;
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      this.setState({
        [target]: event.target.result,
        [target + "_error"]: false,
        isDocTypeImage: isDocTypeImage,
        docName: fileName,
      });
    }
  }

  returnAttachements = (projectFileArray) => {
    let attachment = []

    if (projectFileArray.length > 0) {
      projectFileArray.map(jobPer => {
        attachment.push(<div className="row"><p className="col-sm-2" style={{ width: '30%' }}>
          <a target="_blank" rel="noopener noreferrer" href={jobPer} title={jobPer.split('/')[jobPer.split('/').length - 1]}>
            <img src={fileLogo} alt="fileLogo" />
            <span style={{ fontSize: '13px' }}>&nbsp;&nbsp;{jobPer.split('/')[jobPer.split('/').length - 1]} </span>
          </a>
        </p></div>)
        return jobPer
      })

    }
    else {
      attachment = 'None'
    }
    return <div className="row"> {attachment} </div>
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
                onClick={this.handleFileRemove}
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


  approvePayment = (e) => {
    e.preventDefault()
    const { contractDetails } = this.state;
    const { hourlyRate, bonusAmount } = this.state;
    this.state.requested_payments["bonus"] = bonusAmount ? bonusAmount : "0.00";
    this.state.requested_payments["amount_paid"] = isNaN(
      +(+bonusAmount) +
      +(hourlyRate
        ? hourlyRate
        : contractDetails &&
        contractDetails.payment_requested &&
        contractDetails.payment_requested.amount_requested)
    )
      ? "00"
      : (
        +(+bonusAmount) +
        +(hourlyRate
          ? hourlyRate
          : contractDetails &&
          contractDetails.payment_requested &&
          contractDetails.payment_requested.amount_requested)
      ).toFixed(2);
    this.setState({ requested_payments: this.state.requested_payments });

    let data = this.state.requested_payments;

    this.props.approvePayment(data)
      .then((res) => {
        this.props.history.push('all-contracts')
      }).catch((err) => {
        console.log(err)
      })
  }

  payFreelancer = (e) => {
    e.preventDefault()
    let { contractDetails } = this.state
    let requested_changes = {
      contract_id: contractDetails.id,
      milestone_id: '',
      status: 'requested',
      requested_payment_id: contractDetails.payment_requested[0].id,
      description: this.state.description
    }

    var form_data = new FormData();

    for (var key in requested_changes) {
      form_data.append(`requested_changes[${key}]`, requested_changes[key])
    }

    (this.state.projectFileArray || []).map((p, index) => {
      form_data.append(`requested_changes[documents[${index}]]`, p)
      return p
    })


    this.props.payContractAmount(form_data).then((res) => {
      if (!res) {
        this.setState({
          paymentFailed: true
        });
      } else {
        this.setState({
          paymentDone: true
        });
      }
    });
  }

  hideAlert = () => {
    this.props.history.push('all-contracts')
    this.setState({
      paymentFailed: false,
      paymentDone: false
    });
  }

  handleDescription = (e) => {
    this.setState({
      description: e.target.value
    });
  }

  render() {
    const {
      requested_payments,
      hourlyRate,
      isBonus,
      bonusAmount,
      checkAmount,
      contractDetails,
      deposite_amount,
      description,
      uuid,
      projectFileArray
    } = this.state;

    return (
      <div>
        <ProjectManagerHeader history={this.props.history} />
        {this.state.paymentDone && (
          // <div className="app-pro2-swal">
          //   <SweetAlert title="" onConfirm={() => this.hideAlert()} showConfirm={true}>
          //     <img src={inviteIcon} alt="" />
          //     <h4>
          //       <strong>
          //         Changes Requested Successfully. <br />
          //       </strong>
          //     </h4>

          //   </SweetAlert>
          // </div>
          <SuccessSweetAlert
            handleConfirm={this.hideAlert.bind()}
            show={true}
            message={"Changes Requested Successfully."}
          />
        )}

        {this.state.paymentFailed && (
          // <div className="app-pro2-swal">
          //   <SweetAlert danger title="Alert!" onConfirm={() => this.hideAlert()}>
          //     Payment Failed
          //   </SweetAlert>
          // </div>
          <ErrorSweetAlert
            show={true}
            handleConfirm={() => this.hideAlert()}
            message={"Payment Failed."}
          />
        )}
        <div className="tf_inter freelancerReviewPaySection">
          <div className="freelanceraccountallcontactsSection d-flex">
            <div className="col-md-2 p-0 SideBarUI">
              <PMDashboardSideBar history={this.props.history} />
            </div>
            <div className="col-md-10 rightSidecontent">
              <div className="col-md-12 tf_resp_padd reviewPay">

                <div className="tf_aws tf_contracts_mile review_pay_pm">
                  <div className="">
                    <div className="col-md-12 p-0">
                      <div className="tf_milest_1">
                        <div className="col-md-12">
                          <h4>{contractDetails && contractDetails.title}</h4>
                        </div>
                        <div className="clearfix"></div>
                        <hr />
                        <div className="col-md-12">
                          <table className="table">
                            <tbody>
                              <tr>
                                <td>
                                  <strong>Status</strong>
                                </td>
                                <td>{contractDetails && contractDetails.status}</td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>Amount in Escrow</strong>
                                </td>
                                <td>${contractDetails && contractDetails.escrow_amount}</td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>Orignal Amount</strong>
                                </td>
                                <td>${contractDetails && contractDetails.fixed_price_amount}</td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>Amount Requested</strong>
                                </td>
                                <td>${deposite_amount}</td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>Request Message</strong>
                                </td>
                                <td>{requested_payments.request_message}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div>
                          <div className="col-md-12 Project-Type-Section">
                            <h5 className="p-attached-file"><strong>Attachments:</strong></h5>
                            {this.returnAttachements(requested_payments.work_documents || [])}
                          </div>
                        </div>
                        <div className="clearfix"></div>
                        <div className="invite_freelancer tf_all_mile_1">
                          <ul className="nav nav-tabs" role="tablist">
                            <li role="presentation" className="active">
                              <a
                                href="#SEARCH"
                                aria-controls="SEARCH"
                                role="tab"
                                data-toggle="tab"
                                aria-expanded="true"
                              >
                                APPROVE & PAY
                              </a>
                            </li>
                            <li role="presentation" className="">
                              <a
                                href="#HIRES"
                                aria-controls="messages"
                                role="tab"
                                data-toggle="tab"
                                aria-expanded="false"
                              >
                                REQUEST CHANGES
                              </a>
                            </li>
                          </ul>
                          <div className="tab-content">
                            <div role="tabpanel" className="tab-pane active" id="SEARCH">
                              <div className="tf_main_filter">
                                <div className="col-md-12 terms_section">
                                  <div className="col-md-6 col-sm-12 tf_hr nopad">
                                    <h3>Release from Escrow</h3>
                                  </div>
                                  <div className="col-md-4 col-sm-8 col-xs-10 resp_nopad">
                                    <div className="input-group tf_loca">
                                      <div className="input-group-addon_dollor">$</div>
                                      <input
                                        type="Full Name"
                                        className="form-control mn_input_4"
                                        name="hourlyRate"
                                        value={
                                          hourlyRate
                                            ? hourlyRate
                                            : contractDetails &&
                                              contractDetails.payment_requested &&
                                              contractDetails.payment_requested[0].amount_requested
                                              ? parseFloat(
                                                contractDetails.payment_requested[0].amount_requested
                                              ).toFixed(2)
                                              : ""
                                        }
                                        placeholder="0.00"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-12 tf_percent nopad">
                                    <div className="col-md-6 col-sm-12 nopad">
                                      <div onChange={this.handleBonus} name="checkAmount">
                                        <div className="tf_sound tf_sound1 bonus_label">
                                          <input
                                            type="checkbox"
                                            name="yes"
                                            value="yes"
                                            id="yes"
                                            defaultChecked={checkAmount.includes("yes")}
                                          />
                                          <label htmlFor="yes"> Add bonus (optional)</label>
                                        </div>
                                      </div>
                                    </div>

                                    {isBonus ? (
                                      <div className="col-md-4 col-sm-8 col-xs-10 resp_nopad">
                                        <div className="input-group tf_loca">
                                          <div className="input-group-addon_dollor">$</div>
                                          <input
                                            type="number"
                                            className="form-control mn_input_4"
                                            name="bonusAmount"
                                            onBlur={this.handleBonusBlur}
                                            onChange={this.handleBonusChange}
                                            value={bonusAmount}
                                            placeholder="0.00"
                                          />
                                        </div>
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </div>

                                  <div className="clearfix"></div>
                                  <div className="col-md-12 nopad">
                                    <div className="col-md-6 col-sm-12 tf_hr nopad">
                                      <h3>Total Amount</h3>
                                    </div>
                                    <div className="col-md-4 col-sm-8 col-xs-10 resp_nopad">
                                      <div className="input-group tf_loca">
                                        <div className="input-group-addon_dollor">$</div>
                                        <input
                                          type="Full Name"
                                          className="form-control mn_input_4"
                                          name="Full Name"
                                          placeholder="0.00"
                                          value={
                                            isNaN(
                                              +(+bonusAmount) +
                                              +(hourlyRate
                                                ? hourlyRate
                                                : contractDetails &&
                                                contractDetails.payment_requested &&
                                                contractDetails.payment_requested[0].amount_requested)
                                            )
                                              ? "00"
                                              : (
                                                +(+bonusAmount) +
                                                +(hourlyRate
                                                  ? hourlyRate
                                                  : contractDetails &&
                                                  contractDetails.payment_requested &&
                                                  contractDetails.payment_requested[0].amount_requested)
                                              ).toFixed(2)
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                  <div className="tf_freelancer_pro_right2">
                                    <Link
                                      onClick={(e) => this.approvePayment(e)}
                                      className="tf_hire_button"
                                    >
                                      APPROVE & PAY
                                    </Link>
                                    <Link
                                      to={`/contract-details/${contractDetails.uuid || uuid}`}
                                      className="tf_hire_cancel_button"
                                    >
                                      CANCEL
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div role="tabpanel" className="tab-pane" id="HIRES">
                              <div className="tf_main_filter tf_mile_cont1">
                                <div className="tf_main_filter">
                                  <div className="col-md-12">
                                    <div className="text-left">
                                      <div className="input-group">
                                        <label>Tell the cloud expert what you need</label>
                                        <textarea
                                          id="status"
                                          rows="5"
                                          className="form-control"
                                          placeholder="Input text"
                                          defaultValue={description}
                                          onChange={this.handleDescription}
                                        ></textarea>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-10 col-md-10 col-sm-10 col-xs-12">
                                    <label>Add Attachments</label>
                                    {this.handleFilesToShow(projectFileArray)}

                                    <div className="tf_drag_form mt-10">
                                      <Dropzone
                                        onDrop={(
                                          acceptedFiles
                                        ) =>
                                          this.handleFileDrop(
                                            acceptedFiles
                                          )
                                        }
                                      >
                                        {({
                                          getRootProps,
                                          getInputProps,
                                        }) => (
                                          <section>
                                            <div
                                              {...getRootProps()}
                                            >
                                              <input
                                                {...getInputProps()}
                                              />
                                              <p id="projectFile">
                                                Upload files
                                              </p>
                                            </div>
                                          </section>
                                        )}
                                      </Dropzone>
                                    </div>
                                    <div className="support-formats">
                                      <span className="no-margin">You may attach up to 5 files under 100 MB</span>
                                      <span className="no-margin">Supports all popular formats (ppt, word, excel, pdf, jpeg etc)</span>
                                    </div>
                                  </div>
                                  <div className="clearfix"></div>
                                  <div className="col-lg-12 col-md-12">
                                    <div className="tf_freelancer_pro_right2">
                                      <Link
                                        onClick={(e) => this.payFreelancer(e)}
                                        className="tf_hire_button"
                                      >
                                        SUBMIT
                                      </Link>
                                      <Link className="tf_hire_cancel_button">
                                        CANCEL
                                      </Link>
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
        {/* <Footer /> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contractDetails: state.contractDetailsForHiringManager
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    approvePayment: (id) => dispatch(approvePayment(id)),
    payContractAmount: (data) => dispatch(payContract(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewnPay);
