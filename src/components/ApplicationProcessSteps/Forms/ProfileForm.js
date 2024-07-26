import React from "react";
import Dropzone from "react-dropzone";
import closeIcon from "../../../static/images/close-icon.png";
import { CountryDropdown } from "react-country-region-selector";
import fileLogo from "../../../static/images/file.png";



function ProfileForm(props) {
    const {handleChange ,
         state,
        current_company_name,
        current_company_name_error,
        fieldError,
        citizenship_full_name,
        citizenship_full_name_error,
        current_job_title,
        current_job_title_error,
        about_me,
        about_me_error,
        profile_picture,
        profile_picture_name,
        profile_picture_error,
        profile_picture_type_error,
        handleProfilePicDrop,
        jobAttachment,
        resume,
        resume_name,
        resume_error,
        resume_type_error,
        allCities,
        allCountries,
        allStates,
        citizenship_country,
        citizenship_country_error,
        current_location_city,
        selectCitizenship,
        removeAttachment,
        isResumeTypeImage,
        english_proficiency_error,
        languages,
        english_proficiency,
        current_location_city_error,
        selectCurrentCity,
        selectCurrentCountry,
        selectCurrentState,
        handleResumeDrop,
        current_location_country,
        current_location_country_error,
        stateName
    } = props

    return (
        <div className="tf_profile">
            {/* Form Data Start */}
            <div className="col-md-8">
                <h4 className="ce-profile-section-heading">Profile Title</h4>

            </div>
          
            <div className="clearfix"></div>
            <hr />

            <div className="col-md-12">
                <div className="mn_ex">
                    <div className="col-md-12 every-section-light-blue-color">
                        {/* Radio Button Start */}
                        <div className="tf-custom-radio">
                            <p>
                                <label>I am*</label>
                            </p>

                            <label className="tf-label-radio">
                                An Individual
                                <input
                                    type="radio"
                                    name="profileType"
                                    id="sizeSmall"
                                    value="Individual"
                                    checked={
                                        state.profileType === "Individual"
                                    }
                                    onChange={handleChange}
                                />
                                <span className="checkmark"></span>
                            </label>

                            <label className="tf-label-radio">
                                A Company
                                <input
                                    type="radio"
                                    name="profileType"
                                    id="sizeMed"
                                    value="Company"
                                    checked={state.profileType === "Company"}
                                    onChange={handleChange}
                                />
                                <span className="checkmark"></span>
                            </label>
                        </div>
                        {/* Radio Button End */}
                    </div>

                    <div className="col-md-12 every-section-light-blue-color">
                        <div className="form-group ">
                            <div className="clearfix"></div>
                            <div className="col-md-6 nopad">
                                <label>Name/Company</label>
                                <div className="input-group tf_loca">
                                    <input
                                        type="Full Name"
                                        className="form-control mn_input"
                                        name="current_company_name"
                                        style={{
                                            fontSize: "14px",
                                            height: "45px",
                                        }}
                                        placeholder="Name of the Company you currently work for."
                                        onChange={handleChange}
                                        value={current_company_name}
                                    />
                                    {current_company_name_error &&
                                        fieldError()}
                                </div>
                            </div>
                            <div className="col-md-6 nopad-right">
                                <label>Contact Name </label>
                                <div className="input-group tf_loca">
                                    <input
                                        type="Full Name"
                                        style={{
                                            fontSize: "14px",
                                            height: "45px",
                                        }}
                                        className="form-control mn_input"
                                        name="citizenship_full_name"
                                        placeholder="Full Name"
                                        value={citizenship_full_name}
                                        onChange={handleChange}
                                    />
                                    {citizenship_full_name_error &&
                                        fieldError()}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12 every-section-light-blue-color">
                        <div className="form-group">
                            <label>Current Title*</label>
                            <div className="clearfix"></div>
                            <div className="col-md-12 nopad">
                                <div className="input-group tf_loca">
                                    <input
                                        type="Full Name"
                                        style={{
                                            fontSize: "14px",
                                            height: "45px",
                                        }}
                                        className="form-control mn_input"
                                        name="current_job_title"
                                        placeholder="Your current job title"
                                        onChange={handleChange}
                                        value={current_job_title}
                                    />
                                    {current_job_title_error && fieldError()}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12 every-section-light-blue-color">
                        <div className="form-group">
                            <label>About Me*</label>
                            <div className="clearfix"></div>
                            <div className="col-md-12 nopad">
                                <div className="input-group tf_loca">
                                    <textarea
                                        className="form-control mn_input tf_loca1 about-me-description"
                                        style={{
                                            fontSize: "14px",
                                        }}
                                        placeholder="Description should contain minimum 50 words and maximum 500 words"
                                        value={about_me}
                                        name="about_me"
                                        onChange={handleChange}
                                        rows="2"
                                    ></textarea>
                                    {about_me_error &&
                                        fieldError(
                                            "Description should be minimum of 50 words and maximum 500 words."
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12 every-section-light-blue-color">
                        <div className="mn_drag">
                            <h5>Profile Photo</h5>
                            {profile_picture_name && (
                                <p>
                                    <strong>{profile_picture_name}</strong>
                                </p>
                            )}
                            <div className="tf_drag_form">
                                {profile_picture !== "" ? (
                                    <img
                                        src={profile_picture}
                                        alt="img"
                                        style={{ height: "50", width: "50" }}
                                    />
                                ) : (
                                    <Dropzone
                                        onDrop={(acceptedFiles) =>
                                            handleProfilePicDrop(acceptedFiles)
                                        }
                                    >
                                        {({ getRootProps, getInputProps }) => (
                                            <section>
                                                <div {...getRootProps()}>
                                                    <input {...getInputProps()} />
                                                    <p id="profile_picture">
                                                        Drag or upload profile photo
                                                    </p>
                                                </div>
                                            </section>
                                        )}
                                    </Dropzone>
                                )}
                                <p>{jobAttachment(profile_picture)}</p>
                            </div>
                            {profile_picture && (
                                <img
                                    src={closeIcon}
                                    alt="close"
                                    onClick={removeAttachment}
                                    id="profile_picture"
                                />
                            )}
                            <div className="support-formats">
                                <span>You may attach 1 file under 5 MB</span>
                                <span>Supported formats: .jpg, .jpeg, .png</span>
                            </div>
                            {profile_picture_error &&
                                fieldError(
                                    "profile picture must be present."
                                )}
                            {profile_picture_type_error &&
                                fieldError(
                                    "You must upload an image in the given format."
                                )}
                        </div>
                    </div>

                    <div className="col-md-12 every-section-light-blue-color">
                        <div className="mn_drag">
                            <h5>Resume*</h5>
                            {resume_name && (
                                <p>
                                    <strong>{resume_name}</strong>
                                </p>
                            )}
                            <div className="tf_drag_form">
                                {state.resume !== "" ? (
                                    isResumeTypeImage ? (
                                        <img
                                            src={state.resume}
                                            alt="img"
                                            style={{ height: "50", width: "50" }}
                                        />
                                    ) : (
                                        <a href={state.resume}>
                                            <img
                                                src={fileLogo}
                                                alt="img"
                                                style={{ height: "50", width: "50" }}
                                            />
                                        </a>
                                    )
                                ) : (
                                    <Dropzone
                                        onDrop={(acceptedFiles) =>
                                            handleResumeDrop(acceptedFiles)
                                        }
                                    >
                                        {({ getRootProps, getInputProps }) => (
                                            <section>
                                                <div {...getRootProps()}>
                                                    <input {...getInputProps()} />
                                                    <p id="resume">
                                                        Drag or upload your resume
                                                    </p>
                                                </div>
                                            </section>
                                        )}
                                    </Dropzone>
                                )}
                            </div>

                            {resume && (
                                <img
                                    src={closeIcon}
                                    alt="close"
                                    onClick={removeAttachment}
                                    id="resume"
                                />
                            )}
                            <div className="support-formats">
                                <span>You may attach 1 file under 5 MB</span>
                                <span>
                                    Supports all popular formats (ppt, word, excel,
                                    pdf etc.....)
                                </span>
                            </div>
                            {resume_error &&
                                fieldError("Resume must be present.")}
                            {resume_type_error &&
                                fieldError(
                                    "You must upload an document in the given format."
                                )}
                        </div>
                    </div>

                    <div className="col-md-12 every-section-light-blue-color">
                        <div className="form-group">
                            <label>Location*</label>
                            <div className="clearfix"></div>
                            <div className="col-md-12 nopad">
                                <div className="col-md-4 col-xs-12 nopad">
                                    <div className="input-group tf_loca">
                                        <div className="selectedwrap">
                                            <select
                                                className="form-control mn_input"
                                                value={current_location_country}
                                                onChange={selectCurrentCountry}
                                                style={{
                                                    fontSize: "14px",
                                                    height: "48px",
                                                }}
                                            >
                                                {allCountries.map(
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
                                                fieldError()}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-xs-12 resp_nopad">
                                    <div className="input-group tf_loca">
                                        <div className="selectedwrap">
                                            <select
                                                className="form-control mn_input"
                                                style={{
                                                    fontSize: "14px",
                                                    height: "48px",
                                                }}
                                                value={stateName}
                                                onChange={selectCurrentState}
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
                                                className="form-control mn_input"
                                                defaultValue={current_location_city}
                                                onChange={selectCurrentCity}
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
                                                fieldError()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12 every-section-light-blue-color">
                        <div className="form-group">
                            <div className="clearfix"></div>
                            <div className="col-md-6 nopad">
                                <div className="col-md-12 col-xs-12 nopad">
                                    <div className="">
                                        <label>Citizenship*</label>
                                        <div className="input-group tf_loca selectedwrap">
                                            {/* <CountryDropdown
                                                style={{
                                                    fontSize: "14px",
                                                    height: "48px",
                                                }}
                                                value={citizenship_country}
                                                className="form-control mn_input mySelectBoxClass"
                                                id="citizenship_country"
                                                onChange={(val) =>
                                                    selectCitizenship(val)
                                                }
                                            /> */}
                                             <select
                                            className="form-control mn_input"
                                            value={citizenship_country}
                                            id="citizenship_country"
                                            onChange={(val) =>
                                              selectCitizenship(val)}
                                            style={{
                                              fontSize: "14px",
                                              height: "48px",
                                            }}
                                          >
                                            {allCountries.map(
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
                                            {citizenship_country_error &&
                                                fieldError()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 nopad-right">
                                <div className="">
                                    <div className="form-group">
                                        <label>Language Proficiency</label>
                                        <div className="clearfix"></div>
                                        <div className="col-md-12 nopad">
                                            <div className="input-group tf_loca">
                                                <div className="selectedwrap">
                                                    <select
                                                        style={{
                                                            fontSize: "14px",
                                                            height: "48px",
                                                        }}
                                                        onChange={handleChange}
                                                        defaultValue={english_proficiency}
                                                        name="english_proficiency"
                                                        className="form-control mn_input mySelectBoxClass"
                                                    >
                                                        {languages}
                                                    </select>
                                                    {english_proficiency_error &&
                                                        fieldError()}
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
            {/* {!showStep2 && !showSubmitButton && (
      <div className="tf_continue">
        <Link onClick={(e) => {
          e.preventDefault();
          handleContinue("step1")
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
    )} */}

            {/* Form Data End */}
        </div>
    )
}

export default ProfileForm