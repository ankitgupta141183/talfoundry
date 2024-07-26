import React, { Suspense, lazy } from 'react';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

import JobSearch from './components/Common/JobSearch';
// import HomePage from './components/Home/HomePage';
import SearchFreelancers from './components/Common/SearchFreelancers';
import CESearch from "./components/Common/CESearch";
import FreelancerPublicPage from "./components/Freelancer/FreelancerPublicPage"
import HomePageNew from './components/Home/HomePageNew';
import AdminSetting from './components/Admin/AdminSetting';
import CreateProfileCloudExpert from './components/ApplicationProcessSteps/CreateProfileCloudExpert';
import PostAJob from './components/projectManager/PostAJob/PostAJob';


// import LoginPopUP from './components/miscellaneous/LoginPopUP';
const LandingPageCategory = lazy(() => import('./components/Home/LandingPageCategory'));
const AdminLogin = lazy(() => import('./components/authentication/AdminLogin'));
const LoginPage = lazy(() => import('./components/miscellaneous/LoginPopUP'))
const SignUpPage = lazy(() => import("./components/miscellaneous/SignUpPopUpNew"))

const welcome = lazy(() => import('./components/Common/welcome'));
const SearchedJobs = lazy(() => import('./components/Common/SearchedJobs'));

const AdminJobs = lazy(() => import('./components/Admin/AdminJobs'));
const AdminJobsDetails = lazy(() => import('./components/Admin/AdminJobsDetails'));
const AdminClientListing = lazy(() => import('./components/Admin/AdminClientListing'));
const AdminClientProfile = lazy(() => import('./components/Admin/AdminClientProfile'));
const AdminTransactions = lazy(() => import('./components/Admin/AdminTransactions'));
const CloudApplication = lazy(() => import('./components/Admin/CloudExpertApplication'));
const Executives = lazy(() => import('./components/Admin/Executives'));
const AdminNotifications = lazy(() => import('./components/Admin/AdminNotifications'));
const FreelancersList = lazy(() => import('./components/Admin/FreelancersList'));
const FreelancerDetaiils = lazy(() => import('./components/Admin/FreelancerDetails'));
const PostDetails = lazy(() => import('./components/Admin/PostDetails'));

const AskSecQuestion = lazy(() => import('./components/authentication/AskSecQuestion'));
const AskSecQuestionPM = lazy(() => import('./components/authentication/AskSecQuestionPM'));
const SecurityQuestion = lazy(() => import('./components/authentication/SecurityQuestion'));
const ForgetAnswer = lazy(() => import('./components/authentication/ForgetAnswer'));
const ForgetPassword = lazy(() => import('./components/authentication/ForgetPassword'));
const ResetPassword = lazy(() => import('./components/authentication/ResetPassword'));
const ResetAnswer = lazy(() => import('./components/authentication/ResetAnswer'));
const UserLoginStep2 = lazy(() => import('./components/authentication/UserLoginStep2'));

const CreateProfileFormSection1 = lazy(() => import('./components/ApplicationProcessSteps/CreateProfileFormSection1'));
const FreelancerSuccessPage = lazy(() => import('./components/ApplicationProcessSteps/FreelancerSuccessPage'));
const InterviewScheduled = lazy(() => import('./components/ApplicationProcessSteps/InterviewScheduled'));

const PaymentSchedule = lazy(() => import('./components/Payment/PaymentSchedule'));
const SetupPaymentMethod = lazy(() => import('./components/Payment/SetupPaymentMethod'));

const AboutUs = lazy(() => import('./components/miscellaneous/AboutUs'));
const Careers = lazy(() => import('./components/miscellaneous/Careers'));
const ContactUs = lazy(() => import('./components/miscellaneous/ContactUs'));
const EmailConfrimation = lazy(() => import('./components/miscellaneous/EmailConfirmation'));
const FreelancerSettingPage = lazy(() => import('./components/miscellaneous/FreelancerSettingPage'));
const GetStarted = lazy(() => import('./components/miscellaneous/GetStarted'));
const HowItWorks = lazy(() => import('./components/miscellaneous/HowItWorks'));
const HowItWorksNew = lazy(() => import('./components/miscellaneous/HowItWorksNew'));
const TermsofService = lazy(() => import('./components/miscellaneous/TermsofService'));
const HowCanHelpYou = lazy(() => import('./components/miscellaneous/HowCanHelpYou'));
const PrivacyPolicy = lazy(() => import('./components/miscellaneous/Privacypolicy'));
const HowItWorksFreelancer = lazy(() => import('./components/miscellaneous/HowItWorksFreelancer'));
const Messages = lazy(() => import('./components/miscellaneous/Messages'));
const NewStories = lazy(() => import('./components/miscellaneous/NewStories'));
const NotFound = lazy(() => import('./components/miscellaneous/NotFound'));
const Notifications = lazy(() => import('./components/miscellaneous/Notifications'));
const Press = lazy(() => import('./components/miscellaneous/Press'));
const Team = lazy(() => import('./components/miscellaneous/Team'));
const AwsAdvisoryServices = lazy(() => import('./components/miscellaneous/AwsAdvisoryServices'));
const StartupPartnership = lazy(() => import('./components/miscellaneous/StartupPartnership'));
const SalesforceAdvisoryServices = lazy(() => import('./components/miscellaneous/SalesforceAdvisoryServices'));

const AllContracts = lazy(() => import('./components/Freelancer/AllContracts'));
const ContractDetails = lazy(() => import('./components/Freelancer/ContractDetails'));
const FreelancerEndContract = lazy(() => import('./components/Freelancer/FreelancerEndContract'));
const FreelancerShowRating = lazy(() => import('./components/Freelancer/FreelancerShowRating'));
const FreelancerProfileTab = lazy(() => import('./components/Freelancer/FreelancerProfileTab'));
// const FreelancerPublicPage = lazy(() => import('./components/Freelancer/FreelancerPublicPage'));
const InvitationDetails = lazy(() => import('./components/Freelancer/InvitationDetails'));
const JobDetails = lazy(() => import('./components/Freelancer/JobDetails'));
const MyProposals = lazy(() => import('./components/Freelancer/MyProposals'));
const ProposalDetails = lazy(() => import('./components/Freelancer/ProposalDetails'));
const OfferDetails = lazy(() => import('./components/Freelancer/OfferDetails'));
const SubmitProposal = lazy(() => import('./components/Freelancer/SubmitProposal'));
const Transactions = lazy(() => import('./components/Freelancer/Transactions'));
const MyStats = lazy(() => import('./components/Freelancer/MyStats'));
const CloudExpertDashboardNew = lazy(() => import('./components/Freelancer/CloudExpertDashboardNew'));
const MyJobsFreelancer = lazy(() => import('./components/Freelancer/MyJobsFreelancer'));
const BrowseJobsFreelancer = lazy(() => import('./components/Freelancer/BrowseJobsFreelancer'));


const AddCompany = lazy(() => import('./components/projectManager/AddCompany'));
const AllJobPostings = lazy(() => import('./components/projectManager/AllJobPostings'));
const Archives = lazy(() => import('./components/projectManager/Archives'));
const InvitationCE = lazy(() => import('./components/projectManager/InvitationCE'));
const MyProposal = lazy(() => import('./components/projectManager/MyProposal'));
const Contracts = lazy(() => import('./components/projectManager/ProjectManagerContracts'));
const ContractDetailsForHM = lazy(() => import('./components/projectManager/ProjectManagerContractDetails'));
const EditAJob = lazy(() => import('./components/projectManager/EditAJob'));
const FindFreelancers = lazy(() => import('./components/projectManager/FindFreelancers'));
const FreelancerProposal = lazy(() => import('./components/projectManager/FreelancerProposal'));
const HireAFreelancer = lazy(() => import('./components/projectManager/HireAfreelancer'));
const ProjectManagerDashboardNew = lazy(() => import('./components/projectManager/ProjectManagerDashboardNew'));
const MyJobs = lazy(() => import('./components/projectManager/MyJobs'));
const JobDescription = lazy(() => import('./components/projectManager/JobDescription'));
const ManagerShowRating = lazy(() => import('./components/projectManager/ManagerShowRating'));
const ProjectManagerEndContract = lazy(() => import('./components/projectManager/ProjectManagerEndContract'));
const ProjectManagerInviteDetails = lazy(() => import('./components/projectManager/ProjectManagerInviteDetails'));
const PostAJobProgressBar = lazy(() => import('./components/projectManager/PostAJobProgressBar'));
const ReviewnPay = lazy(() => import('./components/projectManager/ReviewNPay'));
const Setting = lazy(() => import('./components/projectManager/Setting'));
const AdminPlatform = lazy(() => import('./components/Admin/AdminPlatform/AdminPlatform'));
const AdminReportUsers = lazy(() => import('./components/Admin/AdminReport/AdminReport'))
const AdminRoles = lazy(() => import("./components/Admin/AdminRolePages/AdminRoles"))
const AdminRolesPermission = lazy(() => import("./components/Admin/AdminRolesPermission/AdminRolesPermission"))
const SetUpStripePayment = lazy(()=> import("./components/Payment/SetUpStripePayment"))


class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      // console.log("this.props.location",this.props.location)
      if (this.props.location.pathname === '/category_page_description') {
        window.scrollTo(200, 300)
      } else {
        window.scrollTo(0, 0)
      }
    }
  }

  render() {
    return (
      <div className="app-frame">{this.props.children}</div>
    )
  }
}

class Routes extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isAdmin: false,
    };
  }

  render() {
    (function () {
      const token = localStorage.getItem("accessToken");
      if (token) {
        axios.defaults.headers.common["Authorization"] = token;
      } else {
        axios.defaults.headers.common["Authorization"] = null;
        /*if setting null does not remove `Authorization` header then try
                delete axios.defaults.headers.common['Authorization'];
        */
      }
    })();

    return (
      <ScrollToTop location={this.props.location}>
        <Suspense fallback={null}>
          <div>
            {!this.props.isAuthenticated && (
              <div>
                <Switch>
                  <Route exact={true} path={`/`} component={HomePageNew} />
                  {/* <Route exact={true} path={`/home-new`} component={HomePageNew}
                  /> */}
                  <Route exact={true} path={'/login'} component={LoginPage} history={this.props.history} />
                  <Route exact={true} path={"/sign-up"} component={SignUpPage} history={this.props.history} />
                  <Route exact={true} path={`/login_page/:token?`} component={HomePageNew} />
                  <Route
                    exact={true}
                    path={`/category_page_description`}
                    component={LandingPageCategory}
                    history={this.props.history}
                  />
                  {/* <Route path={`/Admin`} component={AdminLogin} /> */}
                  <Route
                    path={`/job-details/:id/:isPublic`}
                    component={JobDetails}
                    history={this.props.history}
                  />
                  <Route
                    path={`/user-profile/:uuid/:isPublic`}
                    component={FreelancerPublicPage}
                    location={this.props.location}
                  />
                  {/* <Route path={`/login_page2`} component={UserLoginStep2} /> */}
                  <Route path={`/confrim-your-email/:id`} component={EmailConfrimation} />
                  <Route path={`/forget-password`} component={ForgetPassword} />
                  <Route path={`/reset-password/:token?`} component={ResetPassword} />
                  <Route path={`/tell-us-about-company`} component={AddCompany} />
                  <Route path={`/user-profile/:uuid`} component={FreelancerPublicPage} />
                  <Route
                    path={`/freelancer-search`}
                    component={CESearch}
                    location={this.props.location}
                  />
                  <Route path={`/job-search`} component={JobSearch} />

                  <Route path={`/press`} component={Press} />
                  <Route path={`/team`} component={Team} />
                  <Route path={`/aboutus`} component={AboutUs} />
                  <Route path={`/career`} component={Careers} />
                  <Route path={`/contactus`} component={ContactUs} />
                  <Route path={`/new-stories`} component={NewStories} />
                  <Route path={`/how-it-works`} component={HowItWorksNew} />
                  {/* <Route path={`/how-it-works`} component={HowItWorks} /> */}
                  {/* <Route path={`/how-it-works1`} component={HowItWorksNew} /> */}
                  <Route path={`/faq`} component={HowItWorks} />

                  <Route path={`/terms-of-Service`} component={TermsofService} />
                  <Route path={`/how-it-works-freelancer`} component={HowItWorksFreelancer} />
                  <Route path={`/privacy-policy`} component={PrivacyPolicy} />
                  <Route path={`/How-can-help-you`} component={HowCanHelpYou} />


                  <Route path={`/advisory-services/startup-partnership`} component={StartupPartnership} />
                  <Route path={`/advisory-services/aws-advisory-services`} component={AwsAdvisoryServices} />
                  <Route path={`/advisory-services/salesforce-advisory-services`} component={SalesforceAdvisoryServices} />
                  <Route path="*" component={NotFound} />
                </Switch>
              </div>
            )}

            {this.props.isAuthenticated &&
              this.props.currentUser.role === "Freelancer" && (
                <React.Fragment>
                  <div className="content">
                    <main>
                      <div>
                        <Route
                          path={`/app-process1`}
                          component={CreateProfileCloudExpert}
                          history={this.props.history}
                        />
                        <Route
                          path={`/interview-scheduled`}
                          component={InterviewScheduled}
                        />
                        <Route
                          path={`/freelancer-success`}
                          component={FreelancerSuccessPage}
                        />
                        <Route path="/my-jobs" component={MyJobsFreelancer} />
                        <Route path="/find-work" component={BrowseJobsFreelancer} />

                        <Route path={`/profile`} component={FreelancerProfileTab} />

                        <Route path={`/`} exact={true} component={CloudExpertDashboardNew} />


                        <Route path={`/job-search-new`} component={SearchedJobs} />
                        <Route
                          path={`/freelancer-search`}
                          component={SearchFreelancers}
                          location={this.props.location}
                        />
                        <Route
                          path={`/job-details/:id`}
                          component={JobDetails}
                          history={this.props.history}
                        />
                        <Route
                          path={`/invitation-details/:id`}
                          component={InvitationDetails}
                        />
                        <Route
                          path={`/offer-details/:id`}
                          component={OfferDetails}
                          location={this.props.location}
                        />
                        <Route
                          path={`/user-profile/:uuid`}
                          component={FreelancerPublicPage}
                        />
                        <Route
                          path={`/get-started`}
                          component={GetStarted}
                          history={this.props.history}
                        />
                        <Route path={`/my-proposals`} component={MyProposals} />
                        <Route path={`/invited`} component={InvitationCE} />
                        <Route path={`/transactions`} component={Transactions} />
                        <Route path={`/security-questions`} component={SecurityQuestion} />
                        <Route path={`/messages`} component={Messages} />
                        <Route
                          path={`/all-contracts/:tab`}
                          component={AllContracts}
                          location={this.props.location}
                        />

                        <Route
                          path={`/my-stats`}
                          component={MyStats}
                          location={this.props.location}
                        />
                        <Route
                          path={`/contract-details/:id`}
                          component={ContractDetails}
                          location={this.props.location}
                        />
                        <Route
                          path={`/freelancer-end-contract/:id`}
                          component={FreelancerEndContract}
                          location={this.props.location}
                        />
                        <Route
                          path={`/freelancer-show-rating/:id`}
                          component={FreelancerShowRating}
                          location={this.props.location}
                        />
                        <Route path={`/submit-proposal/:id`} component={SubmitProposal} />
                        <Route path={`/proposal-details/:id`} component={ProposalDetails} />
                        <Route path={`/settings`} component={FreelancerSettingPage} />
                        <Route
                          path={`/setup-payment/:type`}
                          component={SetupPaymentMethod}
                        />
                        <Route path={`/payment-schedule`} component={PaymentSchedule} />
                        <Route
                          path={`/notifications`}
                          component={Notifications}
                          history={this.props.history}
                        />
                        <Route path={`/auth-question/:type?`} component={AskSecQuestion} />
                        <Route path={`/reset-answer/:type?`} component={ResetAnswer} />
                        <Route path={`/forget-answer/:type?`} component={ForgetAnswer} />

                        <Route path={`/team`} component={Team} />
                        <Route path={`/career`} component={Careers} />
                        <Route path={`/aboutus`} component={AboutUs} />
                        <Route path={`/press`} component={Press} />
                        <Route path={`/contactus`} component={ContactUs} />


                        <Route path={`/terms-of-Service`} component={TermsofService} />
                        <Route path={`/privacy-policy`} component={PrivacyPolicy} />
                        <Route path={`/How-can-help-you`} component={HowCanHelpYou} />
                        <Route path={`/how-it-works-freelancer`} component={HowItWorksFreelancer} />

                      </div>
                    </main>
                  </div>
                </React.Fragment>
              )}
            {this.props.isAuthenticated &&
              this.props.currentUser.role === "Project Manager" && (
                <React.Fragment>
                  <div className="content">
                    <main>
                      <div>
                        <Switch>
                          <Route path="/" exact={true} component={ProjectManagerDashboardNew} />

                          <Route path="/my-jobs" exact={true} component={MyJobs} />
                          <Route
                            path={`/edit-a-job-progress/:id`}
                            component={EditAJob}
                          />

                          <Route
                            path={`/post-a-job-progress`}
                            component={PostAJob}
                          />
                          <Route path={`/job-search-new`} component={SearchedJobs} />
                          <Route path={`/settings`} component={Setting} />
                          <Route path={`/job/:id/:tab`} component={JobDescription} />
                          <Route path={`/payment-schedule`} component={PaymentSchedule} />
                          <Route
                            path={`/setup-payment/:type`}
                            component={SetupPaymentMethod}
                          />
                          <Route 
                          path={"/stripe-payment-setup"}
                          component={SetUpStripePayment}
                          />
                          <Route
                            path={`/user-profile/:uuid/:jobId?`}
                            component={FreelancerPublicPage}
                          />
                          <Route path={`/messages`} component={Messages} />
                          <Route
                            path={`/freelancer-search`}
                            component={SearchFreelancers}
                            location={this.props.location}
                          />
                          <Route
                            path={`/freelancer-proposal/:id/:jobId?`}
                            component={FreelancerProposal}
                          />
                          <Route
                            path={`/hire-a-freelancer/:freelancerId/:jobId`}
                            component={HireAFreelancer}
                          />
                          <Route path={`/notifications`} component={Notifications} />
                          <Route
                            path={`/contract-details/:id`}
                            component={ContractDetailsForHM}
                          />
                          <Route
                            path={`/end-contract/:id`}
                            component={ProjectManagerEndContract}
                          />
                          <Route
                            path={`/manager-show-rating/:id`}
                            component={ManagerShowRating}
                          />

                          <Route path={`/transactions`} component={Transactions} />

                          <Route path={`/security-questions`} component={SecurityQuestion} />
                          <Route path={`/all-contracts`} component={Contracts} />
                          <Route path={`/all-job-postings`} component={AllJobPostings} />
                          <Route path={`/find-freelancers/:tab`} component={FindFreelancers} />
                          <Route path={`/find-freelancers2/:tab`} component={FindFreelancers} />
                          <Route path={`/archived`} component={Archives} />
                          <Route path={`/my-proposals`} component={MyProposal} />
                          <Route path={`/invited`} component={InvitationCE} />
                          <Route path={`/review-pay`} component={ReviewnPay} />
                          <Route path={`/auth-question/:type?`} component={AskSecQuestionPM} />
                          <Route path={`/forget-answer/:type?`} component={ForgetAnswer} />
                          <Route path={`/reset-answer/:type?`} component={ResetAnswer} />

                          <Route
                            path={`/invitation-details/:id`}
                            component={ProjectManagerInviteDetails}
                          />

                          <Route path={`/team`} component={Team} />
                          <Route path={`/career`} component={Careers} />
                          <Route path={`/aboutus`} component={AboutUs} />
                          <Route path={`/press`} component={Press} />
                          <Route path={`/contactus`} component={ContactUs} />


                          <Route path={`/terms-of-Service`} component={TermsofService} />
                          <Route path={`/privacy-policy`} component={PrivacyPolicy} />
                          <Route path={`/How-can-help-you`} component={HowCanHelpYou} />

                          <Route path={`/how-it-works-freelancer`} component={HowItWorksFreelancer} />
                          <Route path="*" component={NotFound} />
                        </Switch>
                      </div>
                    </main>
                  </div>
                </React.Fragment>
              )}
            {this.props.isAuthenticated && this.props.currentUser.role === "Admin" && (
              <React.Fragment>
                <div className="content">
                  <main>
                    <div>
                      <Switch>

                        <Route
                          path={`/all-freelancers`}
                          component={FreelancersList}
                          history={this.props.history}
                        />
                        <Route
                          path={`/`}
                          exact={true}
                          component={CloudApplication}
                          history={this.props.history}
                        />
                        <Route
                          path={`/freelancer/:id`}
                          component={FreelancerDetaiils}
                          history={this.props.history}
                        />
                        <Route
                          path={`/cloud-experts`}
                          component={PostDetails}
                          history={this.props.history}
                        />
                        <Route
                          path={`/setting`}
                          component={AdminSetting}
                          history={this.props.history}
                        />
                        <Route
                          path={`/user-profile/:uuid`}
                          component={FreelancerPublicPage}
                          history={this.props.history}
                        />
                        <Route
                          path={`/admin-jobs`}
                          component={AdminJobs}
                          history={this.props.history}
                        />
                        <Route
                          path={`/execs`}
                          component={Executives}
                          history={this.props.history}
                        />
                        <Route
                          path={`/admin-jobs-details/:id`}
                          component={AdminJobsDetails}
                          history={this.props.history}
                        />
                        <Route
                          path={`/admin-client-listing`}
                          component={AdminClientListing}
                          history={this.props.history}
                        />
                        <Route
                          path={`/admin-client-profile/:id`}
                          component={AdminClientProfile}
                          history={this.props.history}
                        />

                        <Route
                          path={`/transactions`}
                          component={AdminTransactions}
                          history={this.props.history}
                        />
                        <Route
                          path={`/notifications`}
                          component={AdminNotifications}
                          history={this.props.history}
                        />
                        <Route
                          path={"/roles"}
                          component={AdminRoles}
                        />
                        <Route
                          path={"/roles-permission/:id"}
                          component={AdminRolesPermission}
                        />

                        <Route path={`/team`} component={Team} />
                        <Route path={`/career`} component={Careers} />
                        <Route path={`/aboutus`} component={AboutUs} />
                        <Route path={`/press`} component={Press} />
                        <Route path={`/contactus`} component={ContactUs} />

                        <Route path={`/how-it-works-freelancer`} component={HowItWorksFreelancer} />
                        <Route path={`/privacy-policy`} component={PrivacyPolicy} />
                        <Route path={`/How-can-help-you`} component={HowCanHelpYou} />
                        <Route path={`/terms-of-Service`} component={TermsofService} />
                        <Route path={`/platforms`} component={AdminPlatform} />
                        <Route path={"/reports"} component={AdminReportUsers} />
                        <Route path="*" component={NotFound} />
                      </Switch>
                    </div>
                  </main>
                </div>
              </React.Fragment>
            )}
            {this.props.isAuthenticated && (this.props.currentUser.role === "Coordinator" || this.props.currentUser.role === "Support") && (
              <React.Fragment>
                <div className="content">
                  <main>
                    <div>
                      <Switch>
                        <Route path={`/`} exact={true} component={welcome} />
                        <Route
                          path={`/edit-a-job-progress/:id`}
                          component={EditAJob}
                        />

                        <Route
                          path={`/post-a-job-progress`}
                          component={PostAJobProgressBar}
                        />
                        <Route path={`/job-search-new`} component={SearchedJobs} />
                        <Route path={`/settings`} component={Setting} />
                        <Route path={`/job/:id/:tab`} component={JobDescription} />
                        <Route path={`/payment-schedule`} component={PaymentSchedule} />
                        <Route
                          path={`/setup-payment/:type`}
                          component={SetupPaymentMethod}
                        />
                        <Route
                          path={`/user-profile/:uuid/:jobId?`}
                          component={FreelancerPublicPage}
                        />
                        <Route path={`/messages`} component={Messages} />
                        <Route
                          path={`/freelancer-search`}
                          component={SearchFreelancers}
                          location={this.props.location}
                        />

                        <Route
                          path={`/freelancer-proposal/:id/:jobId?`}
                          component={FreelancerProposal}
                        />
                        <Route
                          path={`/hire-a-freelancer/:freelancerId/:jobId`}
                          component={HireAFreelancer}
                        />
                        <Route path={`/notifications`} component={AdminNotifications} />
                        <Route
                          path={`/contract-details/:id`}
                          component={ContractDetailsForHM}
                        />
                        <Route
                          path={`/end-contract/:id`}
                          component={ProjectManagerEndContract}
                        />
                        <Route
                          path={`/manager-show-rating/:id`}
                          component={ManagerShowRating}
                        />
                        <Route path={`/security-questions`} component={SecurityQuestion} />
                        <Route path={`/all-contracts`} component={Contracts} />
                        <Route path={`/all-job-postings`} component={AllJobPostings} />
                        <Route path={`/find-freelancers/:tab`} component={FindFreelancers} />
                        <Route path={`/find-freelancers2/:tab`} component={FindFreelancers} />
                        <Route path={`/archived`} component={Archives} />
                        <Route path={`/my-proposals`} component={MyProposal} />
                        <Route path={`/review-pay`} component={ReviewnPay} />
                        <Route path={`/auth-question/:type?`} component={AskSecQuestion} />
                        <Route path={`/forget-answer/:type?`} component={ForgetAnswer} />
                        <Route path={`/reset-answer/:type?`} component={ResetAnswer} />
                        <Route path={`/terms-of-Service`} component={TermsofService} />
                        <Route
                          path={`/invitation-details/:id`}
                          component={ProjectManagerInviteDetails}
                        />

                        <Route path={`/team`} component={Team} />
                        <Route path={`/career`} component={Careers} />
                        <Route path={`/aboutus`} component={AboutUs} />
                        <Route path={`/press`} component={Press} />
                        <Route path={`/contactus`} component={ContactUs} />


                        <Route path="*" component={NotFound} />
                      </Switch>
                    </div>
                  </main>
                </div>
              </React.Fragment>
            )}
          </div>
        </Suspense>
      </ScrollToTop>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});
export default connect(mapStateToProps)(Routes);
