import React, { Component } from "react";
import { connect } from "react-redux";
import { getFilteredPostJobs } from "../../Actions/SearchActions";
import { adminJobListing } from "../../Actions/AdminActions";
import { isEmpty } from "lodash";
import Modal from "react-modal";
import TimeAgo from "react-timeago";
import Skills from "../Common/Skills";
import pay_dark_color from "../../static/images/pay_dark_color.png";
import _ from "lodash";
import Loader from "react-loader-spinner";
import Autosuggest from "react-autosuggest";
import CITIES from "../../constants/cities";
import SampleJobs from "./SampleJobs";
import CommonHeaderSidebar from "./AdminCommanComponents/AdminCommanHearderSideBar";
import NoDataFoundMessage from "../Common/NodataFoundMessage/NoDataFoundMessage";

const cities = CITIES;
const getSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : cities.filter(
      (city) => city.toLowerCase().slice(0, inputLength) === inputValue
    );
};

const renderSuggestion = (suggestion) => <div>{suggestion}</div>;

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
};

class AdminJobs extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      currentPage: 1,
      jobs: [],
      sortItem: "new",
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
      jobVisibility: [],
      addLocation: "Any Location",
      newSearchItem: "",
      searchItem: "",
      jobCat: [],
      certificateOption: "",
      jobSearchItem: "",
      favour: "",
      isSearched: false,
      checked: false,
      addCity: "Select City",
      value: "",
      suggestions: [],
      activePage: 1,
      pageNumber: 1,
      hideShowMore: false,
      activeTab: this.props.location.state?.activeTab || "new",
      openModal: false,
      jobDetail: "",
      currentArrayKey: 0,
    };
  }

  handleOPenModal = (row, i, e) => {
    e.preventDefault();
    this.setState({ openModal: true, currentArrayKey: i + 1 });
    this.setState({ jobDetail: row });
  };

  closeModals = () => {
    this.setState({ jobDetail: "", openModal: false });
  };

  changeProfile = (id, type) => {
    let key = "";
    this.state.jobs.map((row, index) => {
      if (row.id === id) {
        if (type === "next") {
          key = index + 1;
        } else {
          key = index - 1;
        }
        // console.log('key==',key)
        this.setState({
          jobDetail: this.state.jobs[key],
          currentArrayKey: key + 1,
        });
      }
      return row;
    });
  };

  componentDidMount() {
    this.props
      .getAdminFilter(
        this.state.favour,
        "search_jobs",
        this.state.filterData,
        "status",
        this.state.activeTab,
        "search",
        this.state.newSearchItem,
        "find_jobs",
        this.state.activePage
      )
      // this.props.getJobs("new", "")
      .then((jobs) => {
        this.setState({ jobs: jobs, newJobs: jobs });
        if (jobs.length < 5) {
          this.setState({
            hideShowMore: true,
          });
        }
      });
  }

  showASection = (e) => {
    let idForFilter = e.target.id;
    this.setState({
      sortItem: idForFilter,
      jobs: [],
      activeTab: e.target.id,
      jobSearchItem: "",
    });
    this.props
      .getAdminFilter(
        this.state.favour,
        "search_jobs",
        this.state.filterData,
        "status",
        e.target.id,
        "search",
        this.state.newSearchItem,
        "find_jobs",
        this.state.activePage
      )
      .then((jobs) => {
        this.setState({ jobs: jobs });
      });
  };

  handleDraftPageChange = (pageNumber) => {
    this.setState({ activePage: pageNumber });
  };

  handleShowMore = () => {
    let { jobs } = this.state;
    let newJobs = jobs;
    this.setState({ pageNumber: this.state.pageNumber + 1 });
    this.props
      .getAdminFilter(
        this.state.favour,
        "search_jobs",
        this.state.filterData,
        "status",
        this.state.activeTab,
        "search",
        this.state.newSearchItem,
        "find_jobs",
        this.state.pageNumber + 1
      )
      .then((res) => {
        if (res.length > 0) {
          newJobs.push(...res);
          if (res.length < 5) {
            this.setState({
              hideShowMore: true,
              jobs: newJobs,
            });
          } else {
            this.setState({
              jobs: newJobs,
            });
          }
        }else{
          this.setState({
            hideShowMore: true,
          });
        }
      });
  };

  loadMore = (jobType) => {
    this.setState((prev) => {
      return { currentPage: prev.currentPage + 1 };
    });

    this.props
      .getJobs(jobType, this.state.currentPage + 1, true)
      .then((jobs) => {
        this.setState((prev) => {
          return { jobs: [...prev.jobs, ...jobs] };
        });
      });
  };

  handleGetFreelancer = (e) => {
    let category = this.state.filterData.category || [];
    let filterData = this.state.filterData;
    if (e.target.checked) {
      category.push(e.target.id);
    } else {
      let index = category.indexOf(e.target.id);
      index === 0
        ? (category = category.splice(1, category.length))
        : category.splice(index);
    }
    filterData.category = category;
    this.setState({ filterData: filterData, jobCat: e.target.id });
    this.handleMultiSearch("", this.state.sortItem, this.state.searchItem);
  };

  handleLocationChange = (e) => {
    const { filterData } = this.state;
    if (e.length) {
      filterData["location"] = e;
    } else {
      delete filterData["location"];
    }
    this.setState({ filterData: filterData });
    this.handleMultiSearch("", this.state.sortItem, this.state.searchItem);
  };

  handleJobTypeChange = (e) => {
    const { filterData } = this.state;
    if (e.target.checked) {
      filterData["job_pay_type"] = e.target.value;
      this.setState({ filterData: filterData, jobType: e.target.value });
    } else {
      delete filterData["job_pay_type"];
      this.setState({ filterData: filterData, jobType: "" });
    }
    this.handleMultiSearch("", this.state.sortItem, this.state.searchItem);
  };

  handleExpLevelChange = (e, eventType) => {
    const { filterData } = this.state;
    if (e.target.checked) {
      filterData["job_experience_level"] = e.target.id;
      this.setState({ filterData: filterData, expLevel: e.target.id });
    } else {
      delete filterData["job_experience_level"];
      this.setState({ filterData: filterData, expLevel: "" });
    }

    this.handleMultiSearch("", this.state.sortItem, this.state.searchItem);
  };

  handleProjectLength = (e) => {
    const { filterData } = this.state;
    if (e.target.checked) {
      filterData["job_duration"] = e.target.value;
      this.setState({ filterData: filterData, projectLength: e.target.value });
    } else {
      delete filterData["job_duration"];
      this.setState({ filterData: filterData, projectLength: "" });
    }

    this.handleMultiSearch("", this.state.sortItem, this.state.searchItem);
  };

  handleWeekTimeChange = (e) => {
    const { filterData } = this.state;
    if (e.target.checked) {
      filterData["job_time_requirement"] = e.target.value;
      this.setState({ filterData: filterData, weekTime: e.target.value });
    } else {
      delete filterData["job_time_requirement"];
      this.setState({ filterData: filterData, weekTime: "" });
    }
    this.handleMultiSearch("", this.state.sortItem, this.state.searchItem);
  };

  handleByCertifi = (e) => {
    const { filterData } = this.state;
    if (e.target.checked) {
      filterData["certification"] = e.target.id;
      this.setState({ filterData: filterData, certificateOption: e.target.id });
    } else {
      filterData["certification"] = "";
      this.setState({ filterData: filterData, certificateOption: "" });
    }

    this.handleMultiSearch("", this.state.sortItem, this.state.searchItem);
  };

  handleMultiSearch = (favour, sortItem, newSearchItem) => {
    this.props
      .getAdminFilter(
        favour || this.state.favour,
        "search_jobs",
        this.state.filterData,
        "status",
        sortItem || this.state.sortItem,
        "search",
        this.state.jobSearchItem || newSearchItem,
        "find_jobs",
        this.state.activePage
      )
      .then((jobs) => {
        this.setState({ jobs: jobs || [] });
      });
  };

  handleReset = (e) => {
    this.setState({
      filterData: { category: [] },
      projectLength: [],
      weekTime: [],
      jobType: [],
      expLevel: [],
      addLocation: "",
      sortItem: this.state.sortItem,
      locationBox: [],
      jobCat: [],
      jobVisibility: [],
      certificateOption: "",
      jobSearchItem: "",
      value: "",
    });
    this.props
      .getAdminFilter(
        "",
        "search_jobs",
        {},
        "status",
        this.state.sortItem,
        "search",
        "",
        "find_jobs",
        this.state.activePage
      )
      .then((jobs) => {
        this.setState({ jobs: jobs || [] });
      });
  };

  handleVisibilityChange = (e) => {
    const { filterData } = this.state;
    if (e.target.checked) {
      filterData["job_visibility"] = e.target.value;
      this.setState({ filterData: filterData, jobVisibility: e.target.value });
    } else {
      delete filterData["job_visibility"];
      this.setState({ filterData: filterData, jobVisibility: "" });
    }
    this.handleMultiSearch("", this.state.sortItem, this.state.searchItem);
  };

  handleSearch = (e) => {
    this.setState({ jobSearchItem: e.target.value });
    this.searchFreelancers(e);
  };

  searchFreelancers = (e) => {
    e.preventDefault();
    // if(this.state.jobSearchItem !== ""){
    this.props
      .getAdminFilter(
        this.state.favour,
        "search_jobs",
        this.state.filterData,
        "status",
        this.state.sortItem,
        "search",
        e.target.value,
        "find_jobs",
        this.state.activePage
      )
      .then((jobs) => {
        this.setState({ jobs: jobs || [] });
      });
    // }
    this.setState({ isSearched: true });
  };

  OnEnterByCity = (e) => {
    e.preventDefault();
    this.handleLocationChange(e.target.childNodes[0].childNodes[0].value);
  };

  cityOnChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  handleProfileShow = () => {
    this.props.history.push(!_.isEmpty(this.props.currentUser)
      ? `/admin-jobs-details/${this.state.jobDetail.uuid}`
      : `/admin-jobs-details/${this.state.jobDetail.uuid
      }/${true}`)
  }
  render() {
    const { isLoading } = this.props;
    const {
      jobs,
      jobType,
      expLevel,
      projectLength,
      weekTime,
      certificateOption,
      jobSearchItem,
      value,
      suggestions,
      sortItem,
      filterData,
      jobVisibility,
      activeTab
    } = this.state;
    const lessThan = "<";

    const cityInputProps = {
      placeholder: "Enter City",
      value,
      onChange: this.cityOnChange,
    };

    const getCitySuggestionValue = (suggestion) => {
      const label = suggestion;
      this.handleLocationChange(label);
      return suggestion;
    };
    // console.log("jobs",jobs)
    return (
      <CommonHeaderSidebar lable="Job Post" >
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="">
              <div className="tf_signs mb-15">
                <div className="col-md-12 mb-3">
                  <ul className="nav tabcustom">
                    <li role="presentation" className={activeTab === "new" ? "active" : ""}>
                      <a
                        href="#NEW"
                        id="new"
                        onClick={this.showASection}
                        data-toggle="tab"
                      >
                        New
                      </a>
                    </li>
                    <li role="presentation" className={activeTab === "active" ? "active" : ""}>
                      <a
                        href="#ACTIVE"
                        id="active"
                        onClick={this.showASection}
                        data-toggle="tab"
                      >
                        Active
                      </a>
                    </li>
                    <li role="presentation" className={activeTab === "disputes" ? "active" : ""}>
                      <a
                        href="#DISPUTES"
                        id="disputes"
                        onClick={this.showASection}
                        data-toggle="tab"
                      >
                        Disputes
                      </a>
                    </li>
                    <li role="presentation" className={activeTab === "completed" ? "active" : ""}>
                      <a
                        href="#COMPLETED"
                        id="completed"
                        onClick={this.showASection}
                        data-toggle="tab"
                      >
                        Completed
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="col-md-12 nopad">
                  <div className="col-md-12 col-sm-5 col-xs-6 tf_full-width">
                    <form style={{ display: 'flex' }}>
                      <input
                        type=""
                        value={jobSearchItem}
                        name=""
                        className="no-resize-bar form-control"
                        id="admin-side-find-jobs-search-box"
                        placeholder="Find Jobs"
                        onChange={this.handleSearch}
                      />
                      <button
                        className="vt-center filter-btn"
                        data-toggle="collapse"
                        href="#horizontal-filters"
                        role="button"
                        aria-expanded="false"
                        aria-controls="horizontal-filters"
                      >
                        <i className="fa fa-filter" aria-hidden="true"></i>{" "}
                        Filter{" "}
                      </button>
                    </form>
                    {!isEmpty(jobs) && (
                      <p
                        style={{ color: "#0DA4DE", marginTop: "10px" }}
                      >
                        {jobs.length} jobs found
                      </p>
                    )}
                  </div>
                  {/* <div className="col-md-1 col-sm-2 col-xs-3">
                              <div
                                className=""
                                data-toggle="buttons"
                                id=""
                              >
                                <button
                                  className="flat-blue-btn"
                                  data-toggle="collapse"
                                  href="#horizontal-filters"
                                  role="button"
                                  aria-expanded="false"
                                  aria-controls="horizontal-filters"
                                >
                                  <i className="fa fa-filter" aria-hidden="true"></i>{" "}
                                  Filter{" "}
                                </button>
                              </div>
                            </div> */}
                  {/* Start Filter Box Row */}
                  <div className="row">
                    <div
                      className="col-md-12 collapse multi-collapse"
                      id="horizontal-filters"
                    >
                      <div className="col-md-3">
                        <div className="card card-body">
                          <div className="post-edit-dropdown">
                            <h4 className="heading_bold">Platform</h4>
                            <div
                              onChange={this.handleGetFreelancer}
                              name="jobCat"
                            >
                              <div className="tf_sound tf_sound1">
                                <input
                                  type="checkbox"
                                  name="Salesforce"
                                  defaultValue="Salesforce"
                                  checked={filterData.category.includes(
                                    "Salesforce"
                                  )}
                                  id="Salesforce"
                                />
                                <label htmlFor="Salesforce">
                                  {" "}
                                  Salesforce{" "}
                                </label>
                              </div>
                              <div className="tf_sound tf_sound1">
                                <input
                                  type="checkbox"
                                  name="Salesforce"
                                  defaultValue="AWS"
                                  checked={filterData.category.includes(
                                    "AWS"
                                  )}
                                  id="AWS"
                                />
                                <label htmlFor="AWS"> AWS</label>
                              </div>
                              <div className="tf_sound tf_sound1">
                                <input
                                  type="checkbox"
                                  name="Salesforce"
                                  defaultValue="Oracle"
                                  checked={filterData.category.includes(
                                    "Oracle"
                                  )}
                                  id="Oracle"
                                />
                                <label htmlFor="Oracle"> Oracle </label>
                              </div>
                              <div className="tf_sound tf_sound1">
                                <input
                                  type="checkbox"
                                  name="Salesforce"
                                  value="IBM Cloud"
                                  checked={filterData.category.includes(
                                    "IBM Cloud"
                                  )}
                                  id="IBM Cloud"
                                />
                                <label htmlFor="IBM Cloud"> IBM Cloud </label>
                              </div>
                              <div className="tf_sound tf_sound1">
                                <input
                                  type="checkbox"
                                  name="Salesforce"
                                  value="MS Azure"
                                  checked={filterData.category.includes(
                                    "MS Azure"
                                  )}
                                  id="MS Azure"
                                />
                                <label htmlFor="MS Azure"> MS Azure</label>
                              </div>
                              <div className="tf_sound tf_sound1">
                                <input
                                  type="checkbox"
                                  name="Salesforce"
                                  value="Google Cloud"
                                  checked={filterData.category.includes(
                                    "Google Cloud"
                                  )}
                                  id="Google Cloud"
                                />
                                <label htmlFor="Google Cloud">
                                  {" "}
                                  Google Cloud{" "}
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="card card-body">
                          <h4 className="heading_bold">
                            Certification Required
                          </h4>
                          <div
                            onChange={this.handleByCertifi}
                            name="certificateOption"
                          >
                            <div className="tf_sound tf_sound1">
                              <input
                                type="checkbox"
                                name="Yes"
                                checked={certificateOption.includes("Yes")}
                                id="Yes"
                              />
                              <label htmlFor="Yes"> Yes</label>
                            </div>
                            <div className="tf_sound tf_sound1">
                              <input
                                type="checkbox"
                                name="Yes"
                                checked={certificateOption.includes("No")}
                                id="No"
                              />
                              <label htmlFor="No"> No</label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="card card-body">
                          <h4 className="heading_bold">Experience Level</h4>
                          <div
                            onChange={this.handleExpLevelChange}
                            name="expLevel"
                          >
                            <div className="tf_sound tf_sound1">
                              <input
                                type="checkbox"
                                name="Fresher"
                                defaultValue="Fresher"
                                checked={expLevel.includes("Fresher")}
                                id="Fresher"
                              />
                              <label htmlFor="Fresher"> Beginner</label>
                            </div>
                            <div className="tf_sound tf_sound1">
                              <input
                                type="checkbox"
                                name="Fresher"
                                defaultValue="Intermediate"
                                checked={expLevel.includes("Intermediate")}
                                id="Intermediate"
                              />
                              <label htmlFor="Intermediate"> Medium</label>
                            </div>
                            <div className="tf_sound tf_sound1">
                              <input
                                type="checkbox"
                                name="Fresher"
                                defaultValue="Expert"
                                checked={expLevel.includes("Expert")}
                                id="Expert"
                              />
                              <label htmlFor="Expert"> Expert </label>
                            </div>
                          </div>
                        </div>

                        <div className="card card-body">
                          <h4 className="search_freelancer_filters_title font_size_title ">
                            Job Visibility
                          </h4>
                          <div
                            onChange={this.handleVisibilityChange}
                            name="jobVisibility"
                            id="jobVisibility"
                          >
                            <div className="tf_sound tf_sound1">
                              <input
                                type="checkbox"
                                name="job_visibility"
                                value="Public"
                                checked={jobVisibility.includes("Public")}
                                id="Public"
                              />
                              <label
                                className="search_freelancer_filters"
                                htmlFor="Public"
                              >
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
                              <label
                                className="search_freelancer_filters"
                                htmlFor=" Featured"
                              >
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
                              <label
                                className="search_freelancer_filters"
                                htmlFor="Urgent"
                              >
                                {" "}
                                Urgent
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="card card-body">
                          <h4 className="heading_bold">Job Type</h4>
                          <div
                            onChange={this.handleJobTypeChange}
                            name="jobType"
                          >
                            <div className="tf_sound tf_sound1">
                              <input
                                type="checkbox"
                                name="Pay by hour"
                                defaultValue="Pay by hour"
                                checked={jobType.includes("Pay by hour")}
                                id="Pay by hour"
                              />
                              <label htmlFor="Pay by hour">Hourly</label>
                            </div>
                            <div className="tf_sound tf_sound1">
                              <input
                                type="checkbox"
                                name="hourly"
                                defaultValue="Pay a fixed price"
                                checked={jobType.includes(
                                  "Pay a fixed price"
                                )}
                                id="Pay a fixed price"
                              />
                              <label htmlFor="Pay a fixed price">
                                Fixed Price
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="card card-body">
                          <h4 className="heading_bold">Project Length</h4>
                          <div
                            onChange={this.handleProjectLength}
                            name="projectLength"
                          >
                            <div className="tf_sound tf_sound1">
                              <input
                                type="checkbox"
                                name="More than 6 Month"
                                defaultValue="More than 6 Month"
                                checked={projectLength.includes(
                                  "More than 6 Month"
                                )}
                                id="More than 6 Month"
                              />
                              <label htmlFor="More than 6 Month">
                                {" "}
                                6 Month{" "}
                              </label>
                            </div>
                            <div className="tf_sound tf_sound1">
                              <input
                                type="checkbox"
                                name="More than 6 Month"
                                defaultValue="3 to 6 Month"
                                checked={projectLength.includes(
                                  "3 to 6 Month"
                                )}
                                id="3 to 6 Month"
                              />
                              <label htmlFor="3 to 6 Month">
                                {" "}
                                3 to 6 Month{" "}
                              </label>
                            </div>
                            <div className="tf_sound tf_sound1">
                              <input
                                type="checkbox"
                                name="More than 6 Month"
                                defaultValue="1 to 3 Month"
                                checked={projectLength.includes(
                                  "1 to 3 Month"
                                )}
                                id=" 1 to 3 Month"
                              />
                              <label htmlFor=" 1 to 3 Month">
                                {" "}
                                1 to 3 Month
                              </label>
                            </div>
                            <div className="tf_sound tf_sound1">
                              <input
                                type="checkbox"
                                name="More than 6 Month"
                                defaultValue="Less than 1 month"
                                checked={projectLength.includes(
                                  "Less than 1 month"
                                )}
                                id="Less than 1 month"
                              />
                              <label htmlFor="Less than 1 month">
                                {lessThan} 1 month
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="card card-body">
                          <h4 className="heading_bold">Hours Per Week</h4>
                          <div
                            onChange={this.handleWeekTimeChange}
                            name="weekTime"
                          >
                            <div className="tf_sound tf_sound1">
                              <input
                                type="checkbox"
                                name="Less than 40 hours"
                                defaultValue="Less than 40 hours"
                                checked={weekTime.includes(
                                  "Less than 40 hours"
                                )}
                                id="Less than 40 hours"
                              />
                              <label htmlFor="Less than 40 hours">
                                {" "}
                                {lessThan} 40 hours
                              </label>
                            </div>

                            <div className="tf_sound tf_sound1">
                              <input
                                type="checkbox"
                                name="More than 40 hours"
                                defaultValue="More than 40 hours"
                                checked={weekTime.includes(
                                  "More than 40 hours"
                                )}
                                id="More than 40 hours"
                              />
                              <label htmlFor="More than 40 hours">
                                {" "}
                                40 hours
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="card card-body">
                          <h4 className="heading_bold">City</h4>
                          <div className="tf_search search_user_for_chating">
                            <form onSubmit={this.OnEnterByCity}>
                              <Autosuggest
                                suggestions={suggestions}
                                onSuggestionsFetchRequested={
                                  this.onSuggestionsFetchRequested
                                }
                                onSuggestionsClearRequested={
                                  this.onSuggestionsClearRequested
                                }
                                getSuggestionValue={getCitySuggestionValue}
                                renderSuggestion={renderSuggestion}
                                inputProps={cityInputProps}
                              />
                            </form>
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
                    </div>
                  </div>
                  {/* End Filter Box Row */}
                </div>
              </div>

              <div className="tab-content">
                {isLoading && (
                  <div className="grid-loader my-feed-loader col-md-12">
                    <Loader
                      type="Grid"
                      color="#00BFFF"
                      height={100}
                      width={100}
                    />
                  </div>
                )}

                <React.Fragment>
                  <div
                    className={
                      sortItem === "new"
                        ? "tab-pane active"
                        : "tab-pane"
                    }
                    id="new"
                  >
                    <div className="">
                      {sortItem === "new" && jobs.length > 0 ? (
                        <SampleJobs
                          handleOPenModal={this.handleOPenModal}
                          jobs={jobs}
                          hideShowMore={this.state.hideShowMore}
                          handleShowMore={this.handleShowMore}
                          isLoading={isLoading}
                        />
                      ) : (
                        // <p
                        //   className="text-center mt-10"
                        //   id="no-items-to-display"
                        // >
                        //   No items to display.
                        // </p>
                        <NoDataFoundMessage 
                        message={"No items to display."}
                        />
                      )}
                    </div>
                  </div>
                  <div
                    className={
                      sortItem === "active"
                        ? "tab-pane active"
                        : "tab-pane"
                    }
                    id="active"
                  >
                    <div className="">
                      {sortItem === "active" && jobs.length > 0 ? (
                        <SampleJobs
                          handleOPenModal={this.handleOPenModal}
                          jobs={jobs}
                          hideShowMore={this.state.hideShowMore}
                          handleShowMore={this.handleShowMore}
                          isLoading={isLoading}
                        />
                      ) : (
                        // <p
                        //   className="text-center mt-10"
                        //   id="no-items-to-display"
                        // >
                        //   No items to display.
                        // </p>
                        <NoDataFoundMessage 
                        message={"No items to display."}
                        />
                      )}
                    </div>
                  </div>
                  <div
                    className={
                      sortItem === "disputes"
                        ? "tab-pane active"
                        : "tab-pane"
                    }
                    id="disputes"
                  >
                    <div className="">
                      {sortItem === "disputes" && jobs.length > 0 ? (
                        <SampleJobs
                          handleOPenModal={this.handleOPenModal}
                          jobs={jobs}
                          hideShowMore={this.state.hideShowMore}
                          handleShowMore={this.handleShowMore}
                          isLoading={isLoading}
                        />
                      ) : (
                        // <p
                        //   className="text-center mt-10"
                        //   id="no-items-to-display"
                        // >
                        //   No items to display.
                        // </p>
                        <NoDataFoundMessage 
                        message={"No items to display."}
                        />
                      )}
                    </div>
                  </div>
                  <div
                    className={
                      sortItem === "completed"
                        ? "tab-pane active"
                        : "tab-pane"
                    }
                    id="completed"
                  >
                    <div className="">
                      {sortItem === "completed" && jobs.length > 0 ? (
                        <SampleJobs
                          handleOPenModal={this.handleOPenModal}
                          jobs={jobs}
                          hideShowMore={this.state.hideShowMore}
                          handleShowMore={this.handleShowMore}
                          isLoading={isLoading}
                        />
                      ) : (
                        // <p
                        //   className="text-center mt-10"
                        //   id="no-items-to-display"
                        // >
                        //   No items to display.
                        // </p>
                        <NoDataFoundMessage 
                        message={"No items to display."}
                        />
                      )}
                    </div>
                  </div>
                </React.Fragment>
              </div>
            </div>
          </div>
        </div>


        <Modal
          isOpen={this.state.openModal}
          style={customStyles}
          onRequestClose={this.closeModals}
        >
          <div className="modal-dialog project-manager-dashboard-grid-project-popup">
            {this.props.applicationIsLoading && (
              <div className="grid-loader my-feed-loader col-md-12">
                <Loader
                  type="Grid"
                  color="#00BFFF"
                  height={100}
                  width={100}
                />
              </div>
            )}
            {!this.props.applicationIsLoading &&
              !isEmpty(this.state.jobDetail) && (
                <div className="modal-content">
                  <div className="modal-header">
                    <div className="row">
                      <div className="col-md-11">
                        <h3 className="job-title-in-popup">
                          {this.state.jobDetail.job_title}
                        </h3>
                      </div>

                      <div className="col-md-1">
                        <button
                          type="button"
                          className="close"
                          onClick={this.closeModals}
                        >
                          <span aria-hidden="true">×</span>
                          <span className="sr-only">Close</span>
                        </button>
                      </div>
                      <div className="clearfix"></div>
                    </div>
                  </div>

                  <div className="modal-body">
                    <div className="col-md-6">
                      <p className="developer-and-job-expiration-date-in-popup">
                        <strong>Visibility:</strong>{" "}
                        <span
                          className={
                            "job-preference-custom-tags-" +
                            this.state.jobDetail.job_visibility.toLowerCase()
                          }
                        >
                          {this.state.jobDetail.job_visibility}
                        </span>
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p className="developer-and-job-expiration-date-in-popup">
                        <strong>Job Expiration Date: </strong>
                        {new Date(
                          new Date(
                            this.state.jobDetail.job_expiration_date
                          ).toUTCString()
                        ).getDate() +
                          "/" +
                          (new Date(
                            new Date(
                              this.state.jobDetail.job_expiration_date
                            ).toUTCString()
                          ).getMonth() +
                            1) +
                          "/" +
                          new Date(
                            new Date(
                              this.state.jobDetail.job_expiration_date
                            ).toUTCString()
                          ).getFullYear()}
                      </p>
                    </div>

                    <div className="clearfix"></div>

                    <div className="col-md-6">
                      <p className="developer-and-job-expiration-date-in-popup">
                        <strong>Posted :</strong>{" "}
                        <TimeAgo
                          date={new Date(
                            this.state.jobDetail.created_at
                          ).toUTCString()}
                        />
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p className="developer-and-job-expiration-date-in-popup">
                        <img src={pay_dark_color} alt="" />
                      </p>
                    </div>

                    <div className="clearfix"></div>

                    <div className="col-md-12">
                      <hr className="popup-hr-divider-for-grid" />
                    </div>

                    <div className="col-md-12">
                      <h5 className="job-description-in-popup">
                        <strong>Job Description:</strong>{" "}
                        {`${this.state.jobDetail.job_description.substring(
                          0,
                          300
                        )}...`}
                      </h5>
                    </div>

                    <div className="clearfix"></div>

                    <div className="col-md-12">
                      <hr className="popup-hr-divider-for-grid" />
                    </div>

                    <div className="clearfix"></div>

                    <div className="col-md-3">
                      <h5 className="job-category-in-popup">
                        <strong>Tech Stack: </strong>
                      </h5>
                    </div>

                    <div className="col-md-9 nopad">
                      {(this.state.jobDetail.job_speciality || []) && (
                        <Skills
                          skill={this.state.jobDetail.job_speciality}
                          id=""
                          to=""
                          displayCount={2}
                          wordCount={true}
                        />
                      )}
                    </div>

                    <div className="clearfix"></div>

                    <div className="col-md-12">
                      <hr className="popup-hr-divider-for-grid" />
                    </div>

                    <div className="clearfix"></div>

                    <div className="col-md-6">
                      <p className="project-status-counter">
                        <strong>Proposals:</strong>{" "}
                        {this.state.jobDetail.proposal_count}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p className="project-status-counter">
                        <strong>Last Viewed:</strong> 0
                      </p>
                    </div>
                    <div className="clearfix"></div>

                    <div className="col-md-12">
                      <hr className="popup-hr-divider-for-grid" />
                    </div>

                    <div className="clearfix"></div>

                    <div className="col-md-6">
                      <p className="project-status-counter">
                        <strong>Interviewing:</strong> 0
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p className="project-status-counter">
                        <strong>Invite sent:</strong> 0
                      </p>
                    </div>

                    <div className="clearfix"></div>

                    <div className="col-md-12">
                      <hr className="popup-hr-divider-for-grid" />
                    </div>

                    <div className="clearfix"></div>

                    <div className="col-md-12">
                      <p className="project-status-counter">
                        <strong>Project Type:</strong>{" "}
                        {this.state.jobDetail.job_type}
                      </p>
                    </div>

                    <div className="clearfix"></div>

                    <div className="col-md-12">
                      <hr className="popup-hr-divider-for-grid" />
                    </div>

                    <div className="clearfix"></div>

                    <div className="col-md-12">
                      <p className="project-status-counter">
                        <strong>Project Length:</strong>{" "}
                        {this.state.jobDetail.job_duration}
                      </p>
                    </div>

                    <div className="clearfix"></div>

                    <div className="col-md-12">
                      <hr className="popup-hr-divider-for-grid" />
                    </div>

                    <div className="clearfix"></div>

                    <div className="col-md-12">
                      <p className="project-status-counter">
                        <strong>Experience Level:</strong>{" "}
                        {this.state.jobDetail.job_experience_level}
                      </p>
                    </div>

                    <div className="clearfix"></div>

                    <div className="col-md-12">
                      <hr className="popup-hr-divider-for-grid" />
                    </div>

                    <div className="clearfix"></div>

                    <div className="col-md-12">
                      <p className="project-status-counter">
                        <strong>Time Requirement:</strong>{" "}
                        {this.state.jobDetail.job_time_requirement}
                      </p>
                    </div>

                    <div className="clearfix"></div>

                    <div className="col-md-12">
                      <hr className="popup-hr-divider-for-grid" />
                    </div>

                    <div className="clearfix"></div>

                    <div className="col-md-12">
                      <p className="project-status-counter">
                        <strong>Pay by:</strong>{" "}
                        {this.state.jobDetail.job_pay_type}
                      </p>
                    </div>

                    <div className="clearfix"></div>

                    <div className="col-md-12">
                      <hr className="popup-hr-divider-for-grid" />
                    </div>

                    <div className="clearfix"></div>
                    {this.state.jobDetail.job_pay_type !==
                      "Pay by hour" && (
                        <React.Fragment>
                          <div className="col-md-12">
                            <p className="project-status-counter">
                              <strong>Budget:</strong> $
                              {this.state.jobDetail.job_pay_value}
                            </p>
                          </div>
                          <div className="clearfix"></div>
                          <div className="col-md-12">
                            <hr className="popup-hr-divider-for-grid" />
                          </div>
                        </React.Fragment>
                      )}
                    <div className="clearfix"></div>

                    <div className="row">
                      <div className="col-md-4"></div>
                      <div className="col-md-4 popup-view-posting-button-container">
                        <a
                          className="popup-view-posting-button"
                          onClick={() => this.handleProfileShow()}
                          href="#"
                        // href={
                        //   !_.isEmpty(this.props.currentUser)
                        //     ? `/admin-jobs-details/${this.state.jobDetail.uuid}`
                        //     : `/admin-jobs-details/${this.state.jobDetail.uuid
                        //     }/${true}`
                        // }
                        >
                          View Posting
                        </a>
                      </div>
                      <div className="col-md-4"></div>
                    </div>
                    <div className="clearfix"></div>
                  </div>

                  {1 < this.state.currentArrayKey && (
                    <a
                      href="javascript:void(0)"
                      className="previous-link"
                      onClick={this.changeProfile.bind(
                        this,
                        this.state.jobDetail.id,
                        "previous"
                      )}
                    >
                      {" "}
                      <i
                        className="fa fa-chevron-left"
                        aria-hidden="true"
                      ></i>
                    </a>
                  )}

                  {this.state.currentArrayKey < jobs.length && (
                    <a
                      href="javascript:void(0)"
                      className="next-link"
                      onClick={this.changeProfile.bind(
                        this,
                        this.state.jobDetail.id,
                        "next"
                      )}
                    >
                      {" "}
                      <i
                        className="fa fa-chevron-right"
                        aria-hidden="true"
                      ></i>
                    </a>
                  )}
                </div>
              )}
          </div>
        </Modal>
      </CommonHeaderSidebar>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ...state,
    adminJobs: state.adminJobsListing,
    isLoading: state.applicationIsLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getJobs: (param, page, isLoadMore) =>
      dispatch(adminJobListing(param, page, isLoadMore)),
    getAdminFilter: (
      favour,
      searchBy,
      searchItem,
      sortBy,
      sortItem,
      search,
      newSearchItem,
      dataType,
      page
    ) =>
      dispatch(
        getFilteredPostJobs(
          favour,
          searchBy,
          searchItem,
          sortBy,
          sortItem,
          search,
          newSearchItem,
          dataType,
          page
        )
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminJobs);
