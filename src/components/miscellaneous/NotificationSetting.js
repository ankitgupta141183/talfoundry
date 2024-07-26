import React, {Component} from 'react';
import { connect } from "react-redux";
import {getNotificationSettingsDetails,updateNotificationSettings} from '../../Actions/NotificationsActions';
import SuccessSweetAlert from '../CommonComponets/SweetAlert/SuccessSweetAlert';

let iterator  = 0

class NotificationSetting extends Component{

  constructor(props){
    super(props)
    this.state = {
      notificationDetails: {},
      updateSuccess: false
    }
  }

  componentDidMount(){
    this.getNotificationData()
  }


  getNotificationData = () => {
    this.props.getNotificationSettingsDetails(this.props.currentUser.user_id).then
      (
        data => {

          if(data){
            this.setState({notificationDetails: data.data})
          }
       }
    ).catch(err => {
      return alert('unable to fetch')
    })
  }

  handleCheckBoxChange = (e) => {
   let data = {}
   let id = this.props.currentUser.id || this.props.currentUser.user_id
   data[e.target.name] = e.target.checked
   this.updateNotification(id ,data)
  }

  handleDropDownChange = (e) => {
    let data = {}
    let id = this.props.currentUser.id || this.props.currentUser.user_id
    data[e.target.name] = e.target.value

    if(e.target.name === "send_an_email_for"){
      if(e.target.value === "All Activity"){
        data["email_duration"] = "Once a day"
      }
      else{
        data["email_duration"] = ""
      }
    }
    this.updateNotification(id ,data)
  }

  updateNotification =  (id,data) => {
    this.props.updateNotificationSettings(id,data).then(
       () => {

         this.getNotificationData()
         this.setState({updateSuccess: true})
         iterator = iterator + 1
          setTimeout(() => {
            this.setState({updateSuccess: false})
          }, 3000)
        }
    )
  }

  render(){
    let {notificationDetails} = this.state;
    // const {currentUser} = this.props;
    return(
      <React.Fragment>
        {/* <div className="app-pro2-swal">
        <SweetAlert
          show={this.state.updateSuccess}
          success
          title="Success!"
          html
          text={'Hello'}
          onConfirm={() => this.setState({ updateSuccess: false })}
          >
          Notification Settings Updated
          </SweetAlert>
      </div> */}
      {
        this.state.updateSuccess &&  
        <SuccessSweetAlert 
      show={this.state.updateSuccess}
      handleConfirm={() => this.setState({ updateSuccess: false })}
      message={"Notification Settings Updated."}
      />
      }
      
        <div className="tf_job_posting ">
          <div className="mn_heading">
            <h5 className="info_number">Messages</h5>
            <div className="pull-right">
              {/* <Link><img src={editImg}  alt="edit" align=""/></Link> */}
            </div>
          </div>
          <div className="clearfix"></div>
          <div className="col-md-12 tf_desktop">
            <h4>Email</h4>
            <p>(Sending to {this.props.currentUser.email})</p>
            <div className="clearfix"></div>
          </div>
          <div className="col-md-6">
            <div className="input-group">
              <label className="control-label">Send an email with unread activity for:</label>
              <div className="clearfix"></div>
              <div className="selectedwrap">
                <select className="form-control mn_input2" name="send_an_email_for"
                value={notificationDetails.send_an_email_for || ''} onChange={this.handleDropDownChange}>
                  <option disabled value="">Select</option>
                  <option value="All Activity">All Activity</option>
                  <option value="Nothing">Nothing</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="input-group">
              <label className="control-label">&nbsp;</label>
              <div className="clearfix"></div>
              <div className="selectedwrap">
                <select className="form-control mn_input2" name="email_duration"
                  value={notificationDetails.email_duration || ''}
                  onChange={this.handleDropDownChange}
                  disabled={
                    notificationDetails.send_an_email_for === "Nothing"
                     ||
                     notificationDetails.send_an_email_for === ""
                     }>
                  <option disabled value="">Select</option>
                  <option value="Once a day">Once a Day</option>
                  <option value="Once an hour">Once an Hour</option>
                </select>
              </div>
            </div>
          </div>
          <div className="clearfix"></div>
        </div>
        <div className="tf_job_posting tf_top">
          <div className="mn_heading">
            <h5 className="info_number">Other Talfoundry Email Updates</h5>
          </div>
          <div className="clearfix"></div>
          <div className="col-md-12 tf_desktop tf_top">
            <p>Send email notification to {this.props.currentUser.email} when…</p>
            <div className="clearfix"></div>
          </div>

            <div className="col-md-12">

                  <div className="tf_sound tf_sound1">
                                <input type="checkbox"
                                 onClick={this.handleCheckBoxChange} defaultChecked={notificationDetails.a_job_posting_will_expire_soon} name="a_job_posting_will_expire_soon" id="job1"/>
                                <label htmlFor="job1">A job posting will expire soon</label>
                    </div>
                    <div className="tf_sound tf_sound1">
                                  <input type="checkbox" onClick={this.handleCheckBoxChange} defaultChecked={notificationDetails.a_job_posting_expired} name="a_job_posting_expired" id="job2"/>
                                  <label htmlFor="job2">A job posting expired</label>
                    </div>


                    <div className="tf_sound tf_sound1">
                                  <input type="checkbox" onClick={this.handleCheckBoxChange} defaultChecked={notificationDetails.an_invitation_is_received} name="an_invitation_is_received" id="job3"/>
                                  <label htmlFor="job3">An invitation is received</label>
                    </div>


                    <div className="tf_sound tf_sound1">
                                  <input type="checkbox" onClick={this.handleCheckBoxChange} defaultChecked={notificationDetails.a_job_is_closed} name="a_job_is_closed" id="job4"/>
                                  <label htmlFor="job4">A job I applied to has been cancelled or closed</label>
                    </div>



                    <div className="tf_sound tf_sound1">
                                  <input type="checkbox" onClick={this.handleCheckBoxChange} defaultChecked={notificationDetails.an_offer_is_received} name="an_offer_is_received" id="job5"/>
                                  <label htmlFor="job5">A hire is made or a contract begins</label>
                    </div>

                    <div className="tf_sound tf_sound1">
                            <input type="checkbox" onClick={this.handleCheckBoxChange} defaultChecked={notificationDetails.requested_changes} name="requested_changes" id="job6"/>
                            <label htmlFor="job6">Requested Changes</label>
                    </div>
              </div>

        </div>
      </React.Fragment>
    )
  }
}




const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = (dispatch) => {
  return {
    getNotificationSettingsDetails: (id) => dispatch(getNotificationSettingsDetails(id)),
    updateNotificationSettings: (id,data) => dispatch(updateNotificationSettings(id,data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationSetting)
