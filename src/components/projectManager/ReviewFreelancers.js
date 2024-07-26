import React, { Component } from "react";
import { getFreelancersToReview } from "../../Actions/ProjectManagerFreelancerActions";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import { Link } from "react-router-dom";
import ReadMoreAndLess from "react-read-more-less";
import { createConversation } from "../../Actions/conversationActions";
import faceImg from "../../static/images/profile-placeholder.png";
import Pagination from "react-js-pagination";
import certification_required from "../../static/images/certification-required.png";
import Modal from "react-modal";
import Loader from "react-loader-spinner";
import COUNTRIES from '../../constants/countryListWithCodes'
import ReactCountryFlag from "react-country-flag"
import Skills from "../Common/Skills"
import NODataFoundImg from"./../../static/images/noDataFound.png"


const itemsCountPerPage = 5;

const customStylesNew = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0px",
  },
}

class ReviewFreelancers extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      isLoading: false,
      activePage: 1,
      modalIsOpen: false
    }

    this.openModal = this.openModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }
  componentDidMount() {
    this.props.getFreelancersToReview(this.props.job.id)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isLoading: nextProps && nextProps.applicationIsLoading })
  }
  handlePageChange = (pageNumber) => {
    this.setState({ activePage: pageNumber })
    window.scrollTo(0, 0);
  }

  createConverstaion = (id) => {
    const data = {
      title: "",
      sender_id: this.props.currentUser.user_id || this.props.currentUser.id,
      recipient_id: id,
    }

    this.props
      .createConversation(data)
      .then((res) => {
        if (res.status === 200) {
          this.props.history.push("/messages")
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  openModal() {
    this.setState({ modalIsOpen: true })
  }

  afterOpenModal() {
    this.subtitle.style.color = "#000";
  }

  closeModal() {
    this.setState({ modalIsOpen: false })
  }


  render() {
    const { FreelancersToReview } = this.props;
    const { isLoading, activePage } = this.state;
    let freelancers = JSON.parse(JSON.stringify(FreelancersToReview)).splice(
      activePage === 1 ? 0 : (activePage - 1) * itemsCountPerPage,
      itemsCountPerPage
    )
    return (
      <div className="tab-pane active fade in in" id="tab_default_3">
        <div className="" id="review-proposal-tabs-content-start">
          {isLoading && (
            <div className="grid-loader my-feed-loader col-md-12">
              <Loader type="Grid" color="#00BFFF" height={100} width={100} />
            </div>
          )}
          {!isEmpty(freelancers) && !isLoading ? (
            freelancers.map((freelancer) => {
              return (
                <div key={freelancer.id} className="col-md-12 freelancer-element-review list-view-strip-box">
                  <div className="col-md-2 col-sm-2 col-xs-4 tf_full_width">
                    <div className="tf_image">
                      {
                        freelancer.user.user_picture ? (
                          <img
                            className="avatar_img_hired_freelancer"
                            src={freelancer.user.user_picture}
                            alt="img"
                          />
                        ) : (
                          <img className="avatar_img_hired_freelancer" src={faceImg} alt="img" />
                        )
                        // <Avatar name={freelancer.user.full_name.split(' ')[0]} color="#FFB4B6" round="50px" size="80"/>
                      }
                    </div>
                  </div>
                  <div className="col-md-10 col-sm-10 col-xs-12 nopad">
                  <div className="col-md-12 col-sm-12 col-xs-12"> 
                    <div className="col-md-4 col-sm-6 col-xs-6">
                      <div className="tf_free_name">
                        <Link to={`/user-profile/${freelancer.user.profile_uuid}`}>
                          <h4>
                            {freelancer.user.full_name}
                            {freelancer.user.profile && freelancer.user.profile.is_certified && (
                              <img title="Certification Required" src={certification_required} alt="Certified" className="certification-required" />
                            )}
                          </h4>
                        </Link>
                      </div> 
                    </div >
                    <div className="col-md-8 col-sm-6 col-xs-6">
                      <div className="" style={{paddingTop :"15px"}}>
                        <h5 className="">
                          {
                             freelancer
                             &&
                             freelancer.user
                             &&
                             freelancer.user.profile
                             &&
                             freelancer.user.profile.current_location_country
                             && <ReactCountryFlag
                                  countryCode = {
                                     COUNTRIES.find(c => c.label === freelancer.user.profile.current_location_country).value
                                   }
                                  svg
                                  style={{
                                    width: '2em',
                                    height: '1em',
                                    float: 'left',
                                    marginLeft: '-2px',
                                    marginRight: '20px'
                                  }}
                                  title= {'country'}
                                  />
                                }
                          {freelancer.user.profile &&
                            freelancer.user.profile.current_location_country}
                        </h5>
                      </div>
                  </div>
                  </div>
                    <div className="col-md-9 col-sm-12 col-xs-12">
                      <div className="tf_f_content">
                          <h5>
                            <strong>
                              {freelancer.user.profile && freelancer.user.profile.current_job_title}
                            </strong>
                          </h5>
                        </div>
                    </div>

                    {/* <div className="col-md-3 col-sm-6 col-xs-6 tf_full_width">
                      <div className="tf_f_content">
                        <h5 className="mb-0">
                          {
                             freelancer
                             &&
                             freelancer.user
                             &&
                             freelancer.user.profile
                             &&
                             freelancer.user.profile.current_location_country
                             && <ReactCountryFlag
                                  countryCode = {
                                     COUNTRIES.find(c => c.label === freelancer.user.profile.current_location_country).value
                                   }
                                  svg
                                  style={{
                                    width: '2em',
                                    height: '1em',
                                    float: 'left',
                                    marginLeft: '-2px',
                                    marginRight: '20px'
                                  }}
                                  title= {'country'}
                                  />
                                }
                          {freelancer.user.profile &&
                            freelancer.user.profile.current_location_country}
                        </h5>
                      </div>
                  </div> */}
                  <div className="col-md-3 col-sm-6 col-xs-6 tf_full_width">
                      <div className="tf_f_content" id="view-Proposal-tags-on-card">
                        <Link to={`/freelancer-proposal/${freelancer.uuid}/${this.props.jobUuid}`} className="view-Proposal-link-on-card-list">
                            View Proposal
                        </Link>
                      </div>
                  </div>
                  <div className="col-md-12">
                    <div className="tf_fre_content mt-0">
                      {freelancer.user.profile ? (
                        freelancer.user.profile.about_me && (
                          <ReadMoreAndLess
                            ref={this.ReadMore}
                            className="read-more-content"
                            charLimit={200}
                            readMoreText="Read more"
                            readLessText="Read less"
                          >
                            {freelancer.user.profile.about_me}
                          </ReadMoreAndLess>
                        )
                      ) : (
                        <p></p>
                      )}
                    </div>
                  </div>

                  <div className="col-md-12 nopad mb-10">
                    {freelancer.user.profile.skill.length > 0 &&
                      <Skills
                        skill = {freelancer.user.profile.skill}
                        to={`/user-profile/${freelancer.user && freelancer.user.profile && freelancer.user.profile.uuid}/true`}
                        id = {freelancer.user && freelancer.user.profile && freelancer.user.profile.uuid}
                        displayCount = {5}
                      />
                    }
                  </div>
                </div>
                <div className="col-md-3 col-sm-6 col-xs-6 tf_full_width text-center card-right-side">

                      <div className="tf_f_content mt-20 mb-10">
                        <h5 className="text-center">${freelancer.amount_earned}k earned</h5>
                      </div>
                      {!isEmpty(freelancer) &&
                      !isEmpty(freelancer.user) &&
                      !isEmpty(freelancer.user.payment_method) ? (
                        <div className="tf_hire">
                          <Link
                            className={freelancer.contract_id ? 'tf_invite_disabled': ''}
                            to={freelancer.contract_id ? '#': `/hire-a-freelancer/${freelancer.user.uuid}/${this.props.jobUuid}`}
                          >
                            HIRE CLOUD EXPERT
                          </Link>
                        </div>
                      ) : (
                        <div className="tf_hire">
                          <Link to={{ pathname: "/settings", state: "payMethodPresent" }}>
                            HIRE CLOUD EXPERT
                          </Link>
                        </div>
                      )}

                      <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        style={customStylesNew}
                        contentLabel="Example Modal"
                      >
                        <div className="add-payment-method-popup">
                          <div className="modal-header">
                            <button
                              type="button"
                              className="close"
                              onClick={this.closeModal}
                              data-dismiss="modal"
                            >
                              <span aria-hidden="true">×</span>
                              <span className="sr-only">Close</span>
                            </button>

                            <h2
                              className="modal-title"
                              ref={(subtitle) => (this.subtitle = subtitle)}
                            >
                              Payment Method
                            </h2>
                          </div>

                          <div className="modal-body">
                            <div className="row">
                              <div className="col-md-12">
                                <p>
                                  You have not added any payment method. Please add one by{" "}
                                  <a href="/settings">Clicking Here </a>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Modal>
                      {/* <div className="tf_hire">
                      <Link to={`/hire-a-freelancer/${freelancer.user.uuid}/${this.props.jobUuid}`}>HIRE CLOUD EXPERT</Link>
                      </div> */}
                      <div className="tf_invite">
                        <Link onClick={this.createConverstaion.bind(this, freelancer.user.id)}>
                          MESSAGE
                        </Link>
                      </div>
                      <div className="tf_f_content text-center">
                        {/* <h5><strong>${freelancer.user.profile.hourly_rate} / hr</strong></h5> */}
                        {freelancer.profile && freelancer.profile.hourly_rate ? (
                         <h5 className="text-center">
                            $
                            {isNaN(freelancer.profile.hourly_rate)
                              ? "00"
                              : parseFloat(freelancer.profile.hourly_rate).toFixed(2)}{" "}
                            / hr
                          </h5>
                        ) : (
                          <h5 className="text-center">$0.00 / hr</h5>
                        )}
                      </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="noJobsFound" id="no-data-found-message">
              <img src={NODataFoundImg} alt=""/>
              <p>No Data Found. </p>
            </div>
          )}
          <div className="clearfix"></div>

              {!isEmpty(freelancers) && freelancers.length > 0 ? (

              <div className="">
                <div className="col-md-12">
                    <Pagination
                      activePage={this.state.activeInviteFreelancerPage}
                      itemsCountPerPage={itemsCountPerPage}
                      totalItemsCount={FreelancersToReview.length}
                      pageRangeDisplayed={5}
                      onChange={this.handlePageChange.bind(this)}
                      prevPageText="Previous"
                      nextPageText="Next"
                    />
                </div>
              </div>


              ) : null}

        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  ...state,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getFreelancersToReview: (id) => dispatch(getFreelancersToReview(id)),
    createConversation: (data) => dispatch(createConversation(data)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ReviewFreelancers)
