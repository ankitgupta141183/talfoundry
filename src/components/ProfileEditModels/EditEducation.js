import React, {Component} from "react";
import {logOutAction} from '../../Actions/logOutAction';
import { updateEducation } from '../../Actions/freelancerActions';
import DatePicker from "react-datepicker";
import { connect } from "react-redux";
import { isEmpty } from 'lodash';
import closeIcon from '../../static/images/close-icon.png';
import FlashMessage from 'react-flash-message';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    border                : 'none',
    background            : 'transparent',
    // width                 : '60%',
  }
}

class EditEducation extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      addAndSaveMsgShow: false,
      attendedFrom: new Date(),
      educationalDetails: [],
      attendedTo: new Date(),
    }
    this.updateRecord = this.updateRecord.bind(this)
  }
  componentDidMount(){
    this.props.getData()
  }

  componentWillReceiveProps(newProps, nextProps) {
    console.log("newProps",newProps)
    if(!isEmpty(newProps.record) && !this.state.id) {
      const keys = Object.keys(newProps.record)
      let newState = Object.assign({}, this.state)
      keys.map(key => {
        if (key === 'from_date') {
          newState['attendedFrom'] = new Date(newProps.record[key])
        } else if (key === 'to_date') {
          newState['attendedTo'] = new Date(newProps.record[key])
        } else {
          newState[key] = newProps.record[key]
        }
        return key
      })
      newState.isEdit = true
      this.setState(newState)
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name] : e.target.value, [e.target.name + "Error"]: false})
  }

  onValChange = (event) => {
    this.setState({ hourlyRate: event.target.value })
  }

  handleDateChange = date => {
    this.setState({
      attendedFrom: date
    })
  }

  handleEndDateChange = date => {
    this.setState({
      attendedTo: date
    })
  }

  handleEducationalDetails = (e) => {
    const {attendedFrom, attendedTo, school, degree, areaOfStudy, educationDescription, isEdit} = this.state;
    let allEducationalDetails = this.state.educationalDetails;
    let ifAddAndSave = e.target.id !== "save"
    let educational = {
      school: school,
      from_date: attendedFrom,
      to_date: attendedTo,
      degree: degree,
      area_of_study: areaOfStudy,
      education_description: educationDescription
    }
    if(isEdit && attendedFrom && attendedTo && school && degree){
      this.updateRecord(educational)
      this.setState({educationalDetails: allEducationalDetails, educationModal: ifAddAndSave, attendedFrom:new Date(), attendedTo:new Date(), school:"", degree:"", areaOfStudy:"", educationDescription:"", isEdit:false, addAndSaveMsgShow: ifAddAndSave})
      if(ifAddAndSave){
        this.props.setIfAddAndSave('editEducation')
      }
    }else if(attendedFrom && attendedTo && school && degree){
      allEducationalDetails.push(educational)
      // if (!ifAddAndSave) {
        this.submitData()
      // }
      this.setState({educationalDetails: ( ifAddAndSave ? allEducationalDetails : []), educationModal: ifAddAndSave, attendedFrom:new Date(), attendedTo:new Date(), school:"", degree:"", areaOfStudy:"", educationDescription:"", isEdit:false, addAndSaveMsgShow: ifAddAndSave})
      if(ifAddAndSave){
        this.props.setIfAddAndSave('editEducation')
      }
    }else {
      this.setState({
        attendedFromError: typeof(attendedFrom) === "undefined" || attendedFrom === "",
        attendedToError: typeof(attendedTo) === "undefined" || attendedTo === "",
        schoolError: typeof(school) === "undefined" || school === "",
        degreeError: typeof(degree) === "undefined" || degree === "",
      })
    }
  }

  updateRecord = (educational) => {
    this.props.updateEducation(educational, this.state.uuid)
    .then((res) => {
      if([200, 201].includes(res.status)) {
        this.props.getData(this.props.profileUuid)
        this.props.setLgShow()
      }
    })
  }

  submitData = () => {
    const data = {
      profile: {
        educations_attributes: this.state.educationalDetails,
      }
    }
    this.props.updateProfile(data)
  }


  render() {
    const {lgShow, setLgShow} = this.props;
    const { addAndSaveMsgShow, school, schoolError, attendedFrom, attendedFromError, area_of_study, education_description, attendedTo, attendedToError, degree, degreeError, areaOfStudy, educationDescription } = this.state;

    return (
        <Modal isOpen={lgShow} style={customStyles} onRequestClose={setLgShow}>
          <div id="addEducation">
            {addAndSaveMsgShow && <FlashMessage duration={5000} persistOnHover={true}>
              <p className="success-note">Details are saved you can add more.</p>
            </FlashMessage>}
            <div className="modal-header">
              <button type="button" className="close" onClick={setLgShow} data-dismiss="modal" aria-label="Close"><img src={closeIcon} alt="close" /></button>
              <h4 className="modal-title" id="myModalLabel">Add Education</h4>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">School/College</label>
                  <input type="text" value={school} name="school" onChange={this.handleChange} className="form-control" />
                  {schoolError && <p id = "firstName" className="error-field" >This field can not be blank.</p>}
                </div>

                <div className="row">
                  <div className="col-sm-12 nopad">
                    <label>Dates Attended (Optional)</label>
                  </div>

                  <div className="col-sm-5 nopad">
                    <div className="input-group tf_loca tf-datepicker">
                     <DatePicker
                        selected={new Date(attendedFrom)}
                        onChange={this.handleDateChange}
                        className="form-control mn_input"
                        dateFormat="yyyy-MM-dd"
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                      />
                    </div>
                    {attendedFromError && <p id = "firstName" className="error-field" >This field can not be blank.</p>}
                  </div>

                  <div className="col-sm-5 col-xs-12">
                    <div className="input-group tf_loca tf-datepicker">
                      <DatePicker
                        selected={new Date(attendedTo)}
                        minDate={attendedFrom}
                        onChange={this.handleEndDateChange}
                        className="form-control mn_input"
                        dateFormat="yyyy-MM-dd"
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                      />
                      {attendedToError && <p id = "firstName" className="error-field" >This field can not be blank.</p>}
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Degree</label>
                  <input type="text" name="degree" onChange={this.handleChange} value={degree} className="form-control"/>
                  {degreeError && <p id = "firstName" className="error-field" >This field can not be blank.</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Area of Study/Major (Optional)</label>
                  <input type="text" name="areaOfStudy" value={areaOfStudy || area_of_study} onChange={this.handleChange} className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Description (Optional)</label>
                  <textarea name="educationDescription" value={educationDescription || education_description} onChange={this.handleChange} className="form-control" rows="3"></textarea>
                </div>
              </form>
            </div>
            <div className="footer-btn-section">
              <button onClick={setLgShow} type="button" className="cancel-md-btn" data-dismiss="modal">Cancel</button>
              <button type="button" onClick={this.handleEducationalDetails} id="saveAndAdd" className="save-add-md-btn">Save and Add More</button>
              <button type="button" onClick={this.handleEducationalDetails} id="save" className="save-md-btn">Save</button>
            </div>
          </div>
        </Modal>
      )
    }
  }

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = (dispatch) => {
  return {
    updateEducation: (data, id) => dispatch(updateEducation(data, id)),
    logOut: () => dispatch(logOutAction()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditEducation)
