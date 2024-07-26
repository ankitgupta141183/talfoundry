import React, {Component} from "react";
import { connect } from "react-redux";
import logo_1 from '../../static/images/logo/logo.svg'
import HPLogo from '../../static/images/Hewlett-Packard-Enterprise.png'
import UCSFLogo from '../../static/images/UCSF-logo.png'
import thumbtack from '../../static/images/thumbtack.png'
import udemy from '../../static/images/udemy.png'
import shopify from '../../static/images/shopify.png'
import motorola from '../../static/images/motorola.png'
import mailLogo from '../../static/images/confirm-mail.svg'
import {Link} from 'react-router-dom';
import {resendConfirmationLink} from '../../Actions/applicationActions';
class EmailConfirmation extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
    }
    }
    resendEmail = () => {
        const id =this.props.match.params.id
        this.props.resendConfirmationLink(id)
    }
  render() {
    return (
      <div>
        <div className="tf_center emailConfirmationPage">
            <div className="container">
                <div className="tf_centered">
                    <div className="tf_confirm">
                        <a href="/"><img src={logo_1} alt="logo1"/></a>
                        <img className="mailLogoIcon" src={mailLogo} alt="mailLogo"/>
                        <h2>Confirm Your Email</h2>
                        <p>Please take a moment to verify your email address. We sent an email with a verification link to <Link href="#">{this.props.location.state}</Link>. If you didn’t receive the email, check your spam folder, <Link href="#" onClick={this.resendEmail}>click here to resend it.</Link></p>
                    </div>
                </div>
                <div className="tf_top_company">
                    <h5>Work with top companies</h5>
                    <img src={HPLogo} alt="Hplogo" align=""/>
                    <img src={UCSFLogo} alt="UCSF" align=""/>
                    <img src={thumbtack} alt="thumb" align=""/>
                    <img src={udemy} alt="udemy" align=""/>
                    <img src={shopify} alt="shopify" align=""/>
                    <img src={motorola} alt="motorola" align=""/>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = (dispatch) => {
  return {
        resendConfirmationLink: (id) => dispatch(resendConfirmationLink(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailConfirmation)
