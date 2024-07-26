import React, {Component} from "react";
import {logOutAction} from '../../Actions/logOutAction';
import { connect } from "react-redux";
import closeIcon from '../../static/images/close-icon.png';
import FlashMessage from 'react-flash-message';
import Modal from 'react-modal';
import csc from 'country-state-city'
import { updateEmployment } from '../../Actions/freelancerActions';
import DatePicker from "react-datepicker";
import { isEmpty } from 'lodash';

const educationFields  = {
  company_name:  'companyName',
  country:  'country',
  state:  'state',
  city:  'city',
  title:  'companyTitle',
  role:  'roleInCompany',
  period_month_from:  'monthFrom',
  period_year_from:  'yearFrom',
  period_month_to:  'monthTo',
  period_year_to:  'yearTo',
  employment_description:  'employmentDescription'
}
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
    width                 : '60%',
  }
}

class EditEmployment extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      country: "United States",
      countryId: "231",
      state: "Alabama",
      stateId: "3919",
      city: "Anchorage",
      addAndSaveMsgShow: false,
      attendedFrom: new Date(),
      employmentDetails: [],
      attendedTo: new Date()
    }
    this.allCountries = csc.getAllCountries()
  }
  componentDidMount(){
    this.props.getData()
  }
  componentWillReceiveProps(newProps, nextProps) {
    // const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    if(!isEmpty(newProps.record) && !this.state.id) {
      const keys = Object.keys(newProps.record)
      let newState = Object.assign({}, this.state)
      keys.map(key => {
        const fieldVal = educationFields[key] || key
        newState[fieldVal] = newProps.record[key]
        return key
      })
      // console.log("-------",newState)
      newState.attendedFrom = new Date(newProps.record.from_date)
      newState.attendedTo = new Date(newProps.record.to_date)
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


  handleEmploymentDetails = (e) => {
    const {companyName, country, state, city, attendedFrom, attendedTo, roleInCompany, companyTitle, employmentDescription, isEdit} = this.state;
    let allEmploymentDetails = this.state.employmentDetails;
    let ifAddAndSave = e.target.id !== "saveEmp"
    let employmentDetails = {
      company_name:  companyName,
      country:  country,
      state:  state,
      city:  city,
      title:  companyTitle,
      role:  roleInCompany,
      from_date: attendedFrom,
      to_date: attendedTo,
      employment_description:  employmentDescription
    }

    if(isEdit && attendedFrom && attendedFrom && companyName && roleInCompany){
      this.updateRecord(employmentDetails)
      this.setState({employmentDetails: allEmploymentDetails, employmentModal: ifAddAndSave, companyName:"", country:"", state:"", city:"",attendedFrom:"", attendedTo:"", roleInCompany:"", companyTitle:"", employmentDescription:"", isEdit:false, addAndSaveMsgShow: ifAddAndSave})
      if(ifAddAndSave){
        this.props.setIfAddAndSave('editEmployment')
      }
    }else if(attendedFrom && attendedFrom && companyName && roleInCompany){
      allEmploymentDetails.push(employmentDetails)
      // if (!ifAddAndSave) {
        this.submitData()
      // }
      this.setState({employmentDetails: allEmploymentDetails, employmentModal: ifAddAndSave, companyName:"", country:"", state:"", city:"",attendedFrom:"", attendedTo:"", roleInCompany:"", companyTitle:"", employmentDescription:"", isEdit:false, addAndSaveMsgShow: ifAddAndSave})
      if(ifAddAndSave){
        this.props.setIfAddAndSave('editEmployment')
      }
    }else{
      this.setState({
        companyNameError: typeof(companyName) === "undefined" || companyName === "",
        roleInCompanyError: typeof(roleInCompany) === "undefined" || roleInCompany === ""
      })
    }
  }

  updateRecord = (employment) => {
    this.props.updateEmployment(employment, this.state.uuid)
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
        employments_attributes: this.state.employmentDetails,
      }
    }
    this.props.updateProfile(data)
  }

  selectCountry = (e) => {
    let countryId = e.target.options[e.target.selectedIndex].id;
    this.setState({country: e.target.value, countryId: countryId})
  }
  selectState = (e) => {
    let stateId = e.target.options[e.target.selectedIndex].id;
    this.setState({state: e.target.value, stateId: stateId})
  }
  selectCity = (e) => {
    this.setState({city: e.target.value})
  }

  handleFromDateChange = date => {
    this.setState({
      attendedFrom: date
    })
  }

  handleToDateChange = date => {
    this.setState({
      attendedTo: date
    })
  }


  render() {
    const {lgShow, setLgShow} = this.props;
    const allStates = csc.getStatesOfCountry(this.state.countryId)
    const allCities = csc.getCitiesOfState(this.state.stateId)
    const { addAndSaveMsgShow, title, employment_description,companyName, companyNameError, company_name, country, state, city, companyTitle, roleInCompany, roleInCompanyError, role,employmentDescription, attendedFrom, attendedTo} = this.state;

    let months = [];
    let month = f=>Array.from(Array(12),(e,i)=>new Date(25e8*++i).toLocaleString('en-US',{month:f}))
    for(let index = 0; index <=11; index++) {
      months.push(month`long`[index])
    }

    return (
        <Modal isOpen={lgShow} style={customStyles} onRequestClose={setLgShow}>
          <div className="" id="addEmployment">
              {addAndSaveMsgShow && <FlashMessage duration={5000} persistOnHover={true}>
                <p className="success-note">Details are saved you can add more.</p>
              </FlashMessage>}
            <div className="modal-header">
              <button type="button" onClick={setLgShow} className="close" data-dismiss="modal" aria-label="Close"><img src={closeIcon} alt="close" /></button>
              <h4 className="modal-title" id="myModalLabel">Add Employment</h4>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Company</label>
                  <input type="text" name="companyName" value={companyName || company_name} onChange={this.handleChange} className="form-control" />
                  {companyNameError && <p id = "firstName" className="error-field" >This field can not be blank.</p>}
                </div>
                <div className="row">
                  <div className="col-sm-12 nopad">
                    <label>Location</label>
                  </div>

                  <div className="col-sm-4 col-xs-12">
                    <div className="form-group">
                    <select className="form-control" value={country} onChange={this.selectCountry}>
                      {
                        this.allCountries.map((country, index) => {
                          return <option key={`year${index}`} id={country.id} value={country.name}>{country.name}</option>
                        })
                      }
                    </select>
                    </div>
                  </div>
                  <div className="col-sm-4 col-xs-12">
                    <div className="form-group">
                    <select className="form-control" value={state} onChange={this.selectState}>
                      {
                        allStates.map((state, index) => {
                          return <option key={`year${index}`} id={state.id} value={state.name}>{state.name}</option>
                        })
                      }
                    </select>
                    </div>
                  </div>
                  <div className="col-sm-4 col-xs-12">
                    <div className="form-group">
                      <select className="form-control" value={city} onChange={this.selectCity}>
                        {
                          allCities.map((city, index) => {
                            return <option key={`year${index}`} id={city.id} value={city.name}>{city.name}</option>
                          })
                        }
                      </select>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Title</label>
                  <input type="text" name="companyTitle" value={companyTitle || title} onChange={this.handleChange} className="form-control" />
                </div>
                <div className="row">
                  <div className="col-sm-5 col-xs-12 nopad">
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Role</label>
                      <input
                        className="form-control"
                        value={roleInCompany || role}
                        name="roleInCompany"
                        onChange={this.handleChange}
                       />

                      {roleInCompanyError && <p id = "firstName" className="error-field" >This field can not be blank.</p>}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div>
                      <label>Period</label>
                    </div>
                    <div className="col-md-12 nopad">
                      <div className="input-group tf_loca tf-datepicker">
                      <DatePicker
                          selected={new Date(attendedFrom)}
                          onChange={this.handleFromDateChange}
                          className="form-control mn_input"
                          dateFormat="yyyy-MM-dd"
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                        />
                      </div>
                      {/* {attendedFromError && <p id = "firstName" className="error-field" >This field can not be blank.</p>} */}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div>
                      <label>through</label>
                    </div>
                    <div className="col-md-12 nopad">
                      <div className="input-group tf_loca tf-datepicker">
                      <DatePicker
                          selected={new Date(attendedTo)}
                          minDate={attendedFrom}
                          onChange={this.handleToDateChange}
                          className="form-control mn_input"
                          dateFormat="yyyy-MM-dd"
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                        />
                      </div>
                      {/* {attendedFromError && <p id = "firstName" className="error-field" >This field can not be blank.</p>} */}
                    </div>
                  </div>
                </div>

                <div className="form-group">

                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Description (Optional)</label>
                  <textarea name="employmentDescription" value={employmentDescription || employment_description} onChange={this.handleChange} className="form-control" rows="5"></textarea>
                </div>
              </form>
            </div>
            <div className="footer-btn-section">
              <button onClick={setLgShow} type="button" className="cancel-md-btn" data-dismiss="modal">Cancel</button>
              <button type="button" id="saveAndAddEmp" onClick={this.handleEmploymentDetails} className="save-add-md-btn">Save and Add More</button>
              <button type="button" id="saveEmp" onClick={this.handleEmploymentDetails} className="save-md-btn">Save</button>
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
    updateEmployment: (data, id) => dispatch(updateEmployment(data, id)),
    logOut: () => dispatch(logOutAction()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditEmployment)
