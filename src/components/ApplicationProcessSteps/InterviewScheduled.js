import React, {Component} from "react";
import { connect } from "react-redux";
import Footer from '../miscellaneous/Footer';
import inviteImg from '../../static/images/invite.png'
import {Link} from 'react-router-dom';
import {logOutAction} from '../../Actions/logOutAction';
import AppProcessHeader from "../miscellaneous/AppProcessHeader";
class InterviewScheduled extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <AppProcessHeader history={this.props.history} />
        <div className="mn_center interviewsheduled-sec">
          <div className="tf_inter">
            <div className="container">
              <div className="col-md-10 col-md-offset-1">
                <div className="tf_kudo">
                  <h2>Kudos! Your Initial Interview is scheduled.</h2>
                  <p>This call doesn’t require any prep work on your part. We have sent you further instructions about how to attend the Interview. Please check your mail and follow the instructions.</p>
                  <img src={inviteImg} alt="inviteImg"/>
                  <p>If you have questions please write us on <Link href="#">admin@talfoundry.com</Link></p>
                  <button onClick={() => this.props.history.push('/create-profile')} className="create-btn">
                    Create Your Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = (dispatch) => {

  return {
    logOut: () => dispatch(logOutAction())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(InterviewScheduled)
