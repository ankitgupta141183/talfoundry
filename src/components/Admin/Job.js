import React from "react";
import TimeAgo from 'react-timeago';
import ReadMoreAndLess from 'react-read-more-less';
import { Link } from "react-router-dom";
import _ from "lodash";
import payment from '../../static/images/pay_dark_color.png';
import required_new_1 from '../../static/images/certification-required.png';


export default function Job(job) {
  let jobDetails = job.job;
  return <React.Fragment>

        <div className="admin-side-list-view-box">
          <div className="col-md-12">
            <div className="tf_myfind_aws">
              <div className="row mt-20">
                <div className="col-md-8 nopad">
                  <Link onClick={this.props.handleOPenModal.bind(this,jobDetails, this.props.i)}>
                    <h5>
                      {
                        jobDetails.job_title
                      }
                      <img src= {payment} className="admin-payment-verified-icon" alt="" />
                      {
                        !_.isEmpty(jobDetails.job_qualification) && (jobDetails.job_qualification.qualification_group !== "No")
                        ? <img src={required_new_1} className="admin-payment-job-qualification-icon" alt= ""  /> :
                        ""
                      }
                    </h5>
                  </Link>
                </div>
                <div className="col-md-4">
                  <p><strong>Posted  <TimeAgo date={new Date(jobDetails.created_at).toUTCString()} /></strong></p>
                </div>
              </div>

              <div className="clearfix"></div>

              <div className="col-md-12 tf_myfind_hour nopad">
                <p><strong>{jobDetails.job_pay_type}</strong> <span>{jobDetails.job_experience_level}</span></p>
              </div>
              <div className="clearfix"></div>
              <div className="col-md-12 tf_myfind_hour nopad">
                <p><span>Est. Time: {jobDetails.job_duration}, {jobDetails.job_time_requirement}</span></p>
              </div>
              <div className="col-md-12 tf_myfind_conten nopad">
                {jobDetails.job_description && <ReadMoreAndLess
                  className="read-more-content"
                  charLimit={150}
                  readMoreText="Read more"
                  readLessText="Read less">
                  {jobDetails.job_description}
                </ReadMoreAndLess>}
              </div>
              <div className="col-md-12 tf_skills nopad">
              </div>
              <div className="clearfix"></div>
              <div className="col-md-12 tf_payment_fail nopad">
                <div className="col-md-3">
                  <p>Proposals: <strong>{jobDetails.proposal_count}</strong></p>
                </div>
                <div className="col-md-3">
                  <strong><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i> </strong>
                </div>
                <div className="col-md-3">
                  <p><strong>$5k+ <span>spent</span></strong></p>
                </div>
                <div className="col-md-3">
                  <p><strong><i className="fa fa-map-marker"></i>{jobDetails.user && jobDetails.user.country}</strong></p>
                </div>
              </div>
            </div>
          </div>

        </div>
      <div className="clearfix"></div>

    </React.Fragment>
}