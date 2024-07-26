import React, { Component } from "react";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import { adminClientListing, banFreelancer } from "../../Actions/AdminActions";
import loadMoreSrc from "../../static/images/loadMore.gif";
import ClientEditModal from "./PopupModals/clientEditModal";
import AdminBanAndDelModal from "./PopupModals/AdminBanandDeleteModal";
import CommonHeaderSidebar from "./AdminCommanComponents/AdminCommanHearderSideBar";
import NoDataFoundMessage from "../Common/NodataFoundMessage/NoDataFoundMessage";



class AdminClientListing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newSearchItem: '',
      isSearched: false,
      hideShowMore: false,
      activePage: 1,
      pageNumber: 1,
      clients: [],
      openModal: false,
      Client_details: '',
      banModal: false,
      freelancer_Ban_id: "",
      Action_Type: "",
    };
  }

  componentDidMount() {
    this.props.getClients(this.state.newSearchItem, this.state.activePage).then((res) => {
      // console.log("res",res)
      if (res.length < 10) {
        this.setState({
          hideShowMore: true,
        })
      }
      this.setState({
        clients: res
      })
    })
  }

  searchFreelancers = (e) => {
    e.preventDefault()
    // if(this.state.newSearchItem !== ""){
    this.props.getClients(e.target.value, this.state.activePage).then((res) => {
      if (res.length < 10) {
        this.setState({
          hideShowMore: true,
        })
      }
      this.setState({
        clients: res
      })
    })
    // }
    this.setState({ isSearched: true })
  }

  handleSearch = (e) => {
    this.setState({ newSearchItem: e.target.value })
    this.searchFreelancers(e)
  }

  handleShowMore = () => {
    let { clients } = this.state
    let newClients = clients
    this.setState({ pageNumber: this.state.pageNumber + 1 })
    this.props.getClients(this.state.newSearchItem, this.state.pageNumber + 1).then((res) => {
      if (res.length > 0) {
        newClients.push(...res)
        if (res.length < 10) {
          this.setState({
            hideShowMore: true,
            clients: newClients
          })
        }
        else {
          this.setState({
            clients: newClients
          })
        }
      } else {
        this.setState({
          hideShowMore: true
        })
      }
    })
  }

  handleOPenModal = (details, type) => {
    console.log(details, "----deefncvfhdbh------");
    if (type === 'edit') {
      this.setState({ openModal: true, Client_details: details })
    } else {
      this.setState({ banModal: true, freelancer_Ban_id: details.uuid, Action_Type: "suspend_user_Admin" })
    }
  }
  closeModals = () => {
    this.setState({ Client_details: "", openModal: false, banModal: false, freelancer_Ban_id: "" })
  }

  editProfile = (data) => {
    this.props.getClients(this.state.newSearchItem, this.state.activePage).then((res) => {
      // console.log("res",res)
      if (res.length < 10) {
        this.setState({
          hideShowMore: true,
        })
      }
      this.setState({
        clients: res
      })
    })

  }
  banFreelancer = (id, account_active) => {
    // console.log(this.state.freelancer_Ban_id, "----id---");
    this.props.banFreelancer(this.state.freelancer_Ban_id, account_active)
    this.setState({ banModal: false, freelancer_Ban_id: "" })
  }
  render() {
    const { isLoading } = this.props;
    const { clients, Client_details, banModal, Action_Type, freelancer_Ban_id } = this.state;
    // console.log("clients",clients)
    return (
      <CommonHeaderSidebar lable="Clients" >
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div>
            <div className="tf_application_main">
              <div className="col-md-12">

                <div className="tf_app_search">
                  <form>
                    <input type="" value={this.state.newSearchItem} name="" className="no-resize-bar form-control admin-search-box" placeholder="Search Client"
                      onChange={this.handleSearch} />

                  </form>
                </div>

              </div>
            </div>
          </div>
          {
            isLoading &&
            <div className="grid-loader my-feed-loader col-md-12">
              <Loader type="Grid" color="#00BFFF" height={100} width={100} />
            </div>
          }

          {
            !isLoading &&
            <div className="">
              <div className="" id="">

                <div className="row">
                  <div className="">
                    <div className="card bg-white mt-20 box-shadow">
                      <div className="card-body projects__table-sec p-4">
                        <div className="table-responsive">
                          <table className="table box-shadow bg-white">
                            <thead className="bg-light">
                              <tr>
                                {/* <th>ID</th>
                                        <th>Logo</th> */}
                                <th>Company name</th>
                                <th>Primary contact</th>
                                <th>Website</th>
                                <th>Total Projects</th>
                                <th>Status</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                clients.length > 0 ? clients.map((client, index) => {
                                  return <React.Fragment key={client.id}>

                                    <tr>
                                      <td>
                                        <p>
                                          {client.company && client.company.name ? client.company.name : "N/A"}
                                        </p>
                                      </td>
                                      <td>
                                        <p>
                                          {client.full_name}
                                        </p>
                                      </td>
                                      <td>
                                        <p>
                                          https://abcsoftware.de
                                        </p>
                                      </td>
                                      <td>
                                        <p>
                                          {client.project_manager_jobs.length}
                                        </p>
                                      </td>
                                      {/* Start TD */}

                                      <td>
                                        <p>
                                          {
                                            client.account_active === true ? "Active" : "Inactive"
                                          }
                                        </p>
                                        {/* <button className="enable-btn">Active</button> */}
                                      </td>
                                      <td>
                                        <i className="fa fa-edit action-grey-btn" onClick={() => this.handleOPenModal(client, 'edit')} ></i>
                                        <i className="fa fa-ban action-danger-btn" onClick={() => this.handleOPenModal(client, 'suspend_user')}></i>
                                      </td>
                                    </tr>

                                  </React.Fragment>
                                })
                                  :
                                  <tr >
                                    <td colSpan="6">
                                      {/* <p className="text-center">No items to display.</p> */}
                                      <NoDataFoundMessage 
                                      message={"No items to display."}
                                      />
                                    </td>
                                  </tr>


                              }

                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


                {
                  !this.state.hideShowMore && <button
                    className="load_more_btn_find_work mt-20 mb-15"
                    onClick={this.handleShowMore}
                  >
                    Show More
                  </button>
                }
                {
                  isLoading &&
                  <img src={loadMoreSrc} alt="" />
                }
              </div>
              <ClientEditModal
                openModal={this.state.openModal}
                closeModals={this.closeModals}
                applicationIsLoading={this.props.applicationIsLoading}
                Client_detail={Client_details}
                editProfile={this.editProfile}
              />
              <AdminBanAndDelModal
                isOpen={banModal}
                closeModal={this.closeModals}
                Action_Type={Action_Type}
                freelancer_Ban_id={freelancer_Ban_id}
                banFreelancer={this.banFreelancer}
              />
            </div>
          }
        </div>
      </CommonHeaderSidebar>

    )
  }
}

const mapStateToProps = state => {
  return {
    ...state,
    clients: state.adminClientListing,
    isLoading: state.applicationIsLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    banFreelancer: (id, account_active) => dispatch(banFreelancer(id, account_active)),
    getClients: (search, page) => dispatch(adminClientListing(search, page)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminClientListing)
