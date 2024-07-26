import React, { Component } from "react";

import FreelancerHeader from "../miscellaneous/FreelancerHeader";
import {
  getSearchedFLForHiringMan,
  getFilteredFLForHiringMan,
  getUnAuthorizedFreelancer,
  sendCategoryParams,
  getFilteredFreelancersWithPagination,
  getFreelancersData,
} from "../../Actions/SearchActions";
import ProjectManagerHeader from "../miscellaneous/ProjectManagerHeader";
import LandingPageHeader from "../miscellaneous/LandingPageHeader";
import iconSearchWhite from "../../static/images/Icon_Search_white.svg";
import { addFavourite, removeFavourite } from "../../Actions/AdminActions";
import Autosuggest from "react-autosuggest";
import { Link } from "react-router-dom";
import countryList from "react-select-country-list";
import { SetSearchVal } from "../../Actions/SearchActions";
import Loader from "react-loader-spinner";
import ReadMoreAndLess from "react-read-more-less";
import faceImg from "../../static/images/profile-placeholder.png";
import _ from "lodash";
import CERTIFICATIONS from "../../constants/certifications";
import { isEmpty } from "lodash";
import { connect } from "react-redux";
import LANGUAGES from "../../constants/languages";
import Footer from "../miscellaneous/Footer";
import loadMoreSrc from "../../static/images/loadMore.gif";
import COUNTRIES from "../../constants/countryListWithCodes";
import ReactCountryFlag from "react-country-flag";
import SignUpPopUpNew from "../miscellaneous/SignUpPopUpNew";
import certification_required from "../../static/images/certification-required.png";
import Skills from './Skills'
import PMDashboardSideBar from "../projectManager/PMDashboardSideBar";
import NODataFoundImg from"./../../static/images/noDataFound.png"


const certificates = CERTIFICATIONS;
const allLanguages = LANGUAGES;
// const catPath = ''

const getLangSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : allLanguages.filter(
        (lang) => lang.toLowerCase().slice(0, inputLength) === inputValue
      );
}

const renderLangSuggestion = (suggestion) => <div>{suggestion}</div>;

const getSuggestionsCertfi = (value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  return inputLength === 0
    ? []
    : certificates.filter(
        (certificate) =>
          certificate.toLowerCase().slice(0, inputLength) === inputValue
      );
}

const countries = countryList().getData();

const getSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  return inputLength === 0
    ? []
    : countries.filter(
        (country) =>
          country.label.toLowerCase().slice(0, inputLength) === inputValue
      );
}

const renderSuggestion = (suggestion) => <div>{suggestion.label}</div>;

class SearchFreelancers extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      searchItem: "",
      searchValue: "",
      activeTabName: "",
      SearchCE: false,
      isLoading: true,
      value: "",
      suggestions: [],
      suggestionsCertifi: [],
      jobType: [],
      expLevel: [],
      jobCat: [],
      projectDuration: [],
      weekTime: [],
      duration: [],
      clientHistory: [],
      projectLength: [],
      clientInfo: [],
      certificates: [],
      proficiencyLevel: [],
      projectPreference: [],
      availability: [],
      countryName: "",
      certificate: "",
      filterData: {
        category: [],
      },
      sortItem: "",
      favour: "",
      newSearchItem: "",
      certificateOption: "",
      openStatus: false,
      addLanguage: "Select Language",
      langValue: "",
      activePage: 1,
      loadMore: 1,
      loadMoreClicked: false,
      allFreelancersData: [],
      currentResponse: [],
      hideLoadMore: false,
      openLoginModal: false,
      currentUserFreelancerId: ''

    }
  }

  componentDidMount() {
    let location = this.props.history.location
    if(location.state && location.state.category && location.state.category.length > 0){
      let {filterData} = this.state
      if(!filterData.category.includes(location.state.category)){
        filterData.category[0] = this.props.history.location.state.category
        this.setState({filterData: filterData},
          () => {
            this.getFreelancersDataApiCall("fromDidMount")
          })
      }
    }else if(location && location.state && location.state.search && location.state.search.length > 0){
       this.setState({searchItem: this.props.location.state.search}, () => {
         this.getFreelancersDataApiCall('fromDidMount')
       })
    }

    else {
      this.getFreelancersDataApiCall("fromDidMount")
    }

  }

  closeModal = () => {
    this.setState({ openLoginModal: false });
  }


  getCat = (cat) => {
    let {filterData} = this.state
    if(!filterData.category.includes(cat)){
      filterData.category[0] = cat
      this.setState({filterData: filterData},() => {this.getFreelancersDataApiCall("fromDidMount")})
    }
  }


  handleDraftPageChange = (pageNumber) => {
    this.setState({ activePage: pageNumber });
  }

  getFreelancersFromDidMount = () => {
    this.setState(
      { searchItem: "", searchValue: "", newSearchItem: "" },
      () => {
        if (this.refs && this.refs.searchInput) {
          this.refs.searchInput.value = "";
        }
        this.props.SetSearchVal("");
        this.getFreelancers(
          "search",
          this.props.location.state ? this.props.location.state.search : ""
        );
      }
    );
  }

  callMulti = () => {
    this.setState(
      { searchItem: "", newSearchItem: "", searchValue: "" },
      () => {
        this.refs.searchInputRef.value = "";
        this.props.SetSearchVal("");
        this.props
          .getUnAuthorizedFreelancer(
            "find_freelancers",
            null,
            this.state.loadMore
          )
          .then(() => {
            this.setState({ allFreelancersData: this.props.allFreelancers });
          });
      }
    );
  }


  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({ suggestions: getSuggestions(value) });
  }

  onSuggestionsClearRequested = () => {
    this.setState({ suggestions: [] });
  }

  onChangeCertifi = (event, { newValue }) => {
    this.setState({ certificate: newValue });
  }

  onSuggestionsFetchRequestedCertifi = ({ value }) => {
    this.setState({ suggestionsCertifi: getSuggestionsCertfi(value) });
  }

  onSuggestionsClearRequestedCertifi = () => {
    this.setState({ suggestionsCertifi: [] });
  }

  getFreelancers = (searchBy, searchItem) => {
    this.props.getSearchedFreelancers(searchBy, searchItem);
    this.props.SetSearchVal(searchItem ? searchItem : "");
    this.setState({ searchItem: searchItem, activeTabName: searchItem });
  }

  searchForFL = async (e) => {
    e.preventDefault();
    // !_.isEmpty(this.props.currentUser)
    //   ? this.getFreelancers("search", this.state.searchItem)
    //   : this.getFreelancersDataApiCall("fromSearch");

    this.getFreelancersDataApiCall("fromSearch");

    await this.props.SetSearchVal(
      e.target.childNodes[0] && e.target.childNodes[0].value
    );
  }

  handleSearchChange = (e) => {
    this.setState({ searchItem: e.target.value });
    this.searchForFL(e)
  }

  handleSearch = (e) => {
    this.setState({ searchValue: e.target.value });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  addFavourite = (id, event) => {
    event.preventDefault();
    event.currentTarget.firstElementChild.classList.remove("fa-heart-o");
    event.currentTarget.firstElementChild.classList.add("fa-heart");
    this.props.addFavourite(id).then((res) => {
      if (res.status === 200) {

        this.getFreelancersDataApiCall("fromSearch");
        // _.isEmpty(this.state.filterData)
        //   ? this.getFreelancers("search", this.state.searchItem || '')
        //   : this.handleMultiSearch("favourite");
      }
    });
  }

  removeFavourite = (id, event) => {
    event.preventDefault();
    event.currentTarget.firstElementChild.classList.remove("fa-heart");
    event.currentTarget.firstElementChild.classList.add("fa-heart-o");
    this.props.removeFavourite(id).then((res) => {
      if (res.status === 200) {
        this.getFreelancersDataApiCall("fromSearch");
        // _.isEmpty(this.state.filterData)
        //   ? this.getFreelancers("search", this.state.searchItem || '')
        //   : this.handleMultiSearch("unfavourite");
      }
    });
  }

  showOptions = (idx) => {
    this.setState({ [`isOptions${idx}`]: !this.state[`isOptions${idx}`] });
  }

  handleSortingOptions = (e) => {
    this.setState({ sortItem: e.target.value });
    this.getFreelancersDataApiCall("fromSearch");
  }

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
    this.getFreelancersDataApiCall("fromSearch");
  }

  handleExpLevelChange = (e) => {
    const { filterData } = this.state;
    if (e.target.checked) {
      filterData["experience_level"] = e.target.id;
      this.setState({ filterData: filterData, expLevel: e.target.id });
    } else {
      delete filterData["experience_level"];
      this.setState({ filterData: filterData, expLevel: "" });
    }
    this.getFreelancersDataApiCall("fromSearch");
  }

  handleProjectDurationChange = (e) => {
    const { filterData } = this.state;
    if (e.target.checked) {
      filterData["projectDuration"] = e.target.value;
    } else {
      delete filterData["projectDuration"];
    }
    this.setState({ filterData: filterData, projectDuration: e.target.value });
    this.getFreelancersDataApiCall("fromSearch");
  }

  handleProficiencyLevel = (e) => {
    const { filterData } = this.state;
    filterData["english_proficiency"] = e;
    this.setState({ filterData: filterData, proficiencyLevel: e });
  }

  handleAvailability = (e) => {
    const { filterData } = this.state;
    if (e.target.checked) {
      filterData["availability"] = e.target.id;
      this.setState({ filterData: filterData, availability: e.target.id });
    } else {
      delete filterData["availability"];
      this.setState({ filterData: filterData, availability: [] });
    }
    this.getFreelancersDataApiCall("fromSearch");
  }

  handleDurationChange = (e) => {
    const { filterData } = this.state;
    if (e.target.checked) {
      filterData["duration"] = e.target.value;
      this.setState({ filterData: filterData, duration: e.target.value });
    } else {
      delete filterData["duration"];
      this.setState({ filterData: filterData, duration: "" });
    }
    this.getFreelancersDataApiCall("fromSearch");
  }

  handleWeekTimeChange = (e) => {
    const { filterData } = this.state;
    if (e.target.checked) {
      filterData["job_time_requirement"] = e.target.value;
      this.setState({ filterData: filterData, weekTime: e.target.value });
    } else {
      delete filterData["job_time_requirement"];
      this.setState({ filterData: filterData, weekTime: "" });
    }
    this.getFreelancersDataApiCall("fromSearch");
  }

  handleProjectPreference = (e) => {
    const { filterData } = this.state;
    if (e.target.checked) {
      filterData["project_preference"] = e.target.value;
      this.setState({
        filterData: filterData,
        projectPreference: e.target.value,
      });
    } else {
      delete filterData["project_preference"];
      this.setState({ filterData: filterData, projectPreference: "" });
    }
    this.getFreelancersDataApiCall("fromSearch");
  }

  handleByCountry = (label) => {
    const { filterData } = this.state;
    filterData["location"] = label;
    this.setState({ filterData: filterData });
  }

  OnEnterByCountry = (e) => {
    e.preventDefault();
    this.handleByCountry(e.target.childNodes[0].childNodes[0].value);
  }

  onChange = (event, { newValue }) => {
    const { filterData } = this.state;

    if (!newValue || newValue.length === 0) {
      delete filterData["location"];
    } else {
      filterData["location"] = newValue;
    }

    this.setState(
      {
        value: newValue,
        countryName: newValue,
        filterData: filterData,
      },
      () => {
        this.getFreelancersDataApiCall("fromSearch");
      }
    );
  }

  OnEnterByLanguage = (e) => {
    e.preventDefault();
    this.handleProficiencyLevel(e.target.childNodes[0].childNodes[0].value);
  }

  langOnChange = (event, { newValue }) => {
    const { filterData } = this.state;
    if (!newValue || newValue.length === 0) {
      delete filterData["english_proficiency"];
    } else {
      filterData["english_proficiency"] = newValue;
    }
    this.setState(
      {
        filterData: filterData,
        langValue: newValue,
      },
      () => {
        this.getFreelancersDataApiCall("fromSearch");
      }
    );
  }

  handleByCertifi = (e) => {
    const { filterData } = this.state;
    if (e.target.checked) {
      filterData["certification"] = e.target.id;
      this.setState({ filterData: filterData, certificateOption: e.target.id });
    } else {
      delete filterData["certification"];
      this.setState({ filterData: filterData, certificateOption: "" });
    }

    this.getFreelancersDataApiCall("fromSearch");
  }

  handleLoadMore = (e) => {
    e.preventDefault();
    let {
      loadMore
    } = this.state;
    // let { allFreelancers } = this.props;
    loadMore = loadMore + 1;
    this.setState({ loadMore: loadMore, loadMoreClicked: true }, () => {
      setTimeout(
        function () {
          this.getFreelancersDataApiCall("fromLoadMore");
        }.bind(this),
        1500
      );
    });
  }

  getFreelancersDataApiCall = (type) => {
    let { allFreelancersData, loadMore } = this.state;
    if (type === "fromSearch" && loadMore === 1) {
      this.setState({ loadMore: 1, allFreelancersData: [] }, () => {
        this.callApi("searchFirstTime");
      });
    } else if (
      type === "fromSearch" &&
      loadMore > 1 &&
      allFreelancersData.length >= 5
    ) {
      this.setState({ loadMore: 1, allFreelancersData: [] }, () => {
        this.callApi("searchNextTime");
      });
    } else if (type === "fromSearch" && loadMore > 1) {
      this.setState({ loadMore: 1 }, () => {
        this.callApi("searchNextTime");
      });
    } else if (type === "fromLoadMore") {
      this.setState(
        {
          loadMore: loadMore,
        },
        () => {
          this.callApi("fromLoadMore");
        }
      );
    } else if (type === "fromDidMount") {
      // this.callApi("fromDidMount");
      this.setState({ loadMore: 1 }, () => {
        this.callApi("fromDidMount");
      });
    }
  }

  callApi = (type) => {
    let dataType = "find_freelancers";
    let {
      allFreelancersData,
      loadMore,
      filterData,
      searchItem,
      sortItem,
    } = this.state;
    let sendSearch = false;
    let searchParameters = {}
    let searchItemValue = searchItem || "";

    searchParameters = filterData;

    this.props
      .getFreelancersData(
        dataType,
        searchParameters,
        sortItem,
        loadMore,
        sendSearch,
        searchItemValue
      )
      .then((res) => {
        if(!res.length && type === "fromLoadMore"){
          this.setState({
            hideLoadMore: true,
            isLoading: false,
            loadMoreClicked: false
          })
          return
        }
        if (type === "fromDidMount") {
          this.setState({
            currentResponse: res,
            allFreelancersData: res,
            isLoading: false,
            loadMoreClicked: false,
          });
        } else if (type === "fromLoadMore") {
          if (allFreelancersData.length > 0) {
            allFreelancersData.push(...res);
            if (res.length === 0) {
              allFreelancersData = [];
            }
            this.setState({
              currentResponse: res,
              allFreelancersData: allFreelancersData,
              isLoading: false,
              loadMoreClicked: false,
            });
          } else {
            this.setState({
              currentResponse: res,
              allFreelancersData: res,
              isLoading: false,
              loadMoreClicked: false,
            });
          }
        } else if (type === "searchFirstTime") {
          this.setState({
            currentResponse: res,
            allFreelancersData: res,
            isLoading: false,
            loadMoreClicked: false,
          });
        } else if (type === "searchNextTime") {
          if (allFreelancersData.length > 0) {
            allFreelancersData.push(...res);
            if (res.length === 0) {
              allFreelancersData = [];
            }
            this.setState({
              currentResponse: res,
              allFreelancersData: allFreelancersData,
              isLoading: false,
              loadMoreClicked: false,
            });
          } else {
            this.setState({
              currentResponse: res,
              allFreelancersData: res,
              isLoading: false,
              loadMoreClicked: false,
            });
          }
        }
      });
  }

  handleMultiSearch = (favour, sortItem, newSearchItem) => {
    this.props
      .getFilteredFreelancers(
        favour || this.state.favour,
        "search_freelancers",
        this.state.filterData,
        "sort_by",
        sortItem || this.state.sortItem,
        "search",
        this.state.newSearchItem || newSearchItem || '',
        "find_freelancers"
      )
      .then((res) => {
        this.setState({
          allFreelancersData: res,
          loadMoreClicked: false,
          loadMore: 1,
          isLoading: false,
        });
      });
  }

  handleReset = (e) => {
    document.getElementById("sotyByClear").value = "";
    this.props.SetSearchVal("");
    this.setState(
      {
        filterData: { category: [] },
        availability: [],
        proficiencyLevel: [],
        expLevel: [],
        projectPreference: [],
        value: "",
        suggestions: [],
        sortItem: "",
        certificate: "",
        jobCat: [],
        certificateOption: "",
        addLanguage: "",
        langValue: "",
        searchItem: "",
        searchValue: "",
        loadMoreClicked: false,
        loadMore: 1,
        allFreelancersData: [],
      },
      () => {
        this.getFreelancersDataApiCall("fromDidMount");
        this.refs.searchInputRef.value = "";
      }
    );
  }


  onLangSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getLangSuggestions(value),
    });
  }

  onLangSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  }

  returnFlag = (country) => {
    let codeobj = COUNTRIES.find((c) => c.label === country)
    let code = "US"
    if(typeof codeobj !== 'undefined') {
        code = codeobj.value
    }
    return (
      <ReactCountryFlag
        countryCode={code}
        svg
        style={{
          width: "2em",
          height: "1.2em",
          float: "left",
          marginLeft: "-2px",
          marginRight: "20px",
        }}
        title={"country"}
      />
    )
  }

  returnStars = (value) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <i
          className="fa fa-star first"
          style={{
            color: i + 1 > value ? "#8080806e" : "#0DA4DE",
            fontSize: "18px",
          }}
          onClick={() => this.handleStars(i + 1)}
        ></i>
      );
    }
    return stars;
  }


  handleClickHire = (e) => {
    if(this.props.currentUser.role === "Project Manager"){
        this.props.history.push(`user-profile/${e.target.dataset.uuid}`)
    }
    else {
      this.setState({
        openLoginModal: true,
        currentUserFreelancerId: e.target.dataset.uuid
      })
    }
  }



  render() {
    const {
      searchItem,
      isLoading,
      filterData,
      langValue,
      loadMoreClicked,
      allFreelancersData,
      currentResponse,
      hideLoadMore
    } = this.state;


    const {
      value,
      suggestions,
      expLevel,
      availability,
      projectPreference,
      certificateOption,
    } = this.state;
    const isPublic = _.isEmpty(this.props.currentUser) ? true : false;
    let lessThan = "<";
    const inputProps = {
      placeholder: "Enter Country",
      value: value,
      onChange: this.onChange,
      id: "countryInput",
    }

    const getSuggestionValue = (suggestion) => {
      const label = suggestion.label;
      this.handleByCountry(label);
      return suggestion.label;
    }

    const langInputProps = {
      placeholder: "Enter Language",
      value: langValue,
      onChange: this.langOnChange,
      id: "langInput",
    }

    const getLangSuggestionValue = (suggestion) => {
      const label = suggestion;
      this.handleProficiencyLevel(label);
      return suggestion;
    }


    return (
      <div>
        {!_.isEmpty(this.props.currentUser) ? (
          this.props.currentUser.role === "Project Manager" ? (
            <ProjectManagerHeader history={this.props.history} />
          ) : (
            <FreelancerHeader history={this.props.history} />
          )
        ) : (
          <LandingPageHeader history={this.props.history} />
        )}

        <PMDashboardSideBar history={this.props.history}/>

        <div className="wraper">
          <div className="find-freelancer-mn mt-0">
            <div className="">
              <div className="tf-find-freelancer" id="project-manager-dashboard-container-style">
                <form action="" method="">
                <div className="d-flex">
                  {/* <div className="col-md-2 p-0">
                    <PMDashboardSideBar history={this.props.history}/>
                  </div> */}
                  <div className="col-md-10 rightSidecontent">
                      <div className="find-result-section">
                        <div className="tf_app_search mt-60">
                          <div className="row">
                            <div className=" col-md-8">
                              <div className="form-group">
                                <form onSubmit={this.searchForFL}>
                                  <input
                                    type="text"
                                    ref="searchInputRef"
                                    defaultValue={searchItem}
                                    onChange={this.handleSearchChange}
                                    className="no-resize-bar form-control"
                                    placeholder="Search for Cloud Experts"
                                  />
                                </form>
                                <Link to={"#"} onClick={this.searchForFL}>
                                  <img src={iconSearchWhite} alt="searchIcon" />
                                </Link>
                              </div>
                            </div>
                            <div className="col-md-2">
                              <div className="post-edit-dropdown">
                                <select
                                  defaultValue=""
                                  className="form-control mn_input mySelectBoxclassName"
                                  onChange={this.handleSortingOptions}
                                  id="sotyByClear"
                                >
                                  <option value="" disabled={true}>
                                    Sort By
                                  </option>
                                  <option
                                    name="newest"
                                    value="Newest"
                                    id="Newest"
                                  >
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
                            <div className="col-md-2">
                              <div className="freelancerFilter" data-toggle="buttons" id="user-admin-filter-button">
                                <button className="mb-0 freelancerFilterBtn"
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
                            <div className="col-md-12 freelancer-count-color">
                              {!isLoading && (
                                <p>
                                  {allFreelancersData.length} Cloud Experts
                                  found
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        {/* Start Filter Box Row */}
                        <div className="row freelancerFilterSction">
                          <div className="col-md-12 collapse multi-collapse tf_main_filter freelancerFilterBox" id="horizontal-filters">
                            <div className="find-filter-navigation">
                              <div className="panel-group sidebar_all_filters mb-0 mt-0" id="accordion">

                                  <div className="col-md-3">
                                    <div className="card card-body">
                                    <div className="post-edit-dropdown">
                                    <h4 className="heading_bold">Platform</h4>
                                    <div onChange={this.handleGetFreelancer} name="jobCat">
                                    <div className="tf_sound tf_sound1">
                                      <input type="checkbox" name = "Salesforce" value= "Salesforce" checked={filterData.category.includes("Salesforce")} id="Salesforce"/>
                                    <label htmlFor="Salesforce"> Salesforce </label>
                                    </div>
                                    <div className="tf_sound tf_sound1" >
                                      <input type="checkbox" name = "Salesforce" value= "AWS"  checked={filterData.category.includes("AWS")}  id="AWS"/>
                                    <label htmlFor="AWS"> AWS</label>
                                    </div>
                                    <div className="tf_sound tf_sound1">
                                      <input type="checkbox" name = "Salesforce" value= "Oracle" checked={filterData.category.includes("Oracle")} id="Oracle"/>
                                    <label htmlFor="Oracle"> Oracle </label>
                                    </div>
                                      <div className="tf_sound tf_sound1" >
                                        <input type="checkbox" name = "Salesforce" value= "MS Azure"  checked={filterData.category.includes("MS Azure")}  id="MS Azure"/>
                                      <label htmlFor="MS Azure"> MS Azure</label>
                                      </div>
                                      <div className="tf_sound tf_sound1">
                                        <input type="checkbox" name = "Salesforce" value= "Google Cloud" checked={filterData.category.includes("Google Cloud")} id="Google Cloud"/>
                                      <label htmlFor="Google Cloud"> Google Cloud </label>
                                      </div>

                                      </div>
                                    </div>
                                  </div>
                                  </div>

                                  <div className="col-md-3">
                                    <div className="card card-body">
                                      <h4 className="heading_bold">Certification Required</h4>
                                      <div onChange={this.handleByCertifi} name="certificateOption">
                                        <div className="tf_sound tf_sound1" >
                                          <input type="checkbox" name = "Yes"  checked={certificateOption.includes("Yes")}  id="Yes"/>
                                        <label htmlFor="Yes"> Yes</label>
                                        </div>
                                        <div className="tf_sound tf_sound1" >
                                          <input type="checkbox" name = "Yes"  checked={certificateOption.includes("No")}  id="No"/>
                                        <label htmlFor="No"> No</label>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="card card-body">
                                        <h4 className="heading_bold">Experience Level</h4>
                                        <div onChange={this.handleExpLevelChange} name="expLevel">
                                          <div className="tf_sound tf_sound1" >
                                            <input type="checkbox" name = "Beginner"  checked={expLevel.includes("Beginner")}  id="Beginner"/>
                                          <label htmlFor="Beginner"> Beginner</label>
                                          </div>
                                          <div className="tf_sound tf_sound1" >
                                            <input type="checkbox" name = "Beginner"  checked={expLevel.includes("Intermediate")}  id="Intermediate"/>
                                          <label htmlFor="Intermediate"> Intermediate</label>
                                          </div>
                                          <div className="tf_sound tf_sound1">
                                            <input type="checkbox" name = "Beginner" checked={expLevel.includes("Expert")} id="Expert"/>
                                          <label htmlFor="Expert"> Expert </label>
                                          </div>
                                        </div>
                                    </div>

                                  </div>

                                  <div className="col-md-3">

                                    <div className="card card-body">
                                      <h4 className="heading_bold">Availability</h4>
                                      <div onChange={this.handleAvailability} name="availability">
                                        <div className="tf_sound tf_sound1" >
                                          <input type="checkbox" name = "hours"  value = "Less than 40 hours" checked={availability==="Less than 40 hours"}  id="Less than 40 hours"/>
                                        <label htmlFor="Less than 40 hours">{lessThan} 40 hours</label>
                                        </div>
                                        <div className="tf_sound tf_sound1" >
                                          <input type="checkbox" name = "hours" value = "More than 40 hours" checked={availability==="More than 40 hours"}  id="More than 40 hours"/>
                                        <label htmlFor="More than 40 hours">{'> '} 40 hours </label>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="card card-body">
                                      <h4 className="heading_bold">Project Preference</h4>
                                      <div onChange={this.handleProjectPreference} name="projectPreference">
                                        <div className="tf_sound tf_sound1" >
                                          <input type="checkbox" name = "Both short-term and long-term projects" value = "Both short-term and long-term projects" checked={projectPreference.includes("Both short-term and long-term projects")}  id="Both short-term and long-term projects"/>
                                        <label htmlFor="Both short-term and long-term projects"> Both</label>
                                        </div>
                                        <div className="tf_sound tf_sound1" >
                                          <input type="checkbox" name = "Both short-term and long-term projects" value = "Long-term projects (more than 3 months)" checked={projectPreference.includes("Long-term projects (more than 3 months)")}  id="Long-term projects (more than 3 months)"/>
                                        <label htmlFor="Long-term projects (more than 3 months)"> Long-term</label>
                                        </div>
                                        <div className="tf_sound tf_sound1" >
                                          <input type="checkbox" name = "Both short-term and long-term projects" value= "Short-term projects (less than 3 months)" checked={projectPreference.includes("Short-term projects (less than 3 months)")}  id="Short-term projects (less than 3 months)"/>
                                        <label htmlFor="Short-term projects (less than 3 months)">Short-term</label>
                                        </div>
                                      </div>
                                    </div>

                                  </div>

                                  <div className="col-md-3">

                                    <div className="card card-body">
                                    <h4 className="heading_bold">Location </h4>
                                      <div className="tf_search search_user_for_chating">
                                      <form onSubmit = {this.OnEnterByCountry}>
                                          <Autosuggest
                                            suggestions={suggestions}
                                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                            getSuggestionValue={getSuggestionValue}
                                            renderSuggestion={renderSuggestion}
                                            inputProps={inputProps}
                                          />
                                      </form>
                                      </div>
                                    </div>

                                    <div className="card card-body">
                                      <h4 className="heading_bold">Language</h4>
                                      <div className="tf_search search_user_for_chating">
                                          <form onSubmit = {this.OnEnterByLanguage}>
                                            <Autosuggest
                                                suggestions={suggestions}
                                                onSuggestionsFetchRequested={this.onLangSuggestionsFetchRequested}
                                                onSuggestionsClearRequested={this.onLangSuggestionsClearRequested}
                                                getSuggestionValue={getLangSuggestionValue}
                                                renderSuggestion={renderLangSuggestion}
                                                inputProps={langInputProps}
                                              />
                                            </form>
                                      </div>

                                    </div>

                                    <button type="button" className= "sidebar-reset-filter-button" onClick= {this.handleReset}>Reset Filter</button>

                                  </div>

                              </div>
                            </div>
                          </div>
                        </div>
                        {/* End Filter Box Row */}

                        {allFreelancersData && allFreelancersData.length > 0  ? (
                          allFreelancersData.map((freelancer,i) => {
                            const freelancerDescription =
                              freelancer &&
                              freelancer.profile &&
                              freelancer.profile.about_me;
                            return (
                              <div
                                className="freelancer-search-list-view"
                                key={i}
                              >
                                <div
                                  className="row"
                                  style={{ margin: "0 15px" }}
                                >
                                  <div className="col-md-2 col-sm-2 col-xs-12 nopad tf_full_width">
                                    <div className="tf_image">
                                      {freelancer &&
                                      freelancer.profile &&
                                      freelancer.profile.profile_picture ? (
                                        <img
                                          src={
                                            freelancer &&
                                            freelancer.profile &&
                                            freelancer.profile.profile_picture
                                          }
                                          alt="img"
                                        />
                                      ) : (
                                        <img
                                          className="avatar-img"
                                          src={faceImg}
                                          alt="User"
                                        />
                                      )}
                                    </div>
                                  </div>
                                  <div className="col-md-8 nopad tf_full_width">
                                    <div className="col-md-8 col-sm-8 col-xs-12">
                                      <div className="tf_free_name mt-0">
                                        <Link
                                          to={
                                            !_.isEmpty(
                                              this.props.currentUser
                                            ) &&
                                            freelancer &&
                                            freelancer.profile
                                              ? `/user-profile/${
                                                  freelancer &&
                                                  freelancer.profile &&
                                                  freelancer.profile.uuid
                                                }`
                                              : `/user-profile/${
                                                  freelancer &&
                                                  freelancer.profile &&
                                                  freelancer.profile.uuid
                                                }/${true}`
                                          }
                                        >
                                          <h4 className="mt-0">
                                            {freelancer.full_name}{" "}
                                            {freelancer &&
                                              freelancer.profile &&
                                              freelancer.profile
                                                .is_certified && (
                                                <img title="Certification Required" src={certification_required} alt="Certified" className="certification-required" />
                                              )}
                                          </h4>
                                        </Link>
                                      </div>
                                    </div>

                                    {!isPublic && (
                                      <div className="col-md-1 col-sm-2 col-xs-2">
                                        <div className="tf_free_fav">
                                          {!freelancer.favorited_freelancer ? (
                                            <Link
                                              href=""
                                              onClick={this.addFavourite.bind(
                                                this,
                                                freelancer.id
                                              )}
                                            >
                                              <i
                                                className="fa fa-heart-o mt-0"
                                                aria-hidden="true"
                                              ></i>
                                            </Link>
                                          ) : (
                                            <Link
                                              href=""
                                              onClick={this.removeFavourite.bind(
                                                this,
                                                freelancer.id
                                              )}
                                            >
                                              <i
                                                className="fa fa-heart"
                                                aria-hidden="true"
                                              ></i>
                                            </Link>
                                          )}
                                        </div>
                                      </div>
                                    )}
                                    <div className="col-md-6 col-sm-6 col-xs-12">
                                      <div className="tf_f_content">
                                        <h5 className="ce-current-job-title">
                                          <strong>
                                            {freelancer.profile &&
                                              freelancer.profile
                                                .current_job_title}
                                          </strong>
                                        </h5>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-sm-6 col-xs-6 tf_full_width">
                                      <div className="tf_f_content">
                                        <h5>
                                          {(freelancer &&
                                            freelancer.profile &&
                                            freelancer.profile
                                              .current_location_country) ?
                                            this.returnFlag(freelancer.profile
                                              .current_location_country) : 'Anywhere'
                                            }

                                          {freelancer.profile &&
                                            freelancer.profile
                                              .current_location_country}
                                        </h5>
                                      </div>
                                    </div>
                                  <div className="col-md-12">
                                    <div className="tf_fre_content m-0">
                                      {freelancer.profile ? (
                                        freelancerDescription && (
                                          <ReadMoreAndLess
                                            ref={this.ReadMore}
                                            className="read-more-content"
                                            // numberOfLines={2}
                                            charLimit={250}
                                            readMoreText="Read more"
                                            readLessText="Read less"
                                          >
                                            {freelancerDescription}
                                          </ReadMoreAndLess>
                                        )
                                      ) : (
                                        <p></p>
                                      )}
                                    </div>
                                  </div>
                                  <div className="col-md-12">

                                    <Skills
                                        skill = {freelancer.profile.skill}
                                        id = {freelancer.profile.uuid}
                                        to = {`/user-profile/${freelancer.profile.uuid}/true`}
                                        displayCount = {5}
                                      />
                                  </div>

                                </div>

                                  {!_.isEmpty(this.props.currentUser) && this.props.currentUser.role === "Project Manager" ?
                                    (<div className="col-md-2 col-sm-2 col-xs-12 tf_f_content listSidePart">
                                        {freelancer.profile &&
                                        freelancer.profile.hourly_rate ? (
                                          <h5>
                                            $
                                            {isNaN(
                                              freelancer.profile.hourly_rate
                                            )
                                              ? "00"
                                              : parseFloat(
                                                  freelancer.profile.hourly_rate
                                                ).toFixed(2)}{" "}
                                            / hr
                                          </h5>
                                        ) : (
                                          <h5>$0.00 / hr</h5>
                                        )}
                                        <div className="">
                                          {this.returnStars(
                                            freelancer && freelancer.maximum_rating
                                          )}
                                          <span
                                            style={{
                                              color: "#0DA4DE",
                                              fontWeight: "bold",
                                              size: "14px",
                                              marginLeft: "5px",
                                            }}
                                          ></span>
                                        </div>
                                         <p className="tf_hire mt-15">
                                          {(!isEmpty(freelancer) && !isEmpty(freelancer.payment_method)) ?
                                            <Link
                                                data-uuid={freelancer.profile_uuid}
                                                data-profile={freelancer}
                                                onClick={this.handleClickHire}
                                                >
                                                HIRE CLOUD EXPERT
                                            </Link>
                                            :
                                            <Link to ={{pathname: "/settings" ,state: "payMethodPresent"}}>HIRE CLOUD EXPERT</Link>
                                          }
                                         </p>
                                        {/* <SignUpPopUpNew
                                            isOpen={this.state.openLoginModal}
                                            closeModal={this.closeModal}
                                            history={this.props.history}
                                            fromHireMe={true}
                                            freelancerId={this.state.currentUserFreelancerId}
                                          /> */}
                                        <div className="tf_f_content">
                                          <h5>$10k+ earned</h5>
                                        </div>
                                          </div>)
                                          :
                                          <div className="col-md-2 col-sm-2 col-xs-12"> </div>
                                    }

                                </div>
                                <div className="clearfix"></div>
                                <div className="searched-job-space">
                                  <hr />
                                </div>
                              </div>
                            );
                          })
                        ) : isLoading && this.props.applicationIsLoading && !loadMoreClicked ? (
                          <div className="grid-loader my-feed-loader col-md-12"
                            style={{marginTop:'-200px'}}>
                            <Loader
                              type="Grid"
                              color="#00BFFF"
                              height={100}
                              width={100}
                            />
                          </div>
                        ) : !isLoading && (
                          <div className="noJobsFound">
                            <img src={NODataFoundImg} alt=""/>
                            <p>No Cloud Experts Found. </p>
                          </div>
                        )}

                        {(currentResponse.length > 0 && currentResponse.length > 4) ? (
                          <div
                            className="mt-10 mb-10"
                            style={{ padding: "10px" }}
                          >
                           {!hideLoadMore ?
                             <button
                                className="btn load_more_btn_find_work mt-10"
                                style={{
                                  opacity: '1',
                                  padding: '10px 50px',
                                  borderRadius: '5px',
                                  fontSize: '14px',
                                  background: '#0DA4DE',
                                  color: '#fffffff7',
                                  fontWeight: '600',
                                  marginLeft: '42',
                                  border: 'none',
                                  position: 'relative',
                                  boxShadow:'0px 3px 10px rgb(13, 164, 222)'
                                }}
                                onClick={this.handleLoadMore}
                              >
                                Show More
                              </button>
                            :
                            ''}

                            {loadMoreClicked ? (
                              <img src={loadMoreSrc} className="mt-10 ml-10" alt=""/>
                            ) : (
                              ""
                            )}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <Footer
          getCat ={this.getCat}
         />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => {
  return {
    SetSearchVal: (value) => dispatch(SetSearchVal(value)),
    sendCategoryParams: (data, dataType, sortBy, searchBy) =>
      dispatch(sendCategoryParams(data, dataType, sortBy, searchBy)),
    getSearchedFreelancers: (searchBy, search) =>
      dispatch(getSearchedFLForHiringMan(searchBy, search)),
    getUnAuthorizedFreelancer: (dataType, param2, param3) =>
      dispatch(getUnAuthorizedFreelancer(dataType, param2, param3)),
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
    getFreelancersData: (
      dataType,
      searchParameters,
      sortBy,
      pageNumber,
      sendSearch,
      searchItemValue
    ) =>
      dispatch(
        getFreelancersData(
          dataType,
          searchParameters,
          sortBy,
          pageNumber,
          sendSearch,
          searchItemValue
        )
      ),
    addFavourite: (id) => dispatch(addFavourite(id)),
    removeFavourite: (id) => dispatch(removeFavourite(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchFreelancers);
