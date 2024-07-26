import React, { Component } from "react";
import { getInvitedFreelancers } from '../../Actions/ProjectManagerFreelancerActions';
import { connect } from "react-redux";
import _ from 'lodash';
import { Link } from 'react-router-dom';
import ReadMoreAndLess from 'react-read-more-less';
import { addFavourite, removeFavourite } from '../../Actions/AdminActions';
import { getProfileForFreelancer } from "../../Actions/freelancerActions";
import certification_required from "../../static/images/certification-required.png";
import { isEmpty } from 'lodash';
import Pagination from "react-js-pagination";
import faceImg from '../../static/images/profile-placeholder.png';
import COUNTRIES from '../../constants/countryListWithCodes'
import ReactCountryFlag from "react-country-flag"
import Loader from "react-loader-spinner";
import Skills from "../Common/Skills"
import CEDetailPopup from "../miscellaneous/CEDetailPopup"
import NODataFoundImg from "./../../static/images/noDataFound.png"
// import inviteIcon from "../../static/images/invite.png";
import SuccessSweetAlert from "../CommonComponets/SweetAlert/SuccessSweetAlert";



const itemsCountPerPage = 5;


class InvitedFreelancers extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      activePage: 1,
      isLoading: false,
      openStatus: false,
      openModal: false,
      profileDetail: '',
      currentArrayKey: 0,
      Cedetail: ''
    }
  }

  componentDidMount() {
    // console.log("this.props.match.params.id",this.props)
    this.props.getInvitedFreelancers(this.props.job.id)
  }

  handleOPenModal = (row, i, e) => {
    e.preventDefault();
    this.setState({ openModal: true, currentArrayKey: i + 1 })
    this.props.getProfile(row.profile.uuid, "", true).then(
      (res) => {
        this.setState({ profileDetail: res, Cedetail: row })
      }
    )
  }

  closeModals = () => {
    this.setState({ profileDetail: "", openModal: false })
  }

  changeProfile = (id, type) => {
    let key = ''
    // console.log(this.state.currentArrayKey, '==',this.props.InvitedFreelancers.length)
    !isEmpty(this.props.InvitedFreelancers) && this.props.InvitedFreelancers.length > 0 && this.props.InvitedFreelancers.map((row, index) => {
      if (row.id === id) {
        if (type === 'next') {
          key = index + 1
        } else {
          key = index - 1
        }
        // console.log('key==',key)
        this.props.getProfile(this.props.InvitedFreelancers[key].profile.uuid, "", true).then(
          (res) => {
            this.setState({ profileDetail: res, currentArrayKey: key + 1 })
          }
        )
      }
      return row
    })
  }

  handlePageChange = (pageNumber) => {
    this.setState({ activePage: pageNumber })
    window.scrollTo(0, 0);
  }

  addFavourite = (id, event) => {
    event.currentTarget.firstElementChild.classList.remove("fa-heart-o")
    event.currentTarget.firstElementChild.classList.add("fa-heart")
    this.props.addFavourite(id)
      .then((res) => {
        if (res.status === 200) {
          this.setState({ isDeleted: true, msg: "favorited Successfully" })
          this.props.getInvitedFreelancers(this.props.job.id)
        }
      })
  }

  removeFavourite = (id, event) => {
    event.currentTarget.firstElementChild.classList.remove("fa-heart")
    event.currentTarget.firstElementChild.classList.add("fa-heart-o")
    this.props.removeFavourite(id)
      .then((res) => {
        if (res.status === 200) {
          this.setState({ isDeleted: true, msg: "Unfavorited Successfully" })
          this.props.getInvitedFreelancers(this.props.job.id)
        }
      })
  }
  hideAlert = () => {
    this.setState({ isDeleted: false, msg: "" })
  }

  render() {
    const { InvitedFreelancers, applicationIsLoading } = this.props;
    const { activePage } = this.state;
    let freelancers = JSON.parse(JSON.stringify((InvitedFreelancers))).splice(activePage === 1 ? 0 : ((activePage - 1) * itemsCountPerPage), itemsCountPerPage)

    return (
      <div className="tab-content">
        {
          this.state.isDeleted &&
          (
            // <div className="app-pro2-swal">
            //   <SweetAlert onConfirm={() => this.hideAlert()}>
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
        {applicationIsLoading ? (
          <div className="grid-loader my-feed-loader col-md-12">
            <Loader type="Grid" color="#00BFFF" height={100} width={100} />
          </div>
        )
          :

          <div role="tabpanel" className="tab-pane active tab-content-top-margin" id="SEARCH">
            <div className="">

              {(!_.isEmpty(freelancers)) ? freelancers.map((freelancer, idx) => {

                return <div key={freelancer.profile.uuid} className="col-md-12 list-view-strip-box" id={freelancer.profile.uuid}>
                  <div className="col-md-2 col-sm-2 col-xs-4 nopad tf_full_width">
                    {!freelancer.user_picture ? <div className="tf_image">
                      <img className="avatar_img_hired_freelancer" src={faceImg} alt="" />
                    </div> :
                      <div className="tf_image">
                        <img className="avatar_img_hired_freelancer" src={freelancer.user_picture} alt="" />
                      </div>}
                  </div>
                  <div className="col-md-10 col-sm-10 col-xs-12 nopad">

                    <div className="col-md-9 col-sm-10 col-xs-10">

                      <div className="tf_free_name col-md-10">
                        <div className="col-md-6">
                          <Link
                            onClick={this.handleOPenModal.bind(this, freelancer, idx)}
                          >
                            <h4 className="mt-0">{freelancer.full_name}  {freelancer.profile.is_certified &&
                              <img src={certification_required} title="Certification Required" alt="Certified" className="certification-required" />}</h4>
                          </Link>
                        </div>
                        <div className="col-md-6">
                          <div className="tf_f_content">
                            <h5>
                              {freelancer.profile && freelancer.profile.current_location_country &&
                                <ReactCountryFlag
                                  countryCode={
                                    COUNTRIES.find(c => c.label === freelancer.profile.current_location_country).value
                                  }
                                  svg
                                  style={{
                                    width: '2em',
                                    height: '1.2em',
                                    float: 'left',
                                    marginLeft: '-2px',
                                    marginRight: '20px'
                                  }}
                                  title={'country'}
                                />
                              }

                              {freelancer.profile && freelancer.profile.current_location_country}
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-1 col-sm-2 col-xs-2">
                        <div className="tf_free_fav">
                          {!freelancer.favorited_freelancer ? <Link title="Favorited" onClick={this.addFavourite.bind(this, freelancer.id)}><i className="fa fa-heart-o" aria-hidden="true"></i></Link> :
                            <Link title="Favorited" onClick={this.removeFavourite.bind(this, freelancer.id)}><i className="fa fa-heart mb-0" aria-hidden="true"></i></Link>}
                        </div>
                      </div>
                      <div className="tf_f_content col-md-12">
                        <h5><strong>{freelancer.profile && freelancer.profile.current_job_title}</strong></h5>
                      </div>
                      <div className="col-md-3 col-sm-6 col-xs-6 tf_full_width">
                        <div className="tf_f_content">
                          {freelancer.profile && freelancer.profile.hourly_rate ?
                            <h5>${isNaN(freelancer.profile.hourly_rate) ? '00' : parseFloat(freelancer.profile.hourly_rate).toFixed(2)} / hr</h5> : <h5>$0.00 / hr</h5>
                          }
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-6 col-xs-6 tf_full_width">
                        <div className="tf_f_content">
                          <h5>${freelancer.amount_earned}k earned</h5>
                        </div>
                      </div>
                      <div className="col-md-5 col-sm-6 col-xs-6 tf_full_width">
                        {/* <div className="tf_f_content">
                          <h5>
                            {freelancer.profile && freelancer.profile.current_location_country &&
                              <ReactCountryFlag
                                countryCode={
                                  COUNTRIES.find(c => c.label === freelancer.profile.current_location_country).value
                                }
                                svg
                                style={{
                                  width: '2em',
                                  height: '1.2em',
                                  float: 'left',
                                  marginLeft: '-2px',
                                  marginRight: '20px'
                                }}
                                title={'country'}
                              />
                            }

                            {freelancer.profile && freelancer.profile.current_location_country}
                          </h5>
                        </div> */}
                      </div>
                      <div className="col-md-12">
                        <div className="tf_fre_content">
                          {freelancer.profile ? freelancer.profile.about_me && <ReadMoreAndLess
                            ref={this.ReadMore}
                            className="read-more-content"
                            charLimit={200}
                            readMoreText="Read more"
                            readLessText="Read less"
                          >
                            {freelancer.profile.about_me}
                          </ReadMoreAndLess> : <p></p>}
                        </div>
                      </div>
                      <div className="col-md-12 nopad mb-10">
                        {freelancer.profile.skill.length > 0 &&
                          <Skills
                            skill={freelancer.profile.skill}
                            to={`/user-profile/${freelancer.profile && freelancer.profile.user && freelancer.profile.user.uuid}/true`}
                            id={freelancer.uuid}
                            displayCount={5}
                          />
                        }
                      </div>
                    </div>
                    <div className="col-md-3 col-sm-6 col-xs-6 tf_full_width mt-20">
                      {(!isEmpty(freelancer) && !isEmpty(freelancer.payment_method)) ?
                        <div className="tf_hire">
                          <Link to={`/hire-a-freelancer/${freelancer.uuid}/${this.props.jobUuid}`}>HIRE CLOUD EXPERT</Link>
                        </div> :
                        <div className="tf_hire">
                          <Link to={{ pathname: "/settings", state: "payMethodPresent" }}>HIRE CLOUD EXPERT</Link>
                        </div>
                      }
                    </div>
                  </div>
                </div>
              })
                : !applicationIsLoading &&
                <div className="noJobsFound">
                  <img src={NODataFoundImg} alt="" />
                  <p>No items to display. </p>
                </div>

              }

              {
                (
                  !_.isEmpty(freelancers) && freelancers.length > 0) ? (
                  <div className="">
                    <div className="col-md-12">
                      <Pagination
                        activePage={this.state.activeInviteFreelancerPage}
                        itemsCountPerPage={itemsCountPerPage}
                        totalItemsCount={InvitedFreelancers.length}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange.bind(this)}
                        prevPageText="Previous"
                        nextPageText="Next"
                      />
                    </div>
                  </div>

                ) : null
              }

            </div>
            <CEDetailPopup
              openModal={this.state.openModal}
              closeModals={this.closeModals}
              applicationIsLoading={this.props.applicationIsLoading}
              profileDetail={this.state.profileDetail}
              changeProfile={this.changeProfile}
              currentArrayKey={this.state.currentArrayKey}
              freelancer={this.state.Cedetail}
              inviteFreelancer={false}
              allFreelancersData={this.props.InvitedFreelancers}
              jobUuid={this.props.jobUuid}
            />
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = (dispatch) => {

  return {
    getInvitedFreelancers: (id) => dispatch(getInvitedFreelancers(id)),
    addFavourite: (id) => dispatch(addFavourite(id)),
    removeFavourite: (id) => dispatch(removeFavourite(id)),
    getProfile: (id, jobId, isPublic) => dispatch(getProfileForFreelancer(id, jobId, isPublic)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(InvitedFreelancers)
