import React, { Component } from "react";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
export default class CreateProfileFormSection5 extends Component {

  constructor(props){
    super(props)
    this.state = {
      start_date: new Date(),
      hoursAvailable: '',
      hoursAvailableError: false,
    }
  }


  handleDateChange = (date) => {
    this.setState({
      start_date: date,
    })

    this.props.setStartDate(date)
  }

  handleChange = (e) => {
    // let {hoursAvailable} = this.state
    let name = e.target.name
    let value = e.target.value
    this.props.setData(e.target.name,e.target.value)
    this.setState({[name]: e.target.value}, () => {
        if(name === "hoursAvailable"){
        if(value.length > 0){
          this.setState({
            hoursAvailableError: false
          })
        }
      }

    })
  }


  handleContinue = (e) => {
    e.preventDefault();
    let {hoursAvailable} = this.state
    if(hoursAvailable && hoursAvailable.length){
      this.props.handleContinue('step4' , "step5");
    }
    if(!hoursAvailable || (hoursAvailable && !hoursAvailable.length) ){
      this.setState({hoursAvailableError: true})
    }

  }

  fieldError = (message) => {
    return (
      <p id="firstName" className="error-field">
        {message ? message : "This field can't be blank."}
      </p>
    )
  }


  render() {
    let {hoursAvailableError} = this.state
    return (
      <div className="tf_profile_ur tf_overview">

                  <div className="col-md-12">
                    <h4>Add Your Availability</h4>
                  </div>
                  <div className="clearfix"></div>
                  <hr />
                  <div className="col-md-12">
                    <div className="col-md-12">
                      <div className="col-md-12 every-section-light-blue-color">
                        <div className="col-md-8">
                          <label className="">How many hours do you have available for work each week?*</label>

                          <div className="input-group tf_loca">
                            <div className="selectedwrap">
                              <select
                                style={{ fontSize: "14px", height: "48px" }}
                                name="hoursAvailable"
                                onChange={this.handleChange}
                                className="form-control mn_input mySelectBoxClass select-hours-of-work"
                              >
                                <option selected disabled>
                                  Select hours
                                </option>
                                <option value="Less than 40 hours">Less than 40 hours</option>
                                <option value="More than 40 hours">More than 40 hours</option>
                              </select>
                            </div>
                            {hoursAvailableError && (
                              <p id="firstName" className="error-field">
                                You must specify how much hours you can give to
                                TalFoundry
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-md-4">
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="clearfix"></div>


                  <div className="col-md-12">
                    <div className="col-md-12">
                      <div className="col-md-12 every-section-light-blue-color">

                      <div className="col-md-8">
                        <label className=""> Preferred Start Date</label>
                        <div className="input-group tf_loca tf-datepicker">
                          <DatePicker
                            selected={this.state.start_date}
                            name="start_date"
                            onChange={this.handleDateChange}
                            minDate={new Date()}
                            className="form-control mn_input"
                            style={{
                              fontSize: "14px",
                              height: "48px",
                            }}
                          />
                      </div>
                    </div>

                    </div>
                    </div>
                  </div>
                 {!this.props.showStep5 && <div className="tf_continue">
                  <Link onClick={(event) => this.handleContinue(event)}>
                        CONTINUE{" "}
                        <span>
                          <i
                            className="fa fa-angle-right"
                            aria-hidden="true"
                          ></i>
                        </span>
                  </Link>
                  </div>
                  }


            </div>
    )
  }
}
