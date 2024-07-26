import React, {Component} from "react";
import ProjectManagerHeader from '../miscellaneous/ProjectManagerHeader';
import Footer from '../miscellaneous/Footer';
import {searchAndfilterJobPostings} from '../../Actions/ProjectManagerFreelancerActions';
import { connect } from "react-redux";
import {Link} from 'react-router-dom';
import Loader from "react-loader-spinner";
import  JobFilter from './JobFilter'
import CertificateTitle from "../../static/images/certification-required.png";
import ReadMoreAndLess from "react-read-more-less";
import Skills from '../Common/Skills'
import CITYWITHCOUNTRY from "../../constants/cityWithCountries";
import ReactCountryFlag from "react-country-flag"
import globeSrc from "../../static/images/globe.png";
import TimeAgo from "react-timeago";
import PMDashboardSideBar from "./PMDashboardSideBar";
import NODataFoundImg from"./../../static/images/noDataFound.png"
import loadMoreSrc from "../../static/images/loadMore.gif";


class AllJobPostings extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      activePage: 1,
      pageNumber: 1,
      searchItem: '',
      isSearched: false,
      handleToggle: false,
      hideShowMore: false,
      isAllJobPostings: false,
      dataFilter: {
        job_pay_type: 'all',
        job_status: 'All'
      },
      jobPostings: []
    }
  }

  componentWillMount(){
    this.props.searchAndfilterJobPostings(this.state.searchItem,this.state.dataFilter, 1).then((res) => {
      this.setState({jobPostings: res})
      if(res.length < 10){
        this.setState({hideShowMore: true})
      }
    })
  }

  handleFilter = (data) => {
    this.setState({dataFilter: data})
    this.props.searchAndfilterJobPostings(this.state.searchItem,data, 1)
  }

  handleDraftPageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`)
    this.setState({activePage: pageNumber})
    window.scrollTo(0, 0);
  }

  handleSearch = (e) => {
    this.setState({searchItem: e.target.value})
    this.searchFreelancers(e, e.target.value)
  }

  searchFreelancers = async (e, searchItem) => {
    e.preventDefault()
    await this.props.searchAndfilterJobPostings(searchItem,this.state.dataFilter, 1).then((res) => {
            this.setState({jobPostings: res})
            if(res.length < 10){
              this.setState({hideShowMore: true})
            }
          })
    this.setState({isSearched: true})

  }

  handleFilterToggle = () => {
    this.setState({handleToggle: !this.state.handleToggle})
  }

  handleShowMore = () => {
    let {jobPostings} = this.state
    let newjobPostings = jobPostings
    this.setState({pageNumber: this.state.pageNumber + 1})
    this.props.searchAndfilterJobPostings(this.state.searchItem, this.state.dataFilter, this.state.pageNumber+1).then((res) =>{
        if(res.length > 0){
            newjobPostings.push(...res)
            if(res.length < 10){
                this.setState({
                  hideShowMore: true,
                  jobPostings: newjobPostings
               })
              }
            else{
                this.setState({
                  jobPostings: newjobPostings
               })
            }
        }else{
            this.setState({
              hideShowMore: true
            })
        }
    })
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
           style={{height: '24px',width: '24px',marginRight:'-10px',marginTop: '-2px'}} alt=""
           />
           </span>
        }
      }

      else {
           data =  <span> <img
           src={globeSrc}
           style={{height: '24px',width: '24px',marginRight:'-10px',marginTop: '-2px'}} alt=""
           />
           </span>
         }
     return data
  }

  render() {
    const filterIcon = require("../../static/images/Icon_Tune_Filled_1.svg")
    const searchIcon = require("../../static/images/Icon_Search.svg")
    const moreIcon = require("../../static/images/Icon_More_Filled.svg")
    const {isLoading} = this.props;
    const {jobPostings} = this.state;


    return (
    <div>
      <div className="project-manager-listing-background">

        <div className="">
          <ProjectManagerHeader history={this.props.history}/>
            <div className="mn_center d-flex">
              <div className="col-md-2 p-0 SideBarUI">
                <PMDashboardSideBar history={this.props.history}/>
              </div>
              <div className="col-md-10 rightSidecontent">
                <div className=" project-manager-all-page-equal-top-shifting">
                  <div className="empty-outline-box-for-project-manager-dashboard">

                  <div className=" padding_4">
                    <div className="">

                      <div className="clearfix"></div>
                      <div className="tf_all_search pt-0">
                        <div className="col-md-12">
                          <div className="tf_all_search_filter" id="tf_all_search_filter-all-job-posting">
                            <div className="col-md-9 col-sm-8 p-0">
                              <div className="input-group">
                                <div className="input-group-addon1"><img src={searchIcon} alt="search-img"/>
                                </div>
                                <form>
                                  <div className="tf_search">
                                    <input type="text" className="form-control mn_input"
                                      onChange={this.handleSearch} placeholder="Search Job Posting" />
                                  </div>
                                </form>
                              </div>
                            </div>
                            <div className="col-md-3 col-sm-4 pr-0">
                              <Link className="tf_filter" data-toggle="collapse" role="button"
                                  aria-expanded="false" aria-controls="all-job-postings-filter"
                                  onClick={(e) => {e.preventDefault(); this.handleFilterToggle()}}>
                                <img src={filterIcon} alt="filter-img"/> <span>FILTER
                                </span>
                              </Link>
                            </div>
                          </div>
                        </div>

                        <JobFilter handleToggle={this.state.handleToggle} handleFilter={this.handleFilter} handleFilterToggle={this.handleFilterToggle}/>

                        {isLoading && !jobPostings.length > 0 && <div className="grid-loader my-feed-loader">
                        <Loader type="Grid" color="#00BFFF" className="text-center" height={100} width={100} />
                        </div>
                        }
                        <div className="col-md-12">
                        {jobPostings.length > 0 ? jobPostings.map((posting) => {
                          // const requiredExpertise = posting.job_expertise_required
                          //                         ? posting.job_expertise_required
                          //                         : [];
                          const additionalExpertise = posting.job_additional_expertise_required
                            ? posting.job_additional_expertise_required
                            : [];
                          const speciality = posting && posting.job_speciality ? posting.job_speciality : [];
                          const expertise = [...additionalExpertise, ...speciality];
                          return(
                            <div className={"tf_all_aws tf_my_aws List-Of-All-Job-Posted list-view-strip-box " +posting.job_visibility+"-list-row"}>
                                <div className="row">
                                    {/* Start Column 11 */}
                                    <div className="col-md-11 col-sm-11 col-xs-10 nopad">
                                      <div className="col-md-9">
                                          <Link to={{
                                                pathname: `/job/${posting.uuid || posting.id}/1`,
                                                state: { isAllJobPostings: true}
                                              }}>
                                              <h4>
                                                {posting.job_title}

                                                {
                                                !( posting &&  posting.get_job_qualification && posting.get_job_qualification.qualification_group === "No")
                                                    ?
                                                    <img
                                                    src={CertificateTitle} title="Certification Required" className= "certification-required all-job-postings-logo" alt=""/>
                                                  :
                                                  ''
                                                }
                                                {
                                                  <span className={"job-preference-custom-tags-"+posting.job_visibility.toLowerCase()}>{posting.job_visibility}</span>
                                                }
                                              </h4>
                                          </Link>

                                      </div>
                                      {/* End Column 9 */}
                                      {/* Start Column 3 */}
                                      <div className="col-md-3">

                                      {
                                        posting.posted_by_current_user ?
                                        <Link to={{pathname: `/job/${posting.uuid || posting.id}/1`, state: "inviteAllPosting"}} className="tf_invite_button" id="list-view-invite-cloud-expert-button">Invite Cloud Expert</Link>
                                        :
                                        <Link href="#" className="tf_invite_disabled" id="list-view-invite-cloud-expert-button">Invite Cloud Expert</Link>
                                      }


                                      </div>
                                      {/* End Column 2 */}



                                    </div>
                                    {/* End Column 11 */}

                                    {/* Start Cloumn 1  */}

                                    {
                                      1==2 ?
                                      <div className="col-md-1 col-sm-1 col-xs-2">
                                      <Link href="#"><img src={moreIcon} alt="more-img"/></Link>
                                      </div>
                                      :
                                      ''
                                    }
                                    {/* End Column 1 */}

                                </div>
                                {/* End Row */}

                                <div className="clearfix"></div>

                                {/* Start Row */}
                                <div className="row">

                                  <div className="col-md-12">
                                    <div className="project-statistics">
                                      <div className="project-statistics-box"><strong>Pay Type:</strong>&nbsp;{posting.job_pay_type}</div>
                                      <div className="project-statistics-box"><strong>Exp. Level:</strong>&nbsp; {posting.job_experience_level}</div>
                                      <div className="project-statistics-box"><strong>Est. Time: </strong>&nbsp; {this.checkEst(posting.job_duration)}</div>
                                      <div className="project-statistics-box"><strong>Time Req.: </strong>&nbsp; {this.checkEst(posting.job_time_requirement)}</div>
                                      <div className="project-statistics-box"><strong>Posted:</strong>&nbsp; <TimeAgo date={new Date(posting.created_at).toUTCString()}/></div>
                                    </div>
                                  </div>

                                  <div className="clearfix"></div>


                                  <div className="col-md-12" id="job-description-list-view">
                                    {posting.job_description && (
                                          <ReadMoreAndLess
                                            className="read-more-content"
                                            numberOfLines={2}
                                            charLimit={250}
                                            readMoreText="Read more"
                                            readLessText="Read less"
                                          >
                                            {posting.job_description}
                                          </ReadMoreAndLess>
                                        )}
                                  </div>

                                  <div className="clearfix"></div>


                                  <div className="col-md-12">
                                    <div className="job-search-new-skills" id="job-search-new-skills">
                                        {expertise.length > 0 &&
                                          <Skills
                                              skill = {expertise}
                                              id = ""
                                              to = ""
                                              displayCount = {3}
                                              cursorDisabled = {true}
                                            />
                                          }
                                    </div>
                                  </div>

                                  <div className="clearfix"></div>


                                  <div className="row mt-10">
                                      <div className="col-md-3">
                                        <p className="">Proposals: <strong>{posting.proposal_count}</strong></p>
                                      </div>

                                      <div className="col-md-3 custom-start">
                                        { this.returnStars(posting && posting.maximum_rating)}
                                      </div>

                                      <div className="col-md-3">
                                        <p className="">
                                          <strong>
                                            {posting.amount_spent}k+ Spent
                                          </strong>
                                        </p>
                                      </div>

                                      <div className="col-md-3 tf_payment_fail">
                                        <p className="">
                                          <strong>
                                            {
                                              posting && posting.get_job_qualification ?
                                              this.returnCountryFlag1(posting.get_job_qualification) : ''
                                            }

                                            {
                                              posting && posting.get_job_qualification && (posting.get_job_qualification.location || 'Anywhere')}
                                          </strong>
                                        </p>
                                      </div>

                                  </div>
                                </div>
                                {/* End Row */}

                            <div className="clearfix"></div>
                          </div>

                          )
                          }):
                          !isLoading &&
                          <div className= "tf_all_aws tf_my_aws noJobsFound">
                            <img src={NODataFoundImg} alt=""/>
                            <p className="text-center all-job-posting-center">No Items to display.</p>
                          </div>
                          }


                          {
                            !this.state.hideShowMore &&  <button
                                  className="load_more_btn_find_work mt-20 mb-15"
                                  onClick={this.handleShowMore}
                                  >
                                  Show More
                                  </button>
                          }
                          {
                            isLoading &&
                            <img src={loadMoreSrc} alt=""/>
                          }


                        </div>
                      </div>
                      <div className="clearfix"></div>
                    </div>
                  </div>
                  </div>
                </div>
               </div>
            </div>
        </div>
      </div>
      {/* <Footer/> */}
    </div>

    )
  }
}
const mapStateToProps = state => {
  // ...state
  return{
    AllJobPostings: state.AllJobPostings,
    isLoading: state.applicationIsLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchAndfilterJobPostings: (searchItem,filters, page) => dispatch(searchAndfilterJobPostings(searchItem,filters, page))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllJobPostings)
