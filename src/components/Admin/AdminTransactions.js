import React, { Component } from "react";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import Modal from 'react-modal';
import Loader from "react-loader-spinner";
import { adminTransHistory } from '../../Actions/AdminActions';
import faceImg from '../../static/images/profile-placeholder.png';
import { Link } from "react-router-dom";
import CommonHeaderSidebar from "./AdminCommanComponents/AdminCommanHearderSideBar";

const customStyles = {
  content: {
    top: '40%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    width: '33%',
    padding: '0px'
  }
}


class AdminTransactions extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      isActive: true,
      isArchived: false,
      transDate: new Date(),
      start_date: '',
      end_date: '',
      transaction_type: 'all',
      client_name: '',
      showModal: false,
      transactions: [],
      loadingTransactions: false,
      AllTransaction : [],

    }
  }

  componentDidMount() {
    this.setState({ loadingTransactions: true })
    this.getTransactions("")
  }

  getTransactions = () => {
    const { start_date, end_date, transaction_type, client_name} = this.state;
    this.props.adminTransHistory(start_date ? start_date.toLocaleDateString(['ban', 'id']) : '', end_date ? end_date.toLocaleDateString(['ban', 'id']) : '', transaction_type, client_name , "" ).then((res) => {
      this.setState({
        transactions: res,
        AllTransaction:res,
        loadingTransactions: false
      })
    })
  }

  handleChange = (event) => {
    event.preventDefault();
    console.log(event.target.value, "event.target.value");  
    let timer = null
    const client_name = event.target.value
    clearTimeout(timer)
    const newTimer = setTimeout(() => {
        if (client_name.length > 0) {
            // filterSkill(skill.toLocaleLowerCase())
            const filterTechByUser = this.state.AllTransaction.filter((value) => value.client_name.toLocaleLowerCase().includes(client_name.toLocaleLowerCase()) )
            console.log(filterTechByUser , "filterTechByUser");
            this.setState({transactions: filterTechByUser })
        } else {
          this.setState({transactions: this.state.AllTransaction })
        }
    }, 500)

    // setTimer(newTimer)
    timer = newTimer
    // this.setState({ [event.target.name]: event.target.value })
  }

  showASection = (event ,  type ,  activeTab) => {
    this.setState({
      isActive: event.target.id === "active" ? true : false,
      isArchived: event.target.id === "archive" ? true : false,
    })
    if(type === "transactionType"){
      this.props.adminTransHistory('',  '', activeTab , "" , "").then((res) => {
        this.setState({
          transactions: res,
          AllTransaction:res,
        })
      })
    }else{
      this.props.adminTransHistory('',  '', "" , "" , activeTab).then((res) => {
        this.setState({
          transactions: res,
          AllTransaction:res,
        })
      })
    }
  }

  handleFromDateChange = (date) => {
    console.log(date, "date");
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
        data.push(<tr>
          <td>
            {trans.reference_id}
          </td>
          <td>
            <span id="cloud-expert-profile-image">
              <img src={faceImg} alt="faceImg" />
            </span>
            {/* <Link> */}
            {trans.client_name}
            {/* </Link> */}
          </td>
          <td>
            <p className="m-0">Withdraw Funds</p>
            <p className="text-muted m-0">{new Date(trans.created_at).toDateString()}</p>
          </td>
          <td>
            <p className="text-muted">{trans.payment_mode}</p>
          </td>
          <td>
            <p className="text-red m-0">{trans.amount} USD</p>
            <p className="text-muted m-0">Balance : {trans.balance}</p>
          </td>
          <td>
            <p className="text-green">{trans.status ? trans.status  : "Pending" }</p>
          </td>
          <td className="">
            <div className="dropdown table-dropdown">
              <Link className="dropdown-toggle" data-toggle="dropdown">
                <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link><i class="fa fa-file-text-o" aria-hidden="true"></i> View Details</Link>
                </li>
                <li>
                  <Link><i class="fa fa-user" aria-hidden="true"></i> User Profile</Link>
                </li>
                <li>
                  <Link><i class="fa fa-check-circle" aria-hidden="true"></i> Approve</Link>
                </li>
                <li>
                  <Link><i className="fa fa-user-times"></i> Reject</Link>
                </li>
              </ul>
            </div>
          </td>
        </tr>)
        return trans
      })
    }
    else {
      data = <tr className="mb-15 mt-20 no-data-to-show-center-align">
        <td colSpan="12" className="text-center">No Data</td>
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
        <td width="50%" className="popup-right-column"><a>{currentTransData.reference_id}</a></td>
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
      client_name, start_date, end_date, loadingTransactions, transactions } = this.state;

    const addDay = (date) => {
      date.setDate(date.getDate() + 1);
      return date
    }

 

    // const Client_names_options = transactions.map((trans, index, array) => {
    //   let unique_client = ""
    //   if ((array.map(value => value.client_name).indexOf(trans.client_name) === index)) {
    //     unique_client = trans
    //   }
    //   return unique_client && unique_client
    // }).filter(value => value !== "")
    //  .filter((name , index , array) =>  )
    return (
      // 
      <CommonHeaderSidebar lable="Transaction" >
        {loadingTransactions && (
          <div className="grid-loader">
            <Loader type="Grid" color="#00BFFF" height={100} width={100} />
          </div>
        )}
        {!loadingTransactions && <React.Fragment>
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="admin-transaction-content">
              <div className="transaction-listing">
                <div className="row">
                  <div class="col-md-12 p-0 mb-4">
                    <ul className="nav tabcustom">
                      <li className="active">
                        <a
                          href="#NEW"
                          id="new"
                          onClick={(e) => this.showASection(e , "transactionType" , "all")}
                          data-toggle="tab"
                        >
                          All Transaction
                        </a>
                      </li>
                      <li>
                        <a
                          href="#NEW"
                          id="new"
                          onClick={(e) => this.showASection(e, "transactionType" , "Offer creation")}
                          data-toggle="tab"
                        >
                          Deposit
                        </a>
                      </li>
                      <li>
                        <a
                          href="#NEW"
                          id="new"
                          onClick={(e) => this.showASection(e ,"transactionType" , "Payment approval")}
                          data-toggle="tab"
                        >
                          Withdraw
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="row">
                  <div className="tf_app_search bg-white box-shadow p-3" id="searchbox-approved-unapproved-cloud-expert">
                    <div className="col-md-12 p-3 bg-light d-flex ">
                      <form className="col-md-12">
                        <input type=""  name="client_name"  className="col 12 form-control" placeholder="Search transactions by user name"
                          onChange={this.handleChange}
                          />

                        <div  style={{position: "relative" , float:"right" , margin :"-40px 16px 0 0", fontSize:"20px"}} >
                          <i className="fa fa-search " />
                        </div>
                      </form>
                    </div>

                    {/* Start Filter Box Row */}
                    {/* <div className="row">
                      <div className="col-md-12 collapse multi-collapse p-3" id="horizontal-filters">
                        <div className="find-filter-navigation ">
                          <div className="panel-group sidebar_all_filters " id="accordion">

                            <div className="col-md-3 start-date-date-packer">
                              <label>Start Date</label><br />
                              <DatePicker
                                selected={start_date ? new Date(start_date) : ''}
                                onChange={this.handleFromDateChange}
                                name="start_date"
                                placeholderText="Select Date"
                                className="form-control mn_input"
                                maxDate={new Date()}
                              />
                            </div>
                            <div className="col-md-3 end-date-date-packer">
                              <label>End Date</label><br />
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
                              <label>Transaction Type</label><br />
                              <select className="form-control first_row_content transaction-type-drop-down" defaultValue={transaction_type} name="transaction_type" onChange={this.handleChange}>

                                {TransactionOptions.map((item) => {
                                  return <option key={item.value} value={item.value} >{item.TransactionType}</option>
                                })}
                              </select>
                            </div>
                            <div className="col-md-2">
                              <label>Clients</label><br />
                              <select className="form-control first_row_content clients-drop-down" defaultValue={client_name} name="client_name" onChange={this.handleChange}>
                                <option value="all">All Client</option>
                                {
                                  Client_names_options.map((client_name) => {
                                    return <option value={client_name.manager_id} key={client_name.id}>{client_name.client_name}</option>
                                  })
                                }
                              </select>
                            </div>
                            <div className="col-md-1">
                              <label className="visibility-hidden">&nbsp;Search</label><br />
                              <button className="btn btn-primary first_row_content_btn mr-10" onClick={this.getTransactions}> Go </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                    {/* End Filter Box Row */}
                  </div>
                </div>
                <div className="">
                  <div className="row">
                    <div className="transaction-content_body">
                      <div className="card bg-white box-shadow">
                        <div className="card-body projects__table-sec p-4">
                          <div className="">
                            <table className="table">
                              <thead className="bg-light">
                                <tr>
                                  <th>Order</th>
                                  <th>User</th>
                                  <th>Details</th>
                                  <th>Tnx By</th>
                                  <th>Amount</th>
                                  <th>Status</th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                {this.returnTransactions()}
                              </tbody>
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
        </React.Fragment>
        }
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
      </CommonHeaderSidebar >

    )
  }
}

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = (dispatch) => {
  return {
    adminTransHistory: (startDate, endDate, transactionType, clientName , activeTab) => dispatch(adminTransHistory(startDate, endDate, transactionType, clientName , activeTab))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminTransactions)
