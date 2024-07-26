import React, { Component } from "react";
import FreelancerHeader from "../miscellaneous/FreelancerHeader";
import { getInvitationsForFreelancer, getOffersForFreelancer } from '../../Actions/freelancerActions';
import { transHistory } from '../../Actions/ProjectManagerFreelancerActions';
import Footer from '../miscellaneous/Footer';
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import Loader from "react-loader-spinner";
import ProjectManagerHeader from "../miscellaneous/ProjectManagerHeader";
import _ from "lodash";
import PMDashboardSideBar from "../projectManager/PMDashboardSideBar";
import FreelancerDashboardSideBar from "../Freelancer/FreelancerDashboardSideBar";
import "react-datepicker/dist/react-datepicker.css";
import BreadCrumb from "../miscellaneous/BreadCrumb";
import NoDataFoundMessage from "../Common/NodataFoundMessage/NoDataFoundMessage";


const customStyles = {
  content: {
    top: '40%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    // background            : 'transparent',
    width: '33%',
    padding: '0px',
  }
}


class Transactions extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      isActive: true,
      isArchived: false,
      transDate: new Date(),
      start_date: '',
      end_date: '',
      transaction_type: 'all',
      client_name: 'all',
      showModal: false,
      transactions: [],
      loadingTransactions: false
    }
  }

  componentDidMount() {
    this.props.getInvites()
    this.props.getOffers()
    this.getTransactions()
  }


  getTransactions = () => {
    this.setState({ loadingTransactions: true })
    const { start_date, end_date, transaction_type, client_name } = this.state;
    this.props.transHistory(start_date ? start_date.toLocaleDateString() : '', end_date ? end_date.toLocaleDateString() : '', transaction_type, client_name).then((res) => {
      this.setState({
        transactions: res,
        loadingTransactions: false
      })
    })
  }

  handleChange = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value })
  }

  showASection = (event) => {
    this.setState({
      isActive: event.target.id === "active" ? true : false,
      isArchived: event.target.id === "archive" ? true : false,
    })
  }

  handleFromDateChange = (date) => {
    this.setState({ start_date: date })
  }

  handleEndDateChange = (date) => {
    this.setState({ end_date: date })
  }


  returnTransactions = () => {
    let transactions = this.state.transactions || []
    let data = []
    if (transactions.length) {
      transactions.map(trans => {
        data.push(<tr className="text-left">
          <td>
            {trans.created_at.slice(0, 10)}
          </td>
          <td>{trans.transaction_type} </td>
          <td>{trans.client_name}</td>
          <td className="ml-10">${trans.amount}</td>
          <td >{trans.payment_mode}</td>
          <td>
            <span style={{ color: '#0DA4DE', cursor: 'pointer' }} onClick={() => this.showCurentTransData(trans)} >
              {trans.reference_id || ''}
            </span>
          </td>
        </tr>)
        return trans
      })
    }
    else {
      data = <tr className="mb-15 mt-20 no-data-to-show-center-align">
        <td colSpan="6" className="text-center"><NoDataFoundMessage  message={"No Data To Show"}/> </td>
      </tr>
    }
    return data
  }

  showCurentTransData = (data) => {
    this.setState({
      currentTransData: data,
      showModal: true
    }, () => {
      this.returnModalData()
    })
  }

  openModal = () => {
    this.setState({ openModal: false })
  }

  closeModal = () => {
    this.setState({ showModal: false })
  }

  returnModalData = () => {
    let data = []
    let { currentTransData } = this.state

    currentTransData && data.push(
      <tr>
        <td width="50%" className="popup-left-column">Reference ID</td>
        <td width="50%" className="popup-right-column">{currentTransData.reference_id}</td>
      </tr>
      ,
      <tr>
        <td width="50%" className="popup-left-column">Date</td>
        <td width="50%" className="popup-right-column">{currentTransData.created_at.slice(0, 10)}</td>
      </tr>
      ,
      <tr>
        <td width="50%" className="popup-left-column">Amount</td>
        <td width="50%" className="popup-right-column">${currentTransData.amount}</td>
      </tr>
      ,
      <tr>
        <td width="50%" className="popup-left-column">Type</td>
        <td width="50%" className="popup-right-column">{currentTransData.transaction_type}</td>
      </tr>
      ,
      <tr>
        <td width="50%" className="popup-left-column">Client</td>
        <td width="50%" className="popup-right-column">{currentTransData.client_name}</td>
      </tr>
      ,
      <tr>
        <td width="50%" className="popup-left-column">Cloud Expert</td>
        <td width="50%" className="popup-right-column">{currentTransData.cloud_expert_name}</td>
      </tr>
    )

    return data
  }

  render() {
    const { showModal, transaction_type,
      client_name, start_date, end_date, loadingTransactions } = this.state;
    // const {invitesForFreelancer, offersForFreelancer} = this.props;
    const addDay = (date) => {
      date.setDate(date.getDate() + 1);
      return date
    }

    return (
      <div>
        {!_.isEmpty(this.props.currentUser) && (
          this.props.currentUser.role === "Project Manager" ? (
            <ProjectManagerHeader history={this.props.history} />
          ) : (
            <FreelancerHeader history={this.props.history} />
          )
        )}
        <div id="tf-project-manager-dashboard-root">
          <BreadCrumb step3 link="Invoices" />
        </div>
        <div id="" className={!this.props.loginSteps.showHideSideBar ? "mains" : "main-add"}>
          <div className="ce-transaction-history-page">
            <Modal isOpen={showModal} style={customStyles} >
              <div className="modal-header transaction-details-popup-header">
                <button type="button" className="close">
                  <i
                    className="fa fa-times"
                    onClick={this.closeModal}
                    aria-hidden="true"
                    style={{
                      fontSize: '20px'
                    }}>

                  </i>
                </button>
                <h4 className="modal-title" id="myModalLabel">Transaction Details</h4>
              </div>

              <div className="modal-body admin-applicant-pop-up transaction-details-popup">
                <div className="">
                  <table className="table">
                    <tbody>
                      {this.returnModalData()}
                    </tbody>
                  </table>
                </div>
              </div>
            </Modal>
            <div className="">
              <div className="row custom_row">

                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 p-0">
                  <div className="custom_sticky_container">
                    <div className="position-sticky">
                      {!_.isEmpty(this.props.currentUser) && (
                        this.props.currentUser.role === "Project Manager" ? (
                          <PMDashboardSideBar history={this.props.history} />
                        ) : (
                          <FreelancerDashboardSideBar history={this.props.history} />
                        )
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="pro-right-content-area">
                      <div className="">
                        <div className="empty-outline-box-for-project-manager-dashboard">
                          <div className="">
                            {/* <BreadCrumb  step3 link="Invoices"/> */}
                          </div>
                          <div className="transaction-history-filter-box">
                            <div className="row">
                              <div className="col-md-2">
                                <label>Start Date</label>
                                <DatePicker
                                  selected={start_date ? new Date(start_date) : ''}
                                  onChange={this.handleFromDateChange}
                                  name="start_date"
                                  placeholderText="Select Date"
                                  className="form-control mn_input"
                                />
                              </div>
                              <div className="col-md-2">
                                <label>End Date</label>
                                <DatePicker
                                  selected={end_date ? new Date(end_date) : ''}
                                  onChange={this.handleEndDateChange}
                                  placeholderText="Select Date"
                                  minDate={start_date ? addDay(new Date(start_date)) : ''}
                                  name="end_date"
                                  className="form-control mn_input"
                                />
                              </div>
                              <div className="col-md-3">
                                <label>Transaction Type</label>
                                <select className="form-control first_row_content transaction-type-drop-down" defaultValue={transaction_type} name="transaction_type" onChange={this.handleChange}>
                                  <option value="all">All Transactions</option>
                                  {['All Debits', 'All Credits', 'Hourly', 'Fixed Price', 'Bonus'].map((val) => {
                                    return <option key={val} value={val} >{val}</option>
                                  })}
                                </select>
                              </div>
                              <div className="col-md-3">
                                <label>Clients</label>
                                <select className="form-control first_row_content client-drop-down" defaultValue={client_name} name="client_name" onChange={this.handleChange}>
                                  <option value="all">All Clients</option>
                                </select>
                              </div>
                              <div className="col-md-2">
                                <label className="visibility-hidden">&nbsp;Search</label><br />
                                <button className="btn btn-primary first_row_content_btn mr-10" onClick={this.getTransactions}> GO </button>
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-12 transaction-content_body mb-15 box-shadow p-4">
                              {loadingTransactions && (
                                <div className="grid-loader">
                                  <Loader type="Grid" color="#00BFFF" height={100} width={100} />
                                </div>
                              )}
                              <div className="card">
                                <div className="projects__table-sec">
                                  <table className="table">
                                    <thead className="bg-light">
                                      <tr>
                                        <th>Created At</th>
                                        <th>Transaction Type </th>
                                        <th>Client Name</th>
                                        <th>Amount/Balance</th>
                                        <th>Payment Mode</th>
                                        <th>Reference Id</th>
                                      </tr>
                                    </thead>

                                    {!loadingTransactions &&
                                      (<tbody>
                                        {this.returnTransactions()}
                                      </tbody>)
                                    }
                                  </table>
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

      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = (dispatch) => {
  return {
    getInvites: () => dispatch(getInvitationsForFreelancer()),
    getOffers: () => dispatch(getOffersForFreelancer()),
    transHistory: (startDate, endDate, transactionType, clientName) => dispatch(transHistory(startDate, endDate, transactionType, clientName))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Transactions)
