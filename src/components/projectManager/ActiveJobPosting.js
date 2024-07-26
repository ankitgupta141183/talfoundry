import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import _ from 'lodash';
import Pagination from "react-js-pagination";
import ReadMoreAndLess from 'react-read-more-less';
import MoreIcon from '../../static/images/Icon_More_Filled.svg';
import certification_required from "../../static/images/certification-required.png";


const itemsCountPerPage = 5;


export default class ActiveJobPostings extends Component {

  constructor(props){
      super(props)
      this.state = {
        activePage: 1,
        isSliderOpen: false,
        sliderType: "",
        isDeleted: false,
        removeModal: false
      }
  }

  handleRemove(id, idx){
    this.props.removeHandler(id, idx)
  }


  removeAccount = (id) => {
    this.setState({removeModal: false})
    this.props.removePost(this.state.methodId)
    .then((res) => {
      if (res.status === 200)
      {
        this.setState({ isDeleted: true})
      }
    })
    this.showOptions(this.state.methodIdx)
  }

  handleDraftPageChange = (pageNumber) => {
    this.setState({activePage: pageNumber})
    window.scrollTo(0, 0);
  }


  showOptions =(idx) => {
    this.setState({[`isOptions${idx}`]: !(this.state[`isOptions${idx}`])})
  }


  handleEdit = (e) => {
    this.props.history.push(`/edit-a-job-progress/${e.currentTarget.id}`)
  }


  renderData = () => {
    let {activeJobsData} = this.props
    const {activePage} = this.state;
    let activeJobs = JSON.parse(JSON.stringify((activeJobsData))).splice( activePage === 1 ? 0 : ((activePage - 1)*itemsCountPerPage), itemsCountPerPage)
    let some = [];
    activeJobs.map((job, idx) => {
      some.push(
        job.job_status === "active" ?

        <div className="my-post-title-sec list-view-strip-box" key={job.id}>

            <div className="tf_my_aws">

              <div className="col-md-11 col-sm-11 col-xs-10 ">


                  <h4>
                    <Link to={`/job/${job.uuid || job.id}/1`}>
                      {job.job_title}
                        {
                          !( job &&  job.get_job_qualification && job.get_job_qualification.qualification_group === "No" )
                              ?
                              <img
                              title="Certification Required"
                              src={certification_required}
                              alt="Certified"
                              className="certification-required" />
                            :
                            ''
                          }

                     </Link>
                  </h4>
              </div>
              <div className="clearfix"></div>

              <div className="col-md-12  tf_full_width">
              {job.job_description && <ReadMoreAndLess
                                  ref={this.ReadMore}
                                  className="read-more-content"
                                  charLimit={337}
                                  readMoreText="Read more"
                                  readLessText="Read less"
                                >
                                  {job.job_description}
              </ReadMoreAndLess>}
              </div>
              <div className="clearfix"></div>

              <div className="col-md-3 col-sm-4 col-xs-4 tf_full_width">
                <p>{job.job_pay_type}
                </p>
              </div>
              <div className="col-md-9 col-sm-8 col-xs-8 tf_full_width">
                <p>{job.job_visibility} - Created on {job.created_at ? new Date(job.created_at).toDateString() : ''}</p>
              </div>

              <div className="clearfix"></div>
              <div className="col-md-4 col-sm-4 col-xs-4 tf_full_width">
                <p>Proposals - {job.proposal_count}</p>
              </div>
              <div className="col-md-4 col-sm-4 col-xs-4 tf_full_width">
                <p>Messaged - 0</p>
              </div>
              <div className="col-md-4 col-sm-4 col-xs-4 tf_full_width">
                <p>Hired - {job.active_contract_count}</p>
              </div>

            </div>
            {/* End AWS Row */}

            <div className="post-edit-dropdown">
                  <Link className="my-post-more-icon" onClick={(e) => {e.preventDefault(); this.showOptions(idx)}}><img src={MoreIcon} alt="" /></Link>
                  {
                    (
                      this.state[`isOptions${idx}`]) &&
                      <ul className="job-options job-post-more-option">
                        <li className="edit-job-post" id={job.uuid || job.id} onClick={this.handleEdit}>Edit Job Post</li>
                        <li className="view-job-post"><Link to={`/job/${job.uuid || job.id}/1`} >View Job Post</Link></li>
                        <li className="remove-job-post"
                          id={job.uuid || job.id}
                          onClick={this.handleRemove.bind(this,job.uuid || job.id, idx)}>
                            Remove Job Post
                        </li>
                      </ul>
                  }
            </div>
        </div>




          : ''
          )
        } )
      return  <div> {some}</div>
    }


    render(){
        let {activeJobsData} = this.props
        return(
            <div>
                {activeJobsData && activeJobsData.length > 0 ? this.renderData() : ''}

                        {
                          (!_.isEmpty(activeJobsData) && activeJobsData.length > 0) ? (
                            <div className="">
                                            <div className="col-md-12">
                            <Pagination
                              activePage={this.state.activePage}
                              itemsCountPerPage={itemsCountPerPage}
                              totalItemsCount={activeJobsData.length}
                              pageRangeDisplayed={5}
                              onChange={this.handleDraftPageChange.bind(this)}
                              prevPageText="Previous"
                              nextPageText="Next"
                            />
                            </div>
                            </div>
                          ) : null
                        }


            </div>
        )
    }
}