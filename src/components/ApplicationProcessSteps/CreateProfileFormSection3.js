import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class CreateProfileFormSection3 extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      hourlyRate: "",
      hourlyRateError: false,
    }
  }


  handleContinue = (e) => {
    e.preventDefault()
    const {
      hourlyRate
    } = this.state;

    if(!hourlyRate){
      this.setState({hourlyRateError: true})
    }


    if (hourlyRate) {
      this.setState({ hourlyRate }, () => {
        this.props.setData('hourlyRate',hourlyRate)
        this.props.handleContinue('step3' , "step4")
      })
    }
  }

  fieldError = (message) => {
    return (
      <p id="firstName" className="error-field">
        {message ? message : "This field can't be blank."}
      </p>
    )
  }

  handleRateBlur = (e) => {
    this.setState({[e.target.name]: !isNaN(parseFloat(e.target.value).toFixed(2)) ? parseFloat(e.target.value).toFixed(2) : ""})
  }


  handleRateChange = (e) => {
    if (e.target.value === 0) {
      // console.log(e.target.name,"e",e.target.value)
      this.setState({
        [e.target.name]: e.target.value,
        [e.target.name + "Error"]: true,
      })
    } else if (e.target.value > 0) {
      this.setState({
        [e.target.name]: e.target.value,
        [e.target.name + "Error"]: false,
        hourly_rate_error: false,
      })
    } else {
      this.setState({
        [e.target.name]: e.target.value,
        [e.target.name + "Error"]: false,
        hourly_rate_error: false,
      })
      console.log("result")
    }
  }


  render() {
    let { hourlyRate, hourlyRateError } = this.state;
    // let { step3 } = this.props
    return (
      <div className="tf_profile_ur tf_overview">
        <div className="col-md-12">
          <h4>Set Hourly Rate </h4>
        </div>

        <div className="clearfix"></div>
        <hr />

        <div className="col-md-12">
              <div className="col-md-12">

                <div className="Set-Hourly-Rate" id="Set-Hourly-Rate">
                  
                  <div className="col-md-12 every-section-light-blue-color ">
                  <div className="clearfix"></div>
                    <p>
                      The TalFoundry Service Fee is 5% when you begin a contract with a
                      new client. Once you bill over $500 with your client, the fee will
                      be 2.5%
                    </p>
                  </div>
                  
                  <div className="clearfix"></div>

                  <div className="col-md-12 every-section-light-blue-color">

                    <div className="col-md-6 col-sm-12 tf_hr nopad">
                      <h3>Hourly Rate</h3>
                      <p>Total amount the client will see</p>
                    </div>
                    <div className="col-md-4 col-sm-8 col-xs-10 resp_nopad">
                      <div className="input-group tf_loca">
                        <div className="input-group-addon_dollor">$</div>
                        <input
                          type="number"
                          className="form-control mn_input_3"
                          name="hourlyRate"
                          onBlur={this.handleRateBlur}
                          onChange={this.handleRateChange}
                          value={hourlyRate}
                          placeholder="0.00"
                        />
                        {hourlyRateError &&
                          this.fieldError("Hourly rate must be greater than 0")}
                      </div>
                    </div>
                    <div className="col-md-2 col-sm-4 col-xs-2 tf_hr">
                      <h5>/Hr</h5>
                    </div>
                    
                  </div>


                  <div className="clearfix"></div>



                  <div className="col-md-12 tf_percent every-section-light-blue-color">
                      <div className="col-md-6 col-sm-12 nopad">
                        <h5>
                          <b>3% TalFoundry Service Fee </b>
                          <Link href="#">Explain this</Link>
                        </h5>
                      </div>
                      <div className="col-md-4 col-sm-8 col-xs-10 resp_nopad tf_percent_1">
                        <h5>$</h5>
                        <p>
                          {isNaN((hourlyRate * 3) / 100)
                            ? "00"
                            : ((hourlyRate * 3) / 100).toFixed(2)}
                        </p>
                      </div>
                      <div className="col-md-2 col-sm-4 col-xs-2 tf_hr_1">
                        <h5>/Hr</h5>
                      </div>
                    </div>

                  <div className="clearfix"></div>

                  <div className="col-md-12 every-section-light-blue-color">
                    <div className="col-md-6 col-sm-12 tf_hr nopad">
                      <h3>You’ll Receive</h3>
                      <p>The estimated amount you’ll receive after service fees</p>
                    </div>
                    <div className="col-md-4 col-sm-8 col-xs-10  you-receive">
                      <div className="input-group tf_loca">
                        <h5>$</h5>
                        <p>
                          {isNaN(hourlyRate - (hourlyRate * 3) / 100)
                            ? "00"
                            : (hourlyRate - (hourlyRate * 3) / 100).toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="col-md-2 col-sm-4 col-xs-2 tf_hr">
                      <h5>/Hr</h5>
                    </div>
                  
                  </div>
                  
                </div>

              </div>
        </div>



            <div className="col-md-12">
              {
                !this.props.showStep4 && 
                  <div className="tf_continue">
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

          
            <div className="clearfix"></div>
        
      
      </div>
    )
  }
}
