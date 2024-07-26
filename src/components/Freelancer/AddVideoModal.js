import React, { Component } from "react";
import { logOutAction } from "../../Actions/logOutAction";
import { connect } from "react-redux";
import closeIcon from "../../static/images/close-icon.png";
import Modal from "react-modal";
import csc from "country-state-city";

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
    width: "60%",
  },
}

class AddVideo extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      certificationStep2: false,
      certificationStep1: true,
      addAndSaveMsgShow: false,
      certificationDetails: [],
    }
    this.allCountries = csc.getAllCountries()
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, [e.target.name + "Error"]: false })
  }

  onValChange = (event) => {
    this.setState({ hourlyRate: event.target.value })
  }

  handleDateChange = (date) => {
    this.setState({
      attendedFrom: date,
    })
  }

  handleCertificationNext = () => {
    if (typeof this.state.certificationName === "undefined" || this.state.certificationName === "")
      this.setState({ certificationNameError: true })
    else {
      this.setState({ certificationStep1: false, certificationStep2: true })
    }
  }

  handleCertificationDetails = (e) => {
    const { certificationName, certificationLink, isEdit, indexOfEdit } = this.state;
    let allCertificationDetails = this.state.certificationDetails;
    let ifAddAndSave = e.target.id !== "saveCertification";
    let certification = {
      certification_name: certificationName,
      certification_link: certificationLink,
    }
    if (isEdit && certificationLink) {
      allCertificationDetails[indexOfEdit] = certification;
      this.setState({
        certificationDetails: allCertificationDetails,
        certificationModal: ifAddAndSave,
        certificationName: "",
        certificationLink: "",
        isEdit: false,
        addAndSaveMsgShow: ifAddAndSave,
        certificationStep1: true,
        certificationStep2: false,
      })
    } else if (certificationLink) {
      allCertificationDetails.push(certification)
      if (!ifAddAndSave) {
        this.submitData()
      }
      this.setState({
        certificationDetails: ifAddAndSave ? allCertificationDetails : [],
        certificationModal: ifAddAndSave,
        certificationName: "",
        certificationLink: "",
        isEdit: false,
        addAndSaveMsgShow: ifAddAndSave,
        certificationStep1: true,
        certificationStep2: false,
      })
    } else {
      this.setState({ certificationLinkError: true })
    }
  }

  handleEndDateChange = (date) => {
    this.setState({
      attendedTo: date,
    })
  }

  submitData = () => {
    const data = {
      profile: {
        certifications_attributes: this.state.certificationDetails,
      },
    }
    this.props.updateProfile(data)
  }

  render() {
    let { lgShow, close } = this.props;
    const {
      certificationName,
      certificationNameError,
      certificationLink,
      certificationLinkError,
    } = this.state;
    let months = [];
    let month = (f) =>
      Array.from(Array(12), (e, i) => new Date(25e8 * ++i).toLocaleString("en-US", { month: f }))
    for (let index = 0; index <= 11; index++) {
      months.push(month`long`[index])
    }

    return (
      // <Modal isOpen={lgShow} style={customStyles} onRequestClose={close}>
      <Modal isOpen={lgShow} style={customStyles}>
        <div id="addEmployment">
          <div className="modal-header">
            <button
              type="button"
              onClick={close}
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <img src={closeIcon} alt="close" />
            </button>
            <h4 className="modal-title" id="myModalLabel">
              Add video
            </h4>
          </div>
          <div className="modal-body">
            <form>
              <div className="col-md-12 nopad">
                <div className="input-group tf_loca">
                  <h5>
                    <strong>{certificationName}</strong>
                  </h5>
                  <p>Paste the link to your YouTube video here</p>
                  <input
                    type="text"
                    className="mn_input certifiLink"
                    name="certificationLink"
                    value={certificationLink}
                    onChange={this.handleChange}
                    placeholder="Paste URL Here"
                  />
                  {certificationLinkError && (
                    <p id="firstName" className="error-field">
                      This field can not be blank.
                    </p>
                  )}
                </div>
              </div>
              <div>
                <div className="col-sm-12 col-xs-12 nopad">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">What type of video is this?</label>
                    <select
                      className="form-control"
                      defaultValue="select certificate"
                      value={certificationName}
                      name="certificationName"
                      onChange={this.handleChange}
                    >
                      <option>Me talking about my skills and experience</option>
                      <option>Visual samples of my work</option>
                      <option>Something else</option>
                    </select>
                    {certificationNameError && (
                      <p id="firstName" className="error-field">
                        This field can not be blank.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="footer-btn-section">
            <button onClick={close} type="button" className="cancel-md-btn" data-dismiss="modal">
              Cancel
            </button>
            <button
              type="button"
              id="saveCertification"
              onClick={this.handleCertificationDetails}
              className="save-md-btn"
            >
              Add Video
            </button>
          </div>
        </div>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => ({
  ...state,
})

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logOutAction()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddVideo)
