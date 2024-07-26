import React, {Component} from "react";
import {logOutAction} from '../../Actions/logOutAction';
import { connect } from "react-redux";
import Modal from 'react-modal';
import closeIcon from '../../static/images/close-icon.png';
import { updateCertificate } from '../../Actions/freelancerActions';
import { isEmpty } from 'lodash';
import CERTIFICATIONS from '../../constants/certifications';
import csc from 'country-state-city'
import outlineEdit from "../../static/images/outline-edit-24px.svg";
import outlineDelete from "../../static/images/outline-delete-24px.svg";
import loadMoreSrc from "../../static/images/loadMore.gif";

const certificationFields = {
  certification_name: 'certificationName',
  certification_link: 'certificationLink'
}

const customStyles = {
  content : {
    top                   : '45%',
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

class EditCertification extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      certificationStep2: false,
      certificationStep1: true,
      addAndSaveMsgShow: false,
      certificationDetails: [],
      certificationModal: false,
      editCertificate: '',
      editCertificateValue: '',
      editCertificateError: false,
      updateCertificateInProgress: false
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
        this.props.setIfAddAndSave('editCertification')
      }
    }else{
      allCertificationDetails.push(certification)
      this.submitData('addNewCertificate')
      this.setState({certificationDetails: ifAddAndSave ? allCertificationDetails : [], certificationModal: ifAddAndSave, certificationName: "",
      certificationLink: "", isEdit:false, addAndSaveMsgShow: ifAddAndSave, certificationStep1: true, certificationStep2: false})
      if(ifAddAndSave){
        this.props.setIfAddAndSave('editCertification')
      }
    }
  }


  handleEndDateChange = date => {
    this.setState({
      attendedTo: date
    })
  }

  submitData = (type) => {
    const data = {
      profile: {
        certifications_attributes: this.state.certificationDetails,
      }
    }
    this.props.updateProfile(data,type)
  }


  handleCertificateChange = (e) => {
    if(e.target.value && e.target.value.length) {
      this.setState({
        editCertificateError: false,
        editCertificateValue: e.target.value
      })
    }
    else{
     this.setState({
        editCertificateError: true
      })
    }
  }

  openEdit = (record) => {
    this.setState({
      editCertificate: record.uuid,
      editCertificateValue: record.certification_name
       })

  }

  closeEdit = (e) => {
    e.preventDefault()
    this.setState({
      editCertificate: '',
    })
  }


  handleUpdate = (e) => {
    let {editCertificateValue} = this.state
    let  idToSend = e.target.dataset.id

    if(!editCertificateValue || editCertificateValue.length === 0){
      this.setState({editCertificateError: true})
    }
    else {
      this.setState({editCertificateError: false,updateCertificateInProgress: true})
      console.log('editCertificateValue,e.target.dataset.id',editCertificateValue,idToSend)

      this.props.updateCertificate({certification_name: editCertificateValue},idToSend).then((res) => {
        if([200, 201].includes(res.status)) {
          this.setState({editCertificate: '',updateCertificateInProgress: false})
           this.props.getData(this.props.profileUuid)
        }
      })
    }
  }


  render() {
    const {lgShow, setLgShow,certificationList,deleteInProgress,updateProfileInProgress} = this.props;
    const {certificationName, certificationNameError, certificationLink,
      certificationLinkError, certificationStep1, editCertificateValue, certificationStep2,
      editCertificateError,updateCertificateInProgress}
        = this.state;
    let months = [];
    let month = f=>Array.from(Array(12),(e,i)=>new Date(25e8*++i).toLocaleString('en-US',{month:f}))
    for(let index = 0; index <=11; index++) {
      months.push(month`long`[index])
    }
    let certificateOptions = []
    let certificationOptions2 = []

    certificateOptions.unshift(<option key={'select'} value="" disabled>Select One </option>)
    certificateOptions = CERTIFICATIONS.map((el, idx)=> {
      return <option key={el.name}>{el.name}</option>
    })

    certificationOptions2 = certificateOptions

    return (
        <Modal isOpen={lgShow} style={customStyles} onRequestClose={setLgShow}>
          <div id="addEmployment">
            <div className="modal-header">
              <button type="button" onClick={setLgShow} className="close" data-dismiss="modal" aria-label="Close"><img src={closeIcon} alt="close" /></button>
              <h4 className="modal-title" id="myModalLabel">Certifications</h4>
            </div>
            <div className="modal-body">

            <div className="col-md-12 certifications">
                {certificationList ? (
                  certificationList.map(
                    (record, idx) => {
                      return (
                        <div key={idx} className="tf_employe1" id="edit-or-delete-certificate">
                          {
                            record.uuid !== this.state.editCertificate
                            ?
                            <React.Fragment>
                              <h5 style={{fontSize: '12px'}}>
                                {record.certification_name}
                                <p to={"#"} className="pull-right">
                                  <img
                                    height='20px'
                                    className="delete-certificate mr-10"
                                    src={outlineDelete}
                                    title="delete certificate"
                                    onClick={() => this.props.deleteCertification(
                                      record.uuid
                                    )}
                                    alt=""
                                  />
                                  <img
                                    height='20px'
                                    src={outlineEdit}
                                    title="edit certificate"
                                    onClick={() => this.openEdit(record)}
                                    alt="edit"
                                    className="edit-certificate"
                                  />
                                </p>
                              </h5>
                              <hr />
                              </React.Fragment>
                              :

                              <div className="row mb-10">
                                <div className="col-md-9">
                                  <select
                                      style={{
                                        height: '35px',
                                        fontSize: '12px',
                                        marginLeft: '-20px',
                                      }}
                                      className="form-control"
                                      defaultValue="select certificate"
                                      value={editCertificateValue}
                                      name="editCertificateValue"
                                      onChange={this.handleCertificateChange}>
                                    {certificateOptions}
                                  </select>
                                  {editCertificateError ?
                                     <p id = "firstName" className="error-field" >This field can not be blank.</p>
                                     : ''
                                   }
                                </div>
                                <div className="col-md-3 nopad">
                                  <button className="edit-popup-edit-certificate-cancel-button" onClick={(e) => this.closeEdit(e)}> Cancel </button>
                                  <button className="edit-popup-edit-certificate-save-button" onClick={(e) => this.handleUpdate(e)} data-id={record.uuid}> Save </button>
                                </div>
                                <div className="clearfix"></div>
                                  <hr className=""/>
                              </div>
                            }
                        </div>
                      )
                    }
                  )
                ) : (
                  <p className="text-center">No items to display.</p>
                )}

                {
                  deleteInProgress ?
                  <p
                 style={{
                  fontSize: '13px',
                  color: '#404040',
                  float: 'right'
                 }}
                 >
                <span className="mr-10">
                   Deleting
                 </span>
                 <img src={loadMoreSrc} alt=""/>
                 </p>
                  : ''
                }

                {
                  updateProfileInProgress ?
                  <p
                   style={{
                    fontSize: '13px',
                    color: '#404040',
                    float: 'right'
                   }}
                 >
                <span className="mr-10">
                   Loading Certifications
                 </span>
                 <img src={loadMoreSrc} alt=""/>
                 </p>
                  : ''
                }

                {
                  updateCertificateInProgress ?
                  <p
                   style={{
                    fontSize: '13px',
                    color: '#404040',
                    float: 'right'
                   }}
                 >
                <span className="mr-10">
                   Updating Certificate
                 </span>
                 <img src={loadMoreSrc} alt=""/>
                 </p>
                  : ''

                }



              </div>

              <form>
                {certificationStep1 && <div className="row">
                  <div className="col-sm-12 col-xs-12">
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Add more certification</label>
                      <select className="form-control" defaultValue="select certificate" value={certificationName} name="certificationName" onChange={this.handleChange}>
                        {certificationOptions2}
                      </select>
                      {certificationNameError && <p id = "firstName" className="error-field" >This field can not be blank.</p>}
                    </div>
                  </div>
                </div>}
                {certificationStep2 && <div className="col-md-12 nopad">
                  <div className="input-group tf_loca">
                    <h5>
                      <b>
                      Selected -  {certificationName}
                      </b>
                      </h5>
                    <p style={{fontSize:'11px',fontStyle: 'italic'}}>
                      If you have earned an {certificationName} then paste the link the box below.</p>
                    <input type="text" className="mn_input" name="certificationLink" value={certificationLink} onChange={this.handleChange} placeholder="Paste URL Here"/>
                    {certificationLinkError && <p id = "firstName" className="error-field" >This field can not be blank.</p>}
                  </div>
                </div>}
              </form>
            </div>
            <div className="footer-btn-section">
              <button onClick={setLgShow} type="button" className="cancel-md-btn" data-dismiss="modal">Cancel</button>
              {certificationStep1 && <button type="button" id="saveEmp" onClick={this.handleCertificationNext} className="save-md-btn">Next</button>}
              {certificationStep2 &&  <button type="button" id="saveCertification" onClick={this.handleCertificationDetails} className="save-md-btn">Save</button>}
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

export default connect(mapStateToProps, mapDispatchToProps)(EditCertification)
