import React, { Component } from "react";
import Footer from '../miscellaneous/Footer';
import { connect } from "react-redux";
import { fetchJobInvitation } from '../../Actions/freelancerActions';
import _ from 'lodash';
import JobContainer from "./ProjectManagerJobContainer";
import ProjectManagerHeader from "../miscellaneous/ProjectManagerHeader";
import PMDashboardSideBar from "./PMDashboardSideBar";
import BreadCrumb from "../miscellaneous/BreadCrumb";

class InviteDetails extends Component {

  componentDidMount() {
    this.props.fetchJobInvitation(this.props.match.params.id)
  }

  render() {
    const jobForFreelancer = !_.isEmpty(this.props.invitationJobForFreelancer) && this.props.invitationJobForFreelancer.job;
    // const requiredExpertise = jobForFreelancer.job_expertise_required ? jobForFreelancer.job_expertise_required : [];
    const additionalExpertise = jobForFreelancer.job_additional_expertise_required ? jobForFreelancer.job_additional_expertise_required : [];
    const speciality = jobForFreelancer && jobForFreelancer.job_speciality ? jobForFreelancer.job_speciality : [];
    const expertise = [...additionalExpertise, ...speciality]
    return (
      <React.Fragment>
        <ProjectManagerHeader history={this.props.history} />
        <div id="tf-project-manager-dashboard-root">
          <BreadCrumb step={"step6"} link="Invitation Details" />
        </div>
        <div className="mn_center">
          <div className="row custom_row">

            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 p-0">
              <div className="custom_sticky_container">
                <div className="position-sticky">
                  <PMDashboardSideBar history={this.props.history} />
                </div>
              </div>
            </div>

            <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="">
                  <div className="tab-content margin-tops m-0">
                    <div className="tab-pane active fade in in" id="tab_default_1">
                      <JobContainer job={jobForFreelancer} expertise={expertise} />
                    </div>
                  </div>
                </div>
                <div className="margin-tops no-margin-top-custom">
                  <div className="tf_freelancer_pro tf_feedback">
                    <div className="col-md-12">
                      <h5 className="mt-0 col-md-6">Original message sent to Cloud Expert</h5>
                      <div className="col-md-6">
                        {
                          this.props.invitationJobForFreelancer.status === "Declined" ? <span style={{ color: "red", padding: "5px" }}>
                            This job invitation is declined by Cloud Expert
                          </span> :
                            <span style={{ color: "green", padding: "5px" }}>
                              Invite has been sent, waiting for Cloud Experts response
                            </span>
                        }
                      </div>
                    </div>
                    <div className="clearfix"></div>
                    <div className="col-md-12" id="#view-job-post-tab-container">

                      <div className="col-md-12">
                        <div className="mb-2">
                          <span>{this.props.invitationJobForFreelancer.message || ''}
                          </span>
                          <br />
                        </div>
                      </div>

                      <hr style={{ borderWidth: "2px" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }

}

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = (dispatch) => {
  return {
    fetchJobInvitation: (id) => dispatch(fetchJobInvitation(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InviteDetails)
