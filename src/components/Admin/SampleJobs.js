import React,{Component} from 'react';
import TimeAgo from 'react-timeago';
import ReadMoreAndLess from 'react-read-more-less';
import { Link } from "react-router-dom";
import _ from "lodash";
import ReactCountryFlag from "react-country-flag"
import payment from '../../static/images/pay_dark_color.png';
import required_new_1 from '../../static/images/certification-required.png';
import globeSrc from "../../static/images/globe.png";
import CITYWITHCOUNTRY from "../../constants/cityWithCountries";
import Skills from '../Common/Skills'
import loadMoreSrc from "../../static/images/loadMore.gif";


export default class SampleJobs extends Component {

    constructor(props){
        super(props)
        this.state = {
            activePage: 1
        }
    }

    handleDraftPageChange = (pageNumber) => {
        this.setState({activePage: pageNumber})
    }

    checkEst = (value) => {
        if(value.substr(0,9) === "Less than"){
            return "< "+value.substr(9)
        }else if(value.substr(0,9) === "More than"){
            return "> "+value.substr(9)
        }
          return value
      }
    returnStars = (value) => {
        let stars = [];
        for (let i = 0; i < 5; i++) {
          stars.push(<i
            className="fa fa-star first"
            style={{color:  i+1 > value ? '#8080806e': '#0DA4DE',fontSize: '18px'}}
            >
            </i>)
        }
        return stars;
      }
    returnCountryFlag1 = (qual) => {
    let data;

     if(qual && qual.location){
       let codeObj = CITYWITHCOUNTRY.find(c => c.city === qual.location)
        
        if(codeObj && codeObj.code) {
              data = <ReactCountryFlag
                countryCode={codeObj.code}
                svg
                style={{
                  width: "1.8em",
                  height: "1.0em",
                  float: "left",
                  marginTop: '3px',
                  marginLeft: "0px",
                  marginRight: "12px",
                }}
                title={"country"}
              />
        }
        else {
          data =  <span> <img 
           src={globeSrc} 
           style={{height: '24px',width: '24px',marginRight:'0px',marginTop: '-2px'}} alt=""
           />             
           </span>
        }
      }

      else {
           data =  <span> <img 
           src={globeSrc} 
           style={{height: '24px',width: '24px',marginRight:'0px',marginTop: '-2px'}} alt=""
           /> 
           </span>
         }
     return data
  }
    render(){
     const {jobs, isLoading} = this.props

     return(
               <div>
                {
                    jobs && jobs.length > 0 ? jobs.map((jobDetails, i)=>{
                        return(
                        <React.Fragment>

                            {/* Start Listing */}
                            <div className={"admin-side-list-view-box " +jobDetails.job_visibility+"-list-row"}>
                                {/*Start Column 12  */}
                                  <div className="">

                                    {/* Start AWS */}
                                    <div className="">

                                        {/* Start Row */}
                                        <div className="row">
                                            <div className="col-md-11">
                                                <Link to={'#'} onClick={this.props.handleOPenModal.bind(this,jobDetails, i)}>
                                                    <h5 className="job-title-in-listing-admin-side">
                                                    {
                                                        jobDetails.job_title
                                                    } 
                                                    <img src= {payment} className="admin-payment-verified-icon" alt="" /> 
                                                    {
                                                        !_.isEmpty(jobDetails.job_qualification) && (jobDetails.job_qualification.qualification_group !== "No") 
                                                        ? <img src={required_new_1} className="admin-payment-job-qualification-icon" alt= ""  /> : 
                                                        ""
                                                    }
                                                    <span className={"job-preference-custom-tags-"+jobDetails.job_visibility.toLowerCase()}>{jobDetails.job_visibility}</span>
                                                    </h5>
                                                </Link>
                                            </div>
                                            <div className="col-md-1">
                                                
                                            </div>
                                        </div>
                                        {/* End Row */}

                                        {/* Start Row */}
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="project-statistics">
                                                    <div className="project-statistics-box"><strong>Pay Type:</strong>&nbsp; {jobDetails.job_pay_type}</div>
                                                    <div className="project-statistics-box"><strong>Exp. Level:</strong>&nbsp; {jobDetails.job_experience_level}</div>
                                                    <div className="project-statistics-box"><strong>Est. Time: </strong>&nbsp; {this.checkEst(jobDetails.job_duration)}</div>
                                                    <div className="project-statistics-box"><strong>Time Req.: </strong>&nbsp; {this.checkEst(jobDetails.job_time_requirement)}</div>
                                                    <div className="project-statistics-box"><strong>Posted:</strong>&nbsp; <TimeAgo date={new Date(jobDetails.created_at).toUTCString()} /></div>

                                                </div>
                                            </div>
                                        </div>
                                        {/* End Row */}

                                        {/* Start Description Row */}
                                        <div className="row">
                                            <div className="col-md-12 job-details-description-admin-side" >
                                                { 
                                                    jobDetails.job_description && 
                                                    
                                                    <ReadMoreAndLess  className="read-more-content" charLimit={210} readMoreText="Read more" readLessText="Read less">
                                                        {jobDetails.job_description}
                                                    </ReadMoreAndLess>
                                                }
                                            </div>
                                        </div>
                                        {/* End Row */}

                                        {/* Start Skill Row */}
                                        <div className="row">
                                            <div className="col-md-12"> 
                                                
                                                <Skills
                                                    skill = {jobDetails.job_speciality}
                                                    id= ""
                                                    to = ""
                                                    displayCount = {3}
                                                    wordCount = {true}
                                                  />
                                            </div>
                                        </div>
                                        {/* End Row*/}

                                        {/* Start Proposals Row */}
                                        <div className="row">

                                            <div className="col-md-3">
                                            <p>Proposals: <strong>{jobDetails.proposal_count}</strong></p>
                                            </div>

                                            <div className="col-md-3 custom-start">
                                            <strong>{ this.returnStars(jobDetails && jobDetails.maximum_rating)} </strong>
                                            </div>

                                            <div className="col-md-3">
                                            <p><strong>${jobDetails.amount_spent}k+ <span>spent</span></strong></p>
                                            </div>

                                            <div className="col-md-3">
                                                <p className="">
                                                  <strong>                                              
                                                    {
                                                      jobDetails && jobDetails.get_job_qualification ? 
                                                      this.returnCountryFlag1(jobDetails.get_job_qualification) : ''
                                                    }

                                                    {
                                                      jobDetails 
                                                      && 
                                                      jobDetails.get_job_qualification 
                                                      &&
                                                      (jobDetails.get_job_qualification.location || 'Anywhere')}
                                                  </strong>
                                                </p>
                                            </div>                

                                        </div>
                                        {/* End Proposals Row */}

                                    </div>
                                    {/* End AWS */}

                                  </div>
                                  {/* End Column 12 */}
                            </div>
                            {/* End Listing */}

                            <div className="clearfix"></div>

                        </React.Fragment>)
                    }) 
                 :
                 ''  
                }

                <div className="col-md-12">
                    <div className="abc">  
                        {jobs.length >= 5 && !this.props.hideShowMore &&  <button 
                            className="load_more_btn_find_work mt-20" 
                            onClick={this.props.handleShowMore}
                            > 
                            Show More
                            </button>
                        }
                        {isLoading && 
                          <img src={loadMoreSrc} alt="loader" /> 
                        }
                    </div>
                </div>

               </div>
               )
    }
}


