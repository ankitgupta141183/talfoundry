// @invites.js
// * This component contains the proposals which are archived by the Project Manager

import React, {Component} from "react";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import {isEmpty} from 'lodash';
import _ from "lodash";
import {Link} from 'react-router-dom';
import Pagination from "react-js-pagination";
import ReactCountryFlag from "react-country-flag"
import ReadMoreAndLess from 'react-read-more-less';
import Skills from "../Common/Skills"
import COUNTRIES from '../../constants/countryListWithCodes'
import {addFavourite, removeFavourite} from '../../Actions/AdminActions';
import certification_required from "../../static/images/certification-required.png";
import ProjectManagerHeader from "../miscellaneous/ProjectManagerHeader";
// import Footer from '../miscellaneous/Footer';
import {getManagerInvitation} from '../../Actions/projectManagerArchiveActions';
import faceImg from '../../static/images/profile-placeholder.png';
import PMDashboardSideBar from "./PMDashboardSideBar";
// import inviteIcon from "../../static/images/invite.png";
import NODataFoundImg from"./../../static/images/noDataFound.png"
import SuccessSweetAlert from "../CommonComponets/SweetAlert/SuccessSweetAlert";



class InvitationCE extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      isLoading: true,
      isActive: true,
      isArchived: false,
      activePage: 1,
      isDeleted: false
    }
  }

  componentDidMount() {
      this.props.getManagerInvitation("active")
  }


  handleDraftPageChange = (pageNumber) => {
    this.setState({ activePage: pageNumber })
  }

  addFavourite =(id, event) => {
    event.currentTarget.firstElementChild.classList.remove("fa-heart-o")
    event.currentTarget.firstElementChild.classList.add("fa-heart")
    this.props.addFavourite(id)
    .then((res) => {
      if(res.status === 200){
        this.setState({ isDeleted: true, msg: "favorited Successfully" })
        this.props.getManagerInvitation("active")
      }
    })
  }

  removeFavourite = (id, event) => {
    event.currentTarget.firstElementChild.classList.remove("fa-heart")
    event.currentTarget.firstElementChild.classList.add("fa-heart-o")
    this.props.removeFavourite(id)
    .then((res) => {
      if(res.status === 200){
        this.setState({ isDeleted: true, msg: "Unfavorited Successfully" })
        this.props.getManagerInvitation("active")
      }
    })
  }
  hideAlert = () => {
    this.setState({ isDeleted: false, msg: "" })
  }
  render() {
    const { activePage } = this.state;
    const {managerInvitation} = this.props;

    const itemsCountPerPage = 10;

    let invites = (!isEmpty(managerInvitation) && managerInvitation.length > 0 ) ?  managerInvitation : []
    let invitation = JSON.parse(JSON.stringify((invites))).splice( activePage === 1 ? 0 : ((activePage - 1)*itemsCountPerPage), itemsCountPerPage)

    return (
      <div>
        <ProjectManagerHeader history={this.props.history} />


        <div id="project-manager-proposal-page">
          <div className="d-flex">
            <div className="col-md-2 p-0">
              <PMDashboardSideBar history={this.props.history}/>
            </div>
            <div className="col-md-10 rightSidecontent">
              {
              this.state.isDeleted &&
                (
                  // <div className="app-pro2-swal">
                  //   <SweetAlert  onConfirm={() => this.hideAlert()}>
                  //     <div id="EditJobSuccessMessagePopupInnerContent">
                  //       <img src={inviteIcon} alt="" id="rightCheckIconImage" />
                  //       <h4>
                  //         {" "}
                  //         <strong>
                  //           {this.state.msg}.
                  //         </strong>
                  //       </h4>
                  //     </div>
                  //   </SweetAlert>
                  // </div>
                  <SuccessSweetAlert
                    handleConfirm={() => this.hideAlert()}
                    show={true}
                    message={this.state.msg}
                  />
                )
            }
              <div className="project-manager-all-page-equal-top-shifting px-4">
                <div className="empty-outline-box-for-project-manager-dashboard my-0">
                    <div className="col-md-12 px-0">
                      <div className="invite_freelancer tf_saved_jobs mt-20">
                          <div className="">
                              <div id="project-manager-archived-job-proposal">
                                  <div className="mt-0">
                                      <div className=" my-proposals-container mt-20 mb-30">
                                         <div className="col-md-12">
                                          <h3>
                                            Invitations ({invites.length})
                                          </h3>
                                        </div>
                                      </div>

                                    {
                                      !isEmpty(invitation) ? invitation.map((archive, idx) => {

                                        let invitation = archive.recipient
                                        // console.log(invitation)
                                        return (
                                        <div key={idx} className="pl-4 pr-4 tf_main_filter list-view-strip-box invitations-list-box">
                                          <div className="col-md-2 col-sm-2 col-xs-4 nopad tf_full_width">
                                            {!invitation.user_picture ?
                                             <div className="tf_image">
                                                <img className = "avatar_img_hired_invitation" src={faceImg} alt="" />
                                              </div> :
                                              <div className="tf_image">
                                                <img className = "avatar_img_hired_invitation" src={invitation.user_picture} alt="" />
                                              </div>}
                                            </div>
                                            <div className="col-md-10 col-sm-10 col-xs-12 nopad">
                                              <div className="col-md-9 col-sm-10 col-xs-10 pr-0">
                                                <div className="tf_free_name col-md-10">
                                                    <Link>
                                                  <h4 className="mt-0">{invitation.full_name}  {invitation.profile.is_certified && <img src={certification_required} title="Certification Required" alt="Certified" className="certification-required" />}</h4></Link>
                                                </div>
                                                <div className="col-md-1 col-sm-2 col-xs-2">
                                                  <div className="tf_free_fav">
                                                    {!invitation.favorited_invitation ? <Link title="Favorited"  onClick={this.addFavourite.bind(this, invitation.id)}><i className="fa fa-heart-o" aria-hidden="true"></i></Link> :
                                                    <Link title="Favorited"  onClick={this.removeFavourite.bind(this, invitation.id)}><i className="fa fa-heart mb-0" aria-hidden="true"></i></Link>}
                                                  </div>
                                                </div>
                                                <div className="col-md-6">
                                                  <h5 className="mt-0"><strong>{invitation.profile && invitation.profile.current_job_title}</strong></h5>
                                                </div>
                                                <div className="col-md-5 col-sm-6 col-xs-6 tf_full_width">
                                                  <div className="tf_f_content">
                                                    <h5>
                                                    {invitation.profile && invitation.profile.current_location_country &&
                                                      <ReactCountryFlag
                                                            countryCode = {
                                                               COUNTRIES.find(c => c.label === invitation.profile.current_location_country).value
                                                             }
                                                            svg
                                                            style={{
                                                              width: '2em',
                                                              height: '1.2em',
                                                              float: 'left',
                                                              marginLeft: '-2px',
                                                              marginRight: '20px'
                                                            }}
                                                            title= {'country'}
                                                            />
                                                    }

                                                    {invitation.profile && invitation.profile.current_location_country}
                                                    </h5>
                                                  </div>
                                              </div>
                                              <div className="col-md-12">
                                                <div className="">
                                                  {invitation.profile ? invitation.profile.about_me && <ReadMoreAndLess
                                                    ref={this.ReadMore}
                                                    className="read-more-content"
                                                    charLimit={200}
                                                    readMoreText="Read more"
                                                    readLessText="Read less"
                                                  >
                                                      {invitation.profile.about_me}
                                                  </ReadMoreAndLess> : <p></p>}
                                                </div>
                                              </div>
                                              <div className="col-md-12 nopad mb-10">
                                              {invitation.profile.skill.length > 0 &&
                                                <Skills
                                                  skill = {invitation.profile.skill}
                                                  to={`/user-profile/${invitation.profile && invitation.profile.user && invitation.profile.user.uuid}/true`}
                                                  id={invitation.uuid}
                                                  displayCount = {5}
                                                />
                                              }
                                              </div>
                                          </div>
                                          <div className="col-md-3 col-sm-6 col-xs-6 tf_full_width mt-30">
                                                <div className="tf_f_content">
                                                  {invitation.profile && invitation.profile.hourly_rate ?
                                                   <h5 className="text-center">${isNaN(invitation.profile.hourly_rate) ? '00' : parseFloat(invitation.profile.hourly_rate).toFixed(2)} / hr</h5>: <h5 className="text-center">$0.00 / hr</h5> }
                                                </div>
                                                {(!isEmpty(invitation) && !isEmpty(invitation.payment_method)) ?
                                                <div className="hire-cloud-expert-button-search-list">
                                                  <Link to={`/hire-a-freelancer/${invitation.uuid}/${this.props.jobUuid}`}>HIRE CLOUD EXPERT</Link>
                                                </div>:
                                                  <div className="hire-cloud-expert-button-search-list">
                                                    <Link to ={{pathname: "/settings" ,state: "payMethodPresent"}}>HIRE CLOUD EXPERT</Link>
                                                  </div>
                                                }
                                                <div className="tf_f_content">
                                                    <h5 className="text-center">$10k+ earned</h5>
                                                </div>
                                            </div>
                                          </div>
                                        </div>
                                        )
                                      }) : this.props.isLoading ? (
                                        <div className="grid-loader my-feed-loader col-md-12">
                                          <Loader type="Grid" color="#00BFFF" height={100} width={100} />
                                        </div>
                                      ) :
                                      <div className="noJobsFound">
                                        <img src={NODataFoundImg} alt=""/>
                                        <p>No Data Found </p>
                                      </div>
                                    }
                                    <div className="clearfix"></div>
                                    {(!_.isEmpty(managerInvitation) && managerInvitation.length > 0) ? (
                                                <div className="mt-20">
                                                  <Pagination
                                                    activePage={this.state.activePage}
                                                    itemsCountPerPage={itemsCountPerPage}
                                                    totalItemsCount={managerInvitation.length}
                                                    pageRangeDisplayed={4}
                                                    onChange={this.handleDraftPageChange.bind(this)}
                                                    prevPageText="Previous"
                                                    nextPageText="Next"
                                                  />
                                                </div>
                                                ) : null
                                              }
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
      )
    }
  }

  const mapStateToProps = state => {
    return {
      managerInvitation: state.managerInvitation,
      isLoading: state.applicationIsLoading,
      // currentUser: state.currentUser
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      getManagerInvitation: (type) => dispatch(getManagerInvitation(type)),
      addFavourite: (id) => dispatch(addFavourite(id)),
      removeFavourite: (id) => dispatch(removeFavourite(id)),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(InvitationCE)