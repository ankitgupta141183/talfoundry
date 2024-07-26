import { combineReducers } from "redux";
import {applicationHasErrored, applicationIsLoading, applicationIsChangeLoading, isAuthenticated, currentUser, currentUserDetails, invitationIsLoading, offerIsLoading, proposalIsLoading, settingUserDetails, settingIsLoading, currentUserIsLoading , UserDashboardDetails} from "../reducers/applicationReducer";
import signUpStepsReducer from '../reducers/signUpStepsReducer';
import loginStepsReducer from '../reducers/loginStepsReducer';
import appProcessReducer from '../reducers/appProcessReducer';
import forgetAndPasswordReducer from '../reducers/resetPasswordStepsReducer';
import { jobs, job, jobsForFreelancer,rating } from '../reducers/jobReducer';
import {freelancerProfile, jobForFreelancer, invitesForFreelancer,submittedProposals,  invitationJobForFreelancer, freelancerNotifications, proposalDetailsForFreelancer, offersForFreelancer, offerDetails, contractsForFreelancer, contractDetails} from '../reducers/freelancerReducer';
import {allFreelancers, freelancer, adminJobListing, admins, adminClientListing, adminClientDetails, adminUsersListing} from '../reducers/adminReducer';
import profileEditReducer from '../reducers/profileEditReducer';
import {conversationList} from '../reducers/conversationReducer';
import {SearchVal, SearchJobVal, SavedJobsForFreelancer} from '../reducers/searchReducer';
import { FreelancersToInvite, InvitedFreelancers, FreelancersToReview, FreelancerAndProposalDetails, SavedFreelancersForHM, FreelancerToHire, contractsForHiringManager, contractDetailsForHiringManager, FreelancersToHire, HiredFreelancers, AllJobPostings,managerDashboard, AllHiredFreelancers, archives, managerArchives, managerInvitation, getActiveJobTab } from '../reducers/ProjectManagerReducer';
import { BreadCrumbSteps } from "./BreadCrumbReducer";
import {AdminSettingState} from "./AdminSettingReducers/AdminSettingReducers"

export default combineReducers({
  archives,
  managerArchives,
  managerInvitation,
  applicationHasErrored,
  applicationIsLoading,
  applicationIsChangeLoading,
  allFreelancers,
  AllJobPostings,
  AllHiredFreelancers,
  admins,
  adminClientListing,
  adminClientDetails,
  adminUsersListing,
  managerDashboard,
  appProcessSteps: appProcessReducer,
  currentUser,
  adminJobListing,
  conversationList,
  contractsForFreelancer,
  contractDetails,
  currentUserIsLoading,
  contractsForHiringManager,
  contractDetailsForHiringManager,
  currentUserDetails,
  FreelancerAndProposalDetails,
  FreelancerToHire,
  freelancer,
  FreelancersToInvite,
  FreelancersToReview,
  FreelancersToHire,
  freelancerProfile,
  freelancerNotifications,
  forgetAndPasswordSteps: forgetAndPasswordReducer,
  HiredFreelancers,
  isAuthenticated,
  InvitedFreelancers,
  invitationJobForFreelancer,
  invitationIsLoading,
  invitesForFreelancer,
  job,
  jobs,
  jobForFreelancer,
  jobsForFreelancer,
  loginSteps: loginStepsReducer,
  offerDetails,
  offerIsLoading,
  offersForFreelancer,
  proposalDetailsForFreelancer,
  proposalIsLoading,
  profileEditStates: profileEditReducer,
  rating,
  SavedJobsForFreelancer,
  SavedFreelancersForHM,
  SearchVal,
  SearchJobVal,
  settingUserDetails,
  settingIsLoading,
  signUpSteps: signUpStepsReducer,
  submittedProposals,
  getActiveJobTab,
  UserDashboardDetails,
  BreadCrumbSteps,
  AdminSettingState
})
  