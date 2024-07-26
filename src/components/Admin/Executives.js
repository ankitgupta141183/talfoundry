import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { usersListing, removeUser } from "../../Actions/AdminActions";
import { signUpAction } from "../../Actions/signUpActions";
import Modal from "react-modal";
import Loader from "react-loader-spinner";
import faceImg from '../../static/images/profile-placeholder.png';
import { isEmpty } from 'lodash';
// import inviteIcon from "../../static/images/invite.png";
import CommonHeaderSidebar from "./AdminCommanComponents/AdminCommanHearderSideBar";
import NoDataFoundMessage from "../Common/NodataFoundMessage/NoDataFoundMessage";
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
    padding: "0px",
  },
};

class Executives extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      fields: {
        firstName: "",
        lastName: "",
        email: "",
        role: ""
      },
      errors: {
        firstName: "",
        lastName: "",
        email: "",
        role: ""
      },
      openModal: false,
      clients: [],
      clientRemove: '',
      showSweetAlert: false,
      removeModal: false,
      updateAlert: null,
      role: 'Admin',
      // src: inviteIcon
    }
    this.handleRemoved = this.handleRemoved.bind(this)
    this.handleRemovedJobs = this.handleRemovedJobs.bind(this)
  }

  componentDidMount() {
    this.props.usersListing("Admin").then((clients) => {
      this.setState({ clients })
    })
    // this.setState({ src: inviteIcon })
  }

  handleOPenModal = () => {
    this.setState({ openModal: true })
  }

  closeModals = () => {
    this.setState({ openModal: false })
  }

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //Name
    if (!fields["firstName"]) {
      formIsValid = false;
      errors["firstName"] = "Cannot be empty";
    }

    if (typeof fields["firstName"] !== "undefined") {
      if (!fields["firstName"].match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        errors["firstName"] = "Enter First Name";
      }
    }

    //Name
    if (!fields["lastName"]) {
      formIsValid = false;
      errors["lastName"] = "Cannot be empty";
    }

    if (typeof fields["lastName"] !== "undefined") {
      if (!fields["lastName"].match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        errors["lastName"] = "Enter Last Name";
      }
    }

    //Email
    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "Cannot be empty";
    }

    if (typeof fields["email"] !== "undefined") {
      let lastAtPos = fields["email"].lastIndexOf('@');
      let lastDotPos = fields["email"].lastIndexOf('.');

      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
        formIsValid = false;
        errors["email"] = "Email is not valid";
      }
    }

    //Role
    if (!fields["role"]) {
      formIsValid = false;
      errors["role"] = "Select role";
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.handleValidation()) {
      let {
        firstName,
        lastName,
        email,
        role
      } = this.state.fields;

      // console.info('Valid Form')
      let formData = new FormData()
      formData.append("first_name", firstName)
      formData.append("last_name", lastName)
      formData.append("email", email)
      formData.append("role", role)
      formData.append("password", "Talfoundry@123")
      this.setState({ blockSignup: true })
      this.props
        .signUpAction(formData)
        .then((res) => {
          if (res.status === 201) {
            let fields = {};
            fields["firstName"] = "";
            fields["lastName"] = "";
            fields["email"] = "";
            fields["role"] = "";
            // this.setState({fields:fields});
            // alert("Form submitted");
            this.closeModal();
            const getAlert = () => (
              // <div className="app-pro2-swal">
              //   <SweetAlert title="" onConfirm={this.hideJobAlert.bind()} showConfirm={true}>
              //     <img src={this.state.src} alt="" />
              //     <h4>
              //       <strong>
              //         User has been added successfully.
              //       </strong>
              //     </h4>
              //   </SweetAlert>
              // </div>
              <SuccessSweetAlert 
              show={true}
              handleConfirm={this.hideJobAlert.bind()}
              message={"User has been added successfully."}
              />
            );

            this.setState({ updateAlert: getAlert(), fields: fields })

            this.props.usersListing(this.state.role).then((clients) => {
              this.setState({ clients })
            })
          } else if (res.response.status === 422) {
            alert(res.response.data.message[0])
          } else {
            alert("internal server error.")
          }
        })
        .catch((err) => {
          alert("internal server error")
        })
    } else {
      // alert("Form has errors.")
    }

  }

  handleChange(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields });
    this.handleValidation();
  }


  showAsection = (e) => {
    const { usersListing } = this.props;
    let role = "Admin"
    if (e.target.id === "hiring-managers") {
      role = "Project Manager"
    } else if (e.target.id === "coordinator") {
      role = "Coordinator"
    } else if (e.target.id === "support") {
      role = "Support"
    }
    this.setState({ role: role })
    usersListing(role).then((clients) => {
      this.setState({ clients })
    })
  }

  handleRemovedJobs(client, e) {
    e.preventDefault();
    this.setState({ removeModal: true, clientRemove: client })
  }

  closeModal = () => {
    this.setState({ removeModal: false })
  }

  handleRemoved() {
    // console.log("client",this.state.clientRemove)
    const client = this.state.clientRemove
    if (client.role !== "Admin") {

      this.props.removeUser(client.uuid).then((res) => {
        if (res.status === 200) {
          let clients = this.state.clients.filter(row => {
            if (row.id === client.id) {
              row.removed_at = true
            }
            return row
          })
          this.setState({ removeModal: false })

          const getAlert = () => (
            // <div className="app-pro2-swal">
            //   <SweetAlert title="" onConfirm={this.hideJobAlert.bind()} showConfirm={true}>
            //     <img src={this.state.src} alt="" />
            //     <h4>
            //       <strong>
            //         User has been deactivated successfully.
            //       </strong>
            //     </h4>
            //   </SweetAlert>
            // </div>
            <SuccessSweetAlert
            show={true}
            handleConfirm={this.hideJobAlert.bind()}
            message={"User has been deactivated successfully."}
            />
          );

          this.setState({ updateAlert: getAlert(), clients: clients })
        }
      })
    }
  }
  hideJobAlert = () => {
    this.setState({ updateAlert: null })
  }

  render() {
    const { isLoading } = this.props;
    const { clients, openModal } = this.state;
    return (
      // 
      <CommonHeaderSidebar lable="User / Exec" >
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="">
            <div className="row">
              <div className="col-md-12">
                <h2 className="page-section-heading-admin-side m-0"></h2>
              </div>
            </div>
            {this.state.updateAlert}

            <div className="">

              <div className="col-md-12">
                <div className="users-executive-tabs">
                  <div className="tf_signs">
                    <div className="col-md-10">
                      <ul className="nav tabcustom">
                        <li role="presentation" className="active"><a href="#Admin" onClick={this.showAsection} data-toggle="tab" id="admins">Admin</a></li>
                        <li role="presentation"><a href="#HIRING" data-toggle="tab" onClick={this.showAsection} id="hiring-managers">Hiring Managers</a></li>
                        <li role="presentation"><a href="#SUPPORT" data-toggle="tab" onClick={this.showAsection} id="support">Support</a></li>
                        <li role="presentation"><a href="#Coordinator" data-toggle="tab" onClick={this.showAsection} id="coordinator">Coordinator</a></li>
                      </ul>
                    </div>
                    <div className="col-md-2 col-sm-6 nopad">
                      <div className="tf_admin_user">
                        <Link onClick={(e) => { e.preventDefault(); this.handleOPenModal() }}>+ ADD USER </Link>
                      </div>
                      <Modal isOpen={openModal} style={customStyles}>
                        <div className="modal-dialog tf_model_di">
                          <div className="modal-content" id="add-user-popup-admin-side">
                            <div className="modal-body">
                              <form onSubmit={this.handleSubmit.bind(this)}>
                                <div className="tf_appl_ace" >
                                  <h4>Add User</h4>
                                  <div className="col-md-12">
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="firstName"
                                      id="firstName"
                                      placeholder="First Name"
                                      onChange={this.handleChange.bind(this, "firstName")}
                                      value={this.state.fields["firstName"]}
                                    />
                                    <span style={{ color: "red" }}>{this.state.errors["firstName"]}</span>
                                  </div>
                                  <div className="col-md-12">
                                    <input
                                      type="text"
                                      className="tf_form_control"
                                      name="lastName"
                                      id="lastName"
                                      placeholder="Last Name"
                                      onChange={this.handleChange.bind(this, "lastName")}
                                      value={this.state.fields["lastName"]}
                                    />
                                    <span style={{ color: "red" }}>{this.state.errors["lastName"]}</span>
                                  </div>
                                  <div className="col-md-12">
                                    <input
                                      type="email"
                                      className="tf_form_control"
                                      name="email"
                                      id="email"
                                      placeholder="Email"
                                      onChange={this.handleChange.bind(this, "email")}
                                      value={this.state.fields["email"]}
                                    />
                                    <span style={{ color: "red" }}>{this.state.errors["email"]}</span>
                                  </div>
                                  <div className="col-md-12">
                                    <select
                                      placeholder="Role"
                                      id="add-new-user-role-dropdown"
                                      className="tf_form_control"
                                      name="role"
                                      onChange={this.handleChange.bind(this, "role")}
                                      value={this.state.fields["role"]}
                                    >
                                      <option value="">Select Role</option>
                                      <option value="Coordinator">Coordinator</option>
                                      <option value="Support">Support</option>
                                      <option value="Admin">Admin</option>
                                    </select>
                                    <span style={{ color: "red" }}>{this.state.errors["role"]}</span>
                                  </div>
                                  <div className="col-md-12">
                                    <button className="btn btn-info" id="add-user-admin-side-popup-submit">Submit</button>
                                    <button type="button" className="btn btn-info close" id="add-user-admin-side-popup-cancel" data-dismiss="modal" aria-label="Close" onClick={this.closeModals}>Cancel</button>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </Modal>

                    </div>
                  </div>

                  <div className="clearfix"></div>
                  <div className="tab-content" id="user-management-tabs-content-in-user-admin-side">
                    <div className="tab-pane active" id="Admin">
                      {
                        isLoading ? <div className="grid-loader my-feed-loader col-md-12">
                          <Loader type="Grid" color="#00BFFF" height={100} width={100} />
                        </div> :
                          <div className="tabs-list-view-container">
                            <div className="">
                              <div className="projects__table-sec">
                                <div className="table-responsive">
                                  <table className="table">
                                    {/* <thead>
                                           {!isEmpty(clients) && 
                                          <tr>
                                            <th>kjgadkj</th>
                                          </tr>}
                                        </thead> */}
                                    <tbody>
                                      {!isEmpty(clients) ? clients.map((client) => {
                                        const createDate = new Date(client.created_at)
                                        return <React.Fragment key={client.id}>
                                          <tr>
                                            <td>
                                              <div className="">
                                                {client.image_url ?
                                                  <img src={client.image_url} className="user-profile-image-in-list-view" alt="img" /> :
                                                  <img className="user-profile-image-in-list-view" src={faceImg} alt="User" />
                                                }
                                              </div>
                                            </td>

                                            <td>
                                              <div className="">
                                                <p><Link to={`/admin-client-profile/${client.uuid}`}>{client.full_name}</Link></p>
                                              </div>
                                            </td>

                                            <td>
                                              <div className="">
                                                <p>Created on <strong>{`${createDate.toLocaleString('default', { month: 'short' })} ${createDate.getDate()}, ${createDate.getFullYear()}`}</strong></p>
                                              </div>
                                            </td>
                                          </tr>
                                        </React.Fragment>
                                      }) :
                                        <tr>
                                          <td colSpan='4'>
                                            {/* <p className="text-center p-3">No items to display.</p> */}
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
                      }
                    </div>
                    <div className="tab-pane" id="HIRING">
                      {
                        isLoading ? <div className="grid-loader my-feed-loader col-md-12">
                          <Loader type="Grid" color="#00BFFF" height={100} width={100} />
                        </div> :
                          <div className="tabs-list-view-container">
                            <div className="projects__table-sec">
                              <div className="table-responsive">
                                <table className="table">
                                  <tbody>
                                    {!isEmpty(clients) ? clients.map((client) => {
                                      const createDate = new Date(client.created_at)
                                      return <React.Fragment key={client.id}>
                                        <tr>
                                          <td>
                                            <div className="">
                                              {client.image_url ?
                                                <img src={client.image_url} className="img-circle user-profile-image-in-list-view" alt="img" /> :
                                                <img className="img-circle user-profile-image-in-list-view" src={faceImg} alt="User" />
                                              }
                                            </div>
                                          </td>
                                          <td>
                                            <div className="">
                                              <p><Link to={`/admin-client-profile/${client.uuid}`}>{client.full_name}</Link></p>
                                            </div>
                                          </td>
                                          <td>
                                            <p>Created on <strong>{`${createDate.toLocaleString('default', { month: 'short' })} ${createDate.getDate()}, ${createDate.getFullYear()}`}</strong></p>
                                          </td>
                                          <td>
                                            <div className="remove-action-button">
                                              <p className="m-0"><Link className={(client.removed_at) ? 'tf_invite_disabled' : ''} onClick={(client.removed_at) ? '' : this.handleRemovedJobs.bind(this, client)}>{(client.removed_at) ? "DEACTIVATED" : "DEACTIVATE"}</Link></p>
                                            </div>
                                          </td>
                                        </tr>
                                      </React.Fragment>
                                    }
                                    ) : <tr>
                                      <td colSpan='4'>
                                        <p className="text-center p-3">No items to display.</p>
                                      </td>
                                    </tr>}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                      }
                    </div>
                    <div className="tab-pane" id="Coordinator">
                      {
                        isLoading ? <div className="grid-loader my-feed-loader col-md-12">
                          <Loader type="Grid" color="#00BFFF" height={100} width={100} />
                        </div> :
                          <div className="tabs-list-view-container">
                            <div className="projects__table-sec">
                              <div className="table-responsive">
                                <table className="table">
                                  <tbody>
                                    {!isEmpty(clients) ? clients.map((client) => {
                                      const createDate = new Date(client.created_at)
                                      return <React.Fragment key={client.id}>
                                        <tr>
                                          <td>
                                            <div className="tf_img">
                                              {client.image_url ?
                                                <img src={client.image_url} className="img-circle user-profile-image-in-list-view" alt="img" /> :
                                                <img className="img-circle user-profile-image-in-list-view" src={faceImg} alt="User" />
                                              }
                                            </div>
                                          </td>

                                          <td>
                                            <div className="tf_user_cont_h5">
                                              <p><Link to={`/admin-client-profile/${client.uuid}`}>{client.full_name}</Link></p>
                                            </div>
                                          </td>

                                          <td>
                                            <p>Created on <strong>{`${createDate.toLocaleString('default', { month: 'short' })} ${createDate.getDate()}, ${createDate.getFullYear()}`}</strong></p>
                                          </td>

                                          <td>
                                            <div className="remove-action-button">
                                              <p><Link className={(client.removed_at) ? 'tf_invite_disabled' : ''} onClick={(client.removed_at) ? '' : this.handleRemovedJobs.bind(this, client)}>{(client.removed_at) ? "DEACTIVATED" : "DEACTIVATE"}</Link></p>
                                            </div>
                                          </td>
                                        </tr>
                                      </React.Fragment>
                                    }) : <tr>
                                      <td colSpan='4'>
                                        <p className="text-center p-3">No items to display.</p>
                                      </td>
                                    </tr>}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                      }
                    </div>
                    <div className="tab-pane" id="SUPPORT">
                      {
                        isLoading ? <div className="grid-loader my-feed-loader col-md-12">
                          <Loader type="Grid" color="#00BFFF" height={100} width={100} />
                        </div> :
                          <div className="tabs-list-view-container">
                            <div className="projects__table-sec">
                              <div className="table-responsive">
                                <table className="table">
                                  <tbody>
                                    {!isEmpty(clients) ? clients.map((client) => {
                                      const createDate = new Date(client.created_at)
                                      return <React.Fragment key={client.id}>
                                        <tr>
                                          <td>
                                            <div className="tf_img">
                                              {client.image_url ?
                                                <img src={client.image_url} className="img-circle user-profile-image-in-list-view" alt="img" /> :
                                                <img className="img-circle user-profile-image-in-list-view" src={faceImg} alt="User" />
                                              }
                                            </div>
                                          </td>
                                          <td>
                                            <div className="">
                                              <p><Link to={`/admin-client-profile/${client.uuid}`}>{client.full_name}</Link></p>
                                            </div>
                                          </td>
                                          <td>
                                            <p>Created on <strong>{`${createDate.toLocaleString('default', { month: 'short' })} ${createDate.getDate()}, ${createDate.getFullYear()}`}</strong></p>
                                          </td>
                                          <td>
                                            <div className="remove-action-button">
                                              <p><Link className={(client.removed_at) ? 'tf_invite_disabled' : ''} onClick={(client.removed_at) ? '' : this.handleRemovedJobs.bind(this, client)}>{(client.removed_at) ? "DEACTIVATED" : "DEACTIVATE"}</Link></p>
                                            </div>
                                          </td>
                                        </tr>
                                      </React.Fragment>
                                    }) : <tr>
                                      <td>
                                        <p className="text-center p-3">No items to display.</p>
                                      </td>
                                    </tr>}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>



          </div>
        </div>

        <Modal isOpen={this.state.removeModal} style={customStyles} onRequestClose={this.closeModal}>
          <div className="modal-dialog executives-deactivation-popup" id="remove-payment-method-popup">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" onClick={this.closeModal}>
                  <span aria-hidden="true">×</span>
                  <span className="sr-only">Close</span>
                </button>
                <h4 className="modal-title"> User Deactivation </h4>
              </div>
              <div className="modal-body">
                <p className="are-you-sure-message">
                  Are you sure you want to deactivate this user?
                </p>
                <div className="yes-no-button-container">
                  <button
                    onClick={() => this.handleRemoved()}
                    type="button"
                    className="btn btn-ban"
                  >
                    Yes
                  </button>
                  <button onClick={this.closeModal} type="button" className="btn btn-not-ban">
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </CommonHeaderSidebar>
    )
  }
}
const mapStateToProps = state => {
  return {
    ...state,
    clients: state.adminUsersListing,
    isLoading: state.applicationIsLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    usersListing: (role) => dispatch(usersListing(role)),
    removeUser: (uuid) => dispatch(removeUser(uuid)),
    signUpAction: (data) => dispatch(signUpAction(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Executives)
