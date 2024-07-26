import React, { Component } from "react";
import ReadMoreAndLess from "react-read-more-less";
import { isEmpty } from "lodash";
import _ from "lodash";
import fileLogo from "../../static/images/file.png";
import payment from "../../static/images/pay_dark_color.png";
import TimeAgo from "react-timeago";
import CertificateTitle from "../../static/images/certification-required.png";
import Skills from "../Common/Skills"

class JobContainer extends Component {


  returnPoperFormat(job_expiration_date) {
    let abc;
    if (job_expiration_date) {
      let month = new Date(job_expiration_date).getMonth() + 1;
      let year = new Date(job_expiration_date).getFullYear()
      let day = new Date(job_expiration_date).getDate()
      abc = `${month < 10 ? `0${month}` : month}/${day < 10 ? `0${day}` : day}/${year}`;
    }
    return abc
  }

  returnAttachements = () => {
    const {job} = this.props;
    let attachment = []

    if(job && job.job_documents && job.job_documents.length > 0){
      job.job_documents.map(jobPer => {
         attachment.push(<div className="col-sm-2">
          <a target="_blank" rel="noopener noreferrer" href={jobPer} title={jobPer.split('/')[jobPer.split('/').length - 1]}>
            <img src={fileLogo} alt="fileLogo"/>
            <span style={{fontSize: '13px'}}>&nbsp;&nbsp;{jobPer.split('/')[jobPer.split('/').length - 1]} </span>
          </a>
          </div>
          )
          return jobPer
        })

    }
    else{
      attachment = 'None'
    }
    return <div className="row"> {attachment} </div>
  }

  render() {
    // const jobAttachment = (file) => {
    //   return file && file.url ? file.url.split("/")[file.url.split("/").length - 1] : "";
    // }
    let job_expiration_date_toshow = this.returnPoperFormat(this.props.job.job_expiration_date)
    const { job, expertise } = this.props;
    return (
      <div className="project_job_details m-0">
        <div className="col-md-12" id="view-job-post-tab-container">

              <div className="col-md-12">
                <h4 className="heading_project_manager_container_h4 mb-4 mt-0">
                    {job.job_title}
                        {
                        (
                          job
                          &&
                          job.get_job_qualification
                          && job.get_job_qualification.qualification_group === "No")
                            ?
                            <img
                            src={CertificateTitle} title="Certification Required" className="certification-required" alt=""/>
                          :
                          ''
                        }
                  </h4>
                </div>



                <div className="col-md-4">
                  <h5>Developer</h5>
                  <p className="margin-bottom-zero">
                    Posted <TimeAgo date={new Date(job.created_at).toUTCString()} />
                  </p>
                </div>
                <div className="col-md-2">
                  {job.job_visibility && <h5><span className={"job-preference-custom-tags-"+job.job_visibility.toLowerCase()}>{job.job_visibility}</span></h5>}
                </div>
                <div className="col-md-4">
                <strong>Job Expiration Date : </strong>
                <span>{job_expiration_date_toshow}</span>
                </div>


                {job && job.user && job.payment_method_added === "" ?
                <div className="col-md-2"></div>
                  :
                <div className="col-md-2 tf_payment_fail nopad">
                  <p className="image_slab">
                    <img src={payment} className="image_slab" alt="" />
                  </p>
                </div>
                }

              <div className="clearfix"></div>
              <hr />


                <div className="col-md-12">
                  <h5> <strong>Activity on this job</strong> </h5>
                </div>
                <div className="col-md-3">
                    Proposals: <strong>{job.proposal_count}</strong>
                </div>
                <div className="col-md-3">
                    Last Viewed: <strong>&nbsp;<TimeAgo date={new Date(job.last_viewed_at).toUTCString()} /></strong>
                </div>
                <div className="col-md-3">
                    Interviewing: <strong>0</strong>
                </div>
                <div className="col-md-3">
                    Invite sent: <strong>0</strong>
                </div>

              <div className="clearfix"></div>
              <hr />



              <div className="col-md-12">
                {job.job_description ? (
                  job.job_description && (
                    <ReadMoreAndLess
                      ref={this.ReadMore}
                      className="read-more-content"
                      charLimit={450}
                      readMoreText="Read more"
                      readLessText="Read less"
                    >
                      {job.job_description}
                    </ReadMoreAndLess>
                  )
                ) : (
                  <p></p>
                )}
              </div>
              <div className="clearfix"></div>
              <hr/>


              <div className="col-md-4">
                <h5>
                  <strong>{job.job_time_requirement}</strong>
                </h5>
                <p className="margin-bottom-zero">{job.job_pay_type}</p>
                {job && job.job_pay_value && (
                  <p>
                    {" "}
                    Budget:{" "}
                    {`$${isNaN(job.job_pay_value) ? "00" : parseFloat(job.job_pay_value).toFixed(2)}`}
                  </p>
                )}
              </div>

              <div className="col-md-4">
                <h5>
                  <strong>{job.job_duration}</strong>
                </h5>
                <p className="margin-bottom-zero">Project Length</p>
              </div>

              <div className="col-md-4">
                <h5>
                  <strong>{job.job_experience_level}</strong>
                </h5>
                <p className="margin-bottom-zero">Experts with the lowest rate</p>
              </div>
              <div className="clearfix"></div>
              <hr />



              <div className="col-md-12">
                <h5> <strong>Project Type:</strong> <span>{job.job_type}</span> </h5>
              </div>
              <div className="clearfix"></div>
              <hr />



              <div className="col-md-12">
                  <h5>
                    <strong>Screening Questions</strong>
                  </h5>
                  { !isEmpty(job) && !isEmpty(job.job_screening_questions) &&job.job_screening_questions ?
                    job.job_screening_questions.map((questions, index) => {
                      return (
                        <div className="col-md-12 project_type_shrink_screening">
                          <ul>
                            <h5 className="sc_ques">
                              <li>{questions.job_question}</li>
                            </h5>
                          </ul>
                        </div>
                      )
                    }
                    ) :  (
                      <p className="margin-bottom-zero">No Screening Questions</p>
                    )}
                </div>
              <div className="clearfix"></div>
              <hr/>


              <div className="col-md-12">
                <h5>
                  <strong>Attachment</strong>
                </h5>
                {this.returnAttachements()}
                <div className= "attachment_posting searched-job-space_pm">
                </div>
              </div>
              <div className="clearfix"></div>
              <hr />


              <div className="col-md-12 aws_services">
                <h5>
                  <strong>Platform</strong>
                </h5>
                {job.job_category && !_.isEmpty(job.job_category) ? (
                  job.job_category.map((skill, index) => {
                    return (
                      <label className="btn btn-primary skill-set" key={index} data-toggle="tooltip" data-placement="top" title={skill}> {skill}</label>
                    )
                  })
                ) : (
                  <p className="text-center">No items to display.</p>
                )}

              </div>
              <div className="clearfix"></div>
              <hr />

              <div className="col-md-12 aws_services ">
                <h5>
                  <strong>Tech Stack</strong>
                </h5>
                {expertise.length > 0 &&
                  <Skills
                      skill = {expertise}
                      to="#"
                      id={0}
                      displayCount = {expertise.length}
                    />
                }
              </div>
              <div className="clearfix"></div>
                <hr />
        </div>
      </div>
    )
  }
}

export default JobContainer;
