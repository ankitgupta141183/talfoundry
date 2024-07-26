import React, {Component} from "react";
import _ from "lodash";
import { isEmpty } from "lodash";
import Modal from "react-modal";
import Loader from "react-loader-spinner";
import Skills from '../Common/Skills'

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
  },
}



export default class CEDetailPopup extends Component {
  constructor(props, context) {
    super(props, context)
    this.props = {}
  }

  changeProfile = (id, type) => {
      let key = ''
      console.log(this.state.currentArrayKey, '==',this.props.FreelancersToInvite.length)
      !isEmpty(this.props.FreelancersToInvite) && this.props.FreelancersToInvite.length > 0 &&  this.props.FreelancersToInvite.map((row, index)=>{
          if(row.id === id){
            if(type === 'next'){
              key = index + 1
            }else{
              key = index - 1
            }
            // console.log('key==',key)
            this.props.getProfile(this.props.FreelancersToInvite[key].profile.uuid, "", true).then(
              (res) => {
                 this.setState({profileDetail : res, currentArrayKey: key+1 })
              }
            )
          }
          return row
      })
    }

  render() {
    const getFormattedDate = (inputDate) => {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const date = new Date(inputDate);
      return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    }
    console.log('this.props.freelancer',this.props.jobUuid)
    return (
      <Modal isOpen={this.props.openModal} style={customStyles} onRequestClose={this.props.closeModals}>
        <div className="modal-dialog project-manager-dashboard-grid-project-popup">
        {this.props.applicationIsLoading &&
            (
              <div className="grid-loader my-feed-loader col-md-12">
                <Loader
                  type="Grid"
                  color="#00BFFF"
                  height={100}
                  width={100}
                />
              </div>
            )
          }
          {!this.props.applicationIsLoading && !isEmpty(this.props.profileDetail)  &&
            <div className="modal-content">
              <div className="modal-header">

                  <div className="row">
                    <div className="col-md-11">
                      <h3 className="job-title-in-popup">{this.props.profileDetail.name}</h3>
                    </div>

                    <div className="col-md-1">
                      <button type="button" className="close" onClick={this.props.closeModals}>
                        <span aria-hidden="true">×</span>
                        <span className="sr-only">Close</span>
                      </button>
                    </div>
                  </div>
              </div>

                <div className="clearfix"></div>


              <div className="modal-body">

                <div className="col-md-6">
                    <p className="developer-and-job-expiration-date-in-popup"><strong>Professional Title:</strong> <span className={"job-preference-custom-tags-"+this.props.profileDetail.current_job_title}>{this.props.profileDetail.visibility}</span></p>
                </div>

                <div className="col-md-6">
                    <p className="developer-and-job-expiration-date-in-popup"><strong>Location:</strong> {this.props.profileDetail.current_location_city},  {this.props.profileDetail.current_location_country}</p>
                </div>

                <div className="col-md-12">
                  <hr className="popup-hr-divider-for-grid" />
                </div>

                <div className="col-md-6">
                    <p className="developer-and-job-expiration-date-in-popup"><strong>Visibility:</strong> <span className={"job-preference-custom-tags-"+this.props.profileDetail.visibility.toLowerCase()}>{this.props.profileDetail.visibility}</span></p>
                </div>

                <div className="col-md-6">
                    <p className="developer-and-job-expiration-date-in-popup"><strong>Profile Type:</strong> {this.props.profileDetail.profile_type}</p>
                </div>

                <div className="clearfix"></div>

                <div className="col-md-12">
                  <hr className="popup-hr-divider-for-grid" />
                </div>

                <div className="col-md-12">
                  <h5 className="job-description-in-popup"><strong>About Me:</strong> {`${this.props.profileDetail.about_me.substring(0, 300)}...`}</h5>
                </div>

                <div className="clearfix"></div>

                <div className="col-md-12">
                  <hr className="popup-hr-divider-for-grid" />
                </div>

                <div className="clearfix"></div>

                <div className="col-md-2">
                  <h5 className="job-category-in-popup"><strong>Platform: </strong>
                  </h5>
                </div>

                <div className="col-md-10 nopad">
                  {!this.props.applicationIsLoading && (this.props.profileDetail.category || []) &&
                    <Skills
                      skill = {this.props.profileDetail.category}
                      id= ""
                      to = ""
                      displayCount = {2}
                      wordCount = {true}
                    />
                  }

                </div>


                <div className="clearfix"></div>
                <div className="col-md-12">
                  <hr className="popup-hr-divider-for-grid" />
                </div>
                <div className="clearfix"></div>

                <div className="col-md-2">
                  <h5 className="job-category-in-popup"><strong>Skills: </strong>
                  </h5>
                </div>

                <div className="col-md-10 nopad">
                  {!this.props.applicationIsLoading && (this.props.profileDetail.skill || []) &&
                    <Skills
                      skill = {this.props.profileDetail.skill}
                      id= ""
                      to = ""
                      displayCount = {2}
                      wordCount = {true}
                    />
                  }

                </div>


                <div className="clearfix"></div>

                <div className="col-md-12">
                  <hr className="popup-hr-divider-for-grid" />
                </div>

                <div className="clearfix"></div>


                <div className="col-md-12">
                    <p className="project-status-counter"><strong>Availability:</strong> {this.props.profileDetail.availability}</p>
                </div>

                <div className="clearfix"></div>

                <div className="col-md-12">
                  <hr className="popup-hr-divider-for-grid" />
                </div>

                <div className="clearfix"></div>

                <div className="col-md-12">
                    <p className="project-status-counter"><strong>Language Proficiency:</strong> {this.props.profileDetail.english_proficiency}</p>
                </div>

                <div className="clearfix"></div>

                <div className="col-md-12">
                  <hr className="popup-hr-divider-for-grid" />
                </div>

                <div className="clearfix"></div>

                <div className="col-md-12">
                    <p className="project-status-counter"><strong>Experience Level:</strong> {this.props.profileDetail.experience_level}</p>
                </div>

                <div className="clearfix"></div>

                <div className="col-md-12">
                  <hr className="popup-hr-divider-for-grid" />
                </div>

                <div className="clearfix"></div>

                <div className="col-md-12">
                    <p className="project-status-counter"><strong>Development Experience:</strong> {this.props.profileDetail.development_experience}</p>
                </div>

                <div className="clearfix"></div>

                <div className="col-md-12">
                  <hr className="popup-hr-divider-for-grid" />
                </div>

                <div className="clearfix"></div>

                <div className="col-md-12">
                    <p className="project-status-counter"><strong>Hourly Rate:</strong> {this.props.profileDetail.hourly_rate}</p>
                </div>

                <div className="clearfix"></div>

                <div className="col-md-12">
                  <hr className="popup-hr-divider-for-grid" />
                </div>

                <div className="clearfix"></div>

                <div className="col-md-2">
                  <h5 className="job-category-in-popup"><strong>Portfolio: </strong>
                  </h5>
                </div>

                <div className="col-md-10 nopad">

                  {!this.props.applicationIsLoading && !isEmpty(this.props.profileDetail.employments) ? (
                            (this.props.profileDetail.employments || []).map(
                              (employement, index) => {
                                return (
                                  <div
                                    className="col-md-12 category_submit"
                                    key={index}
                                  >
                                    <div className="tf_employe">
                                      <h5>
                                        {employement.role} |{" "}
                                        {employement.company_name}
                                      </h5>
                                      <p>
                                        {employement.period_month_from}{" "}
                                        {employement.period_year_from} -{" "}
                                        {employement.period_month_to}{" "}
                                        {employement.period_year_to}
                                      </p>
                                    </div>
                                  </div>
                                );
                              }
                            )
                          ) : (
                            <p className="col-md-12 noDataFoundTxt"> No Portfolio to display.</p>
                          )}
                </div>


                <div className="clearfix"></div>

                <div className="col-md-12">
                  <hr className="popup-hr-divider-for-grid" />
                </div>

                <div className="clearfix"></div>

                <div className="col-md-2">
                  <h5 className="job-category-in-popup"><strong>Education: </strong>
                  </h5>
                </div>

                <div className="col-md-10 nopad">

                  {!this.props.applicationIsLoading && !isEmpty(this.props.profileDetail.educations) ? (
                            (this.props.profileDetail.educations || []).map(
                              (record, index) => {
                                return (
                                  <div
                                    className="col-md-12 category_submit"
                                    key={index}
                                  >
                                    <div className="tf_employe">
                                      <h5>
                                        {record.degree} | {record.school}
                                      </h5>
                                      <p>
                                        {getFormattedDate(record.from_date)} -{" "}
                                        {getFormattedDate(record.to_date)}
                                      </p>
                                    </div>
                                  </div>
                                );
                              }
                            )
                          ) : (
                            <p className="col-md-12 noDataFoundTxt"> No Education to display.</p>
                          )}
                </div>


                <div className="clearfix"></div>

                <div className="col-md-12">
                  <hr className="popup-hr-divider-for-grid" />
                </div>

                <div className="clearfix"></div>

                <div className="col-md-2">
                  <h5 className="job-category-in-popup"><strong>Certifications: </strong>
                  </h5>
                </div>

                <div className="col-md-10 nopad">

                  {!this.props.applicationIsLoading && !isEmpty(this.props.profileDetail.certifications) ? (
                            (this.props.profileDetail.certifications || []).map(
                                (certification, index) => {
                                  return (
                                    <div className="tf_skills" key={index}>
                                      <h6 data-toggle="tooltip" data-placement="top" title={certification.certification_name}>
                                        {certification.certification_name
                                          .length > 20
                                          ? `${certification.certification_name.substring(
                                              0,
                                              60
                                            )}`
                                          : certification.certification_name}
                                      </h6>
                                    </div>
                                  );
                                }
                            )
                          ) : (
                            <p className="col-md-12 noDataFoundTxt"> No Certifications to display.</p>
                          )}
                </div>


                <div className="clearfix"></div>

                <div className="col-md-12">
                  <hr className="popup-hr-divider-for-grid" />
                </div>

                <div className="clearfix"></div>

                <div className="row previous-view-profile-next">

                    <div className="col-md-12 popup-view-posting-button-container">

                        {this.props.inviteFreelancer &&
                          <div className="hire-cloud-expert-button-search-list">
                            <a style={{marginTop:'10px'}}
                              onClick={this.props.inviteFreelancer && this.props.inviteFreelancer.bind(this,this.props.freelancer)}
                            >
                            Invite to Job</a>
                          </div>
                        }
                        <a style={{margin:'10px'}} className="popup-view-posting-button" href={!_.isEmpty(this.props.currentUser)
                                                                          ? `/user-profile/${this.props.profileDetail.uuid}`
                                                                          : `/user-profile/${this.props.profileDetail.uuid}/${true}`}>
                        View Profile
                        </a>

                        {!isEmpty(this.props.freelancer) && !isEmpty(this.props.freelancer.payment_method) ?

                          (
                            <div className="hire-cloud-expert-button-search-list">
                              <a style={{margin:'10px 0'}}
                                href ={'/hire-a-freelancer/'+this.props.freelancer.uuid+'/'+this.props.jobUuid}
                                  >
                                Hire Cloud Expert
                              </a>
                            </div>
                          )
                          :
                          (
                            <div className="hire-cloud-expert-button-search-list">
                              <a style={{margin:'10px 0'}}
                                href="/settings"
                              >
                                Hire Cloud Expert
                              </a>
                            </div>
                          )
                        }

                    </div>

                </div>
                <div className="clearfix"></div>
              </div>

              {
                        1 < this.props.currentArrayKey &&
                        (<a href="javascript:void(0)" onClick={this.props.changeProfile.bind(this,this.props.profileDetail.user_id, 'previous')} className="previous-link" > <i className="fa fa-chevron-left" aria-hidden="true"></i></a>)
              }

              {
                      this.props.currentArrayKey < this.props.allFreelancersData.length &&
                      (<a href="javascript:void(0)" onClick={this.props.changeProfile.bind(this,this.props.profileDetail.user_id, 'next')} className="next-link"> <i className="fa fa-chevron-right" aria-hidden="true"></i></a>)
              }
            </div>
          }
        </div>
      </Modal>
      )
  }
}