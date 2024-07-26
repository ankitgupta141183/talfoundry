import React, { Component } from "react";
import { connect } from "react-redux";
import Footer from "../miscellaneous/Footer";
import { logOutAction } from "../../Actions/logOutAction";
import TagsInput from "react-tagsinput";
import Dropzone from "react-dropzone";
import "react-tagsinput/react-tagsinput.css";
import _ from "lodash";
import ProjectManagerHeader from "../miscellaneous/ProjectManagerHeader";
import { createJobAction, updateJobAction } from "../../Actions/jobCreateAndUpdateActions";
import {
  fetchJob,
  deleteScreening,
  getTemplatesDetails,
} from "../../Actions/programManagerJobsActions";
import Autosuggest from "react-autosuggest";
import Loader from "react-loader-spinner";
import TECHNOLOGIES from "../../constants/techs";
// import inviteIcon from "../../static/images/invite.png";
// import ErrorImg from "../../static/images/oops.png";
import { getCurrentUserDetails } from "../../Actions/applicationActions";
import JobCategoryCheckboxes from "../../utills/JobCategoryCheckboxes";
import LANGUAGES from "../../constants/languages";
// import skillCategoryCheckboxes from "../../utills/skillCategoryCheckboxes";
import Checkbox from "../../utills/Checkbox";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import CITIES from "../../constants/cities";
import JOBTITLES from "../../constants/titles";
import { isEmpty } from 'lodash';
import PMDashboardSideBar from "./PMDashboardSideBar";
import $ from "jquery";
import BreadCrumb from "../miscellaneous/BreadCrumb";
import SuccessSweetAlert from "../CommonComponets/SweetAlert/SuccessSweetAlert";
import ErrorSweetAlert from "../CommonComponets/SweetAlert/ErrorSweetAlert";



var todaysdate = new Date()
const jobTitles = JOBTITLES;

const allLanguages = LANGUAGES;
const cities = CITIES;

const getSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase()
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : cities.filter((lang) => lang.toLowerCase().slice(0, inputLength) === inputValue)
}

function states() {
  let data = [];
  TECHNOLOGIES.map((a, index) => data.push({ abbr: index, name: a }))
  return data;
}


const getTitleSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase()
  const inputLength = inputValue.length;

  if (inputLength === 0) {
    return [];
  } else {
    let kok = [];
    jobTitles.map((lang) => {
      if (lang.toLowerCase().includes(value.toLowerCase()) && value.split(" ").length === 1) {
        if (value.length > 1) {
          kok.push(lang)
        }
      } else if (value.split(" ").length > 1) {
        value.split(" ").map((val) => {
          if (lang.toLowerCase().includes(val.toLowerCase())) {
            if (val.length > 1) {
              kok.push(lang)
            }
          }
          return val
        })
      }
      return lang
    })

    return kok;
  }
}

const renderTitleJobSuggestion = (suggestion) => <div>{suggestion}</div>;

class EditAJob extends Component {
  constructor(props, context) {
    super(props, context)
    let techs = [];
    todaysdate = new Date()

    TECHNOLOGIES.map((a, index) => techs.push({ id: index, name: a }))
    this.state = {
      job_expiration_date: todaysdate.setDate(todaysdate.getDate() + 30),
      isAddQualification: false,
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
      jobDescription: "",
      descriptionError: false,
      isLoading: false,
      certificateError: false,
      skillError: false,
      isEdit: false,
      speciality: [],
      selectedCertificateCategory: [],
      addEnglishLevel: "English",
      addCertificateRequired: "No",
      addLocation: "Anywhere",
      jobVisiblity: "Anyone",
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
      projectName: '',
      updateAlert: null,
      projectNameError: false,
      completedSteps: [0],
      step2: false,
      step3: false,
      step4: false,
      step5: false,
      step6: false,
      step7: false,
      errorinSubmit: false,
      activeStep: "step1",
      s3Path: '',
      sidePosition: 150,
      editAJobLoading: false,
      payment_method_added: false,
      latitude: '',
      longitude: '',
    }
    this.handleDrop = this.handleDrop.bind(this)
    this.handleQuestionType = this.handleQuestionType.bind(this)
    this.deleteScrenningQue = this.deleteScrenningQue.bind(this)
    this.handleQuestionValues = this.handleQuestionValues.bind(this)

    this.getMyLocation = this.getMyLocation.bind(this)

  }

  getMyLocation() {
    const location = window.navigator && window.navigator.geolocation

    if (location) {
      location.getCurrentPosition((position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })


      }, (error) => {
        this.setState({ latitude: 'err-latitude', longitude: 'err-longitude' })
      })
    }

  }

  componentDidMount() {
    this.getMyLocation();
    this.props.match.params.id && this.props.fetchJob(this.props.match.params.id)
      .then((res) => {
        console.log("res", res)
        res && this.setDataToEdit(res)
      })

    this.setState({ isEdit: this.props.match.params.id && true })

    window.addEventListener('scroll', this.handleScroll);
  }

  setDataToEdit = (job) => {


    if (job) {

      let allQuestionsRecreated = job.job_screening_questions.length > 0 ? job.job_screening_questions.map((el, idx) => {
        let question = {}
        question["queNo" + idx] = {
          type: "text",
          queNo: idx,
          uuid: el.uuid,
          questionId: el.id,
        }
        return question;
      }) : []

      let qual = job.job_qualification
      let docs = []
      if (job && job.job_documents && job.job_documents.length > 0) {
        job.job_documents.map((j, i) => {
          if (i === 0) {
            this.setState({ s3Path: j.split('/').slice(0, j.split('/').length - 1).join('/') })
          }
          var f = new File([""], j);
          f.path = j
          docs.push(f)
          return j
        })
      }

      this.setState({
        isAddQualification: !_.isEmpty(qual) ? true : false,
        jobCategory: job.job_category,
        projectFile: job.job_document ? job.job_document : "",
        // skillCategory: job.job_expertise_required || [],
        additionalSkillsRequired: job.job_additional_expertise_required,
        allQuestionValues: job.job_screening_questions.map((el) => el.job_question),
        numberOfAddQuestions: job.job_screening_questions.length,
        selectedCertificateCategory: !_.isEmpty(qual) ? (typeof (qual.certificate_category) === "string" ?
          (qual.certificate_category.split(",") || []) : (qual.certificate_category || [])) : [],
        allQuestions: allQuestionsRecreated,
        jobDescription: job.job_description,
        addEnglishLevel: qual.english_level,
        addFreelancerType: qual.freelancer_type,
        addHoursTalfoundry: qual.billed_on_talfoundry,
        addJobSuccessScore: qual.job_success_score,
        addCertificateRequired: qual.qualification_group && qual.qualification_group !== "No" ?
          qual.qualification_group.split(',') : qual ? qual.qualification_group : [],
        addRisingTalent: qual.rising_talent,
        addLocation: qual.location,
        jobVisiblity: job.job_visibility,
        needOfFreelan: job.number_of_freelancer_required,
        payType: job.job_pay_type,
        projectDuration: job.job_duration,
        experienceLevel: job.job_experience_level,
        integrationWithAPIs: job.job_api_integration,
        timeRequiredPerWeek: job.job_time_requirement,
        typeOfProject: job.job_type,
        titleOfJob: job.job_title,
        speciality: job.job_speciality,
        jobUUID: job.uuid,
        isDocTypeImage: true,
        docName: "",
        fixedBugdet: job.job_pay_value && job.job_pay_value,
        projectFileArray: docs,
        payment_method_added: job.payment_method_added
      })
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
    }))
  }


  handleQuestionValues(e) {
    var allQuestionValues = this.state.allQuestionValues;
    allQuestionValues[e.target.id] = e.target.value;
    this.setState({ allQuestionValues: allQuestionValues })
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
                res && this.setDataToEdit(res)
              })
            this.setState({ isEdit: this.props.match.params.id && true })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } else {

      var allQuestions = this.state.allQuestions;
      var currentNoOfQues = this.state.numberOfAddQuestions;
      var fieldToDelete = e.target.id;

      var filterdQuestions = allQuestions.filter((el) => {
        return Object.keys(el)[0] !== fieldToDelete;
      })

      var allQuestionValues = this.state.allQuestionValues;
      allQuestionValues.splice(parseInt(e.target.dataset.id), 1)
      this.setState({
        allQuestions: filterdQuestions,
        allQuestionValues: allQuestionValues,
        numberOfAddQuestions: currentNoOfQues - 1,
      })
    }
  }

  onPreviewDrop = (files) => {
    this.setState({
      files: this.state.files.concat(files),
    })
  }

  handleDateChange = (date) => {
    this.setState({
      job_expiration_date: date,
      ExpirationDateError: false
    })
  }

  handleQuestionType(e) {
    var queNumber = e.target.options[e.target.selectedIndex].dataset.queno.slice(-1)
    var allQuestions = this.state.allQuestions;
    var currentQuestion = this.state.allQuestions[queNumber];
    currentQuestion[Object.keys(currentQuestion)[0]].type = e.target.value;
    allQuestions[queNumber] = currentQuestion;
    this.setState({ allQuestions: allQuestions })
  }


  openDropDown = () => {
    const dropElement = document.getElementById("user-drop-down")
    dropElement.classList.toggle("open")
  }
  logOut = () => {
    this.props.logOut()
    this.props.history.push("/")
  }

  handleSpecialityAddition = (tag) => {

    tag = Array.from(new Set(tag));

    var flag = 0;  // Initially 0 - Not found

    for (var i = 0; i < this.state.speciality.length; i++) {
      if (tag === this.state.speciality[i])
        flag = 1;
    }

    //Check if flag value changed.
    if (flag === 1)
      console.log('Element Found');
    else
      console.log('Element Not Found');

    this.setState({ speciality: tag, expertiseError: false })

  }

  handleJobCategoryDelete = (i) => {
    const tags = this.state.jobCategory.slice(0)
    tags.splice(i, 1)
    this.setState({ jobCategory: tags })
  }

  handleSkilllRequiredChange = (tags) => {
    this.setState({ skillRequired: tags, skillError: false })
  }
  handleAdditionalSkillChange = (tags) => {
    tags = Array.from(new Set(tags));

    this.setState({ additionalSkillsRequired: tags })
  }
  handleCertificateTagAdd = (tags) => {
    this.setState({ addCertificateRequired: tags, certificateError: false })
  }

  handleFileDrop = (files) => {
    let projectFileArrayVar = this.state.projectFileArray;
    let file = files[0];
    // let fileName = files[0].name;
    let isPresent = projectFileArrayVar.find(a => a.path === file.path)

    if (!isPresent) {
      projectFileArrayVar.push(file)
      this.setState({
        projectFileArray: projectFileArrayVar
      })
    }
  }


  handleDrop = (files, event) => {
    let { s3Path } = this.state
    let reader = new FileReader()
    let file = files[0] ? files[0] : files.target.files[0];
    // let fileName = files[0].name;
    let isDocTypeImage = file.type.includes("image")
    const target = event ? event.target.id : files.target.id;
    reader.readAsDataURL(file)
    reader.onload = (event) => {
      this.setState({
        [target]: event.target.result,
        [target + "_error"]: false,
        isDocTypeImage: isDocTypeImage,
        docName: `${s3Path}fileName`,
      })
    }
  }

  isCerficateChange = (e) => {
    this.setState({ addCertificateRequired: e.target.value })
  }

  handleTitleChange = (label) => {
    let categories = []
    const hasVal = (val) => {
      val = val.split(' ')
      let hasVal = false;
      val.map((a) => {
        hasVal = hasVal ? hasVal : ((a !== ' ') && (label.includes(a)))
        return a
      })
      return hasVal
    }

    JobCategoryCheckboxes.map((record) => {
      let others = ['Microsoft Azure', 'Google Cloud', 'IBM']
      if (hasVal(record.name)) {
        categories.push(record.name)
      }
      else {
        for (let i = 0; i < others.length - 1; i++) {
          if (label.includes(others[i])) {
            categories.push(record.name)
          }
        }
      }
      return record
    })
    this.setState({ titleOfJob: label, titleError: false, jobCategory: categories })
  }

  handleCityChange = (label) => {
    this.setState({ addLocation: label })
  }

  handleChange = (e) => {
    if (e.target.name === "jobDescription") {
      let words = (e.target.value.match(/\S+/g) || []).length;
      if (words < 50 || words > 500) {
        this.setState({ descriptionError: true })
      }
      else {
        this.setState({ descriptionError: false })
      }

    } else {
      console.log("result")
    }
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleChangeBugdet = (e) => {
    if (e.target.value >= 0) {
      this.setState({
        [e.target.name]: e.target.value,
        fixedBugdetError: false,
      })
    }
  }

  addAdditionalQualifications = () => {
    this.setState({ isAddQualification: !this.state.isAddQualification })
  }

  handleSubmitAJob = () => {
    const {
      titleOfJob,
      jobCategory,
      addCertificateRequired,
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
      addLocation,
      allQuestionValues,
      allQuestions,
      jobUUID,
      speciality,
      fixedBugdet,
      selectedCertificateCategory,
      job_expiration_date
    } = this.state;

    let words = (jobDescription.match(/\S+/g) || []).length
    let titleWords = this.state.titleOfJob.length;

    if (titleOfJob.length > 1 && titleWords > 15 && words >= 50 && words < 500 && speciality.length > 0 && jobCategory.length > 0) {
      this.setState({ errorinSubmit: false })

      let screeningQues = [];
      allQuestionValues.map((a) =>
        screeningQues.push({ job_question_label: "text", job_question: a })
      )
      let data = {
        job: {
          job_title: titleOfJob,
          job_category: (jobCategory || []).join(","),
          job_description: jobDescription,
          job_type: typeOfProject,
          job_speciality: (speciality || []).join(","),
          job_pay_value: payType !== "Pay by hour" ? fixedBugdet : '',
          job_api_integration: integrationWithAPIs,
          // job_expertise_required: (skillCategory || []).join(","),
          job_additional_expertise_required: (additionalSkillsRequired || []).join(","),
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

      this.state.projectFileArray.map((p, index) => {
        form_data.append(`job[job_documents[${index}]]`, p)
        return p
      })

      form_data.append("job[job_qualification_attributes[english_level]]", addEnglishLevel)
      form_data.append("job[job_qualification_attributes[qualification_group]]", _.isArray(addCertificateRequired)
        ? (addCertificateRequired || []).join(",")
        : addCertificateRequired
      )
      form_data.append("job[job_qualification_attributes[location]]", addLocation)
      form_data.append("job[job_qualification_attributes[certificate_category]]", addCertificateRequired !== "No"
        ? selectedCertificateCategory.join(",")
        : null)

      allQuestionValues.map((a, index) => {
        form_data.append(`job[job_screening_questions_attributes[][job_question]]`, a)
        if (allQuestions[index]) {
          const questionID = Object.values(allQuestions[index]) ? Object.values(allQuestions[index])[0].questionId : null
          if (questionID) {
            form_data.append(`job[job_screening_questions_attributes[][id]]`, questionID)
          }
        }
        return a
      })

      this.setState({ editAJobLoading: true })
      this.props.updateJob(jobUUID, form_data).then((res) => {
        if ((res.status === 200) && !isEmpty(res.data)) {
          const getAlert = () => (
            // <div className="app-pro2-swal" id="EditJobSuccessMessagePopup">
            //   <SweetAlert onConfirm={this.hideJobAlert.bind(this, res.data)} showConfirm={true}>
            //     <div id="EditJobSuccessMessagePopupInnerContent">
            //       <img src={inviteIcon} alt="" id="rightCheckIconImage" />
            //       <h4>
            //         <strong>
            //           Your posting has been updated successfully. <br />
            //         </strong>
            //       </h4>
            //     </div>
            //   </SweetAlert>
            <SuccessSweetAlert
              handleConfirm={this.hideJobAlert.bind(this, res.data)}
              show={true}
              message={"Your posting has been updated successfully."}
            />
            // </div >
          );

      this.setState({ editAJobLoading: false, updateAlert: getAlert() })
    } else if (res.status === 500) {
      alert("internal server error")
    } else {
      alert("server error please try again later.")
    }
  })
} else {
  if (titleOfJob.length === 0) {
    this.setState({ titleError: true })
  }
  if (titleWords < 15) {
    this.setState({ titleError: true })
  }

  if (words < 50 || words > 500) {
    this.setState({
      descriptionError: true
    })
  }


  if (jobCategory.length < 1) {
    this.setState({ jobCategoryError: true })
  }

  // if (skillCategory.length === 0) {
  //   this.setState({ skillCategoryError: true })
  // }

  if (speciality.length === 0) {
    this.setState({ expertiseError: true })
  }

  this.setState({ errorinSubmit: true })

}
  }

fieldError(message) {
  return (
    <p id="firstName" className="error-field">
      {message ? message : "This field can't be blank."}
    </p>
  )
}

hideJobAlert = (data) => {
  this.setState({ updateAlert: null })
  this.props.history.push(`/job/${data.uuid || data.id}/1`)
}

handleAttachment = () => {
  const url = `${this.state.projectFile}`;
  window.open(url, "_blank")
}

handleJobCategoryChange = (e) => {
  const jobCategory = this.state.jobCategory;
  let index;
  if (e.target.checked) {
    jobCategory.push(e.target.name)
  } else {
    index = jobCategory.indexOf(e.target.name)
    jobCategory.splice(index, 1)
  }
  this.setState({ jobCategory: jobCategory, jobCategoryError: false })
}

handleCertificateChange = (e) => {
  const certificateCat = this.state.selectedCertificateCategory || [];
  let index;
  if (e.target.checked) {
    certificateCat.push(e.target.name)
  } else {
    index = certificateCat.indexOf(e.target.name)
    certificateCat.splice(index, 1)
  }
  this.setState({ selectedCertificateCategory: certificateCat, certificateError: false })
}

removeAttachment = () => {
  this.setState({ projectFile: "", docName: "" })
}

handleRateBlur = (e) => {
  this.setState({
    [e.target.name]: !isNaN(parseFloat(e.target.value).toFixed(2))
      ? parseFloat(e.target.value).toFixed(2)
      : "",
  })
}

returnPoperFormat(job_expiration_date) {
  let abc;
  if (job_expiration_date) {
    let month = new Date(job_expiration_date).getMonth() + 1;
    let year = new Date(job_expiration_date).getFullYear()
    let day = new Date(job_expiration_date).getDate()

    abc = `${month < 10 ? `0${month}` : month}/${day < 10 ? `0${day}` : day}/${year}`;
  }
  return abc;
}

handleFileRemove = (e) => {
  e.preventDefault()
  let allprojectFiles = [];
  let currentProjectFiles = this.state.projectFileArray;
  // let kok = e.target.id
  currentProjectFiles.map((proj) => {
    if (proj.path !== e.target.id) {
      allprojectFiles.push(proj)
    }
    return proj
  })
  this.setState({ projectFileArray: allprojectFiles })
  console.log("this.state.projectFileArray", this.state.projectFileArray)
}



handleFilesToShow = (projectFileArray) => {
  let fileToDisplay = []
  if (projectFileArray && projectFileArray.length > 0) {
    projectFileArray.map((file, id) => {

      fileToDisplay.push(
        <div
          className="row multi-file-upload-files-list mt-10"
          id={file.name}
          key={`file_${id}`}
        >
          <div className="col-md-8">
            <i className="fa fa-check" aria-hidden="true"></i>
            {file.path.split("/")[file.path.split("/").length - 1]}
          </div>
          <div>
            <i
              className="fa fa-trash"
              id={file.name}
              onClick={this.handleFileRemove}
              aria-hidden="true"
            ></i>
          </div>
        </div>
      )
      return file
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
    if (newValue.includes(record.name) && !newState.jobCategory.includes(record.name)) {
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

onTitleSuggestionsFetchRequested = ({ value }) => {
  let tempSuggestions = getTitleSuggestions(value).filter((a, b) => getTitleSuggestions(value).indexOf(a) === b)
  this.setState({
    suggestions: tempSuggestions,
    titleError: false
  })
}

onTitleSuggestionsClearRequested = () => {
  this.setState({
    suggestions: [],
    titleError: false
  })
}

OnEnterByJobTitle = (e) => {
  e.preventDefault()
  this.handleTitleChange(e.target.childNodes[0].childNodes[0].value)
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
  let tempSuggestions = getSuggestions(value).filter((a, b) => getSuggestions(value).indexOf(a) === b)
  this.setState({
    suggestions: tempSuggestions,
  })
}

onSuggestionsClearRequested = () => {
  this.setState({
    suggestions: [],
  })
}

handleEmptyField = (e) => {
  switch (e.target.name) {
    case 'projectName':
      if (e.target.value.length > 0) {
        this.setState({
          projectName: e.target.value,
          projectNameError: false
        })
      }
      else {
        this.setState({
          projectName: '',
          projectNameError: true
        })
      }
  }
}

handleScroll = (event) => {
  if (document.documentElement.scrollTop < 0) {
    this.setState({ sidePosition: 200 })
  }
  if (document.documentElement.scrollTop > 200) {
    this.setState({ sidePosition: 100 })
  }
  else {
    this.setState({ sidePosition: 150 })
  }
}

handleSideBarClick = (step) => {
  this.setState({
    activeStep: step,
  }, () => {
    this.scrollToMyRef(step)
  });
}

scrollToMyRef = (refe) => {
  let { allQuestions, projectFileArray, additionalSkillsRequired } = this.state
  let quesHeight, fileHeight, additionalSkills = 0
  fileHeight = projectFileArray ? (projectFileArray.length * 30) : 0
  quesHeight = allQuestions ? (allQuestions.length * 60) : 0
  additionalSkills = (additionalSkillsRequired.length > 0) ? 15 : 0
  this.setState({ activeStep: refe }, () => {
    let offsetToScroll;
    if (refe === "step1") {
      offsetToScroll = 0;
    } else if (refe === "step2") {
      offsetToScroll = 650;
    } else if (refe === "step3") {
      offsetToScroll = 1170 + fileHeight;
    } else if (refe === "step4") {
      offsetToScroll = 1627 + quesHeight + fileHeight;
    } else if (refe === "step5") {
      offsetToScroll = 2120 + quesHeight + fileHeight + additionalSkills;
    } else if (refe === "step6") {
      offsetToScroll = 3020 + quesHeight + fileHeight + additionalSkills;
    }
    window.scrollTo(0, offsetToScroll);
  });
}


render() {
  const {
    titleOfJob,
    jobCategory,
    ExpirationDateError,
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
    addLocation,
    allQuestions,
    allQuestionValues,
    titleError,
    jobCategoryError,
    fixedBugdetError,
    descriptionError,
    fixedBugdet,
    speciality,
    expertiseError,
    docName,
    addCertificateRequired,
    showSweetAlert,
    projectFileArray,
    value,
    suggestions,
    errorinSubmit,
    editAJobLoading
  } = this.state


  const languages = allLanguages.map((lang) => <option>{lang}</option>)
  const citiesList = cities.map((city) => <option>{city}</option>)

  const titleInputProps = {
    placeholder: "Looking for.....",
    value: value ? value : titleOfJob,
    onChange: this.onChange
  }
  const getTitleJobSuggestionValue = (suggestion) => {
    const label = suggestion;
    this.handleTitleChange(label)
    this.setState({ titleError: false })
    return suggestion;
  }
  // let job_expiration_date_toshow = this.returnPoperFormat(job_expiration_date)

  function autocompleteRenderInput({ addTag, ...props }) {
    const handleOnChange = (e, { newValue, method }) => {
      if (method === 'enter') {
        e.preventDefault()
      } else {
        props.onChange(e)
      }
    }

    const inputValue = (props.value && props.value.trim().toLowerCase()) || ''
    let suggestions = []

    if (inputValue.length > 0) {
      let results = states().filter((state) => {
        return state.name.name.toLowerCase().includes(inputValue.toLowerCase())
      })

      results.map(res => {
        if (inputValue.split(' ').length === 1) {
          if (res.name.name.toLowerCase().includes(inputValue)) {
            suggestions.push(res)
          }
        }

        if (inputValue.split(' ').length > 1) {
          inputValue.split(' ').map(val => {
            if (res.name.name.toLowerCase().includes(val.toLowerCase())) {
              suggestions.push(res)
            }
            return val
          })
        }
        return res
      })
    }

    let suggestionsArray = []
    for (let i = 0; i < jobCategory.length; i++) {
      suggestionsArray.push(suggestions.filter(sug => sug.name.name.includes(jobCategory[i])))
    }
    suggestionsArray = suggestionsArray.flat()

    return (
      <Autosuggest
        ref={props.ref}
        suggestions={suggestionsArray.filter((a, b) => suggestionsArray.indexOf(a) === b)}
        shouldRenderSuggestions={(value) => value && value.trim().length > 0}
        getSuggestionValue={(suggestion) => suggestion.name.name}
        renderSuggestion={(suggestion) => <span>{suggestion.name.name}</span>}
        inputProps={{ ...props, onChange: handleOnChange }}
        onSuggestionSelected={(e, { suggestion }) => {
          addTag(suggestion.name.name)
        }}
        onSuggestionsClearRequested={() => { }}
        onSuggestionsFetchRequested={() => { }}
      />
    )
  }

  const tagInputProps = {
    placeholder: "Type skills to select tags",
  }
  // console.log(this.state.latitude, "====>>>>", this.state.longitude)

  let addClass = ''
  if ($(window).scrollTop() > 0) {
    // console.log('=====',$(window).scrollTop())
    addClass = 'active'
  }
  return (
    <div>
      {editAJobLoading && (
        <div className="grid-loader">
          <Loader type="Grid" color="#00BFFF" height={100} width={100} />
        </div>
      )}

      {this.state.updateAlert}

      <div className="invite-response">
        {/* <SweetAlert
            confirmBtnText="Ok"
            show={errorinSubmit}
            confirmBtnBsStyle="danger"
            onConfirm={() => this.setState({ errorinSubmit: false })}
          >
            <div id="EditJobSuccessMessagePopupInnerContent">
              <img src={ErrorImg} alt="" id="rightCheckIconImage" />
              <h4>
                <strong>
                  Please correct the errors then submit.<br />
                </strong>
              </h4>
            </div>

          </SweetAlert> */}
        <ErrorSweetAlert
          show={errorinSubmit}
          handleConfirm={() => this.setState({ errorinSubmit: false })}
          message={" Please correct the errors then submit."}
        />
      </div>
      <ErrorSweetAlert
        show={showSweetAlert}
        handleConfirm={() => this.showSweetAlert()}
        message={"Cannot Upload Same File Again"}
      />
      {/* 
        <div className="app-pro2-swal">
          <SweetAlert danger show={showSweetAlert} title="" onConfirm={() => this.showSweetAlert()}>
            <div id="EditJobSuccessMessagePopupInnerContent">
              <img src={ErrorImg} alt="" id="rightCheckIconImage" />
              <h4>
                <strong>
                  Cannot Upload Same File Again<br />
                </strong>
              </h4>
            </div>
          </SweetAlert>
        </div> */}

      <ProjectManagerHeader history={this.props.history} />
      <div id="tf-project-manager-dashboard-root">
        <BreadCrumb step1 link="Edit a Job" />
      </div>
      {!editAJobLoading && (
        <div className="wraper">
          {/* id="EditAJobForBackgroundColor" */}
          <div className="multi_select_dropdown_for_job_posting post-a-job-sidebar wizard_page_post_job new-post-a-job-wizard-vertical-page">
            {/* Start Section How It Works */}
            <div className="row custom_row">
              <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 p-0 bg-white">
                <div className="custom_sticky_container">
                  <div className="position-sticky">
                    <PMDashboardSideBar history={this.props.history} />
                  </div>
                </div>
              </div>
              <div className="col-md-8 col-sm-8 col-xs-8">
                <div className={"pro-right-content-area postAJobStepsSection " + addClass}>
                  {/* End Section How It Works */}

                  <div className="tf_posting" id="Edit-job-posting-step-wizard">
                    <div className="wizard-container">
                      <div className="card wizard-card col-md-12 col-sm-12 col-xs-12" data-color="red" id="wizard">
                        <div className={!this.props.loginSteps.showHideSideBar ? "mains" : "main-add"}>
                          <form action="" method="">
                            <section className="PagePostProject">
                              <div className="row">
                                <div className="">
                                  <div className="post-job-inner_sec">
                                    {/* form container start */}
                                    <div className="PagePostProject-content PagePostProject-container col-md-12 col-lg-12 m-0">
                                      <div className="fl-form PagePostProject-form">
                                        <div className="tab-content">
                                          {/* Stepbar start */}
                                          <div className="tab-pane show" id="Title">
                                            <div className="" id="step1">
                                              <div>
                                                <div className="vertical-form-section-heading">
                                                  <h4 className="m-0">Lets Get Started</h4>
                                                </div>

                                                <div className="col-sm-12 every-section-light-blue-color">
                                                  <div className="input-group">
                                                    <div className="form-group label-floating">
                                                      <label className="control-label">
                                                        Tell us about what you are looking for*
                                                      </label>

                                                      <div className="clearfix"></div>
                                                      <div className="tf_search search_user_for_chating">
                                                        <form onSubmit={this.OnEnterByJobTitle}>
                                                          <Autosuggest
                                                            suggestions={suggestions}
                                                            onSuggestionsFetchRequested={
                                                              this.onTitleSuggestionsFetchRequested
                                                            }
                                                            onSuggestionsClearRequested={
                                                              this.onTitleSuggestionsClearRequested
                                                            }
                                                            getSuggestionValue={getTitleJobSuggestionValue}
                                                            renderSuggestion={renderTitleJobSuggestion}
                                                            inputProps={titleInputProps}
                                                          />
                                                        </form>
                                                      </div>
                                                      <br />
                                                      <br />
                                                      {titleError && this.fieldError("Please enter at least 15 characters")}
                                                    </div>
                                                  </div>

                                                  <div className="post-job-example mn_ex">
                                                    <h5>Examples:</h5>
                                                    <ul>
                                                      <li>AWS Certified Solutions Architect</li>
                                                      <li>Salesforce Senior Consultant</li>
                                                      <li>Oracle EBS Functional Consultant</li>
                                                    </ul>
                                                  </div>
                                                </div>

                                                <div className="col-sm-12 every-section-light-blue-color">
                                                  <div className="input-group">
                                                    <div className="form-group label-floating tf_step_3">
                                                      <label className="control-label">
                                                        What level of experience should your Cloud
                                                        Expert have?*
                                                      </label>
                                                      <div className="clearfix"></div>
                                                      <div
                                                        className="btn-group btn-group-toggle custom-toggle-radio-button"
                                                        onChange={this.handleChange}
                                                        data-toggle="buttons"
                                                      >
                                                        <div className="details-option">
                                                          <input
                                                            type="radio"
                                                            name="experienceLevel"
                                                            defaultValue="Fresher"
                                                            checked={
                                                              experienceLevel === "Fresher"
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
                                                              experienceLevel === "Intermediate"
                                                            }
                                                            name="experienceLevel"
                                                            id="option4"
                                                            autoComplete="off"
                                                          />
                                                          <span> Intermediate</span>
                                                        </div>


                                                        <div className="details-option">
                                                          <input
                                                            type="radio"
                                                            name="experienceLevel"
                                                            defaultValue="Expert"
                                                            checked={
                                                              experienceLevel === "Expert"
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

                                                <div className="col-sm-12 every-section-light-blue-color">
                                                  <div className="input-group">
                                                    <div className="form-group label-floating tf_step_3">
                                                      <label className="control-label">
                                                        Job Expiration Date*
                                                      </label>
                                                      <div className="clearfix"></div>
                                                      <div className="input-group tf_loca tf-datepicker ">
                                                        <DatePicker
                                                          selected={this.state.job_expiration_date}
                                                          onChange={this.handleDateChange}
                                                          className="form-control mn_input post-job-boxes"
                                                          minDate={new Date()}
                                                        />
                                                        {ExpirationDateError && this.fieldError("Date can't be blank")}
                                                        <span className="input-group-addon2 add-on">
                                                          <img src="images/Icon_calender.svg" alt="" />
                                                        </span>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>

                                          <div className="tab-pane show" id="Description">
                                            <div className="" id="step2">
                                              <div className="vertical-form-section-heading">
                                                <h4 className="">Job Description</h4>
                                              </div>
                                              <div className="">

                                                <div className="col-sm-12 every-section-light-blue-color">
                                                  <div className="mn_ex">
                                                    <h5>A few details about your project or product.</h5>
                                                    <ul>
                                                      <li>Include expected deliverables</li>
                                                      <li>Type of Cloud Expert you are looking for</li>
                                                      <li>Requirements and time frame for delivery</li>
                                                    </ul>
                                                  </div>

                                                  <div className="input-group">
                                                    <div className="mn_ex">
                                                      <h5>Description*</h5>
                                                    </div>
                                                    <div className="form-group label-floating">
                                                      <section className="">
                                                        <textarea
                                                          name="jobDescription" style={{ marginBottom: "15px" }}
                                                          rows="5"
                                                          className="form-control"
                                                          placeholder="Minimum 50 words and Maximum 5000 words"
                                                          onChange={this.handleChange}
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
                                                    <h5>Additional project files</h5>
                                                  </div>
                                                  <div className="mn_drag">
                                                    {docName && (
                                                      <p>
                                                        <strong>{docName}</strong>
                                                      </p>
                                                    )}
                                                    <div>
                                                      {this.handleFilesToShow(projectFileArray)}

                                                      {projectFileArray && projectFileArray.length < 5 ? (
                                                        <div className="tf_drag_form">
                                                          <Dropzone
                                                            onDrop={(acceptedFiles) =>
                                                              this.handleFileDrop(acceptedFiles)
                                                            }
                                                          >
                                                            {({ getRootProps, getInputProps }) => (
                                                              <section>
                                                                <div {...getRootProps()}>
                                                                  <input {...getInputProps()} />
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
                                                      <span>You may attach up to 5 files under 100 MB</span>
                                                      <span>
                                                        Supports all popular formats (ppt, word, excel, pdf, jpeg etc)
                                                      </span>
                                                    </div>
                                                  </div>
                                                </div>

                                              </div>
                                            </div>
                                          </div>

                                          <div className="tab-pane show" id="Details">
                                            <div className="" id="step3">
                                              <div className="vertical-form-section-heading">
                                                <h4 className="">Job Details</h4>
                                              </div>

                                              <div className="col-sm-12 every-section-light-blue-color">
                                                <div className="input-group">

                                                  <div className="form-group label-floating tf_step_3">
                                                    <label className="control-label">
                                                      What type of project do you have?*
                                                    </label>
                                                    <div className="clearfix"></div>
                                                    <div onChange={this.handleChange}>
                                                      <div className="details-option">
                                                        <input
                                                          type="radio"
                                                          name="typeOfProject"
                                                          checked={
                                                            typeOfProject === "One-time-Project"
                                                          }
                                                          id="option1"
                                                          defaultValue="One-time-Project"
                                                          autoComplete="off"
                                                        />
                                                        <span>One-time Project</span>
                                                      </div>
                                                      <div className="details-option">
                                                        <input
                                                          type="radio"
                                                          name="typeOfProject"
                                                          checked={
                                                            typeOfProject === "On-going Project"
                                                          }
                                                          id="option2"
                                                          defaultValue="On-going Project"
                                                          autoComplete="off"
                                                        />
                                                        <span> On-going Project</span>
                                                      </div>
                                                      <div className="details-option">
                                                        <input
                                                          type="radio"
                                                          checked={typeOfProject === "I am not sure"}
                                                          name="typeOfProject"
                                                          id="option3"
                                                          defaultValue="I am not sure"
                                                          autoComplete="off"
                                                        />
                                                        <span> I am not sure</span>
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
                                                      Do you need to integrate with any APIs?
                                                    </label>
                                                    <div className="clearfix"></div>
                                                    <div onChange={this.handleChange}>
                                                      <div className="details-option">
                                                        <input
                                                          type="radio"
                                                          defaultValue="Payment Processor"
                                                          checked={
                                                            integrationWithAPIs === "Payment Processor"
                                                          }
                                                          name="integrationWithAPIs"
                                                          id="option4"
                                                          autoComplete="off"
                                                        />
                                                        <span>Payment Processor</span>
                                                      </div>
                                                      <div className="details-option">
                                                        <input
                                                          type="radio"
                                                          defaultValue="Cloud Storage"
                                                          checked={
                                                            integrationWithAPIs === "Cloud Storage"
                                                          }
                                                          name="integrationWithAPIs"
                                                          id="option5"
                                                          autoComplete="off"
                                                        />{" "}
                                                        <span>Cloud Storage</span>
                                                      </div>
                                                      <div className="details-option">
                                                        <input
                                                          type="radio"
                                                          defaultValue="Social Media"
                                                          checked={
                                                            integrationWithAPIs === "Social Media"
                                                          }
                                                          name="integrationWithAPIs"
                                                          id="option6"
                                                          autoComplete="off"
                                                        />
                                                        <span>Social Media</span>
                                                      </div>
                                                      <div className="details-option">
                                                        <input
                                                          type="radio"
                                                          defaultValue="Other"
                                                          checked={integrationWithAPIs === "Other"}
                                                          name="integrationWithAPIs"
                                                          id="option7"
                                                          autoComplete="off"
                                                        />
                                                        <span> Other</span>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>

                                              <div className="col-sm-12 every-section-light-blue-color">
                                                <div className="mn_margin input-group ">
                                                  <div className="form-group label-floating">
                                                    <label className="control-label">
                                                      Additional Options (Optional)
                                                    </label>
                                                    <p style={{ color: '#808080' }}>
                                                      Add Screening Questions
                                                    </p>
                                                    <div className="add-action">
                                                      <Link
                                                        to={`#`}
                                                        onClick={this.addScreeningQues}
                                                        className="tf_add"
                                                      >
                                                        + Add
                                                      </Link>
                                                      <br />
                                                      <br />
                                                      <br />
                                                    </div>
                                                    {allQuestions.length > 0 && allQuestions.map((val, idx) => {
                                                      var queType = this.state.allQuestions[idx][
                                                        Object.keys(this.state.allQuestions[idx])[0]
                                                      ].type;
                                                      return (
                                                        <div key={idx} className="option-container Qualifications-Optional-Container">
                                                          {queType === "text" ? (
                                                            <input
                                                              value={allQuestionValues[idx]}
                                                              type="text"
                                                              id={idx}
                                                              onBlur={this.handleQuestionValues}
                                                              onChange={this.handleQuestionValues}
                                                              className="form-control input group addQualifi"
                                                              placeholder="Add a Screening Question"
                                                            />
                                                          ) : (
                                                            <textarea
                                                              id={idx}
                                                              type="text"
                                                              defaultValue={allQuestionValues[idx]}
                                                              onChange={this.handleQuestionValues}
                                                            ></textarea>
                                                          )}
                                                          <div className="option-action">
                                                            <select onChange={this.handleQuestionType}>
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
                                                              <i className="fa fa-plus fa-1g add_screen_ques_icon" onClick={this.addScreeningQues}
                                                                aria-hidden="true"></i>
                                                              <i className="fa fa-times fa-1g wizard_close_icon" onClick={this.deleteScrenningQue.bind(
                                                                this,
                                                                val
                                                              )} data-id={idx} id={Object.keys(val)[0]} aria-hidden="true"></i>
                                                            </span>
                                                          </div>
                                                        </div>
                                                      )
                                                    })}
                                                    <div className="input-group" id="td_add_open">
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
                                          <div className="tab-pane show" id="Expertise">
                                            <div className="" id="step4">

                                              <div className="vertical-form-section-heading">
                                                <h4 className="">Platform Expertise</h4>
                                              </div>

                                             
                                              <div className="">
                                                <div className="mn_margin job-Category">

                                                  <div className="col-sm-12 every-section-light-blue-color">
                                                    <div className="input-group job-category">
                                                      <div className="form-group label-floating tf_step_3">
                                                        <label className="control-label">Platform*</label>
                                                        <div className="clearfix"></div>
                                                        {
                                                          JobCategoryCheckboxes.map(item => {
                                                            return (
                                                              <div className="details-option" key={item.key}>
                                                                <Checkbox name={item.name} checked={jobCategory.includes(item.name)} onChange={this.handleJobCategoryChange} /><span>{item.label}</span>
                                                              </div>
                                                            )

                                                          })
                                                        }
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
                                                        <TagsInput
                                                          renderInput={autocompleteRenderInput}
                                                          inputProps={{ placeholder: "Type skills to select tags" }}
                                                          value={speciality}
                                                          onChange={this.handleSpecialityAddition}
                                                        />
                                                        <span className="help-text">
                                                          You may enter skill based on above selected category
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
                                                      What are "must have" Skills that you need in your
                                                      TalFoundry Engineer? (Optional)
                                                    </h5>

                                                    <div className="form-group tf_fm_group">
                                                      <div className="input-group">
                                                        <TagsInput
                                                          inputProps={tagInputProps}
                                                          renderInput={autocompleteRenderInput}
                                                          value={additionalSkillsRequired || []}
                                                          onChange={this.handleAdditionalSkillChange}
                                                        />
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>

                                          <div className="tab-pane show" id="Visibility">
                                            <div className="" id="step5">
                                              <div className="vertical-form-section-heading">
                                                <h4 className="">Job Preference</h4>
                                              </div>
                                              <div className="">

                                                <div className="col-sm-12 nopad">
                                                  <div className="input-group">
                                                    <div className="form-group label-floating tf_step_3">
                                                      <label className="control-label">
                                                        Project Visibility
                                                      </label>
                                                      <div className="clearfix"></div>
                                                      <div
                                                        className="btn-group "
                                                        onChange={this.handleChange}
                                                        data-toggle="buttons"
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
                                                    <div className="form-group label-floating tf_step_3 tf_freelancer every-section-light-blue-color">
                                                      <label className="control-label" style={{ margin: "10px 0px 10px 12px" }}>
                                                        How many Cloud Experts do you need for this job?*
                                                      </label>
                                                      <div className="clearfix"></div>
                                                      <div
                                                        className="btn-group" style={{ margin: "0px 0px 20px 10px" }}
                                                        onChange={this.handleChange}
                                                        data-toggle="buttons"
                                                      >
                                                        <div className="details-option">
                                                          <input
                                                            type="radio"
                                                            name="needOfFreelan"
                                                            value="One Cloud Expert"
                                                            checked={
                                                              needOfFreelan === "One Cloud Expert"
                                                            }
                                                            id="option4"
                                                            autoComplete="off"
                                                          />
                                                          <span> One Cloud Expert</span>
                                                        </div>
                                                        <div className="details-option">
                                                          <input
                                                            type="radio"
                                                            name="needOfFreelan"
                                                            value="More than one Cloud Expert"
                                                            checked={
                                                              needOfFreelan === "More than one Cloud Expert"
                                                            }
                                                            id="option5"
                                                            autoComplete="off"
                                                          />
                                                          <span> More than one Cloud Expert</span>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>

                                                <div className="col-sm-12">

                                                  <div className="input-group">
                                                    <label className="control-label">
                                                      Qualifications (Optional)
                                                    </label>
                                                    <br />
                                                  </div>
                                                  <div>

                                                    <div className="">
                                                      <div className="row input-group every-section-light-blue-color">

                                                        <div className="form-group  col-sm-6" style={{ paddingLeft: '15px' }}>
                                                          <label className="control-label" style={{ float: 'left' }}>
                                                            Preferred Language
                                                          </label>
                                                          <br />
                                                          <select
                                                            name="addEnglishLevel"
                                                            type="text"
                                                            onChange={this.handleChange}
                                                            className="form-control addQualifi mn_input "
                                                            placeholder="Enter english level"
                                                            value={addEnglishLevel}
                                                          >
                                                            {languages}
                                                          </select>
                                                        </div>

                                                        <div className="form-group  col-sm-6" style={{ paddingLeft: '15px' }}>
                                                          <label className="control-label" style={{ float: 'left' }}>
                                                            Preferred Location
                                                          </label>
                                                          <br />
                                                          <div className="clearfix"></div>
                                                          <select
                                                            name="addLocation"
                                                            type="text"
                                                            onChange={this.handleChange}
                                                            className="form-control addQualifi mn_input"
                                                            placeholder="Enter location"
                                                            value={addLocation}
                                                          >
                                                            <option selected={true} disabled={true}>
                                                              Preferred City
                                                            </option>
                                                            {citiesList}
                                                          </select>
                                                        </div>
                                                      </div>

                                                    </div>

                                                    <div className="input-group post-job-boxes  every-section-light-blue-color">
                                                      <div className="col-sm-12">
                                                        <div className="form-group label-floating">
                                                          <label className="control-label">
                                                            Certified Expert Required?
                                                          </label>
                                                          <br />
                                                          <div className="clearfix"></div>
                                                          <select
                                                            name="addCertificateRequired"
                                                            value={addCertificateRequired}
                                                            type="text"
                                                            onChange={this.isCerficateChange}
                                                            className="form-control addQualifi mn_input"
                                                            style={{ width: '15%', marginBottom: '10px' }}
                                                          >
                                                            <option
                                                              selected={addCertificateRequired === "Yes"}
                                                              value="Yes"
                                                            >
                                                              Yes
                                                            </option>
                                                            <option
                                                              selected={addCertificateRequired === "No"}
                                                              value="No"
                                                            >
                                                              No
                                                            </option>
                                                          </select>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>

                                          <div className="tab-pane show" id="Budget">
                                            <div className="">
                                              <div className="">

                                                <div className="vertical-form-section-heading mt-10">
                                                  <h4 className="">Budget</h4>
                                                </div>

                                                <div className="col-sm-12 nopad" id="step6">
                                                  <div className="input-group">

                                                    <div className="form-group label-floating tf_step_3 every-section-light-blue-color">
                                                      <label className="control-label" style={{ margin: "10px 0px 10px 12px" }}>
                                                        How would you like to pay your Cloud Expert?*
                                                      </label>
                                                      <div className="clearfix"></div>
                                                      <div
                                                        className="btn-group" style={{ margin: "0px 0px 20px 10px" }}
                                                        onChange={this.handleChange}
                                                        data-toggle="buttons"
                                                      >
                                                        <div className="details-option">
                                                          <input
                                                            type="radio"
                                                            name="payType"
                                                            defaultValue="Pay by hour"
                                                            checked={payType === "Pay by hour"}
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
                                                            checked={payType === "Pay a fixed price"}
                                                            id="option2"
                                                            autoComplete="off"
                                                          />{" "}
                                                          <span>Pay a fixed price</span>
                                                        </div>
                                                      </div>
                                                      {payType === "Pay a fixed price" && (
                                                        <div className="specific-bugdet pay-a-fixed-price">
                                                          <div className="col-md-5 nopad">
                                                            <label className="control-label fixed-budget-label-on-form" >
                                                              Do you have a specific budget?*
                                                            </label>
                                                          </div>
                                                          <div className="col-md-7">
                                                            <i className="">$</i>
                                                            <input
                                                              name="fixedBugdet"
                                                              onBlur={this.handleRateBlur}
                                                              type="number"
                                                              onChange={this.handleChangeBugdet}
                                                              value={fixedBugdet}
                                                              placeholder="0.00"
                                                            />
                                                          </div>
                                                        </div>
                                                      )}
                                                      {payType === "Pay a fixed price" &&
                                                        fixedBugdetError &&
                                                        this.fieldError()}
                                                    </div>


                                                    <div className="clearfix"></div>

                                                    <div className="form-group label-floating tf_step_3 every-section-light-blue-color">
                                                      <label className="control-label" style={{ margin: "10px 0px 10px 12px" }}>
                                                        How long do you expect this project to last?*
                                                      </label>
                                                      <div className="clearfix"></div>
                                                      <div
                                                        className="btn-group" style={{ margin: "0px 0px 20px 10px" }}
                                                        onChange={this.handleChange}
                                                        data-toggle="buttons"
                                                      >
                                                        <div className="details-option">
                                                          <input
                                                            type="radio"
                                                            name="projectDuration"
                                                            defaultValue="Less than 1 month"
                                                            checked={
                                                              projectDuration === "Less than 1 month"
                                                            }
                                                            id="option9"
                                                            autoComplete="off"
                                                          />
                                                          <span> Less than 1 month</span>
                                                        </div>
                                                        <div className="details-option">
                                                          <input
                                                            type="radio"
                                                            name="projectDuration"
                                                            defaultValue="1 to 3 Month"
                                                            checked={
                                                              projectDuration === "1 to 3 Month"
                                                            }
                                                            id="option8"
                                                            autoComplete="off"
                                                          />
                                                          <span> 1 to 3 Month</span>
                                                        </div>
                                                        <div className="details-option">
                                                          <input
                                                            type="radio"
                                                            name="projectDuration"
                                                            defaultValue="3 to 6 Month"
                                                            checked={
                                                              projectDuration === "3 to 6 Month"
                                                            }
                                                            id="option7"
                                                            autoComplete="off"
                                                          />
                                                          <span> 3 to 6 Month</span>
                                                        </div>
                                                        <div className="details-option">
                                                          <input
                                                            type="radio"
                                                            name="projectDuration"
                                                            defaultValue="More than 6 Month"
                                                            checked={
                                                              projectDuration === "More than 6 Month"
                                                            }
                                                            id="option6"
                                                            autoComplete="off"
                                                          />
                                                          <span>More than 6 Month</span>
                                                        </div>
                                                      </div>
                                                    </div>

                                                    <div className="form-group label-floating tf_step_3 tf_freelancer every-section-light-blue-color">
                                                      <label className="control-label" style={{ margin: "10px 0px 10px 12px" }}>
                                                        Do you have a time requirement for this project?*
                                                      </label>
                                                      <div className="clearfix"></div>
                                                      <div
                                                        className="btn-group" style={{ margin: "0px 0px 20px 10px" }}
                                                        onChange={this.handleChange}
                                                        data-toggle="buttons"
                                                      >
                                                        <div className="details-option">
                                                          <input
                                                            type="radio"
                                                            defaultValue="Less than 40 hours"
                                                            checked={
                                                              timeRequiredPerWeek === "Less than 40 hours"
                                                            }
                                                            name="timeRequiredPerWeek"
                                                            id="option11"
                                                            autoComplete="off"
                                                          />{" "}
                                                          <span>Less than 40 hours</span>
                                                        </div>
                                                        <div className="details-option">
                                                          <input
                                                            type="radio"
                                                            name="timeRequiredPerWeek"
                                                            id="option10"
                                                            autoComplete="off"
                                                            defaultValue="More than 40 hours"
                                                            checked={
                                                              timeRequiredPerWeek === "More than 40 hours"
                                                            }
                                                          />
                                                          <span>More than 40 hours</span>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>

                                          <div
                                            className="modal fade"
                                            id="post-job-modal"
                                            tabindex="-1"
                                            role="dialog"
                                            aria-labelledby="myModalLabel"
                                          >
                                            <div className="modal-dialog" role="document">
                                              <div className="modal-content">
                                                <div className="modal-header">
                                                  <h4 className="modal-title" id="myModalLabel">
                                                    You need to Sign Up for Free
                                                  </h4>
                                                </div>
                                                <div className="modal-body" align="center">
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
                                                      <label>Confirm password</label>
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

                                          {/* Footer Next button start */}
                                          <div className="">
                                            <input
                                              type="button"
                                              onClick={this.handleSubmitAJob}
                                              style={{
                                                marginLeft: '40%', fontSize: '18px', height: '50px',
                                              }}
                                              className="text-center next-button-vertical-form"
                                              name="next"
                                              defaultValue={'Update Job'}
                                            />
                                          </div>

                                          {/* Footer Next button End */}
                                        </div>
                                        {/* Wizard col-md-12 end  */}
                                      </div>
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
              </div>
              <div className="col-md-2 col-sm-2 col-xs-2">
                <div className="custom_sticky_container">
                  <div className="position-sticky">
                    <div className="fixed-post-a-job-steps edit_job-post">
                      {/* {this.props.loginSteps.showHideSideBar ? "main-edit-progress row edit-job-progress m-0" : "main-edit-progress-inner row edit-job-progress m-0 p-0"} */}
                      <div className={!this.props.loginSteps.showHideSideBar ? "row m-0 p-0" : "main-edit-progress-inner row edit-job-progress m-0 p-0"} id="step-wizard-for-post-a-job" style={{ marginTop: '0' }}>
                        <div className="steps-container d-flex bg-white mr-15">
                          <div className="col-md-8 m-auto">
                            <div className="row bs-wizard m-0">
                              <div className="bs-wizard-step complete">
                                <div className="text-center bs-wizard-stepnum"></div>
                                <Link
                                  data-step="step1"
                                  onClick={(e) => { e.preventDefault(); this.handleSideBarClick("step1") }}
                                >
                                  <h3>
                                    <span>01</span>&nbsp;<div className="text-left">Job Title</div>
                                  </h3>
                                </Link>
                                <Link
                                  data-step="step1"
                                  onClick={(e) => { e.preventDefault(); this.handleSideBarClick("step1") }}
                                  className="bs-wizard-dot"
                                >
                                  <i
                                    className="fa fa-briefcase" aria-hidden="true">
                                    {" "}
                                  </i>
                                </Link>
                                <div className="progress progress-small">
                                  <div className="progress-bar"></div>
                                </div>
                                <div className="progress">
                                  <div className="progress-bar"></div>
                                </div>
                              </div>

                              <div className="bs-wizard-step complete">
                                <div className="text-center bs-wizard-stepnum"></div>
                                <Link data-step="step2" onClick={(e) => { e.preventDefault(); this.handleSideBarClick("step2") }}>
                                  <h3 style={{ marginTop: "-10px" }}>
                                    <span>02</span>&nbsp;<div className="text-left">Description</div>
                                  </h3>
                                </Link>
                                <Link
                                  data-step="step2"
                                  onClick={(e) => { e.preventDefault(); this.handleSideBarClick("step2") }}
                                  className="bs-wizard-dot"
                                >
                                  <i
                                    className="fa fa-file-text" aria-hidden="true"
                                  >
                                    {" "}
                                  </i>
                                </Link>
                                <div className="progress progress-small">
                                  <div className="progress-bar"></div>
                                </div>
                                <div className="progress">
                                  <div className="progress-bar"></div>
                                </div>
                              </div>

                              <div className="bs-wizard-step complete">
                                <div className="text-center bs-wizard-stepnum"></div>
                                <Link data-step="step3" onClick={(e) => { e.preventDefault(); this.handleSideBarClick("step3") }}>
                                  <h3 style={{ fontSize: "14px", marginTop: "-10px" }}>
                                    <span>03</span>&nbsp;<div className="text-left">Details</div>
                                  </h3>
                                </Link>
                                <Link
                                  data-step="step3"
                                  onClick={(e) => { e.preventDefault(); this.handleSideBarClick("step3") }}
                                  className="bs-wizard-dot"
                                >
                                  <i
                                    className="fa fa-info-circle" aria-hidden="true"
                                  >
                                    {" "}
                                  </i>
                                </Link>
                                <div className="progress progress-small">
                                  <div className="progress-bar"></div>
                                </div>
                                <div className="progress">
                                  <div className="progress-bar"></div>
                                </div>
                              </div>

                              <div className="bs-wizard-step complete">
                                <div className="text-center bs-wizard-stepnum">
                                </div>
                                <Link data-step="step4" onClick={(e) => { e.preventDefault(); this.handleSideBarClick("step4") }}>
                                  <h3 style={{ fontSize: "14px", marginTop: "-10px" }}>
                                    <span>04</span>&nbsp;<div className="text-left">Expertise</div>
                                  </h3>
                                </Link>
                                <Link
                                  data-step="step4"
                                  onClick={(e) => { e.preventDefault(); this.handleSideBarClick("step4") }}
                                  className="bs-wizard-dot"
                                >
                                  <i
                                    className="fa fa-user-secret" aria-hidden="true"
                                  >
                                    {" "}
                                  </i>
                                </Link>
                                <div className="progress progress-small">
                                  <div className="progress-bar"></div>
                                </div>
                                <div className="progress">
                                  <div className="progress-bar"></div>
                                </div>
                              </div>

                              <div className="bs-wizard-step complete">
                                <div className="text-center bs-wizard-stepnum">
                                </div>
                                <Link data-step="step5" onClick={(e) => { e.preventDefault(); this.handleSideBarClick("step5") }}>
                                  <h3 style={{ marginTop: "-10px" }}>
                                    <span>05</span>&nbsp;<div className="text-left">Preference</div>
                                  </h3>
                                </Link>
                                <Link
                                  data-step="step5"
                                  onClick={(e) => { e.preventDefault(); this.handleSideBarClick("step5") }}
                                  className="bs-wizard-dot"
                                >
                                  <i
                                    className="fa fa-eye" aria-hidden="true"
                                  >
                                    {" "}
                                  </i>
                                </Link>
                                <div className="progress progress-small">
                                  <div className="progress-bar"></div>
                                </div>
                                <div className="progress">
                                  <div className="progress-bar"></div>
                                </div>
                              </div>

                              <div className="bs-wizard-step complete">
                                <div className="text-center bs-wizard-stepnum">
                                </div>
                                <Link data-step="step6" onClick={(e) => { e.preventDefault(); this.handleSideBarClick("step6") }}>
                                  <h3 style={{ marginTop: "-10px" }}>
                                    <span>06</span>&nbsp;<div className="text-left">Budget</div>
                                  </h3>
                                </Link>
                                <Link
                                  data-step="step6"
                                  onClick={(e) => { e.preventDefault(); this.handleSideBarClick("step6") }}
                                  className="bs-wizard-dot"
                                >
                                  <i
                                    className="fa fa-check" aria-hidden="true"
                                  >
                                    {" "}
                                  </i>
                                </Link>
                                <br />
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
          {/* <Footer style={{ margin: 100 }} /> */}
        </div>
      )}
    </div>
  )
}
}
const mapStateToProps = (state) => ({
  ...state,
})

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

export default connect(mapStateToProps, mapDispatchToProps)(EditAJob)
