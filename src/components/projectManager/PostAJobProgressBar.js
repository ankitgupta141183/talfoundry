import React, { Component } from "react";
import { connect } from "react-redux";
import { logOutAction } from "../../Actions/logOutAction";
// import TagsInput from "react-tagsinput";
import Dropzone from "react-dropzone";
import "react-tagsinput/react-tagsinput.css";
import _ from "lodash";
import ProjectManagerHeader from "../miscellaneous/ProjectManagerHeader";
import {
  createJobAction,
  updateJobAction,
} from "../../Actions/jobCreateAndUpdateActions";
import {
  fetchJob,
  deleteScreening,
  getTemplatesDetails,
} from "../../Actions/programManagerJobsActions";
// import Autosuggest from "react-autosuggest";
import Loader from "react-loader-spinner";
import TECHNOLOGIES from "../../constants/techs";
import { getCurrentUserDetails } from "../../Actions/applicationActions";
import inviteIcon from "../../static/images/invite.png";
import JobCategoryCheckboxes from "../../utills/JobCategoryCheckboxes";
import LANGUAGES from "../../constants/languages";
import skillCategoryCheckboxes from "../../utills/skillCategoryCheckboxes";
import Checkbox from "../../utills/Checkbox";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import CITIES from "../../constants/cities";
import { REACT_APP_GOOGLE_API_KEY } from "../../constants/common";
import { isEmpty } from "lodash";
import $ from "jquery";
import csc from "country-state-city";
import PMDashboardSideBar from "./PMDashboardSideBar";
// import ErrorImg from "../../static/images/oops.png";
import "react-datepicker/dist/react-datepicker.css";
import BreadCrumb from "../miscellaneous/BreadCrumb";
import JobTitlesField from "../CommonComponets/JobTitleField";
import TechnologiesAutoSuggestField from "../CommonComponets/TechnoloiesAutoSuggestField";
import ErrorSweetAlert from "../CommonComponets/SweetAlert/ErrorSweetAlert";
import SuccessSweetAlert from "../CommonComponets/SweetAlert/SuccessSweetAlert";

var todaysdate = new Date();

const allLanguages = LANGUAGES;
const cities = CITIES;

const getSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : cities.filter(
      (lang) => lang.toLowerCase().slice(0, inputLength) === inputValue
    );
}

function states() {
  let data = [];
  TECHNOLOGIES.map((a, index) => data.push({ abbr: index, name: a }));
  return data;
}

class PostAJobProgressBar extends Component {
  constructor(props, context) {
    super(props, context);
    let techs = [];
    todaysdate = new Date();

    TECHNOLOGIES.map((a, index) => techs.push({ id: index, name: a }));
    this.state = {
      job_expiration_date: todaysdate.setDate(todaysdate.getDate() + 30),
      isAddQualification: false,
      skillCategory: [],
      jobCategory: [],
      projectFile: "",
      skillRequired: [],
      additionalSkillsRequired: [],
      technologies: techs,
      numberOfAddQuestions: 0,
      allQuestions: [],
      allQuestionValues: [],
      isJobCreated: false,
      titleError: false,
      ExpirationDateError: false,
      jobCategoryError: false,
      fixedBugdetError: false,
      expertiseError: false,
      skillCategoryError: false,
      jobDescription: "",
      descriptionError: false,
      certificateError: false,
      skillError: false,
      isEdit: false,
      speciality: [],
      selectedCertificateCategory: [],
      addEnglishLevel: "English",
      addCertificateRequired: "No",
      addLocation: "Anywhere",
      jobVisiblity: "Public",
      needOfFreelan: "One Cloud Expert",
      payType: "Pay by hour",
      projectDuration: "Less than 1 month",
      experienceLevel: "Fresher",
      integrationWithAPIs: "Payment Processor",
      timeRequiredPerWeek: "Less than 40 hours",
      typeOfProject: "One-time-Project",
      jobToBeEdited: {},
      jobUUID: "",
      fixedBugdet: "",
      projectFileArray: [],
      showSweetAlert: false,
      value: "",
      suggestions: [],
      titleOfJob: "",
      cityValue: "",
      projectName: "",
      projectNameError: false,
      completedSteps: [0],
      step2: false,
      step3: false,
      updateAlert: null,
      step4: false,
      step5: false,
      step6: false,
      step7: false,
      errorinSubmit: false,
      lastOffset: 0,
      activeStep: "step1",
      visitedSteps: ["step1"],
      sidePosition: 220,
      postAJobLoading: false,
      checkForm: false,
      checkBoxError: false,
      checkedError: false,
      latitude: '',
      longitude: '',
    }
    this.handleDrop = this.handleDrop.bind(this);
    this.handleQuestionType = this.handleQuestionType.bind(this);
    this.deleteScrenningQue = this.deleteScrenningQue.bind(this);
    this.handleQuestionValues = this.handleQuestionValues.bind(this);

    this.getMyLocation = this.getMyLocation.bind(this)
    this.allCountries = csc.getAllCountries();
    this.ScrollRef = React.createRef()

  }

  setDataToEdit = (job) => {
    if (this.state.isEdit) {
      var allQuestionsRecreated = job.job_screening_questions.map((el, idx) => {
        var question = {}
        question["queNo" + idx] = {
          type: "text",
          queNo: idx,
          uuid: el.uuid,
          questionId: el.id,
        }
        return question;
      });
      this.setState({
        isAddQualification: !_.isEmpty(job.job_qualification) ? true : false,
        jobCategory: job.job_category,
        projectFile: this.state.projectFileArray || [],
        skillCategory: job.job_expertise_required || [],
        additionalSkillsRequired: job.job_additional_expertise_required,
        allQuestionValues: job.job_screening_questions.map(
          (el) => el.job_question
        ),
        numberOfAddQuestions: job.job_screening_questions.length,
        allQuestions: allQuestionsRecreated,
        jobDescription: job.job_description,
        selectedCertificateCategory: job.certificate_category,
        addEnglishLevel:
          job.job_qualification && job.job_qualification.english_level,
        addFreelancerType:
          job.job_qualification && job.job_qualification.freelancer_type,
        addHoursTalfoundry:
          job.job_qualification && job.job_qualification.billed_on_talfoundry,
        addJobSuccessScore:
          job.job_qualification && job.job_qualification.job_success_score,
        addQualifiGroup:
          job.job_qualification && job.job_qualification.qualification_group,
        addCertificateRequired:
          (job.job_qualification &&
            job.job_qualification.qualification_group) ||
          "No",
        addRisingTalent:
          job.job_qualification && job.job_qualification.rising_talent,
        addLocation: job.job_qualification && job.job_qualification.location,
        jobVisiblity: job.job_visibility,
        needOfFreelan: job.number_of_freelancer_required,
        payType: job.job_pay_type,
        projectDuration: job.job_duration,
        experienceLevel: job.job_experience_level,
        integrationWithAPIs: job.job_api_integration,
        timeRequiredPerWeek: job.job_time_requirement,
        typeOfProject: job.job_type,
        titleOfJob: job.job_title,
        jobUUID: job.uuid,
        isDocTypeImage: true,
        docName: "",
      });
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.getMyLocation()
  }

  getMyLocation() {
    const location = window.navigator && window.navigator.geolocation

    csc.getAllCountries().map((countryArg) => {
      // console.log(countryArg)
      if (countryArg.sortname === "US") {
        this.setState({
          current_location_country: countryArg.name,
          countryId: countryArg.id
        })

        csc.getStatesOfCountry(countryArg.id).map((stateArg, i) => {
          if (i === 0) {
            this.setState({
              state: stateArg.name,
              stateId: stateArg.id
            })

            csc.getCitiesOfState(stateArg.id).map((cityArg, j) => {
              if (j === 0) {
                this.setState({
                  current_location_city: cityArg.name
                })
              }
              return cityArg
            })
          }
          return stateArg
        })
      }
      return countryArg
    })
    if (location) {
      location.getCurrentPosition((position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
        let that = this
        // var GEOCODING = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=27.023803599999997%2C74.21793260000001&language=en&key=' + REACT_APP_GOOGLE_API_KEY;
        var GEOCODING = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + '%2C' + position.coords.longitude + '&language=en&key=' + REACT_APP_GOOGLE_API_KEY;

        $.getJSON(GEOCODING, function (json) {
          if (json.status === "OK") {
            //Check result 0
            var result = json.results[0];
            //look for locality tag and administrative_area_level_1
            var city = "";
            var state = "";
            var country = "";
            var country_short = "";

            // console.log(result)
            for (var i = 0, len = result.address_components.length; i < len; i++) {
              var ac = result.address_components[i];
              if (ac.types.indexOf("locality") >= 0 || ac.types.indexOf("administrative_area_level_2") >= 0) city = ac.long_name;
              if (ac.types.indexOf("administrative_area_level_1") >= 0) state = ac.long_name;
              if (ac.types.indexOf("country") >= 0) country = ac.long_name;
              if (ac.types.indexOf("country") >= 0) country_short = ac.short_name;
            }


            if (country !== "") {
              csc.getAllCountries().map((countryArg) => {
                if (countryArg.sortname === country_short) {
                  that.setState({
                    current_location_country: countryArg.name,
                    countryId: countryArg.id
                  })

                  csc.getStatesOfCountry(countryArg.id).map((stateArg) => {
                    if (stateArg.name === state) {
                      that.setState({
                        state: stateArg.name,
                        stateId: stateArg.id
                      })

                      csc.getCitiesOfState(stateArg.id).map((cityArg) => {
                        if (cityArg.name === city) {
                          that.setState({
                            current_location_city: cityArg.name
                          })
                        }
                        return cityArg
                      })
                    }
                    return stateArg
                  })
                }
                return countryArg
              })
            }
          }

        });

      }, (error) => {
        this.setState({ latitude: 'err-latitude', longitude: 'err-longitude' })
      })
    }

  }

  handleScroll = (event) => {
    // // console.log('documentElement.scrollTop', document.documentElement.scrollTop)
    if (document.documentElement.scrollTop < 0) {
      this.setState({ sidePosition: 200 })
    }
    if (document.documentElement.scrollTop > 200) {
      this.setState({ sidePosition: 100 })
    }
    else {
      this.setState({ sidePosition: 220 })
    }
  }

  addScreeningQues = (e) => {
    e.preventDefault()
    var currentNoOfQues = this.state.numberOfAddQuestions;
    var question = {}
    question["queNo" + currentNoOfQues] = {
      type: "text",
      queNo: currentNoOfQues,
    }
    this.setState((prevState) => ({
      numberOfAddQuestions: currentNoOfQues + 1,
      allQuestions: [...prevState.allQuestions, question],
    }));
  }
  handleQuestionValues(e) {
    var allQuestionValues = this.state.allQuestionValues;
    allQuestionValues[e.target.id] = e.target.value;
    this.setState({ allQuestionValues: allQuestionValues });
  }
  deleteScrenningQue(record, e) {
    var recordId = record[e.target.id].questionId || record[e.target.id].uuid;
    if (recordId) {
      this.props
        .deleteScreening(recordId)
        .then((res) => {
          if (res.data.success) {
            this.props.match.params.id &&
              this.props.fetchJob(this.props.match.params.id).then((res) => {
                res.job && this.setDataToEdit(res.job);
              });
            this.setState({ isEdit: this.props.match.params.id && true });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      var allQuestions = this.state.allQuestions;
      var currentNoOfQues = this.state.numberOfAddQuestions;
      var fieldToDelete = e.target.id;
      var filterdQuestions = allQuestions.filter((el) => {
        return Object.keys(el)[0] !== fieldToDelete;
      });
      var allQuestionValues = this.state.allQuestionValues;
      allQuestionValues.splice(e.target.dataset.id, 1);
      this.setState({
        allQuestions: filterdQuestions,
        allQuestionValues: allQuestionValues,
        numberOfAddQuestions: currentNoOfQues - 1,
      });
    }
  }

  onPreviewDrop = (files) => {
    this.setState({
      files: this.state.files.concat(files),
    });
  }

  handleDateChange = (date) => {
    this.setState({
      job_expiration_date: date,
      ExpirationDateError: false,
    });
  }

  handleQuestionType(e) {
    var queNumber = e.target.options[
      e.target.selectedIndex
    ].dataset.queno.slice(-1);
    var allQuestions = this.state.allQuestions;
    var currentQuestion = this.state.allQuestions[queNumber];
    currentQuestion[Object.keys(currentQuestion)[0]].type = e.target.value;
    allQuestions[queNumber] = currentQuestion;
    this.setState({ allQuestions: allQuestions });
  }

  openDropDown = () => {
    const dropElement = document.getElementById("user-drop-down");
    dropElement.classList.toggle("open");
  }
  logOut = () => {
    this.props.logOut();
    this.props.history.push("/");
  }


  scrollToMyRef = (refe) => {
    let { allQuestions, projectFileArray, additionalSkillsRequired } = this.state
    let quesHeight, fileHeight, additionalSkills = 0
    fileHeight = projectFileArray ? (projectFileArray.length * 30) : 0
    quesHeight = allQuestions ? (allQuestions.length * 60) : 0
    additionalSkills = (additionalSkillsRequired.length > 0) ? 20 : 0

    this.setState({
      activeStep: refe,
    }, () => {
      // window.scroll({
      //   top: this.ScrollRef.current.offsetTop + 60,
      //   left: 0,
      //   behavior: 'smooth'
      // });

      let offsetToScroll;
      if (refe === "step1") {
        offsetToScroll = 0;
      } else if (refe === "step2") {
        offsetToScroll = this.ScrollRef.current.offsetTop + 60;
      } else if (refe === "step3") {
        offsetToScroll = this.ScrollRef.current.offsetTop + 60;
      } else if (refe === "step4") {
        offsetToScroll = this.ScrollRef.current.offsetTop + 60;
      } else if (refe === "step5") {
        offsetToScroll = this.ScrollRef.current.offsetTop + 60;
      } else if (refe === "step6") {
        console.log(this.ScrollRef.current, "----this.ScrollRef.currentthis.ScrollRef.current------", this.state.step7, "step7");
        offsetToScroll = this.ScrollRef.current.offsetTop + 60;
        // offsetToScroll = 3050
      }
      // console.log(refe ,"rafe" , this.ScrollRef.current.offsetTop + 60 );
      // console.log(currentScrollPos , "---currentScrollPos---" , offsetToScroll , "---offsetToScroll----");
      window.scrollTo(0, offsetToScroll);
    });
  }

  handleNext = () => {
    let titleWords = this.state.titleOfJob.length;

    let {
      completedSteps,
      jobDescription,
      titleOfJob,
      jobCategory,
      speciality,
      step2,
      step3,
      step4,
      step5,
      step6,
      visitedSteps,

    } = this.state;

    function pushValue(value) {
      if (!visitedSteps.includes(value)) {
        visitedSteps.push(value);
      }
    }


    if (completedSteps.length > 0 && completedSteps.length < 2 && !step2) {
      if (titleOfJob.length === 0) {
        this.setState({ titleError: true });
      } else if (titleWords < 15) {
        this.setState({ titleError: true, step2: false });
      } else {
        this.scrollToMyRef("step2");
        pushValue("step2");
        this.setState({
          completedSteps: completedSteps,
          step2: true,

          visitedSteps: visitedSteps,
          activeStep: "step2",
        });
      }
    }

    if (step2) {

      let words = (jobDescription.match(/\S+/g) || []).length;
      if (words >= 50 && words < 500) {
        pushValue("step3");
        completedSteps.push(completedSteps.length);
        if (step2 && !step3) {
          this.scrollToMyRef("step3");
        }
        this.setState({
          completedSteps: completedSteps,
          descriptionError: false,
          step3: true,
          visitedSteps: visitedSteps,
          activeStep: "step3",
        });
      } else {
        this.setState({
          descriptionError: true,
        });
      }
    }

    if (step3) {
      if (step3 && !step4) {
        this.scrollToMyRef("step4");
      }
      pushValue("step4");
      this.setState({
        step4: true,
        visitedSteps: visitedSteps,
        activeStep: "step4",
      });
    }

    if (step4) {
      if ((speciality.length > 0) && jobCategory.length > 0) {
        if (step4 && !step5) {
          this.scrollToMyRef("step5");
        }
        pushValue("step5");
        this.setState({
          expertiseError: false,
          step5: true,
          visitedSteps: visitedSteps,
          activeStep: "step5",
        });
      } else {
        this.setState({ expertiseError: speciality.length < 1, jobCategoryError: jobCategory.length < 1 });
      }
    }

    if (step5) {
      if (step5 && !step6) {
        this.scrollToMyRef("step6");
      }
      pushValue("step6");
      this.setState({
        step6: true,
        visitedSteps: visitedSteps,
        activeStep: "step6",
      });
    }

    if (step6) {
      this.setState({ step7: true, activeStep: "step6" });
    }
  }

  handleBack = () => { }

  handleSpecialityAddition = (tag) => {
    tag = Array.from(new Set(tag));

    this.setState({ speciality: tag, expertiseError: false });
  }

  handleJobCategoryDelete = (i) => {
    const tags = this.state.jobCategory.slice(0);
    tags.splice(i, 1);
    this.setState({ jobCategory: tags });
  }

  handleSkilllRequiredChange = (tags) => {
    this.setState({ skillRequired: tags, skillError: false });
  }
  handleAdditionalSkillChange = (tags) => {
    tags = Array.from(new Set(tags));
    this.setState({ additionalSkillsRequired: tags });
  }
  handleCertificateTagAdd = (tags) => {
    this.setState({ addCertificateRequired: tags, certificateError: false });
  }

  handleFileDrop = (files) => {
    let projectFileArrayVar = this.state.projectFileArray;
    let file = files[0];
    let isPresent = false;

    if (projectFileArrayVar.length > 0) {
      isPresent = projectFileArrayVar.find(a => a.path === file.path)
    }

    if (!isPresent) {
      projectFileArrayVar.push(file)
      this.setState({
        projectFileArray: projectFileArrayVar
      })
    }
  }

  handleDrop = (files, event) => {
    let reader = new FileReader();
    let file = files[0] ? files[0] : files.target.files[0];
    let fileName = files[0].name;
    let isDocTypeImage = file.type.includes("image");
    const target = event ? event.target.id : files.target.id;
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      this.setState({
        [target]: event.target.result,
        [target + "_error"]: false,
        isDocTypeImage: isDocTypeImage,
        docName: fileName,
      });
    }
  }

  isCerficateChange = (e) => {
    this.setState({ addCertificateRequired: e.target.value });
  }

  handleTitleChange = (label) => {
    console.log(label, "label");
    let categories = [];
    const hasVal = (val) => {
      val = val.split(' ')
      let hasVal = false;
      val.map((a) => {
        hasVal = hasVal ? hasVal : label.includes(a)
        return a
      })
      return hasVal
    }

    JobCategoryCheckboxes.map((record) => {
      // console.log('title===>>', categories)
      let others = ["Microsoft Azure", "Google Cloud", "IBM", "Salesforce", "Oracle"];
      if (hasVal(record.name)) {
        categories.push(record.name);
      } else {
        for (let i = 0; i < others.length - 1; i++) {
          if (label.includes(others[i])) {
            categories.push(record.name);
          }
        }
      }
      return record
    });
    this.setState({
      titleOfJob: label,
      titleError: false,
      jobCategory: categories,
    });
  }

  handleCityChange = (label) => {
    this.setState({ addLocation: label });
  }

  handleChange = (e) => {
    if (e.target.name === "jobDescription") {
      let words = (e.target.value.match(/\S+/g) || []).length;
      if (words < 50 || words > 500) {
        this.setState({ descriptionError: true });
      } else if (e.target.value.length < 50) {
        this.setState({ descriptionError: true });
      } else {
        this.setState({ descriptionError: false });
      }
    } else {
      console.log("result");
    }
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleRadioChange = (e) => {
    if (e.target.name === "typeOfProject") {
      this.setState({
        typeOfProject: e.target.value
      })
    }
    else if (e.target.name === "integrationWithAPIs") {
      this.setState({ integrationWithAPIs: e.target.value })
    }
  }

  handleChangeBugdet = (e) => {
    if (e.target.value >= 0) {
      this.setState({
        [e.target.name]: e.target.value,
        fixedBugdetError: false,
      });
    }
  }

  addAdditionalQualifications = () => {
    this.setState({ isAddQualification: !this.state.isAddQualification });
  }

  validateJob = () => {
    let newState = Object.assign({}, this.state);
    let hasError = false;
    let titleWords = newState.titleOfJob.length;
    if (newState.titleOfJob.length === 0) {
      newState.titleError = true
      hasError = true
    } else if (titleWords < 15) {
      newState.titleError = true
      hasError = true
    }

    let words = (newState.jobDescription.match(/\S+/g) || []).length;
    if (!(words >= 50 && words < 500)) {
      newState.descriptionError = true
      hasError = true
    }

    if (newState.speciality.length < 0) {
      newState.expertiseError = true
      hasError = true
    }

    if (newState.jobCategory < 1) {
      newState.jobCategoryError = false
      hasError = true
    }

    // if(!newState.checkForm) {
    //   newState.checkBoxError = true
    //   hasError = true
    // }

    return {
      hasError,
      newState
    }
  }

  handleSubmitAJob = (e) => {
    e.preventDefault()
    const { hasError, newState } = this.validateJob();
    if (!hasError) {
      const {
        titleOfJob,
        jobCategory,
        addCertificateRequired,
        skillCategory,
        jobDescription,
        additionalSkillsRequired,
        typeOfProject,
        integrationWithAPIs,
        jobVisiblity,
        needOfFreelan,
        payType,
        timeRequiredPerWeek,
        experienceLevel,
        projectDuration,
        addEnglishLevel,
        // addLocation,
        allQuestionValues,
        isEdit,
        jobUUID,
        speciality,
        fixedBugdet,
        selectedCertificateCategory,
        job_expiration_date,
        descriptionError,

        // checkBoxError
      } = this.state;

      let words = (jobDescription.match(/\S+/g) || []).length;

      if (
        titleOfJob.length > 1 &&
        words >= 50 &&
        words < 500 &&
        speciality.length > 0
      ) {
        if (!this.state.checkForm) {
          this.setState({ checkedError: true })

        } else {
          let data = {
            job: {
              job_title: titleOfJob,
              job_category: (jobCategory || []).join(","),
              job_description: jobDescription,
              job_type: typeOfProject,
              job_speciality: (speciality || []).join(","),
              job_pay_value: payType !== "Pay by hour" ? fixedBugdet : '',
              job_api_integration: integrationWithAPIs,
              job_expertise_required: (skillCategory || []).join(","),
              job_additional_expertise_required: (
                additionalSkillsRequired || []
              ).join(","),
              job_visibility: jobVisiblity,
              number_of_freelancer_required: needOfFreelan,
              job_experience_level: experienceLevel,
              job_duration: projectDuration,
              job_time_requirement: timeRequiredPerWeek,
              job_pay_type: payType,
              job_expiration_date: new Date(job_expiration_date),

            },
          }
          var form_data = new FormData();
          for (var key in data.job) {
            form_data.append(`job[${key}]`, data.job[key])
          }

          if (isEdit) {
            this.props.updateJob(jobUUID, form_data).then((res) => {
              if ((res.status === 200) && !isEmpty(res.data)) {
                const getAlert = () => (
                  // <div className="app-pro2-swal">
                  //   <SweetAlert 
                  //   title="" 
                  //   onConfirm={this.hideJobAlert.bind(this, res.data)} 
                  //   showConfirm={true}>
                  //     <img src={inviteIcon} alt="" />
                  //     <h4>
                  //       <strong>
                  //         Your posting has been created successfully. <br />
                  //       </strong>
                  //     </h4>
                  //   </SweetAlert>
                  // </div>
                  <SuccessSweetAlert
                    handleConfirm={this.hideJobAlert.bind(this, res.data)}
                    show={true}
                    message={"Your posting has been created successfully."}
                  />
                );
                this.setState({ updateAlert: getAlert() })
              } else if (res.status === 500) {
                alert("internal server error");
              } else {
                alert("server error please try again later.");
              }
            });
          } else {
            this.state.projectFileArray.map((p, index) => {
              form_data.append(`job[job_documents[${index}]]`, p)
              return p
            })

            form_data.append("job[job_qualification_attributes[english_level]]", addEnglishLevel)
            form_data.append("job[job_qualification_attributes[qualification_group]]", _.isArray(addCertificateRequired)
              ? (addCertificateRequired || []).join(",")
              : addCertificateRequired
            )

            form_data.append("job[job_qualification_attributes[city]]", this.state.current_location_city)
            form_data.append("job[job_qualification_attributes[state]]", this.state.state)
            form_data.append("job[job_qualification_attributes[country]]", this.state.current_location_country)
            form_data.append("job[job_qualification_attributes[certificate_category]]", addCertificateRequired !== "No"
              ? selectedCertificateCategory.join(",")
              : null)

            allQuestionValues.map((a, index) => {
              form_data.append(`job[job_screening_questions_attributes[][job_question]]`, a)
              return a
            })

            if (!descriptionError) {
              this.setState({ postAJobLoading: true })
              this.props.createJob(form_data).then((res) => {
                if (res.status === 200) {
                  let successMessage = <p>Thank you for submitting your posting !<br /> We'll post it to our marketplace shortly. After that, you'll begin receiving quotes from world-class Cloud Experts !<br /></p>

                  const getAlert = () => (
                    // <div className="app-pro2-swal" id="EditJobSuccessMessagePopup">
                    //   <SweetAlert title="" onConfirm={this.hideJobAlert.bind(this, res.data)} showConfirm={true}>
                    //     <div id="EditJobSuccessMessagePopupInnerContent">
                    //       <img src={inviteIcon} alt="" />
                    //       <h4 id="popup-description-submitting-posting">
                    //         <strong>
                    //           Thank you for submitting your posting !<br /> We'll post it to our marketplace shortly. After that, you'll begin receiving quotes from world-class Cloud Experts !<br />
                    //         </strong>
                    //       </h4>
                    //     </div>

                    //   </SweetAlert>
                    // </div>

                    <SuccessSweetAlert
                      handleConfirm={this.hideJobAlert.bind(this, res.data)}
                      show={true}
                      message={successMessage}
                    />
                  );
                  this.setState({ isJobCreated: true, postAJobLoading: false, updateAlert: getAlert() })
                } else if (res.status === 500) {
                  alert("internal server error");
                } else {
                  alert("server error please try again later.")
                }
              })
            }
          }
        }
      } else {
        if (titleOfJob.length === 0) {
          this.setState({ titleError: true });
        }

        if (words < 50 || words > 500) {
          this.setState({
            descriptionError: true,
          });
        }

        if (skillCategory.length === 0) {
          this.setState({ skillCategoryError: true });
        }

        if (speciality.length === 0) {
          this.setState({ expertiseError: true });
        }

        if (jobCategory.length === 0) {
          this.setState({ jobCategoryError: true });
        }

        this.setState({ errorinSubmit: true });

      }
    } else {
      newState.errorinSubmit = true
      this.setState(newState)
      this.setState({ errorinSubmit: true })

    }
  }

  hideJobAlert = (data) => {
    this.setState({ updateAlert: null })
    this.props.history.push(`/job/${data.uuid || data.id}/1`)
  }

  fieldError(message) {
    return (
      <p id="firstName" className="error-field">
        {message ? message : "This field can't be blank."}
      </p>
    );
  }

  handleAttachment = () => {
    const url = `${this.state.projectFile}`;
    window.open(url, "_blank");
  }

  handleJobCategoryChange = (e) => {
    const jobCategory = this.state.jobCategory;
    let index;
    if (e.target.checked) {
      jobCategory.push(e.target.name);
    } else {
      index = jobCategory.indexOf(e.target.name);
      jobCategory.splice(index, 1);
    }
    this.setState({ jobCategory: jobCategory, jobCategoryError: jobCategory.length < 1 });
  }

  handleCertificateChange = (e) => {
    const certificateCat = this.state.selectedCertificateCategory || [];
    let index;
    if (e.target.checked) {
      certificateCat.push(e.target.name);
    } else {
      index = certificateCat.indexOf(e.target.name);
      certificateCat.splice(index, 1);
    }
    this.setState({
      selectedCertificateCategory: certificateCat,
      certificateError: false,
    });
  }

  handleSkillCategoryChange = (e) => {
    const skillCategory = this.state.skillCategory;
    let index;
    if (e.target.checked) {
      skillCategory.push(e.target.name);
    } else {
      index = skillCategory.indexOf(e.target.name);
      skillCategory.splice(index, 1);
    }
    this.setState({ skillCategory: skillCategory, skillCategoryError: false });
    if (e.target.checked) {
      let jobc = this.state.jobCategory;
      if (e.target.dataset.category.split(",").length > 1) {
        let allCat = e.target.dataset.category.split(",");
        for (let i = 0; i < allCat.length; i++) {
          jobc.push(allCat[i]);
        }
      } else {
        jobc.push(e.target.dataset.category);
      }
      this.setState({ jobCategory: jobc, jobCategoryError: false });
    } else {
      let jobc = this.state.jobCategory;

      if (e.target.dataset.category.split(",").length > 1) {
        let allCat = e.target.dataset.category.split(",");
        for (let i = 0; i < allCat.length; i++) {
          let index = jobc.indexOf(allCat[i]);
          if (index > -1) {
            jobc.splice(index, 1);
          }
        }
      } else {
        let index = jobc.indexOf(e.target.dataset.category);
        if (index > -1) {
          jobc.splice(index, 1);
        }
      }
      this.setState({ jobCategory: jobc, jobCategoryError: false });
    }
  }

  removeAttachment = () => {
    this.setState({ projectFile: "", docName: "" });
  }

  handleRateBlur = (e) => {
    this.setState({
      [e.target.name]: !isNaN(parseFloat(e.target.value).toFixed(2))
        ? parseFloat(e.target.value).toFixed(2)
        : "",
    })
  }

  returnPoperFormat(job_expiration_date) {
    let abc
    if (job_expiration_date) {
      let month = new Date(job_expiration_date).getMonth() + 1
      let year = new Date(job_expiration_date).getFullYear()
      let day = new Date(job_expiration_date).getDate()

      abc = `${month < 10 ? `0${month}` : month}/${day < 10 ? `0${day}` : day
        }/${year}`
    }
    return abc
  }

  handleFileRemove = (e) => {
    e.preventDefault()
    let allprojectFiles = []
    let currentProjectFiles = this.state.projectFileArray
    currentProjectFiles.map((proj) => {
      if (proj.path !== e.target.id) {
        allprojectFiles.push(proj)
      }
      return proj
    })
    this.setState({ projectFileArray: allprojectFiles })
  }

  handleFilesToShow = (projectFileArray) => {
    let fileToDisplay = []
    if (projectFileArray && projectFileArray.length > 0) {
      projectFileArray.map((proj, id) => {
        fileToDisplay.push(
          <div
            className="row multi-file-upload-files-list mt-10"
            id={proj.name}
            key={`file_${id}`}
          >
            <div className="col-md-8">
              <i className="fa fa-check" aria-hidden="true"></i> {proj.name}
            </div>
            <div className="col-md-4">
              <i
                className="fa fa-trash"
                id={proj.path}
                onClick={this.handleFileRemove}
                aria-hidden="true"
              ></i>
            </div>
          </div>
        )
        return proj
      })
    }
    return fileToDisplay
  }

  showSweetAlert = () => {
    this.setState({ showSweetAlert: false })
  }

  onChange = (event, { newValue }) => {
    let newState = Object.assign(this.state, {})
    JobCategoryCheckboxes.map((record) => {
      if (
        newValue.includes(record.name) &&
        !newState.jobCategory.includes(record.name)
      ) {
        newState.jobCategory.push(record.name)
      }
      return record
    })

    this.setState({
      titleOfJob: newValue,
      value: newValue,
      jobCategory: newState.jobCategory,
    })
  }

  OnEnterByJobTitle = (e) => {
    e.preventDefault()
    this.handleTitleChange(e.target.childNodes[0].childNodes[0].value)
    this.setState({ titleError: false })
  }

  OnEnterByCity = (e) => {
    e.preventDefault()
    this.handleCityChange(e.target.childNodes[0].childNodes[0].value)
  }

  cityOnChange = (event, { newValue }) => {
    this.setState({
      cityValue: newValue,
    })
  }

  onSuggestionsFetchRequested = ({ value }) => {
    let tempSuggestions = getSuggestions(value).filter(
      (a, b) => getSuggestions(value).indexOf(a) === b
    )
    this.setState({
      suggestions: tempSuggestions,
    })
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    })
  }

  handleEmptyField = (e) => {
    switch (e.target.name) {
      case "projectName":
        if (e.target.value.length > 0) {
          this.setState({
            projectName: e.target.value,
            projectNameError: false,
          })
        } else {
          this.setState({
            projectName: "",
            projectNameError: true,
          })
        }
    }
  }

  handleCheckField = (e) => {
    this.setState({
      checkForm: e.target.checked,
      checkBoxError: false,
      checkedError: false
    })
  }

  handleSideBarClick = (step) => {
    this.setState({
      activeStep: step,
    })
    this.scrollToMyRef(step)

  }

  selectCurrentCountry = (e) => {
    let countryId = e.target.options[e.target.selectedIndex].id;
    const state = csc.getStatesOfCountry(countryId)[0];
    const city = csc.getCitiesOfState(state.id)[0];

    this.setState({
      current_location_country: e.target.value,
      countryId: countryId,
      // current_location_country_error: false,
      // current_location_city_error: false,
      state: state.name,
      stateId: state.id,
      current_location_city: city ? city.name : state.name,
    });
  }

  selectCurrentState = (e) => {
    let stateId = e.target.options[e.target.selectedIndex].id;
    const city = csc.getCitiesOfState(stateId)[0];
    const cityName = city ? city.name : "";

    this.setState({
      state: e.target.value,
      stateId: stateId,
      // current_location_city_error: cityName ? false : true,
      current_location_city: cityName,
    });
  }

  selectCurrentCity = (e) => {
    this.setState({
      current_location_city: e.target.value,
      // current_location_city_error: false,
    });
  }

  render() {
    const {
      step2,
      step3,
      step4,
      step5,
      step6,
      step7,
      jobCategory,
      ExpirationDateError,
      skillCategory,
      jobDescription,
      additionalSkillsRequired,
      typeOfProject,
      integrationWithAPIs,
      jobVisiblity,
      needOfFreelan,
      payType,
      timeRequiredPerWeek,
      experienceLevel,
      projectDuration,
      addEnglishLevel,
      // addLocation,
      allQuestions,
      allQuestionValues,
      titleError,
      jobCategoryError,
      skillCategoryError,
      fixedBugdetError,
      descriptionError,
      fixedBugdet,
      isEdit,
      speciality,
      expertiseError,
      docName,
      addCertificateRequired,
      showSweetAlert,
      projectFileArray,
      value,
      suggestions,
      completedSteps,
      visitedSteps,
      errorinSubmit,
      checkedError,
      postAJobLoading,
      checkBoxError,

      current_location_country,
      current_location_city,
      current_location_country_error,
      current_location_city_error,
      state,
      activeStep
    } = this.state
    // console.log(activeStep , "-----acrive Step----");
    const allStates = csc.getStatesOfCountry(this.state.countryId);
    const allCities = csc.getCitiesOfState(this.state.stateId);

    let { isLoading } = this.props

    const languages = allLanguages.map((lang, i) => (
      <option key={i}>{lang}</option>
    ))

    const titleInputProps = {
      placeholder: "Looking for.....",
      value,
      onChange: this.onChange,
    }



    let addClass = ''
    if ($(window).scrollTop() > 0) {
      addClass = 'active'
    }

    return (
      <div>
        {isLoading || postAJobLoading && (
          <div className="grid-loader">
            <Loader type="Grid" color="#00BFFF" height={100} width={100} />
          </div>
        )}

        {/* {postAJobLoading && (
          <div className="grid-loader">
            <Loader type="Grid" color="#00BFFF" height={100} width={100} />
          </div>
        )} */}
        {this.state.updateAlert}
        {/* <div className="app-pro2-swal">
          <SweetAlert
            show={errorinSubmit}
            confirmBtnBsStyle="danger"
            onConfirm={() => this.setState({ errorinSubmit: false })}
          >
            <div id="EditJobSuccessMessagePopupInnerContent">
              <img src={ErrorImg} alt="" id="rightCheckIconImage" />
              <h4>
                <strong>
                  Please correct the errors then submit
                </strong>
              </h4>
            </div>
          </SweetAlert>
        </div> */}
        <ErrorSweetAlert
          show={errorinSubmit}
          handleConfirm={() => this.setState({ errorinSubmit: false })}
          message={"Please correct the errors then submit"}
        />


        <div className="app-pro2-swal">

        </div>
        {/* <div className="app-pro2-swal">
          <SweetAlert
            show={showSweetAlert}
            confirmBtnBsStyle="danger"
            imageUrl="ErrorImg"
            onConfirm={() => this.showSweetAlert()}
          >
            <div id="EditJobSuccessMessagePopupInnerContent">
              <img src={ErrorImg} alt="" id="rightCheckIconImage" />
              <h4>
                <strong>
                  Cannot Upload Same File Again
                </strong>
              </h4>
            </div>
          </SweetAlert>
        </div> */}
        <ErrorSweetAlert
          show={showSweetAlert}
          handleConfirm={() => this.showSweetAlert()}
          message={"Cannot Upload Same File Again"}
        />

        <div className="" id="tf-project-manager-dashboard-root">
          <ProjectManagerHeader history={this.props.history} />

          {
            !postAJobLoading && (
              <div className="wrapper">
                <div className="multi_select_dropdown_for_job_posting post-a-job-sidebar wizard_page_post_job new-post-a-job-wizard-vertical-page">
                  <div>
                    <BreadCrumb step1 link="Post a Job" />
                  </div>
                  <div className={!this.props.loginSteps.showHideSideBar ? "mains" : "main-add"}>

                    <div className="row custom_row">

                      <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 p-0 bg-white">
                        <div className="custom_sticky_container">
                          <div className="position-sticky">
                            <PMDashboardSideBar history={this.props.history} />
                          </div>
                        </div>
                      </div>
                      {/* <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">

                        <div className="row"> */}
                      <div className="col-md-8 col-sm-8 col-xs-8">
                        <div className={"pro-right-content-area postAJobStepsSection " + addClass}>
                          <div className="both-column-container pd_left_job_sec">
                            <div className="dark_blue_sec_job pd_left_none pd_right_none stepper_inner_sec">
                              <div className="tf_posting">
                                <div className="wizard-container">
                                  <div className="card wizard-card col-md-12 col-sm-12 col-xs-12" data-color="red" id="wizard">
                                    <div className="">
                                      <form action="" method="">
                                        <section className="PagePostProject">
                                          {/* form container start */}
                                          <div className="row">
                                            <div className="">
                                              <div className="post-job-inner_sec">
                                                <div className="PagePostProject-content PagePostProject-container new-with-progress-bar col-md-12 col-lg-12">
                                                  <div className="fl-form PagePostProject-form">
                                                    <div className="tab-content">
                                                      {/* Stepbar start */}
                                                      <div>
                                                        {completedSteps &&
                                                          completedSteps.length > 0 &&
                                                          completedSteps.includes(0) && (
                                                            <div

                                                            >
                                                              <div
                                                                className="tab-pane show"
                                                                id="Title"
                                                              >
                                                                <div
                                                                  className="mn_padding p-0"
                                                                  id="step1"

                                                                >
                                                                  <div
                                                                    ref={activeStep === "step1" && this.ScrollRef}
                                                                  >
                                                                    <div className="vertical-form-section-heading" >
                                                                      <h4 className="m-0">
                                                                        Lets Get Started
                                                                      </h4>
                                                                    </div>

                                                                    <div className="col-sm-12 every-section-light-blue-color">
                                                                      <div className="input-group">
                                                                        <div className="form-group label-floating">
                                                                          <label className="control-label">
                                                                            Tell us about what you are
                                                                            looking for*
                                                                          </label>

                                                                          <div className="clearfix"></div>
                                                                          <JobTitlesField
                                                                            OnEnterByJobTitle={this.OnEnterByJobTitle}
                                                                            titleInputProps={titleInputProps}
                                                                            titleError={titleError}
                                                                            handleTitleChange={this.handleTitleChange}
                                                                            fieldError={this.fieldError}
                                                                          />

                                                                        </div>
                                                                      </div>

                                                                      <div className="post-job-example mn_ex m-0">
                                                                        <h5>Examples:</h5>
                                                                        <ul className="m-0">
                                                                          <li >
                                                                            AWS Certified Solutions
                                                                            Architect
                                                                          </li>
                                                                          <li>
                                                                            Salesforce Senior
                                                                            Consultant
                                                                          </li>
                                                                          <li>
                                                                            Oracle EBS Functional
                                                                            Consultant
                                                                          </li>
                                                                          <li>
                                                                            Google Cloud Network Architect
                                                                          </li>
                                                                        </ul>
                                                                      </div>
                                                                    </div>

                                                                    <div className="col-md-12 every-section-light-blue-color">
                                                                      <div className="input-group">
                                                                        <div className="form-group label-floating tf_step_3">
                                                                          <label className="control-label">
                                                                            What level of experience
                                                                            should your Cloud Expert
                                                                            have?*
                                                                          </label>
                                                                          <div className="clearfix"></div>
                                                                          <div
                                                                            className="btn-group btn-group-toggle custom-toggle-radio-button"
                                                                            onChange={
                                                                              this.handleChange
                                                                            }
                                                                          // data-toggle="buttons"
                                                                          >
                                                                            <div className="details-option">
                                                                              <input
                                                                                type="radio"
                                                                                name="experienceLevel"
                                                                                defaultValue="Fresher"
                                                                                checked={
                                                                                  experienceLevel ===
                                                                                  "Fresher"
                                                                                }
                                                                                id="option3"
                                                                                autoComplete="off"
                                                                              />
                                                                              <span>Fresher</span>
                                                                            </div>

                                                                            <div className="details-option">
                                                                              <input
                                                                                type="radio"
                                                                                value="Intermediate"
                                                                                checked={
                                                                                  experienceLevel ===
                                                                                  "Intermediate"
                                                                                }
                                                                                name="experienceLevel"
                                                                                id="option4"
                                                                                autoComplete="off"
                                                                              />
                                                                              <span>
                                                                                {" "}
                                                                                Intermediate
                                                                              </span>
                                                                            </div>

                                                                            <div className="details-option">
                                                                              <input
                                                                                type="radio"
                                                                                name="experienceLevel"
                                                                                defaultValue="Expert"
                                                                                checked={
                                                                                  experienceLevel ===
                                                                                  "Expert"
                                                                                }
                                                                                id="option5"
                                                                                autoComplete="off"
                                                                              />{" "}
                                                                              <span>Expert</span>
                                                                            </div>
                                                                          </div>
                                                                        </div>
                                                                      </div>
                                                                    </div>

                                                                    <div className="col-md-12 every-section-light-blue-color">
                                                                      <div className="input-group">
                                                                        <div className="form-group label-floating tf_step_3">
                                                                          <label className="control-label">
                                                                            Job Expiration Date*
                                                                          </label>
                                                                          <div className="clearfix"></div>
                                                                          <div className="input-group tf_loca tf-datepicker ">
                                                                            <DatePicker
                                                                              selected={
                                                                                this.state
                                                                                  .job_expiration_date
                                                                              }
                                                                              onChange={
                                                                                this.handleDateChange
                                                                              }
                                                                              className="form-control mn_input post-job-boxes m-0"
                                                                              minDate={new Date()}
                                                                            />
                                                                            {ExpirationDateError &&
                                                                              this.fieldError(
                                                                                "Date can't be blank"
                                                                              )}
                                                                            <span className="input-group-addon2 add-on">
                                                                              <img
                                                                                src="images/Icon_calender.svg"
                                                                                alt=""
                                                                              />
                                                                            </span>
                                                                          </div>
                                                                        </div>
                                                                      </div>
                                                                    </div>

                                                                  </div>
                                                                </div>
                                                              </div>
                                                            </div>
                                                          )}

                                                        {step2 && (
                                                          <div
                                                            className="tab-pane show"
                                                            id="Description"
                                                          >
                                                            <div
                                                              className="mn_padding vertical-form-section-divider"
                                                              id="step2"
                                                            >
                                                              <div
                                                                ref={activeStep === "step2" && this.ScrollRef}
                                                              >
                                                                <div className="vertical-form-section-heading">
                                                                  <Link href="#section2"><h4 className="">
                                                                    Job Description
                                                                  </h4></Link>
                                                                </div>

                                                                <div className="col-sm-12 every-section-light-blue-color">
                                                                  <div className="mn_ex">
                                                                    <h5>
                                                                      A few details about your
                                                                      project or product.
                                                                    </h5>
                                                                    <ul>
                                                                      <li>
                                                                        Include expected
                                                                        deliverables
                                                                      </li>
                                                                      <li>
                                                                        Type of Cloud Expert you are
                                                                        looking for
                                                                      </li>
                                                                      <li>
                                                                        Requirements and time frame
                                                                        for delivery
                                                                      </li>
                                                                    </ul>
                                                                  </div>

                                                                  <div className="input-group">
                                                                    <div className="mn_ex">
                                                                      <h5>Description*</h5>
                                                                    </div>
                                                                    <div className="form-group label-floating">
                                                                      <section className="">
                                                                        <textarea
                                                                          name="jobDescription"
                                                                          rows="4"
                                                                          className="form-control mb-10"
                                                                          placeholder="Minimum 50 words and Maximum 5000 words"
                                                                          onChange={
                                                                            this.handleChange
                                                                          }
                                                                          value={jobDescription}
                                                                        ></textarea>
                                                                        {descriptionError &&
                                                                          this.fieldError(
                                                                            "Description should be minimum of 50 words and maximum of 5000 words."
                                                                          )}
                                                                        <span id="text_counter"></span>
                                                                      </section>
                                                                    </div>
                                                                  </div>
                                                                </div>

                                                                <div className="col-md-12 every-section-light-blue-color">
                                                                  <div className="mn_ex">
                                                                    <h5>
                                                                      Additional project files
                                                                    </h5>
                                                                  </div>
                                                                  <div className="mn_drag">
                                                                    {docName && (
                                                                      <p>
                                                                        <strong>{docName}</strong>
                                                                      </p>
                                                                    )}
                                                                    <div>
                                                                      {this.handleFilesToShow(
                                                                        projectFileArray
                                                                      )}

                                                                      {projectFileArray &&
                                                                        projectFileArray.length <
                                                                        5 ? (
                                                                        <div className="tf_drag_form">
                                                                          <Dropzone
                                                                            onDrop={(
                                                                              acceptedFiles
                                                                            ) =>
                                                                              this.handleFileDrop(
                                                                                acceptedFiles
                                                                              )
                                                                            }
                                                                          >
                                                                            {({
                                                                              getRootProps,
                                                                              getInputProps,
                                                                            }) => (
                                                                              <section>
                                                                                <div
                                                                                  {...getRootProps()}
                                                                                >
                                                                                  <input
                                                                                    {...getInputProps()}
                                                                                  />
                                                                                  <p id="projectFile">
                                                                                    Upload files
                                                                                  </p>
                                                                                </div>
                                                                              </section>
                                                                            )}
                                                                          </Dropzone>
                                                                        </div>
                                                                      ) : (
                                                                        ""
                                                                      )}
                                                                    </div>
                                                                    <div className="support-formats mt-20 mb-15">
                                                                      <span>
                                                                        You may attach up to 5 files
                                                                        under 100 MB
                                                                      </span>
                                                                      <span>
                                                                        Supports all popular formats
                                                                        (ppt, word, excel, pdf, jpeg
                                                                        etc)
                                                                      </span>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        )}

                                                        {step3 && (
                                                          <div >
                                                            <div
                                                              className="tab-pane show"
                                                              id="Details"
                                                            >
                                                              <div
                                                                className="mn_padding vertical-form-section-divider"
                                                                id="step3"

                                                              >
                                                                <div
                                                                  ref={activeStep === "step3" && this.ScrollRef}
                                                                >
                                                                  <div className="vertical-form-section-heading">
                                                                    <Link href="#section3"><h4 className="">
                                                                      Job Details
                                                                    </h4></Link>
                                                                  </div>
                                                                  <div className="col-sm-12 every-section-light-blue-color">
                                                                    <div className="input-group">

                                                                      <div className="form-group label-floating tf_step_3">
                                                                        <label className="control-label">
                                                                          What type of project do
                                                                          you have?*
                                                                        </label>
                                                                        <div
                                                                          className="btn-group"
                                                                        // data-toggle="buttons"
                                                                        >
                                                                          <div
                                                                            className="details-option"
                                                                            data-value="One-time-Project"
                                                                            onChange={
                                                                              this.handleRadioChange
                                                                            }>
                                                                            <input
                                                                              type="radio"
                                                                              name="typeOfProject"
                                                                              value="One-time-Project"
                                                                              checked={
                                                                                typeOfProject ===
                                                                                "One-time-Project"
                                                                              }
                                                                              id="option1"
                                                                              autoComplete="off"
                                                                            />
                                                                            <span>
                                                                              One-time Project
                                                                            </span>
                                                                          </div>
                                                                          <div
                                                                            className="details-option"
                                                                            onChange={
                                                                              this.handleRadioChange
                                                                            }
                                                                            data-value="On-going Project">
                                                                            <input
                                                                              type="radio"
                                                                              name="typeOfProject"
                                                                              value="On-going Project"
                                                                              checked={
                                                                                typeOfProject ===
                                                                                "On-going Project"
                                                                              }
                                                                              id="option2"
                                                                              autoComplete="off"
                                                                            />
                                                                            <span >
                                                                              On-going Project
                                                                            </span>
                                                                          </div>
                                                                          <div
                                                                            className="details-option"
                                                                            onChange={
                                                                              this.handleRadioChange
                                                                            }
                                                                            data-value="On-going Project">
                                                                            <input
                                                                              type="radio"
                                                                              value="I am not sure"
                                                                              checked={
                                                                                typeOfProject ===
                                                                                "I am not sure"
                                                                              }
                                                                              name="typeOfProject"
                                                                              id="option3"
                                                                              autoComplete="off"
                                                                            />
                                                                            <span>
                                                                              I am not sure
                                                                            </span>
                                                                          </div>
                                                                        </div>
                                                                      </div>
                                                                    </div>
                                                                  </div>

                                                                  <div className="clear"></div>

                                                                  <div className="col-sm-12 every-section-light-blue-color">

                                                                    <div className="input-group">
                                                                      <div className="form-group label-floating tf_step_3">
                                                                        <label className="control-label">
                                                                          Do you need to integrate
                                                                          with any APIs?
                                                                        </label>
                                                                        <div className="clearfix"></div>
                                                                        <div
                                                                          className="btn-group"
                                                                        // data-toggle="buttons"
                                                                        >
                                                                          <div
                                                                            onChange={
                                                                              this.handleRadioChange
                                                                            }
                                                                            data-value="Payment Processor"
                                                                            className="details-option">
                                                                            <input
                                                                              type="radio"
                                                                              value="Payment Processor"
                                                                              checked={
                                                                                integrationWithAPIs ===
                                                                                "Payment Processor"
                                                                              }
                                                                              name="integrationWithAPIs"
                                                                              id="option4"
                                                                              autoComplete="off"
                                                                            />
                                                                            <span data-name="integrationWithAPIs" data-value="Payment Processor">
                                                                              Payment Processor
                                                                            </span>
                                                                          </div>
                                                                          <div
                                                                            onChange={
                                                                              this.handleRadioChange
                                                                            }
                                                                            data-value="Cloud Storage"
                                                                            className="details-option"
                                                                          >
                                                                            <input
                                                                              type="radio"
                                                                              value="Cloud Storage"
                                                                              checked={
                                                                                integrationWithAPIs ===
                                                                                "Cloud Storage"
                                                                              }
                                                                              name="integrationWithAPIs"
                                                                              id="option5"
                                                                              autoComplete="off"
                                                                            />{" "}
                                                                            <span data-name="integrationWithAPIs" data-value="Cloud Storage">
                                                                              Cloud Storage
                                                                            </span>
                                                                          </div>
                                                                          <div
                                                                            onChange={
                                                                              this.handleRadioChange
                                                                            }
                                                                            data-value="Social Media"
                                                                            className="details-option"
                                                                          >
                                                                            <input
                                                                              type="radio"
                                                                              value="Social Media"
                                                                              checked={
                                                                                integrationWithAPIs ===
                                                                                "Social Media"
                                                                              }
                                                                              name="integrationWithAPIs"
                                                                              id="option6"
                                                                              autoComplete="off"
                                                                            />
                                                                            <span data-name="integrationWithAPIs" data-value="Social Media">
                                                                              Social Media
                                                                            </span>
                                                                          </div>
                                                                          <div onChange={
                                                                            this.handleRadioChange
                                                                          }
                                                                            data-value="Social Media"
                                                                            className="details-option">
                                                                            <input
                                                                              type="radio"
                                                                              value="Other"
                                                                              checked={
                                                                                integrationWithAPIs ===
                                                                                "Other"
                                                                              }
                                                                              name="integrationWithAPIs"
                                                                              id="option7"
                                                                              autoComplete="off"
                                                                            />
                                                                            <span data-name="integrationWithAPIs" data-value="Other">
                                                                              Other
                                                                            </span>
                                                                          </div>
                                                                        </div>
                                                                      </div>

                                                                    </div>
                                                                  </div>

                                                                  <div className="clear"></div>

                                                                  <div className="col-sm-12 every-section-light-blue-color">
                                                                    <div className="mn_margin input-group">
                                                                      <div className="form-group label-floating">
                                                                        <label className="control-label">
                                                                          Additional Options
                                                                          (Optional)
                                                                        </label>
                                                                        <p
                                                                          style={{
                                                                            color: "#808080",
                                                                          }}
                                                                        >
                                                                          Add Screening Questions
                                                                        </p>
                                                                        <div className="add-action">
                                                                          <Link
                                                                            to={`#`}
                                                                            onClick={
                                                                              this.addScreeningQues
                                                                            }
                                                                            className="tf_add"
                                                                          >
                                                                            + Add
                                                                          </Link>
                                                                          <br />
                                                                          <br />
                                                                          <br />
                                                                        </div>
                                                                        {allQuestions.map(
                                                                          (val, idx) => {
                                                                            var queType = this.state
                                                                              .allQuestions[idx][
                                                                              Object.keys(
                                                                                this.state
                                                                                  .allQuestions[idx]
                                                                              )[0]
                                                                            ].type;
                                                                            return (
                                                                              <div
                                                                                key={idx}
                                                                                className="option-container"
                                                                              >
                                                                                {queType ===
                                                                                  "text" ? (
                                                                                  <input
                                                                                    value={
                                                                                      allQuestionValues[
                                                                                      idx
                                                                                      ]
                                                                                    }
                                                                                    type="text"
                                                                                    id={idx}
                                                                                    onBlur={
                                                                                      this
                                                                                        .handleQuestionValues
                                                                                    }
                                                                                    onChange={
                                                                                      this
                                                                                        .handleQuestionValues
                                                                                    }
                                                                                    className="form-control input group addQualifi"
                                                                                    placeholder="Add a Screening Question"
                                                                                  />
                                                                                ) : (
                                                                                  <textarea
                                                                                    id={idx}
                                                                                    type="text"
                                                                                    defaultValue={
                                                                                      allQuestionValues[
                                                                                      idx
                                                                                      ]
                                                                                    }
                                                                                    onChange={
                                                                                      this
                                                                                        .handleQuestionValues
                                                                                    }
                                                                                  ></textarea>
                                                                                )}
                                                                                <div className="option-action">
                                                                                  <select
                                                                                    onChange={
                                                                                      this
                                                                                        .handleQuestionType
                                                                                    }
                                                                                  >
                                                                                    <option
                                                                                      defaultValue="text"
                                                                                      data-queNo={`queNo${idx}`}
                                                                                    >
                                                                                      Text
                                                                                    </option>
                                                                                    <option
                                                                                      defaultValue="text-area"
                                                                                      data-queNo={`queNo${idx}`}
                                                                                    >
                                                                                      Text area
                                                                                    </option>
                                                                                  </select>
                                                                                  <span>
                                                                                    <i
                                                                                      className="fa fa-plus fa-1g add_screen_ques_icon"
                                                                                      onClick={
                                                                                        this
                                                                                          .addScreeningQues
                                                                                      }
                                                                                      aria-hidden="true"
                                                                                    ></i>
                                                                                    <i
                                                                                      className="fa fa-times fa-1g wizard_close_icon"
                                                                                      onClick={this.deleteScrenningQue.bind(
                                                                                        this,
                                                                                        val
                                                                                      )}
                                                                                      data-id={idx}
                                                                                      id={
                                                                                        Object.keys(
                                                                                          val
                                                                                        )[0]
                                                                                      }
                                                                                      aria-hidden="true"
                                                                                    ></i>
                                                                                  </span>
                                                                                </div>
                                                                              </div>
                                                                            );
                                                                          }
                                                                        )}
                                                                        <div
                                                                          className="input-group"
                                                                          id="td_add_open"
                                                                        >
                                                                          <div className="form-group label-floating is-empty">
                                                                            <section className="box">
                                                                              <textarea
                                                                                rows="5"
                                                                                className="form-control"
                                                                                placeholder="Input text"
                                                                              ></textarea>
                                                                            </section>
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
                                                        )}

                                                        {step4 && (
                                                          <div
                                                            className="tab-pane show"
                                                            id="Expertise"
                                                          >
                                                            <div
                                                              className="mn_padding vertical-form-section-divider"
                                                              id="step4"
                                                            >
                                                              <div
                                                                ref={activeStep === "step4" && this.ScrollRef}
                                                              >
                                                                <div className="vertical-form-section-heading">
                                                                  <h4 className="">
                                                                    Platform Expertise
                                                                  </h4>
                                                                </div>

                                                                <div className="mn_margin job-Category hide">
                                                                  <div className="col-sm-12 every-section-light-blue-color">
                                                                    <div className="input-group job-category">
                                                                      <div className="form-group label-floating tf_step_3">
                                                                        <label className="control-label">
                                                                          What role would you like
                                                                          TalFoundry help you fill?
                                                                          Feel free to select more
                                                                          than one but make sure to
                                                                          select the most urgent
                                                                          hiring need?*
                                                                        </label>
                                                                        <div className="clearfix"></div>
                                                                        {skillCategoryCheckboxes.map(
                                                                          (item) => (
                                                                            <div
                                                                              className="details-option"
                                                                              key={item.key}
                                                                            >
                                                                              <Checkbox
                                                                                name={item.name}
                                                                                category={
                                                                                  item.category
                                                                                }
                                                                                checked={skillCategory.includes(
                                                                                  item.name
                                                                                )}
                                                                                onChange={
                                                                                  this
                                                                                    .handleSkillCategoryChange
                                                                                }
                                                                              />
                                                                              <span>
                                                                                {item.name}
                                                                              </span>
                                                                            </div>
                                                                          )
                                                                        )}
                                                                        {skillCategoryError &&
                                                                          this.fieldError(
                                                                            "You need to select at least one skill."
                                                                          )}
                                                                      </div>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                                <div className="">
                                                                  <div className="mn_margin job-Category">

                                                                    <div className="col-sm-12 every-section-light-blue-color">
                                                                      <div className="input-group job-category">
                                                                        <div className="form-group label-floating tf_step_3">
                                                                          <label className="control-label">
                                                                            Platform*
                                                                          </label>
                                                                          <div className="clearfix"></div>
                                                                          {JobCategoryCheckboxes.map(
                                                                            (item) => {
                                                                              return (
                                                                                <div
                                                                                  className="details-option"
                                                                                  key={item.key}
                                                                                >
                                                                                  <Checkbox
                                                                                    name={item.name}
                                                                                    checked={jobCategory.includes(
                                                                                      item.name
                                                                                    )}
                                                                                    onChange={
                                                                                      this
                                                                                        .handleJobCategoryChange
                                                                                    }
                                                                                  />
                                                                                  <span>
                                                                                    {item.label}
                                                                                  </span>
                                                                                </div>
                                                                              );
                                                                            }
                                                                          )}
                                                                          {jobCategoryError &&
                                                                            this.fieldError(
                                                                              "You need to select at least one platform."
                                                                            )}
                                                                        </div>
                                                                      </div>
                                                                    </div>
                                                                  </div>

                                                                  <div className="mn_margin job-Category">
                                                                    <div className="col-sm-12 every-section-light-blue-color">
                                                                      <div className="input-group job-category">
                                                                        <div className="form-group label-floating tf_step_3 ">
                                                                          <label className="control-label">
                                                                            Tech Stack*
                                                                          </label>
                                                                          <div className="clearfix"></div>

                                                                          <TechnologiesAutoSuggestField
                                                                            handleChange={this.handleSpecialityAddition}
                                                                            data={speciality}
                                                                            tagInputProps={{
                                                                              placeholder: "Type skills to select tags",
                                                                            }}
                                                                            jobCategory={jobCategory}
                                                                          />
                                                                          <span className="help-text">
                                                                            You may enter skill
                                                                            based on above selected
                                                                            platform
                                                                          </span>
                                                                          {expertiseError &&
                                                                            this.fieldError(
                                                                              "You need to select at least one skills or expertise."
                                                                            )}
                                                                        </div>
                                                                      </div>
                                                                    </div>
                                                                  </div>

                                                                  <div className="col-sm-12 every-section-light-blue-color">
                                                                    <div className="mn_ex tf_expertise">
                                                                      <h5>
                                                                        What are "must have" Skills
                                                                        that you need in your
                                                                        TalFoundry Engineer?
                                                                        (Optional)
                                                                      </h5>

                                                                      <div className="form-group tf_fm_group">
                                                                        <div className="input-group">
                                                                          <TechnologiesAutoSuggestField
                                                                            handleChange={this.handleAdditionalSkillChange}
                                                                            data={additionalSkillsRequired}
                                                                            onBlur={true}
                                                                            tagInputProps={{
                                                                              placeholder: "Type skills to select tags",
                                                                            }}
                                                                            jobCategory={jobCategory}
                                                                          />
                                                                        </div>
                                                                      </div>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        )}

                                                        {step5 && (
                                                          <div
                                                            className="tab-pane show"
                                                            id="Visibility"
                                                          >
                                                            <div className="">
                                                              <div
                                                                className="mn_padding vertical-form-section-divider"
                                                                id="step5"
                                                              >
                                                                <div
                                                                  ref={activeStep === "step5" && this.ScrollRef}
                                                                >
                                                                  <div className="vertical-form-section-heading">
                                                                    <h4 className="">
                                                                      Job Preference
                                                                    </h4>
                                                                  </div>

                                                                  <div className="col-sm-12 nopad">
                                                                    <div className="input-group">
                                                                      <div className="form-group label-floating tf_step_3">
                                                                        <label className="control-label">
                                                                          Project Visibility
                                                                        </label>
                                                                        <div className="clearfix"></div>
                                                                        <div
                                                                          className="btn-group"
                                                                          onChange={
                                                                            this.handleChange
                                                                          }
                                                                        // data-toggle="buttons"
                                                                        >

                                                                          <div id="job-preference-option-selection-box-container">
                                                                            <div className="job-preference-option-selection-box">
                                                                              <div className="row">
                                                                                <div className="col-md-2">

                                                                                  <input
                                                                                    type="radio"
                                                                                    name="jobVisiblity"
                                                                                    value="Public"
                                                                                    checked={
                                                                                      jobVisiblity ===
                                                                                      "Public"
                                                                                    }
                                                                                    id="option1"
                                                                                    autoComplete="off"
                                                                                  />
                                                                                  <span className="job-preference-custom-tags-featured">Public</span>
                                                                                </div>
                                                                                <div className="col-md-10">
                                                                                  <div className="">
                                                                                    <p>Public projects attract more, better-quality bids and are displayed eminently in the 'Featured Jobs' section.</p>
                                                                                  </div>
                                                                                </div>
                                                                              </div>
                                                                            </div>
                                                                            <div className="clearfix"></div>

                                                                            <div className="job-preference-option-selection-box">
                                                                              <div className="row">
                                                                                <div className="col-md-2">
                                                                                  <input
                                                                                    type="radio"
                                                                                    name="jobVisiblity"
                                                                                    value="Recruiter"
                                                                                    checked={
                                                                                      jobVisiblity ===
                                                                                      "Recruiter"
                                                                                    }
                                                                                    id="option1"
                                                                                    autoComplete="off"
                                                                                  />
                                                                                  <span className="job-preference-custom-tags-recruiter">Recruiter</span>
                                                                                </div>
                                                                                <div className="col-md-10">
                                                                                  <div className="">
                                                                                    <p>Our hands-on Prime Recruitment service ensures you get the best Cloud Expert for your project. Our recruiters personally review all the proposals saving you time screening Cloud Expert's proposals.</p>
                                                                                  </div>
                                                                                </div>
                                                                              </div>
                                                                            </div>

                                                                            <div className="clearfix"></div>

                                                                            <div className="job-preference-option-selection-box">
                                                                              <div className="row">
                                                                                <div className="col-md-2">
                                                                                  <input
                                                                                    type="radio"
                                                                                    name="jobVisiblity"
                                                                                    value="Featured"
                                                                                    checked={
                                                                                      jobVisiblity ===
                                                                                      "Featured"
                                                                                    }
                                                                                    id="option1"
                                                                                    autoComplete="off"
                                                                                  />
                                                                                  <span className="job-preference-custom-tags-nda">Featured</span>
                                                                                </div>
                                                                                <div className="col-md-10">
                                                                                  <div className="">
                                                                                    <p>Cloud Experts must sign a Non-disclosure Agreement to work on your project. Cloud Experts agree to keep details discussed through private messages and files/documents/codes confidential.</p>
                                                                                  </div>
                                                                                </div>
                                                                              </div>
                                                                            </div>

                                                                            <div className="clearfix"></div>

                                                                            <div className="job-preference-option-selection-box">
                                                                              <div className="row">
                                                                                <div className="col-md-2">
                                                                                  <input
                                                                                    type="radio"
                                                                                    name="jobVisiblity"
                                                                                    value="Urgent"
                                                                                    checked={
                                                                                      jobVisiblity ===
                                                                                      "Urgent"
                                                                                    }
                                                                                    id="option1"
                                                                                    autoComplete="off"
                                                                                  />
                                                                                  <span className="job-preference-custom-tags-urgent">Urgent</span>
                                                                                </div>
                                                                                <div className="col-md-10">
                                                                                  <div className="">
                                                                                    <p>Receive faster responses from Cloud Experts and get your Project started within a day!</p>
                                                                                  </div>
                                                                                </div>
                                                                              </div>
                                                                            </div>

                                                                            <div className="clearfix"></div>

                                                                            <div className="job-preference-option-selection-box">
                                                                              <div className="row">
                                                                                <div className="col-md-2">
                                                                                  <input
                                                                                    type="radio"
                                                                                    name="jobVisiblity"
                                                                                    value="Private"
                                                                                    checked={
                                                                                      jobVisiblity ===
                                                                                      "Private"
                                                                                    }
                                                                                    id="option1"
                                                                                    autoComplete="off"
                                                                                  />
                                                                                  <span className="job-preference-custom-tags-private">Private</span>
                                                                                </div>
                                                                                <div className="col-md-10">
                                                                                  <div className="">
                                                                                    <p>Hide project details from search engines and users that are not logged in. This feature is recommended for projects where confidentiality is a priority.</p>
                                                                                  </div>
                                                                                </div>
                                                                              </div>
                                                                            </div>

                                                                          </div>



                                                                        </div>

                                                                      </div>
                                                                      <div className="col-md-12 every-section-light-blue-color" id="How-Many-Cloud-Experts">
                                                                        <div className="form-group label-floating tf_step_3 tf_freelancer">
                                                                          <label className="control-label mt-20">
                                                                            How many Cloud Experts do
                                                                            you need for this job?*
                                                                          </label>
                                                                          <div className="clearfix"></div>
                                                                          <div
                                                                            className="btn-group "
                                                                            onChange={
                                                                              this.handleChange
                                                                            }
                                                                          // data-toggle="buttons"
                                                                          >
                                                                            <div className="details-option">
                                                                              <input
                                                                                type="radio"
                                                                                name="needOfFreelan"
                                                                                value="One Cloud Expert"
                                                                                checked={
                                                                                  needOfFreelan ===
                                                                                  "One Cloud Expert"
                                                                                }
                                                                                id="option4"
                                                                                autoComplete="off"
                                                                              />
                                                                              <span>
                                                                                {" "}
                                                                                One Cloud Expert
                                                                              </span>
                                                                            </div>
                                                                            <div className="details-option">
                                                                              <input
                                                                                type="radio"
                                                                                name="needOfFreelan"
                                                                                value="More than one Cloud Expert"
                                                                                checked={
                                                                                  needOfFreelan ===
                                                                                  "More than one Cloud Expert"
                                                                                }
                                                                                id="option5"
                                                                                autoComplete="off"
                                                                              />
                                                                              <span>
                                                                                {" "}
                                                                                More than one Cloud Expert
                                                                              </span>
                                                                            </div>
                                                                          </div>
                                                                        </div>

                                                                      </div>


                                                                      <div className="input-group">
                                                                        <label className="control-label">
                                                                          Qualifications (Optional)
                                                                        </label>
                                                                      </div>

                                                                      <div className="clearfix"></div>


                                                                      <div className="row every-section-light-blue-color">
                                                                        <div className="col-sm-6">
                                                                          <div className="input-group post-job-boxes">
                                                                            <div className="form-group label-floating">
                                                                              <label className="control-label">
                                                                                Preferred Language
                                                                              </label>
                                                                              <br />
                                                                              <select
                                                                                name="addEnglishLevel"
                                                                                type="text"
                                                                                onChange={
                                                                                  this
                                                                                    .handleChange
                                                                                }
                                                                                className="form-control addQualifi mn_input mb-15"
                                                                                placeholder="Enter english level"
                                                                                defaultValue={
                                                                                  addEnglishLevel
                                                                                }
                                                                              >
                                                                                {languages}
                                                                              </select>
                                                                            </div>
                                                                          </div>
                                                                        </div>

                                                                        <div className="col-sm-6">
                                                                          <div className="input-group post-job-boxes">
                                                                            <div className="form-group label-floating">
                                                                              <label className="control-label">
                                                                                Certified Expert
                                                                                Required?
                                                                              </label>
                                                                              <br />
                                                                              <select
                                                                                name="addCertificateRequired"
                                                                                defaultValue={
                                                                                  addCertificateRequired
                                                                                }
                                                                                type="text"
                                                                                onChange={
                                                                                  this
                                                                                    .isCerficateChange
                                                                                }
                                                                                className="form-control addQualifi mn_input Certified-Expert-Required mb-15"
                                                                              >
                                                                                <option
                                                                                  value="Yes"
                                                                                  defaultValue="Yes"
                                                                                >
                                                                                  Yes
                                                                                </option>
                                                                                <option
                                                                                  value="No"
                                                                                  defaultValue="No"
                                                                                >
                                                                                  No
                                                                                </option>
                                                                              </select>
                                                                            </div>
                                                                          </div>
                                                                        </div>

                                                                      </div>

                                                                      <div className="clearfix"></div>

                                                                      <div className="row">
                                                                        <div className="col-md-12 every-section-light-blue-color">
                                                                          <div className="form-group label-floating">
                                                                            <label>Preferred Location</label>
                                                                            <div className="clearfix"></div>
                                                                            <div className="col-md-12 nopad">
                                                                              <div className="col-md-4 col-xs-12 nopad">
                                                                                <div className="input-group tf_loca">
                                                                                  <div className="selectedwrap">
                                                                                    <select
                                                                                      className="form-control mn_input mb-15"
                                                                                      value={current_location_country}
                                                                                      onChange={this.selectCurrentCountry}
                                                                                      style={{
                                                                                        fontSize: "14px",
                                                                                        height: "48px",
                                                                                      }}
                                                                                    >
                                                                                      {this.allCountries.map(
                                                                                        (country, index) => {
                                                                                          return (
                                                                                            <option
                                                                                              key={`year${index}`}
                                                                                              id={country.id}
                                                                                              value={country.name}
                                                                                            >
                                                                                              {country.name}
                                                                                            </option>
                                                                                          );
                                                                                        }
                                                                                      )}
                                                                                    </select>
                                                                                    {current_location_country_error &&
                                                                                      this.fieldError()}
                                                                                  </div>
                                                                                </div>
                                                                              </div>
                                                                              <div className="col-md-4 col-xs-12 resp_nopad">
                                                                                <div className="input-group tf_loca">
                                                                                  <div className="selectedwrap">
                                                                                    <select
                                                                                      className="form-control mn_input mb-15"
                                                                                      style={{
                                                                                        fontSize: "14px",
                                                                                        height: "48px",
                                                                                      }}
                                                                                      value={state}
                                                                                      onChange={this.selectCurrentState}
                                                                                    >
                                                                                      {allStates.map((state, index) => {
                                                                                        return (
                                                                                          <option
                                                                                            key={`year${index}`}
                                                                                            id={state.id}
                                                                                            value={state.name}
                                                                                          >
                                                                                            {state.name}
                                                                                          </option>
                                                                                        );
                                                                                      })}
                                                                                    </select>
                                                                                  </div>
                                                                                </div>
                                                                              </div>
                                                                              <div className="col-md-4 col-xs-12 nopad-left nopad-right">
                                                                                <div className="input-group tf_loca">
                                                                                  <div className="selectedwrap">
                                                                                    <select
                                                                                      className="form-control mn_input mb-15"
                                                                                      value={current_location_city}
                                                                                      onChange={this.selectCurrentCity}
                                                                                      style={{
                                                                                        fontSize: "14px",
                                                                                        height: "48px",
                                                                                      }}
                                                                                    >
                                                                                      {allCities.map((city, index) => {
                                                                                        return (
                                                                                          <option
                                                                                            key={`year${index}`}
                                                                                            id={city.id}
                                                                                            value={city.name}
                                                                                          >
                                                                                            {city.name}
                                                                                          </option>
                                                                                        );
                                                                                      })}
                                                                                    </select>
                                                                                    {current_location_city_error &&
                                                                                      this.fieldError()}
                                                                                  </div>
                                                                                </div>
                                                                              </div>
                                                                            </div>
                                                                          </div>
                                                                        </div>
                                                                      </div>
                                                                      <div className="clearfix"></div>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        )}

                                                        {step6 && (
                                                          <div
                                                            className="tab-pane show"
                                                            id="Budget"
                                                          >
                                                            <div className=""

                                                            >
                                                              <div className="mn_padding vertical-form-section-divider"

                                                              >
                                                                <div ref={activeStep === "step6" && this.ScrollRef}>
                                                                  <div className="vertical-form-section-heading">
                                                                    <h4 className="">Budget{!step7 ? "helloo" : (activeStep === "step6") && step6 ? "step6" : "null"} </h4>
                                                                  </div>
                                                                  <div className="col-sm-12 nopad" id="step6" >


                                                                    <div className="input-group">


                                                                      <div className="col-sm-12 every-section-light-blue-color">
                                                                        <div className="form-group label-floating tf_step_3">
                                                                          <label className="control-label mt-20">
                                                                            How would you like to pay
                                                                            your Cloud Expert?*
                                                                          </label>
                                                                          <div className="clearfix"></div>
                                                                          <div
                                                                            className="btn-group "
                                                                            onChange={
                                                                              this.handleChange
                                                                            }
                                                                          // data-toggle="buttons"
                                                                          >
                                                                            <div className="details-option">
                                                                              <input
                                                                                type="radio"
                                                                                name="payType"
                                                                                defaultValue="Pay by hour"
                                                                                checked={
                                                                                  payType ===
                                                                                  "Pay by hour"
                                                                                }
                                                                                id="option1"
                                                                                autoComplete="off"
                                                                              />
                                                                              <span>Pay by hour</span>
                                                                            </div>
                                                                            <div className="details-option">
                                                                              <input
                                                                                type="radio"
                                                                                name="payType"
                                                                                defaultValue="Pay a fixed price"
                                                                                checked={
                                                                                  payType ===
                                                                                  "Pay a fixed price"
                                                                                }
                                                                                id="option2"
                                                                                autoComplete="off"
                                                                              />{" "}
                                                                              <span>
                                                                                Pay a fixed price
                                                                              </span>
                                                                            </div>
                                                                          </div>

                                                                          <div className="clearfix"></div>

                                                                          {payType ===
                                                                            "Pay a fixed price" && (
                                                                              <div className="specific-bugdet pay-a-fixed-price">
                                                                                <div className="col-md-5 nopad">
                                                                                  <label className="control-label mt-20">
                                                                                    Do you have a specific budget?*
                                                                                  </label>
                                                                                </div>
                                                                                <div className="col-md-7">
                                                                                  <i className="">
                                                                                    $
                                                                                  </i>
                                                                                  <input
                                                                                    name="fixedBugdet"
                                                                                    onBlur={
                                                                                      this.handleRateBlur
                                                                                    }
                                                                                    type="number"
                                                                                    onChange={
                                                                                      this
                                                                                        .handleChangeBugdet
                                                                                    }
                                                                                    value={fixedBugdet}
                                                                                    placeholder="0.00"
                                                                                  />
                                                                                </div>
                                                                              </div>
                                                                            )}
                                                                          {payType ===
                                                                            "Pay a fixed price" &&
                                                                            fixedBugdetError &&
                                                                            this.fieldError()}
                                                                        </div>
                                                                      </div>


                                                                      <div className="col-sm-12 every-section-light-blue-color">
                                                                        <div className="form-group label-floating tf_step_3">
                                                                          <label className="control-label mt-20">
                                                                            How long do you expect
                                                                            this project to last?*
                                                                          </label>
                                                                          <div className="clearfix"></div>
                                                                          <div
                                                                            className="btn-group "
                                                                            onChange={
                                                                              this.handleChange
                                                                            }
                                                                          // data-toggle="buttons"
                                                                          >
                                                                            <div className="details-option">
                                                                              <input
                                                                                type="radio"
                                                                                name="projectDuration"
                                                                                defaultValue="Less than 1 month"
                                                                                checked={
                                                                                  projectDuration ===
                                                                                  "Less than 1 month"
                                                                                }
                                                                                id="option9"
                                                                                autoComplete="off"
                                                                              />
                                                                              <span>
                                                                                {" "}
                                                                                Less than 1 month
                                                                              </span>
                                                                            </div>
                                                                            <div className="details-option">
                                                                              <input
                                                                                type="radio"
                                                                                name="projectDuration"
                                                                                defaultValue="1 to 3 Month"
                                                                                checked={
                                                                                  projectDuration ===
                                                                                  "1 to 3 Month"
                                                                                }
                                                                                id="option8"
                                                                                autoComplete="off"
                                                                              />
                                                                              <span>
                                                                                {" "}
                                                                                1 to 3 Month
                                                                              </span>
                                                                            </div>
                                                                            <div className="details-option">
                                                                              <input
                                                                                type="radio"
                                                                                name="projectDuration"
                                                                                defaultValue="3 to 6 Month"
                                                                                checked={
                                                                                  projectDuration ===
                                                                                  "3 to 6 Month"
                                                                                }
                                                                                id="option7"
                                                                                autoComplete="off"
                                                                              />
                                                                              <span>
                                                                                {" "}
                                                                                3 to 6 Month
                                                                              </span>
                                                                            </div>
                                                                            <div className="details-option">
                                                                              <input
                                                                                type="radio"
                                                                                name="projectDuration"
                                                                                defaultValue="More than 6 Month"
                                                                                checked={
                                                                                  projectDuration ===
                                                                                  "More than 6 Month"
                                                                                }
                                                                                id="option6"
                                                                                autoComplete="off"
                                                                              />
                                                                              <span>
                                                                                More than 6 Month
                                                                              </span>
                                                                            </div>
                                                                          </div>
                                                                        </div>
                                                                      </div>



                                                                      <div className="col-sm-12 every-section-light-blue-color">
                                                                        <div className="form-group label-floating tf_step_3 tf_freelancer">
                                                                          <label className="control-label mt-20">
                                                                            Do you have a time
                                                                            requirement for this
                                                                            project?*
                                                                          </label>
                                                                          <div className="clearfix"></div>
                                                                          <div
                                                                            className="btn-group "
                                                                            onChange={
                                                                              this.handleChange
                                                                            }
                                                                          // data-toggle="buttons"
                                                                          >
                                                                            <div className="details-option">
                                                                              <input
                                                                                type="radio"
                                                                                defaultValue="Less than 40 hours"
                                                                                checked={
                                                                                  timeRequiredPerWeek ===
                                                                                  "Less than 40 hours"
                                                                                }
                                                                                name="timeRequiredPerWeek"
                                                                                id="option11"
                                                                                autoComplete="off"
                                                                              />{" "}
                                                                              <span>
                                                                                Less than 40 hours
                                                                              </span>
                                                                            </div>
                                                                            <div className="details-option">
                                                                              <input
                                                                                type="radio"
                                                                                name="timeRequiredPerWeek"
                                                                                id="option10"
                                                                                autoComplete="off"
                                                                                defaultValue="More than 40 hours"
                                                                                checked={
                                                                                  timeRequiredPerWeek ===
                                                                                  "More than 40 hours"
                                                                                }
                                                                              />
                                                                              <span>
                                                                                More than 40 hours
                                                                              </span>
                                                                            </div>
                                                                          </div>
                                                                        </div>
                                                                      </div>


                                                                      <div id="">

                                                                        <div className="clearfix"></div>

                                                                        <div id="i-confirm-i-have-read-container">

                                                                          <div className="checkbox-container">
                                                                            <input type="Checkbox" name="checkForm" checked={this.state.checkForm} onChange={this.handleCheckField} />
                                                                          </div>
                                                                          <div className="i-confirm-i-have-read">I Confirm I have read Talfoundry's <a href={"/terms-of-Service"}> Terms & Conditions</a>. </div>
                                                                          {
                                                                            checkedError &&
                                                                            this.fieldError(
                                                                              "Please accept the terms and conditions"
                                                                            )
                                                                          }
                                                                        </div>

                                                                      </div>

                                                                    </div>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        )}

                                                        <div
                                                          className="modal fade"
                                                          id="post-job-modal"
                                                          tabindex="-1"
                                                          role="dialog"
                                                          aria-labelledby="myModalLabel"
                                                        >
                                                          <div
                                                            className="modal-dialog"
                                                            role="document"
                                                          >
                                                            <div className="modal-content">
                                                              <div className="modal-header">
                                                                <h4
                                                                  className="modal-title"
                                                                  id="myModalLabel"
                                                                >
                                                                  You need to Sign Up for Free
                                                                </h4>
                                                              </div>
                                                              <div
                                                                className="modal-body"
                                                                align="center"
                                                              >
                                                                <div className="col-sm-6">
                                                                  <div className="form-group">
                                                                    <label>Full Name</label>
                                                                    <input
                                                                      type="text"
                                                                      name="Username"
                                                                      id="Username"
                                                                      placeholder="Input text"
                                                                      defaultValue=""
                                                                      className="form-control"
                                                                    />
                                                                  </div>
                                                                </div>
                                                                <div className="col-sm-6">
                                                                  <div className="form-group">
                                                                    <label>Phone number</label>
                                                                    <input
                                                                      type="text"
                                                                      name="Username"
                                                                      id="Username"
                                                                      placeholder="Input text"
                                                                      defaultValue=""
                                                                      className="form-control"
                                                                    />
                                                                  </div>
                                                                </div>
                                                                <div className="col-sm-6">
                                                                  <div className="form-group">
                                                                    <label>Company Name</label>
                                                                    <input
                                                                      type="text"
                                                                      name="Username"
                                                                      id="Username"
                                                                      placeholder="Input text"
                                                                      defaultValue=""
                                                                      className="form-control"
                                                                    />
                                                                  </div>
                                                                </div>
                                                                <div className="col-sm-6">
                                                                  <div className="form-group">
                                                                    <label>Work Email</label>
                                                                    <input
                                                                      type="text"
                                                                      name="Username"
                                                                      id="Username"
                                                                      placeholder="Input text"
                                                                      defaultValue=""
                                                                      className="form-control"
                                                                    />
                                                                  </div>
                                                                </div>
                                                                <div className="col-sm-6">
                                                                  <div className="form-group">
                                                                    <label>Password</label>
                                                                    <input
                                                                      type="text"
                                                                      name="Username"
                                                                      id="Username"
                                                                      placeholder="Input text"
                                                                      defaultValue=""
                                                                      className="form-control"
                                                                    />
                                                                  </div>
                                                                </div>
                                                                <div className="col-sm-6">
                                                                  <div className="form-group">
                                                                    <label>
                                                                      Confirm password
                                                                    </label>
                                                                    <input
                                                                      type="text"
                                                                      name="Username"
                                                                      id="Username"
                                                                      placeholder="Input text"
                                                                      defaultValue=""
                                                                      className="form-control"
                                                                    />
                                                                  </div>
                                                                </div>
                                                              </div>
                                                              <div className="modal-footer">
                                                                <button
                                                                  type="button"
                                                                  className="btn btn-previous btn-fill btn-elegant btn-wd "
                                                                  data-dismiss="modal"
                                                                >
                                                                  Cancel
                                                                </button>
                                                                <button
                                                                  type="button"
                                                                  className="btn btn-finish btn-fill btn-cyan btn-wd"
                                                                >
                                                                  Sign Up & Post a Job
                                                                </button>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                      {/* Footer Next button start */}

                                                      <div>
                                                        <input
                                                          type="button"
                                                          onClick={
                                                            step6
                                                              ? this.handleSubmitAJob
                                                              : this.handleNext
                                                          }
                                                          style={{
                                                            marginLeft: "40%",
                                                            fontSize: step6 ? "18px" : "",
                                                            height: step6 ? "50px" : "",
                                                          }}
                                                          className="text-center next-button-vertical-form"
                                                          name="next"
                                                          defaultValue={
                                                            step6 ? "Post Job" : "Next"
                                                          }
                                                        />

                                                        {isEdit && step7 && (
                                                          <input
                                                            type="button"
                                                            onClick={this.handleSubmitAJob}
                                                            className=""
                                                            name="finish"
                                                            value="UPDATE JOB"
                                                          />
                                                        )}
                                                        {(!step3 || !step4 || !step5 || !step6 || !step7) &&
                                                          <div className="col-md-12 hidden-step-section"></div>
                                                        }
                                                      </div>

                                                      {/* Footer Next button End */}
                                                    </div>
                                                  </div>
                                                  {/* Wizard col-md-12 end  */}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          {/* form container end */}
                                        </section>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                              </div>

                            </div>
                            {/* <div className="col-md-3 right-sidebar-column">
                      <div className="how-it-works-inner_sec">
                        <div className="how-it-works-sidebar text-center">
                          <h4 className="section-heading">How It Works</h4>

                          <div className="how-it-works-sidebar-step-box">
                            <img
                              className="how-it-work-step-image "
                              src={clientP1}
                              alt="Post A Job"
                            />
                            <h4>
                              <span className="hiw-steps-count">1</span> 
                              Post A Job</h4>

                          </div>

                          <div className="how-it-works-sidebar-step-box">
                            <img
                              className="how-it-work-step-image "
                              src={clientP2}
                              alt="Find The Perfect Match"
                            />
                            <h4>
                              <span className="hiw-steps-count">2</span> 
                              Find The Perfect Match</h4>

                          </div>
                          <div className="how-it-works-sidebar-step-box">
                            <img
                              className="how-it-work-step-image "
                              src={clientP3}
                              alt="Get Work Done"
                            />
                            <h4>
                              <span className="hiw-steps-count">3</span> 
                              Get Work Done</h4>

                          </div>
                          <div className="how-it-works-sidebar-step-box">
                            <img
                              className="how-it-work-step-image "
                              src={clientP4}
                              alt="Pay Securely"
                            />
                            <h4>
                              <span className="hiw-steps-count">4</span> 
                              Pay Securely</h4>
                          </div>

                        </div>

                      </div>
                    </div> */}
                          </div>
                          <div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-2 col-sm-2 col-xs-2">
                        <div className="custom_sticky_container">
                          <div className="position-sticky">
                            {/* <p>sticky content</p> */}
                            <div className="fixed-post-a-job-steps pd_left_none">
                              <div className="row p-0" id="step-wizard-for-post-a-job" style={{ position: 'relative' }}>
                                <div className="steps-container d-flex bg-white mr-15">
                                  <div className="col-md-8 m-auto bg-white">
                                    <div className="row bs-wizard m-0">
                                      <div className="bs-wizard-step">
                                        <div className="text-center bs-wizard-stepnum" id="section1">
                                        </div>
                                        <Link
                                          data-step="step1"
                                          onClick={(e) => { e.preventDefault(); this.handleSideBarClick('step1') }}>
                                          <h3 style={{ fontSize: '14px' }}><span>01</span>&nbsp;<div className="text-left">Job Title</div></h3>
                                        </Link>
                                        <Link
                                          data-step="step1"
                                          onClick={(e) => { e.preventDefault(); this.handleSideBarClick('step1') }}
                                          className={visitedSteps.includes('step2') ? "bs-wizard-dot complete" : "bs-wizard-dot"}>
                                          {
                                            visitedSteps.includes('step2') ?
                                              <i className="fa fa-check" aria-hidden="true"></i>
                                              :
                                              <i className="fa fa-pencil-alt" aria-hidden="true"> </i>
                                          }
                                        </Link>
                                        <div className={"progress step-done progress-small"}>
                                          <div className="progress-bar">
                                          </div>
                                        </div>
                                        <div className={visitedSteps.includes('step2') ? "progress step-done" : "progress"}>
                                          <div className="progress-bar">
                                          </div>
                                        </div>
                                      </div>

                                      <div className={visitedSteps.includes('step2') ?
                                        "bs-wizard-step"
                                        :
                                        "bs-wizard-step not-visited"} id="section2">
                                        <div className="text-center bs-wizard-stepnum">
                                        </div>
                                        <Link
                                          data-step="step2"
                                          onClick={visitedSteps.length > 1 ? (e) => { e.preventDefault(); this.handleSideBarClick('step2') } :
                                            ''}>
                                          <h3 style={{ fontSize: '14px', marginTop: '-10px' }}><span>02</span>&nbsp;<div className="text-left">Description</div></h3>
                                        </Link>
                                        <Link
                                          data-step="step2"
                                          onClick={visitedSteps.length > 1 ? (e) => { e.preventDefault(); this.handleSideBarClick('step2') } : ''}
                                          className={visitedSteps.includes('step3') ? "bs-wizard-dot complete" : "bs-wizard-dot visited"}>
                                          {
                                            completedSteps.includes(1) ?
                                              <i className="fa fa-check" aria-hidden="true"> </i>
                                              :
                                              <i className="fa fa-file-alt" aria-hidden="true"></i>
                                          }
                                        </Link>
                                        <div className={visitedSteps.includes('step2') ? "progress step-done progress-small" : "progress progress-small"}>
                                          <div className="progress-bar"></div>
                                        </div>
                                        <div className={completedSteps.includes(1) ? "progress step-done" : "progress"}>
                                          <div className="progress-bar"></div>
                                        </div>
                                      </div>

                                      <div className={visitedSteps.includes('step3') ?
                                        "bs-wizard-step"
                                        :
                                        "bs-wizard-step not-visited"
                                      } id="section3">
                                        <div className="text-center bs-wizard-stepnum">
                                        </div>
                                        <Link
                                          data-step="step3"
                                          onClick={visitedSteps.length > 2 ? (e) => { e.preventDefault(); this.handleSideBarClick('step3') } : ''}>
                                          <h3 style={{ fontSize: '14px', marginTop: '-10px' }}><span>03</span>&nbsp;<div className="text-left">Details</div></h3>
                                        </Link>
                                        <Link
                                          data-step="step3"
                                          onClick={visitedSteps.length > 2 ? (e) => { e.preventDefault(); this.handleSideBarClick('step3') } : ''}
                                          className={visitedSteps.includes('step4') ? "bs-wizard-dot complete" : "bs-wizard-dot visited"}>
                                          {
                                            completedSteps.includes(2) ?
                                              <i className="fa fa-check" aria-hidden="true"> </i>
                                              :
                                              <i className="fa fa-file-invoice" aria-hidden="true"></i>
                                          }
                                        </Link>
                                        <div className={completedSteps.includes(1) ? "progress step-done progress-small" : "progress progress-small"}>
                                          <div className="progress-bar"></div>
                                        </div>
                                        <div className={completedSteps.includes(2) ? "progress step-done" : "progress"}>
                                          <div className="progress-bar"></div>
                                        </div>
                                      </div>

                                      <div className={visitedSteps.includes('step4') ?
                                        "bs-wizard-step"
                                        :
                                        "bs-wizard-step not-visited"}>
                                        <div className="text-center bs-wizard-stepnum">
                                        </div>
                                        <Link
                                          data-step="step4"
                                          onClick={visitedSteps.length > 3 ? (e) => { e.preventDefault(); this.handleSideBarClick('step4') } : ''}>
                                          <h3 style={{ fontSize: '14px', marginTop: '-10px' }}><span>04</span>&nbsp;<div className="text-left">Expertise</div></h3>
                                        </Link>
                                        <Link
                                          data-step="step4"
                                          onClick={visitedSteps.length > 3 ? (e) => { e.preventDefault(); this.handleSideBarClick('step4') } : ''}
                                          className={visitedSteps.includes('step5') ? "bs-wizard-dot complete" : "bs-wizard-dot visited"}>
                                          {
                                            completedSteps.includes(3) ?
                                              <i className="fa fa-check" aria-hidden="true"> </i>
                                              :
                                              <i className="fa fa-id-card-alt" aria-hidden="true"> </i>
                                          }
                                        </Link>
                                        <div className={completedSteps.includes(2) ? "progress step-done progress-small" : "progress progress-small"}>
                                          <div className="progress-bar"></div>
                                        </div>
                                        <div className={completedSteps.includes(3) ? "progress step-done" : "progress"}>
                                          <div className="progress-bar"></div>
                                        </div>
                                      </div>

                                      <div className={visitedSteps.includes('step5') ?
                                        "bs-wizard-step"
                                        :
                                        "bs-wizard-step not-visited"
                                      }>
                                        <div className="text-center bs-wizard-stepnum">
                                        </div>
                                        <Link
                                          data-step="step5"
                                          onClick={visitedSteps.length > 4 ? (e) => { e.preventDefault(); this.handleSideBarClick('step5') } : ''}>
                                          <h3 style={{ fontSize: '14px', marginTop: '-10px' }}><span>05</span>&nbsp;<div className="text-left">Preference</div></h3>
                                        </Link>
                                        <Link
                                          data-step="step5"
                                          onClick={visitedSteps.length > 4 ? (e) => { e.preventDefault(); this.handleSideBarClick('step5') } : ''}
                                          className={visitedSteps.includes('step6') ? "bs-wizard-dot complete" : "bs-wizard-dot visited"}
                                        >
                                          {
                                            completedSteps.includes(4) ?
                                              <i className="fa fa-check" aria-hidden="true"> </i>
                                              :
                                              <i className="fa fa-briefcase" aria-hidden="true"></i>
                                          }
                                        </Link>
                                        <div className={completedSteps.includes(3) ? "progress step-done progress-small" : "progress progress-small"}>
                                          <div className="progress-bar"></div>
                                        </div>
                                        <div className={completedSteps.includes(4) ? "progress step-done" : "progress"}>
                                          <div className="progress-bar"></div>
                                        </div>
                                      </div>

                                      <div className={visitedSteps.includes('step6') ?
                                        "bs-wizard-step complete"
                                        :
                                        "bs-wizard-step not-visited"
                                      }>
                                        <div className="text-center bs-wizard-stepnum">
                                        </div>
                                        <Link
                                          data-step="step6"
                                          onClick={visitedSteps.length > 5 ? (e) => { e.preventDefault(); this.handleSideBarClick('step6') } : ''}>
                                          <h3 style={{ fontSize: '14px', marginTop: '-10px' }}><span>06</span>&nbsp;<div className="text-left">Budget</div></h3>
                                        </Link>
                                        <Link
                                          data-step="step6"
                                          onClick={visitedSteps.length > 5 ? (e) => { e.preventDefault(); this.handleSideBarClick('step6') } : ''}
                                          className="bs-wizard-dot">
                                          {
                                            completedSteps.includes(6) ?
                                              <i className="fa fa-check" aria-hidden="true"> </i>
                                              :
                                              <i className="fa fa-check" aria-hidden="true"></i>
                                          }

                                        </Link>
                                        <br />
                                        {/* <div className={completedSteps.includes(5) ? "progress step-done" : "progress"}>
                                        <div className="progress-bar"></div>
                                      </div> */}
                                      </div>

                                    </div>
                                  </div>
                                </div>

                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            )
          }
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
    createJob: (data, a) => dispatch(createJobAction(data, a)),
    deleteScreening: (id) => dispatch(deleteScreening(id)),
    updateJob: (id, data) => dispatch(updateJobAction(id, data)),
    getTemplatesDetails: (template) => dispatch(getTemplatesDetails(template)),
    getCurrentUserDetails: () => dispatch(getCurrentUserDetails()),
    fetchJob: (id) => dispatch(fetchJob(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostAJobProgressBar
);

