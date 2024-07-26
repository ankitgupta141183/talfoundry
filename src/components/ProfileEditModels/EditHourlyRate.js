import React, {Component} from "react";
import {logOutAction} from '../../Actions/logOutAction';
import { connect } from "react-redux";
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
    width                 : '60%',
  }
}

class EditHourlyRate extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      hourlyRate: props.value
    }
  }

  componentWillReceiveProps(newProps, nextProps) {
    if(!this.state.hourlyRate) {
      this.setState({hourlyRate: newProps.value})
    }
  }

  onValChange = (event) => {
    if(event.target.value >= 0) {
      this.setState({ hourlyRate: event.target.value })
    }
  }

  submitData = () => {
    const data = {
      profile: {
        hourly_rate: this.state.hourlyRate
      }
    }
    this.props.updateProfile(data)
  }


  handleRateChange = (e) => {
    if (e.target.value === 0) {
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
      console.log("result")
    }
  }

  handleRateBlur = (e) => {
    this.setState({[e.target.name]: !isNaN(parseFloat(e.target.value).toFixed(2)) ? parseFloat(e.target.value).toFixed(2) : ""})
  }


  render() {
    const {lgShow, setLgShow} = this.props;
    const { hourlyRate } = this.state;

    return (
        <Modal isOpen={lgShow} onRequestClose={setLgShow} style={customStyles}>
          <div className="modal-content overview-modal">
            <div className="modal-header">
              <h4 className="modal-title" id="myModalLabel">Change Hourly Rate</h4>
            </div>
            <div className="modal-body">
              <div className="col-md-12">
                <p className="m-md-bottom">
                  Please note that your new hourly rate will only apply to new contracts.
                  <span className="ng-scope">
                    The Talfoundry Service Fee is 5% when you begin a contract with a new client. Once you bill over $500 with your client, the fee will be 2.5%.
                  </span>
                </p>
              </div>
              <div className="col-md-12">
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
                        value={hourlyRate}
                        name="hourlyRate"
                        onChange={this.onValChange}
                        defaultValue={hourlyRate}
                        onBlur={this.handleRateBlur}
                        placeholder="0.00"
                    />
                  </div>
                </div>
                <div className="col-md-2 col-sm-4 col-xs-2 tf_hr">
                  <h5>/Hr</h5>
                </div>
                <div className="clearfix"></div>
                <div className="col-md-12 tf_percent nopad">
                  <div className="col-md-6 col-sm-12 nopad">
                    <h5><b>3% TalFoundry Service Fee </b><a href="#">Explain this</a></h5>
                  </div>
                  <div className="col-md-4 col-sm-8 col-xs-10 resp_nopad tf_percent_1">
                    <h5>$</h5>
                    <p>{isNaN(hourlyRate * 3/100) ? "00" : (hourlyRate * 3/100).toFixed(2)}</p>
                  </div>
                  <div className="col-md-2 col-sm-4 col-xs-2 tf_hr_1">
                    <h5>/Hr</h5>
                  </div>
                </div>

                <div className="clearfix"></div>
                <div className="col-md-12 nopad">
                  <div className="col-md-6 col-sm-12 tf_hr nopad">
                    <h3>You’ll Receive</h3>
                    <p>The estimated amount you’ll receive after service fees</p>
                  </div>
                  <div className="col-md-4 col-sm-8 col-xs-10  you-receive">
                    <div className="input-group tf_loca">
                      <h5>$</h5>
                      <p>{isNaN(hourlyRate - hourlyRate * 3/100) ? "00" : (hourlyRate - hourlyRate * 3/100).toFixed(2) }</p>
                    </div>
                  </div>
                  <div className="col-md-2 col-sm-4 col-xs-2 tf_hr">
                    <h5>/Hr</h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="clearfix"></div>
            <hr/>
            <div className="modal-footer tf_btns">
              <button type="button" className="btn btn-default" onClick={setLgShow}>Cancel</button>
              <button type="button" className="btn btn-primary" onClick={this.submitData}>Save</button>
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
    logOut: () => dispatch(logOutAction()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditHourlyRate)