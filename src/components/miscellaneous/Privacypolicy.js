import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Header from '../miscellaneous/Header';
import LandingPageHeader from "./LandingPageHeader";
import Footer from "./Footer";
// import LoginPopUp from "./LoginPopUP";
// import SignUpPopUpNew from "./SignUpPopUpNew";

class PrivacyPolicy extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      openSignUpModal: false,
      hiring : true
    }
  }

  handleSignUpModal = () => {
    this.setState({ openSignUpModal: true });
  }

  closeSignUpModal = () => {
    this.setState({ openSignUpModal: false });
  }

  handleOPenModal = () => {
    this.setState({ openModal: true });
  }
  closeModal = () => {
    this.setState({ openModal: false });
  }

  showASection = (event) => {
    if (event.target.id === "hiring") {
      this.setState({
        hiring : true
      })
    }else{
      this.setState({
        hiring : false
      })
    }
  }

  render() {
    return (
      <div>
        {/* <LoginPopUp
          isOpen={this.state.openModal}
          closeModal={this.closeModal}
          history={this.props.history}
        /> */}
        {this.props.isAuthenticated ?
          <Header history={this.props.history} />
          :
          <LandingPageHeader history={this.props.history} />
        }
        {/* <SignUpPopUpNew
          isOpen={this.state.openSignUpModal}
          closeModal={this.closeSignUpModal}
          history={this.props.history}
        /> */}

        <div className="clearfix"></div>

        <div className="tf-press page-header-top-margin termsofServiceHeader">
          <div className="container">
            <div className="col-md-12">
              <h1>Privacy Policy</h1>
            </div>
          </div>
        </div>

        <div className="tf_services termsofServiceBody">
          <div className="invite_freelancer white-background-color" id="how-it-works-page">
            <div className="container pb-5">
              <div className="col-md-2 col-sm-3">
                <ul className="nav nav-pills nav-stacked pt-3">
                    <li><Link  to="/privacy-policy">Privacy Policy</Link></li>
                    <li><Link to="/terms-of-Service" className="text-dark">Terms of Service</Link></li>
                </ul>
              </div>
              <div className="col-md-10 col-sm-9">
              <div className="c-section c-section--tight">
                    <h2 className="pt-2" >Overview</h2>
                    <p>
                        talfoundry.com is firmly committed to the privacy of its members. talfoundry.com works hard to earn and keep
                        your trust,
                        so it adheres to the following principles to
                        protect your privacy:
                    </p>

                    <ol className="ml-40">
                        <li>
                            <p>talfoundry.com does not rent or sell your personally identifiable information to third parties.
                            </p>
                        </li>
                        <li>
                            <p>talfoundry.com does not share your contact information with other users or third parties
                                without your consent.</p>
                        </li>
                        <li>
                            <p>Any personally identifiable information that you provide to talfoundry.com will be secured with
                                industry standard protocols and technology.</p>
                        </li>
                    </ol>

                    <h2 >Information Collection
                    </h2>
                    <p>
                        talfoundry.com is an online marketplace that connects businesses with Freelancers. When you visit
                        talfoundry.com you provide two types of information: personal
                        information
                        you
                        knowingly choose to disclose that is collected by talfoundry.com and website use information collected
                        by talfoundry.com as you interact with the talfoundry.com website (the
                        "Website").
                    </p>

                    <p>
                        When you register with talfoundry.com as a Freelancer or as an Employer, you provide certain personal
                        information, including, your name, your email address and
                        your
                        address. Additionally, when you establish your profile as a Freelancer or as an Employer you
                        will provide information relating to your skills, experience,
                        education
                        level, compensation, work availability, geographic region and self-evaluation. Such information
                        does not identify the specificity of the individual member.
                        Freelancers are not required to, but have the option to display their contact information (i.e.
                        name, address, phone number, email address, etc.) to
                        Employers
                        who
                        conduct searches of the talfoundry.com database.
                    </p>

                    <p>
                        When you enter the Website, talfoundry.com collects your IP address. This information is gathered for
                        all talfoundry.com visitors. In addition, talfoundry.com stores certain
                        information from your browser using "cookies." A cookie is a piece of data stored on the user's
                        computer tied to information about the user. talfoundry.com uses
                        session
                        ID cookies to confirm that users are logged in. These cookies terminate once the user closes the
                        browser. By default, talfoundry.com uses a persistent cookie that
                        stores
                        your login ID (but not your password) to make it easier for you to login when you return to the
                        Website. talfoundry.com members must have cookies enabled on their
                        browser. Note: Cookie preferences are set within each browser's Internet options/preferences.
                    </p>

                    <p>
                        If you post a information on a bulletin board, or participate in a public message board, you
                        should be aware that any personally identifiable
                        information you choose
                        to provide there can be read, collected, or used by other users of these forums and could be
                        used to send you unsolicited messages. talfoundry.com is not
                        responsible for
                        the personally identifiable information you choose to submit in these forums.
                    </p>

                    <p>
                        talfoundry.com is the sole owner of the information collected through the Website.
                    </p>

                    <h4 className="pt-2 pb-2">Information Use</h4>
                    <p>
                        talfoundry.com will not sell or rent any collected information to third parties. talfoundry.com will not
                        share your contact information with other users or third
                        parties
                        except in connection with possible employment and with your express consent. All registered
                        talfoundry.com members click the "I AGREE" checkbox on the
                        registration
                        form to agree to the talfoundry.com Privacy Policy and Terms of Service. Accordingly, all registered
                        users agree that certain profile information is accessible to
                        other registered users.
                    </p>
                    <p>
                        talfoundry.com records IP addresses for system administration purposes. This information is used to
                        diagnose server problems, monitor traffic patterns, analyze
                        trends, administer the Website, track member user patterns, and identify the most popular areas
                        of the Website to deliver content most relevant to
                        registered
                        members. IP addresses are not linked to personally identifiable information and are only used to
                        gather broad demographic information for aggregate use,
                        except
                        in the case of fraud.
                    </p>
                    <p>
                        talfoundry.com reserves the right to share aggregated demographic information with its partners and/or
                        advertisers, such information will not be linked to
                        personal
                        information that identifies registered users, except in the case of fraud.
                    </p>

                    <h4 className="pt-2 pb-2">Google Analytics &amp; AdWords</h4>
                    <p>
                        Google Analytics: We use Google Analytics tracking to review visitor website activities,
                        including: page views, source and time spent on our website. The
                        collected information is depersonalized and is displayed as numbers, meaning it cannot be
                        tracked back to individuals. This will help to protect your
                        privacy.
                        Using Google Analytics, we learn how to give you a better visitor experience.
                    </p>
                    <p>
                        Google AdWords: Using Google AdWords tracking codes, we can see which pages help lead to
                        different conversions on talfoundry.com. This allows us to better use our
                        paid advertising budget.
                    </p>
                    <p>
                        Remarketing With Google Analytics: We use the Google Analytics remarketing code to log when
                        visitors view specific web pages. This allows us to provide
                        targeted
                        advertising in the future.
                    </p>

                    <ol className="ml-40">
                        <li>
                            <p>Third-party vendors, including Google, may show talfoundry.com's ads across the internet.</p>
                        </li>
                        <li>
                            <p>
                                talfoundry.com and third-party vendors, including Google, use first-party cookies (such as the
                                Google Analytics cookie) and third-party cookies (such as
                                the
                                DoubleClick cookie) together to inform, optimize, and serve ads based on a user's past
                                visits to talfoundry.com.
                            </p>
                        </li>
                    </ol>

                    <h4 className="pt-2 pb-2">Opting Out:</h4>
                    <p>
                        Visitors can opt out of Google Analytics for Display Advertising and customize Google Display
                        Network ads using their
                        <a href="https://adssettings.google.com/authenticated" target="_blank" rel="noopener noreferrer">Ads Settings.</a>
                        Additionally, visitors can opt out of the
                        <a href="https://tools.google.com/dlpage/gaoptout">Google Analytics Browser Add-On</a>.
                    </p>

                    <h4 className="pt-2 pb-2">Links</h4>
                    <p>
                        The Website contains links to other websites and is not responsible for the privacy practices of
                        such websites. talfoundry.com encourages its members to read the
                        privacy policies of all websites. This privacy statement applies solely to information collected
                        by talfoundry.com.
                    </p>

                    <h4 className="pt-2 pb-2">Security</h4>
                    <p>
                        talfoundry.com takes industry standard protocols and technology to protect registered user
                        information. talfoundry.com is a VeriSign Secure Site. Please click the
                        VeriSign
                        logo at the bottom of any page in the website to view our official VeriSign certificate. All
                        transactions performed through talfoundry.com are conducted in a
                        Secure
                        Socket Layer (SSL) session. The Secure Socket Layer encrypts all transaction data for
                        transmittal in a format that prevents data theft. This process
                        protects
                        all private information from being disclosed to third parties. While on a secure page, the lock
                        icon at the bottom of a Web browser (i.e. Firefox or Chrome)
                        becomes locked.
                    </p>
                    <p>
                        talfoundry.com also protects registered user information offline. All registered user information is
                        restricted within our offices. Servers used to store
                        personally
                        identifiable information are housed in a secure, supervised environment. In addition, only
                        talfoundry.com employees who need specific information to perform a
                        task
                        are granted access to personally identifiable information.
                    </p>

                    <h4 className="pt-2 pb-2">Mandatory Communications</h4>
                    <p>
                        talfoundry.com sends all newly registered users a welcome email to verify their email addresses. At
                        times, talfoundry.com sends service announcements to its registered
                        Employers and Freelancers. Registered Users cannot unsubscribe from service announcements that
                        discuss upcoming changes that affect their talfoundry.com accounts.
                        In
                        addition, we communicate with registered members via personal emails or phone calls to provide
                        requested services.
                    </p>

                    <h4 className="pt-2 pb-2">Optional Communications</h4>
                    <p>
                        Registered users receive monthly e-newsletters containing information on talfoundry.com products,
                        services and announcements. Occasionally, registered users
                        receive
                        e-postcards that highlight special talfoundry.com announcements and features. Registered users can
                        opt-out of the above listed communications. Please see our
                        Choice/Opt-out section below.
                    </p>

                    <h4 className="pt-2 pb-2">Choice/Opt-out</h4>
                    <p>
                        Upon registration, users can opt-out of talfoundry.com's option communications. Additionally,
                        registered users can, at any time, modify their talfoundry.com email
                        (service
                        announcement) preferences by updating their account information.
                    </p>

                    <h4 className="pt-2 pb-2">Notification of Changes</h4>
                    <p>
                        talfoundry.com reserves the right to modify this privacy policy at any time, so please review it
                        frequently. If talfoundry.com alters its Privacy Policy, it will
                        promptly
                        post all changes in the Employer and Freelancer Announcement areas. By continuing to use
                        talfoundry.com after changes have been made to this policy, you are
                        consenting to the changes.
                    </p>

                    <h2 >Disclaimers</h2>

                    <h4 className="pt-2 pb-2">Social Login Disclaimer</h4>
                    <p>
                        Social Logins allow for single sign-up using existing information from social networking sites.
                        talfoundry.com is approved by Facebook, google+, and LinkedIn for
                        Social
                        Login through making our Privacy Policy publicly available and easily accessible. Our Privacy
                        Policy also gives our users the scope of the data collected
                        and
                        use of
                        that data collected on talfoundry.com.
                    </p>

                    <p>
                        By logging in through Facebook, Google+, LinkedIn, or any other Social Login we may accept in
                        the future, you consent to our Privacy Policy and Terms of
                        Service
                        as well as the Privacy Policy and Terms of Service of Facebook, Google+, LinkedIn, and etc.
                        Please review the Terms of Service and Privacy Policy for the
                        Social
                        Login you may be using to determine the collection and usage of data per the previously
                        mentioned Social Login services you may be using.
                    </p>

                    <h4 className="pt-2 pb-2">Disclosure of All Financial
                        Transactions on User Profiles Disclaimer</h4>
                    <p>
                        talfoundry.com discloses all of the financial transactions on profiles of both the Employers and
                        Freelancers for the benefit of all users. The disclosure of the
                        financial transactions is for the benefit of all users in making intelligent and informed
                        choices in regards to accepting jobs from Employers and hiring
                        Freelancers.
                    </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
})

export default connect(mapStateToProps)(PrivacyPolicy)
