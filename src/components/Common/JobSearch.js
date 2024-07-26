import React, { Component } from 'react';
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
import { savedApproveFreelancer, removeJobsFreelancer, fetchFreelancerJob } from "../../Actions/freelancerActions";
import iconSearchWhite from "../../static/images/Icon_Search_white.svg";
import Autosuggest from "react-autosuggest";
import { SetSearchVal, SetSearchJobVal } from "../../Actions/SearchActions";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import TimeAgo from "react-timeago";
import ReadMoreAndLess from "react-read-more-less";
import _ from "lodash";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import CITIES from "../../constants/cities";
import payment from "../../static/images/pay_dark_color.png";
import Footer from '../miscellaneous/Footer';
import loadMoreSrc from "../../static/images/loadMore.gif";
import globeSrc from "../../static/images/globe.png";
import CITYWITHCOUNTRY from "../../constants/cityWithCountries";
import ReactCountryFlag from "react-country-flag"
import SignUpPopUpNew from "../miscellaneous/SignUpPopUpNew";
import certification_required from "../../static/images/certification-required.png";
import Skills from './Skills'
import pay_dark_color from "../../static/images/pay_dark_color.png";
import Modal from "react-modal";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Amazon_Web_Services from "../../../src/static/images/category/aws.png";
import Salesforce from "../../../src/static/images/category/salesforce.png";
import Oracle_Cloud from "../../../src/static/images/category/oracle_cloud.png";
import google_cloud from "../../../src/static/images/category/google_cloud.png";
import google_cloud_list from "../../../src/static/images/category/google_cloud_list.png";
import ms_azure from "../../../src/static/images/category/ms_azure.png";
import ms_azure_list from "../../../src/static/images/category/ms_azure_list.png";
import NoDataFoundMessage from './NodataFoundMessage/NoDataFoundMessage';

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



const cities = CITIES;
const getSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase()
  const inputLength = inputValue.length;
  return inputLength === 0
    ? []
    : cities.filter((city) => city.toLowerCase().slice(0, inputLength) === inputValue)
}

const renderSuggestion = (suggestion) => <div>{suggestion}</div>;

const patternItem = (x, lastNum) => {
  return x % lastNum + 1;
}

class JobNewSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewToShow: 'grid',
      searchSection: true,
      savedSection: false,
      openModal: false,
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
      jobVisibility: [],
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
      jobId: '',
      jobDetail: '',
      currentArrayKey: 0
    }
  }

  handleOPenModal = (row, i, e) => {
    e.preventDefault();
    this.setState({ openModal: true, currentArrayKey: i + 1 })
    this.props.fetchFreelancerJob(row.uuid, true).then(
      (res) => {
        this.setState({ jobDetail: res.job })
      }).catch(err => {
        console.log('1')
      })
  }

  closeModals = () => {
    this.setState({ jobDetail: '', openModal: false })
  }

  changeProfile = (id, type) => {
    let key = ''
    // console.log(this.state.currentArrayKey, '==',this.state.jobsForFreelancerData.length)
    this.state.jobsForFreelancerData.map((row, index) => {
      if (row.id === id) {
        if (type === 'next') {
          key = index + 1
        } else {
          key = index - 1
        }
        // console.log('key==',key)
        this.props.fetchFreelancerJob(this.state.jobsForFreelancerData[key].uuid, true).then(
          (res) => {
            this.setState({ jobDetail: res.job, currentArrayKey: key + 1 })
          }
        )
      }
      return row
    })
  }

  handleChangeView = (view) => {
    this.setState({ viewToShow: view })
  }
  componentDidMount() {
    let location = this.props.history.location
    if (location && location.state && location.state.search && location.state.search.length > 0) {
      this.setState({ searchItem: this.props.location.state.search }, () => {
        this.getJobsDataApiCall('fromDidMount')
      })
    }
    else {
      this.getJobsDataApiCall('fromDidMount')
    }
  }

  handleDraftPageChange = (pageNumber) => {
    this.setState({ activePage: pageNumber })
  }

  getJobsDataApiCall = (type) => {
    let { jobsForFreelancerData, loadMore } = this.state
    if (type === "fromSearch" && loadMore === 1) {
      this.setState({ loadMore: 1, jobsForFreelancerData: [] },
        () => {
          this.callApi('searchFirstTime')
        }
      )
    }

    else if (type === "fromSearch" && loadMore > 1 && jobsForFreelancerData.length >= 5) {
      this.setState({ loadMore: 1, jobsForFreelancerData: [] }, () => {
        this.callApi('searchNextTime')
      })
    }

    else if (type === "fromSearch" && loadMore > 1) {
      this.setState({ loadMore: 1 }, () => {
        this.callApi('searchNextTime')
      })
    }

    else if (type === "fromLoadMore") {
      this.setState({
        loadMore: loadMore
      },
        () => {
          this.callApi('fromLoadMore')
        }
      )
    }
    else if (type === "fromDidMount") {
      this.callApi('fromDidMount')
    }

  }

  callApi = (type) => {
    let dataType = "find_jobs"
    // let sortBy = null
    let { jobsForFreelancerData, loadMore, filterData, searchItem, sortItem } = this.state
    let sendSearch = false
    let searchParameters = {}
    let searchItemValue = searchItem || ''

    searchParameters = filterData
    this.props.getJobsData(dataType, searchParameters, sortItem, loadMore, sendSearch, searchItemValue).then(res => {

      if (!res.length && type === "fromLoadMore") {
        this.setState({
          hideLoadMore: true,
          loadMoreClicked: false
        })
        return
      }

      if (type === "fromDidMount") {
        this.setState({ currentResponse: res, jobsForFreelancerData: res, loadMoreClicked: false })
      }

      if (type === "fromLoadMore") {
        if (jobsForFreelancerData.length > 0) {
          jobsForFreelancerData.push(...res)
          if (res.length === 0) {
            jobsForFreelancerData = []
          }
          this.setState({ currentResponse: res, jobsForFreelancerData: jobsForFreelancerData, loadMoreClicked: false })
        }
        else {
          this.setState({ currentResponse: res, jobsForFreelancerData: res, loadMoreClicked: false })
        }
      }

      if (type === "searchFirstTime") {
        this.setState({ currentResponse: res, jobsForFreelancerData: res, loadMoreClicked: false })
      }

      if (type === "searchNextTime") {
        if (jobsForFreelancerData.length > 0) {
          jobsForFreelancerData.push(...res)
          if (res.length === 0) {
            jobsForFreelancerData = []
          }
          this.setState({ currentResponse: res, jobsForFreelancerData: jobsForFreelancerData, loadMoreClicked: false })
        }
        else {
          this.setState({ currentResponse: res, jobsForFreelancerData: res, loadMoreClicked: false })
        }
      }

    }
    )
  }


  callUnAUth = () => {
    let { loadMore, jobsForFreelancerData } = this.state
    this.props.getUnAuthorizedFreelancer("find_jobs", null, loadMore).then(() => {
      this.setState({ loadMoreClicked: false })
      if (jobsForFreelancerData.length === 0 && this.props.jobsForFreelancer.length > 0) {
        jobsForFreelancerData = this.props.jobsForFreelancer
      }
      else if (this.props.jobsForFreelancer.length > 0) {
        jobsForFreelancerData.push(...this.props.jobsForFreelancer)
      }
      this.setState({ jobsForFreelancerData })
    })
  }

  callMulti = () => {
    let { jobsForFreelancerData } = this.state
    this.setState({ searchItem: "", newSearchItem: "" }, () => {
      this.setState({ loadMoreClicked: false })
      this.refs.searchInputRef.value = "";
      this.props.SetSearchVal("")
      this.props.getUnAuthorizedFreelancer("find_jobs", null).then(() => {
        if (jobsForFreelancerData.length === 0 && this.props.jobsForFreelancer.length > 0) {
          jobsForFreelancerData = this.props.jobsForFreelancer
        }
        else if (this.props.jobsForFreelancer.length > 0) {
          jobsForFreelancerData.push(this.props.jobsForFreelancer)
        }
        this.setState({ jobsForFreelancerData })
      })
    })
  }


  getJobs = (searchBy, searchItem) => {
    this.props.getSearchedJobs(searchBy, searchItem)
  }

  searchForJobs = (e) => {
    e.preventDefault()
    !_.isEmpty(this.props.currentUser)
      ? this.props.SetSearchVal(this.state.searchItem)
      : this.props.SetSearchJobVal(this.state.searchItem)
    !_.isEmpty(this.props.currentUser)
      ? this.getJobs("search", this.state.searchItem)
      : this.getJobsDataApiCall('fromSearch')
  }

  handleSearchChange = (e) => {
    this.setState({ searchItem: e.target.value })
  }

  handleSavedJobs = (id, event) => {
    event.currentTarget.firstElementChild.classList.remove("fa-heart-o")
    event.currentTarget.firstElementChild.classList.add("fa-heart")
    this.props.savedApprove(id).then((res) => {
      if (res.status === 200) {
        this.props.getSearchedJobs("search", this.state.searchItem)
      }
    })
  }

  handleRemovedJobs = (id, event) => {
    event.currentTarget.firstElementChild.classList.remove("fa-heart")
    event.currentTarget.firstElementChild.classList.add("fa-heart-o")
    this.props.removeJobs(id).then((res) => {
      if (res.status === 200) {
        this.props.getSearchedJobs("search", this.state.searchItem)
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
      category.splice(index, 1)
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

  handleVisibilityChange = (e) => {
    const { filterData } = this.state;
    if (e.target.checked) {
      filterData["job_visibility"] = e.target.value;
      this.setState({ filterData: filterData, jobVisibility: e.target.value })
    } else {
      delete filterData["job_visibility"];
      this.setState({ filterData: filterData, jobVisibility: "" })
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
    const { filterData } = this.state;
    if (e.target.checked) {
      filterData["certification"] = e.target.id
      this.setState({ filterData: filterData, certificateOption: e.target.id })
    }
    else {
      delete filterData["certification"]
      this.setState({ filterData: filterData, certificateOption: '' })
    }
    this.getJobsDataApiCall('fromSearch')
  }


  handleLoadMore = (e) => {
    e.preventDefault()
    let { loadMore } = this.state
    // let {jobsForFreelancer} = this.props
    loadMore = loadMore + 1
    this.setState({ loadMore: loadMore, loadMoreClicked: true }, () => {
      setTimeout(
        function () {
          this.getJobsDataApiCall('fromLoadMore')
        }.bind(this),
        1500)
    })
  }


  handleMultiSearch = (favour, sortItem, newSearchItem) => {
    this.setState({ jobsForFreelancerData: [] })
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
      this.setState({ jobsForFreelancerData: res })
    })
  }

  categoriesArr = (cat) => {
    if (cat === "AWS") {
      return <LazyLoadImage
        alt={"Amazon_Web_Services"}
        src={Amazon_Web_Services}
      />
    } else if (cat === "Google Cloud") {
      return <LazyLoadImage
        alt={"google_cloud_list"}
        src={google_cloud_list}
      />
    } else if (cat === "Salesforce") {
      return <LazyLoadImage
        alt={"Salesforce"}
        src={Salesforce}
      />
    } else if (cat === "Oracle") {
      return <LazyLoadImage
        alt={"Oracle_Cloud"}
        src={Oracle_Cloud}
      />
    } else if (cat === "MS Azure") {
      return <LazyLoadImage
        alt={"ms_azure_list"}
        src={ms_azure_list}
      />
    }
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
      jobVisibility: [],
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

    if (qual && qual.location) {
      let codeObj = CITYWITHCOUNTRY.find(c => (c.city === qual.location))

      if (codeObj && codeObj.code) {
        data = <ReactCountryFlag
          countryCode={codeObj.code}
          svg
          style={{
            width: "1.8em",
            height: "1.0em",
            marginLeft: "0px",
            marginRight: "12px",
          }}
          title={"country"}
        />
      }
      else {
        data = <span> <img
          src={globeSrc}
          style={{ height: '16px', width: '16px', marginRight: '-10px', marginTop: '-2px' }}
          alt=""
        />
        </span>
      }
    }

    else {
      data = <span> <img
        src={globeSrc}
        style={{ height: '16px', width: '16px', marginRight: '-10px', marginTop: '-2px' }}
        alt=""
      />
      </span>
    }
    return data
  }
  returnCountryFlag1 = (qual) => {
    let data;

    if (qual && qual.location) {
      let codeObj = CITYWITHCOUNTRY.find(c => c.city === qual.location)

      if (codeObj && codeObj.code) {
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
        data = <span> <img
          src={globeSrc}
          style={{ height: '24px', width: '24px', marginRight: '-10px', marginTop: '-2px' }} alt=""
        />
        </span>
      }
    }

    else {
      data = <span> <img
        src={globeSrc}
        style={{ height: '24px', width: '24px', marginRight: '-10px', marginTop: '-2px' }} alt=""
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
        key={i}
        style={{ color: i + 1 > value ? '#ffd300' : '#0DA4DE', fontSize: '18px' }}
      >
      </i>)
    }
    return stars;
  }


  closeModal = () => {
    this.setState({ openLoginModal: false });
  }

  checkEst = (value) => {
    if (value.substr(0, 9) === "Less than") {
      return "< " + value.substr(9)
    } else if (value.substr(0, 9) === "More than") {
      return "> " + value.substr(9)
    }
    return value
  }

  render() {

    const { SavedJobsForFreelancer, applicationIsLoading } = this.props;
    const {
      currentResponse,
      filterData,
      sortItem,
      searchItem,
      searchSection,
      savedSection,
      jobType,
      expLevel,
      projectLength,
      jobVisibility,
      weekTime,
      certificateOption,
      value,
      suggestions,
      jobsForFreelancerData,
      loadMoreClicked,
      hideLoadMore,
      viewToShow
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
    // console.log("-----",this.state)

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
        {viewToShow === 'grid' ?
          <div className="tf_inter job-search-new-mn job-search-box">
            <div className="container">
              <div className="tf-find-freelancer">
                <div className='row'>
                  <div className='col-md-12 mb-2'>
                    <h1 className='find-work_title'>Jobs</h1>
                  </div>
                  {/* <div className='col-md-12'>
                    <ul className='find-work-logo-skill-list'>
                      <div className="">
                        <div onChange={this.handleGetFreelancer} name="jobCat" className='post-edit-dropdown find-work-logo-skill-inner-list'>
                          <div className="tf_sound tf_sound1">
                            <input
                              type="checkbox"
                              name="Salesforce"
                              value="Salesforce"
                              checked={filterData.category.includes("Salesforce")}
                              id="Salesforce"
                            />
                            <label className={`search_freelancer_filters filter-job-img ${filterData.category.includes("Salesforce") ? 'filter-find-img-check' : ''} `} htmlFor="Salesforce">
                              <LazyLoadImage
                                alt={"Salesforce"}
                                src={Salesforce}
                              />
                            </label>
                          </div>
                          <div className="tf_sound tf_sound1">
                            <input
                              type="checkbox"
                              name="AWS"
                              value="AWS"
                              checked={filterData.category.includes("AWS")}
                              id="AWS"
                            />
                            <label className={`search_freelancer_filters filter-job-img ${filterData.category.includes("AWS") ? 'filter-find-img-check' : ''} `} htmlFor="AWS">
                              <LazyLoadImage
                                alt={"Amazon_Web_Services"}
                                src={Amazon_Web_Services}
                              />
                            </label>
                          </div>
                          <div className="tf_sound tf_sound1">
                            <input
                              type="checkbox"
                              name="Oracle"
                              value="Oracle"
                              checked={filterData.category.includes("Oracle")}
                              id="Oracle"
                            />
                            <label className={`search_freelancer_filters filter-job-img ${filterData.category.includes("Oracle") ? 'filter-find-img-check' : ''} `} htmlFor="Oracle">
                              <LazyLoadImage
                                alt={"Oracle_Cloud"}
                                src={Oracle_Cloud}
                              />
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
                            <label className={`search_freelancer_filters filter-job-img ${filterData.category.includes("MS Azure") ? 'filter-find-img-check' : ''} `} htmlFor="MS Azure">
                              <LazyLoadImage
                                alt={"ms_azure"}
                                src={ms_azure}
                              />
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
                            <label className={`search_freelancer_filters filter-job-img ${filterData.category.includes("Google Cloud") ? 'filter-find-img-check' : ''} `} htmlFor="Google Cloud">
                              <LazyLoadImage
                                alt={"google_cloud"}
                                src={google_cloud}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </ul>
                  </div> */}
                </div>
                {/* <div className="col-md-12">
                  <hr />
                </div> */}
                <div className="col-md-12 p-0">
                  <div className="tab-content">
                    {searchSection && (
                      <div role="tabpanel" className="tab-pane active" id="SEARCH">
                        <div className="">
                          <>
                            {/* searched-jobs-new */}
                            {/* <div className="row">
                            <div className="col-md-5">
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
                            <div className="col-md-4">
                              <div className="post-edit-dropdown">
                                <select
                                  defaultValue={sortItem}
                                  className="form-control mn_input mySelectBoxclassName mt-15"
                                  onChange={this.handleSortingOptions}
                                  id="sotyByClear"
                                >
                                  <option disabled={true} value="">
                                    Sort By
                                  </option>
                                  <option name="newest" value="Newest" id="Newest">
                                    Newest
                                  </option>
                                  <option name="clientRating"
                                    value="Rating"
                                    id="Rating"
                                  >
                                    Rating
                                  </option>
                                </select>
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div id="list-view-grid-view-button-container" className="input-group">
                                <button
                                  className="btn"
                                  onClick={() =>
                                    this.handleChangeView("list")
                                  }
                                >
                                  {" "}
                                  <i
                                    className="fa fa-list"
                                    aria-hidden="true"
                                  ></i>
                                  {" "}
                                  List{" "}
                                </button>
                                <button
                                  className="btn active"
                                  onClick={() =>
                                    this.handleChangeView("grid")
                                  }
                                >
                                  {" "}
                                  <i
                                    className="fa fa-th-large"
                                    aria-hidden="true"
                                  ></i>
                                  {" "}
                                  Grid{" "}
                                </button>
                                <button className="btn ml-10"
                                  data-toggle="collapse"
                                  href="#horizontal-filters"
                                  role="button"
                                  aria-expanded="false"
                                  aria-controls="horizontal-filters"
                                >
                                  <i className="fa fa-filter" aria-hidden="true"></i>
                                  {" "}
                                  Filter{" "}
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12">
                              <div className="tf_job_found freelancer-count-color">
                                <p className="search-box-count">{jobsForFreelancerData && jobsForFreelancerData.length} jobs found</p>
                              </div>
                            </div>
                          </div> */}
                          </>
                        </div>
                        <div className="box-shadow-none panel panel-primary m-0" id="toggle-box-for-filters">
                          <div className="col-md-12 collapse multi-collapse border-grey-section" id="horizontal-filters">
                            <div className="panel-body" id="horizontal-filters-body-for-list-view">
                              <div className="col-md-4">
                                <div className="card card-body">
                                  <h4 className="search_freelancer_filters_title">Project Length</h4>
                                  <div onChange={this.handleProjectLength} name="projectLength" id="projectLength">
                                    <div className="tf_sound tf_sound1">
                                      <input
                                        type="checkbox"
                                        name="More than 6 Month"
                                        value="More than 6 Month"
                                        checked={projectLength.includes("More than 6 Month")}
                                        id="More than 6 Month"
                                      />
                                      <label className="search_freelancer_filters" htmlFor="More than 6 Month">
                                        {'>'} 6 Month{" "}
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
                                  <h4 className="search_freelancer_filters_title">Job Visibility</h4>
                                  <div onChange={this.handleVisibilityChange} name="jobVisibility" id="jobVisibility">
                                    <div className="tf_sound tf_sound1">
                                      <input
                                        type="checkbox"
                                        name="job_visibility"
                                        value="Public"
                                        checked={jobVisibility.includes("Public")}
                                        id="Public"
                                      />
                                      <label className="search_freelancer_filters" htmlFor="Public">
                                        {" "}
                                        Public{" "}
                                      </label>
                                    </div>
                                    <div className="tf_sound tf_sound1">
                                      <input
                                        type="checkbox"
                                        name="job_visibility"
                                        value="Featured"
                                        checked={jobVisibility.includes("Featured")}
                                        id=" Featured"
                                      />
                                      <label className="search_freelancer_filters" htmlFor=" Featured">
                                        {" "}
                                        Featured
                                      </label>
                                    </div>
                                    <div className="tf_sound tf_sound1">
                                      <input
                                        type="checkbox"
                                        name="job_visibility"
                                        value="Urgent"
                                        checked={jobVisibility.includes("Urgent")}
                                        id="Urgent"
                                      />
                                      <label className="search_freelancer_filters" htmlFor="Urgent">
                                        {" "}
                                        Urgent
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="card card-body">
                                  <h4 className="search_freelancer_filters_title">Job Type</h4>
                                  <div onChange={this.handleJobTypeChange} name="jobType" id="jobType">
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
                                  <h4 className="search_freelancer_filters_title">
                                    Experience Level
                                  </h4>
                                  <div onChange={this.handleExpLevelChange} name="expLevel" id="expLevel">
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
                                  <h4 className="search_freelancer_filters_title">
                                    Certification Required
                                  </h4>
                                  <div onChange={this.handleByCertifi} name="certificateOption" id="certificateOption">
                                    <div className="tf_sound tf_sound1" >
                                      <input type="checkbox" name="Yes" checked={certificateOption.includes("Yes")} id="Yes" />
                                      <label className="search_freelancer_filters" htmlFor="Yes"> Yes</label>
                                    </div>
                                    <div className="tf_sound tf_sound1" >
                                      <input type="checkbox" name="Yes" checked={certificateOption.includes("No")} id="No" />
                                      <label className="search_freelancer_filters" htmlFor="No"> No</label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div className="card card-body">
                                  <h4 className="search_freelancer_filters_title">Hours Per Week</h4>
                                  <div onChange={this.handleWeekTimeChange} name="weekTime" id="weekTime">
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
                                <div className="card card-body">
                                  <h4 className="search_freelancer_filters_title">City</h4>
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
                                  <button type="button" className="sidebar-reset-filter-button mt-20" onClick={this.handleReset}>
                                    Reset Filter
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="">
                          <div className="tf_myfeed job-search-new-landing-box" id="find-work-grid-view">
                            {applicationIsLoading && !loadMoreClicked && jobsForFreelancerData && jobsForFreelancerData.length === 0 && (
                              <div className="grid-loader my-feed-loader col-md-12" style={{ marginTop: '-100px' }}>
                                <Loader type="Grid" color="#00BFFF" height={100} width={100} />
                              </div>
                            )}

                            {jobsForFreelancerData && jobsForFreelancerData.length > 0 ? (
                              jobsForFreelancerData.map((job, i) => {
                                // const requiredExpertise = job.job_expertise_required
                                //   ? job.job_expertise_required
                                //   : [];
                                const additionalExpertise = job.job_additional_expertise_required
                                  ? job.job_additional_expertise_required
                                  : [];
                                const speciality = job && job.job_speciality ? job.job_speciality : [];
                                const expertise = [...additionalExpertise, ...speciality];
                                return (
                                  <div className={"col-md-4 column-number-" + patternItem(i, 3)} id="search-job-grid-view-box">


                                    <div className="searched-jobs-new text-center" key={job.id}>
                                      {/* <div className="grid-view-profile-colored-background">
                                                </div> */}
                                      {/* style={{borderTop: "0px solid #"+Math.floor(Math.random()*16777215).toString(16)}} */}
                                      <div className="col-md-12 text-left">
                                        <div className=" tf_myfind_aws tf_myfind_aws-new">
                                          <div className=" col-md-12 pay_certificate nopad">

                                          </div>
                                          <div className="row">

                                            <div className="col-md-12 nopad">

                                              <Link to={"#"}
                                                onClick={this.handleOPenModal.bind(this, job, i)}
                                              >
                                                <div className="col-md-12 col-sm-10  col-xs-10 nopad">
                                                  <p title={job.job_title} style={{ color: '#0DA4DE', display: 'flex' }}>
                                                    <span>
                                                      <div className='job__search-tag-container'>
                                                        <img
                                                          src={payment}
                                                          className="image_slab job__search-tag-img"
                                                          title="Payment Verified"
                                                          alt="" />
                                                      </div>
                                                    </span>
                                                    <div className='txt-ellipsis'>
                                                      <span className='find-work_title ml-20'>
                                                        {job.job_title.length > 28 ?
                                                          `${job.job_title.substring(0, 28)}...` : `${job.job_title}`}
                                                      </span>
                                                      <br />
                                                      <div className='ml-20 d-flex vt-center'>
                                                        <span>
                                                        {this.returnStars(job && job.maximum_rating)}
                                                        <span style={{
                                                          color: '#0DA4DE',
                                                          fontWeight: 'bold',
                                                          size: '14px',
                                                          marginLeft: '5px'
                                                        }}>
                                                          <br /><span className='text-muted'><small>Posted 9 min ago</small></span>
                                                        </span>
                                                        </span>
                                                        <span className="ml-20">
                                                          <span className={"job_search-tags-" + job.job_visibility.toLowerCase()}>{job.job_visibility}</span>
                                                          {/* <span className='job_search-tag-public btn'>Public</span> */}
                                                          <span>
                                                            {
                                                              job && job.get_job_qualification &&
                                                                job.get_job_qualification.qualification_group !==
                                                                "No" ? (
                                                                <img src={certification_required} alt="Certified" title="Certification Required" className="certification-required" />
                                                              ) : ""
                                                            }
                                                          </span>
                                                        </span>
                                                      </div>
                                                    </div>
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
                                                      to={"#"}
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
                                                      to={"#"}
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

                                          <div className="col-md-12 nopad">
                                            <div className="short-description">
                                              {/* {`${job.job_description.substring(0, 80)}...`}{" "} */}
                                              {job.job_description}
                                            </div>
                                          </div>

                                          <div className="clearfix"></div>
                                         <div className='text-center'>
                                           <div className="col-md-12 nopad mb-15">
                                            <strong>Experience:</strong>&nbsp;&nbsp;Fresher
                                          </div>

                                          <div className="col-md-12 nopad mb-15">
                                            <strong>Estimated time:</strong>&nbsp;&nbsp;<span>1 month</span>
                                          </div>

                                          <div className="col-md-12 nopad mb-15">
                                            <strong>Time required:</strong>&nbsp;&nbsp;40 hours
                                          </div>

                                          <div className="col-md-12 nopad mb-15">
                                            <strong>Pay Type:</strong>&nbsp;&nbsp;{job.job_pay_type}
                                          </div>

                                          {/* <div className="col-md-6 nopad mb-15">
                                            <div className=""><strong>Rating:</strong>&nbsp;&nbsp;
                                              {this.returnStars(job && job.maximum_rating)}

                                              <span style={{
                                                color: '#0DA4DE',
                                                fontWeight: 'bold',
                                                size: '14px',
                                                marginLeft: '5px'
                                              }}>
                                              </span>
                                            </div>
                                          </div> */}

                                          {/* <div className="col-md-6 nopad mb-15">
                                            <strong>Spending:</strong>&nbsp;&nbsp;$10k
                                          </div> */}

                                          <div className="col-md-12 nopad tf_payment_fail mb-15">
                                            <strong>Location:</strong>&nbsp;&nbsp;
                                            <span>
                                              {/* {
                                                              job && job.get_job_qualification ?
                                                              this.returnCountryFlag(job.get_job_qualification) : ''
                                                            } */}

                                              {
                                                job
                                                &&
                                                job.get_job_qualification
                                                &&
                                                (job.get_job_qualification.location || 'Anywhere')}
                                            </span>
                                          </div>

                                          {/* <div className="col-md-6 nopad mb-15">
                                            <strong>Proposals:</strong>&nbsp;&nbsp;0
                                          </div> */}
                                         </div>

                                          <div className="col-md-12 nopad">
                                            <div className="job-search-new-skills mb-10 justify_content-center">
                                              {expertise.length > 0 &&
                                                <Skills
                                                  skill={expertise}
                                                  id=""
                                                  to=""
                                                  displayCount={1}
                                                  cursorDisabled={true}
                                                  gridWords={true}
                                                />
                                              }
                                            </div>


                                          </div>

                                          <div className="clearfix"></div>

                                        </div>
                                        <div className="col-md-12 col-sm-12  col-xs-12 nopad">
                                          <p className="">
                                            <Link to={"#"}
                                              className="btn-primary-base m-0"
                                              onClick={(e) => {
                                                e.preventDefault();
                                                !_.isEmpty(this.props.currentUser) ?
                                                  this.props.history.push(`job-details/${job.uuid}`)
                                                  :
                                                  this.props.history.push({ pathname: `/sign-up`, state: "Freelancer" })
                                                // this.setState({ openLoginModal: true, jobId: job.uuid })
                                              }

                                              }>
                                              Apply to this Job
                                            </Link>
                                          </p>
                                        </div>
                                      </div>
                                      <div className="clearfix"></div>
                                      <div className="searched-job-space">
                                      </div>
                                    </div>
                                  </div>
                                )
                              })
                            ) : (
                              <NoDataFoundMessage 
                              message={"No Jobs to display."}
                              />
                              // <p className="text-center mt-20 mb-15">No Jobs to display.</p>
                            )}
                          </div>



                          {currentResponse.length > 0 && currentResponse.length > 8 ?
                            <div>
                              {
                                !hideLoadMore ?
                                  <button className="load_more_btn_find_work mt-10 mb-30" onClick={this.handleLoadMore}>
                                    Show More
                                  </button>
                                  :
                                  ''
                              }

                              {loadMoreClicked ? <img src={loadMoreSrc} className="mt-10 ml-10" alt="" /> : ''}
                            </div>
                            :
                            ''
                          }
                        </div>


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
                                          {expertise.map((skill, idx) => {
                                            return <h6 key={idx}>{skill}</h6>;
                                          })}
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
          :
          <div className="tf_inter job-search-new-mn job-search-box">
            <div className="container">
              <div className="tf-find-freelancer">
                <div className='row'>
                  <div className='col-md-12'>
                    <h1 className='find-work_title'>Find Work</h1>
                  </div>
                  <div className='col-md-12'>
                    <ul className='find-work-logo-skill-list'>
                      <div className="">
                        <div onChange={this.handleGetFreelancer} name="jobCat" className='post-edit-dropdown find-work-logo-skill-inner-list'>
                          <div className="tf_sound tf_sound1">
                            <input
                              type="checkbox"
                              name="Salesforce"
                              value="Salesforce"
                              checked={filterData.category.includes("Salesforce")}
                              id="Salesforce"
                            />
                            <label className={`search_freelancer_filters filter-job-img ${filterData.category.includes("Salesforce") ? 'filter-find-img-check' : ''} `} htmlFor="Salesforce">
                              <LazyLoadImage
                                alt={"Salesforce"}
                                src={Salesforce}
                              />
                            </label>
                          </div>
                          <div className="tf_sound tf_sound1">
                            <input
                              type="checkbox"
                              name="AWS"
                              value="AWS"
                              checked={filterData.category.includes("AWS")}
                              id="AWS"
                            />
                            <label className={`search_freelancer_filters filter-job-img ${filterData.category.includes("AWS") ? 'filter-find-img-check' : ''} `} htmlFor="AWS">
                              <LazyLoadImage
                                alt={"Amazon_Web_Services"}
                                src={Amazon_Web_Services}
                              />
                            </label>
                          </div>
                          <div className="tf_sound tf_sound1">
                            <input
                              type="checkbox"
                              name="Oracle"
                              value="Oracle"
                              checked={filterData.category.includes("Oracle")}
                              id="Oracle"
                            />
                            <label className={`search_freelancer_filters filter-job-img ${filterData.category.includes("Oracle") ? 'filter-find-img-check' : ''} `} htmlFor="Oracle">
                              <LazyLoadImage
                                alt={"Oracle_Cloud"}
                                src={Oracle_Cloud}
                              />
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
                            <label className={`search_freelancer_filters filter-job-img ${filterData.category.includes("MS Azure") ? 'filter-find-img-check' : ''} `} htmlFor="MS Azure">
                              <LazyLoadImage
                                alt={"ms_azure"}
                                src={ms_azure}
                              />
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
                            <label className={`search_freelancer_filters filter-job-img ${filterData.category.includes("Google Cloud") ? 'filter-find-img-check' : ''} `} htmlFor="Google Cloud">
                              <LazyLoadImage
                                alt={"google_cloud"}
                                src={google_cloud}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </ul>
                  </div>
                </div>
                <div className="col-md-12">
                  <hr />
                </div>
                <div className="col-md-12">
                  <div className="tab-content">
                    {searchSection && (
                      <div role="tabpanel" className="tab-pane active" id="SEARCH">
                        <div className="searched-jobs-new">
                          <div className="row">
                            <div className="col-md-5">
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
                            <div className="col-md-4">
                              <div className="post-edit-dropdown">
                                <select
                                  defaultValue={sortItem}
                                  className="form-control mn_input mySelectBoxclassName mt-15"
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
                            <div className="col-md-3">
                              <div id="list-view-grid-view-button-container" className="input-group">
                                <button
                                  className="btn active"
                                  onClick={() =>
                                    this.handleChangeView("list")
                                  }
                                >
                                  {" "}
                                  <i
                                    className="fa fa-list"
                                    aria-hidden="true"
                                  ></i>
                                  {" "}
                                  List{" "}
                                </button>
                                <button
                                  className="btn"
                                  onClick={() =>
                                    this.handleChangeView("grid")
                                  }
                                >
                                  {" "}
                                  <i
                                    className="fa fa-th-large"
                                    aria-hidden="true"
                                  ></i>
                                  {" "}
                                  Grid{" "}
                                </button>
                                <button className="btn ml-10"
                                  data-toggle="collapse"
                                  href="#horizontal-filters"
                                  role="button"
                                  aria-expanded="false"
                                  aria-controls="horizontal-filters"
                                >
                                  <i className="fa fa-filter" aria-hidden="true"></i>{" "}Filter{" "}
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12">
                              <div className="tf_job_found freelancer-count-color">
                                <p className="search-box-count">
                                  {jobsForFreelancerData && jobsForFreelancerData.length} jobs found
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="box-shadow-none panel panel-primary m-0" id="toggle-box-for-filters">
                          <div className="col-md-12 collapse multi-collapse border-grey-section" id="horizontal-filters">
                            <div className="panel-body" id="horizontal-filters-body-for-list-view">
                              <div className="col-md-4">
                                <div className="card card-body">
                                  <h4 className="search_freelancer_filters_title">Project Length</h4>
                                  <div onChange={this.handleProjectLength} name="projectLength" id="projectLength">
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
                                  <h4 className="search_freelancer_filters_title">Job Visibility</h4>
                                  <div onChange={this.handleVisibilityChange} name="jobVisibility" id="jobVisibility">
                                    <div className="tf_sound tf_sound1">
                                      <input
                                        type="checkbox"
                                        name="job_visibility"
                                        value="Public"
                                        checked={jobVisibility.includes("Public")}
                                        id="Public"
                                      />
                                      <label className="search_freelancer_filters" htmlFor="Public">
                                        {" "}
                                        Public{" "}
                                      </label>
                                    </div>
                                    <div className="tf_sound tf_sound1">
                                      <input
                                        type="checkbox"
                                        name="job_visibility"
                                        value="Featured"
                                        checked={jobVisibility.includes("Featured")}
                                        id=" Featured"
                                      />
                                      <label className="search_freelancer_filters" htmlFor=" Featured">
                                        {" "}
                                        Featured
                                      </label>
                                    </div>
                                    <div className="tf_sound tf_sound1">
                                      <input
                                        type="checkbox"
                                        name="job_visibility"
                                        value="Urgent"
                                        checked={jobVisibility.includes("Urgent")}
                                        id="Urgent"
                                      />
                                      <label className="search_freelancer_filters" htmlFor="Urgent">
                                        {" "}
                                        Urgent
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="card card-body">
                                  <h4 className="search_freelancer_filters_title">Job Type</h4>
                                  <div onChange={this.handleJobTypeChange} name="jobType" id="jobType">
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
                                  <h4 className="search_freelancer_filters_title">
                                    Experience Level
                                  </h4>
                                  <div onChange={this.handleExpLevelChange} name="expLevel" id="expLevel">
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
                                  <h4 className="search_freelancer_filters_title">
                                    Certification Required
                                  </h4>
                                  <div onChange={this.handleByCertifi} name="certificateOption" id="certificateOption">
                                    <div className="tf_sound tf_sound1" >
                                      <input type="checkbox" name="Yes" checked={certificateOption.includes("Yes")} id="Yes" />
                                      <label className="search_freelancer_filters" htmlFor="Yes"> Yes</label>
                                    </div>
                                    <div className="tf_sound tf_sound1" >
                                      <input type="checkbox" name="Yes" checked={certificateOption.includes("No")} id="No" />
                                      <label className="search_freelancer_filters" htmlFor="No"> No</label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div className="card card-body">
                                  <h4 className="search_freelancer_filters_title">Hours Per Week</h4>
                                  <div onChange={this.handleWeekTimeChange} name="weekTime" id="weekTime">
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
                                <div className="card card-body">
                                  <h4 className="search_freelancer_filters_title">City</h4>
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
                                  <button type="button" className="sidebar-reset-filter-button mt-20" onClick={this.handleReset}>
                                    Reset Filter
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="clearfix"></div>
                        <div className="">
                          <div className="">
                            {applicationIsLoading && !loadMoreClicked && jobsForFreelancerData && jobsForFreelancerData.length === 0 && (
                              <div className="grid-loader my-feed-loader col-md-12" style={{ marginTop: '-100px' }}>
                                <Loader type="Grid" color="#00BFFF" height={100} width={100} />
                              </div>
                            )}

                            {jobsForFreelancerData && jobsForFreelancerData.length > 0 ? (
                              jobsForFreelancerData.map((job, i) => {
                                // const requiredExpertise = job.job_expertise_required
                                //   ? job.job_expertise_required
                                //   : [];
                                const additionalExpertise = job.job_additional_expertise_required
                                  ? job.job_additional_expertise_required
                                  : [];
                                const speciality = job && job.job_speciality ? job.job_speciality : [];
                                const expertise = [...additionalExpertise, ...speciality];
                                return (
                                  <div className={"searched-jobs-new " + job.job_visibility + "-list-row"} key={job.id}>
                                    <div className='col-md-12'>
                                      <div className="row">
                                        <div className="col-md-12 nopad">
                                          <div className="col-md-12 col-sm-10  col-xs-10 nopad MK">
                                            <Link to={"#"}
                                              onClick={this.handleOPenModal.bind(this, job, i)}
                                            >
                                              <div className='row'>
                                                <div className='col-md-1 text-center'>
                                                  <div className='job__search-tag-container'>
                                                    <img src={payment} title="Payment Verified" className="image_slab job__search-tag-img" alt="" />{
                                                      job && job.get_job_qualification &&
                                                        job.get_job_qualification.qualification_group !==
                                                        "No" ? (
                                                        <img src={certification_required} alt="Certified" title="Certification Required" className="certification-required w-10" />
                                                      ) : ""
                                                    }
                                                  </div>
                                                </div>
                                                <div className='col-md-9'>
                                                  <div className='d-flex'>
                                                    <div className=''>
                                                      <span className='find-work_title'>{job.job_title}</span>
                                                      <br />
                                                      <div className="project-statistics-box">
                                                        <p className='text-muted'><span>Posted:</span>&nbsp;<TimeAgo date={new Date(job.created_at).toUTCString()} /></p>
                                                      </div>
                                                    </div>
                                                    <div className='ml-20 mt-4'>
                                                      <span className={"job_search-tags-" + job.job_visibility.toLowerCase()}>{job.job_visibility}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className='col-md-2'>
                                                  <div>
                                                    {/* <ul className='job-search-blog-list'>
                                                      {job.job_category.map((cat) => {
                                                        return <li>{this.categoriesArr(cat)} </li>
                                                      })}

                                                    </ul> */}
                                                    <Link to={"#"}
                                                      className="tf_apply_button btn-primary-base"
                                                      id="list-view-apply-button"
                                                      onClick={(e) => {
                                                        e.preventDefault();
                                                        !_.isEmpty(this.props.currentUser) ?
                                                          this.props.history.push(`job-details/${job.uuid}`)
                                                          :
                                                          this.props.history.push("/sign-up", { jobId: job.uuid })
                                                      }}
                                                    >
                                                      Apply to this Job
                                                    </Link>
                                                  </div>
                                                </div>
                                              </div>
                                            </Link>
                                          </div>
                                        </div>
                                        <div className="col-md-1">
                                          {!isPublic && (
                                            <div className="col-md-12 col-sm-12 col-xs-12 tf_myfind_icons nopad">
                                              {!job.favorited_job ? (
                                                <Link
                                                  to={"#"}
                                                  onClick={this.handleSavedJobs.bind(this, job.id)}
                                                  title="Favorited"
                                                >
                                                  <i
                                                    className="fa fa-heart-o "
                                                    aria-hidden="true"
                                                  ></i>
                                                </Link>
                                              )
                                                :
                                                (
                                                  <Link
                                                    to={"#"}
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
                                    </div>
                                    <div className="col-md-6 tf_job_posting-bdr">
                                      <div className=" tf_myfind_aws">
                                        <div className=" col-md-12 pay_certificate nopad">
                                          <div className="tf_payment_fail nopad">
                                            <p className=""></p>
                                          </div>
                                        </div>
                                        <div className="col-md-12 nopad job-search_description" id="job-description-list-view">
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
                                          <div className="job-search-new-skills" id="job-search-new-skills">
                                            {expertise.length > 0 &&
                                              <Skills
                                                skill={expertise}
                                                id=""
                                                to=""
                                                displayCount={3}
                                                cursorDisabled={true}
                                              />
                                            }
                                          </div>
                                        </div>
                                        <div className="clearfix"></div>
                                        {/* <div className="col-md-4 col-sm-2 col-xs-2 nopad text-center">
                                          <p className="mt-10">
                                            <Link to={"#"}
                                              className="tf_apply_button btn-primary-base"
                                              id="list-view-apply-button"
                                              onClick={(e) => {
                                                e.preventDefault();
                                                !_.isEmpty(this.props.currentUser) ?
                                                  this.props.history.push(`job-details/${job.uuid}`)
                                                  :
                                                  this.props.history.push("/sign-up", { jobId: job.uuid })
                                              }}
                                            >
                                              Apply to this Job
                                            </Link>
                                          </p>
                                        </div> */}
                                        {/* <SignUpPopUpNew
                                              isOpen={this.state.openLoginModal}
                                              closeModal={this.closeModal}
                                              history={this.props.history}
                                              fromJobDetails={true}
                                              jobId={this.state.jobId}
                                            /> */}
                                      </div>
                                    </div>
                                    <div className='col-md-6'>
                                      <div className='row'>
                                        <div className='col-md-6'>
                                          <div className="project-statistics-box project-statistics-box-new mb-15">
                                            <p><strong>Pay Type:</strong>&nbsp;{job.job_pay_type}</p>
                                          </div>
                                          <div className="project-statistics-box project-statistics-box-new mb-15">
                                            <p><strong>Exp. Level:</strong>&nbsp;{job.job_experience_level}</p>
                                          </div>
                                          <div className="project-statistics-box project-statistics-box-new mb-15">
                                            <p><strong>Est. Time: </strong>&nbsp;{this.checkEst(job.job_duration)}</p>
                                          </div>
                                          <div className="project-statistics-box project-statistics-box-new mb-15">
                                            <p><strong>Time Req.: </strong>&nbsp;{this.checkEst(job.job_time_requirement)}</p>
                                          </div>
                                        </div>
                                        <div className='col-md-6'>
                                          <div className="row">
                                            <div className="col-md-12 nopad">
                                              <p className="project-statistics-box-new"><strong>Proposals:</strong>&nbsp;{job.proposal_count}</p>
                                            </div>
                                            <div className="col-md-12 nopad">
                                              <p className='project-statistics-box-new'><strong>Rating:</strong>&nbsp;
                                                {this.returnStars(job && job.maximum_rating)}
                                                <span style={{
                                                  color: '#0DA4DE',
                                                  fontWeight: 'bold',
                                                  size: '14px',
                                                  marginLeft: '5px'
                                                }}>
                                                </span>
                                              </p>
                                            </div>
                                            <div className="col-md-12 nopad">
                                              <p className="project-statistics-box-new"><strong>Spending:</strong>&nbsp;
                                                <span>${job.amount_spent}</span>
                                              </p>
                                            </div>
                                            <div className="col-md-12 tf_payment_fail nopad">
                                              <p className="project-statistics-box-new">
                                                <strong className='nopad'>Location:</strong>&nbsp;
                                                <span>
                                                  {
                                                    job && job.get_job_qualification ?
                                                      this.returnCountryFlag1(job.get_job_qualification)
                                                      : ''
                                                  }
                                                  {
                                                    job && job.get_job_qualification && (job.get_job_qualification.location) || 'Anywhere'
                                                  }
                                                </span>
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="clearfix"></div>
                                  </div>
                                )
                              })
                            )
                              :
                              (
                                <p className="text-center mt-20 mb-15">No Jobs to display.</p>
                              )}
                          </div>
                          {currentResponse.length > 0 && currentResponse.length > 8 ?
                            <div>
                              {!hideLoadMore ?
                                <button className="load_more_btn_find_work mt-10 mb-30" onClick={this.handleLoadMore}>
                                  Show More
                                </button>
                                :
                                ''
                              }

                              {loadMoreClicked ?
                                <img src={loadMoreSrc} className="mt-10 ml-10" alt="" />
                                :
                                ''
                              }
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
                                          </span>
                                          {" "}
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
                                          {expertise.map((skill, idx) => {
                                            return <h6 key={idx}>{skill}</h6>;
                                          })}
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
                            })
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
        <Modal isOpen={this.state.openModal} style={customStyles} onRequestClose={this.closeModals}>
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
            {!this.props.applicationIsLoading && !isEmpty(this.state.jobDetail) &&
              <div className="modal-content">
                <div className="modal-header">
                  <div className="row">
                    <div className="col-md-11">
                      <h3 className="job-title-in-popup">{this.state.jobDetail.job_title}</h3>
                    </div>

                    <div className="col-md-1">
                      <button type="button" className="close" onClick={this.closeModals}>
                        <span aria-hidden="true">×</span>
                        <span className="sr-only">Close</span>
                      </button>
                    </div>
                    <div className="clearfix"></div>
                  </div>
                </div>

                <div className="modal-body">

                  <div className="col-md-6">
                    <p className="developer-and-job-expiration-date-in-popup"><strong>Visibility:</strong> <span className={"job_search-tags-" + this.state.jobDetail.job_visibility.toLowerCase()}>{this.state.jobDetail.job_visibility}</span></p>
                  </div>
                  <div className="col-md-6">
                    <p className="developer-and-job-expiration-date-in-popup"><strong>Job Expiration Date: </strong>{new Date(new Date(this.state.jobDetail.job_expiration_date).toUTCString()).getDate() + "/" + (new Date(new Date(this.state.jobDetail.job_expiration_date).toUTCString()).getMonth() + 1) +
                      "/" + new Date(new Date(this.state.jobDetail.job_expiration_date).toUTCString()).getFullYear()}</p>
                  </div>
                  <div className="clearfix"></div>

                  <div className="col-md-6">
                    <p className="developer-and-job-expiration-date-in-popup"><strong>Posted :</strong> <TimeAgo date={new Date(this.state.jobDetail.created_at).toUTCString()} /></p>
                  </div>
                  <div className="col-md-6">
                    <p className="developer-and-job-expiration-date-in-popup"><img src={pay_dark_color} alt="" /></p>
                  </div>

                  <div className="clearfix"></div>

                  <div className="col-md-12">
                    <hr className="popup-hr-divider-for-grid" />
                  </div>

                  <div className="col-md-12">
                    <h5 className="job-description-in-popup"><strong>Job Description:</strong> {`${this.state.jobDetail.job_description.substring(0, 300)}...`}</h5>
                  </div>

                  <div className="clearfix"></div>

                  <div className="col-md-12">
                    <hr className="popup-hr-divider-for-grid" />
                  </div>

                  <div className="clearfix"></div>

                  <div className="col-md-3">
                    <h5 className="job-category-in-popup"><strong>Tech Stack: </strong>
                    </h5>
                  </div>

                  <div className="col-md-9 nopad">
                    {(this.state.jobDetail.job_speciality || []) &&
                      <Skills
                        skill={this.state.jobDetail.job_speciality}
                        id=""
                        to=""
                        displayCount={2}
                        wordCount={true}
                      />
                    }
                  </div>

                  <div className="clearfix"></div>

                  <div className="col-md-12">
                    <hr className="popup-hr-divider-for-grid" />
                  </div>

                  <div className="clearfix"></div>

                  <div className="col-md-6">
                    <p className="project-status-counter"><strong>Proposals:</strong> {this.state.jobDetail.proposal_count}</p>
                  </div>
                  <div className="col-md-6">
                    <p className="project-status-counter"><strong>Last Viewed:</strong> 0</p>
                  </div>
                  <div className="clearfix"></div>

                  <div className="col-md-12">
                    <hr className="popup-hr-divider-for-grid" />
                  </div>

                  <div className="clearfix"></div>

                  <div className="col-md-6">
                    <p className="project-status-counter"><strong>Interviewing:</strong> 0</p>
                  </div>
                  <div className="col-md-6">
                    <p className="project-status-counter"><strong>Invite sent:</strong> 0</p>
                  </div>

                  <div className="clearfix"></div>

                  <div className="col-md-12">
                    <hr className="popup-hr-divider-for-grid" />
                  </div>

                  <div className="clearfix"></div>

                  <div className="col-md-12">
                    <p className="project-status-counter"><strong>Project Type:</strong> {this.state.jobDetail.job_type}</p>
                  </div>


                  <div className="clearfix"></div>

                  <div className="col-md-12">
                    <hr className="popup-hr-divider-for-grid" />
                  </div>

                  <div className="clearfix"></div>


                  <div className="col-md-12">
                    <p className="project-status-counter"><strong>Project Length:</strong> {this.state.jobDetail.job_duration}</p>
                  </div>

                  <div className="clearfix"></div>

                  <div className="col-md-12">
                    <hr className="popup-hr-divider-for-grid" />
                  </div>

                  <div className="clearfix"></div>

                  <div className="col-md-12">
                    <p className="project-status-counter"><strong>Experience Level:</strong> {this.state.jobDetail.job_experience_level}</p>
                  </div>

                  <div className="clearfix"></div>

                  <div className="col-md-12">
                    <hr className="popup-hr-divider-for-grid" />
                  </div>

                  <div className="clearfix"></div>

                  <div className="col-md-12">
                    <p className="project-status-counter"><strong>Time Requirement:</strong> {this.state.jobDetail.job_time_requirement}</p>
                  </div>

                  <div className="clearfix"></div>

                  <div className="col-md-12">
                    <hr className="popup-hr-divider-for-grid" />
                  </div>

                  <div className="clearfix"></div>

                  <div className="col-md-12">
                    <p className="project-status-counter"><strong>Pay by:</strong> {this.state.jobDetail.job_pay_type}</p>
                  </div>

                  <div className="clearfix"></div>

                  <div className="col-md-12">
                    <hr className="popup-hr-divider-for-grid" />
                  </div>

                  <div className="clearfix"></div>
                  {this.state.jobDetail.job_pay_type !== "Pay by hour" &&
                    <React.Fragment>
                      <div className="col-md-12">
                        <p className="project-status-counter"><strong>Budget:</strong> ${this.state.jobDetail.job_pay_value}</p>
                      </div>
                      <div className="clearfix"></div>
                      <div className="col-md-12">
                        <hr className="popup-hr-divider-for-grid" />
                      </div>
                    </React.Fragment>
                  }
                  <div className="clearfix"></div>

                  <div className="row">
                    <div className="col-md-4">
                    </div>
                    <div className="col-md-4 popup-view-posting-button-container">
                      <a className="popup-view-posting-button"
                        // href={!_.isEmpty(this.props.currentUser)
                        //   ? `job-details/${this.state.jobDetail.uuid}`
                        //   : "/sign-up"}
                        onClick={(e) => {
                          e.preventDefault();
                          !_.isEmpty(this.props.currentUser) ?
                            this.props.history.push(`job-details/${this.state.jobDetail.uuid}`)
                            :
                            this.props.history.push({ pathname: `/sign-up`, state: "Freelancer" })
                          // this.setState({ openLoginModal: true, jobId: job.uuid })
                        }}
                      >
                        View Posting
                      </a>
                    </div>
                    <div className="col-md-4">

                    </div>
                  </div>
                  <div className="clearfix"></div>
                </div>

                {
                  1 < this.state.currentArrayKey &&
                  (<a href="javascript:void(0)" className="previous-link" onClick={this.changeProfile.bind(this, this.state.jobDetail.id, 'previous')}> <i className="fa fa-chevron-left" aria-hidden="true"></i></a>)
                }

                {this.state.currentArrayKey < this.state.jobsForFreelancerData.length &&
                  (<a href="javascript:void(0)" className="next-link" onClick={this.changeProfile.bind(this, this.state.jobDetail.id, 'next')}> <i className="fa fa-chevron-right" aria-hidden="true"></i></a>)
                }


              </div>
            }
          </div>
        </Modal>
        {/* <Footer /> */}
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
    fetchFreelancerJob: (id, isPublic) => dispatch(fetchFreelancerJob(id, isPublic)),
    getSavedJobsForFreelancer: () => dispatch(getSavedJobsForFreelancer()),
    SetSearchVal: (value) => dispatch(SetSearchVal(value)),
    SetSearchJobVal: (value) => dispatch(SetSearchJobVal(value)),
    getUnAuthorizedFreelancer: (newSearchBy, newSearch, pageNumber) =>
      dispatch(getUnAuthorizedFreelancer(newSearchBy, newSearch, pageNumber)),
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
    getJobsData: (dataType, searchParameters, sortBy, pageNumber, sendSearch, searchItemValue) =>
      dispatch(getJobsData(dataType, searchParameters, sortBy, pageNumber, sendSearch, searchItemValue)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobNewSearch)

