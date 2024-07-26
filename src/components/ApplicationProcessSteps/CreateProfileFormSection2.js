import React, { Component } from "react";
import "react-tagsinput/react-tagsinput.css";
import TagsInput from "react-tagsinput";
import { Link } from "react-router-dom";
import Autosuggest from "react-autosuggest";
import UserImage from "../../static/images/user.svg";
import "react-datepicker/dist/react-datepicker.css";
// import TECHNOLOGIES from "../../constants/techs";
import JobCategoryCheckboxes from "../../utills/JobCategoryCheckboxes";
import Checkbox from "../../utills/Checkbox";
import TechnologiesAutoSuggestField from "../CommonComponets/TechnoloiesAutoSuggestField";

// function states() {
//   let data = [];
//   TECHNOLOGIES.map((a, index) =>
//     data.push({
//       abbr: index,
//       name: a.name,
//     })
//   )
//   return data;
// }

export default class CreateProfileFormSection2 extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      // freelancing_pros_cons: "",
      worked_as_freelancer: "",
      appProcessStep1_error: false,
      isLoading: false,
      AddedCertificates: [],
      skill: [],
      jobCategory: [],
      jobCategory_error: false,
      speciality_error: false,
      otherUsers: [],
      skillError: "",
      categoryError: "",
    }
    this.handleTagChange = this.handleTagChange.bind(this)
  }

  componentDidMount() {
    this.setState({ otherUsers: this.props.otherUsers })
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
      )
      return user
    })

    return <React.Fragment>{allUsers}</React.Fragment>;
  }

  fieldError(message) {
    return (
      <p id="firstName" className="error-field mt-10">
        {message ? message : "This field can't be blank."}
      </p>
    )
  }

  handleTagChange(tags) {
    this.setState({ skill: tags, speciality_error: false }, () => {
      this.props.setSkill(this.state.skill)
      if (this.state.skill.length > 0) {
        this.setState({ skillError: "" })
      }
    })
  }

  selectSkillFromSuggestion(value) {
    let { skill } = this.state;
    skill.push(value)
    this.setState({ skill: skill })
    this.setSkill(skill)
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

    this.setState(
      { jobCategory: jobCategory, jobCategory_error: false },
      () => {
        this.props.setJobCategory(jobCategory)
        if (jobCategory.length > 0) {
          this.setState({ jobCategoryError: "" })
        }
      }
    )
  }

  handleContinue(e) {
    e.preventDefault()
    const {
      skill,
      jobCategory
    } = this.state;

    if (skill.length === 0) {
      this.setState({ skillError: "Please choose at least one  skill" })
    }

    if (jobCategory.length === 0) {
      this.setState({
        jobCategoryError: "Please choose at least one platform",
      })
    }

    if (skill.length > 0) {
      this.setState({ skillError: "" })
    }

    if (jobCategory.length > 0) {
      this.setState({ jobCategoryError: "" })
    }

    if (jobCategory.length > 0 && skill.length > 0) {
      this.setState({ skillError: "", jobCategoryError: "" }, () => {
        this.props.handleContinue('step2' , "step3")
      })
    }
  }

  hideAlert = () => {
    this.setState({ appProcessStep1_error: false })
    this.props.history.push("/app-process1")
  }

  render() {
    const {
      jobCategory,
      jobCategory_error,
      speciality_error,
      skillError,
      jobCategoryError,
    } = this.state;
    const tagInputProps = {
      className: "react-tagsinput-input",
      placeholder: "Type here to select skills tag",
    }

    // function autocompleteRenderInput({ addTag, ...props }) {
    //   const handleOnChange = (e, { newValue, method }) => {
    //     if (method === "enter") {
    //       e.preventDefault()
    //     } else {
    //       props.onChange(e)
    //     }
    //   }
    //   const inputValue =
    //     (props.value && props.value.trim().toLowerCase()) || "";
    //   let suggestions = [];
    //   if (inputValue.length > 0) {
    //     let results = states().filter((state) => {
    //       return (
    //         state.name &&
    //         state.name.toLowerCase().includes(inputValue.toLowerCase())
    //       )
    //     })

    //     results.map((res) => {
    //       if (inputValue.split(" ").length === 1) {
    //         if (res.name.toLowerCase().includes(inputValue)) {
    //           suggestions.push(res)
    //         }
    //       }

    //       if (inputValue.split(" ").length > 1) {
    //         inputValue.split(" ").map((val) => {
    //           if (res.name.toLowerCase().includes(val.toLowerCase())) {
    //             suggestions.push(res)
    //           }
    //           return val
    //         })
    //       }
    //       return res
    //     })
    //   }

    //   return (
    //     <Autosuggest
    //       ref={props.ref}
    //       suggestions={suggestions.filter(
    //         (a, b) => suggestions.indexOf(a) === b
    //       )}
    //       shouldRenderSuggestions={(value) => value && value.trim().length > 0}
    //       getSuggestionValue={(suggestion) => suggestion.name}
    //       renderSuggestion={(suggestion) => <span>{suggestion.name}</span>}
    //       inputProps={{ ...props, onChange: handleOnChange }}
    //       onSuggestionSelected={(e, { suggestion }) => {
    //         addTag(suggestion.name)
    //       }}
    //       onSuggestionsClearRequested={() => { }}
    //       onSuggestionsFetchRequested={() => { }}
    //     />
    //   )
    // }

    return (
      // <div className="tf_tell step-two">

      // <div className="">
      <div className="col-md-12 nopad">
        <div className="tf_profile tell-us-your-self">
          <div className="col-md-12">
            <h4 className="ce-profile-section-heading">Platform</h4>
          </div>
          <div className="clearfix"></div>
          <hr />
          <div className="col-md-12">

            <div className="mn_ex">
              <div className="clearfix"></div>

              <div className="col-md-12 every-section-light-blue-color">
                <div className="form-group">
                  <label>Platform*</label>
                  <div className="clearfix"></div>
                  <div className="col-md-12 nopad">
                    <div className="">
                      {JobCategoryCheckboxes.map((item) => (
                        <div className="details-option" key={item.key}>
                          <Checkbox
                            name={item.name}
                            checked={jobCategory.includes(item.name)}
                            onChange={this.handleJobCategoryChange}
                          />
                          <span>{item.name}</span>
                        </div>
                      ))}
                      {jobCategory_error &&
                        this.fieldError(
                          "You need to select at least one platform."
                        )}
                      {jobCategoryError && jobCategoryError.length > 0
                        ? this.fieldError(jobCategoryError)
                        : ""}
                    </div>
                  </div>
                </div>
              </div>

              <div className="clearfix"></div>

              <div className="col-md-12 every-section-light-blue-color">
                <div className="tag_list_wrapper skills-wrapper app_step_2_skills" id="profile_skill_section">

                  <div className="col-sm-12 pd-none">
                    <div className="form-group label-floating">
                      <label className="control-label">
                        Tech Stack*
                      </label>
                      <div className="clearfix"></div>
                      <div className="col-md-12 nopad">
                        {/* <TagsInput
                          id="skill"
                          renderInput={autocompleteRenderInput}
                          value={this.state.skill}
                          onChange={this.handleTagChange}
                          inputProps={tagInputProps}
                        /> */}
                        <TechnologiesAutoSuggestField
                          jobCategory={jobCategory || []}
                          data={this.state.skill}
                          handleChange={this.handleTagChange}
                          inputProps={tagInputProps}
                        />
                        {speciality_error &&
                          this.fieldError(
                            "You need to select at least one Speciality."
                          )}
                        {skillError && skillError.length > 0
                          ? this.fieldError(skillError)
                          : ""}
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <div className="clearfix"></div>

            </div>


          </div>
          {!this.props.showStep3 && <div className="tf_continue">
            <Link onClick={(event) => this.handleContinue(event)}>
              CONTINUE{" "}
              <span>
                <i
                  className="fa fa-angle-right"
                  aria-hidden="true"
                ></i>
              </span>
            </Link>
          </div>}
        </div>
        {/* <div className="clearfix"></div> */}
      </div>
      // </div>
      // </div>
    )
  }
}
