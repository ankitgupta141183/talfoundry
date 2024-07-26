import React, { Component } from "react";
import FreelancerHeader from "../miscellaneous/FreelancerHeader";
import ProjectManagerHeader from "../miscellaneous/ProjectManagerHeader";
import LandingPageHeader from "../miscellaneous/LandingPageHeader";
import {
  getSearchedJobsForFreelancer,
  getSavedJobsForFreelancer,
  getFilteredFLForHiringMan,
  getFilteredFreelancersWithPagination,
  getUnAuthorizedFreelancer,
  getJobsData
} from "../../Actions/SearchActions";
import { savedApproveFreelancer, removeJobsFreelancer } from "../../Actions/freelancerActions";
import iconSearchWhite from "../../static/images/Icon_Search_white.svg";
import Autosuggest from "react-autosuggest";
import { SetSearchVal, SetSearchJobVal } from "../../Actions/SearchActions";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import TimeAgo from "react-timeago";
import ReadMoreAndLess from "react-read-more-less";
import _ from "lodash";
import { connect } from "react-redux";
import CITIES from "../../constants/cities";
import payment from "../../static/images/pay_dark_color.png";
import Footer from '../miscellaneous/Footer';
import loadMoreSrc from "../../static/images/loadMore.gif";
import globeSrc from "../../static/images/globe.png";
import CITYWITHCOUNTRY from "../../constants/cityWithCountries";
import ReactCountryFlag from "react-country-flag"
// import SignUpPopUpNew from "../miscellaneous/SignUpPopUpNew";
import certification_required from "../../static/images/certification-required.png";
import Skills from './Skills'


const cities = CITIES;
const getSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase()
  const inputLength = inputValue.length;
  return inputLength === 0
    ? []
    : cities.filter((city) => city.toLowerCase().slice(0, inputLength) === inputValue)
}

const renderSuggestion = (suggestion) => <div>{suggestion}</div>;

class SearchedJobs extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      searchSection: true,
      savedSection: false,
      isSearchJobNew: false,
      sortItem: "",
      jobType: [],
      filterData: {
        category: [],
      },
      expLevel: [],
      locationBox: [],
      availability: [],
      proficiencyLevel: [],
      projectLength: [],
      weekTime: [],
      addLocation: "Any Location",
      favour: "",
      newSearchItem: "",
      searchItem: "",
      jobCat: [],
      certificateOption: "",
      addCity: "Select City",
      value: "",
      suggestions: [],
      openStatus: false,
      activePage: 1,
      loadMore: 1,
      jobsForFreelancerData: [],
      loadMoreClicked: false,
      currentResponse: [],
      hideLoadMore: false,
      openLoginModal: false,
      jobId: ''
    }
  }

  componentDidMount() {
    let location = this.props.history.location
    if(location && location.state && location.state.search && location.state.search.length > 0){
       this.setState({searchItem: this.props.location.state.search}, () => {
         this.getJobsDataApiCall('fromDidMount')
       })
    }
    else{
      this.getJobsDataApiCall('fromDidMount')
    }
  }

  handleDraftPageChange = (pageNumber) => {
    this.setState({ activePage: pageNumber })
  }

  getJobsDataApiCall = (type) => {
    let {jobsForFreelancerData,loadMore} = this.state
    if(type === "fromSearch" && loadMore === 1){
     this.setState({loadMore: 1,jobsForFreelancerData: []},
      () => {
        this.callApi('searchFirstTime')
      }
      )
    }

    else if(type === "fromSearch" && loadMore > 1 && jobsForFreelancerData.length >= 5) {
          this.setState({loadMore: 1,jobsForFreelancerData: []}, () => {
            this.callApi('searchNextTime')
          })
    }

    else if(type === "fromSearch" && loadMore > 1){
      this.setState({loadMore: 1},() => {
        this.callApi('searchNextTime')
      })
    }

    else if(type === "fromLoadMore"){
     this.setState({
        loadMore: loadMore
      },
      () => {
        this.callApi('fromLoadMore')}
      )
    }
    else if(type === "fromDidMount"){
      this.callApi('fromDidMount')
    }

  }

  callApi = (type) => {
    let dataType = "find_jobs"
    // let sortBy = null
    let {jobsForFreelancerData,loadMore,filterData,searchItem,sortItem} = this.state
    let sendSearch = false
    let searchParameters={}
    let searchItemValue = searchItem || ''

    searchParameters = filterData
      this.props.getJobsData(dataType,searchParameters,sortItem,loadMore,sendSearch,searchItemValue).then(res => {

        if(!res.length && type === "fromLoadMore"){
          this.setState({
            hideLoadMore: true,
            loadMoreClicked: false
          })
          return
        }

        if(type === "fromDidMount"){
          this.setState({currentResponse: res,jobsForFreelancerData: res,loadMoreClicked: false})
        }

        if(type === "fromLoadMore"){
          if(jobsForFreelancerData.length > 0){
           jobsForFreelancerData.push(...res)
           if(res.length === 0){
            jobsForFreelancerData = []
           }
          this.setState({currentResponse: res,jobsForFreelancerData: jobsForFreelancerData,loadMoreClicked: false})
          }
          else {
            this.setState({currentResponse: res,jobsForFreelancerData: res,loadMoreClicked: false})
          }
        }

        if(type === "searchFirstTime"){
            this.setState({currentResponse: res,jobsForFreelancerData: res,loadMoreClicked: false})
        }

        if(type === "searchNextTime"){
         if(jobsForFreelancerData.length > 0){
           jobsForFreelancerData.push(...res)
           if(res.length === 0){
            jobsForFreelancerData = []
           }
          this.setState({currentResponse: res,jobsForFreelancerData: jobsForFreelancerData,loadMoreClicked: false})
          }
          else {
            this.setState({currentResponse: res,jobsForFreelancerData: res,loadMoreClicked: false})
          }
        }

       }
       )
  }


  callUnAUth = () => {
    let {loadMore,jobsForFreelancerData} = this.state
    this.props.getUnAuthorizedFreelancer("find_jobs",null,loadMore).then(() => {
      this.setState({loadMoreClicked: false})
      if(jobsForFreelancerData.length === 0 && this.props.jobsForFreelancer.length > 0){
          jobsForFreelancerData = this.props.jobsForFreelancer
      }
      else if(this.props.jobsForFreelancer.length > 0) {
        jobsForFreelancerData.push(...this.props.jobsForFreelancer)
      }
      this.setState({jobsForFreelancerData})
    })
  }

  callMulti = () => {
    let {jobsForFreelancerData} = this.state
    this.setState({ searchItem: "", newSearchItem: "" }, () => {
      this.setState({loadMoreClicked: false})
      this.refs.searchInputRef.value = "";
      this.props.SetSearchVal("")
      this.props.getUnAuthorizedFreelancer("find_jobs",null).then(() => {
        if(jobsForFreelancerData.length === 0 && this.props.jobsForFreelancer.length > 0){
              jobsForFreelancerData = this.props.jobsForFreelancer
        }
        else if(this.props.jobsForFreelancer.length > 0) {
            jobsForFreelancerData.push(this.props.jobsForFreelancer)
        }
        this.setState({jobsForFreelancerData})
      })
    })
  }


  getJobs = (searchBy, searchItem) => {
    this.props.getSearchedJobs(searchBy, searchItem)
  }

  searchForJobs = async (e) => {
    e.preventDefault()
    !_.isEmpty(this.props.currentUser)
      ? await this.props.SetSearchVal(this.state.searchItem)
      : await this.props.SetSearchJobVal(this.state.searchItem)
    !_.isEmpty(this.props.currentUser)
      ? await this.getJobsDataApiCall('fromSearch')
      : await this.getJobsDataApiCall('fromSearch')
  }

  handleSearchChange = (e) => {
    this.setState({ searchItem: e.target.value })
    this.searchForJobs(e)
  }

  handleSavedJobs = (id, event) => {
    event.preventDefault();
    event.currentTarget.firstElementChild.classList.remove("fa-heart-o")
    event.currentTarget.firstElementChild.classList.add("fa-heart")
    this.props.savedApprove(id).then((res) => {
      if (res.status === 200) {
        this.getJobsDataApiCall('fromSearch')
      }
    })
  }

  handleRemovedJobs = (id, event) => {
    event.preventDefault();
    event.currentTarget.firstElementChild.classList.remove("fa-heart")
    event.currentTarget.firstElementChild.classList.add("fa-heart-o")
    this.props.removeJobs(id).then((res) => {
      if (res.status === 200) {
        this.getJobsDataApiCall('fromSearch')
      }
    })
  }

  showASection = (event) => {
    if (event.target.id === "savedSection") {
      this.props.getSavedJobsForFreelancer()
    }
    this.setState({
      searchSection: event.target.id === "searchSection",
      savedSection: event.target.id === "savedSection",
    })
  }

  handleGetFreelancer = (e) => {
    let category = this.state.filterData.category || [];
    let filterData = this.state.filterData;
    if (e.target.checked) {
      category.push(e.target.id)
    } else {
      let index = category.indexOf(e.target.id)
      index === 0 ? (category = category.splice(1, category.length)) : category.splice(index)
    }
    filterData.category = category;
    this.setState({ filterData: filterData, jobCat: e.target.id })
    this.getJobsDataApiCall('fromSearch')
  }

  handleLocationChange = (e) => {
    const { filterData } = this.state;
    if (e && e.length) {
      filterData["location"] = e;
    } else {
      delete filterData["location"];
    }
    this.setState({ filterData: filterData })
  }

  handleJobTypeChange = (e) => {
    const { filterData } = this.state;
    if (e.target.checked) {
      filterData["job_pay_type"] = e.target.value;
      this.setState({ filterData: filterData, jobType: e.target.value })
    } else {
      delete filterData["job_pay_type"];
      this.setState({ filterData: filterData, jobType: "" })
    }
    this.getJobsDataApiCall('fromSearch')
  }

  handleExpLevelChange = (e, eventType) => {
    const { filterData } = this.state;
    if (e.target.checked) {
      filterData["job_experience_level"] = e.target.id;
      this.setState({ filterData: filterData, expLevel: e.target.id })
    } else {
      delete filterData["job_experience_level"];
      this.setState({ filterData: filterData, expLevel: "" })
    }
    this.getJobsDataApiCall('fromSearch')
  }

  handleProjectLength = (e) => {
    const { filterData } = this.state;
    if (e.target.checked) {
      filterData["job_duration"] = e.target.value;
      this.setState({ filterData: filterData, projectLength: e.target.value })
    } else {
      delete filterData["job_duration"];
      this.setState({ filterData: filterData, projectLength: "" })
    }
    this.getJobsDataApiCall('fromSearch')
  }

  handleWeekTimeChange = (e) => {
    const { filterData } = this.state;
    if (e.target.checked) {
      filterData["job_time_requirement"] = e.target.value;
      this.setState({ filterData: filterData, weekTime: e.target.value })
    } else {
      delete filterData["job_time_requirement"];
      this.setState({ filterData: filterData, weekTime: "" })
    }
    this.getJobsDataApiCall('fromSearch')
  }

  handleSortingOptions = (e) => {
    this.setState({ sortItem: e.target.value })
    this.getJobsDataApiCall('fromSearch')
  }

  handleByCertifi = (e) => {
    const {filterData} = this.state;
    if(e.target.checked){
      filterData["certification"] = e.target.id
      this.setState({filterData: filterData, certificateOption: e.target.id})
    }
    else {
      delete filterData["certification"]
      this.setState({filterData: filterData, certificateOption: ''})
    }
    this.getJobsDataApiCall('fromSearch')
  }


  handleLoadMore = (e) => {
    e.preventDefault()
    let {loadMore} = this.state
    // let {jobsForFreelancer} = this.props
    loadMore = loadMore + 1
    this.setState({loadMore: loadMore ,loadMoreClicked: true},() => {
      setTimeout(
        function() {
          this.getJobsDataApiCall('fromLoadMore')
        }.bind(this),
        1500)
    })
  }


  handleMultiSearch = (favour, sortItem, newSearchItem) => {
    this.setState({jobsForFreelancerData: []})
    this.props.getFilteredFreelancers(
      favour || this.state.favour,
      "search_jobs",
      this.state.filterData,
      "sort_by",
      sortItem || this.state.sortItem,
      "search",
      this.state.newSearchItem || newSearchItem,
      "find_jobs"
    ).then(res => {
       this.setState({jobsForFreelancerData: res})
    })
  }

  handleReset = (e) => {
    document.getElementById("sotyByClear").value = "";
    this.props.SetSearchVal("")
    this.setState({
      searchSection: true,
      savedSection: false,
      sortItem: "",
      jobType: [],
      filterData: {
        category: [],
      },
      expLevel: [],
      locationBox: [],
      availability: [],
      proficiencyLevel: [],
      projectLength: [],
      weekTime: [],
      addLocation: "Any Location",
      favour: "",
      newSearchItem: "",
      searchItem: "",
      jobCat: [],
      certificateOption: "",
      addCity: "Select City",
      value: "",
      suggestions: [],
      openStatus: false,
      activePage: 1,
      loadMore: 1,
      loadMoreClicked: false
    }, () => {
      this.getJobsDataApiCall('fromDidMount')
      this.refs.searchInputRef.value = "";

    })


  }

  OnEnterByCity = (e) => {
    e.preventDefault()
    this.handleLocationChange(e.target.childNodes[0].childNodes[0].value)
  }

  cityOnChange = (event, { newValue }) => {
    const { filterData } = this.state;

    if (!newValue || newValue.length === 0) {
      delete filterData["location"];
    } else {
      filterData["location"] = newValue;
    }
    this.setState({ filterData: filterData })
    this.getJobsDataApiCall('fromSearch')
    this.setState({
      value: newValue,
    })
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    })
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    })
  }

  returnCountryFlag = (qual) => {
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


  closeModal = () => {
    this.setState({ openLoginModal: false });
  }

  render() {
    const { SavedJobsForFreelancer, applicationIsLoading } = this.props;
    const {
      currentResponse,
      filterData,
      searchItem,
      searchSection,
      savedSection,
      jobType,
      expLevel,
      projectLength,
      weekTime,
      certificateOption,
      value,
      suggestions,
      jobsForFreelancerData,
      loadMoreClicked,
      hideLoadMore
    } = this.state;

    const isPublic = _.isEmpty(this.props.currentUser) ? true : false;

    const cityInputProps = {
      placeholder: "Enter City",
      value,
      onChange: this.cityOnChange,
    }

    const getCitySuggestionValue = (suggestion) => {
      const label = suggestion;
      this.handleLocationChange(label)
      return suggestion;
    }

    let lessThan = "<";

    return (
      <div className="job-search-new-page">
        {!_.isEmpty(this.props.currentUser) ? (
          this.props.currentUser.role === "Project Manager" ? (
            <ProjectManagerHeader history={this.props.history} />
          ) : (
            <FreelancerHeader history={this.props.history} />
          )
        ) : (
          <LandingPageHeader history={this.props.history} />
        )}
        <div className="tf_inter job-search-new-mn">
          <div className="container">

            <div className="col-md-2 col-sm-3 job-search-new-sidebar-filter-column">
              <div className="card card-body">
                <div className="find-freelancer-header job-search-new-filter-header">
                  <h4 className="find-freelancer-title">Filter By</h4>
                </div>
                <div className="post-edit-dropdown">
                  <h4 className="search_freelancer_filters_title font_size_title ">Category</h4>
                  <div onChange={this.handleGetFreelancer} name="jobCat">
                    <div className="tf_sound tf_sound1">
                      <input
                        type="checkbox"
                        name="Salesforce"
                        value="Salesforce"
                        checked={filterData.category.includes("Salesforce")}
                        id="Salesforce"
                      />
                      <label className="search_freelancer_filters" htmlFor="Salesforce">
                        {" "}
                        Salesforce{" "}
                      </label>
                    </div>
                    <div className="tf_sound tf_sound1">
                      <input
                        type="checkbox"
                        name="Salesforce"
                        value="AWS"
                        checked={filterData.category.includes("AWS")}
                        id="AWS"
                      />
                      <label className="search_freelancer_filters" htmlFor="AWS">
                        {" "}
                        AWS
                      </label>
                    </div>
                    <div className="tf_sound tf_sound1">
                      <input
                        type="checkbox"
                        name="Salesforce"
                        value="Oracle"
                        checked={filterData.category.includes("Oracle")}
                        id="Oracle"
                      />
                      <label className="search_freelancer_filters" htmlFor="Oracle">
                        {" "}
                        Oracle{" "}
                      </label>
                    </div>

                    <div className="tf_sound tf_sound1">
                      <input
                        type="checkbox"
                        name="IBM Cloud"
                        value="IBM Cloud"
                        checked={filterData.category.includes("IBM Cloud")}
                        id="IBM Cloud"
                      />
                      <label className="search_freelancer_filters" htmlFor="IBM Cloud">
                        {" "}
                        IBM Cloud{" "}
                      </label>
                    </div>


                    <div className="tf_sound tf_sound1">
                      <input
                        type="checkbox"
                        name="MS Azure"
                        value="MS Azure"
                        checked={filterData.category.includes("MS Azure")}
                        id="MS Azure"
                      />
                      <label className="search_freelancer_filters" htmlFor="MS Azure">
                        {" "}
                        MS Azure{" "}
                      </label>
                    </div>

                    <div className="tf_sound tf_sound1">
                      <input
                        type="checkbox"
                        name="Google Cloud"
                        value="Google Cloud"
                        checked={filterData.category.includes("Google Cloud")}
                        id="Google Cloud"
                      />
                      <label className="search_freelancer_filters" htmlFor="Google Cloud">
                        {" "}
                        Google Cloud{" "}
                      </label>
                    </div>

                  </div>
                </div>
              </div>

              <div className="card card-body">
                      <h4 className="search_freelancer_filters_title font_size_title ">
                       Certification Required
                       </h4>
                      <div onChange={this.handleByCertifi} name="certificateOption">
                        <div className="tf_sound tf_sound1" >
                          <input type="checkbox" name = "Yes"  checked={certificateOption.includes("Yes")}  id="Yes"/>
                        <label className="search_freelancer_filters" htmlFor="Yes"> Yes</label>
                        </div>
                        <div className="tf_sound tf_sound1" >
                          <input type="checkbox" name = "Yes"  checked={certificateOption.includes("No")}  id="No"/>
                        <label className="search_freelancer_filters" htmlFor="No"> No</label>
                        </div>
                      </div>
                  </div>

              <div className="card card-body">
                <h4 className="search_freelancer_filters_title font_size_title ">Job Type</h4>
                <div onChange={this.handleJobTypeChange} name="jobType">
                  <div className="tf_sound tf_sound1">
                    <input
                      type="checkbox"
                      name="Pay by hour"
                      value="Pay by hour"
                      checked={jobType.includes("Pay by hour")}
                      id="Pay by hour"
                    />
                    <label className="search_freelancer_filters" htmlFor="Pay by hour">
                      Hourly
                    </label>
                  </div>
                  <div className="tf_sound tf_sound1">
                    <input
                      type="checkbox"
                      name="hourly"
                      value="Pay a fixed price"
                      checked={jobType.includes("Pay a fixed price")}
                      id="Pay a fixed price"
                    />
                    <label className="search_freelancer_filters" htmlFor="Pay a fixed price">
                      Fixed Price
                    </label>
                  </div>
                </div>
              </div>

              <div className="card card-body">
                <h4 className="search_freelancer_filters_title font_size_title ">
                  Experience Level
                </h4>
                <div onChange={this.handleExpLevelChange} name="expLevel">
                  <div className="tf_sound tf_sound1">
                    <input
                      type="checkbox"
                      name="Fresher"
                      value="Fresher"
                      checked={expLevel.includes("Fresher")}
                      id="Fresher"
                    />
                    <label className="search_freelancer_filters" htmlFor="Fresher">
                      {" "}
                      Beginner
                    </label>
                  </div>
                  <div className="tf_sound tf_sound1">
                    <input
                      type="checkbox"
                      name="Fresher"
                      value="Intermediate"
                      checked={expLevel.includes("Intermediate")}
                      id="Intermediate"
                    />
                    <label className="search_freelancer_filters" htmlFor="Intermediate">
                      {" "}
                      Medium
                    </label>
                  </div>
                  <div className="tf_sound tf_sound1">
                    <input
                      type="checkbox"
                      name="Fresher"
                      value="Expert"
                      checked={expLevel.includes("Expert")}
                      id="Expert"
                    />
                    <label className="search_freelancer_filters" htmlFor="Expert">
                      {" "}
                      Expert{" "}
                    </label>
                  </div>
                </div>
              </div>

              <div className="card card-body">
                <h4 className="search_freelancer_filters_title font_size_title ">City</h4>
                <div className="tf_search search_user_for_chating">
                  <form onSubmit={this.OnEnterByCity}>
                    <Autosuggest
                      suggestions={suggestions}
                      onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                      onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                      getSuggestionValue={getCitySuggestionValue}
                      renderSuggestion={renderSuggestion}
                      inputProps={cityInputProps}
                    />
                  </form>
                </div>
              </div>

              <div className="card card-body">
                <h4 className="search_freelancer_filters_title font_size_title ">Project Length</h4>
                <div onChange={this.handleProjectLength} name="projectLength">
                  <div className="tf_sound tf_sound1">
                    <input
                      type="checkbox"
                      name="More than 6 Month"
                      value="More than 6 Month"
                      checked={projectLength.includes("More than 6 Month")}
                      id="More than 6 Month"
                    />
                    <label className="search_freelancer_filters" htmlFor="More than 6 Month">
                      {"> "}
                       6 Month{" "}
                    </label>
                  </div>
                  <div className="tf_sound tf_sound1">
                    <input
                      type="checkbox"
                      name="More than 6 Month"
                      value="3 to 6 Month"
                      checked={projectLength.includes("3 to 6 Month")}
                      id="3 to 6 Month"
                    />
                    <label className="search_freelancer_filters" htmlFor="3 to 6 Month">
                      {" "}
                      3 to 6 Month{" "}
                    </label>
                  </div>
                  <div className="tf_sound tf_sound1">
                    <input
                      type="checkbox"
                      name="More than 6 Month"
                      value="1 to 3 Month"
                      checked={projectLength.includes("1 to 3 Month")}
                      id=" 1 to 3 Month"
                    />
                    <label className="search_freelancer_filters" htmlFor=" 1 to 3 Month">
                      {" "}
                      1 to 3 Month
                    </label>
                  </div>
                  <div className="tf_sound tf_sound1">
                    <input
                      type="checkbox"
                      name="More than 6 Month"
                      value="Less than 1 month"
                      checked={projectLength.includes("Less than 1 month")}
                      id="Less than 1 month"
                    />
                    <label className="search_freelancer_filters" htmlFor="Less than 1 month">
                      {" "}
                      {lessThan} 1 month
                    </label>
                  </div>
                </div>
              </div>

              <div className="card card-body">
                <h4 className="search_freelancer_filters_title font_size_title ">Hours Per Week</h4>
                <div onChange={this.handleWeekTimeChange} name="weekTime">
                  <div className="tf_sound tf_sound1">
                    <input
                      type="checkbox"
                      name="More than 40 hours"
                      value="Less than 40 hours"
                      checked={weekTime.includes("Less than 40 hours")}
                      id="Less than 40 hours"
                    />
                    <label className="search_freelancer_filters" htmlFor="Less than 40 hours">
                      {" "}
                      {lessThan} 40 hours
                    </label>
                  </div>
                  <div className="tf_sound tf_sound1">
                    <input
                      type="checkbox"
                      name="More than 40 hours"
                      value="More than 40 hours"
                      checked={weekTime.includes("More than 40 hours")}
                      id="More than 40 hours"
                    />
                    <label className="search_freelancer_filters" htmlFor="More than 40 hours">
                      {"> "}
                       40 hours
                    </label>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="sidebar-reset-filter-button"
                onClick={this.handleReset}
              >
                Reset Filter
              </button>
            </div>

            <div className="col-md-10 col-sm-9">
              <div className="tf_saved_jobs">
                <div className="tab-content">
                  {searchSection && (
                    <div role="tabpanel" className="tab-pane active" id="SEARCH">
                      <div className="row"></div>

                        <div className="search-boxes-container">

                          <div className="search-tab-fl">
                            <div className="find-result-section">
                              <div className="tf_app_search job-search-new-landing-page">
                                <div className="row">
                                  <div className="col-md-9">
                                    <div className="input-group">
                                      <div className="tf_search">
                                        <form onSubmit={this.searchForJobs}>
                                          <input
                                            type="text"
                                            className="form-control mn_input searched-jobs-box-landing"
                                            ref="searchInputRef"
                                            placeholder="Search for Jobs"
                                            onChange={this.handleSearchChange}
                                            defaultValue={searchItem}
                                          />
                                        </form>
                                        <Link
                                          className="searched-jobs-url"
                                          to={"#"}
                                          onClick={this.searchForJobs}
                                        >
                                          <img
                                            className="searched-jobs-image"
                                            src={iconSearchWhite}
                                            alt="searchIcon"
                                          />
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-3">
                                    <div className="post-edit-dropdown">
                                        <div className="input-group">
                                          <select
                                            defaultValue=""
                                            className="form-control mn_input mySelectBoxclassName"
                                            onChange={this.handleSortingOptions}
                                            id="sotyByClear"
                                          >
                                            <option disabled={true} value="">
                                              Sort By
                                            </option>
                                            <option name="newest" value="Newest" id="Newest">
                                              Newest
                                            </option>
                                            <option
                                              name="clientRating"
                                              value="Rating"
                                              id="Rating"
                                            >
                                              Rating
                                            </option>
                                          </select>
                                        </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="clearfix"></div>

                          <div className="col-lg-12">
                            <div className="tf_job_found freelancer-count-color">
                              <p className="search-box-count">
                                {jobsForFreelancerData && jobsForFreelancerData.length} jobs found
                              </p>
                            </div>
                          </div>
                          <div className="clearfix"></div>
                        </div>

                          <div className="col-md-12 nopad tf_top">
                            <div className="">
                              {applicationIsLoading && !loadMoreClicked && (
                                <div className="grid-loader my-feed-loader col-md-12"
                                  style={{marginTop:'-100px'}}>
                                  <Loader type="Grid" color="#00BFFF" height={100} width={100} />
                                </div>
                              )}

                              {jobsForFreelancerData && jobsForFreelancerData.length > 0 ? (
                                jobsForFreelancerData.map((job) => {
                                  // const requiredExpertise = job.job_expertise_required
                                  //   ? job.job_expertise_required
                                  //   : [];
                                  const additionalExpertise = job.job_additional_expertise_required
                                    ? job.job_additional_expertise_required
                                    : [];
                                  const speciality = job && job.job_speciality ? job.job_speciality : [];
                                  const expertise = [...additionalExpertise, ...speciality];
                                  return (
                                    <div className="searched-jobs" key={job.id}>
                                      <div className="col-md-12">
                                        <div className=" tf_myfind_aws">
                                          <div className=" col-md-12 pay_certificate nopad">
                                            <div className="tf_payment_fail nopad">
                                              <p className="">

                                              </p>
                                            </div>
                                          </div>
                                          <div className="row">
                                                <div className="col-md-11 nopad">
                                                    <Link
                                                      to={{
                                                        pathname: !_.isEmpty(this.props.currentUser) ? `job-details/${job.uuid}` : `job-details/${job.uuid}/${true}`,
                                                        state: { isSearchJobNew: true, }
                                                      }}
                                                    >
                                                      <div className="col-md-10 col-sm-10  col-xs-10 nopad">
                                                        <h5 className="find_work_jobtitle">{
                                                          job.job_title
                                                        }
                                                        <img src={payment} title="Payment Verified" className="image_slab" alt="" />
                                                  {
                                                    job && job.get_job_qualification &&
                                                    job.get_job_qualification.qualification_group !==
                                                    "No" ? (
                                                      <img title="Certification Required" src={certification_required} alt="Certified" className="certification-required" />
                                                  ) : ""
                                                  }
                                                        </h5>
                                                      </div>
                                                      <div className="col-md-2 col-sm-2  col-xs-2 nopad">
                                                        <p className="tf_hire mt-10">
                                                        <Link
                                                          className="tf_apply_button"
                                                          onClick={() => {
                                                            !_.isEmpty(this.props.currentUser) ?
                                                            this.props.history.push(`job-details/${job.uuid}`)
                                                            :
                                                            this.setState({openLoginModal: true,jobId: job.uuid})
                                                            }

                                                            }>
                                                          APPLY
                                                        </Link>
                                                        </p>
                                                      </div>
                                                        {/* <SignUpPopUpNew
                                                          isOpen={this.state.openLoginModal}
                                                          closeModal={this.closeModal}
                                                          history={this.props.history}
                                                          fromJobDetails={true}
                                                          jobId={this.state.jobId}
                                                        /> */}
                                                    </Link>
                                                </div>
                                                <div className="col-md-1">
                                                    {!isPublic && (
                                                      <div className="col-md-12 col-sm-12 col-xs-12 tf_myfind_icons nopad">
                                                        {!job.favorited_job ? (
                                                          <Link
                                                            onClick={this.handleSavedJobs.bind(this, job.id)}
                                                            title="Favorited"
                                                          >
                                                            <i
                                                              className="fa fa-heart-o "
                                                              aria-hidden="true"
                                                            ></i>
                                                          </Link>
                                                        ) : (
                                                          <Link
                                                            onClick={this.handleRemovedJobs.bind(this, job.id)}
                                                            title="Favorited"
                                                          >
                                                            <i className="fa fa-heart" aria-hidden="true"></i>
                                                          </Link>
                                                        )}
                                                      </div>

                                                    )}
                                                </div>
                                          </div>



                                          <div className="clearfix"></div>

                                          <div className="col-md-12 tf_myfind_hour nopad">
                                            <p>
                                              <strong>{job.job_pay_type}</strong>
                                              <span>{job.job_experience_level}</span>
                                              <span>
                                                Est. Time: {job.job_duration},{" "}
                                                {job.job_time_requirement}
                                              </span>
                                              Posted{" "}
                                              <TimeAgo
                                                date={new Date(job.created_at).toUTCString()}
                                              />
                                            </p>
                                          </div>

                                          <div className="clearfix"></div>

                                          <div className="col-md-12 tf_myfind_conten nopad">
                                            {job.job_description && (
                                              <ReadMoreAndLess
                                                className="read-more-content"
                                                numberOfLines={2}
                                                charLimit={250}
                                                readMoreText="Read more"
                                                readLessText="Read less"
                                              >
                                                {job.job_description}
                                              </ReadMoreAndLess>
                                            )}
                                          </div>

                                          <div className="clearfix"></div>

                                          <div className="col-md-12 nopad">
                                            <div className="job-search-new-skills">
                                              {expertise.length > 0 &&
                                                <Skills
                                                  skill = {expertise}
                                                  id = {job.uuid}
                                                  to = {`/job-details/${job.uuid}/true`}
                                                  displayCount = {5}
                                                />
                                              }
                                            </div>
                                          </div>

                                          <div className="clearfix"></div>

                                          <div className="row">
                                              <div className="col-md-3 mt-20 mb-10">
                                                  <p className="">
                                                    Proposals: <strong>{job.proposal_count}</strong>
                                                  </p>
                                              </div>

                                              <div className="col-md-3 mt-20 mb-10">
                                                {this.returnStars(job && job.maximum_rating)}
                                                  <span style={{
                                                    color: '#0DA4DE',
                                                    fontWeight:'bold',
                                                    size: '14px',
                                                    marginLeft: '5px'}}>
                                                  </span>
                                              </div>

                                              <div className="col-md-3 mt-20 mb-10">
                                                  <p className="">
                                                    <strong>
                                                      $5k+ <span>spent</span>
                                                    </strong>
                                                  </p>
                                              </div>

                                              <div className="col-md-3 mt-20 mb-10 tf_payment_fail">
                                                <p className="">
                                                  <strong>
                                                    {
                                                      job && job.get_job_qualification ?
                                                      this.returnCountryFlag(job.get_job_qualification) : ''
                                                    }

                                                    {
                                                      job
                                                      &&
                                                      job.get_job_qualification
                                                      &&
                                                      (job.get_job_qualification.location || 'Anywhere')}
                                                  </strong>
                                                </p>
                                              </div>

                                          </div>

                                        </div>
                                      </div>
                                      <div className="clearfix"></div>
                                    </div>
                                  )
                                })
                              ) : (
                                <p className="text-center mt-20 mb-15">No Jobs to display.</p>
                              )}
                            </div>



                          { currentResponse.length > 0 && currentResponse.length > 4 ?
                            <div>
                            {
                              !hideLoadMore ?
                              <button className="load_more_btn_find_work mt-10" onClick={this.handleLoadMore}>
                              Show More
                              </button>
                              :
                              ''
                            }

                              {loadMoreClicked ? <img src={loadMoreSrc} className="mt-10 ml-10" alt=""/> : ''}
                              </div>
                            :
                            ''
                          }
                          </div>




                      <div className="clearfix"></div>
                    </div>
                  )}

                  <div id="JOBS">
                    <div className="col-md-12 nopad">
                      <div>
                        {savedSection &&
                          !_.isEmpty(SavedJobsForFreelancer) &&
                          SavedJobsForFreelancer.map((job) => {
                            // const requiredExpertise = job.job_expertise_required
                            //   ? job.job_expertise_required
                            //   : [];
                            const additionalExpertise = job.job_additional_expertise_required
                              ? job.job_additional_expertise_required
                              : [];
                            const expertise = [...additionalExpertise];
                            return (
                              <div className="saved-jobs" key={job.id}>
                                <div className="col-md-12">
                                  <div className="tf_myfind_aws">
                                    <Link to={`job-details/${job.uuid}`}>
                                      <div className="col-md-12 col-sm-12  col-xs-12 nopad">
                                        <h5>{job.job_title}</h5>
                                      </div>
                                    </Link>
                                    <div className="col-md-4 col-sm-6 col-xs-4 tf_myfind_icons nopad">
                                      <Link to={"#"}>
                                        <img
                                          src="/static/media/outline-thumb_down_alt-24px.144b2c90.svg"
                                          alt=""
                                        />
                                      </Link>
                                      <Link
                                        to={"#"}
                                        onClick={this.handleRemovedJobs.bind(this, job.id)}
                                      >
                                        <i className="fa fa-heart" aria-hidden="true"></i>
                                      </Link>
                                    </div>
                                    <div className="clearfix"></div>
                                    <div className="col-md-12 tf_myfind_hour nopad">
                                      <p>
                                        <strong>{job.job_pay_type}</strong>{" "}
                                        <span>{job.job_experience_level}</span>{" "}
                                        <span>
                                          Est. Time: {job.job_duration}, {job.job_time_requirement}
                                        </span>{" "}
                                        Posted{" "}
                                        <TimeAgo date={new Date(job.created_at).toUTCString()} />
                                      </p>
                                    </div>
                                    <div className="clearfix"></div>
                                    <div className="col-md-12 tf_myfind_conten nopad">
                                      {job.job_description && (
                                        <ReadMoreAndLess
                                          className="read-more-content"
                                          charLimit={150}
                                          readMoreText="Read more"
                                          readLessText="Read less"
                                        >
                                          {job.job_description}
                                        </ReadMoreAndLess>
                                      )}
                                    </div>
                                    <div className="col-md-12 nopad">
                                      <div className="job-search-new-skills tf_skills">
                                      {expertise.length > 0 &&
                                        <Skills
                                          skill = {expertise}
                                          to="#"
                                          id={0}
                                          displayCount = {expertise.length}
                                        />
                                      }
                                      </div>
                                    </div>
                                    <div className="col-md-12 tf_proposal nopad">
                                      <p>
                                        Proposals: <strong>{job.proposal_count}</strong>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="clearfix"></div>
                                <hr />
                              </div>
                            )
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  ...state,
})

const mapDispatchToProps = (dispatch) => {
  return {
    savedApprove: (id) => dispatch(savedApproveFreelancer(id)),
    removeJobs: (id) => dispatch(removeJobsFreelancer(id)),
    getSavedJobsForFreelancer: () => dispatch(getSavedJobsForFreelancer()),
    SetSearchVal: (value) => dispatch(SetSearchVal(value)),
    SetSearchJobVal: (value) => dispatch(SetSearchJobVal(value)),
    getUnAuthorizedFreelancer: (newSearchBy, newSearch,pageNumber) =>
      dispatch(getUnAuthorizedFreelancer(newSearchBy, newSearch,pageNumber)),
    getSearchedJobs: (searchBy, searchItem) =>
      dispatch(getSearchedJobsForFreelancer(searchBy, searchItem)),
    getFilteredFreelancers: (
      favour,
      searchBy,
      searchItem,
      sortBy,
      sortItem,
      search,
      newSearchItem,
      dataType
    ) =>
      dispatch(
        getFilteredFLForHiringMan(
          favour,
          searchBy,
          searchItem,
          sortBy,
          sortItem,
          search,
          newSearchItem,
          dataType
        )
      ),
      getFilteredFreelancersWithPagination: (
      favour,
      searchBy,
      searchItem,
      sortBy,
      sortItem,
      search,
      newSearchItem,
      dataType,
      loadMore
    ) =>
      dispatch(
        getFilteredFreelancersWithPagination(
          favour,
          searchBy,
          searchItem,
          sortBy,
          sortItem,
          search,
          newSearchItem,
          dataType,
          loadMore
        )
      ),
      getJobsData: (dataType,searchParameters,sortBy,pageNumber,sendSearch,searchItemValue) =>
        dispatch(getJobsData(dataType,searchParameters,sortBy,pageNumber,sendSearch,searchItemValue)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchedJobs)
