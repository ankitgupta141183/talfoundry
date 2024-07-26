import React, { Component } from "react";
import {
  hireAFreelancer,
  getHireFreelancerDetails,
} from "../../Actions/ProjectManagerFreelancerActions";
import Footer from "../miscellaneous/Footer";
import ProjectManagerHeader from "../miscellaneous/ProjectManagerHeader";
import { connect } from "react-redux";
// import inviteIcon from "../../static/images/invite.png";
import { isEmpty } from "lodash";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dollarIcon from "../../static/images/$.svg";
import paypalImg from "../../static/images/pay_6.png";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import faceImg from "../../static/images/profile-placeholder.png";
import { PayPalButton } from "react-paypal-button-v2";
import closeIcon from "../../static/images/close-icon.png";
import Loader from "react-loader-spinner";
import Find from "../../../src/static/images/hiw/We_Find_The_Perfect_Match.svg";
import Post from "../../../src/static/images/hiw/Post_A_Job.svg";
import Collaborate from "../../../src/static/images/hiw/Get_Work_Done.svg";
import Secure from "../../../src/static/images/hiw/Pay_Securely.svg";
import PMDashboardSideBar from "./PMDashboardSideBar";
import PaymentType from "../Payment/PaymentMethod/PaymentMethod";
import { SendStripePaymentId } from "../../Actions/PaymentActions";
import StripePaymentElement from "../Payment/StripePayment";
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
    background: "transparent",
    // width                 : '34%',
  },
}

class HireAFreelancer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: false,
      start_date: new Date(),
      due_date: new Date(),
      limitOfWeek: "5",
      description: "",
      depositEscrow: "full deposit",
      isFixed:
        props.location.state && props.location.state.rateType === "fixed price",
      isEdit: false,
      fileName: "",
      document: "",
      contractTitle: "",
      timePeriod: "weekly",
      fixedPrice: "",
      hourlyRate:  "",
      contractTitleError: "",
      descriptionError: "",
      isFreelancer: false,
      fixed_price_amount: "",
      weeklyPayment: "",
      isProposalSubmit: false,
      agreementPolicy: "",
      isTermsChecked: false,
      isTermsCheckedError: true,
      hourlyRateError: false,
      numberOfMileStoneFields: 1,
      allMileStoneFields: [
        { description: "", due_date: new Date(), deposite_amount: "" },
      ],
      allMileStoneValues: [],
      mileStoneDescriptionErrors: [],
      isAddMethodModal: false,
      isScriptLoaded: false,
      paypalModal: false,
      firstMilestone: "",
      projectFileArray: [],
      payment_by_stripe: { payment_method: false, clientSecret: "" },
      stripePaymentModal: false
    }
    this.checkboxRef = React.createRef();
  }

  componentDidMount() {
  
    

    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AZDgGNKyQoBs3jyD6kGoTmh1KuWJBhjdjJCMuoCP4wz0MdFlPsE8fqYWC8rDOlsS_OgXzuMjUKRiBJ10";
    script.async = true;
    script.onload = () => {
      this.setState({ isScriptLoaded: true });
    }
    document.body.appendChild(script);

    this.props.getHireFreelancerDetails(
      this.props.match.params.freelancerId,
      this.props.match.params.jobId
    );


    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    ), paymentIntent = new URLSearchParams(window.location.search).get(
      "payment_intent"
    ), redirect_status = new URLSearchParams(window.location.search).get(
      "redirect_status"
    )
    if (clientSecret) {
      this.setState({
        isLoading : true
      })
     
      const payDetails = {
        clientSecret: clientSecret,
        paymentIntent: paymentIntent
      }
      const payData = {
        redirect_status: redirect_status
      }
      setTimeout(()=>{
        this.hireFreelancer(payDetails, payData)
      },1000)
    }
  }

componentDidUpdate(){

  const {FreelancerToHire} = this.props 
        
  if( FreelancerToHire.user_rate && this.state.hourlyRate === "") {
    this.setState({
      hourlyRate :parseFloat(FreelancerToHire.user_rate).toFixed(2)
    })
  }
}

  addMileStoneFields = (event) => {
    event.preventDefault();
    var currentNoOfmileStones = this.state.numberOfMileStoneFields;
    var milestone = {
      description: "",
      due_date: new Date(),
      deposite_amount: "",
    }
    this.setState((prevState) => ({
      numberOfMileStoneFields: currentNoOfmileStones + 1,
      allMileStoneFields: [...prevState.allMileStoneFields, milestone],
    }));
  }

  handleMileStoneDescription = (e) => {
    let allFields = this.state.allMileStoneFields;
    let field = this.state.allMileStoneFields[e.target.id];
    field.description = e.target.value;
    allFields[e.target.id] = field;
    this.setState({
      allMileStoneFields: allFields,
      mileStoneDescriptionErrors: [],
    });
  }

  handleMileStoneDueDate = (id, date) => {
    let allFields = this.state.allMileStoneFields;
    let field = this.state.allMileStoneFields[id];
    field.due_date = date;
    allFields[id] = field;
    this.setState({ allMileStoneFields: allFields });
  }

  handleMileStoneAmount = (e) => {
    if (e.target.value > 0) {
      let allFields = this.state.allMileStoneFields;
      let field = this.state.allMileStoneFields[e.target.id];
      field.deposite_amount = e.target.value;
      allFields[e.target.id] = field;
      let firstMilestone = allFields[0] ? allFields[0].deposite_amount : "";
      this.setState({
        allMileStoneFields: allFields,
        firstMilestone: firstMilestone,
      });
    }
  }

  handleMileStoneAmountBlur = (e) => {
    let allFields = this.state.allMileStoneFields;
    let field = this.state.allMileStoneFields[e.target.id];
    field.deposite_amount = !isNaN(parseFloat(e.target.value).toFixed(2))
      ? parseFloat(e.target.value).toFixed(2)
      : "";
    allFields[e.target.id] = field;
    this.setState({ allMileStoneFields: allFields });
  }

  deleteMileStoneField = (e) => {
    let allFields = this.state.allMileStoneFields;
    allFields.splice(e.target.id, 1);
    this.setState({ allMileStoneFields: allFields });
  }

  handleDateChange = (date) => {
    this.setState({
      start_date: date,
    });
  }

  handleDueDateChange = (date) => {
    this.setState({
      due_date: date,
    });
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      descriptionError: false,
      contractTitleError: false,
      isTermsChecked: this.checkboxRef.current.checked,
      isTermsCheckedError: true,
      hourlyRateError: false,
    });
  }

  handleRateChange = (e) => {
    if (e.target.value >= 0 || e.target.value === "") {
      this.setState({
        [e.target.name]: e.target.value,
        hourlyRateError: false,
        fixedPriceError: false,
      });
    }
  }

  handleRateBlur = (e) => {
    this.setState({
      [e.target.name]: !isNaN(parseFloat(e.target.value).toFixed(2))
        ? parseFloat(e.target.value).toFixed(2)
        : "",
    });
  }

  uploadDocument = (e) => {
    let projectFileArrayVar = this.state.projectFileArray;
    let file = e.target.files[0];
    let isPresent = projectFileArrayVar.find((a) => a.name === file.name);

    if (!isPresent) {
      projectFileArrayVar.push(file);
      this.setState({
        projectFileArray: projectFileArrayVar,
      });
    }
  }

  handleFileRemove = (e) => {
    e.preventDefault();
    let allprojectFiles = [];
    let currentProjectFiles = this.state.projectFileArray;
    currentProjectFiles.map((proj) => {
      if (proj.name !== e.target.id) {
        allprojectFiles.push(proj);
      }
      return proj
    });
    this.setState({ projectFileArray: allprojectFiles });
  }

  handleFilesToShow = (projectFileArray) => {
    let fileToDisplay = [];
    if (projectFileArray && projectFileArray.length > 0) {
      projectFileArray.map((proj, id) => {
        fileToDisplay.push(
          <div
            className="row multi-file-upload-files-list mt-10"
            id={proj.name}
            key={`file_${id}`}
          >
            <div className="col-md-8">
              <i className="fa fa-check" aria-hidden="true"></i>{proj.name}
            </div>
            <div>
              <i
                className="fa fa-trash"
                id={proj.name}
                onClick={this.handleFileRemove}
                aria-hidden="true"
              ></i>
            </div>
          </div>
        );
        return proj
      });
    }
    return fileToDisplay;
  }

  changeSection = (e) => {
    e.preventDefault();
    this.setState({ isFixed: !this.state.isFixed });
  }

  editHourlyRate = (e) => {
    e.preventDefault();
    this.setState({ isEdit: !this.state.isEdit });
  }

  fieldError(message) {
    return (
      <p id="firstName" className="error-field">
        {message ? message : "This field can't be blank."}
      </p>
    );
  }

  openPaypalPopup = () => {
    const {
      contractTitle,
      isFixed,
      fixedPrice,
      depositEscrow,
      description,
      hourlyRate,
      allMileStoneFields,
      payment_by_stripe

    } = this.state;
    let words = (description.match(/\S+/g) || []).length;
    let errorInMileStoneDescription = [];
    allMileStoneFields.map((field) => {
      if (field.description === "") {
        errorInMileStoneDescription.push(true);
      } else {
        errorInMileStoneDescription.push(false);
      }
      return field
    });
    if (
      contractTitle !== "" &&
      (words > 50 || words < 500) &&
      this.checkboxRef.current.checked &&
      (isFixed ? fixedPrice !== "" : hourlyRate !== "") &&
      (depositEscrow === "pay by milestone"
        ? !errorInMileStoneDescription.includes(true)
        : true)
    ) {
      if (payment_by_stripe.payment_method) {
        this.setState({ stripePaymentModal: true })
      } else {

        this.setState({ paypalModal: true });
      }
    } else {
      this.setState({
        contractTitleError: contractTitle === "",
        descriptionError: (words < 50 || words > 500) && true,
        isTermsCheckedError: this.checkboxRef.current.checked,
        hourlyRateError: hourlyRate === "",
        mileStoneDescriptionErrors: errorInMileStoneDescription,
        fixedPriceError: fixedPrice === "",
      });
    }
  }

  hireFreelancer = (payDetails, payData) => {
    this.setState({ paypalModal: false });
    const Contarct_details = JSON.parse(localStorage.getItem("Contarct_details"))
    const  paymentIntent = new URLSearchParams(window.location.search).get(
      "payment_intent"
    )
    const {
      contractTitle,
      isFixed,
      timePeriod,
      limitOfWeek,
      fixedPrice,
      depositEscrow,
      start_date,
      due_date,
      description,
      hourlyRate,
      weeklyPayment,
      allMileStoneFields,
    } = this.state;
    const { FreelancerToHire } = this.props || JSON.parse(localStorage.getItem("Contarct_details"));
    const user_id = this.props.currentUser.id || this.props.currentUser.user_id;
    let errorInMileStoneDescription = [];
    allMileStoneFields.map((field) => {
      if (field.description === "") {
        errorInMileStoneDescription.push(true);
      } else {
        errorInMileStoneDescription.push(false);
      }
      return field
    });

    let contract =  {}
    

    if(Contarct_details && paymentIntent){
      contract = {
        title: Contarct_details.contractTitle,
        payment_mode: Contarct_details.isFixed ? "fixed" : "hourly",
        fixed_price_mode: Contarct_details.isFixed ? Contarct_details.depositEscrow : "",
        time_period: !Contarct_details.isFixed ? Contarct_details.timePeriod : "",
        time_period_limit: !Contarct_details.isFixed ? Contarct_details.limitOfWeek : "",
        start_date: !Contarct_details.isFixed ? Contarct_details.start_date : Contarct_details.start_date,
        due_date:
        Contarct_details.isFixed && !(Contarct_details.depositEscrow === "pay by milestone")
            ? Contarct_details.due_date
            : "",
        weekly_payment: !Contarct_details.isFixed
          ? !isEmpty(Contarct_details.weeklyPayment)
            ? Contarct_details.weeklyPayment
            : parseFloat(Contarct_details.hourlyRate * Contarct_details.limitOfWeek).toFixed(2)
          : "",
        description: Contarct_details.description,
        fixed_price_amount: Contarct_details.isFixed ? Contarct_details.fixedPrice : "",
        hired_by_id: user_id,
        milestones_attributes:
        Contarct_details.isFixed && Contarct_details.depositEscrow === "pay by milestone"
            ? Contarct_details.allMileStoneFields
            : [],
        freelancer_id: FreelancerToHire.id,
        hourly_rate: !Contarct_details.isFixed ? Contarct_details.hourlyRate : "",
        job_id: Contarct_details.FreelancerToHire.job_id,
      }
    }else{
      contract = {
        title: contractTitle,
        payment_mode: isFixed ? "fixed" : "hourly",
        fixed_price_mode: isFixed ? depositEscrow : "",
        time_period: !isFixed ? timePeriod : "",
        time_period_limit: !isFixed ? limitOfWeek : "",
        start_date: !isFixed ? start_date : start_date,
        due_date:
          isFixed && !(this.state.depositEscrow === "pay by milestone")
            ? due_date
            : "",
        weekly_payment: !isFixed
          ? !isEmpty(weeklyPayment)
            ? weeklyPayment
            : parseFloat(hourlyRate * limitOfWeek).toFixed(2)
          : "",
        description: description,
        fixed_price_amount: isFixed ? fixedPrice : "",
        hired_by_id: user_id,
        milestones_attributes:
          isFixed && depositEscrow === "pay by milestone"
            ? allMileStoneFields
            : [],
        freelancer_id: FreelancerToHire.id,
        hourly_rate: !isFixed ? hourlyRate : "",
        job_id: FreelancerToHire.job_id,
      }
    }

    console.log(contract , "contract");

    var contract_form_data = new FormData();
    for (let key in contract) {
      if (key === "milestones_attributes") {
        contract[key].map((record) => {
          contract_form_data.append(
            `contract[${key}[][description]]`,
            record.description
          );
          contract_form_data.append(
            `contract[${key}[][due_date]]`,
            record.due_date
          );
          contract_form_data.append(
            `contract[${key}[][deposite_amount]]`,
            record.deposite_amount
          );
          return record
        });
      } else {
        contract_form_data.append(`contract[${key}]`, contract[key]);
      }
    }

    this.state.projectFileArray.map((p, index) => {
      contract_form_data.append(`contract[attachments[${index}]]`, p);
      return p
    });

    contract_form_data.append(
      "contract[payDetails]",
      JSON.stringify(payDetails)
    );
    contract_form_data.append("contract[payData]", JSON.stringify(payData));
    this.setState({
      isLoading : false
    })
    this.props.hireAFreelancer(contract_form_data).then((res) => {
      if (res && res.status === 200) {
        this.setState({ isProposalSubmit: true , isLoading : false  });
        localStorage.removeItem("Contarct_details")
      } else {
        alert("server error please try again later.");
      }
    });
  }

  hideInvitationSuccess = () => {
    this.setState({ isProposalSubmit: false });
  }

  removeAttachment = () => {
    this.setState({ fileName: "", document: "" });
  }

  openPaymentModals = (e) => {
    this.setState({ [e.target.name]: true });
  }

  closePaymentModals = (name) => {
    this.setState({ [name]: false });
  }

  closePayPalModal = () => {
    this.setState({ paypalModal: false, stripePaymentModal: false });
  }

  GetStripePaymentclientSecret = (key) => {
    const {
      contractTitle,
      isFixed,
      fixedPrice,
      depositEscrow,
      description,
      hourlyRate,
      allMileStoneFields,
      limitOfWeek,
      timePeriod,
      start_date,
      due_date,
      weeklyPayment,
    } = this.state;
    let words = (description.match(/\S+/g) || []).length;
    let errorInMileStoneDescription = [];
    allMileStoneFields.map((field) => {
      if (field.description === "") {
        errorInMileStoneDescription.push(true);
      } else {
        errorInMileStoneDescription.push(false);
      }
      return field
    });
    if (
      contractTitle !== "" &&
      (words > 50 || words < 500) &&
      (isFixed ? fixedPrice !== "" : hourlyRate !== "") &&
      (depositEscrow === "pay by milestone"
        ? !errorInMileStoneDescription.includes(true)
        : true)
    ) {
      const payload = {
        amount: isFixed ? fixedPrice : parseInt(hourlyRate) * parseInt(limitOfWeek) * 100
      }

      const { FreelancerToHire } = this.props;
      const Contarct_details = {
        contractTitle,
        isFixed,
        timePeriod,
        limitOfWeek,
        fixedPrice,
        depositEscrow,
        start_date,
        due_date,
        description,
        hourlyRate,
        weeklyPayment,
        allMileStoneFields,
        FreelancerToHire
      }
      SendStripePaymentId(payload).then((response) => {
        console.log(response, "SendStripePaymentId");
        if (!response.error) {
          localStorage.setItem("Contarct_details", JSON.stringify(Contarct_details))
          this.setState({
            payment_by_stripe: { payment_method: true, clientSecret: { clientSecret: response?.clientSecret } }
          })
        } else {
          alert("Stripe Payment Error")
        }

      }).catch((err) => {
        console.log(err , "err stripe");
      })

    } else {
      this.setState({
        contractTitleError: contractTitle === "",
        descriptionError: (words < 50 || words > 500) && true,
        // isTermsCheckedError: this.checkboxRef.current.checked,
        hourlyRateError: hourlyRate === "",
        mileStoneDescriptionErrors: errorInMileStoneDescription,
        fixedPriceError: fixedPrice === "",
      });

    }

  }

  render() {
    const {
      isFixed,
      contractTitle,
      timePeriod,
      limitOfWeek,
      fixedPrice,
      depositEscrow,
      description,
      hourlyRate,
      isEdit,
      contractTitleError,
      descriptionError,
      weeklyPayment,
      agreementPolicy,
      fileName,
      hourlyRateError,
      allMileStoneFields,
      mileStoneDescriptionErrors,
      paypalModal,
      fixedPriceError,
      payment_by_stripe,
      stripePaymentModal

    } = this.state;
    const { FreelancerToHire, applicationIsLoading } = this.props;
    if (this.state.isProposalSubmit) {
      setTimeout(
        function () {
          this.setState({ isProposalSubmit: false });
          this.props.history.push(`/job/${this.props.match.params.jobId}/1`);
        }.bind(this),
        3000
      );
    }
    return (
      <div id="hire-freelancer-paypal-button-modal">
        <ProjectManagerHeader history={this.props.history} showLoader={false} />
        {applicationIsLoading && (
          <div className="grid-loader">
            <Loader type="Grid" color="#00BFFF" height="100" width="100" />
          </div>
        )}
        {!applicationIsLoading && (
          <div className={!this.props.loginSteps.showHideSideBar ? "mains" : "main-add"}>
            <div className="d-flex">
              <div className="">
                {/* <PMDashboardSideBar history={this.props.history}/> */}
              </div>
              <div className="row custom_row">
                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 p-0">
                  <div className="custom_sticky_container">
                    <div className="position-sticky">
                      <PMDashboardSideBar history={this.props.history} />
                    </div>
                  </div>
                </div>
                <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                  <div className="col-md-12 tf_pad_res px-0 mt-20">

                    <div className="tf_aws_1">
                      <h2>Hire</h2>
                      <StripePaymentElement
                        onOpen={stripePaymentModal}
                        onClose={this.closePayPalModal}
                        clientSecret={payment_by_stripe?.clientSecret?.clientSecret}
                      />
                      <Modal
                        isOpen={paypalModal}
                        onRequestClose={this.closePayPalModal}
                        style={customStyles}
                      >
                        {
                          <div
                            className="modal-dialog"
                            id="remove-payment-method-popup"
                          >
                            <div className="modal-content">
                              <div className="modal-header">
                                <button
                                  type="button"
                                  className="close"
                                  onClick={this.closePayPalModal}
                                >
                                  <span aria-hidden="true">×</span>
                                  <span className="sr-only">Close</span>
                                </button>
                                <h4 className="modal-title">PayPal Checkout</h4>
                              </div>

                              <div className="modal-body paypal-debit-card-and-credit-card">
                                <div className="paypal-debit-card-and-credit-card-container">
                                  {this.state.isScriptLoaded && (
                                    <PayPalButton
                                      amount={
                                        !isFixed
                                          ? !isEmpty(weeklyPayment)
                                            ? parseFloat(weeklyPayment) +
                                            parseFloat((weeklyPayment * 20) / 100)
                                            : parseFloat(
                                              hourlyRate * limitOfWeek +
                                              (hourlyRate * limitOfWeek * 20) /
                                              100
                                            ).toFixed(2)
                                          : isFixed &&
                                            this.state.depositEscrow ===
                                            "pay by milestone"
                                            ? parseFloat(this.state.fixedPrice) +
                                            parseFloat(
                                              (this.state.fixedPrice * 20) / 100
                                            )
                                            : isFixed
                                              ? parseFloat(this.state.fixedPrice) +
                                              parseFloat(
                                                (this.state.fixedPrice * 20) / 100
                                              )
                                              : ""
                                      }
                                      onSuccess={(details, data) => {
                                        this.hireFreelancer(details, data);
                                        this.setState({ paypalModal: false });
                                      }}
                                    />
                                  )}
                                  <div className="yes-no-button-container">
                                    <button
                                      onClick={this.closePayPalModal}
                                      type="button"
                                      className="btn btn-not-ban"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        }
                      </Modal>
                      <div className="col-lg-9 col-md-8 pl-0">
                        <div className="margin-tops">
                          <div className="tf_hire_main">
                            <div className="col-lg-2 col-md-3 col-sm-3 col-xs-4 tf_full_width">
                              <div className="tf_image">
                                {!isEmpty(FreelancerToHire) &&
                                  FreelancerToHire.user_picture ? (
                                  <img
                                    src={FreelancerToHire.user_picture}
                                    alt=""
                                    className="hire-circle-img"
                                  />
                                ) : (
                                  <img
                                    src={faceImg}
                                    alt=""
                                    className="hire-circle-img"
                                  />
                                )}
                              </div>
                            </div>
                            {this.state.isProposalSubmit && (
                              // <div className="app-pro2-swal">
                              //   <SweetAlert
                              //     title=""
                              //     onConfirm={this.hideInvitationSuccess}
                              //     showConfirm={true}
                              //   >
                              //     <img src={inviteIcon} alt="inviteIcon" />
                              //     <h4>
                              //       <strong>
                              //         Offer Sent. <br /> We will get back to you
                              //         shortly.
                              //       </strong>
                              //     </h4>
                              //   </SweetAlert>
                              // </div>
                              <SuccessSweetAlert
                              handleConfirm={() => this.hideInvitationSuccess()}
                              show={true}
                              message={`Offer Sent. \n We will get back to you`}
                            />
                            )}
                            <div className="col-lg-10 col-md-9 col-sm-9 col-xs-8  tf_full_width">
                              <div className="tf_free_name">
                                <h5>
                                  <br />
                                  {!isEmpty(FreelancerToHire) &&
                                    FreelancerToHire.full_name}
                                </h5>
                              </div>
                            </div>
                            <div className="clearfix"></div>
                            <hr />
                            <div className="col-md-12">
                              <div className="form-group">
                                <div className="input-group">
                                  <label>Contract Title</label>
                                  <input
                                    type="text"
                                    className="form-control mn_input"
                                    placeholder="Add contract title"
                                    value={contractTitle}
                                    name="contractTitle"
                                    onChange={this.handleChange}
                                  />
                                  {contractTitleError && this.fieldError()}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {!isFixed && (
                          <div className="margin-tops">
                            <div className="tf_freelancer_pro tf_terms">
                              <div className="col-md-6 col-lg-9 col-sm-6 col-xs-12 tf_full_width">
                                <h2>Terms</h2>
                              </div>
                              <div className="col-md-6 col-lg-3 col-sm-6 col-xs-12 tf_full_width">
                                <Link onClick={this.changeSection}>
                                  Switch to fixed-price
                                </Link>
                              </div>
                              <div className="clearfix"></div>
                              <hr />
                              <div className="col-md-6 tf_hire_main_hour">
                                <h5>Hourly Rate</h5>
                                {isEdit ? (
                                  <div className="input-group">
                                    <input
                                      type="number"
                                      className="form-control mn_input"
                                      onBlur={this.handleRateBlur}
                                      onChange={this.handleRateChange}
                                      value={hourlyRate}
                                      name="hourlyRate"
                                      placeholder="$0.00"
                                    />
                                    <span className="input-group-addon3 add-on hourly-rate-edit">
                                      <img src={dollarIcon} alt="icon" />
                                    </span>
                                  </div>
                                ) : (
                                  <h4>${hourlyRate ? hourlyRate : "0.00"}/hr </h4>
                                )}
                                {hourlyRateError && this.fieldError()}
                                <h4>
                                  <Link onClick={this.editHourlyRate}>
                                    Edit
                                  </Link>
                                </h4>
                                <div className="clearfix"></div>
                                <p>
                                  {!isEmpty(FreelancerToHire) &&
                                    FreelancerToHire.full_name}
                                  ’s profile rate is $
                                  {!isEmpty(FreelancerToHire) &&
                                    FreelancerToHire.user_rate
                                    ? parseFloat(
                                      FreelancerToHire.user_rate
                                    ).toFixed(2)
                                    : "0.00"}
                                  /hr
                                </p>
                              </div>
                              <div className="clearfix"></div>
                              <div className="col-md-4 col-sm-4">
                                <div className="input-group">
                                  <label className="control-label">
                                    Select Time Period
                                  </label>
                                  <div className="clearfix"></div>
                                  <div className="selectedwrap">
                                    <select
                                      name="timePeriod"
                                      onChange={this.handleChange}
                                      className="form-control mn_input2"
                                    >
                                      <option
                                        selected={timePeriod === "weekly"}
                                        value="weekly"
                                      >
                                        Weekly
                                      </option>
                                      <option
                                        selected={timePeriod === "monthly"}
                                        value="monthly"
                                      >
                                        Monthly
                                      </option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-1  col-sm-1 tf_hire_main_left">
                                <h1>-</h1>
                              </div>
                              <div className="col-md-4  col-sm-4">
                                <div className="input-group">
                                  <label className="control-label">Limit</label>
                                  <div className="clearfix"></div>
                                  <div className="selectedwrap">
                                    <select
                                      name="limitOfWeek"
                                      onChange={this.handleChange}
                                      className="form-control mn_input2"
                                    >
                                      <option
                                        value="5"
                                        selected={limitOfWeek === "5"}
                                      >
                                        5 hrs/week
                                      </option>
                                      <option
                                        value="10"
                                        selected={limitOfWeek === "10"}
                                      >
                                        10 hrs/week
                                      </option>
                                      <option
                                        value="20"
                                        selected={limitOfWeek === "20"}
                                      >
                                        20 hrs/week
                                      </option>
                                      <option
                                        value="30"
                                        selected={limitOfWeek === "30"}
                                      >
                                        30 hrs/week
                                      </option>
                                      <option
                                        value="40"
                                        selected={limitOfWeek === "40"}
                                      >
                                        40 hrs/week
                                      </option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-3  col-sm-3 tf_hire_main_left">
                                <p>
                                  = $
                                  {parseFloat(hourlyRate * limitOfWeek).toFixed(2)}{" "}
                                  max/week
                                </p>
                              </div>
                              <div className="clearfix"></div>
                              <hr />
                              <div className="col-md-12">
                                <div
                                  className="panel-group"
                                  id="accordion"
                                  role="tablist"
                                  aria-multiselectable="true"
                                >
                                  <div className="panel panel-default tf_defualt_panel">
                                    <div
                                      className="panel-heading hireAfreelancer-advanced-option-toggle"
                                      role="tab"
                                      id="headingOne"
                                    >
                                      <div
                                        className="title collapsed"
                                        data-role="title"
                                        data-toggle="collapse"
                                        data-parent="#accordion"
                                        href="#collapseOne"
                                        aria-expanded="false"
                                        aria-controls="collapseOne"
                                      >
                                        <strong>Advance Options</strong>
                                        <div className="pull-right">
                                          <i className="fa fa-chevron-down"></i>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      id="collapseOne"
                                      className="panel-collapse collapse in"
                                      role="tabpanel"
                                      aria-labelledby="headingOne"
                                      expanded="true"
                                    >
                                      <div className="panel-body">
                                        <div className="col-md-4 padding_0">
                                          <div className="input-group tf-datepicker hireAfreelancer-date-picker">
                                            <label>Start Date UTC</label>
                                            <DatePicker
                                              selected={this.state.start_date}
                                              onChange={this.handleDateChange}
                                              className="form-control mn_input"
                                              minDate={new Date()}
                                            />
                                            <span className="input-group-addon2 add-on">
                                              <img
                                                src="images/Icon_calender.svg"
                                                alt=""
                                              />
                                            </span>
                                          </div>
                                        </div>
                                        <div className="clearfix"></div>
                                        <div className="col-md-4 padding_0">
                                          <div className="input-group">
                                            <label>Weekly Payment</label>
                                            <input
                                              type="number"
                                              name="weeklyPayment"
                                              onChange={this.handleRateChange}
                                              onBlur={this.handleRateBlur}
                                              className="form-control mn_input1 hireAfreelancer-amount-textbox"
                                              placeholder="0.00"
                                              value={weeklyPayment}
                                            />
                                            <span className="input-group-addon3 add-on">
                                              <img src={dollarIcon} alt="icon" />
                                            </span>
                                          </div>
                                        </div>

                                        <div className="clearfix"></div>
                                        <div className="col-md-12 padding_0">
                                          <p>
                                            An amount in addition to hourly
                                            earnings, paid to the Cloud Expert on a
                                            weekly basis as long as the contract is
                                            active.
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        {isFixed && (
                          <div className="margin-tops">
                            <div className="tf_freelancer_pro tf_terms">
                              <div className="col-md-6 col-lg-9 col-sm-6 col-xs-12 tf_full_width">
                                <h2>Terms</h2>
                              </div>
                              <div className="col-md-6 col-lg-3 col-sm-6 col-xs-12 tf_full_width">
                                <Link onClick={this.changeSection}>
                                  Switch to hourly
                                </Link>
                              </div>
                              <div className="clearfix"></div>
                              <hr />
                              <div className="col-md-12 payment_section">
                                <div className="col-md-4 padding_0">
                                  <div className="input-group">
                                    <label>Total Amount*</label>
                                    <input
                                      type="number"
                                      name="fixedPrice"
                                      onBlur={this.handleRateBlur}
                                      onChange={this.handleRateChange}
                                      className="form-control mn_input1 hireAfreelancer-amount-textbox"
                                      placeholder="0.00"
                                      value={fixedPrice}
                                    />
                                    {fixedPriceError && this.fieldError()}
                                    <span className="input-group-addon3 add-on">
                                      <img src={dollarIcon} alt="dollar" />
                                    </span>
                                  </div>
                                </div>
                                <div className="clearfix"></div>
                                <div className="col-md-6 col-sm-12 col-xs-12 text-left padding_0">
                                  <div className="tf_deposit">
                                    <label className="labeltext">
                                      Deposit into Escrow
                                    </label>
                                    <br />
                                    <div
                                      className="form-check-inline"
                                      onChange={this.handleChange}
                                    >
                                      <label
                                        className="customradio"
                                        htmlFor="Deposit_1"
                                      >
                                        <span className="radiotextsty">
                                          Deposit for the whole project
                                        </span>
                                        <input
                                          type="radio"
                                          name="depositEscrow"
                                          checked={depositEscrow === "full deposit"}
                                          className="hireAfreelancer-amount-textbox"
                                          id="Deposit_1"
                                          value="full deposit"
                                        />
                                        <span className="checkmark"></span>
                                      </label>
                                      <label
                                        className="customradio"
                                        htmlFor="Deposit_2"
                                      >
                                        <span className="radiotextsty">
                                          Deposit by Milestones
                                        </span>
                                        <input
                                          type="radio"
                                          value="pay by milestone"
                                          name="depositEscrow"
                                          className="hireAfreelancer-amount-textbox"
                                          checked={
                                            depositEscrow === "pay by milestone"
                                          }
                                          id="Deposit_2"
                                        />
                                        <span className="checkmark"></span>
                                      </label>
                                    </div>
                                  </div>
                                </div>

                                <div className="clearfix"></div>
                                <div className="col-md-4 padding_0">
                                  <div className="input-group tf-datepicker hireAfreelancer-date-picker">
                                    <label>Start Date UTC</label>
                                    <DatePicker
                                      selected={this.state.start_date}
                                      onChange={this.handleDateChange}
                                      className="form-control mn_input"
                                      minDate={new Date()}
                                    />
                                    <span className="input-group-addon2 add-on">
                                      <img src="images/Icon_calender.svg" alt="" />
                                    </span>
                                  </div>
                                </div>
                                <div className="clearfix"></div>

                                <div
                                  className="col-md-4 padding_0"
                                  id="Deposit_tf_des"
                                >
                                  <div className="input-group tf-datepicker hireAfreelancer-date-picker">
                                    <label>Due Date UTC</label>
                                    <DatePicker
                                      selected={(this.state.start_date > this.state.due_date) ? this.state.start_date : this.state.due_date}
                                      onChange={this.handleDueDateChange}
                                      className="form-control mn_input"
                                      minDate={this.state.start_date}
                                    />
                                    <span className="input-group-addon2 add-on">
                                      <img src="images/Icon_calender.svg" alt="" />
                                    </span>
                                  </div>
                                </div>

                                <div className="clearfix"></div>
                                {depositEscrow === "pay by milestone" && (
                                  <div id="Deposit_tf_des_1">
                                    <hr />
                                    <h5>Milestones</h5>
                                    {allMileStoneFields.map((field, indx) => {
                                      return (
                                        <div
                                          key={indx}
                                          className="milestone-calender"
                                        >
                                          <div className="col-md-1 col-sm-1 col-xs-2 tf_mild">
                                            <label>&nbsp;</label>
                                            <p>{indx + 1}</p>
                                          </div>
                                          <div className="col-lg-4 col-md-4 col-sm-11 col-xs-10 padding_0 tf_mild">
                                            <div className="input-group">
                                              <label>Description*</label>
                                              <input
                                                type="text"
                                                name="sectionDescription"
                                                className="form-control mn_input"
                                                id={indx}
                                                onChange={
                                                  this.handleMileStoneDescription
                                                }
                                                value={field.description}
                                                placeholder="Add some description"
                                              />
                                              {mileStoneDescriptionErrors[indx] &&
                                                this.fieldError()}
                                            </div>
                                          </div>
                                          <div className="col-lg-3 col-md-3  col-sm-6 col-xs-6 tf_full_width1 tf_mild">
                                            <div className="input-group">
                                              <label>Due Date UTC</label>
                                              <DatePicker
                                                selected={field.due_date}
                                                onChange={this.handleMileStoneDueDate.bind(
                                                  this,
                                                  indx
                                                )}
                                                className="form-control mn_input"
                                                id={indx}
                                                minDate={new Date()}
                                              />
                                              <span className="input-group-addon2 add-on">
                                                <img
                                                  src="images/Icon_calender.svg"
                                                  alt=""
                                                />
                                              </span>
                                            </div>
                                          </div>

                                          <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6 tf_full_width1 padding_0 tf_mild">
                                            <div className="input-group">
                                              <label>Amount Deposit</label>
                                              <input
                                                type="number"
                                                className="form-control mn_input1"
                                                id={indx}
                                                onChange={
                                                  this.handleMileStoneAmount
                                                }
                                                placeholder="0.00"
                                                value={field.deposite_amount}
                                                onBlur={
                                                  this.handleMileStoneAmountBlur
                                                }
                                              />
                                              <span className="input-group-addon3 add-on">
                                                <img
                                                  src={dollarIcon}
                                                  alt="dollar"
                                                />
                                              </span>
                                            </div>
                                          </div>
                                          <div className="col-md-1 col-sm-1 col-xs-2">
                                            <img
                                              className="delete-button-image"
                                              src={closeIcon}
                                              alt="close"
                                              onClick={this.deleteMileStoneField.bind(
                                                this
                                              )}
                                              id={indx}
                                            />
                                          </div>
                                          <div className="clearfix"></div>
                                        </div>
                                      );
                                    })}
                                    <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12 padding_0">
                                      <div className="tf_add_milestone">
                                        {" "}
                                        <Link onClick={this.addMileStoneFields}>
                                          + Add Milestone
                                        </Link>{" "}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="margin-tops">
                          <div className="tf_freelancer_pro tf_terms Work-Description-section">
                            <div className="col-md-12  col-sm-12 col-xs-8 tf_full_width">
                              <h2>Work Description</h2>
                            </div>
                            <div className="clearfix"></div>
                            <hr />
                            <div className="col-md-12">
                              <div className="text-left">
                                <div className="input-group">
                                  <textarea
                                    id="status"
                                    rows="10"
                                    className="form-control"
                                    placeholder="Description should contain minimum 50 words and maximum 500 words"
                                    onChange={this.handleChange}
                                    value={description}
                                    name="description"
                                  ></textarea>
                                  {descriptionError &&
                                    this.fieldError(
                                      "Description should be minimum of 50 words and maximum of 500 words."
                                    )}
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopad mb-15">
                              {this.handleFilesToShow(this.state.projectFileArray)}
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopad">
                              <div className="files color col-md-3 ">
                                <input
                                  type="file"
                                  className="form-control"
                                  multiple=""
                                  onChange={this.uploadDocument}
                                  name="uploadDocument"
                                />
                              </div>
                              <div className="support-formats mt-30">
                                <span>Attach file upload up to 25 MB</span>
                                <span className="support-msg">
                                  Supports all popular formats (ppt, word, excel,
                                  pdf, jpeg etc..)
                                </span>
                              </div>
                              <div className="clearfix"></div>
                              <div className="attachment-file-name">
                                {fileName && fileName}{" "}
                                {fileName && (
                                  <img
                                    src={closeIcon}
                                    alt="close"
                                    onClick={this.removeAttachment}
                                  />
                                )}
                              </div>
                            </div>

                            <div className="clearfix"></div>
                            <div className="col-lg-12 col-md-12 col-sm-12  col-xs-12 tf_upload"></div>
                          </div>
                        </div>

                        <div className="margin-tops">
                          <div className="tf_freelancer_pro tf_terms">
                            <div className="col-md-12  col-sm-12 col-xs-8 tf_full_width">
                              <h2>Billing Method</h2>
                            </div>
                            <div className="clearfix"></div>
                            <hr />
                            <div className="col-md-12">
                              <div className="text-left tf_billing">
                                <div className="row">
                                  {!isEmpty(FreelancerToHire) &&
                                    !isEmpty(FreelancerToHire.payment_method) ? (
                                    FreelancerToHire.payment_method.map(
                                      (payMethod, idx) => {
                                        return (
                                          <React.Fragment key={idx}>
                                            <div className="col-md-12">
                                              <div className="col-md-3">
                                                <div className="tf_payment_text tf_payment_text2">
                                                  <img src={paypalImg} alt="" />
                                                </div>
                                              </div>
                                              <div className="col-md-8 tf_payment_text">
                                                <p>Email - {payMethod.email}</p>
                                              </div>
                                              <div className="col-md-1 tf_payment_text7 remove-black-background"></div>
                                            </div>

                                            <div className="clearfix"></div>
                                            <hr />
                                          </React.Fragment>
                                        );
                                      }
                                    )
                                  ) : (
                                    <div className="tf_payment_text tf_payment_text2 mn_heading">
                                      {
                                        payment_by_stripe.payment_method ? (
                                          <h1>Stripe Payment method added </h1>
                                        )
                                          : <PaymentType
                                            GetStripePaymentclientSecret={this.GetStripePaymentclientSecret}
                                            stripePaymentModal={stripePaymentModal}
                                          />
                                      }

                                      <p>
                                        Adding a billing method is required to show
                                        the Cloud Expert you can pay once work is
                                        delivered. There is a 3% processing fee for
                                        all payments.
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="margin-tops">
                          <div className="tf_freelancer_pro tf_terms">
                            <div className="col-md-12  col-sm-12 col-xs-8 tf_full_width">
                              <div className="tf_sound ">
                                <input
                                  type="checkbox"
                                  id="agree"
                                  ref={this.checkboxRef}
                                  onChange={this.handleChange}
                                  checked={this.state.isTermsChecked}
                                  name="agreementPolicy"
                                  value={agreementPolicy}
                                />
                                <label htmlFor="agree">
                                  Yes , I understand and agree to TalFoundry Terms
                                  of Service, including the User Agreement and
                                  Privacy Policy.
                                </label>
                                {!this.state.isTermsCheckedError &&
                                  this.fieldError(
                                    "You need to accept the terms of service."
                                  )}
                              </div>
                            </div>
                            <div className="col-lg-12 col-md-12">
                              <div className="tf_freelancer_pro_right2">
                                <Link
                                  className="tf_hire_button"
                                  data-toggle="modal"
                                  data-target="#myModal"
                                  onClick={this.openPaypalPopup}
                                >
                                  HIRE CLOUD EXPERT
                                </Link>
                                <Link
                                  onClick={() => this.props.history.goBack()}
                                  className="tf_hire_cancel_button"
                                >
                                  CANCEL
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-3 col-md-4 hire_a_freelancer_box text-center">
                        <div className="inner-side-bar-how-it-works">
                          <div className="tf_hire_freelancer_pro_right">
                            <h5>
                              <strong>How do hourly contracts work?</strong>
                            </h5>

                            <div className="how_it_works">
                              <div className="col-md-12 nopad ">
                                <div className="side-bar-single-how-it-works-box">
                                  <img
                                    className="how-it-work-step-image"
                                    src={Post}
                                    alt="Post"
                                  />
                                  <h3>Post A Job</h3>
                                  <p>
                                    Tell us about what you are looking for. We will connect you with top quality Cloud Experts instantly.
                                  </p>
                                </div>
                                <div className="side-bar-single-how-it-works-box">
                                  <img
                                    className="how-it-work-step-image"
                                    src={Find}
                                    alt="Find"
                                  />
                                  <h3>Find The Perfect Match</h3>
                                  <p>
                                    Instantly find Cloud Experts with Exceptional Talents, receive and compare the quotes.
                                  </p>
                                </div>
                                <div className="side-bar-single-how-it-works-box">
                                  <img
                                    className="how-it-work-step-image"
                                    src={Collaborate}
                                    alt="Collaborate"
                                  />
                                  <h3>Get Work Done</h3>
                                  <p>
                                    Collaborate and Communicate with your Cloud Experts directly and get your work done faster.
                                  </p>
                                </div>
                                <div className="side-bar-single-how-it-works-box">
                                  <img
                                    className="how-it-work-step-image"
                                    src={Secure}
                                    alt="Secure"
                                  />
                                  <h3> Pay Securely</h3>
                                  <p>
                                    Pay your Cloud Experts securely as milestones are met for a job well done.
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
        )}

        {/* <Footer /> */}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ...state,
    allFreelancers: state.allFreelancers,
    currentUser: state.currentUser,
    FreelancerToHire: state.FreelancerToHire,
    applicationIsLoading: state.applicationIsLoading,
    loginSteps: state.loginSteps
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    hireAFreelancer: (data) => dispatch(hireAFreelancer(data)),
    getHireFreelancerDetails: (id, jobUuid) =>
      dispatch(getHireFreelancerDetails(id, jobUuid)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HireAFreelancer);
