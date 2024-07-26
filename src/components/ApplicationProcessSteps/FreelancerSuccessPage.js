import React, {Component} from "react";
import { connect } from "react-redux";
import Footer from '../miscellaneous/Footer';
import inviteImg from '../../static/images/invite.png'
import {Link} from 'react-router-dom';
import {logOutAction} from '../../Actions/logOutAction';
import AppProcessHeader from "../miscellaneous/AppProcessHeader";
import { getUserRedirection } from '../../utills/formatting'
import {getCurrentUserDetails} from '../../Actions/applicationActions';

class FreelancerSuccessPage extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
    }
  }

  componentDidMount() {
    this.props.getCurrentUserDetails()
    .then((details) => {
      const { hasRedirection, path } = getUserRedirection(details)
        if((hasRedirection) && (path !== '/security-questions')) {
          this.props.history.push(path)
        }
    })
  }

  render() {
    return (
      <div>
        <AppProcessHeader history={this.props.history} />
        <div className="mn_center interviewsheduled-sec">
          <div className="tf_inter">
            <div className="container">
              <div className="col-md-10 col-md-offset-1 mt_19">
                <div className="tf_kudo">
                  <h2>Kudos! You have successfully completed your sign up with Talfoundry</h2>
                  <img src={inviteImg} alt="inviteImg"/>
                  <p>If you have questions please write us on <Link href="#">admin@talfoundry.com</Link></p>
                  <button
                   onClick={() =>
                    this.props.history.push({
                      pathname: '/security-questions',
                      state: { fromFreelancerSuccess: true
                      }})} className="create-btn">
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    )
  }
}
const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logOutAction()),
    getCurrentUserDetails: () => dispatch(getCurrentUserDetails()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(FreelancerSuccessPage)
