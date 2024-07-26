import React, { Component } from "react";
import { connect } from "react-redux";
import { getFilteredDataForJobs } from '../../Actions/SearchActions';
import { getAllFreelancers, approveFreelancer, banFreelancer } from '../../Actions/AdminActions';
import AdminHeader from "../miscellaneous/AdminHeader";
import path2019 from '../../static/admin_images/Path_2019.svg';
import { Link } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';
import countryList from 'react-select-country-list';
// import faceImg from '../../static/images/profile-placeholder.png';
import { isEmpty } from 'lodash';
import LANGUAGES from '../../constants/languages';
import COUNTRIES from '../../constants/countryListWithCodes'
import ReactCountryFlag from "react-country-flag"
import loadMoreSrc from "../../static/images/loadMore.gif";
import _ from "lodash";
import Loader from "react-loader-spinner";
import ClientEditModal from "./PopupModals/clientEditModal";
import AdminBanAndDelModal from "./PopupModals/AdminBanandDeleteModal";
import ReactTooltip from "react-tooltip";
import CommonHeaderSidebar from "./AdminCommanComponents/AdminCommanHearderSideBar";
import NoDataFoundMessage from "../Common/NodataFoundMessage/NoDataFoundMessage";
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

class PostDetails extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            activeTab: 'all',
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
            currentArrayKey: 0,
            banModal: false,
            freelancer_Ban_id: "",
            Action_Type: "",
            cloud_expert_details: ""
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

    handleOPenModal = (e, details) => {
        console.log(details, "----details------");
        e.preventDefault()
        // this.setState({ openModal: true, currentArrayKey: i + 1 })
        // this.setState({ profileDetail: row })
        this.setState({ openModal: true, cloud_expert_details: details })

    }

    closeModals = () => {
        this.setState({ profileDetail: "", openModal: false })
    }
    editProfile = (data) => {
        this.getFreelancersDataApiCall("fromDidMount", this.state.activeTab);
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
        console.log(tab, "---tab---");
        const isAllFreelancers = (tab === 'approved')

        this.props.getAdminFilter(this.state.favour, "search_freelancers", this.state.filterData, "status", tab, "search", this.state.newSearchItem, "find_freelancers", this.state.activePage).then((res) => {
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
                        //     <SweetAlert success title="" onConfirm={this.hideAlert.bind()} showConfirm={true}>
                        //         <img src={this.state.src} alt="" />
                        //         <h3>
                        //             <strong>
                        //                 {res.message}
                        //             </strong>
                        //         </h3>
                        //     </SweetAlert>
                        // </div>
                        <SuccessSweetAlert 
                        show={true}
                        handleConfirm={this.hideAlert.bind()}
                        message={res.message}
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

    dateTime = (date) => {
        var newDate = new Date(date);
        return newDate.getDate() + "/" + (newDate.getMonth() + 1) + "/" + newDate.getFullYear()
    }

    handleBan = (id, type) => {

        this.setState({ banModal: true, freelancer_Ban_id: id, Action_Type: type })
    }
    closeModal = () => {
        this.setState({ banModal: false })
    }
    banFreelancer = (id, account_approved) => {
        console.log(this.state.freFelancer_Ban_id, "----id---");
        this.props.banFreelancer(id, account_approved).then((data) => {
            const isAllFreelancers = (this.state.activeTab === 'approved')
            // const newStatusType = !isEmpty(this.state.sortItem) ? (this.state.sortItem === "Approved") ? true : this.state.sortItem === "Not Approved" ? false : this.state.sortItem === "Banned" ? "banned" : ""  : ""
            console.log(data.data.message , "data");
            this.props.getAdminFilter(this.state.favour, "search_freelancers", this.state.filterData, "status", this.state.activeTab, "search", this.state.newSearchItem, "find_freelancers", this.state.activePage)
                .then((filteredFreelancers) => {
                 
                    this.setState({ freelancers: filteredFreelancers, filteredFreelancers: filteredFreelancers || [], allFreelancers: filteredFreelancers || [] , isApproved : data?.data?.message })
                    if (filteredFreelancers.length < 10) {
                        this.setState({
                            hideShowMore: true,
                        })
                    }
                })
        })
        this.setState({ banModal: false, freelancer_Ban_id: "" })
    }
    render() {
        let { value, suggestions, expLevel, availability, projectPreference,
            certificateOption, newSearchItem, langValue, filterData, freelancers, banModal, Action_Type, cloud_expert_details, freelancer_Ban_id } = this.state;
        const { applicationIsLoading } = this.props;
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
        return (
            // 
            
            <CommonHeaderSidebar lable="CLOUD EXPERTS" >
                 
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="col-md-12 col-sm-12">
                        <div className="p-4 bg-white box-shadow mb-4">
                            {/* Start Row */}
                            <div className="row" id="tabs--search-box-container">
                                <div className="col-md-12">
                                    <div className="super-admin-cloud-expert-tabs">
                                        <ul className="nav tabcustom">
                                            <li role="presentation" className="active"><a href="#ALL" id="all" onClick={this.showASection} data-toggle="tab">All</a></li>
                                            <li role="presentation" className=""><a href="#APPROVED" id="approved" onClick={this.showASection} data-toggle="tab">Approved</a></li>
                                            <li role="presentation"><a href="#UNAPPROVED" id="unapproved" onClick={this.showASection} data-toggle="tab">Unapproved</a></li>
                                        </ul>
                                    </div>
                                    {/* End Tabs */}
                                    {this.state.isApproved && 
                                     <SuccessSweetAlert 
                                     show={true}
                                     handleConfirm={this.hideAlert.bind()}
                                     message={this.state.isApproved}
                                     />
                                    }

                                    {/* Start Search Box */}
                                    <div className="tf_app_search" id="searchbox-approved-unapproved-cloud-expert">
                                        <div className="col-md-12 p-0 mb-4">
                                            <h4 className="manager-welcome-title">{this.state.activeTab == 'approved' ? "Approved Freelancers" : this.state.activeTab == 'unapproved' ? "Unapproved  Freelancers" : "All  Freelancers"} </h4>
                                            {/* Start Found Message */}
                                            <div className="freelancer-count-color">
                                                {freelancers.length > 0 && <p className="number-of-cloud-expert-found-message"> {freelancers.length} Cloud Experts Found</p>}
                                            </div>
                                            {/* End Found Message */}
                                            <div className="pull-right" data-toggle="buttons" id="user-admin-filter-button">
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
                                        </div>

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
                                                                        <div className="tf_sound tf_sound1">
                                                                            <input type="checkbox" name="Salesforce" value="IBM Cloud" checked={filterData.category.includes("IBM Cloud")} id="IBM Cloud" />
                                                                            <label htmlFor="IBM Cloud"> IBM Cloud </label>
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
                                                                <h4 className="heading_bold">Availability</h4>
                                                                <div onChange={this.handleAvailability} name="availability">
                                                                    <div className="tf_sound tf_sound1" >
                                                                        <input type="checkbox" name="hours" value="Less than 40 hours" checked={availability === "Less than 40 hours"} id="Less than 40 hours" />
                                                                        <label htmlFor="Less than 40 hours">{lessThan} 40 hours</label>
                                                                    </div>
                                                                    <div className="tf_sound tf_sound1" >
                                                                        <input type="checkbox" name="hours" value="More than 40 hours" checked={availability === "More than 40 hours"} id="More than 40 hours" />
                                                                        <label htmlFor="More than 40 hours"> 40 hours </label>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="card card-body">
                                                                <h4 className="heading_bold">Project Preference</h4>
                                                                <div onChange={this.handleProjectPreference} name="projectPreference">
                                                                    <div className="tf_sound tf_sound1" >
                                                                        <input type="checkbox" name="Both short-term and long-term projects" value="Both short-term and long-term projects" checked={projectPreference.includes("Both short-term and long-term projects")} id="Both short-term and long-term projects" />
                                                                        <label htmlFor="Both short-term and long-term projects"> Both</label>
                                                                    </div>
                                                                    <div className="tf_sound tf_sound1" >
                                                                        <input type="checkbox" name="Both short-term and long-term projects" value="Long-term projects (more than 3 months)" checked={projectPreference.includes("Long-term projects (more than 3 months)")} id="Long-term projects (more than 3 months)" />
                                                                        <label htmlFor="Long-term projects (more than 3 months)"> Long-term</label>
                                                                    </div>
                                                                    <div className="tf_sound tf_sound1" >
                                                                        <input type="checkbox" name="Both short-term and long-term projects" value="Short-term projects (less than 3 months)" checked={projectPreference.includes("Short-term projects (less than 3 months)")} id="Short-term projects (less than 3 months)" />
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
                                        <form>
                                            <input type="" value={newSearchItem} name="" className="no-resize-bar form-control" placeholder="Search Cloud Expert"
                                                onChange={this.handleSearch} />

                                            <div className="tf_emoji">
                                                <Link to={"#"}><img src={path2019} alt="" /></Link>
                                            </div>
                                        </form>
                                    </div>
                                    {/* End Start Box */}
                                </div>
                            </div>
                            {/* End Row  */}
                            {applicationIsLoading && <div className="grid-loader my-feed-loader col-md-12">
                                <Loader type="Grid" color="#00BFFF" height={100} width={100} />
                            </div>}

                            <div className="row">
                                <div className="">
                                    <div className="">
                                        <div className="card-body projects__table-sec">
                                            <div className="table-responsive pl-table">
                                                <table className="table" id="cloud-expert-listing-admin-side-table">
                                                    <thead className="">
                                                        <tr className="bg-light">
                                                            <th>Freelancer</th>
                                                            <th>Expertise</th>
                                                            <th>Verified</th>
                                                            <th>Account Balance</th>
                                                            <th>Joined Date</th>
                                                            <th>Last Login</th>
                                                            <th>Approved</th>
                                                            <th style={{ textAlign: 'end' }}>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            freelancers && freelancers.length > 0 ? freelancers.map((freelancer, i) => {
                                                                // console.log(value , "valueeeee");
                                                                return (
                                                                    <tr key={i} className="" >

                                                                        <td>
                                                                            <div className="d-flex vt-center">

                                                                                <div>
                                                                                    <Link key={freelancer.id} to={`/freelancer/${freelancer.uuid}`}>
                                                                                        <span className="cloud-expert-name">{freelancer.full_name}</span>
                                                                                    </Link>
                                                                                </div>

                                                                            </div>

                                                                        </td>
                                                                        {/* End TD */}
                                                                        <td>
                                                                            {freelancer.profile.category[0] || "-"}
                                                                        </td>
                                                                        <td>
                                                                            <div className="d-flex">
                                                                            {freelancer.confirmed_at ? <>
                                                                                <i class="fa fa-check-circle-o text-green" aria-hidden="true"></i> Email
                                                                            </> : "-"}
                                                                            </div>

                                                                        </td>
                                                                        <td>
                                                                            {freelancer.amount_earned || "$25"}
                                                                        </td>
                                                                        <td> {this.dateTime(freelancer.created_at) || "-"}</td>
                                                                        <td>{this.dateTime(freelancer.updated_at) || "-"}</td>
                                                                        <td className={freelancer.account_approved ? "text-green" : "text-orange"}>{freelancer.account_approved ? "Yes" : "No"}</td>
                                                                        <td className="">
                                                                            <div className="d-flex vt-center">
                                                                                <div className="admin_dropdown-container">
                                                                                    <div class="dropdown pl-dropdown">
                                                                                        <b className={freelancer.account_approved ? "text-orange" : "text-green"} onClick={() => this.handleBan(freelancer.uuid, freelancer.account_approved ? "suspend_user" : "active_user")} >
                                                                                            {
                                                                                                freelancer.account_approved ?
                                                                                                    <>
                                                                                                        <i className="fa fa-ban action-danger-btn" data-tip="Reject" data-for="reject"></i>
                                                                                                        <ReactTooltip id="reject" position={'right'}>Reject</ReactTooltip>
                                                                                                    </>

                                                                                                    : <>
                                                                                                        <i className="fa fa-thumbs-o-up action-gree-btn" data-tip data-for="approve"></i>
                                                                                                        <ReactTooltip id="approve" position={'right'}>Approve</ReactTooltip>
                                                                                                    </>

                                                                                            }
                                                                                        </b>


                                                                                        <button class="dropdown-toggle ellipsis-button" type="button" data-toggle="dropdown"><i className="fa fa-ellipsis-v"></i></button>
                                                                                        <ul class="dropdown-menu">
                                                                                            <li>
                                                                                                <Link to={`/freelancer/${freelancer.uuid}`}><i class="fa fa-file-text-o" aria-hidden="true"></i> View Details</Link>
                                                                                            </li>
                                                                                            <li>
                                                                                                <Link><i class="fa fa-money" aria-hidden="true"></i> Transaction</Link>
                                                                                            </li>
                                                                                            <li>
                                                                                                <Link><i class="fa fa-unlock-alt" aria-hidden="true"></i> Reset Password</Link>
                                                                                            </li>
                                                                                            <li>
                                                                                                {freelancer.account_approved ?
                                                                                                    <Link onClick={() => this.handleBan(freelancer.uuid, "suspend_user")}><i className="fa fa-ban"></i> Suspend User</Link>
                                                                                                    :
                                                                                                    <Link onClick={() => this.handleBan(freelancer.uuid, "active_user")} ><i className="fa fa-thumbs-o-up"></i> Approve User</Link>
                                                                                                }
                                                                                            </li>
                                                                                            <li>
                                                                                                <Link onClick={(e) => this.handleOPenModal(e, freelancer)}><i class="fa fa-pencil" aria-hidden="true" ></i> Edit</Link>
                                                                                            </li>
                                                                                            <li>
                                                                                                <Link onClick={() => this.handleBan(freelancer.uuid, "delete_user")}><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</Link>
                                                                                            </li>
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        {/* {                                       this.state.activeTab !== 'approved' &&
                                        <td>
                                            <Link key={freelancer.id} onClick={this.handleApprove.bind(this, freelancer.uuid)}>
                                                <span className="approve-link">APPROVE</span>
                                            </Link>
                                        </td>
                                    } */}


                                                                    </tr>
                                                                )
                                                            })
                                                                : <tr style={{ textAlign: "center" }}>
                                                                    <td colSpan={6}><NoDataFoundMessage
                                                                        message={"No Record Found!"}
                                                                    /></td>
                                                                </tr>
                                                        }

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div>
                                                <div className="bg-white custom_admin-table">
                                                    <table className="w-100">
                                                        <thead>
                                                            <tr>
                                                                <th style={{width: '10%'}}>Freelancer</th>
                                                                <th style={{width: '10%'}}>Expertise</th>
                                                                <th style={{width: '15%'}}>Verified</th>
                                                                <th style={{width: '15%'}}>Account Balance</th>
                                                                <th style={{width: '15%'}}>Joined Date</th>
                                                                <th style={{width: '15%'}}>Last Login</th>
                                                                <th style={{width: '15%'}}>Approved</th>
                                                                <th style={{width: '5%'}}></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>Talfoundry D</td>
                                                                <td>Salesforce</td>
                                                                <td> Email</td>
                                                                <td>25</td>
                                                                <td>13/7/2022</td>
                                                                <td>13/7/2022</td>
                                                                <td>yes</td>
                                                                <td>
                                                                    <div class="dropdown">
                                                                        <a href="" class="dropdown-toggle" data-toggle="dropdown"><i className="fa fa-ellipsis-v"></i>
                                                                            <span class="caret"></span></a>
                                                                        <ul class="dropdown-menu">
                                                                            <li><a href="#">View details</a></li>
                                                                            <li><a href="#">CSS</a></li>
                                                                            <li><a href="#">JavaScript</a></li>
                                                                        </ul>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div> */}
                    </div>
                    <div className="row">
                        {
                            freelancers.length > 4 && !this.state.hideShowMore && <button className="load_more_btn_find_work mt-20 mb-15" onClick={this.handleShowMore}>  Show More </button>
                        }

                        {
                            applicationIsLoading && <img src={loadMoreSrc} alt="" />
                        }

                    </div>
                </div>

                <ClientEditModal
                    openModal={this.state.openModal}
                    closeModals={this.closeModals}
                    applicationIsLoading={this.props.applicationIsLoading}
                    ce_details={cloud_expert_details}
                    editProfile={this.editProfile}
                    Client_detail=""
                />
                {/* suspend_user and delete modal */}
                <AdminBanAndDelModal
                    isOpen={banModal}
                    freelancer_Ban_id={freelancer_Ban_id}
                    closeModal={this.closeModal}
                    Action_Type={Action_Type}
                    banFreelancer={this.banFreelancer}
                />
            </CommonHeaderSidebar>
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
        banFreelancer: (id, account_approved) => dispatch(banFreelancer(id, account_approved)),
        getAdminFilter: (favour, searchBy, searchItem, sortBy, sortItem, search, newSearchItem, dataType, page) => dispatch(getFilteredDataForJobs(favour, searchBy, searchItem, sortBy, sortItem, search, newSearchItem, dataType, page)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails)
