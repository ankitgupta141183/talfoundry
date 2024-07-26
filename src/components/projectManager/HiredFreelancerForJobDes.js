// @HiredFreelancers.js
// * This component used as a container to display hired freelancers(freelancers who has accepted the offer.).

import React, {Component} from "react";
import {getFreelancersHired, getActiveHiredFreelancers ,getHireFreelancerForHiringmanager} from '../../Actions/ProjectManagerFreelancerActions';
import { connect } from "react-redux";
import { isEmpty } from 'lodash';
import { Link } from 'react-router-dom';
import ReadMoreAndLess from 'react-read-more-less';
import CertificateTitle from '../../static/images/green-certified.png';
import {addFavourite, removeFavourite} from '../../Actions/AdminActions';
import {createConversation } from '../../Actions/conversationActions';
import Pagination from "react-js-pagination";
import Modal from 'react-modal';
import faceImg from '../../static/images/profile-placeholder.png';
import _ from "lodash";
import Loader from "react-loader-spinner";
import certification_required from "../../static/images/certification-required.png";
import COUNTRIES from '../../constants/countryListWithCodes'
import ReactCountryFlag from "react-country-flag"
import NODataFoundImg from"./../../static/images/noDataFound.png"

const itemsCountPerPage = 5;

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    border                : 'none',
    background            : 'transparent',
    width                 : '700px',
  }
}


class HiredFreelancerForJobDes extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      isLoading: false,
      activePage: 1,
      openHire: false,
      rateType: "hourly",
      hireJobIdError: false,
      errors: {},
      hireJobId: "",
      freelancerToHire: {},
      openStatus: false
    }
  }
  componentDidMount() {
    //  this.props.getActiveHiredFreelancers(this.props.job.id)
     console.log('1111',this.props)
  }

  handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`)
    this.setState({activePage: pageNumber})
    window.scrollTo(0, 0);
  }

  createConverstaion = (id) => {
    const data = {
      title: '',
      sender_id: this.props.currentUser.user_id || this.props.currentUser.id,
      recipient_id: id
    }

    this.props.createConversation(data)
    .then((res) => {
      if(res.status === 200){
        this.props.history.push("/messages")
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  hireFreelancer = (freelancer) => {
    this.setState({ openHire: true, freelancerUuid: freelancer.id, freelancerToHire: freelancer})
  }

  handleHireClose = () => {
    this.setState({ openHire: false})
  }

  fieldError( message) {
    return (<p id = "firstName" className="error-field" >{message ? message : "This field can't be blank."}</p>)
  }


  handleRateType = (e) => {
    this.setState({rateType: e.target.value})
  }

  handleJobChange = (e) => {
    let { errors } = this.state
    if(e.target.value) {
      errors['hireJobId'] = ''
    }
    this.setState({errors: errors, hireJobId: e.target.value })
  }

  goToHiringPage =(e) => {
    if(this.state.hireJobId){
      this.props.history.push({ pathname: `/hire-a-freelancer/${this.state.freelancerUuid}/${this.state.hireJobId}`, state: {rateType: this.state.rateType}})
      this.setState({openHire: false})
    }else{
      this.setState({hireJobIdError: true})
    }
  }

  addFavourite =(id, event) => {
    event.currentTarget.firstElementChild.classList.remove("fa-heart-o")
    event.currentTarget.firstElementChild.classList.add("fa-heart")
    this.props.addFavourite(id)
    .then((res) => {
      if(res.status === 200){
        this.props.getHiredFreelancer()
      }
    })
  }

  removeFavourite = (id, event) => {
    event.currentTarget.firstElementChild.classList.remove("fa-heart")
    event.currentTarget.firstElementChild.classList.add("fa-heart-o")
    this.props.removeFavourite(id)
    .then((res) => {
      if(res.status === 200){
        this.props.getHiredFreelancer()
      }
    })
  }

  renderMoreLess = (freelancer) => {
    const { openStatus } = this.state;
    let skills = [];
    !isEmpty(freelancer) &&
      !isEmpty(freelancer.profile) &&
      !isEmpty(freelancer.profile.skill) &&
      freelancer.profile.skill.map((skill, idx) => {
        return skills.push(skill)
      })
    return (
      <div className="job-search-new-skills tf_skills more_button">
        {skills.slice(0, openStatus ? skills.length : 3).map((skill, idx) => {
          return skill.length < 23 ? (
            <h6
              style={{ cursor: "auto" }}
              className="search_freelancer_filters_skills_add_new_skills"
              title={skill}
              key={idx}
            >
              {skill}{" "}
            </h6>
          ) : (
            <h6
              style={{ cursor: "auto" }}
              className="search_freelancer_filters_skills_add_new_skills"
              title={skill}
              key={idx}
              data-toggle="tooltip"
              data-placement="top"
            >
              {`${skill.substring(0, 18)}...`}{" "}
            </h6>
          )
        })}
        {skills.length > 3 && (
          <a
            href={`/user-profile/${freelancer.profile_uuid}/${this.props.jobUuid}`}
          >{`${skills.length - 3} more`}</a>
        )}
      </div>
    )
  }

  render() {
    const {FreelancersToHire, HiredFreelancers,hireType, AllHiredFreelancers,fromDashboard} = this.props;
    const {isLoading, activePage, rateType, hireJobIdError, freelancerToHire} = this.state;
    const freelancersType = hireType === "contracts" ? AllHiredFreelancers :  hireType === "active" ? HiredFreelancers : FreelancersToHire;
    let freelancers = JSON.parse(JSON.stringify((freelancersType || []))).splice( activePage === 1 ? 0 : ((activePage - 1)*itemsCountPerPage), itemsCountPerPage)


    return (
      <div className="tab-pane active fade in in" id="tab_default_3">
        <div className="tf_main_filter tf_main_filter_hired_freelancer">
          {isLoading && <div className="grid-loader my-feed-loader col-md-12">
            <Loader type="Grid" color="#00BFFF" height={100} width={100} />
          </div>}
          {
            !isLoading && (!isEmpty(freelancers)) ? freelancers.map((freelancer) => {

              return <div key={freelancer.id} className="col-md-12">
              <div className="col-md-2 col-sm-2 col-xs-4 tf_full_width">
                <div className="tf_image">
                {freelancer.user_picture ?
                  <img src={freelancer.user_picture} className="avatar_img_hired_freelancer" alt="img"/>:
                  // <Avatar name={freelancer.full_name.split(' ')[0]} color="#FFB4B6" round="50px" size="80"/>
                  <img className="avatar_img_hired_freelancer" src={faceImg} alt="img"/>
                  }
                </div>
              </div>
              <div className="col-md-10 col-sm-10 col-xs-12 nopad">
                <div className="col-md-6 col-sm-12 col-xs-12">
                  <div className="tf_free_name">
                  <Link to={`/user-profile/${freelancer.profile_uuid}/${this.props.jobUuid}`}><h4>{freelancer.full_name}  {freelancer && freelancer.profile && freelancer.profile.is_certified && <img src={certification_required} alt="Certified" title="Certification Required" className="certification-required" /> }</h4></Link>
                  </div>
                  <div className="tf_f_content">
                    <h5><strong>{freelancer && freelancer.profile && freelancer.profile.current_job_title}</strong></h5>
                  </div>
                </div>

                <div className="col-md-1 col-sm-2 col-xs-2">
                  {fromDashboard ?
                    '' :
                    <div className="tf_free_fav heart-fill">
                    {!freelancer.favorited_freelancer ? <Link href="" onClick={this.addFavourite.bind(this, freelancer.id)}><i className="fa fa-heart-o" aria-hidden="true"></i></Link> :
                    <Link href="" onClick={this.removeFavourite.bind(this, freelancer.id)}><i className="fa fa-heart" aria-hidden="true"></i></Link>}
                  </div>
                   }

                </div>
                <div className="col-md-3 col-sm-6 col-xs-6 tf_full_width">
                  {hireType === "contracts" ?
                    fromDashboard ?
                    '' :
                    <div className="tf_invite">
                      <Link onClick={this.hireFreelancer.bind(this, freelancer)}>REHIRE</Link>
                    </div>
                   :
                  <div className="tf_invite">
                  <Link onClick={this.createConverstaion.bind(this, freelancer.id)}>MESSAGE</Link>
                </div>
                  }

                </div>
                <div className="clearfix"></div>


                <div className="col-md-3 col-sm-6 col-xs-6 tf_full_width">
                  <div className="tf_f_content">
                    {freelancer.profile && freelancer.profile.hourly_rate ?
                      <h5>${isNaN(freelancer.profile.hourly_rate) ? '00' : parseFloat(freelancer.profile.hourly_rate).toFixed(2)} / hr</h5>: <h5>$0.00 / hr</h5>
                    }
                  </div>
                </div>
                <div className="col-md-4 col-sm-6 col-xs-6 tf_full_width">
                  <div className="tf_f_content">
                    <h5>$10k+ earned</h5>
                  </div>
                </div>

                <div className="col-md-5 col-sm-6 col-xs-6 tf_full_width">
                  <div className="tf_f_content">
                    <h5>
                    {freelancer && freelancer.profile && <ReactCountryFlag
                                  countryCode = {
                                     COUNTRIES.find(c => c.label == freelancer.profile.current_location_country).value
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
                      {freelancer && freelancer.profile && freelancer.profile.current_location_country}</h5>
                  </div>
                </div>
              </div>


              <div className="clearfix"></div>
              <div className="col-md-12">
                <div className="tf_fre_content">
                  {freelancer.profile && freelancer.profile.about_me && <ReadMoreAndLess
                      ref={this.ReadMore}
                      className="read-more-content"
                      charLimit={350}
                      readMoreText="Read more"
                      readLessText="Read less"
                     >
                        {freelancer.profile.about_me}
                    </ReadMoreAndLess>
                   }
                </div>
              </div>
              <div className="clearfix"></div>
                <div className="col-md-12 nopad">
                  {this.renderMoreLess(freelancer)}
                </div>
                <div className="clearfix"></div>

              {/* <div className="searched-job-space">
              </div> */}
              <div className= "searched-job-space">
                <hr />
              </div>
            </div>
            }) :
             <div className="noJobsFound">
                <img src={NODataFoundImg} alt=""/>
                <p>No Cloud Experts Found </p>
              </div>

          }
         {!isEmpty(freelancerToHire) && <Modal isOpen={this.state.openHire} style={customStyles} onRequestClose={this.handleHireClose}>
                <div className="modal-dialog tf_z_index find-freelancer-popup" role="document">
                  <div className="modal-content tf_float">
                    <div className="modal-header">
                      <button type="button" className="close" onClick={this.handleHireClose} data-dismiss="modal"><span
                          aria-hidden="true">×</span><span className="sr-only">Close</span></button>
                      <h4 className="modal-title" id="myModalLabel">Hire {freelancerToHire.full_name}</h4>
                    </div>
                    <div className="modal-body" align="center">
                      <div className="col-md-12">
                        <div className="form-group">
                          <div className="input-group">
                            <label>Link this offer to an open job post</label>
                            <div className="selectedwrap">
                              <select className="form-control mn_input" onChange={this.handleJobChange}>
                                <option>Select Job.</option>
                                {
                                  ((isEmpty(freelancerToHire) && isEmpty(freelancerToHire.profile) && isEmpty(freelancerToHire.profile.available_jobs_for_contract)) ? [] : freelancerToHire.profile.available_jobs_for_contract).map((job, index) => {
                                  return <option key={index} value={job.uuid}>{job.title}</option>
                                  })
                                }
                              </select>
                               { hireJobIdError && this.fieldError("Please select a job.")}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="clearfix"></div>
                      <div className="clearfix"></div>
                      <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="form-group">
                          <label className="labeltext">Job Type</label><br/>

                          <div className="form-check-inline" onChange={this.handleRateType}>

                            <label className="customradio"><span className="radiotextsty">Hourly</span>
                              <input type="radio" checked={rateType === "hourly"} name="radio" value="hourly"/>
                              <span className="checkmark"></span>
                            </label>        
                            <label className="customradio"><span className="radiotextsty">Fixed - Price</span>
                              <input type="radio" value="fixed price" checked={rateType === "fixed price"} name="radio"/>
                              <span className="checkmark"></span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="clearfix"></div>
                    <div className="modal-footer tf_model_footer1">
                      <div className="col-md-12 nopad">
                        <div className="col-md-3 col-sm-4 col-xs-6">
                          <button onClick={this.goToHiringPage} type="button" className="btn btn-fill btn-cyan btn-wd">Continue</button>
                        </div>
                        <div className="col-md-3 col-sm-4 col-xs-6">
                          <button onClick={this.handleHireClose} type="button" className="btn btn-fill btn-elegant btn-wd"
                            data-dismiss="modal">Cancel</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
          </Modal>}
          <div className="clearfix"></div>
          {/* <hr/> */}
         {!isEmpty(freelancers) && freelancers.length > 0 &&  <div className="tf_pagenation dashboard-tabs-pagination">
              {/* <div className="col-lg-3 col-md-4 col-sm-4"></div> */}
              <div className="col-lg-7 col-md-8 col-sm-8 central_pagination_all_posting">
                {
                  (!isEmpty(freelancers) && freelancers.length > 0) ? (
                    <Pagination
                      activePage={this.state.activePage}
                      itemsCountPerPage={itemsCountPerPage}
                      totalItemsCount={freelancersType.length}
                      pageRangeDisplayed={5}
                      onChange={this.handlePageChange.bind(this)}
                      prevPageText="Previous"
                      nextPageText="Next"
                    />
                  ) : null
                }
              </div>
            </div>}
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
    createConversation: (data) => dispatch(createConversation(data)),
    getFreelancersHired: (id) => dispatch(getFreelancersHired(id)),
    getActiveHiredFreelancers: (id) => dispatch(getActiveHiredFreelancers(id)),
    getHiredFreelancer: () => dispatch(getHireFreelancerForHiringmanager()),
    addFavourite: (id) => dispatch(addFavourite(id)),
    removeFavourite: (id) => dispatch(removeFavourite(id)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HiredFreelancerForJobDes)
