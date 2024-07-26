import React, { Component } from "react";
// import Footer from "../miscellaneous/Footer";
import ProjectManagerHeader from "../miscellaneous/ProjectManagerHeader";
import { connect } from "react-redux";
import { addFavourite, removeFavourite, getAllFreelancers } from "../../Actions/AdminActions";
// import inviteIcon from "../../static/images/invite.png";
import { isEmpty } from "lodash";
import searchIcon from "../../static/images/Icon_Search.svg";
import { inviteToJob } from "../../Actions/programManagerJobsActions";
import { getSearchedFLForHiringMan } from "../../Actions/SearchActions";
import { Link } from "react-router-dom";
import { getSavedFreelancerForHiringmanager } from "../../Actions/ProjectManagerFreelancerActions";
import ReadMoreAndLess from "react-read-more-less";
import Modal from "react-modal";
import { Multiselect } from 'multiselect-react-dropdown';
import HiredFreelancers from "../projectManager/HiredFreelancers";
import Pagination from "react-js-pagination";
import Loader from "react-loader-spinner";
import SavedFreelancers from "./SavedFreelancers";
import faceImg from "../../static/images/profile-placeholder.png";
import Autosuggest from 'react-autosuggest';
import certification_required from "../../static/images/certification-required.png";
import COUNTRIES from '../../constants/countryListWithCodes'
import countryList from 'react-select-country-list';
import ReactCountryFlag from "react-country-flag"
import Skills from "../Common/Skills"
import PMDashboardSideBar from "./PMDashboardSideBar";
import NODataFoundImg from "./../../static/images/noDataFound.png"
import LANGUAGES from '../../constants/languages';
import BreadCrumb from "../miscellaneous/BreadCrumb";
import PaymentType from "../Payment/PaymentMethod/PaymentMethod";
import SuccessSweetAlert from "../CommonComponets/SweetAlert/SuccessSweetAlert";



const allLanguages = LANGUAGES;
const itemsCountPerPage = 5;
const customStylesNew = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0px",
  },
}

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
    // width: '700px',
  },
}

const renderSuggestion = suggestion => (
  <div>
    {suggestion.label}
  </div>
)

const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase()
  const inputLength = inputValue.length;
  return inputLength === 0 ? [] : countries.filter(country =>
    country.label.toLowerCase().slice(0, inputLength) === inputValue
  )
}


const getLangSuggestions = value => {
  const inputValue = value.trim().toLowerCase()
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : allLanguages.filter(lang =>
    lang.toLowerCase().slice(0, inputLength) === inputValue
  )
}

const countries = countryList().getData()

class FindFreelancers extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      isLoading: true,
      openStatus: false,
      activePage: 1,
      searchSection: true,
      hireSection: false,
      savedSection: false,
      freelancerToInvite: {},
      freelancerToHire: {},
      errors: {},
      hireJobCategory: "",
      rateType: "hourly",
      modalIsOpen: false,
      isSearched: false,
      searchItem: "",
      hireJobIdError: false,
      allFreelancers: [],
      isDeleted: false,
      msg: "",
      activeTab: 'approved',
      freelancers: [],
      filteredFreelancers: [],
      pageNumber: 1,
      freelancersPerPage: 5,
      isApproved: false,
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
      currentArrayKey: 0,
      lessThan: '<',
      inviteJobId: '',
      hireJobId: '',
      hourly_rate: ''
    }

    this.openModal = this.openModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  componentDidMount() {
    if (this.props.match.params.tab === 'hired' || this.props.location.state === "hiredContract") {
      this.setState({ hireSection: true, searchSection: false })
    } else if (this.props.match.params.tab === 'saved') {
      this.setState({ savedSection: true, searchSection: false })
    }

    let location = this.props.history.location
    if (location && location.state && location.state.search && location.state.search.length > 0) {
      this.setState({ searchItem: this.props.location.state.search })
      this.props.getSearchedFLForHiringMan("search", this.props.location.state.search).then((res) => {
        this.setState({ allFreelancers: res, isLoading: false })
      })
    } else {
      this.props.getAllFreelancers(this.state.favour, "search_freelancers", this.state.filterData, "status", true, "search", this.state.newSearchItem, "find_freelancers", this.state.activePage).then((res) => {
        // this.props.getAllFreelancers("").then((res) =>{
        this.setState({ allFreelancers: res, isLoading: false })
      })
    }

  }
  componentDidUpdate(prevProps) {
    if (prevProps.match.params.tab !== this.props.match.params.tab) {
      this.setState({ activeUrl: this.props.match.params.tab })
      if (this.props.match.params.tab === 'hired' || this.props.location.state === "hiredContract") {
        this.setState({ hireSection: true, searchSection: false })
      } else if (this.props.match.params.tab === 'saved') {
        this.setState({ savedSection: true, searchSection: false })
      }

      let location = this.props.history.location
      if (location && location.state && location.state.search && location.state.search.length > 0) {
        this.setState({ searchItem: this.props.location.state.search })
        this.props.getSearchedFLForHiringMan("search", this.props.location.state.search).then((res) => {
          this.setState({ allFreelancers: res, isLoading: false })
        })
      } else {
        this.props.getAllFreelancers(this.state.favour, "search_freelancers", this.state.filterData, "status", true, "search", this.state.newSearchItem, "find_freelancers", this.state.activePage).then((res) => {
          // this.props.getAllFreelancers("").then((res) =>{
          this.setState({ allFreelancers: res, isLoading: false })
        })
      }
    }

  }

  handleSearchChange = (e) => {
    this.setState({ searchItem: e.target.value })
    this.searchFreelancers(e, e.target.value)
  }

  searchFreelancers = async (e, searchItem) => {
    e.preventDefault()
    // if (this.state.searchItem !== "") {
    // this.props.getSearchedFLForHiringMan("search", this.state.searchItem).then((res) =>{
    await this.props.getSearchedFLForHiringMan("search", searchItem).then((res) => {
      this.setState({ allFreelancers: res, isLoading: false })
    })
    // }
    this.setState({ isSearched: true, activePage: 1 })
  }

  handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`)
    this.setState({ activePage: pageNumber })
    window.scrollTo(0, 0);
  }

  showASection = (event) => {
    if (event.target.id === "savedSection") {
      // this.props.getSaveFreelancers()
    }
    if (event.target.id === "searchSection") {
      this.props.getAllFreelancers(this.state.favour, "search_freelancers", this.state.filterData, "status", true, "search", this.state.newSearchItem, "find_freelancers", this.state.activePage).then((res) => {
        this.setState({ allFreelancers: res, isLoading: false })
      })
    }
    this.setState({
      searchSection: event.target.id === "searchSection",
      hireSection: event.target.id === "hireSection",
      savedSection: event.target.id === "savedSection",
    })
  }

  addFavourite = (id, idx, event) => {
    let allFreelancers = Object.assign(this.state.allFreelancers); // Pull the entire allFreelancers object out. Using object.assign is a good idea for objects.
    allFreelancers[idx].favorited_freelancer = true; // update the allFreelancers object as needed
    this.setState({ allFreelancers });
    this.props.addFavourite(id).then((res) => {
      if (res.status === 200) {
        this.setState({ isDeleted: true, msg: "Added to favorite list" })
      }
    })
  }

  removeFavourite = (id, idx, event) => {
    let allFreelancers = Object.assign(this.state.allFreelancers); // Pull the entire allFreelancers object out. Using object.assign is a good idea for objects.
    allFreelancers[idx].favorited_freelancer = false; // update the allFreelancers object as needed
    this.setState({ allFreelancers });
    this.props.removeFavourite(id).then((res) => {
      if (res.status === 200) {
        this.setState({ isDeleted: true, msg: "Unfavorited Successfully" })
      }
    })
  }

  handleInviteClose = () => {
    this.setState({ openInvite: false, inviteText: "", inviteJobId: "" })
  }

  handleHireClose = () => {
    this.setState({ openHire: false, hireText: "", hireJobId: "" })
  }

  handleJobChange = (e) => {
    let { errors } = this.state;
    if (e.target.value) {
      errors["inviteJobId"] = "";
    }
    this.setState({ inviteJobId: e.target.value, errors: errors, hireJobId: e.target.value })
  }

  onSelect = (selectedList, selectedItem) => {
    console.log(selectedItem, '-------')
    let { errors } = this.state;
    if (!isEmpty(selectedItem)) {
      errors["inviteJobId"] = "";
    } else {

    }

    this.setState({
      inviteJobId: selectedItem ? selectedItem.id : "",
      errors: errors,
      hireJobId: selectedItem ? selectedItem.uuid : "",
    });
  }

  selectJobCategory = (e) => {
    this.setState({ hireJobCategory: e.target.value })
  }

  inviteFreelancer = (freelancer, e) => {
    e.preventDefault()
    this.setState({ openInvite: true, freelancerToInvite: freelancer, inviteText: "" })
  }

  hireFreelancer = (freelancer, id, e) => {
    e.preventDefault()
    console.log("hello ", freelancer.profile.hourly_rate)
    this.setState({
      openHire: true,
      freelancerToHire: freelancer,
      hireText: "",
      freelancerIdToHire: id,
      hourly_rate: freelancer?.profile?.hourly_rate
    })
  }

  onInviteTextChange = (e) => {
    this.setState({ inviteText: e.target.value, errors: [] })
  }

  hideInvitationSuccess = () => {
    console.log()
    this.setState({ isInvitationSent: false, Invite: true })
  }

  validateInputInputs = () => {
    let { inviteJobId } = this.state;
    let errors = {}

    if (inviteJobId === '') {
      errors["inviteJobId"] = "Please select job.";
    }
    if (!this.state.inviteText) {
      errors["inviteText"] = "This field can't be blank.";
    }
    if (!isEmpty(errors)) {
      this.setState({ errors: errors })
    }

    return {
      isValid: isEmpty(errors),
    }
  }

  handleSendInvite = (e) => {
    e.preventDefault()
    let { isValid } = this.validateInputInputs()
    // console.log('this')
    if (isValid) {
      let data = {
        job_id: this.state.inviteJobId,
        recipient_id: this.state.freelancerToInvite.id,
        message: this.state.inviteText,
      }
      this.props
        .inviteToJob(data)
        .then((res) => {
          if (res.status === 200) {
            this.setState({
              openInvite: false,
              inviteText: "",
              inviteJobId: "",
              isInvitationSent: true,
            })
            // const profile_id = this.props.match.params.uuid;
            // this.props.getProfile(profile_id)

            this.props.getAllFreelancers("").then((res) => {
              this.setState({ allFreelancers: res, isLoading: false })
            })
            // this.props.getAllFreelancers()
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  handleRateType = (e) => {
    this.setState({ rateType: e.target.value })
  }

  goToHiringPage = (e) => {
    if (this.state.hireJobId) {
      this.props.history.push({
        pathname: `/hire-a-freelancer/${this.state.freelancerIdToHire}/${this.state.hireJobId}`,
        state: { rateType: this.state.rateType, hourly_rate: this.state.hourly_rate },
      })
      this.setState({ openHire: false })
    } else {
      this.setState({ hireJobIdError: true })
    }
  }

  openModal() {
    this.setState({ modalIsOpen: true })
  }

  afterOpenModal() {
    this.subtitle.style.color = "#000"
  }

  closeModal() {
    this.setState({ modalIsOpen: false })
  }

  hideAlert = () => {
    this.setState({ isDeleted: false, msg: "" })
  }

  fieldError = (message) => {
    return (
      <p id="firstName" className="error-field">
        {message ? message : "This field can't be blank."}
      </p>
    )
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

  OnEnterByCountry = (e) => {
    e.preventDefault()
    this.handleByCountry(e.target.childNodes[0].childNodes[0].value)
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

  OnEnterByLanguage = (e) => {
    e.preventDefault()
    this.handleProficiencyLevel(e.target.childNodes[0].childNodes[0].value)
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
    this.props.getAllFreelancers("", "search_freelancers", {}, "status", isAllFreelancers, "search", "", "find_freelancers", this.state.activePage)
      .then((filteredFreelancers) => {
        this.setState({ freelancers: filteredFreelancers, filteredFreelancers: filteredFreelancers || [], allFreelancers: filteredFreelancers || [], isLoading: false })
        if (filteredFreelancers.length < 10) {
          this.setState({
            hideShowMore: true,
          })
        }
      })
  }

  handleMultiSearch = (favour, sortItem, newSearchItem, statusType) => {
    const isAllFreelancers = (this.state.activeTab === 'approved')
    // const newStatusType = !isEmpty(sortItem || this.state.sortItem) ? ((sortItem || this.state.sortItem) === "Approved") ? true : (sortItem || this.state.sortItem) === "Not Approved" ? false : (sortItem || this.state.sortItem) === "Banned" ? "banned" : ""  : ""
    this.props.getAllFreelancers(favour || this.state.favour, "search_freelancers", this.state.filterData, "status", isAllFreelancers, "search", this.state.newSearchItem || newSearchItem, "find_freelancers", this.state.activePage)
      .then((filteredFreelancers) => {
        this.setState({ freelancers: filteredFreelancers, filteredFreelancers: filteredFreelancers || [], allFreelancers: filteredFreelancers || [], isLoading: false })
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
  handleHireCloudPayment = () => {
    this.setState({ onOpen: true })
  }
  onClose = () => {
    this.setState({ onOpen: false })
  }

  render() {
    // const { applicationIsLoading } = this.props;
    // console.log('allFreelancers',this.props)
    const {
      activePage,
      searchSection,
      hireSection,
      savedSection,
      freelancerToInvite,
      searchItem,
      freelancerToHire,
      rateType,
      hireJobIdError,
      errors,
      allFreelancers,
      filterData,
      certificateOption,
      expLevel,
      // availability,
      // lessThan,
      // projectPreference,
      // langValue,
      suggestions,
      value,
      onOpen
    } = this.state;
    let freelancers = allFreelancers.length > 0 ? JSON.parse(JSON.stringify(allFreelancers)).splice(activePage === 1 ? 0 : (activePage - 1) * itemsCountPerPage, itemsCountPerPage) : []
    if (this.state.isInvitationSent) {
      setTimeout(
        function () {
          this.setState({ isInvitationSent: false })
        }.bind(this),
        5000
      )
    }


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

    console.log(freelancerToInvite, "");
    const successMessage = (freelancerToInvite) => {
      return <p>Invite sent. <br /> {freelancerToInvite.full_name} will get back to you shortly.</p>
    }
    return (
      <div>
        <div id="tf-project-manager-dashboard-root">
          <ProjectManagerHeader history={this.props.history} />
          {/* <PMDashboardSideBar history={this.props.history}/> */}
          <div>
            {this.props.match.params.tab === "hired" ?
              <BreadCrumb step2 link="My Cloud Experts" />
              :
              <BreadCrumb step1 link="Cloud Expert" />}
          </div>
        </div>
        <div className={!this.props.loginSteps.showHideSideBar ? "mains" : "main-add"}>
          <div className="">

            <div id="find-cloud-expert-project-manager">
              <div className="row custom_row">

                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                  <div className="custom_sticky_container">
                    <div className="position-sticky">
                      <PMDashboardSideBar history={this.props.history} />
                    </div>
                  </div>
                </div>

                <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                  <div className="pro-right-content-area">
                    <div className="empty-outline-box-for-project-manager-dashboard">
                      {
                        this.state.isDeleted &&
                        (
                          // <div className="app-pro2-swal">
                          //   <SweetAlert onConfirm={() => this.hideAlert()}>

                          //     <div id="EditJobSuccessMessagePopupInnerContent">
                          //       <img src={inviteIcon} alt="" id="rightCheckIconImage" />
                          //       <h4>
                          //         {" "}
                          //         <strong>
                          //           {this.state.msg}.
                          //         </strong>
                          //       </h4>
                          //     </div>
                          //   </SweetAlert>
                          // </div>
                          <SuccessSweetAlert
                            handleConfirm={() => this.hideAlert()}
                            show={true}
                            message={this.state.msg}
                          />
                        )
                      }

                      <div className="col-md-12 padding_4">
                        <div className="tf_aws job_desc_page m-0">
                          <div className="">
                            <div className="">

                              <ul className="nav tabcustom job-tab" role="tablist">
                                <li role="presentation" className={searchSection ? "active" : ""}>
                                  <Link
                                    to={"#SEARCH"}
                                    onClick={this.showASection}
                                    id="searchSection"
                                    aria-controls="SEARCH"
                                    role="tab"
                                    data-toggle="tab"
                                  >
                                    All
                                  </Link>
                                </li>
                                <li role="presentation" className={hireSection ? "active" : ""}>
                                  <Link
                                    to={"#HIRES"}
                                    aria-controls="profile"
                                    onClick={this.showASection}
                                    id="hireSection"
                                    role="tab"
                                    data-toggle="tab"
                                  >
                                    Hires
                                  </Link>
                                </li>
                                <li role="presentation" className={savedSection ? "active" : ""}>
                                  <Link
                                    to={"#SAVED"}
                                    aria-controls="settings"
                                    onClick={this.showASection}
                                    id="savedSection"
                                    role="tab"
                                    data-toggle="tab"
                                  >
                                    Saved Cloud Expert
                                  </Link>
                                </li>
                              </ul>

                              <div className="tab-content">
                                {
                                  searchSection && (
                                    <div role="tabpanel" id="SEARCH">
                                      {this.state.isInvitationSent && (
                                        // <div className="app-pro2-swal text-center">
                                        //   <SweetAlert
                                        //     title=""
                                        //     onConfirm={this.hideInvitationSuccess}
                                        //     showConfirm={false}
                                        //   >
                                        //     <img src={inviteIcon} alt="search-icon" />
                                        //     <h4 className="text-center">
                                        //       <strong>
                                        //         Invite sent. <br />
                                        //         {freelancerToInvite.full_name} will get back to you shortly.
                                        //       </strong>
                                        //     </h4>
                                        //   </SweetAlert>
                                        // </div>
                                        <SuccessSweetAlert
                                          handleConfirm={this.hideInvitationSuccess}
                                          show={true}
                                          message={successMessage()}
                                        />

                                      )}
                                      <div className="tf_search_filter">
                                        <div className="col-md-12 px-0">
                                          <div className="input-group">
                                            <div className="input-group-addon1">
                                              <img src={searchIcon} alt="search" />
                                            </div>
                                            <div className="tf_search">
                                              <form style={{ display: "flex" }}>
                                                <input
                                                  type="text"
                                                  className="form-control mn_input"
                                                  onChange={this.handleSearchChange}
                                                  placeholder="Search Cloud Experts"
                                                  value={searchItem}
                                                />
                                                <button className="vt-center filter-btn"
                                                  data-toggle="collapse"
                                                  href="#horizontal-filters"
                                                  role="button"
                                                  aria-expanded="false"
                                                  aria-controls="horizontal-filters"
                                                >
                                                  <i className="fa fa-filter" aria-hidden="true"></i>{" "}Filter{" "}
                                                </button>
                                              </form>
                                            </div>
                                          </div>
                                        </div>
                                        {/* <div className="col-md-1 px-0 mt-0">
                                          <div className="freelancerFilter mr-10 mb-10 mt-0" data-toggle="buttons" id="user-admin-filter-button">
                                            <button className=""
                                              data-toggle="collapse"
                                              href="#horizontal-filters"
                                              role="button"
                                              aria-expanded="false"
                                              aria-controls="horizontal-filters"
                                            >
                                              <i className="fa fa-filter" aria-hidden="true"></i>{" "}Filter{" "}
                                            </button>
                                          </div>
                                        </div> */}

                                      </div>

                                      {/* Start Filter Box Row */}
                                      <div className="row freelancerFilterSction">
                                        <div className="col-md-12 collapse multi-collapse tf_main_filter freelancerFilterBox" id="horizontal-filters">
                                          <div className="find-filter-navigation">
                                            <div className="panel-group sidebar_all_filters mb-0 mt-0" id="accordion">

                                              <div className="col-md-3">
                                                <div className="card card-body">
                                                  <div className="post-edit-dropdown">
                                                    <h4 className="heading_bold">Platforms</h4>
                                                    <div onChange={this.handleGetFreelancer} name="jobCat">
                                                      <div className="tf_sound tf_sound1">
                                                        <input type="checkbox" name="Salesforce" value="Salesforce" checked={filterData.category.includes("Salesforce")} id="Salesforce" />
                                                        <label htmlFor="Salesforce"> Salesforce </label>
                                                      </div>
                                                      <div className="tf_sound tf_sound1" >
                                                        <input type="checkbox" name="Salesforce" value="AWS" checked={filterData.category.includes("AWS")} id="AWS" />
                                                        <label htmlFor="AWS"> AWS</label>
                                                      </div>
                                                      <div className="tf_sound tf_sound1">
                                                        <input type="checkbox" name="Salesforce" value="Oracle" checked={filterData.category.includes("Oracle")} id="Oracle" />
                                                        <label htmlFor="Oracle"> Oracle </label>
                                                      </div>
                                                      <div className="tf_sound tf_sound1" >
                                                        <input type="checkbox" name="Salesforce" value="MS Azure" checked={filterData.category.includes("MS Azure")} id="MS Azure" />
                                                        <label htmlFor="MS Azure"> MS Azure</label>
                                                      </div>
                                                      <div className="tf_sound tf_sound1">
                                                        <input type="checkbox" name="Salesforce" value="Google Cloud" checked={filterData.category.includes("Google Cloud")} id="Google Cloud" />
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
                                                      <input type="checkbox" name="Yes" checked={certificateOption.includes("Yes")} id="Yes" />
                                                      <label htmlFor="Yes"> Yes</label>
                                                    </div>
                                                    <div className="tf_sound tf_sound1" >
                                                      <input type="checkbox" name="Yes" checked={certificateOption.includes("No")} id="No" />
                                                      <label htmlFor="No"> No</label>
                                                    </div>
                                                  </div>
                                                </div>

                                              </div>

                                              <div className="col-md-3">

                                                <div className="card card-body">
                                                  <h4 className="heading_bold">Experience Level</h4>
                                                  <div onChange={this.handleExpLevelChange} name="expLevel">
                                                    <div className="tf_sound tf_sound1" >
                                                      <input type="checkbox" name="Beginner" checked={expLevel.includes("Beginner")} id="Beginner" />
                                                      <label htmlFor="Beginner"> Beginner</label>
                                                    </div>
                                                    <div className="tf_sound tf_sound1" >
                                                      <input type="checkbox" name="Beginner" checked={expLevel.includes("Intermediate")} id="Intermediate" />
                                                      <label htmlFor="Intermediate"> Intermediate</label>
                                                    </div>
                                                    <div className="tf_sound tf_sound1">
                                                      <input type="checkbox" name="Beginner" checked={expLevel.includes("Expert")} id="Expert" />
                                                      <label htmlFor="Expert"> Expert </label>
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

                                                <button type="button" className="sidebar-reset-filter-button" onClick={this.handleReset}>Reset Filter</button>

                                              </div>

                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      {/* End Filter Box Row */}
                                      {(this.state.isLoading || this.props.applicationIsLoading) ? (
                                        <div className="grid-loader col-md-12">
                                          <Loader type="Grid" color="#00BFFF" height={100} width={100} />
                                        </div>
                                      ) : (
                                        <div>

                                          {!this.props.applicationIsLoading && !isEmpty(freelancers) ? (
                                            freelancers.map((freelancer, idx) => {
                                              return (
                                                <div className="tf_main_filter list-view-strip-box" key={freelancer.profile.uuid}>
                                                  {" "}
                                                  <div key={freelancer.profile && freelancer.profile.uuid} className="col-md-12" id={freelancer.profile && freelancer.profile.uuid}>

                                                    {/* Start Column 2 */}
                                                    <div className="col-md-2 tf_full_width">
                                                      {!freelancer.user_picture ? (
                                                        <img src={faceImg} alt="" />
                                                      ) : (
                                                        <div className="tf_image">
                                                          <img src={freelancer.user_picture} alt="" />
                                                        </div>
                                                      )}
                                                    </div>
                                                    {/* End Column 2 */}

                                                    {/* Start Column 8 */}
                                                    <div className="col-md-8">
                                                      {/* Start Row */}
                                                      <div className="row">
                                                        <div className="col-md-10">
                                                          <div className="col-md-6 p-0">
                                                            {/* Cloud Expert Name Start */}
                                                            <Link
                                                              to={{
                                                                pathname: `/user-profile/${freelancer.profile && freelancer.profile.uuid}`,
                                                                state: {
                                                                  FindFreelancers: true,
                                                                  fromManager: true,
                                                                  tab: 'search'
                                                                }
                                                              }}
                                                            >
                                                              <div className="col-md-12 nopad">
                                                                <div className="">
                                                                  <h4>{freelancer.full_name}
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
                                                                </div>
                                                              </div>
                                                            </Link>
                                                            {/* Cloud Expert Name End  */}
                                                          </div>
                                                          <div className="col-md-6">
                                                            <div className="">
                                                              <h5>
                                                                <strong>
                                                                  {
                                                                    freelancer && freelancer.profile &&
                                                                    freelancer.profile.current_location_country &&
                                                                    <ReactCountryFlag
                                                                      countryCode={
                                                                        COUNTRIES.find(c => c.label ===
                                                                          freelancer.profile.current_location_country).value
                                                                        || 'US'
                                                                      }
                                                                      svg
                                                                      style={{
                                                                        width: '2em',
                                                                        height: '1.2em',
                                                                        float: 'left',
                                                                        marginLeft: '-2px',
                                                                        marginRight: '20px'
                                                                      }}
                                                                      title={'country'}
                                                                    />}

                                                                  {freelancer.profile &&
                                                                    freelancer.profile.current_location_country}
                                                                </strong>
                                                              </h5>
                                                            </div>
                                                          </div>

                                                        </div>

                                                        <div className="col-md-2">
                                                          {/* Start Favourite */}
                                                          <div className="heart-fill add-to-favourite-container">
                                                            {!freelancer.favorited_freelancer ? (
                                                              <a
                                                                href="javascript:void(0)"
                                                                onClick={this.addFavourite.bind(
                                                                  this,
                                                                  freelancer.id,
                                                                  idx
                                                                )}
                                                              >
                                                                <i className="fa fa-heart-o" aria-hidden="true"></i>
                                                              </a>
                                                            ) : (
                                                              <a
                                                                href="javascript:void(0)"
                                                                onClick={this.removeFavourite.bind(
                                                                  this,
                                                                  freelancer.id,
                                                                  idx
                                                                )}
                                                              >
                                                                <i className="fa fa-heart" aria-hidden="true"></i>
                                                              </a>
                                                            )}
                                                          </div>
                                                          {/* End Favourite */}
                                                        </div>
                                                      </div>
                                                      {/* End Row */}

                                                      <div className="clearfix"></div>


                                                      {/* Start Row */}
                                                      <div className="row">
                                                        <div className="col-md-6">
                                                          {/* Start Job Title  */}
                                                          <div className="">
                                                            <h5>
                                                              <strong>
                                                                {freelancer.profile &&
                                                                  freelancer.profile.current_job_title}
                                                              </strong>
                                                            </h5>
                                                          </div>
                                                          {/* End Job title */}
                                                        </div>

                                                        <div className="col-md-6">
                                                          {/* Start Country */}
                                                          {/* <div className="">
                                                              <h5>
                                                                <strong>
                                                                  {
                                                                    freelancer && freelancer.profile &&
                                                                    freelancer.profile.current_location_country&&
                                                                    <ReactCountryFlag
                                                                        countryCode = {
                                                                          COUNTRIES.find(c => c.label ===
                                                                            freelancer.profile.current_location_country).value
                                                                          || 'US'
                                                                        }
                                                                        svg
                                                                        style={{
                                                                          width: '2em',
                                                                          height: '1.2em',
                                                                          float: 'left',
                                                                          marginLeft: '-2px',
                                                                          marginRight: '20px'
                                                                        }}
                                                                        title= {'country'}
                                                                    />}

                                                                  {freelancer.profile &&
                                                                    freelancer.profile.current_location_country}
                                                                </strong>
                                                              </h5>
                                                            </div> */}
                                                          {/* End Country */}

                                                        </div>
                                                      </div>
                                                      {/* End Row */}



                                                      {/* Start Description */}
                                                      <div className="row project-manager-after-login-cloud-expert-description">
                                                        <div className="col-md-12">
                                                          {freelancer.profile ? (
                                                            freelancer.profile.about_me && (
                                                              <ReadMoreAndLess
                                                                ref={this.ReadMore}
                                                                className="read-more-content"
                                                                charLimit={150}
                                                                readMoreText="Read more"
                                                                readLessText="Read less"
                                                              >
                                                                {freelancer.profile.about_me}
                                                              </ReadMoreAndLess>
                                                            )
                                                          ) : (
                                                            <p></p>
                                                          )}
                                                        </div>
                                                      </div>
                                                      {/* End Description */}

                                                      {/* Start Skills */}
                                                      {freelancer.profile.skill.length > 0 &&
                                                        <Skills
                                                          skill={freelancer.profile.skill}
                                                          id={freelancer.profile && freelancer.profile.user && freelancer.profile.user.uuid}
                                                          to={`/user-profile/${freelancer.profile && freelancer.profile.user && freelancer.profile.user.uuid}/true`}
                                                          displayCount={5}
                                                        />
                                                      }
                                                      {/* End Skills */}



                                                    </div>
                                                    {/* End Column 8  */}


                                                    {/* Start Column 2 */}
                                                    <div className="col-md-2 text-center">

                                                      {/* Start Rate */}
                                                      <div className="">
                                                        {freelancer.profile &&
                                                          freelancer.profile.hourly_rate ? (
                                                          <h5>
                                                            $
                                                            <strong>
                                                              {isNaN(freelancer.profile.hourly_rate)
                                                                ? "00"
                                                                : parseFloat(
                                                                  freelancer.profile.hourly_rate
                                                                ).toFixed(2)}{" "}
                                                              / hr
                                                            </strong>
                                                          </h5>
                                                        ) : (
                                                          <h5>
                                                            $<strong>0.00 / hr</strong>
                                                          </h5>
                                                        )}
                                                      </div>
                                                      {/* End Rate */}

                                                      {/* Start Hire Cloud Expert */}
                                                      <div className="">
                                                        {
                                                          // && !isEmpty(freelancer.payment_method))
                                                          !isEmpty(freelancer) && !isEmpty(freelancer.payment_method) ? (
                                                            <div className="hire-cloud-expert-button-search-list">
                                                              <Link
                                                                href="hire_freelancer.html"
                                                                onClick={this.hireFreelancer.bind(
                                                                  this,
                                                                  freelancer,
                                                                  freelancer.uuid
                                                                )}
                                                              >
                                                                Hire Cloud Expert
                                                              </Link>
                                                            </div>
                                                          )
                                                            :
                                                            (
                                                              <div className="hire-cloud-expert-button-search-list">
                                                                <Link
                                                                  //  onClick={this.handleHireCloudPayment}
                                                                  to={{
                                                                    pathname: "/settings",
                                                                    state: "payMethodPresent",
                                                                  }}
                                                                >
                                                                  Hire Cloud Expert

                                                                </Link>
                                                                {onOpen && <PaymentType onOpen={onOpen} onClose={this.onClose} />}
                                                              </div>
                                                            )}
                                                        <Modal
                                                          isOpen={this.state.modalIsOpen}
                                                          onAfterOpen={this.afterOpenModal}
                                                          onRequestClose={this.closeModal}
                                                          style={customStylesNew}
                                                          contentLabel="Example Modal"
                                                        >
                                                          <div className="add-payment-method-popup">
                                                            <div className="modal-header">
                                                              <button
                                                                type="button"
                                                                className="close"
                                                                onClick={this.closeModal}
                                                                data-dismiss="modal"
                                                              >
                                                                <span aria-hidden="true">×</span>
                                                                <span className="sr-only">Close</span>
                                                              </button>
                                                              <h2
                                                                className="modal-title"
                                                                ref={(subtitle) => (this.subtitle = subtitle)}
                                                              >
                                                                Payment Method
                                                              </h2>
                                                            </div>

                                                            <div className="modal-body">
                                                              <div className="row">
                                                                <div className="col-md-12">
                                                                  <p>
                                                                    You have not added any payment method. Please
                                                                    add one by{" "}
                                                                    <a href="/settings">Clicking Here </a>
                                                                  </p>
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </Modal>
                                                      </div>
                                                      {/* End Hire Cloud Expert */}


                                                      {/* Start Invite To Job */}
                                                      <div className="invite-to-job-button-search-list">
                                                        <Link
                                                          href="#"
                                                          className="tf_disabled_button"
                                                          disabled
                                                          onClick={this.inviteFreelancer.bind(this, freelancer)}
                                                        >
                                                          Invite To Job
                                                        </Link>
                                                      </div>

                                                      {/* End Invite To Job */}

                                                      {/* Start Earn */}
                                                      <div className="">
                                                        <h5>
                                                          <strong>${freelancer.amount_earned}k earned</strong>
                                                        </h5>
                                                      </div>
                                                      {/* End Earn */}
                                                    </div>

                                                    {/* End Column 2 */}

                                                    <div className="clearfix"></div>


                                                    <div className="col-md-12 mb-10">
                                                    </div>

                                                    <div className="clearfix"></div>

                                                  </div>

                                                </div>
                                              )
                                            })
                                          ) : !this.state.isLoading && (
                                            <div className="noJobsFound">
                                              <img src={NODataFoundImg} alt="" />
                                              <p>No Cloud Experts Found. </p>
                                            </div>

                                          )}
                                        </div>
                                      )
                                      }

                                      {!isEmpty(freelancers) && freelancers.length > 0 ? (
                                        <div className="">
                                          <div className="col-md-12">
                                            <Pagination
                                              activePage={this.state.activePage}
                                              itemsCountPerPage={itemsCountPerPage}
                                              totalItemsCount={allFreelancers.length}
                                              pageRangeDisplayed={5}
                                              onChange={this.handlePageChange.bind(this)}
                                              prevPageText="Previous"
                                              nextPageText="Next"
                                            />
                                          </div>
                                        </div>
                                      ) : null}

                                      {/* <!-- invite pop -->
                                    <!-- Modal --> */}
                                      <Modal
                                        isOpen={this.state.openInvite}
                                        style={customStyles}
                                        onRequestClose={this.handleInviteClose}
                                      >
                                        <div className="modal-dialog" role="document">
                                          <form onSubmit={this.handleSendInvite}>
                                            <div className="modal-content tf_float">
                                              <div className="modal-header">
                                                <button
                                                  type="button"
                                                  className="close"
                                                  onClick={this.handleInviteClose}
                                                  data-dismiss="modal"
                                                >
                                                  <span aria-hidden="true">×</span>
                                                  <span className="sr-only">Close</span>
                                                </button>
                                                <h4 className="modal-title" id="myModalLabel">
                                                  Invite to Job
                                                </h4>
                                              </div>
                                              <div className="modal-body" align="center">
                                                <div className="col-md-2 col-sm-2 col-xs-3 tf_full_width">
                                                  <div className="tf_image">
                                                    {
                                                      freelancerToInvite.profile &&
                                                        freelancerToInvite.profile.profile_picture ? (
                                                        <img
                                                          src={freelancerToInvite.profile.profile_picture}
                                                          className="img-circle-invite mt-0"
                                                          alt=""
                                                        />
                                                      ) : (
                                                        <img
                                                          src={faceImg}
                                                          className="img-circle-invite mt-0"
                                                          alt=""
                                                        />
                                                      )
                                                    }
                                                  </div>
                                                </div>
                                                <div className="col-md-10 col-sm-8 col-xs-9 tf_full_width">
                                                  <div className="tf_free_name">
                                                    <h4>{freelancerToInvite.name}</h4>
                                                  </div>
                                                  <div className="tf_f_content">
                                                    <h5>
                                                      <strong>
                                                        {isEmpty(freelancerToInvite)
                                                          ? ""
                                                          : freelancerToInvite.profile.current_job_title}
                                                      </strong>
                                                    </h5>
                                                  </div>
                                                </div>
                                                <div className="clearfix"></div>
                                                <div className="col-md-12">
                                                  <div className="form-group text-left">
                                                    <div className="input-group">
                                                      <label>Message</label>
                                                      <textarea
                                                        id="status"
                                                        rows="5"
                                                        className="form-control"
                                                        onChange={this.onInviteTextChange}
                                                        placeholder="Input text"
                                                      >
                                                        {this.state.inviteText}
                                                      </textarea>
                                                      <p className="form-error">{errors["inviteText"]}</p>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="col-md-12">
                                                  <div className="form-group">
                                                    <div className="input-group">
                                                      <label>Choose a job</label>
                                                      <div className="selectedwrap">
                                                        {!isEmpty(freelancerToInvite) &&
                                                          <Multiselect
                                                            options={freelancerToInvite.profile.available_jobs}
                                                            singleSelect
                                                            displayValue="title"
                                                            onSelect={this.onSelect}
                                                            selectedValues={this.state.selectedValue}
                                                            className="form-control mn_input"
                                                            placeholder="Select Job."
                                                          />
                                                        }
                                                        <p className="form-error">{errors["inviteJobId"]}</p>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="clearfix" />
                                              </div>
                                              <div className="modal-footer tf_model_footer pull-left">
                                                <div className="col-md-12">
                                                  <input
                                                    type="submit"
                                                    className="btn btn-fill btn-cyan btn-wd"
                                                    value="SEND INVITE"
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          </form>
                                        </div>
                                      </Modal>

                                      <Modal
                                        isOpen={this.state.openHire}
                                        style={customStyles}
                                        onRequestClose={this.handleHireClose}
                                      >
                                        <div
                                          className="modal-dialog tf_z_index find-freelancer-popup"
                                          role="document"
                                        >
                                          <div className="modal-content tf_float">
                                            <div className="modal-header">
                                              <button
                                                type="button"
                                                className="close"
                                                onClick={this.handleHireClose}
                                                data-dismiss="modal"
                                              >
                                                <span aria-hidden="true">×</span>
                                                <span className="sr-only">Close</span>
                                              </button>
                                              <h4 className="modal-title" id="myModalLabel">
                                                Hire <span style={{ color: '#0DA4DE' }}>{freelancerToHire.full_name}</span>
                                              </h4>
                                            </div>
                                            <div className="modal-body" align="center">
                                              <div className="col-md-12">
                                                <div className="form-group">
                                                  <div className="input-group">
                                                    <label>
                                                      Link this offer to an open job post
                                                    </label>
                                                    <div className="selectedwrap">
                                                      {!isEmpty(freelancerToHire) &&
                                                        <Multiselect
                                                          options={freelancerToHire.profile.available_jobs_for_contract}
                                                          singleSelect={true}
                                                          displayValue="title"
                                                          onSelect={this.onSelect}
                                                          selectedValues={this.state.selectedValue}
                                                          className="form-contro mn_inpu"
                                                          placeholder="Select Job."
                                                        />
                                                      }
                                                      {hireJobIdError &&
                                                        this.fieldError("Please select a job.")}
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="clearfix"></div>
                                              <div className="clearfix"></div>
                                              <div className="col-md-12 col-sm-12 col-xs-12">
                                                <div className="form-group">
                                                  <label className="labeltext">Job Type</label>
                                                  <br />
                                                  <div
                                                    className="form-check-inline"
                                                    onChange={this.handleRateType}
                                                  >
                                                    <label className="customradio">
                                                      <span className="radiotextsty">Hourly</span>
                                                      <input
                                                        type="radio"
                                                        checked={rateType === "hourly"}
                                                        name="radio"
                                                        value="hourly"
                                                      />
                                                      <span className="checkmark"></span>
                                                    </label>{" "}

                                                    <label className="customradio">
                                                      <span className="radiotextsty">Fixed - Price</span>
                                                      <input
                                                        type="radio"
                                                        value="fixed price"
                                                        checked={rateType === "fixed price"}
                                                        name="radio"
                                                      />
                                                      <span className="checkmark"></span>
                                                    </label>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="clearfix"></div>
                                            <div className="modal-footer tf_model_footer1">
                                              <div className="col-md-12 nopad">
                                                <div className="col-md-3 col-sm-4 col-xs-6">
                                                  <button
                                                    onClick={this.goToHiringPage}
                                                    type="button"
                                                    className="btn btn-fill btn-cyan btn-wd"
                                                  >
                                                    Continue
                                                  </button>
                                                </div>
                                                <div className="col-md-3 col-sm-4 col-xs-6">
                                                  <button
                                                    onClick={this.handleHireClose}
                                                    type="button"
                                                    className="btn btn-fill btn-elegant btn-wd"
                                                    data-dismiss="modal"
                                                  >
                                                    Cancel
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </Modal>
                                      {/* <!-- pop -->
                                    <!-- invite pop --> */}

                                    </div>
                                  )}
                                {
                                  hireSection && (
                                    <HiredFreelancers history={this.props.history} hireType="contracts" />
                                  )}
                                {
                                  savedSection && <SavedFreelancers history={this.props.history} />
                                }
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
          </div>
          {/* <Footer/> */}
        </div>
      </div>

    )
  }
}
const mapStateToProps = (state) => {
  return {
    ...state,
    allFreelancers: state.allFreelancers,
    applicationIsLoading: state.applicationIsLoading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllFreelancers: (favour, searchBy, searchItem, sortBy, sortItem, search, newSearchItem, dataType, page) => dispatch(getAllFreelancers(favour, searchBy, searchItem, sortBy, sortItem, search, newSearchItem, dataType, page)),

    inviteToJob: (data) => dispatch(inviteToJob(data)),
    addFavourite: (id) => dispatch(addFavourite(id)),
    removeFavourite: (id) => dispatch(removeFavourite(id)),
    getSearchedFLForHiringMan: (searchBy, searchItem) => dispatch(getSearchedFLForHiringMan(searchBy, searchItem)),
    getSaveFreelancers: () => dispatch(getSavedFreelancerForHiringmanager()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(FindFreelancers)
