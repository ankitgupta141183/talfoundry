import React, {Component} from "react";
import {logOutAction} from '../../Actions/logOutAction';
import { connect } from "react-redux";
import closeIcon from '../../static/images/close-icon.png';
import Modal from 'react-modal';
import { updateCertificate } from '../../Actions/freelancerActions';
import { isEmpty } from 'lodash';
import csc from 'country-state-city'

const certificationFields = {
  certification_name: 'certificationName',
  certification_link: 'certificationLink'
}

const customStyles = {
  content : {
    top                   : '35%',
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

class ShowCertification extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      certificationStep2: false,
      certificationStep1: true,
      addAndSaveMsgShow: false,
      certificationDetails: [],
      certificationModal: false
    }
    this.allCountries = csc.getAllCountries()
  }

  componentWillReceiveProps(newProps, nextProps) {
    if(!isEmpty(newProps.record) && !this.state.id) {
      const keys = Object.keys(newProps.record)
      let newState = Object.assign({}, this.state)
      keys.map(key => {
        const fieldVal = certificationFields[key] || key
        newState[fieldVal] = newProps.record[key]
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

  handleCertificationNext = () => {
    if(typeof(this.state.certificationName) === "undefined" || this.state.certificationName === "")
      this.setState({certificationNameError: true})
    else{
      this.setState({certificationStep1: false, certificationStep2: true, })
    }
  }

  handleCertificationDetails = (e) => {
    const {certificationName, certificationLink, isEdit} = this.state;
    let allCertificationDetails = this.state.certificationDetails;
    let ifAddAndSave = e.target.id !== "saveCertification"
    let certification = {
      certification_name: certificationName,
      certification_link: certificationLink
    }
    if(isEdit){
      this.updateRecord(certification)
      this.setState({certificationDetails: allCertificationDetails, certificationModal: ifAddAndSave, certificationName: "",
      certificationLink: "", isEdit:false, addAndSaveMsgShow: ifAddAndSave, certificationStep1: true, certificationStep2: false})
      if(ifAddAndSave){
        this.props.setIfAddAndSave('showCertification')
      }
    }else{
      allCertificationDetails.push(certification)
      this.submitData()
      this.setState({certificationDetails: ifAddAndSave ? allCertificationDetails : [], certificationModal: ifAddAndSave, certificationName: "",
      certificationLink: "", isEdit:false, addAndSaveMsgShow: ifAddAndSave, certificationStep1: true, certificationStep2: false})
      if(ifAddAndSave){
        this.props.setIfAddAndSave('showCertification')
      }
    }
  }

  updateRecord = (certificate) => {
    this.props.updateCertificate(certificate, this.state.uuid)
    .then((res) => {
      if([200, 201].includes(res.status)) {
        this.props.getData(this.props.profileUuid)
        this.props.setLgShow()
      }
    })
  }

  handleEndDateChange = date => {
    this.setState({
      attendedTo: date
    })
  }

  submitData = () => {
    const data = {
      profile: {
        certifications_attributes: this.state.certificationDetails,
      }
    }
    this.props.updateProfile(data)
  }


  render() {
    const {lgShow, setLgShow,certificationList} = this.props;
    // const {certificationName} = this.state;
    let months = [];
    let month = f=>Array.from(Array(12),(e,i)=>new Date(25e8*++i).toLocaleString('en-US',{month:f}))
    for(let index = 0; index <=11; index++) {
      months.push(month`long`[index])
    }
    return (
        <Modal isOpen={lgShow} style={customStyles} onRequestClose={setLgShow}>
          <div id="addEmployment">
            <div className="modal-header">
              <button type="button" onClick={setLgShow} className="close" data-dismiss="modal" aria-label="Close"><img src={closeIcon} alt="close" /></button>
              <h4 className="modal-title ml-10" id="myModalLabel">Show Certifications</h4>
            </div>
            <div className="modal-body">

            <div className="col-md-12 certifications">
                {certificationList ? (
                  certificationList.map(
                    (record, idx) => {
                      return (
                        <div key={idx} className="tf_employe1">
                          <h5>
                            {record.certification_name}
                            <p to={"#"} className="pull-right">
                            </p>
                          </h5>
                          <hr />
                        </div>
                      );
                    }
                  )
                ) : (
                  <p className="text-center">No items to display.</p>
                )}
              </div>
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
    updateCertificate: (data, id) => dispatch(updateCertificate(data, id)),
    logOut: () => dispatch(logOutAction()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowCertification)
