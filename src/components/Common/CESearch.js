import React, { Component } from 'react';
import FreelancerHeader from "../miscellaneous/FreelancerHeader";
import {
  getSearchedFLForHiringMan,
  getFilteredFLForHiringMan,
  getUnAuthorizedFreelancer,
  sendCategoryParams,
  getFilteredFreelancersWithPagination,
  getFreelancersData,
} from "../../Actions/SearchActions";
import { getProfileForFreelancer } from "../../Actions/freelancerActions";
import ProjectManagerHeader from "../miscellaneous/ProjectManagerHeader";
import LandingPageHeader from "../miscellaneous/LandingPageHeader";
// import iconSearchWhite from "../../static/images/Icon_Search_white.svg";
import { addFavourite, removeFavourite } from "../../Actions/AdminActions";
import Autosuggest from "react-autosuggest";
import { Link } from "react-router-dom";
import countryList from "react-select-country-list";
import { SetSearchVal } from "../../Actions/SearchActions";
import Loader from "react-loader-spinner";
import faceImg from "../../static/images/profile-placeholder.png";
import _ from "lodash";
import CERTIFICATIONS from "../../constants/certifications";
import { isEmpty } from "lodash";
import { connect } from "react-redux";
import LANGUAGES from "../../constants/languages";
// import Footer from "../miscellaneous/Footer";
import loadMoreSrc from "../../static/images/loadMore.gif";
import COUNTRIES from "../../constants/countryListWithCodes";
import ReactCountryFlag from "react-country-flag";
// import SignUpPopUpNew from "../miscellaneous/SignUpPopUpNew";
import certification_required from "../../static/images/certification-required.png";
import Skills from './Skills'
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


const certificates = CERTIFICATIONS;
const allLanguages = LANGUAGES;


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


class CESearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewToShow: 'grid',
      searchItem: "",
      searchValue: "",
      activeTabName: "",
      isLoading: false,
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
      currentUserFreelancerId: "",
      openModal: false,
      profileDetail: '',
      currentArrayKey: 0
    }
  }

  handleOPenModal = (row, i, e) => {
    e.preventDefault();
    this.setState({ openModal: true, currentArrayKey: i + 1 })
    this.props.getProfile(row.uuid, "", true).then(
      (res) => {
        this.setState({ profileDetail: res })
      }
    )
  }

  closeModals = () => {
    this.setState({ profileDetail: "", openModal: false })
  }

  changeProfile = (id, type) => {
    let key = ''
    // console.log(this.state.currentArrayKey, '==',this.state.allFreelancersData.length)
    this.state.allFreelancersData.map((row, index) => {
      if (row.id === id) {
        if (type === 'next') {
          key = index + 1
        } else {
          key = index - 1
        }
        // console.log('key==',key)
        this.props.getProfile(this.state.allFreelancersData[key].profile.uuid, "", true).then(
          (res) => {
            this.setState({ profileDetail: res, currentArrayKey: key + 1 })
          }
        )
      }
      return row
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

  // getImagesByCategories = cat.map((single)=>{
  //   return single.categoriesArr
  // })



  handleChangeView = (view) => {
    this.setState({ viewToShow: view })
  }
  componentDidMount() {
    let location = this.props.history.location;
    // console.log("location-->>",location)
    if (
      location.state &&
      location.state.category &&
      location.state.category.length > 0
    ) {
      let { filterData } = this.state;
      if (!filterData.category.includes(location.state.category)) {
        filterData.category[0] = this.props.history.location.state.category;
        this.setState({ filterData: filterData }, () => {
          this.getFreelancersDataApiCall("fromDidMount");
        });
      }
    }

    if (
      location &&
      location.state &&
      location.state.search &&
      location.state.search.length > 0
    ) {
      this.setState({ searchItem: this.props.location.state.search }, () => {
        this.getFreelancersDataApiCall("fromDidMount");
      });
    } else {
      this.getFreelancersDataApiCall("fromDidMount");
    }
  }

  closeModal = () => {
    this.setState({ openLoginModal: false });
  }

  getCat = (cat) => {
    let { filterData } = this.state;
    if (!filterData.category.includes(cat)) {
      filterData.category[0] = cat;
      this.setState({ filterData: filterData }, () => {
        this.getFreelancersDataApiCall("fromDidMount");
      });
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

  searchForFL = (e) => {
    e.preventDefault();
    !_.isEmpty(this.props.currentUser)
      ? this.getFreelancers("search", this.state.searchItem)
      : this.getFreelancersDataApiCall("fromSearch");

    this.props.SetSearchVal(
      e.target.childNodes[0] && e.target.childNodes[0].value
    );
  }

  handleSearchChange = (e) => {
    this.setState({ searchItem: e.target.value })
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
      // if (res.status === 200) {
      //   _.isEmpty(this.state.filterData)
      //     ? this.getFreelancers("search", this.state.searchItem || '')
      //     : this.handleMultiSearch("favourite");
      // }
    });
  }

  removeFavourite = (id, event) => {
    event.preventDefault();
    event.currentTarget.firstElementChild.classList.remove("fa-heart");
    event.currentTarget.firstElementChild.classList.add("fa-heart-o");
    this.props.removeFavourite(id).then((res) => {
      if (res.status === 200) {
        _.isEmpty(this.state.filterData)
          ? this.getFreelancers("search", this.state.searchItem || "")
          : this.handleMultiSearch("unfavourite");
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
      let index = category.indexOf(e.target.id)
      category.splice(index, 1)
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
      loadMore,
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
      this.callApi("fromDidMount");
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
        console.log(res ,type , "---ressss");
        if (!res.length && type === "fromLoadMore") {
        console.log(res , "---ressss ifffff" );
          this.setState({
            hideLoadMore: true,
            loadMoreClicked: false,
          });
          return;
        }
        if (type === "fromDidMount") {
          this.setState({
            currentResponse: res,
            allFreelancersData: res,
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
              loadMoreClicked: false,
            });
          } else {
            this.setState({
              currentResponse: res,
              allFreelancersData: res,
              loadMoreClicked: false,
            });
          }
        } else if (type === "searchFirstTime") {
          this.setState({
            currentResponse: res,
            allFreelancersData: res,
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
              loadMoreClicked: false,
            });
          } else {
            this.setState({
              currentResponse: res,
              allFreelancersData: res,
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
        this.state.newSearchItem || newSearchItem || "",
        "find_freelancers"
      )
      .then((res) => {
        this.setState({
          allFreelancersData: res,
          loadMoreClicked: false,
          loadMore: 1,
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
    if (typeof codeobj !== 'undefined') {
      code = codeobj.value
    }
    return (
      <ReactCountryFlag
        countryCode={code}
        svg
        style={{
          width: "2em",
          height: "1.2em",
          marginLeft: "-2px",
          marginRight: "6px",
        }}
        title={"country"}
      />
    );
  }
  returnFlag1 = (country) => {
    let codeobj = COUNTRIES.find((c) => c.label === country)
    let code = "US"
    if (typeof codeobj !== 'undefined') {
      code = codeobj.value
    }
    return (
      <ReactCountryFlag
        countryCode={code}
        svg
        style={{
          width: "2em",
          height: "1.2em",
          marginLeft: "-2px",
          marginRight: "5px",
        }}
        title={"country"}
      />
    );
  }

  returnStars = (value) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <i
          className="fa fa-star first"
          style={{
            color: i + 1 > value ? "#ffd300" : "#0DA4DE",
            fontSize: "18px"
          }}
        // onClick={() => this.handleStars(i + 1)}
        ></i>
      );
    }
    return stars;
  }

  handleClickHire = (e) => {
    if (this.props.currentUser.role === "Project Manager") {
      this.props.history.push(`user-profile/${e.target.dataset.uuid}`);
    } else {
      this.setState({
        openLoginModal: true,
        currentUserFreelancerId: e.target.dataset.uuid,
      });
    }
  }
  render() {
    let { viewToShow } = this.state
    const {
      searchItem,
      isLoading,
      filterData,
      langValue,
      loadMoreClicked,
      allFreelancersData,
      currentResponse,
      hideLoadMore,
    } = this.state;

    const { appProcessSteps } = this.props;
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
    const patternItem = (x, lastNum) => {
      return x % lastNum + 1;
    }

    // console.log("this.state.profileDetail",this.state.profileDetail)
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
        {viewToShow === 'list' ?
          <div className="wraper">
            <div className="find-freelancer-mn new-find-cloud-experts-with-horizontal-filter">
              <div className="container">
                <div className="tf-find-freelancer">
                  <form action="" method="">
                    <div className="row">



                      <div className="col-md-12">
                        <div className="">
                          <div className="col-md-12">
                            <div className="card card-body">
                              <div className="post-edit-dropdown">
                                <h1 className="find-work_title">
                                  Find Cloud Experts
                                </h1>
                                <div
                                  onChange={this.handleGetFreelancer}
                                  name="jobCat"
                                  className='find-work-logo-skill-inner-list'
                                >
                                  <div className="tf_sound tf_sound1 tf_sound2">
                                    <input
                                      type="checkbox"
                                      name="Salesforce"
                                      value="Salesforce"
                                      checked={
                                        !isEmpty(appProcessSteps) &&
                                          !isEmpty(
                                            appProcessSteps.appProcessCategoryData
                                          ) &&
                                          !isEmpty(
                                            appProcessSteps
                                              .appProcessCategoryData
                                              .category
                                          )
                                          ? appProcessSteps.appProcessCategoryData.category.includes(
                                            "Salesforce"
                                          )
                                          : filterData.category.includes(
                                            "Salesforce"
                                          )
                                      }
                                      id="Salesforce"
                                    />
                                    <label
                                      className={`search_freelancer_filters filter-job-img ${filterData.category.includes("Salesforce") ? 'filter-find-img-check' : ''} `}
                                      htmlFor="Salesforce"
                                    >
                                      <LazyLoadImage
                                        alt={"Salesforce"}
                                        src={Salesforce}
                                      />
                                    </label>
                                  </div>
                                  <div className="tf_sound tf_sound1 tf_sound2">
                                    <input
                                      type="checkbox"
                                      name="Salesforce"
                                      value="AWS"
                                      checked={
                                        !isEmpty(appProcessSteps) &&
                                          !isEmpty(
                                            appProcessSteps.appProcessCategoryData
                                          ) &&
                                          !isEmpty(
                                            appProcessSteps
                                              .appProcessCategoryData
                                              .category
                                          )
                                          ? appProcessSteps.appProcessCategoryData.category.includes(
                                            "AWS"
                                          )
                                          : filterData.category.includes(
                                            "AWS"
                                          )
                                      }
                                      id="AWS"
                                    />
                                    <label
                                      className={`search_freelancer_filters filter-job-img ${filterData.category.includes("AWS") ? 'filter-find-img-check' : ''} `}
                                      htmlFor="AWS"
                                    >
                                      <LazyLoadImage
                                        alt={"Amazon_Web_Services"}
                                        src={Amazon_Web_Services}
                                      />
                                    </label>
                                  </div>
                                  <div className="tf_sound tf_sound1 tf_sound2">
                                    <input
                                      type="checkbox"
                                      name="Salesforce"
                                      value="Oracle"
                                      checked={
                                        !isEmpty(appProcessSteps) &&
                                          !isEmpty(
                                            appProcessSteps.appProcessCategoryData
                                          ) &&
                                          !isEmpty(
                                            appProcessSteps
                                              .appProcessCategoryData
                                              .category
                                          )
                                          ? appProcessSteps.appProcessCategoryData.category.includes(
                                            "Oracle"
                                          )
                                          : filterData.category.includes(
                                            "Oracle"
                                          )
                                      }
                                      id="Oracle"
                                    />
                                    <label
                                      className={`search_freelancer_filters filter-job-img ${filterData.category.includes("Oracle") ? 'filter-find-img-check' : ''} `}
                                      htmlFor="Oracle"
                                    >
                                      <LazyLoadImage
                                        alt={"Oracle_Cloud"}
                                        src={Oracle_Cloud}
                                      />
                                    </label>
                                  </div>

                                  <div className="tf_sound tf_sound1 tf_sound2">
                                    <input
                                      type="checkbox"
                                      name="MS Azure"
                                      value="MS Azure"
                                      checked={
                                        !isEmpty(appProcessSteps) &&
                                          !isEmpty(
                                            appProcessSteps.appProcessCategoryData
                                          ) &&
                                          !isEmpty(
                                            appProcessSteps
                                              .appProcessCategoryData
                                              .category
                                          )
                                          ? appProcessSteps.appProcessCategoryData.category.includes(
                                            "MS Azure"
                                          )
                                          : filterData.category.includes(
                                            "MS Azure"
                                          )
                                      }
                                      id="MS Azure"
                                    />
                                    <label
                                      className={`search_freelancer_filters filter-job-img ${filterData.category.includes("MS Azure") ? 'filter-find-img-check' : ''} `}
                                      htmlFor="MS Azure"
                                    >
                                      <LazyLoadImage
                                        alt={"ms_azure"}
                                        src={ms_azure}
                                      />
                                    </label>
                                  </div>

                                  <div className="tf_sound tf_sound1 tf_sound2">
                                    <input
                                      type="checkbox"
                                      name="Google Cloud"
                                      value="Google Cloud"
                                      checked={
                                        !isEmpty(appProcessSteps) &&
                                          !isEmpty(
                                            appProcessSteps.appProcessCategoryData
                                          ) &&
                                          !isEmpty(
                                            appProcessSteps
                                              .appProcessCategoryData
                                              .category
                                          )
                                          ? appProcessSteps.appProcessCategoryData.category.includes(
                                            "Google Cloud"
                                          )
                                          : filterData.category.includes(
                                            "Google Cloud"
                                          )
                                      }
                                      id="Google Cloud"
                                    />
                                    <label
                                      className={`search_freelancer_filters filter-job-img ${filterData.category.includes("Google Cloud") ? 'filter-find-img-check' : ''} `}
                                      htmlFor="Google Cloud"
                                    >
                                      <LazyLoadImage
                                        alt={"google_cloud"}
                                        src={google_cloud}
                                      />
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-12 nopad"><hr /></div>
                          <>
                            {/* <div className="tf_app_search freelancer-search-list-view-new" id="list-view-filters-and-search-box-container">
                            <div className="row">

                              <div className="col-md-5">
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
                              <div className="col-md-4">
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
                              <div className="col-md-3">
                                <div className="btn-group btn-group-toggle"
                                  data-toggle="buttons"
                                  id="list-view-grid-view-button-container"
                                >
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
                                    ></i>{" "}
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
                                    ></i>{" "}
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
                              <div className="col-md-12 freelancer-count-color">
                                {!isLoading && (
                                  <p>{allFreelancersData.length} Cloud Experts found </p>
                                )}
                              </div>
                            </div>


                          </div> */}
                          </>
                          <div className="">
                            <div className="box-shadow-none panel panel-primary" id="toggle-box-for-filters">

                              <div
                                className="col-md-12 collapse multi-collapse freelancer-search-list-view-new mt-20 border-grey-section"
                                id="horizontal-filters"
                              >
                                <div className="panel-body">
                                  <div className="find-filter-navigation">
                                    <div
                                      className="sidebar_all_filters"
                                      id="accordion"
                                    >
                                      <div className="col-md-4">
                                        <div className="card card-body">
                                          <h4 className="search_freelancer_filters_title">
                                            Certification Required
                                          </h4>
                                          <div
                                            onChange={this.handleByCertifi}
                                            name="certificateOption"
                                            id="certificateOption"
                                          >
                                            <div className="tf_sound tf_sound1">
                                              <input
                                                type="checkbox"
                                                name="Yes"
                                                checked={certificateOption.includes(
                                                  "Yes"
                                                )}
                                                id="Yes"
                                              />
                                              <label
                                                className="search_freelancer_filters"
                                                htmlFor="Yes"
                                              >
                                                {" "}
                                                Yes
                                              </label>
                                            </div>
                                            <div className="tf_sound tf_sound1">
                                              <input
                                                type="checkbox"
                                                name="Yes"
                                                checked={certificateOption.includes(
                                                  "No"
                                                )}
                                                id="No"
                                              />
                                              <label
                                                className="search_freelancer_filters"
                                                htmlFor="No"
                                              >
                                                {" "}
                                                No
                                              </label>
                                            </div>
                                          </div>
                                        </div>

                                        <div className="card card-body">
                                          <h4 className="search_freelancer_filters_title">
                                            Availability
                                          </h4>
                                          <div
                                            onChange={this.handleAvailability}
                                            name="availability"
                                            id="availability"
                                          >
                                            <div className="tf_sound tf_sound1">
                                              <input
                                                type="checkbox"
                                                name="hours"
                                                value="Less than 40 hours"
                                                checked={
                                                  availability ===
                                                  "Less than 40 hours"
                                                }
                                                id="Less than 40 hours"
                                              />
                                              <label
                                                className="search_freelancer_filters"
                                                htmlFor="Less than 40 hours"
                                              >
                                                {lessThan} 40 hours
                                              </label>
                                            </div>
                                            <div className="tf_sound tf_sound1">
                                              <input
                                                type="checkbox"
                                                name="hours"
                                                value="More than 40 hours"
                                                checked={
                                                  availability ===
                                                  "More than 40 hours"
                                                }
                                                id="More than 40 hours"
                                              />
                                              <label
                                                className="search_freelancer_filters"
                                                htmlFor="More than 40 hours"
                                              >
                                                {'>'} 40 hours
                                              </label>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="col-md-4">
                                        <div className="card card-body">
                                          <h4 className="search_freelancer_filters_title">
                                            Experience Level
                                          </h4>
                                          <div
                                            onChange={this.handleExpLevelChange}
                                            name="expLevel"
                                            id="expLevel"
                                          >
                                            <div className="tf_sound tf_sound1">
                                              <input
                                                type="checkbox"
                                                name="Beginner"
                                                checked={expLevel.includes(
                                                  "Beginner"
                                                )}
                                                id="Beginner"
                                              />
                                              <label
                                                className="search_freelancer_filters"
                                                htmlFor="Beginner"
                                              >
                                                {" "}
                                                Beginner
                                              </label>
                                            </div>
                                            <div className="tf_sound tf_sound1">
                                              <input
                                                type="checkbox"
                                                name="Beginner"
                                                checked={expLevel.includes(
                                                  "Intermediate"
                                                )}
                                                id="Intermediate"
                                              />
                                              <label
                                                className="search_freelancer_filters"
                                                htmlFor="Intermediate"
                                              >
                                                {" "}
                                                Intermediate
                                              </label>
                                            </div>
                                            <div className="tf_sound tf_sound1">
                                              <input
                                                type="checkbox"
                                                name="Beginner"
                                                checked={expLevel.includes("Expert")}
                                                id="Expert"
                                              />
                                              <label
                                                className="search_freelancer_filters"
                                                htmlFor="Expert"
                                              >
                                                {" "}
                                                Expert{" "}
                                              </label>
                                            </div>
                                          </div>
                                        </div>

                                        <div className="card card-body">
                                          <h4 className="search_freelancer_filters_title">
                                            Project Preference
                                          </h4>
                                          <div
                                            onChange={this.handleProjectPreference}
                                            name="projectPreference"
                                            id="projectPreference"
                                          >
                                            <div className="tf_sound tf_sound1">
                                              <input
                                                type="checkbox"
                                                name="Both short-term and long-term projects"
                                                value="Both short-term and long-term projects"
                                                checked={projectPreference.includes(
                                                  "Both short-term and long-term projects"
                                                )}
                                                id="Both short-term and long-term projects"
                                              />
                                              <label
                                                className="search_freelancer_filters"
                                                htmlFor="Both short-term and long-term projects"
                                              >
                                                {" "}
                                                Both
                                              </label>
                                            </div>
                                            <div className="tf_sound tf_sound1">
                                              <input
                                                type="checkbox"
                                                name="Both short-term and long-term projects"
                                                value="Long-term projects (more than 3 months)"
                                                checked={projectPreference.includes(
                                                  "Long-term projects (more than 3 months)"
                                                )}
                                                id="Long-term projects (more than 3 months)"
                                              />
                                              <label
                                                className="search_freelancer_filters"
                                                htmlFor="Long-term projects (more than 3 months)"
                                              >
                                                {" "}
                                                Long-term
                                              </label>
                                            </div>
                                            <div className="tf_sound tf_sound1">
                                              <input
                                                type="checkbox"
                                                name="Both short-term and long-term projects"
                                                value="Short-term projects (less than 3 months)"
                                                checked={projectPreference.includes(
                                                  "Short-term projects (less than 3 months)"
                                                )}
                                                id="Short-term projects (less than 3 months)"
                                              />
                                              <label
                                                className="search_freelancer_filters"
                                                htmlFor="Short-term projects (less than 3 months)"
                                              >
                                                Short-term
                                              </label>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="col-md-4">
                                        <div className="card card-body">
                                          <div className=''>
                                            <h4 className="search_freelancer_filters_title">
                                              Location{" "}
                                            </h4>
                                            <div className="tf_search search_user_for_chating">
                                              <form onSubmit={this.OnEnterByCountry}>
                                                <Autosuggest
                                                  suggestions={suggestions}
                                                  onSuggestionsFetchRequested={
                                                    this.onSuggestionsFetchRequested
                                                  }
                                                  onSuggestionsClearRequested={
                                                    this.onSuggestionsClearRequested
                                                  }
                                                  getSuggestionValue={
                                                    getSuggestionValue
                                                  }
                                                  renderSuggestion={renderSuggestion}
                                                  inputProps={inputProps}
                                                />
                                              </form>
                                            </div>
                                          </div>
                                          <div className='clearfix'></div>
                                          <div className='mt-20'>
                                            <h4 className="search_freelancer_filters_title">
                                              {" "}
                                              Language
                                            </h4>
                                            <div className="tf_search search_user_for_chating">
                                              <form onSubmit={this.OnEnterByLanguage}>
                                                <Autosuggest
                                                  suggestions={suggestions}
                                                  onSuggestionsFetchRequested={
                                                    this.onLangSuggestionsFetchRequested
                                                  }
                                                  onSuggestionsClearRequested={
                                                    this.onLangSuggestionsClearRequested
                                                  }
                                                  getSuggestionValue={
                                                    getLangSuggestionValue
                                                  }
                                                  renderSuggestion={
                                                    renderLangSuggestion
                                                  }
                                                  inputProps={langInputProps}
                                                />
                                              </form>
                                            </div>
                                            <div>
                                              <button
                                                type="button"
                                                className="sidebar-reset-filter-button mt-20"
                                                onClick={this.handleReset}
                                              >
                                                Reset Filter
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="clearfix"></div>

                          {allFreelancersData &&
                            allFreelancersData.length > 0 &&
                            !isLoading ? (
                            allFreelancersData.map((freelancer, i) => {
                              // console.log(freelancer.profile.category)
                              return (
                                <div id="freelancer-search-list-view" className="freelancer-search-list-view-new" key={i}>
                                  <div className='col-md-12'>
                                    <div className='row'>
                                      <div className='col-md-12 nopad'>
                                        <div className='col-md-12 col-sm-10  col-xs-10 nopad'>
                                          <div className='col-md-2 text-center'>
                                            <div className="tf_image freelancer-search-list-filter-img-container">
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
                                                  id="freelancer-search-list-view-cloudExpert-profile-image"
                                                  className='m-0'
                                                />
                                              ) : (
                                                <img
                                                  className="avatar-img freelancer-search-list-filter-img m-0"
                                                  src={faceImg}
                                                  alt="User"
                                                  id="freelancer-search-list-view-cloudExpert-profile-image"

                                                />
                                              )}
                                            </div>
                                          </div>
                                          <div className='col-md-8'>
                                            <div className="">
                                              <Link
                                                onClick={this.handleOPenModal.bind(this, freelancer.profile, i)}
                                              >
                                                <h4 className='txt-22-bold'>
                                                  {freelancer.full_name}{" "}
                                                  {
                                                    freelancer &&
                                                    freelancer.profile &&
                                                    freelancer.profile
                                                      .is_certified && (
                                                      <img
                                                        title="Certification Required"
                                                        src={certification_required}
                                                        alt="Certified"
                                                        className="certification-required" />
                                                    )
                                                  }

                                                </h4>
                                              </Link>
                                            </div>
                                            <div className="row">

                                              <div className="col-md-6 nopad">

                                                {/* Start profile Title */}
                                                <div className="tf_f_content">
                                                  <p className="ce-current-job-title text-muted">
                                                    <span>
                                                      {freelancer.profile &&
                                                        freelancer.profile
                                                          .current_job_title}
                                                    </span>
                                                  </p>
                                                </div>
                                                {/* Start profile Title */}

                                              </div>

                                            </div>
                                          </div>
                                          <div className='col-md-2'>
                                            <div>
                                              {/* <ul className='job-search-blog-list'>

                                                {freelancer.profile.category.map((cat) => {
                                                  console.log(cat);

                                                  return <li>{this.categoriesArr(cat)} </li>
                                                })}

                                              </ul> */}
                                              <Link
                                                data-uuid={freelancer.profile_uuid}
                                                data-profile={freelancer}
                                                // onClick={this.handleClickHire}
                                                to='/sign-up'
                                                className='btn-primary-base'
                                              >
                                                Hire Cloud Expert
                                              </Link>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className='col-md-1'>

                                      </div>
                                    </div>
                                  </div>
                                  {/*  Start Row */}
                                  <div className="row">

                                    {/* Start Col 8 */}
                                    <div className="col-md-7 tf_job_posting-bdr mt-15">

                                      {/* Start Description */}
                                      <div className="row">
                                        <div className="tf_f_content">
                                          <h5>
                                            {`${freelancer.profile && freelancer.profile.about_me.substring(0, 160)}...`}{" "}
                                          </h5>
                                        </div>
                                      </div>
                                      {/* End Description */}


                                      {/* Start Skills */}
                                      <div className="row">
                                        {freelancer.profile.skill.length > 0 &&
                                          <Skills
                                            skill={freelancer.profile.skill}
                                            id=""
                                            to=""
                                            displayCount={3}
                                            cursorDisabled={true}
                                          />
                                        }
                                      </div>
                                      {/* End Skills */}
                                      <div className='clearfix'></div>
                                      <div className='col-md-4 col-sm-2 col-xs-2 nopad text-center mt-20'>
                                        {/* Start Hire Cloud Expert Button */}
                                        {/* <div className="hireCloudExpertWithOutLogin mt-10"> */}

                                        {/* <p className="" style={{ marginTop: '0px', marginBottom: '15px' }}>
                                            <Link
                                              data-uuid={freelancer.profile_uuid}
                                              data-profile={freelancer}
                                              // onClick={this.handleClickHire}
                                              to='/sign-up'
                                              className='btn-primary-base'
                                            >
                                              Hire Cloud Expert
                                            </Link>
                                          </p> */}
                                        {/* <SignUpPopUpNew
                                                        isOpen={this.state.openLoginModal}
                                                        closeModal={this.closeModal}
                                                        history={this.props.history}
                                                        fromHireMe={true}
                                                        freelancerId={
                                                            this.state.currentUserFreelancerId
                                                        }
                                                        /> */}

                                        {/* </div> */}
                                        {/* End Hire Cloud Expert Button */}
                                      </div>

                                    </div>
                                    {/* End Col 8 */}

                                    {/* Start Col 2 */}
                                    <div className="col-md-5 txt-16 mt-15">
                                      <div className='row'>
                                        <div className='col-md-6'>
                                          {/* Start Pricing */}

                                          <div className="tf_f_content mb-15">
                                            <strong>Pricing:</strong>&nbsp;&nbsp;
                                            {freelancer.profile &&
                                              freelancer.profile.hourly_rate ? (
                                              <span>
                                                $
                                                {isNaN(
                                                  freelancer.profile.hourly_rate
                                                )
                                                  ? "00"
                                                  : parseFloat(
                                                    freelancer.profile.hourly_rate
                                                  ).toFixed(2)}{" "}
                                                / hr
                                              </span>
                                            ) : (
                                              <h5 className="text-center">$0.00 / hr</h5>
                                            )}
                                          </div>
                                          {/* Start Earning */}
                                          <div className="tf_f_content mb-15">
                                            <strong>Earning:</strong>&nbsp;&nbsp;
                                            <span className="text-center">${freelancer.amount_earned}k earned</span>
                                          </div>

                                          {/* End Earning */}

                                          {/* End Pricing */}
                                        </div>
                                        <div className='col-md-6'>
                                          {/* Start Rating */}
                                          <div className="mb-15">
                                            <strong>Rating:</strong>&nbsp;&nbsp;
                                            {this.returnStars(
                                              freelancer && freelancer.maximum_rating
                                            )}
                                            <span
                                              style={{
                                                color: "#0DA4DE",
                                                fontWeight: "bold",
                                                size: "14px",
                                                marginTop: "20px",
                                              }}
                                            ></span>
                                          </div>
                                          {/* End Rating */}

                                          <div className="tf_f_content">
                                            <h5>
                                              <strong>Location:</strong>&nbsp;&nbsp;
                                              {freelancer &&
                                                freelancer.profile &&
                                                freelancer.profile
                                                  .current_location_country
                                                ? this.returnFlag(
                                                  freelancer.profile
                                                    .current_location_country
                                                )
                                                : "Anywhere"}

                                              {freelancer.profile &&
                                                freelancer.profile
                                                  .current_location_country}
                                            </h5>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="clearfix"></div>

                                    </div>
                                    {/* End Col 2 */}

                                  </div>
                                  {/*  End Row */}


                                </div>
                              );
                            })
                          ) : this.props.applicationIsLoading && !loadMoreClicked && allFreelancersData && allFreelancersData.length === 0 ? (
                            <div className="grid-loader my-feed-loader col-md-12">
                              <Loader
                                type="Grid"
                                color="#00BFFF"
                                height={100}
                                width={100}
                              />
                            </div>
                          ) : (
                            <p className="text-center mt-20 mb-2">
                              No Items to display.
                            </p>
                          )}

                          {currentResponse.length > 0 &&
                            currentResponse.length > 8 ? (
                            <div
                              className="mt-10 mb-1"
                              style={{ padding: "10px" }}
                            >
                              {!hideLoadMore ? (
                                <button
                                  className="btn load_more_btn_find_work mt-10"
                                  style={{
                                    opacity: "1",
                                    padding: "10px 50px",
                                    borderRadius: "5px",
                                    fontSize: "13px",
                                    background: "#0DA4DE",
                                    color: "#fffffff7",
                                    fontWeight: "600",
                                    marginLeft: "42",
                                    border: "none",
                                    position: "relative",
                                    boxShadow: "0px 3px 10px #0DA4DE",
                                  }}
                                  onClick={this.handleLoadMore}
                                >
                                  Show More
                                </button>
                              ) : (
                                ""
                              )}

                              {loadMoreClicked ? (
                                <img src={loadMoreSrc} className="mt-10 ml-1" alt="" />
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
          :
          <div className="wraper">
            <div className="find-freelancer-mn new-find-cloud-experts-with-horizontal-filter">
              <div className="container">
                <div className="tf-find-freelancer">
                  <form action="" method="">
                    <div className="">
                      <div className="col-md-12">
                        <div className="row">
                          <div className="col-md-12 mb-2">
                            <div className="">
                              <div className="post-edit-dropdown">
                                <h1 className="find-work_title">
                                  Cloud Experts
                                </h1>
                                {/* <div
                                  onChange={this.handleGetFreelancer}
                                  name="jobCat"
                                  className='find-work-logo-skill-inner-list'
                                >
                                  <div className="tf_sound tf_sound1">
                                    <input
                                      type="checkbox"
                                      name="Salesforce"
                                      value="Salesforce"
                                      checked={
                                        !isEmpty(appProcessSteps) &&
                                          !isEmpty(
                                            appProcessSteps.appProcessCategoryData
                                          ) &&
                                          !isEmpty(
                                            appProcessSteps
                                              .appProcessCategoryData
                                              .category
                                          )
                                          ? appProcessSteps.appProcessCategoryData.category.includes(
                                            "Salesforce"
                                          )
                                          : filterData.category.includes(
                                            "Salesforce"
                                          )
                                      }
                                      id="Salesforce"
                                    />
                                    <label
                                      className={`search_freelancer_filters filter-job-img ${filterData.category.includes("Salesforce") ? 'filter-find-img-check' : ''} `}
                                      htmlFor="Salesforce"
                                    >
                                      <LazyLoadImage
                                        alt={"Salesforce"}
                                        src={Salesforce}
                                      />
                                    </label>
                                  </div>
                                  <div className="tf_sound tf_sound1">
                                    <input
                                      type="checkbox"
                                      name="Salesforce"
                                      value="AWS"
                                      checked={
                                        !isEmpty(appProcessSteps) &&
                                          !isEmpty(
                                            appProcessSteps.appProcessCategoryData
                                          ) &&
                                          !isEmpty(
                                            appProcessSteps
                                              .appProcessCategoryData
                                              .category
                                          )
                                          ? appProcessSteps.appProcessCategoryData.category.includes(
                                            "AWS"
                                          )
                                          : filterData.category.includes(
                                            "AWS"
                                          )
                                      }
                                      id="AWS"
                                    />
                                    <label
                                      className={`search_freelancer_filters filter-job-img ${filterData.category.includes("AWS") ? 'filter-find-img-check' : ''} `}
                                      htmlFor="AWS"
                                    >
                                      <LazyLoadImage
                                        alt={"Amazon_Web_Services"}
                                        src={Amazon_Web_Services}
                                      />
                                    </label>
                                  </div>
                                  <div className="tf_sound tf_sound1">
                                    <input
                                      type="checkbox"
                                      name="Salesforce"
                                      value="Oracle"
                                      checked={
                                        !isEmpty(appProcessSteps) &&
                                          !isEmpty(
                                            appProcessSteps.appProcessCategoryData
                                          ) &&
                                          !isEmpty(
                                            appProcessSteps
                                              .appProcessCategoryData
                                              .category
                                          )
                                          ? appProcessSteps.appProcessCategoryData.category.includes(
                                            "Oracle"
                                          )
                                          : filterData.category.includes(
                                            "Oracle"
                                          )
                                      }
                                      id="Oracle"
                                    />
                                    <label
                                      className={`search_freelancer_filters filter-job-img ${filterData.category.includes("Oracle") ? 'filter-find-img-check' : ''} `}
                                      htmlFor="Oracle"
                                    >
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
                                      checked={
                                        !isEmpty(appProcessSteps) &&
                                          !isEmpty(
                                            appProcessSteps.appProcessCategoryData
                                          ) &&
                                          !isEmpty(
                                            appProcessSteps
                                              .appProcessCategoryData
                                              .category
                                          )
                                          ? appProcessSteps.appProcessCategoryData.category.includes(
                                            "MS Azure"
                                          )
                                          : filterData.category.includes(
                                            "MS Azure"
                                          )
                                      }
                                      id="MS Azure"
                                    />
                                    <label
                                      className={`search_freelancer_filters filter-job-img ${filterData.category.includes("MS Azure") ? 'filter-find-img-check' : ''} `}
                                      htmlFor="MS Azure"
                                    >
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
                                      checked={
                                        !isEmpty(appProcessSteps) &&
                                          !isEmpty(
                                            appProcessSteps.appProcessCategoryData
                                          ) &&
                                          !isEmpty(
                                            appProcessSteps
                                              .appProcessCategoryData
                                              .category
                                          )
                                          ? appProcessSteps.appProcessCategoryData.category.includes(
                                            "Google Cloud"
                                          )
                                          : filterData.category.includes(
                                            "Google Cloud"
                                          )
                                      }
                                      id="Google Cloud"
                                    />
                                    <label
                                      className={`search_freelancer_filters filter-job-img ${filterData.category.includes("Google Cloud") ? 'filter-find-img-check' : ''} `}
                                      htmlFor="Google Cloud"
                                    >
                                      <LazyLoadImage
                                        alt={"google_cloud"}
                                        src={google_cloud}
                                      />
                                    </label>
                                  </div>
                                </div> */}
                              </div>
                            </div>
                          </div>
                          {/* <div class="col-md-12 nopad"><hr /></div> */}
                          {/* <div>
                            <div className='col-md-12 col-sm-12 col-xs-12'>
                              <div className='sorting-tab'>
                                <div className='row vt-center d-flex'>
                                  <div className='col-md-6 col-sm-6 col-xs-6'>
                                    <p className='text-muted'><strong>Showing 1 - 12 of 455</strong></p>
                                  </div>
                                  <div className='col-md-6 col-sm-6 col-xs-6'>
                                    <span>
                                      <ul className='sorting-list'>
                                        <li className='active'><i class="fa fa-th-large" aria-hidden="true"></i></li>
                                        <li><i class="fa fa-th-list" aria-hidden="true"></i></li>
                                        <li>
                                          <select className='form-control ml-2'>
                                            <option>Relevance</option>
                                            <option>Rating</option>
                                            <option>Popular</option>
                                            <option>Latest</option>
                                            <option>Free</option>
                                          </select>
                                        </li>
                                      </ul>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div> */}
                          <>
                            {/* <div className="tf_app_search freelancer-search-list-view-new">

                            <div className="row">

                              <div className="col-md-5">
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
                              <div className="col-md-4">
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
                              <div className="col-md-3">
                                <div
                                  className="btn-group btn-group-toggle"
                                  data-toggle="buttons"
                                  id="list-view-grid-view-button-container"
                                >
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
                                    ></i>{" "}
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
                                    ></i>{" "}
                                    Grid
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
                              <div className="col-md-12 freelancer-count-color">
                                {!isLoading && (
                                  <p> {allFreelancersData.length} Cloud Experts found </p>
                                )}
                              </div>
                            </div>

                          </div>
                          <div className="">
                            <div
                              className="box-shadow-none panel panel-primary"
                              id="toggle-box-for-filters"
                            >

                              <div
                                className="col-md-12 collapse multi-collapse border-grey-section"
                                id="horizontal-filters"
                              >
                                <div className="panel-body">
                                  <div className="find-filter-navigation">
                                    <div
                                      className="sidebar_all_filters"
                                      id="accordion"
                                    >


                                      <div className="col-md-4">
                                        <div className="card card-body">
                                          <h4 className="search_freelancer_filters_title">
                                            Certification Required
                                          </h4>
                                          <div
                                            onChange={this.handleByCertifi}
                                            name="certificateOption"
                                            id="certificateOption"
                                          >
                                            <div className="tf_sound tf_sound1">
                                              <input
                                                type="checkbox"
                                                name="Yes"
                                                checked={certificateOption.includes(
                                                  "Yes"
                                                )}
                                                id="Yes"
                                              />
                                              <label
                                                className="search_freelancer_filters"
                                                htmlFor="Yes"
                                              >
                                                {" "}
                                                Yes
                                              </label>
                                            </div>
                                            <div className="tf_sound tf_sound1">
                                              <input
                                                type="checkbox"
                                                name="Yes"
                                                checked={certificateOption.includes(
                                                  "No"
                                                )}
                                                id="No"
                                              />
                                              <label
                                                className="search_freelancer_filters"
                                                htmlFor="No"
                                              >
                                                {" "}
                                                No
                                              </label>
                                            </div>
                                          </div>
                                        </div>

                                        <div className="card card-body">
                                          <h4 className="search_freelancer_filters_title">
                                            Availability
                                          </h4>
                                          <div
                                            onChange={this.handleAvailability}
                                            name="availability"
                                            id="availability"
                                          >
                                            <div className="tf_sound tf_sound1">
                                              <input
                                                type="checkbox"
                                                name="hours"
                                                value="Less than 40 hours"
                                                checked={
                                                  availability ===
                                                  "Less than 40 hours"
                                                }
                                                id="Less than 40 hours"
                                              />
                                              <label
                                                className="search_freelancer_filters"
                                                htmlFor="Less than 40 hours"
                                              >
                                                {lessThan} 40 hours
                                              </label>
                                            </div>
                                            <div className="tf_sound tf_sound1">
                                              <input
                                                type="checkbox"
                                                name="hours"
                                                value="More than 40 hours"
                                                checked={
                                                  availability ===
                                                  "More than 40 hours"
                                                }
                                                id="More than 40 hours"
                                              />
                                              <label
                                                className="search_freelancer_filters"
                                                htmlFor="More than 40 hours"
                                              >
                                                {'>'} 40 hours
                                              </label>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="col-md-4">
                                        <div className="card card-body">
                                          <h4 className="search_freelancer_filters_title">
                                            Experience Level
                                          </h4>
                                          <div
                                            onChange={this.handleExpLevelChange}
                                            name="expLevel"
                                            id="expLevel"
                                          >
                                            <div className="tf_sound tf_sound1">
                                              <input
                                                type="checkbox"
                                                name="Beginner"
                                                checked={expLevel.includes(
                                                  "Beginner"
                                                )}
                                                id="Beginner"
                                              />
                                              <label
                                                className="search_freelancer_filters"
                                                htmlFor="Beginner"
                                              >
                                                {" "}
                                                Beginner
                                              </label>
                                            </div>
                                            <div className="tf_sound tf_sound1">
                                              <input
                                                type="checkbox"
                                                name="Beginner"
                                                checked={expLevel.includes(
                                                  "Intermediate"
                                                )}
                                                id="Intermediate"
                                              />
                                              <label
                                                className="search_freelancer_filters"
                                                htmlFor="Intermediate"
                                              >
                                                {" "}
                                                Intermediate
                                              </label>
                                            </div>
                                            <div className="tf_sound tf_sound1">
                                              <input
                                                type="checkbox"
                                                name="Beginner"
                                                checked={expLevel.includes("Expert")}
                                                id="Expert"
                                              />
                                              <label
                                                className="search_freelancer_filters"
                                                htmlFor="Expert"
                                              >
                                                {" "}
                                                Expert{" "}
                                              </label>
                                            </div>
                                          </div>
                                        </div>

                                        <div className="card card-body">
                                          <h4 className="search_freelancer_filters_title">
                                            Project Preference
                                          </h4>
                                          <div
                                            onChange={this.handleProjectPreference}
                                            name="projectPreference"
                                            id="projectPreference"
                                          >
                                            <div className="tf_sound tf_sound1">
                                              <input
                                                type="checkbox"
                                                name="Both short-term and long-term projects"
                                                value="Both short-term and long-term projects"
                                                checked={projectPreference.includes(
                                                  "Both short-term and long-term projects"
                                                )}
                                                id="Both short-term and long-term projects"
                                              />
                                              <label
                                                className="search_freelancer_filters"
                                                htmlFor="Both short-term and long-term projects"
                                              >
                                                {" "}
                                                Both
                                              </label>
                                            </div>
                                            <div className="tf_sound tf_sound1">
                                              <input
                                                type="checkbox"
                                                name="Both short-term and long-term projects"
                                                value="Long-term projects (more than 3 months)"
                                                checked={projectPreference.includes(
                                                  "Long-term projects (more than 3 months)"
                                                )}
                                                id="Long-term projects (more than 3 months)"
                                              />
                                              <label
                                                className="search_freelancer_filters"
                                                htmlFor="Long-term projects (more than 3 months)"
                                              >
                                                {" "}
                                                Long-term
                                              </label>
                                            </div>
                                            <div className="tf_sound tf_sound1">
                                              <input
                                                type="checkbox"
                                                name="Both short-term and long-term projects"
                                                value="Short-term projects (less than 3 months)"
                                                checked={projectPreference.includes(
                                                  "Short-term projects (less than 3 months)"
                                                )}
                                                id="Short-term projects (less than 3 months)"
                                              />
                                              <label
                                                className="search_freelancer_filters"
                                                htmlFor="Short-term projects (less than 3 months)"
                                              >
                                                Short-term
                                              </label>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="col-md-4">
                                        <div className="card card-body">
                                          <div>
                                            <h4 className="search_freelancer_filters_title">
                                              Location{" "}
                                            </h4>
                                            <div className="tf_search search_user_for_chating">
                                              <form onSubmit={this.OnEnterByCountry}>
                                                <Autosuggest
                                                  suggestions={suggestions}
                                                  onSuggestionsFetchRequested={
                                                    this.onSuggestionsFetchRequested
                                                  }
                                                  onSuggestionsClearRequested={
                                                    this.onSuggestionsClearRequested
                                                  }
                                                  getSuggestionValue={
                                                    getSuggestionValue
                                                  }
                                                  renderSuggestion={renderSuggestion}
                                                  inputProps={inputProps}
                                                />
                                              </form>
                                            </div>
                                          </div>
                                          <div class="clearfix"></div>
                                          <div className='mt-20'>
                                            <h4 className="search_freelancer_filters_title">
                                              {" "}
                                              Language
                                            </h4>
                                            <div className="tf_search search_user_for_chating">
                                              <form onSubmit={this.OnEnterByLanguage}>
                                                <Autosuggest
                                                  suggestions={suggestions}
                                                  onSuggestionsFetchRequested={
                                                    this.onLangSuggestionsFetchRequested
                                                  }
                                                  onSuggestionsClearRequested={
                                                    this.onLangSuggestionsClearRequested
                                                  }
                                                  getSuggestionValue={
                                                    getLangSuggestionValue
                                                  }
                                                  renderSuggestion={
                                                    renderLangSuggestion
                                                  }
                                                  inputProps={langInputProps}
                                                />
                                              </form>
                                            </div>
                                          </div>

                                          <div className=''>
                                            <button
                                              type="button"
                                              className="sidebar-reset-filter-button mt-20"
                                              onClick={this.handleReset}
                                            >
                                              Reset Filter
                                            </button>
                                          </div>
                                        </div>
                                      </div>

                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div> */}
                          </>
                          {allFreelancersData &&
                            allFreelancersData.length > 0 &&
                            !isLoading ? (
                            allFreelancersData.map((freelancer, i) => {

                              return (
                                <div className={"col-md-4 column-number-" + patternItem(i, 3)}>
                                  <div
                                    id=""
                                    className="freelancer-search-list-view-new text-center txt-16"
                                    key={i}
                                  >
                                    <div
                                      className="row find-result-section"
                                      style={{ borderTop: "0px solid #" + Math.floor(Math.random() * 16777215).toString(16) }}
                                    >

                                      {/* <div className="grid-view-profile-colored-background">
                                                        </div> */}

                                      <div className="row">
                                        <div className="col-md-12">
                                          <div className="col-md-12 col-sm-10  col-xs-10 nopad text-left">
                                            <div className='row text-center'>
                                              <div className='col-md-12 nopad'>
                                                <span>
                                                  {freelancer &&
                                                    freelancer.profile &&
                                                    freelancer.profile.profile_picture ? (
                                                    <img
                                                      src={
                                                        freelancer &&
                                                        freelancer.profile &&
                                                        freelancer.profile
                                                          .profile_picture
                                                      }
                                                      alt="img"
                                                      className="ce-grid-view-profile-image freelancer-search-list-filter-img"
                                                    />
                                                  ) : (
                                                    <img
                                                      className="avatar-img ce-grid-view-profile-image m-0 freelancer-search-list-filter-img"
                                                      src={faceImg}
                                                      alt="User"
                                                    />
                                                  )}
                                                </span>
                                                <div className=''>
                                                  <span>
                                                    <Link
                                                      onClick={this.handleOPenModal.bind(this, freelancer.profile, i)}
                                                    >
                                                      <span className="find-work_title">
                                                        {`${freelancer.full_name.substring(0, 30)}`}{" "}
                                                        {
                                                          freelancer &&
                                                          freelancer.profile &&
                                                          freelancer.profile
                                                            .is_certified && (
                                                            <img
                                                              title="Certification Required"
                                                              src={certification_required}
                                                              alt="Certified"
                                                              className="certification-required" />
                                                          )
                                                        }
                                                      </span><br />
                                                      <p>
                                                        {/* <p className="text-muted"> */}

                                                        <strong>{`${freelancer.profile && freelancer.profile.current_job_title.substring(0, 30)}`}{" "}</strong>
                                                        {/* </p> */}
                                                      </p>
                                                    </Link>
                                                  </span>
                                                </div>

                                              </div>
                                              {/* <div className='col-md-9'>
                                                <span>
                                                  <Link
                                                    onClick={this.handleOPenModal.bind(this, freelancer.profile, i)}
                                                  >
                                                    <span className="find-work_title">
                                                      {`${freelancer.full_name.substring(0, 30)}`}{" "}
                                                      {
                                                        freelancer &&
                                                        freelancer.profile &&
                                                        freelancer.profile
                                                          .is_certified && (
                                                          <img
                                                            title="Certification Required"
                                                            src={certification_required}
                                                            alt="Certified"
                                                            className="certification-required" />
                                                        )
                                                      }
                                                    </span>
                                                  </Link>
                                                </span>
                                                <p className="text-muted">

                                                  <strong>{`${freelancer.profile && freelancer.profile.current_job_title.substring(0, 30)}`}{" "}</strong>
                                                </p>
                                              </div> */}
                                            </div>
                                          </div>
                                        </div>

                                        <div className="col-md-12 text-left">
                                          <div className="short-description text-center">
                                            {`${freelancer.profile && freelancer.profile.about_me.substring(0, 100)}...`}{" "}
                                          </div>
                                        </div>
                                        <div className='clearfix'></div>
                                        <div className='col-md-12'>
                                          {/* <hr /> */}
                                        </div>
                                        <div className="col-md-12 text-center">

                                          <div className="mb-15">
                                            {/* <strong>Rating:</strong>&nbsp;&nbsp; */}
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

                                          {!isPublic && (
                                            <div className="">
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
                                                      className="fa fa-heart-o"
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

                                          <div className="mb-15">
                                            <div className="">
                                              {/* <strong>Location:</strong>&nbsp;&nbsp; */}
                                              <span>
                                                {freelancer &&
                                                  freelancer.profile &&
                                                  freelancer.profile
                                                    .current_location_country
                                                  ? this.returnFlag1(
                                                    freelancer.profile
                                                      .current_location_country
                                                  )
                                                  : "Anywhere"}

                                                {freelancer.profile &&
                                                  freelancer.profile
                                                    .current_location_country}
                                              </span>
                                            </div>
                                          </div>
                                        </div>

                                      </div>

                                      <div className="clearfix"></div>


                                      <div className="col-md-12 text-center">
                                        <div className="skill-list-in-grid-view mb-1">
                                          {freelancer.profile.skill.length > 0 &&
                                            <Skills
                                              skill={freelancer.profile.skill}
                                              id=""
                                              // to={`/user-profile/${freelancer.profile.uuid}/true`}
                                              href={true}
                                              displayCount={1}
                                              cursorDisabled={true}
                                              gridWords={true}
                                            />
                                          }
                                        </div>
                                      </div>
                                      <div className="clearfix"></div>

                                      <div className='col-md-12 col-sm-12 col-xs-12'>
                                        <div className='d-flex pt-2'>
                                          <div className="mb-15 hour-count">
                                            {/* <strong>Pricing:</strong>&nbsp;&nbsp; */}
                                            {freelancer.profile &&
                                              freelancer.profile.hourly_rate ? (
                                              <span className="">
                                                $
                                                {isNaN(
                                                  freelancer.profile.hourly_rate
                                                )
                                                  ? "00"
                                                  : parseFloat(
                                                    freelancer.profile
                                                      .hourly_rate
                                                  ).toFixed(2)}{" "}
                                                / hr
                                              </span>
                                            ) : (
                                              <h5>$0.00 / hr</h5>
                                            )}
                                          </div>
                                          <p className='ml-auto'>
                                            <Link className='btn-primary-base m-0' to={"/sign-up"}>Hire Cloud Expert</Link>
                                          </p>
                                        </div>
                                      </div>

                                      {/* <div className='col-md-12 col-sm-12 col-xs-12 pt-2'>
                                        <p>
                                          <Link className='btn-primary-base m-0' to={"/sign-up"}>Hire Cloud Expert</Link>
                                        </p>
                                      </div> */}

                                      <div className="clearfix"></div>
                                    </div>
                                    <div className="clearfix"></div>
                                  </div>
                                  <div className="clearfix"></div>
                                </div>
                              );
                            })
                          ) : this.props.applicationIsLoading && !loadMoreClicked && allFreelancersData && allFreelancersData.length === 0 ? (
                            <div
                              className="grid-loader my-feed-loader col-md-12"
                              style={{ marginTop: "-100px" }}
                            >
                              <Loader
                                type="Grid"
                                color="#00BFFF"
                                height={100}
                                width={100}
                              />
                            </div>
                          ) : (
                            <NoDataFoundMessage
                            message={"No Items to display."} 
                            />
                            // <p className="text-center mt-20 mb-2">
                            //   No Items to display.
                            // </p>
                          )}
                          <div className="clearfix"></div>
                          {currentResponse.length > 0 &&
                            currentResponse.length > 8 ? (
                            <div
                              className="mt-10 mb-1"
                              style={{ padding: "10px" }}
                            >
                              {!hideLoadMore ? (
                                <button
                                  className="btn load_more_btn_find_work mt-10"
                                  style={{
                                    opacity: "1",
                                    padding: "10px 50px",
                                    borderRadius: "5px",
                                    fontSize: "13px",
                                    background: "#0DA4DE",
                                    color: "#fffffff7",
                                    fontWeight: "600",
                                    marginLeft: "42",
                                    border: "none",
                                    position: "relative",
                                    boxShadow: "rgb(13, 164, 222) 0px 3px 10px"
                                  }}
                                  onClick={this.handleLoadMore}
                                >
                                  Show More
                                </button>
                              ) : (
                                ""
                              )}

                              {loadMoreClicked ? (
                                <img src={loadMoreSrc} className="mt-10 ml-1" alt="" />
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
            {!this.props.applicationIsLoading && !isEmpty(this.state.profileDetail) &&
              <div className="modal-content">
                <div className="modal-header">

                  <div className="row">
                    <div className="col-md-11">
                      <h3 className="job-title-in-popup">{this.state.profileDetail.name}</h3>
                    </div>

                    <div className="col-md-1">
                      <button type="button" className="close" onClick={this.closeModals}>
                        <span aria-hidden="true">×</span>
                        <span className="sr-only">Close</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="clearfix"></div>


                <div className="modal-body">

                  <div className="col-md-6">
                    <p className="developer-and-job-expiration-date-in-popup"><strong>Visibility:</strong> <span className={"job-preference-custom-tags-" + this.state.profileDetail.visibility.toLowerCase()}>{this.state.profileDetail.visibility}</span></p>
                  </div>

                  <div className="col-md-6">
                    <p className="developer-and-job-expiration-date-in-popup"><strong>Profile Type:</strong> {this.state.profileDetail.profile_type}</p>
                  </div>

                  <div className="clearfix"></div>

                  <div className="col-md-12">
                    <hr className="popup-hr-divider-for-grid" />
                  </div>

                  <div className="col-md-12">
                    <h5 className="job-description-in-popup"><strong>About Me:</strong> {`${this.state.profileDetail.about_me.substring(0, 300)}...`}</h5>
                  </div>

                  <div className="clearfix"></div>

                  <div className="col-md-12">
                    <hr className="popup-hr-divider-for-grid" />
                  </div>

                  <div className="clearfix"></div>

                  <div className="col-md-2">
                    <h5 className="job-category-in-popup"><strong>Skills: </strong>
                    </h5>
                  </div>

                  <div className="col-md-10 nopad">
                    {!this.props.applicationIsLoading && (this.state.profileDetail.skill || []) &&
                      <Skills
                        skill={this.state.profileDetail.skill}
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


                  <div className="col-md-12">
                    <p className="project-status-counter"><strong>Availability:</strong> {this.state.profileDetail.availability}</p>
                  </div>

                  <div className="clearfix"></div>

                  <div className="col-md-12">
                    <hr className="popup-hr-divider-for-grid" />
                  </div>

                  <div className="clearfix"></div>

                  <div className="col-md-12">
                    <p className="project-status-counter"><strong>Language Proficiency:</strong> {this.state.profileDetail.english_proficiency}</p>
                  </div>

                  <div className="clearfix"></div>

                  <div className="col-md-12">
                    <hr className="popup-hr-divider-for-grid" />
                  </div>

                  <div className="clearfix"></div>

                  <div className="col-md-12">
                    <p className="project-status-counter"><strong>Experience Level:</strong> {this.state.profileDetail.experience_level}</p>
                  </div>

                  <div className="clearfix"></div>

                  <div className="col-md-12">
                    <hr className="popup-hr-divider-for-grid" />
                  </div>

                  <div className="clearfix"></div>

                  <div className="col-md-12">
                    <p className="project-status-counter"><strong>Development Experience:</strong> {this.state.profileDetail.development_experience}</p>
                  </div>

                  <div className="clearfix"></div>

                  <div className="col-md-12">
                    <hr className="popup-hr-divider-for-grid" />
                  </div>

                  <div className="clearfix"></div>

                  <div className="col-md-12">
                    <p className="project-status-counter"><strong>Hourly Rate:</strong> {this.state.profileDetail.hourly_rate}</p>
                  </div>

                  <div className="clearfix"></div>

                  <div className="col-md-12">
                    <hr className="popup-hr-divider-for-grid" />
                  </div>

                  <div className="clearfix"></div>

                  <div className="row previous-view-profile-next">
                    <div className="col-md-4">

                    </div>

                    <div className="col-md-4 popup-view-posting-button-container">
                      <a style={{ marginTop: '10px' }} className="popup-view-posting-button" href={!_.isEmpty(this.props.currentUser)
                        ? `user-profile/${this.state.profileDetail.uuid}`
                        : `/sign-up`}>
                        {/* user-profile/${this.state.profileDetail.uuid}/${true} */}
                        View Profile
                      </a>
                    </div>


                    <div className="col-md-4">
                      {/* {
                                        this.state.currentArrayKey < this.state.allFreelancersData.length &&
                                        (<a href="javascript:void(0)" style={{float: 'right', fontWeight: 'bold',marginTop:'10px'}} onClick={this.changeProfile.bind(this,this.state.profileDetail.user_id, 'next')}> Next</a>)
                                      } */}
                    </div>
                  </div>
                  <div className="clearfix"></div>
                </div>

                {
                  1 < this.state.currentArrayKey &&
                  (<a href="javascript:void(0)" onClick={this.changeProfile.bind(this, this.state.profileDetail.user_id, 'previous')} className="previous-link" > <i className="fa fa-chevron-left" aria-hidden="true"></i></a>)
                }

                {
                  this.state.currentArrayKey < this.state.allFreelancersData.length &&
                  (<a href="javascript:void(0)" onClick={this.changeProfile.bind(this, this.state.profileDetail.user_id, 'next')} className="next-link"> <i className="fa fa-chevron-right" aria-hidden="true"></i></a>)
                }
              </div>
            }
          </div>
        </Modal>
        {/* <Footer getCat={this.getCat} /> */}
      </div>
    )
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
    getProfile: (id, jobId, isPublic) =>
      dispatch(getProfileForFreelancer(id, jobId, isPublic)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CESearch);


