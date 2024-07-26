import React, { Component } from "react";
import UserImage from "../../static/images/user.svg";
import { logOutAction } from "../../Actions/logOutAction";
import { connect } from "react-redux";
import countryList from "react-select-country-list";
import "react-tagsinput/react-tagsinput.css";
import _ from "lodash";
import { addAppProcessStep1 } from "../../Actions/appProcessStepsActions";
import { getUserRedirection } from "../../utills/formatting";
import { getCurrentUserDetails } from "../../Actions/applicationActions";
// import { getOtherFreelancers } from "../../Actions/freelancerActions";
import AppProcessHeader from "../miscellaneous/AppProcessHeader";
// import Dropzone from "react-dropzone";
import { Link } from "react-router-dom";
// import closeIcon from "../../static/images/close-icon.png";
import csc from "country-state-city";
import LANGUAGES from "../../constants/languages";
// import fileLogo from "../../static/images/file.png";
import {
    addAppProcessStep2,
    submitAppForCall,
} from "../../Actions/appProcessStepsActions";
import "react-datepicker/dist/react-datepicker.css";
import CreateProfileFormSection2 from "./CreateProfileFormSection2";
import CreateProfileFormSection3 from "./CreateProfileFormSection3";
import CreateProfileFormSection4 from "./CreateProfileFormSection4";
import CreateProfileFormSection5 from "./CreateProfileFormSection5";
import CreateProfileFormSection6 from "./CreateProfileFormSection6";
// import RightColumnSelection from "./RightColumnSelection";
import ProfileForm from "./Forms/ProfileForm";
import { Steps } from "./Steps/Steps"; 
import SelectionProgessBar from "../CommonComponets/StepProgressbar/SelectionProgessBar";


const allLanguages = LANGUAGES

class CreateProfileCloudExpert extends Component {
    constructor(props, context) {
        super(props, context);
        this.citizenshipName = !_.isEmpty(props.currentUser)
            ? `${props.currentUser.first_name} ${props.currentUser.last_name}`
            : "";
        this.countries = countryList().getData();
        this.countryRef = React.createRef();
        let { appProcessStep1 } = props.appProcessSteps;
        const current_location_country = appProcessStep1.current_location_country
            ? appProcessStep1.current_location_country
            : !_.isEmpty(props.currentUser)
                ? `${props.currentUser.country}`
                : "United States";
        const countryId = appProcessStep1.countryId
            ? appProcessStep1.countryId
            : !_.isEmpty(props.currentUser)
                ? `${props.currentUser.country_id}`
                : "231";

        this.state = {
            current_company_name: "",
            current_job_title: "",
            about_me: "",
            current_company_name_error: false,
            current_job_title_error: false,
            about_me_error: false,
            profile_picture: "",
            profile_picture_name: "",
            resume_name: "",
            resume: "",
            current_location_country: current_location_country,
            countryId: countryId,
            state:
                appProcessStep1 && appProcessStep1.state
                    ? appProcessStep1.state
                    : "Alabama",
            stateId:
                appProcessStep1 && appProcessStep1.stateId
                    ? appProcessStep1.stateId
                    : "3919",
            current_location_city:
                appProcessStep1 && appProcessStep1.current_location_city
                    ? appProcessStep1.current_location_city
                    : "Anchorage",
            citizenship_country: current_location_country,
            skill: [],
            citizenship_full_name: this.citizenshipName,
            profile_picture_error: false,
            resume_error: false,
            citizenship_country_error: false,
            current_location_city_error: false,
            current_location_country_error: false,
            citizenship_full_name_error: false,
            profile_picture_type_error: false,
            english_proficiency: "English",
            isResumeTypeImage: false,
            resume_type_error: false,
            AddedCertificates: [],
            jobCategory_error: false,
            profileType: "Individual",
            english_proficiency_error: false,
            showStep2: false,
            showStep3: false,
            showStep4: false,
            showStep5: false,
            showStep6: false,
            userDetails: {},
            working_hours_talfoundry: "",
            start_date: new Date(),
            activeStep: "step1",
            jobCategory_api: [],
            showSubmitButton: false,
            hoursAvailable: "",
            hourlyRate: "",
            educationalDetails: [],
            otherUsers: [],
            employmentDetails: [],
            certificationDetails: [],
            sidePosition: 200,
            offsetToScroll: 0,
            visitedSteps:["step1"],
            completedSteps:[]
        }
        this.handleContinue = this.handleContinue.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.selectCitizenship = this.selectCitizenship.bind(this);
        this.allCountries = csc.getAllCountries();
        this.ScrollRef = React.createRef()
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);

        let getStartedClicked =
            this.props.location &&
            this.props.location.state &&
            this.props.location.state.getStartedClicked;
        this.props.getCurrentUserDetails().then((details) => {
            const { hasRedirection, path } = getUserRedirection(details);
            this.setState({ userDetails: details });

            if (!getStartedClicked) {
                if (hasRedirection && !getStartedClicked) {
                    this.props.history.push(path);
                }
            }
        });

        // this.props
        //     .getOtherFreelancers()
        //     .then((res) => {
        //         this.setState({ otherUsers: res.data });
        //     })
        //     .catch((err) => {
        //         console.log("res================", err);
        //     });
        this.setState(this.props.appProcessSteps.appProcessStep1);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        let { appProcessStep1 } = nextProps.appProcessSteps;
        const current_location_country = appProcessStep1.current_location_country
            ? this.state.current_location_country ||
            appProcessStep1.current_location_country
            : !_.isEmpty(nextProps.currentUserDetails) &&
            nextProps.currentUserDetails.country;
        const countryId = appProcessStep1.countryId
            ? this.state.countryId || appProcessStep1.countryId
            : !_.isEmpty(nextProps.currentUserDetails) &&
            `${nextProps.currentUserDetails.country_id}`;
        this.setState({
            current_location_country: current_location_country,
            citizenship_country : current_location_country,
            countryId: countryId,
        });
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log(prevState.activeStep ,  this.state.activeStep);
        if (prevState.offsetToScroll !== this.state.offsetToScroll) {
            // Now fetch the new data here.
            window.scrollTo(0, this.state.offsetToScroll);
        }
    }

    handleProfilePicDrop = (files) => {
        const target = "profile_picture";
        let file = files[0];
        let fileName = files[0].name;
        if (
            file.type.includes("png") ||
            file.type.includes("jpeg") ||
            file.type.includes("jpg")
        ) {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                this.setState({
                    [target]: event.target.result,
                    [target + "_error"]: false,
                    profile_picture_name: fileName,
                    profile_picture_type_error: false,
                });
            }
        } else {
            this.setState({ profile_picture_type_error: true });
        }
    }

    handleResumeDrop = (files) => {
        const target = "resume";
        let file = files[0];
        let fileName = files[0].name;
        let isResumeTypeImage = file.type.includes("image");
        if (
            fileName.includes(".png") ||
            fileName.includes(".jpeg") ||
            fileName.includes(".jpg") ||
            fileName.includes(".txt") ||
            fileName.includes(".odt") ||
            fileName.includes(".pdf") ||
            fileName.includes(".doc") ||
            fileName.includes(".msword")
        ) {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                this.setState({
                    [target]: event.target.result,
                    [target + "_error"]: false,
                    resume_name: fileName,
                    resume_type_error: false,
                    isResumeTypeImage: isResumeTypeImage,
                });
            }
        } else {
            this.setState({ resume_type_error: true });
        }
    }

    fieldError(message) {
        return (
            <p id="firstName" className="error-field">
                {message ? message : "This field can't be blank."}
            </p>
        );
    }

    handleContinue(step, nextStep) {
        console.log(step, "step", nextStep, "nextStep");
        const {
            resume,
            citizenship_country,
            current_location_city,
            current_location_country,
            citizenship_full_name,
            jobCategory_api,
            about_me,
            current_job_title,
            english_proficiency,
            visitedSteps,
            completedSteps
        } = this.state;
        let words = (about_me.match(/\S+/g) || []).length;
        // this.setState({ visitedSteps : [...visitedSteps ,  nextStep] , completedSteps : [...completedSteps , step] })
        if (step === "step1") {
            if (
                resume !== "" &&
                citizenship_country !== "" &&
                current_location_city !== "" &&
                current_location_country !== "" &&
                citizenship_full_name !== "" &&
                current_job_title !== "" &&
                english_proficiency !== "" &&
                (words > 50 && words < 500)
            ){
                this.setState({showStep2: true , activeStep : "step2" , visitedSteps : [...visitedSteps ,  nextStep] , completedSteps : [...completedSteps , step]} , ()=>{
                    this.scrollToMyRef("step2");
                })
            }else{
                this.setState(
                    {
                        resume_error: resume === "",
                        citizenship_country_error: citizenship_country === "",
                        current_location_city_error: current_location_city === "",
                        current_location_country_error: current_location_country === "",
                        citizenship_full_name_error: citizenship_full_name === "",
                        jobCategory_error: _.isEmpty(jobCategory_api),
                        current_job_title_error: current_job_title === "" && true,
                        about_me_error: words < 50 || words > 500,
                        english_proficiency_error: english_proficiency === "",
                        // showStep2: true 
                    }
                );
            }
           
        } else if (step === "step2") {
            this.setState({ showStep3: true , activeStep : "step3" , visitedSteps : [...visitedSteps ,  nextStep] , completedSteps : [...completedSteps , step] } , ()=>{
                this.scrollToMyRef("step3");
            } )
        } else if (step === "step3") {
            this.setState({ showStep4: true , activeStep : "step4" , visitedSteps : [...visitedSteps ,  nextStep] , completedSteps : [...completedSteps , step] } ,() =>{
                this.scrollToMyRef("step4");

            });
        } else if (step === "step4") {
            this.setState({ showStep5: true,  activeStep:"step5" , visitedSteps : [...visitedSteps ,  nextStep] , completedSteps : [...completedSteps , step] },() =>{

                this.scrollToMyRef("step5");
            });
        } else if (step === "step5") {
            this.setState({ showStep6: true, showSubmitButton: true , activeStep : "step6" ,visitedSteps : [...visitedSteps ,  nextStep] , completedSteps : [...completedSteps , step] } , () =>{
                this.scrollToMyRef("step6");
            });
        }

    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
            [e.target.name + "_error"]: false,
        });
    }

    selectCitizenship(val) {
        this.setState({
            citizenship_country: val,
            citizenship_country_error: false,
        });
    }

    selectCurrentCountry = (e) => {
        let countryId = e.target.options[e.target.selectedIndex].id;
        const state = csc.getStatesOfCountry(countryId)[0];
        const city = csc.getCitiesOfState(state.id);
        console.log(state , city);
        this.setState({
            current_location_country: e.target.value,
            countryId: countryId,
            current_location_country_error: false,
            current_location_city_error: false,
            state: state.name,
            stateId: state.id,
            current_location_city: city ? city.name : state.name,
        });
    }

    selectCurrentState = (e) => {
        let stateId = e.target.options[e.target.selectedIndex].id;
        const city = csc.getCitiesOfState(stateId)[0];
        const cityName = city ? city.name : "";
        console.log(cityName ,  stateId  , city);

        this.setState({
            state: e.target.value,
            stateId: stateId,
            current_location_city_error: cityName ? false : true,
            current_location_city: cityName,
        });
    }

    selectCurrentCity = (e) => {
        this.setState({
            current_location_city: e.target.value,
            current_location_city_error: false,
        });
    }

    removeAttachment = (e) => {
        if (e.target.id === "profile_picture") {
            this.setState({ profile_picture: "", profile_picture_name: "" });
        } else {
            this.setState({ resume: "", resume_name: "" });
        }
    }

    renderOtherUsers = () => {
        const { otherUsers } = this.state;
        let allUsers = [];

        otherUsers.map((user) => {
            allUsers.push(
                <div className="tf_abt_slt">
                    <img
                        className="sidebar-freelancer-image"
                        src={user.user_profile.freelancer_image || UserImage}
                        alt="ellipse"
                    />
                    <h5>
                        {user.first_name} {user.last_name}
                    </h5>
                    <p>{user.current_job_title}</p>
                </div>
            );
            return user
        });
        return <React.Fragment>{allUsers}</React.Fragment>;
    }

    setData = (key, value) => {
        this.setState({ [key]: value });
    }

    setJobCategory = (category) => {
        this.setState({ jobCategory_api: category });
    }

    setSkill = (skills) => {
        this.setState({ skill: skills });
    }

    setEverWorked = (val) => {
        this.setState({ worked_as_freelancer: val });
    }

    setYearsOfExp = (val) => {
        this.setState({ working_hours_talfoundry: val });
    }

    setSkypeName = (val) => {
        this.setState({ skype_user_name: val });
    }

    setLinkedinProfile = (val) => {
        this.setState({ linkedin_profile: val });
    }

    setStartDate = (val) => {
        this.setState({ start_date: val });
    }

    setExperience = (val) => {
        this.setState({ experience: val });
    }

    handleScroll = (event) => {
        if (document.documentElement.scrollTop < 0) {
            this.setState({ sidePosition: 200 })
        }
        if (document.documentElement.scrollTop > 200) {
            // console.log('222')
            this.setState({ sidePosition: 100 })
        }
        else {
            this.setState({ sidePosition: 200 })
        }
    }

    handleSideBarClick = (step ) => {
        this.setState({
            activeStep: step,
        } , () =>{
            this.scrollToMyRef(step)
        })
    }

    scrollToMyRef = (refe) => {
        let { employmentDetails } = this.state
        let projectHeight = 0
        projectHeight = employmentDetails ? (employmentDetails.length * 80) : 0
        // console.log(employmentDetails, "projectHeight", projectHeight)
        const offSetTop = this.ScrollRef.current?.offsetTop + 60
        this.setState({
            activeStep:refe,
        },() => {
        let offsetToScroll;
        if (refe === "step1") {
            offsetToScroll = 0;
        } else if (refe === "step2") {
            offsetToScroll = offSetTop;
        } else if (refe === "step3") {
            offsetToScroll = offSetTop;
        } else if (refe === "step4") {
            offsetToScroll = offSetTop;
        } else if (refe === "step5") {
            offsetToScroll = offSetTop;
        }
        else if (refe === "step6") {
            offsetToScroll = offSetTop + projectHeight;
        }

        console.log(offSetTop, "offsettop",offsetToScroll , "offsetToScroll" , refe);
        window.scrollTo(0, offsetToScroll);
        });
        // this.setState({ offsetToScroll: offsetToScroll })
    }

    handleSubmit = () => {
        let {
            hourlyRate,
            hoursAvailable,
            educationalDetails,
            employmentDetails,
            certificationDetails,
            current_location_country,
            english_proficiency,
            linkedin_profile,
            profile_picture,
            resume,
            skill,
            current_job_title,
            current_company_name,
            worked_as_freelancer,
            start_date,
            working_hours_talfoundry,
            profileType,
            citizenship_full_name,
            experience,
            about_me,
            jobCategory_api,
            current_location_city,
            skype_user_name,
            citizenship_country
        } = this.state;

        let that = this;

        const data = {
            profile: {
                hourly_rate: hourlyRate,
                availability: hoursAvailable,
                educations_attributes: educationalDetails,
                employments_attributes: employmentDetails,
                certifications_attributes: certificationDetails,
                citizenship_full_name: citizenship_full_name,
                current_location_city: current_location_city,
                current_location_country: current_location_country,
                english_proficiency: english_proficiency,
                development_experience: experience,
                citizenship_country: citizenship_country,
                linkedin_profile: linkedin_profile,
                profile_picture: profile_picture,
                resume: resume,
                skill: (skill || []).join(","),
                category: (jobCategory_api || []).join(", "),
                skype_user_name: skype_user_name,
                current_company_name: current_company_name,
                current_job_title: current_job_title,
                about_me: about_me,
                search_engine_privacy: "Show only my first name and last initial",
                worked_as_freelancer: worked_as_freelancer,
                start_date: start_date,
                working_hours_talfoundry: working_hours_talfoundry,
                profile_type: profileType,
            },
        }

        this.props.createProfileApi(data).then((res) => {
            if (res.status === 200) {
                that.props.history.push({
                    pathname: "/freelancer-success",
                    state: { Profile_created: true },
                });
            } else {
                alert("Internal server error");
            }
        });
    }

    render() {
        const {
            current_location_country,
            current_location_city,
            citizenship_country,
            citizenship_full_name,
            profile_picture,
            resume,
            profile_picture_error,
            resume_error,
            current_location_country_error,
            current_location_city_error,
            citizenship_country_error,
            state,
            citizenship_full_name_error,
            profile_picture_type_error,
            profile_picture_name,
            resume_name,
            isResumeTypeImage,
            resume_type_error,
            current_company_name,
            current_company_name_error,
            current_job_title,
            current_job_title_error,
            about_me,
            about_me_error,
            english_proficiency,
            english_proficiency_error,
            showStep2,
            showStep3,
            showStep4,
            showStep5,
            showStep6,
            showSubmitButton,
            activeStep,
            offsetToScroll,
            visitedSteps ,
            completedSteps

        } = this.state;
        // console.log(offsetToScroll, "offsetToScroll");

        const { applicationIsLoading } = this.props;

        const jobAttachment = (file) => {
            return file && file.url
                ? file.url.split("/")[file.url.split("/").length - 1]
                : "";
        }
        const allStates = csc.getStatesOfCountry(this.state.countryId);
        const allCities = csc.getCitiesOfState(this.state.stateId);

        const languages = allLanguages.map((lang) => (
            <option selected={lang === english_proficiency}>{lang}</option>
        ));
        // console.log("this--->>",this.state)

        return (
            <div>
                <div id="tf-cloud-expert-dashboard-root">
                    {/* Start Header */}
                    <div id="tf-cloud-expert-dashboard-header-container">
                        <AppProcessHeader history={this.props.history} />
                    </div>
                    <div className={"mains"} >
                        <div className="cloud-expert-right-content-area">
                            <div className="main-content container-fluid">
                                <div className="row custom_row">
                                    {/* form start */}
                                    <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 p-0">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 p-0">
                                            <p className="mn_ex" style={{ margin: "13px 18px", fontSize: "25px" }}>
                                                <strong>Application	Process</strong>
                                            </p>
                                        </div>
                                        <div className="tf_tell create-profile-ce">

                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 p-0">
                                                <div className="row">
                                                    {/* step 1 start */}
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" ref={activeStep === "step1" && this.ScrollRef}>
                                                        <ProfileForm
                                                            handleChange={this.handleChange}
                                                            state={this.state}
                                                            current_company_name={current_company_name}
                                                            current_company_name_error={current_company_name_error}
                                                            fieldError={this.fieldError}
                                                            citizenship_full_name={citizenship_full_name}
                                                            citizenship_full_name_error={citizenship_full_name_error}
                                                            current_job_title={current_job_title}
                                                            current_job_title_error={current_job_title_error}
                                                            about_me={about_me}
                                                            about_me_error={about_me_error}
                                                            profile_picture={profile_picture}
                                                            profile_picture_name={profile_picture_name}
                                                            profile_picture_error={profile_picture_error}
                                                            profile_picture_type_error={profile_picture_type_error}
                                                            resume={resume}
                                                            resume_name={resume_name}
                                                            resume_error={resume_error}
                                                            resume_type_error={resume_type_error}
                                                            allCities={allCities}
                                                            allCountries={this.allCountries}
                                                            allStates={allStates}
                                                            citizenship_country={citizenship_country}
                                                            citizenship_country_error={citizenship_country_error}
                                                            current_location_city={current_location_city}

                                                            isResumeTypeImage={isResumeTypeImage}
                                                            english_proficiency_error={english_proficiency_error}
                                                            languages={languages}
                                                            english_proficiency={english_proficiency}
                                                            current_location_city_error={current_location_city_error}
                                                            current_location_country={current_location_country}
                                                            current_location_country_error={current_location_country_error}
                                                            stateName={this.state.state}
                                                            selectCurrentCity={this.selectCurrentCity}
                                                            selectCurrentCountry={this.selectCurrentCountry}
                                                            selectCurrentState={this.selectCurrentState}
                                                            handleResumeDrop={this.handleResumeDrop}
                                                            handleProfilePicDrop={this.handleProfilePicDrop}
                                                            jobAttachment={jobAttachment}
                                                            selectCitizenship={this.selectCitizenship}
                                                            removeAttachment={this.removeAttachment}
                                                        />
                                                        {!showStep2 && !showSubmitButton && (
                                                            <div className="tf_continue">
                                                                <Link onClick={(e) => {
                                                                    e.preventDefault();
                                                                    this.handleContinue("step1", "step2")
                                                                }}>
                                                                    CONTINUE{" "}
                                                                    <span>
                                                                        <i
                                                                            className="fa fa-angle-right"
                                                                            aria-hidden="true"
                                                                        ></i>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                        )}
                                                    </div>
                                                    {/* step 2 End */}

                                                    {/* step 2 form start */}
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" ref={activeStep === "step2" && this.ScrollRef}>
                                                        {showStep2 && (
                                                            <div >
                                                                <CreateProfileFormSection2
                                                                    displayStep3={this.displayStep3}
                                                                    showStep2={showStep2}
                                                                    showStep3={showStep3}
                                                                    scrollToMyRef={this.scrollToMyRef}
                                                                    otherUsers={this.state.otherUsers}
                                                                    userDetails={this.state.userDetails}
                                                                    setJobCategory={this.setJobCategory}
                                                                    setSkill={this.setSkill}
                                                                    setData={this.setData}
                                                                    handleContinue={this.handleContinue}
                                                                    history={this.props.history}
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                    {/* step 2 form end */}


                                                    {/* step 3 form start */}
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" ref={activeStep === "step3" && this.ScrollRef}>
                                                        {showStep3 && (
                                                            <div >
                                                                <CreateProfileFormSection3
                                                                    otherUsers={this.state.otherUsers}
                                                                    userDetails={this.state.userDetails}
                                                                    handleContinue={this.handleContinue}
                                                                    setData={this.setData}
                                                                    showStep4={showStep4}
                                                                    history={this.props.history}
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                    {/* step 3 form end */}


                                                    {/* step 4 form start */}
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" ref={activeStep === "step4" && this.ScrollRef}>
                                                        {showStep4 && (
                                                            <div>
                                                                <CreateProfileFormSection4
                                                                    handleContinue={this.handleContinue}
                                                                    setData={this.setData}
                                                                    showStep5={showStep5}
                                                                    setStartDate={this.setStartDate}
                                                                    history={this.props.history}
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                    {/* step 4 form end */}


                                                    {/* step 5 form start */}
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" ref={activeStep === "step5" && this.ScrollRef}>
                                                        {showStep5 && (
                                                            <div>
                                                                <CreateProfileFormSection5
                                                                    handleContinue={this.handleContinue}
                                                                    setData={this.setData}
                                                                    showStep6={showStep6}
                                                                    showSubmitButton={showSubmitButton}
                                                                    handleSubmit={this.handleSubmit}
                                                                    history={this.props.history}
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                    {/* step 5 form end */}


                                                    {/* step 6 form start */}
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" ref={activeStep === "step6" && this.ScrollRef}>
                                                        {showStep6 && (
                                                            <div>
                                                                <CreateProfileFormSection6
                                                                    handleContinue={this.handleContinue}
                                                                    setData={this.setData}
                                                                    showSubmitButton={showSubmitButton}
                                                                    handleSubmit={this.handleSubmit}
                                                                    history={this.props.history}
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                    {/* step 6 form end */}

                                                    {showSubmitButton && (
                                                        <div className="tf_continue">
                                                            <Link
                                                                className="submit_btn_profile text-center"
                                                                onClick={() => this.handleSubmit()}
                                                            >
                                                                SUBMIT
                                                            </Link>
                                                        </div>
                                                    )}

                                                    {(!showStep2 || !showStep3 || !showStep4 || !showStep5 || !showStep6) &&
                                                        <div className="col-md-12 hidden-step-section"></div>
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    </div>



                                    {/* form End */}
                                    {/* left side start */}
                                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 p-0">
                                        <div className="custom_sticky_container">
                                            <div className="position-sticky">
                                                <div className="fixed-post-a-job-steps app-process-stepper">
                                                    <SelectionProgessBar
                                                        showStep2={showStep2}
                                                        showStep3={showStep3}
                                                        showStep4={showStep4}
                                                        showStep5={showStep5}
                                                        showStep6={showStep6}
                                                        visitedSteps={visitedSteps}
                                                        completedSteps={completedSteps}
                                                        scrollToMyRef={this.scrollToMyRef}
                                                        handleSideBarClick={this.handleSideBarClick}
                                                        steps = {Steps}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* left side end */}

                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    ...state,
});

const mapDispatchToProps = (dispatch) => {
    return {
        logOut: () => dispatch(logOutAction()),
        addAppProcessStep1: (data) => dispatch(addAppProcessStep1(data)),
        getCurrentUserDetails: () => dispatch(getCurrentUserDetails()),
        // getOtherFreelancers: () => dispatch(getOtherFreelancers()),
        addAppProcessStep2: (data) => dispatch(addAppProcessStep2(data)),
        createProfileApi: (data) => dispatch(submitAppForCall(data)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateProfileCloudExpert);