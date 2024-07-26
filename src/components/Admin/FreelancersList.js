import React, { Component } from "react";
import { connect } from "react-redux";
import Footer from '../miscellaneous/Footer';
import { getFilteredDataForJobs } from '../../Actions/SearchActions';
import { getAllFreelancers, approveFreelancer } from '../../Actions/AdminActions';
import AdminHeader from "../miscellaneous/AdminHeader";
// import path2019 from '../../static/admin_images/Path_2019.svg';
// import { Link } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';
import countryList from 'react-select-country-list';

import { isEmpty } from 'lodash';
import LANGUAGES from '../../constants/languages';
import COUNTRIES from '../../constants/countryListWithCodes'
import ReactCountryFlag from "react-country-flag"
import loadMoreSrc from "../../static/images/loadMore.gif";
import Skills from '../Common/Skills'
import AdminDashboardSidebar from "./AdminDashboardSidebar";
import Modal from "react-modal";
import _ from "lodash";
import Loader from "react-loader-spinner";
import previewGraph from "../../../src/static/images/orange-theme-graph.png";
// import iconImg from "../../../src/static/images/icon.png";
import CloudExpertList from "./CloudExpertList";
import ShowJobs from "./ShowJob";
import SuccessSweetAlert from "../CommonComponets/SweetAlert/SuccessSweetAlert";

const allLanguages = LANGUAGES;
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



const getLangSuggestions = value => {
  const inputValue = value.trim().toLowerCase()
  const inputLength = inputValue.length
  return inputLength === 0 ? [] : allLanguages.filter(lang =>
    lang.toLowerCase().slice(0, inputLength) === inputValue
  )
}

const renderLangSuggestion = suggestion => (
  <div>
    {suggestion}
  </div>
)

const countries = countryList().getData()
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase()
  const inputLength = inputValue.length;
  return inputLength === 0 ? [] : countries.filter(country =>
    country.label.toLowerCase().slice(0, inputLength) === inputValue
  )
}


const renderSuggestion = suggestion => (
  <div>
    {suggestion.label}
  </div>
)

class FreelancersList extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      activeTab: 'approved',
      freelancers: [],
      allFreelancers: [],
      filteredFreelancers: [],
      activePage: 1,
      pageNumber: 1,
      freelancersPerPage: 5,
      isApproved: false,
      searchItem: '',
      isSearched: false,
      filterApproved: "FILTER",
      value: '',
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
      countryName: '',
      certificate: '',
      filterData: {
        category: []
      },
      sortItem: '',
      favour: '',
      newSearchItem: '',
      certificateOption: '',
      addLanguage: "Select Language",
      langValue: '',
      hideShowMore: false,
      openModal: false,
      profileDetail: '',
      currentArrayKey: 0
    }
  }

  componentDidMount() {
    let location = this.props.history.location;
    if (
      location.state &&
      location.state.category &&
      location.state.category.length > 0
    ) {
      let { filterData } = this.state;
      if (!filterData.category.includes(location.state.category)) {
        filterData.category[0] = this.props.history.location.state.category;
        this.setState({ filterData: filterData }, () => {
          this.getFreelancersDataApiCall("fromDidMount", this.state.activeTab);
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
        this.getFreelancersDataApiCall("fromDidMount", this.state.activeTab);
      });
    } else {
      this.getFreelancersDataApiCall("fromDidMount", this.state.activeTab);
    }
  }

  handleOPenModal = (row, i, e) => {
    e.preventDefault();
    this.setState({ openModal: true, currentArrayKey: i + 1 })
    this.setState({ profileDetail: row })
  }

  closeModals = () => {
    this.setState({ profileDetail: "", openModal: false })
  }

  changeProfile = (id, type) => {
    let key = ''
    this.state.freelancers.map((row, index) => {
      if (row.profile.user_id === id) {
        if (type === 'next') {
          key = index + 1
        } else {
          key = index - 1
        }
        this.setState({ profileDetail: this.state.freelancers[key], currentArrayKey: key + 1 })
      }
      return row
    })
  }

  showASection = (event) => {
    this.setState({ activeTab: event.target.id, newSearchItem: "" })

    this.getFreelancersDataApiCall("fromDidMount", event.target.id);
  }

  getFreelancersDataApiCall = (type, tab) => {
    this.setState({
      freelancers: []
    })
    const isAllFreelancers = (tab === 'approved')

    this.props.getAdminFilter(this.state.favour, "search_freelancers", this.state.filterData, "status", isAllFreelancers, "search", this.state.newSearchItem, "find_freelancers", this.state.activePage).then((res) => {
      this.setState({
        freelancers: res
      })
      if (res.length < 10) {
        this.setState({
          hideShowMore: true,
        })
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ filteredFreelancers: nextProps.allFreelancers && nextProps.allFreelancers })
  }

  returnStars = (value) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <i
          className="fa fa-star first"
          style={{
            color: i + 1 > value ? "#8080806e" : "#0DA4DE",
            fontSize: "18px"
          }}
        // onClick={() => this.handleStars(i + 1)}
        ></i>
      );
    }
    return stars;
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
          marginRight: "20px",
        }}
        title={"country"}
      />
    );
  }

  handleShowMore = () => {
    let { freelancers } = this.state
    const isAllFreelancers = (this.state.activeTab === 'approved')
    const newStatusType = !isEmpty(this.state.sortItem) ? (this.state.sortItem === "Approved") ? true : false : true
    console.log('newStatusType', newStatusType)
    // const newStatusType = !isEmpty(this.state.sortItem) ? (this.state.sortItem === "Approved") ? true : this.state.sortItem === "Not Approved" ? false : this.state.sortItem === "Banned" ? "banned" : ""  : ""
    let newContracts = freelancers
    this.setState({ pageNumber: this.state.pageNumber + 1 })
    this.props.getAdminFilter(this.state.favour, "search_freelancers", this.state.filterData, "status", isAllFreelancers, "search", this.state.newSearchItem, "find_freelancers", this.state.pageNumber + 1).then((res) => {
      if (res.length > 0) {
        newContracts.push(...res)
        if (res.length < 10) {
          this.setState({
            hideShowMore: true,
            freelancers: newContracts
          })
        }
        else {
          this.setState({
            freelancers: newContracts
          })

        }
      }
    })
  }

  handleApprove = (id) => {
    this.props.approveFreelancer(id)
      .then((res) => {
        if (res.status === 200) {
          const getAlert = () => (
            // <div className="app-pro2-swal">
            //   <SweetAlert success title="" onConfirm={this.hideAlert.bind()} showConfirm={true}>
            //     <img src={this.state.src} alt="" />
            //     <h3>
            //       <strong>
            //         {res.message}
            //       </strong>
            //     </h3>
            //   </SweetAlert>
            // </div>
            <SuccessSweetAlert 
            show={true}
            handleConfirm={this.hideAlert.bind()}
            message={"res.message"}
            />
          );

          this.setState({ isApproved: getAlert() })

          const isAllFreelancers = (this.state.activeTab === 'approved')
          // const newStatusType = !isEmpty(this.state.sortItem) ? (this.state.sortItem === "Approved") ? true : this.state.sortItem === "Not Approved" ? false : this.state.sortItem === "Banned" ? "banned" : ""  : ""

          this.props.getAdminFilter(this.state.favour, "search_freelancers", this.state.filterData, "status", isAllFreelancers, "search", this.state.newSearchItem, "find_freelancers", this.state.activePage)
            .then((filteredFreelancers) => {
              this.setState({ freelancers: filteredFreelancers, filteredFreelancers: filteredFreelancers || [], allFreelancers: filteredFreelancers || [] })
              if (filteredFreelancers.length < 10) {
                this.setState({
                  hideShowMore: true,
                })
              }
            })
        }
      })
  }

  resetActivePage = (recordLength) => {
    const { activePage, freelancersPerPage } = this.state;
    let page = activePage;
    while ((freelancersPerPage * (page - 1)) > recordLength) {
      page = page - 1
    }
    return page
  }

  filterFreelancers = (event) => {
    var page;
    var records;
    this.setState({ filterApproved: event.target.value, sortItem: event.target.value })
    switch (event.target.value) {
      case "All":
        records = this.state.allFreelancers.slice(0, this.state.freelancersPerPage)
        page = this.resetActivePage(records.length)
        this.setState({ filteredFreelancers: records, activePage: page })
        break;
      case "Approved":
        records = (this.state.allFreelancers.filter((el) => el.account_approved && el.account_active).slice(0, this.state.freelancersPerPage))
        page = this.resetActivePage(records.length)
        this.setState({ filteredFreelancers: records, activePage: page })
        break;
      case "Not Approved":
        records = (this.state.allFreelancers.filter((el) => !el.account_approved)).slice(0, this.state.freelancersPerPage)
        page = this.resetActivePage(records.length)
        this.setState({ filteredFreelancers: records, activePage: page })
        break;
      case "Banned":
        records = (this.state.allFreelancers.filter((el) => !el.account_active)).slice(0, this.state.freelancersPerPage)
        page = this.resetActivePage(records.length)
        this.setState({ filteredFreelancers: records, activePage: page })
        break;
      default:
        records = this.state.allFreelancers.slice(0, this.state.freelancersPerPage)
        page = this.resetActivePage(records.length)
        this.setState({ filteredFreelancers: records, activePage: page })
    }
    this.handleMultiSearch("", event.target.value || this.state.sortItem, this.state.searchItem)
  }

  handlePageChange = (curPage, perPage) => {
    this.setState({ activePage: curPage })
    window.scrollTo(0, 0);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  hideAlert = () => {
    this.setState({ isApproved: null })
  }


  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
      countryName: newValue
    })
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    })
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    })
  }


  handleGetFreelancer = (e) => {
    let category = this.state.filterData.category || []
    let filterData = this.state.filterData
    if (e.target.checked) {
      category.push(e.target.id)
    }
    else {
      let index = category.indexOf(e.target.id)
      index === 0 ? category = category.splice(1, category.length) : category.splice(index)
    }
    filterData.category = category
    this.setState({ filterData: filterData, jobCat: e.target.id })
    this.handleMultiSearch("", this.state.sortItem, this.state.searchItem)
  }

  handleExpLevelChange = (e) => {
    const { filterData } = this.state;
    if (e.target.checked) {
      filterData["experience_level"] = e.target.id
      this.setState({ filterData: filterData, expLevel: e.target.id })
    }
    else {
      delete filterData["experience_level"]
      this.setState({ filterData: filterData, expLevel: '' })
    }
    this.handleMultiSearch("", this.state.sortItem, this.state.searchItem)
  }

  handleProjectDurationChange = (e) => {
    const { filterData } = this.state;
    if (e.target.checked) {
      filterData["projectDuration"] = e.target.value
      this.setState({ filterData: filterData, projectDuration: e.target.value })
    }
    else {
      delete filterData["projectDuration"]
      this.setState({ filterData: filterData, projectDuration: '' })
    }

    this.handleMultiSearch("", this.state.sortItem, this.state.searchItem)
  }

  handleProficiencyLevel = (e) => {
    const { filterData } = this.state;
    if (e.length) {
      filterData["english_proficiency"] = e
      this.setState({ filterData: filterData })
    }
    else {
      delete filterData["english_proficiency"]
      this.setState({ filterData: filterData })
    }
    this.handleMultiSearch("", this.state.sortItem, this.state.searchItem)
  }

  handleAvailability = (e) => {
    const { filterData } = this.state;
    if (e.target.checked) {
      filterData["availability"] = e.target.id
      this.setState({ filterData: filterData, availability: e.target.id })
    }
    else {
      delete filterData["availability"]
      this.setState({ filterData: filterData, availability: '' })
    }
    this.handleMultiSearch("", this.state.sortItem, this.state.searchItem)
  }

  handleDurationChange = (e) => {
    const { filterData } = this.state
    if (e.target.checked) {
      filterData["duration"] = e.target.value
      this.setState({ filterData: filterData, duration: e.target.value })
    }
    else {
      delete filterData["duration"]
      this.setState({ filterData: filterData, duration: '' })
    }
    this.handleMultiSearch("", this.state.sortItem, this.state.searchItem)
  }
  handleWeekTimeChange = (e) => {
    const { filterData } = this.state
    if (e.target.checked) {
      filterData["weekTime"] = e.target.value
      this.setState({ filterData: filterData, weekTime: e.target.value })
    }
    else {
      delete filterData["weekTime"]
      this.setState({ filterData: filterData, weekTime: '' })
    }
    this.handleMultiSearch("", this.state.sortItem, this.state.searchItem)
  }
  handleProjectPreference = (e) => {
    const { filterData } = this.state
    if (e.target.checked) {
      filterData["project_preference"] = e.target.value
      this.setState({ filterData: filterData, projectPreference: e.target.value })
    }
    else {
      delete filterData["project_preference"]
      this.setState({ filterData: filterData, projectPreference: '' })
    }
    this.handleMultiSearch("", this.state.sortItem, this.state.searchItem)
  }

  handleByCountry = (label) => {
    const { filterData } = this.state;
    if (label.length) {
      filterData["location"] = label
    }
    else {
      delete filterData["location"]
    }
    this.setState({ filterData: filterData })
    this.handleMultiSearch("", this.state.sortItem, this.state.searchItem)
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

    this.handleMultiSearch("", this.state.sortItem, this.state.searchItem)
  }


  handleMultiSearch = (favour, sortItem, newSearchItem, statusType) => {
    const isAllFreelancers = (this.state.activeTab === 'approved')
    // const newStatusType = !isEmpty(sortItem || this.state.sortItem) ? ((sortItem || this.state.sortItem) === "Approved") ? true : (sortItem || this.state.sortItem) === "Not Approved" ? false : (sortItem || this.state.sortItem) === "Banned" ? "banned" : ""  : ""
    this.props.getAdminFilter(favour || this.state.favour, "search_freelancers", this.state.filterData, "status", isAllFreelancers, "search", this.state.newSearchItem || newSearchItem, "find_freelancers", this.state.activePage)
      .then((filteredFreelancers) => {
        this.setState({ freelancers: filteredFreelancers, filteredFreelancers: filteredFreelancers || [], allFreelancers: filteredFreelancers || [] })
        if (filteredFreelancers.length < 10) {
          this.setState({
            hideShowMore: true,
          })
        }
      })
  }

  handleSearch = (e) => {
    this.setState({ newSearchItem: e.target.value })
    this.searchFreelancers(e)
  }

  searchFreelancers = async (e) => {
    e.preventDefault()
    const isAllFreelancers = (this.state.activeTab === 'approved')
    // const newStatusType = !isEmpty(this.state.sortItem) ? (this.state.sortItem === "Approved") ? true : this.state.sortItem === "Not Approved" ? false : this.state.sortItem === "Banned" ? "banned" : ""  : ""
    // if(this.state.newSearchItem !== ""){
    await this.props.getAdminFilter(this.state.favour, "search_freelancers", this.state.filterData, "status", isAllFreelancers, "search", e.target.value, "find_freelancers", this.state.activePage)
      .then((filteredFreelancers) => {
        this.setState({ freelancers: filteredFreelancers, filteredFreelancers: filteredFreelancers || [], allFreelancers: filteredFreelancers || [], activePage: 1 })
        if (filteredFreelancers.length < 10) {
          this.setState({
            hideShowMore: true,
          })
        }
      })
    // }
    this.setState({ isSearched: true })

  }

  OnEnterByCountry = (e) => {
    e.preventDefault()
    this.handleByCountry(e.target.childNodes[0].childNodes[0].value)
  }

  OnEnterByLanguage = (e) => {
    e.preventDefault()
    this.handleProficiencyLevel(e.target.childNodes[0].childNodes[0].value)
  }

  langOnChange = (event, { newValue }) => {
    this.setState({
      langValue: newValue
    })
  }

  onLangSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getLangSuggestions(value)
    })
  }

  onLangSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    })
  }


  handleReset = (e) => {
    document.getElementById("countryInput").value = ''
    this.setState({
      filterData: { category: [], english_proficiency: '' },
      availability: [],
      proficiencyLevel: [],
      expLevel: [],
      projectPreference: [],
      value: '',
      suggestions: [],
      sortItem: 'All',
      certificate: '',
      jobCat: [],
      certificateOption: '',
      newSearchItem: '',
      filterApproved: "FILTER",
      langValue: ''
    });
    const isAllFreelancers = (this.state.activeTab === 'approved')
    this.props.getAdminFilter("", "search_freelancers", {}, "status", isAllFreelancers, "search", "", "find_freelancers", this.state.activePage)
      .then((filteredFreelancers) => {
        this.setState({ freelancers: filteredFreelancers, filteredFreelancers: filteredFreelancers || [], allFreelancers: filteredFreelancers || [] })
        if (filteredFreelancers.length < 10) {
          this.setState({
            hideShowMore: true,
          })
        }
      })
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
    let { value, suggestions, expLevel, availability, projectPreference,
      certificateOption, langValue, filterData, freelancers } = this.state;
    const { applicationIsLoading } = this.props;
    // console.log("this.props",this.props)
    let lessThan = "<"

    const inputProps = {
      placeholder: 'Enter Country',
      value: value,
      onChange: this.onChange,
      id: "countryInput",
    }

    const getSuggestionValue = suggestion => {
      const label = suggestion.label
      this.handleByCountry(label)
      return suggestion.label
    }


    const langInputProps = {
      placeholder: 'Enter Language',
      value: langValue,
      onChange: this.langOnChange
    }

    const getLangSuggestionValue = suggestion => {
      const label = suggestion
      this.handleProficiencyLevel(label)
      return suggestion
    }
    // const isAllFreelancers = (this.state.activeTab === 'approved')
    return (

      <div className="admin-side-list-view-banner">

        <div className="admin_jobs_filters">
          <div className="tf_admin_login tf_superadim">
            <AdminHeader history={this.props.history} />
            {/* <AdminDashboardSidebar /> */}
            <div className="mains" id="cloud-expert-application-list-admin-side">
              <div className="">
                <div className="row d-flex">
                  <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 p-0">
                    <AdminDashboardSidebar />
                  </div>
                  <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                    <div>
                      <div className="row">
                        {/* <BreadCrumb step0 /> */}
                        <div className="col-md-12">
                          <h3 className="manager-welcome-title"><b>Welcome Ayushi</b></h3>
                        </div>
                        <ShowJobs />
                      </div>
                    </div>
                    <div className="col-md-12 col-sm-12">
                      <div className="col-md-12 col-sm-12">

                        <div className="p-4 bg-white box-shadow mb-4">
                          {/* Start Row */}
                          <div className="row" id="tabs--search-box-container">
                            <div className="col-md-12">
                              {/* Start Tabs */}
                              <div className="super-admin-cloud-expert-tabs">
                                <ul className="nav nav-tabs tabtop tabsetting">
                                  <li role="presentation" className="active"><a href="#APPROVED" id="approved" onClick={this.showASection} data-toggle="tab">Approved</a></li>
                                  <li role="presentation"><a href="#UNAPPROVED" id="unapproved" onClick={this.showASection} data-toggle="tab">Unapproved</a></li>
                                </ul>
                              </div>
                              {/* End Tabs */}
                              {this.state.isApproved}

                              {/* Start Search Box */}
                              <div className="tf_app_search" id="searchbox-approved-unapproved-cloud-expert">
                                {/* <div className="pull-right" data-toggle="buttons" id="user-admin-filter-button"> */}
                                {/* <button className=""
                            data-toggle="collapse"
                            href="#horizontal-filters"
                            role="button"
                            aria-expanded="false"
                            aria-controls="horizontal-filters"
                          >
                            <i className="fa fa-filter" aria-hidden="true"></i>{" "}Filter{" "}
                          </button> */}
                                {/* </div> */}
                                {/* Start Filter Box Row */}
                                <div className="row">
                                  <div className="col-md-12 collapse multi-collapse" id="horizontal-filters">
                                    <div className="find-filter-navigation">
                                      <div className="panel-group sidebar_all_filters" id="accordion">

                                        <div className="col-md-3">
                                          <div className="card card-body">
                                            <div className="post-edit-dropdown">
                                              <h4 className="heading_bold">Platform</h4>
                                              <div onChange={this.handleGetFreelancer} name="jobCat">
                                                <div className="tf_sound tf_sound1">
                                                  <input type="checkbox" readOnly name="Salesforce" value="Salesforce" checked={filterData.category.includes("Salesforce")} id="Salesforce" />
                                                  <label htmlFor="Salesforce"> Salesforce </label>
                                                </div>
                                                <div className="tf_sound tf_sound1" >
                                                  <input type="checkbox" readOnly name="Salesforce" value="AWS" checked={filterData.category.includes("AWS")} id="AWS" />
                                                  <label htmlFor="AWS"> AWS</label>
                                                </div>
                                                <div className="tf_sound tf_sound1">
                                                  <input type="checkbox" readOnly name="Salesforce" value="Oracle" checked={filterData.category.includes("Oracle")} id="Oracle" />
                                                  <label htmlFor="Oracle"> Oracle </label>
                                                </div>
                                                <div className="tf_sound tf_sound1">
                                                  <input type="checkbox" readOnly name="Salesforce" value="IBM Cloud" checked={filterData.category.includes("IBM Cloud")} id="IBM Cloud" />
                                                  <label htmlFor="IBM Cloud"> IBM Cloud </label>
                                                </div>
                                                <div className="tf_sound tf_sound1" >
                                                  <input type="checkbox" readOnly name="Salesforce" value="MS Azure" checked={filterData.category.includes("MS Azure")} id="MS Azure" />
                                                  <label htmlFor="MS Azure"> MS Azure</label>
                                                </div>
                                                <div className="tf_sound tf_sound1">
                                                  <input type="checkbox" readOnly name="Salesforce" value="Google Cloud" checked={filterData.category.includes("Google Cloud")} id="Google Cloud" />
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
                                                <input type="checkbox" readOnly name="Yes" checked={certificateOption.includes("Yes")} id="Yes" />
                                                <label htmlFor="Yes"> Yes</label>
                                              </div>
                                              <div className="tf_sound tf_sound1" >
                                                <input type="checkbox" readOnly name="Yes" checked={certificateOption.includes("No")} id="No" />
                                                <label htmlFor="No"> No</label>
                                              </div>
                                            </div>
                                          </div>

                                          <div className="card card-body">
                                            <h4 className="heading_bold">Experience Level</h4>
                                            <div onChange={this.handleExpLevelChange} name="expLevel">
                                              <div className="tf_sound tf_sound1" >
                                                <input type="checkbox" readOnly name="Beginner" checked={expLevel.includes("Beginner")} id="Beginner" />
                                                <label htmlFor="Beginner"> Beginner</label>
                                              </div>
                                              <div className="tf_sound tf_sound1" >
                                                <input type="checkbox" readOnly name="Beginner" checked={expLevel.includes("Intermediate")} id="Intermediate" />
                                                <label htmlFor="Intermediate"> Intermediate</label>
                                              </div>
                                              <div className="tf_sound tf_sound1">
                                                <input type="checkbox" readOnly name="Beginner" checked={expLevel.includes("Expert")} id="Expert" />
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
                                                <input type="checkbox" readOnly name="hours" value="Less than 40 hours" checked={availability === "Less than 40 hours"} id="Less than 40 hours" />
                                                <label htmlFor="Less than 40 hours">{lessThan} 40 hours</label>
                                              </div>
                                              <div className="tf_sound tf_sound1" >
                                                <input type="checkbox" readOnly name="hours" value="More than 40 hours" checked={availability === "More than 40 hours"} id="More than 40 hours" />
                                                <label htmlFor="More than 40 hours"> 40 hours </label>
                                              </div>
                                            </div>
                                          </div>

                                          <div className="card card-body">
                                            <h4 className="heading_bold">Project Preference</h4>
                                            <div onChange={this.handleProjectPreference} name="projectPreference">
                                              <div className="tf_sound tf_sound1" >
                                                <input type="checkbox" readOnly name="Both short-term and long-term projects" value="Both short-term and long-term projects" checked={projectPreference.includes("Both short-term and long-term projects")} id="Both short-term and long-term projects" />
                                                <label htmlFor="Both short-term and long-term projects"> Both</label>
                                              </div>
                                              <div className="tf_sound tf_sound1" >
                                                <input type="checkbox" readOnly name="Both short-term and long-term projects" value="Long-term projects (more than 3 months)" checked={projectPreference.includes("Long-term projects (more than 3 months)")} id="Long-term projects (more than 3 months)" />
                                                <label htmlFor="Long-term projects (more than 3 months)"> Long-term</label>
                                              </div>
                                              <div className="tf_sound tf_sound1" >
                                                <input type="checkbox" readOnly name="Both short-term and long-term projects" value="Short-term projects (less than 3 months)" checked={projectPreference.includes("Short-term projects (less than 3 months)")} id="Short-term projects (less than 3 months)" />
                                                <label htmlFor="Short-term projects (less than 3 months)">Short-term</label>
                                              </div>
                                            </div>
                                          </div>

                                        </div>

                                        <div className="col-md-3">

                                          <div className="card card-body">
                                            <h4 className="heading_bold">Location </h4>
                                            <div className="tf_search search_user_for_chating">
                                              <form onSubmit={this.OnEnterByCountry}>
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
                                              <form onSubmit={this.OnEnterByLanguage}>
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

                                          <button type="button" className="sidebar-reset-filter-button" onClick={this.handleReset}>Reset Filter</button>

                                        </div>

                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {/* End Filter Box Row */}
                                {/* <form>
                                <input type="" value={newSearchItem} name="" className="no-resize-bar form-control" placeholder="Search Cloud Expert"
                                  onChange={this.handleSearch} />
                                  
                                <div className="tf_emoji">
                                  <Link to={"#"}><img src={path2019} alt="" /></Link>
                                </div>
                              </form> */}
                              </div>
                              {/* End Start Box */}


                              {/* Start Found Message */}
                              {/* <div className="freelancer-count-color">
                                {freelancers.length > 0 && <p className="number-of-cloud-expert-found-message"> {freelancers.length} Cloud Experts Found</p>}
                              </div> */}
                              {/* End Found Message */}
                            </div>
                          </div>
                          {/* End Row  */}
                          {applicationIsLoading && <div className="grid-loader my-feed-loader col-md-12">
                            <Loader type="Grid" color="#00BFFF" height={100} width={100} />
                          </div>}

                          <div className="row">
                            <div className="">
                              <div className="card">
                                <div className="card-body projects__table-sec">
                                  <CloudExpertList Freelancer={freelancers} checkEst={this.checkEst} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      {
                        freelancers.length > 4 && !this.state.hideShowMore && <button className="load_more_btn_find_work mt-20 mb-15" onClick={this.handleShowMore}>  Show More </button>
                      }

                      {
                        applicationIsLoading && <img src={loadMoreSrc} alt="" />
                      }

                    </div>
                    <div className="mt-20">
                      <div className="col-md-12 col-sm-12">
                        <div className="col-md-12">
                          <div className="box-shadow p-2 bg-white mb-4">
                            <img src={previewGraph} className="w-100" alt="image" />
                          </div>
                        </div>
                      </div>
                    </div>



                  </div>


                </div>

              </div>

            </div>
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
                          <h3 className="job-title-in-popup">{this.state.profileDetail.full_name}</h3>
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
                        <p className="developer-and-job-expiration-date-in-popup"><strong>Visibility:</strong> <span className={"job-preference-custom-tags-" + this.state.profileDetail.profile.visibility.toLowerCase()}>{this.state.profileDetail.profile.visibility}</span></p>
                      </div>

                      <div className="col-md-6">
                        <p className="developer-and-job-expiration-date-in-popup"><strong>Profile Type:</strong> {this.state.profileDetail.profile.profile_type}</p>
                      </div>

                      <div className="clearfix"></div>

                      <div className="col-md-12">
                        <hr className="popup-hr-divider-for-grid" />
                      </div>

                      <div className="col-md-12">
                        <h5 className="job-description-in-popup"><strong>About Me:</strong> {`${this.state.profileDetail.profile.about_me.substring(0, 300)}...`}</h5>
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
                        {!this.props.applicationIsLoading && (this.state.profileDetail.profile.skill || []) &&
                          <Skills
                            skill={this.state.profileDetail.profile.skill}
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
                        <p className="project-status-counter"><strong>Availability:</strong> {this.state.profileDetail.profile.availability}</p>
                      </div>

                      <div className="clearfix"></div>

                      <div className="col-md-12">
                        <hr className="popup-hr-divider-for-grid" />
                      </div>

                      <div className="clearfix"></div>

                      <div className="col-md-12">
                        <p className="project-status-counter"><strong>Language Proficiency:</strong> {this.state.profileDetail.profile.english_proficiency}</p>
                      </div>

                      <div className="clearfix"></div>

                      <div className="col-md-12">
                        <hr className="popup-hr-divider-for-grid" />
                      </div>

                      <div className="clearfix"></div>

                      <div className="col-md-12">
                        <p className="project-status-counter"><strong>Experience Level:</strong> {this.state.profileDetail.profile.experience_level}</p>
                      </div>

                      <div className="clearfix"></div>

                      <div className="col-md-12">
                        <hr className="popup-hr-divider-for-grid" />
                      </div>

                      <div className="clearfix"></div>

                      <div className="col-md-12">
                        <p className="project-status-counter"><strong>Development Experience:</strong> {this.state.profileDetail.profile.development_experience}</p>
                      </div>

                      <div className="clearfix"></div>

                      <div className="col-md-12">
                        <hr className="popup-hr-divider-for-grid" />
                      </div>

                      <div className="clearfix"></div>

                      <div className="col-md-12">
                        <p className="project-status-counter"><strong>Hourly Rate:</strong> {this.state.profileDetail.profile.hourly_rate}</p>
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
                            ? `/freelancer/${this.state.profileDetail.uuid}`
                            : `/freelancer/${this.state.profileDetail.uuid}/${true}`}>
                            View Profile</a>
                        </div>


                        <div className="col-md-4">
                        </div>
                      </div>
                      <div className="clearfix"></div>
                    </div>

                    {
                      1 < this.state.currentArrayKey &&
                      (<a href="javascript:void(0)" onClick={this.changeProfile.bind(this, this.state.profileDetail.profile.user_id, 'previous')} className="previous-link" > <i className="fa fa-chevron-left" aria-hidden="true"></i></a>)
                    }

                    {
                      this.state.currentArrayKey < this.state.freelancers.length &&
                      (<a href="javascript:void(0)" onClick={this.changeProfile.bind(this, this.state.profileDetail.profile.user_id, 'next')} className="next-link"> <i className="fa fa-chevron-right" aria-hidden="true"></i></a>)
                    }
                  </div>
                }
              </div>
            </Modal>
          </div>
          <Footer />
        </div>

      </div>

    )
  }
}
const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = (dispatch) => {
  return {
    getAllFreelancers: (searchItem) => dispatch(getAllFreelancers(searchItem)),
    approveFreelancer: (id) => dispatch(approveFreelancer(id)),
    getAdminFilter: (favour, searchBy, searchItem, sortBy, sortItem, search, newSearchItem, dataType, page) => dispatch(getFilteredDataForJobs(favour, searchBy, searchItem, sortBy, sortItem, search, newSearchItem, dataType, page)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FreelancersList)
