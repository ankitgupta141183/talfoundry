// @HiredFreelancers.js
// * This component used as a container to display hired freelancers(freelancers who has accepted the offer.).

import React, {Component} from "react";
import {getFreelancersHired, getActiveHiredFreelancers ,getHireFreelancerForHiringmanager} from '../../Actions/ProjectManagerFreelancerActions';
import { connect } from "react-redux";
import { isEmpty } from 'lodash';
import { Link } from 'react-router-dom';
import ReadMoreAndLess from 'react-read-more-less';
import { Multiselect } from 'multiselect-react-dropdown';
import {addFavourite, removeFavourite} from '../../Actions/AdminActions';
import { getProfileForFreelancer } from "../../Actions/freelancerActions";
import {createConversation } from '../../Actions/conversationActions';
import Pagination from "react-js-pagination";
import Modal from 'react-modal';
import faceImg from '../../static/images/profile-placeholder.png';
import Loader from "react-loader-spinner";
import certification_required from "../../static/images/certification-required.png";
import COUNTRIES from '../../constants/countryListWithCodes'
import ReactCountryFlag from "react-country-flag"
import Skills from "../Common/Skills"
import NODataFoundImg from"./../../static/images/noDataFound.png";
// import inviteIcon from "../../static/images/invite.png";
import SuccessSweetAlert from "../CommonComponets/SweetAlert/SuccessSweetAlert";



const itemsCountPerPage = 5;

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
    width                 : '700px',
  }
}


class HiredFreelancers extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      isLoading: true,
      activePage: 1,
      openHire: false,
      rateType: "hourly",
      hireJobIdError: false,
      errors: {},
      hireJobId: "",
      freelancerToHire: {},
      openStatus: false,
      freelancersType:[],
      isDeleted: false,
      msg: "",
      openModal: false,
      profileDetail: '',
      currentArrayKey: 0
    }
  }
  componentDidMount() {
    if (this.props.hireType === "contracts"){
      this.props.getHiredFreelancer().then((res)=>{
        // console.log("res",res)
        if(res.length > 0){
          this.setState({freelancersType: res, isLoading: false})
        }else{
          this.setState({ isLoading: false })
        }
      })
    }
    else{
      this.props.hireType === "active" ?
      this.props.getActiveHiredFreelancers(this.props.job.id).then((res)=>{
        // console.log("res",res)
        if(res.length > 0){
          this.setState({freelancersType: res, isLoading: false})
        }else{
          this.setState({ isLoading: false })
        }
      })
       : this.props.getFreelancersHired(this.props.job.id).then((res)=>{
        // console.log("res",res)
        if(res.length > 0){
          this.setState({freelancersType: res, isLoading: false})
        }else{
          this.setState({ isLoading: false })
        }
      })
    }
  }
  handleOPenModal = (row, i, e) => {
      e.preventDefault();
        this.setState({ openModal: true, currentArrayKey: i+1 })
        this.props.getProfile(row.uuid, "", true).then(
          (res) => {
             this.setState({profileDetail : res })
          }
        )
    }

    closeModals = () => {
      this.setState({ profileDetail : "", openModal: false })
    }

    changeProfile = (id, type) => {
      let key = ''
      console.log(this.state.currentArrayKey, '==',this.state.freelancersType.length)
      !isEmpty(this.state.freelancersType) && this.state.freelancersType.length > 0 &&  this.state.freelancersType.map((row, index)=>{
          if(row.id === id){
            if(type === 'next'){
              key = index + 1
            }else{
              key = index - 1
            }
            // console.log('key==',key)
            this.props.getProfile(this.state.freelancersType[key].profile.uuid, "", true).then(
              (res) => {
                 this.setState({profileDetail : res, currentArrayKey: key+1 })
              }
            )
          }
          return row
      })
    }

  handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`)
    this.setState({activePage: pageNumber})
    window.scrollTo(0, 0);
  }

  createConverstaion = (id, e) => {
    e.preventDefault();
    const data = {
      title: '',
      sender_id: this.props.currentUser.user_id || this.props.currentUser.id,
      recipient_id: id
    }

    this.props.createConversation(data)
    .then((res) => {
      if(res.status === 200){
        this.props.history.push("/messages")
      }
    }).catch((err) => {
      console.log(err)
    })
  }


  hireFreelancer = (freelancer, e) => {
    e.preventDefault();
    this.setState({ openHire: true, freelancerUuid: freelancer.id, freelancerToHire: freelancer})
  }

  handleHireClose = () => {
    this.setState({ openHire: false})
  }

  fieldError( message) {
    return (<p id = "firstName" className="error-field" >{message ? message : "This field can't be blank."}</p>)
  }


  handleRateType = (e) => {
    this.setState({rateType: e.target.value})
  }

  handleJobChange = (e) => {
    let { errors } = this.state
    if(e.target.value) {
      errors['hireJobId'] = ''
    }
    this.setState({errors: errors, hireJobId: e.target.value })
  }

  onSelect = (selectedList, selectedItem) => {
    // console.log(selectedList, '-------' ,selectedItem)
    let { errors } = this.state;
    if (!isEmpty(selectedItem)) {
      errors["hireJobId"] = "";
    }

    this.setState({
      errors: errors,
      hireJobId: selectedItem.id,
    });
  }

  goToHiringPage =(e) => {
    if(this.state.hireJobId){
      this.props.history.push({ pathname: `/hire-a-freelancer/${this.state.freelancerUuid}/${this.state.hireJobId}`, state: {rateType: this.state.rateType}})
      this.setState({openHire: false})
    }else{
      this.setState({hireJobIdError: true})
    }
  }


  addFavourite =(id, idx, event) => {
    event.preventDefault()
    let freelancersType = Object.assign(this.state.freelancersType); // Pull the entire freelancersType object out. Using object.assign is a good idea for objects.
    freelancersType[idx].favorited_freelancer = true; // update the freelancersType object as needed
    this.setState({ freelancersType });

    this.props.addFavourite(id)
    .then((res) => {
      if(res.status === 200){
        this.setState({ isDeleted: true, msg: "Added to favorite list" })
        // this.props.getHiredFreelancer()
      }
    })
  }

  removeFavourite = (id, idx, event) => {
    event.preventDefault()

    let freelancersType = Object.assign(this.state.freelancersType); // Pull the entire freelancersType object out. Using object.assign is a good idea for objects.
    freelancersType[idx].favorited_freelancer = false; // update the freelancersType object as needed
    this.setState({ freelancersType });

    this.props.removeFavourite(id)
    .then((res) => {
      if(res.status === 200){
        this.setState({ isDeleted: true, msg: "Unfavorited Successfully" })
        // this.props.getHiredFreelancer()
      }
    })
  }


  hideAlert = () => {
    this.setState({ isDeleted: false, msg: "" })
  }

  render() {
    const { hireType, fromDashboard, applicationIsLoading} = this.props;
    const { activePage, rateType, hireJobIdError, freelancerToHire, freelancersType} = this.state;
    // const freelancersType = hireType === "contracts" ? AllHiredFreelancers :  hireType === "active" ? HiredFreelancers : FreelancersToHire;
    let freelancers = JSON.parse(JSON.stringify((freelancersType || []))).splice( activePage === 1 ? 0 : ((activePage - 1)*itemsCountPerPage), itemsCountPerPage)


    return (
      <div className="tab-pane active fade in in mt-20" id="hired-cloud-expert-list-tabs">
        <div className="">

        {
          this.state.isDeleted &&
            (
              // <div className="app-pro2-swal">
              //   <SweetAlert onConfirm={() => this.hideAlert()}>
              //     <div id="EditJobSuccessMessagePopupInnerContent">
              //         <img src={inviteIcon} alt="" id="rightCheckIconImage" />
              //         <h4>
              //           {" "}
              //           <strong>
              //             {this.state.msg}.
              //           </strong>
              //         </h4>
              //       </div>
              //   </SweetAlert>
              // </div>
              <SuccessSweetAlert
              handleConfirm={() => this.hideAlert()}
              show={true}
              message={this.state.msg}
            />
            )
        }
          { (this.state.isLoading || this.props.applicationIsLoading) && <div className="grid-loader my-feed-loader col-md-12">
            <Loader type="Grid" color="#00BFFF" height={100} width={100} />
          </div>}

          {
            !applicationIsLoading && (!isEmpty(freelancers)) ? freelancers.map((freelancer, idx) => {

              return <div className="list-view-strip-box">
                        <div key={freelancer.id} className="">

                              {/* Start Column 2 */}
                              <div className="col-md-2 col-sm-2 col-xs-4 tf_full_width">
                                <div className="tf_image">
                                {freelancer.user_picture ?
                                  <img src={freelancer.user_picture} className="avatar_img_hired_freelancer" alt="img"/>:
                                  // <Avatar name={freelancer.full_name.split(' ')[0]} color="#FFB4B6" round="50px" size="80"/>
                                  <img className="avatar_img_hired_freelancer" src={faceImg} alt="img"/>
                                  }
                                </div>
                              </div>
                              {/* End Column 2 */}

                              {/* Start Column 8 */}
                              <div className="col-md-8">

                                <div className="row">
                                    <div className="col-md-10">
                                      {/* Start Freelancer Name */}
                                    <div className="col-md-6 p-0">
                                      <div className="">
                                      <Link
                                        to={{
                                          pathname: `/user-profile/${
                                          freelancer.profile && freelancer.profile.uuid}`,
                                          state: {
                                            FindFreelancers: true,
                                            fromManager: true,
                                            tab: 'hired'
                                          }
                                        }}

                                        >
                                        <h4 className="freelancer-full-name-after-project-manager-login">{freelancer.full_name}  {freelancer && freelancer.profile && freelancer.profile.is_certified && <img src={certification_required} alt="Certified" title="Certification Required" className="certification-required" />}</h4></Link>
                                      </div>
                                      </div>
                                    <div className="col-md-6">
                                      <div className="">
                                      <h5>
                                      {freelancer && freelancer.profile && <ReactCountryFlag
                                                    countryCode = {
                                                      COUNTRIES.find(c => c.label === freelancer.profile.current_location_country).value
                                                    }
                                                    svg
                                                    style={{
                                                      width: '2em',
                                                      height: '1.2em',
                                                      float: 'left',
                                                      marginLeft: '-2px',
                                                      marginRight: '20px'
                                                    }}
                                                    title= {'country'}
                                                    />
                                                  }
                                        {freelancer && freelancer.profile && freelancer.profile.current_location_country}</h5>
                                    </div>
                                    </div>
                                      {/* End Freelancer Name */}
                                    </div>

                                    <div className="col-md-2">
                                      {fromDashboard ?
                                        '' :
                                        <div className="heart-fill add-to-favourite-container">
                                        {!freelancer.favorited_freelancer ? <Link href="" title="Favorited" onClick={this.addFavourite.bind(this, freelancer.id, idx)}><i className="fa fa-heart-o" aria-hidden="true"></i></Link> :
                                        <Link href="" title="Favorited" onClick={this.removeFavourite.bind(this, freelancer.id, idx)}><i className="fa fa-heart" aria-hidden="true"></i></Link>}
                                      </div>
                                      }

                                    </div>
                                </div>

                                <div className="clearfix"></div>

                                <div className="row">
                                  <div className="col-md-6">
                                      {/* Start Freelancer job title */}
                                      <div className="">
                                        <h5><strong>{freelancer && freelancer.profile && freelancer.profile.current_job_title}</strong></h5>
                                      </div>
                                      {/* End Freelancer job title */}

                                  </div>
                                  <div className="col-md-6">
                                    {/* Start Country */}
                                    {/* <div className="">
                                      <h5>
                                      {freelancer && freelancer.profile && <ReactCountryFlag
                                                    countryCode = {
                                                      COUNTRIES.find(c => c.label === freelancer.profile.current_location_country).value
                                                    }
                                                    svg
                                                    style={{
                                                      width: '2em',
                                                      height: '1.2em',
                                                      float: 'left',
                                                      marginLeft: '-2px',
                                                      marginRight: '20px'
                                                    }}
                                                    title= {'country'}
                                                    />
                                                  }
                                        {freelancer && freelancer.profile && freelancer.profile.current_location_country}</h5>
                                    </div> */}
                                    {/* End Country */}
                                  </div>
                                </div>

                                <div className="clearfix"></div>

                                <div className="row">
                                  <div className="col-md-12 project-manager-after-login-cloud-expert-description">
                                      {/* Start Cloud Expert Description */}
                                      <div className="">
                                        {freelancer.profile && freelancer.profile.about_me && <ReadMoreAndLess
                                            ref={this.ReadMore}
                                            className="read-more-content"
                                            charLimit={150}
                                            readMoreText="Read more"
                                            readLessText="Read less"
                                          >
                                              {freelancer.profile.about_me}
                                          </ReadMoreAndLess>
                                        }
                                      </div>
                                      {/* End Cloud Expert Description  */}
                                  </div>
                                </div>

                                <div className="clearfix"></div>

                                <div className="row">
                                {/* Start Cloud Expert Skills */}
                                {
                                  freelancer.profile.skill.length > 0 &&
                                  <Skills
                                    skill = {freelancer.profile.skill}
                                    to={`/user-profile/${freelancer.profile && freelancer.profile.user && freelancer.profile.user.uuid}/true`}
                                    id={freelancer.uuid}
                                    displayCount = {5}
                                  />
                                }
                                {/* End Cloud Expert Skills */}
                                </div>

                                <div className="clearfix"></div>

                              </div>
                              {/* End Column 8 */}

                              {/* Start Column 2 */}
                              <div className="col-md-2 text-center">


                                  {/* Start Cloud Expert Rate */}
                                  <div className="">
                                    {
                                      freelancer.profile && freelancer.profile.hourly_rate ?
                                      <h5>${isNaN(freelancer.profile.hourly_rate) ? '00' : parseFloat(freelancer.profile.hourly_rate).toFixed(2)} / hr</h5>: <h5>$0.00 / hr</h5>
                                    }
                                  </div>
                                  {/* End Cloud Expert Rate */}


                                  {/* Start Rehire  */}

                                  {
                                    hireType === "contracts" ?
                                    fromDashboard ?
                                    ''
                                  : (!isEmpty(freelancer) && !isEmpty(freelancer.payment_method)) ? (
                                      <div className="rehire-button-after-project-manager-login">
                                        <Link onClick={this.hireFreelancer.bind(this, freelancer)}>Rehire</Link>
                                      </div>
                                      ):(
                                      <div className="rehire-button-after-project-manager-login">
                                        <Link to={{ pathname: "/settings", state: "payMethodPresent" }}>
                                          Rehire
                                        </Link>
                                      </div>
                                      )
                                  :
                                    <div className="message-button-after-project-manager-login">
                                      <Link onClick={this.createConverstaion.bind(this, freelancer.id)}>Message</Link>
                                    </div>
                                  }

                                  {/* End Rehire */}
                                  {/* Start Earn */}
                                  <div className="">
                                    <h5>${freelancer.amount_earned}k earned</h5>
                                  </div>
                                  {/* End Earn */}

                              </div>
                              {/* Start Column 2 */}

                              <div className="clearfix"></div>

                          </div>

                      </div>
            }) : !this.state.isLoading &&
            <div className="noJobsFound" id="no-data-found-message">
              <img src={NODataFoundImg} alt=""/>
              <p>No Cloud Experts Found. </p>
            </div>
          }
         {!isEmpty(freelancerToHire) && <Modal isOpen={this.state.openHire} style={customStyles} onRequestClose={this.handleHireClose}>
                <div className="modal-dialog tf_z_index find-freelancer-popup" role="document">
                  <div className="modal-content tf_float">
                    <div className="modal-header">
                      <button type="button" className="close" onClick={this.handleHireClose} data-dismiss="modal"><span
                          aria-hidden="true">×</span><span className="sr-only">Close</span></button>
                      <h4 className="modal-title" id="myModalLabel">Hire <span style={{color: '#0DA4DE'}}>{freelancerToHire.full_name}</span></h4>
                    </div>
                    <div className="modal-body" align="center">

                      <div className="col-md-12">
                        <div className="form-group">
                          <div className="input-group">
                            <label>Link this offer to an open job post</label>
                            <div className="selectedwrap">
                              {
                                  (!isEmpty(freelancerToHire) && !isEmpty(freelancerToHire.profile.available_jobs_for_contract)) &&
                                    <Multiselect
                                      options={freelancerToHire.profile.available_jobs_for_contract}
                                      singleSelect
                                      displayValue="title"
                                      onSelect={this.onSelect}
                                      selectedValues={this.state.selectedValue}
                                      className="form-control mn_input"
                                      placeholder="Select Job."
                                    />
                                  }

                               { hireJobIdError && this.fieldError("Please select a job.")}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="clearfix"></div>
                      <div className="clearfix"></div>
                      <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="form-group">
                          <label className="labeltext">Job Type</label><br/>

                          <div className="form-check-inline" onChange={this.handleRateType}>

                            <label className="customradio"><span className="radiotextsty">Hourly</span>
                              <input type="radio" checked={rateType === "hourly"} name="radio" value="hourly"/>
                              <span className="checkmark"></span>
                            </label>        
                            <label className="customradio"><span className="radiotextsty">Fixed - Price</span>
                              <input type="radio" value="fixed price" checked={rateType === "fixed price"} name="radio"/>
                              <span className="checkmark"></span>
                            </label>
                          </div>
                        </div>
                      </div>

                    </div>
                    <div className="clearfix"></div>
                    <div className="modal-footer tf_model_footer1">
                      <div className="col-md-12 nopad">
                        <div className="col-md-3 col-sm-4 col-xs-6">
                          <button onClick={this.goToHiringPage} type="button" className="btn btn-fill btn-cyan btn-wd">Continue</button>
                        </div>
                        <div className="col-md-3 col-sm-4 col-xs-6">
                          <button onClick={this.handleHireClose} type="button" className="btn btn-fill btn-elegant btn-wd"
                            data-dismiss="modal">Cancel</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
          </Modal>}
          <div className="clearfix"></div>
          {/* <hr/> */}
         {!isEmpty(freelancers) && freelancers.length > 0 &&  <div className="">
              <div className="col-md-12">
                {
                  (!isEmpty(freelancers) && freelancers.length > 0) ? (
                    <Pagination
                      activePage={this.state.activePage}
                      itemsCountPerPage={itemsCountPerPage}
                      totalItemsCount={freelancersType.length}
                      pageRangeDisplayed={5}
                      onChange={this.handlePageChange.bind(this)}
                      prevPageText="Previous"
                      nextPageText="Next"
                    />
                  ) : null
                }
              </div>
            </div>}
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
    createConversation: (data) => dispatch(createConversation(data)),
    getFreelancersHired: (id) => dispatch(getFreelancersHired(id)),
    getActiveHiredFreelancers: (id) => dispatch(getActiveHiredFreelancers(id)),
    getHiredFreelancer: () => dispatch(getHireFreelancerForHiringmanager()),
    addFavourite: (id) => dispatch(addFavourite(id)),
    removeFavourite: (id) => dispatch(removeFavourite(id)),
    getProfile: (id, jobId, isPublic) => dispatch(getProfileForFreelancer(id, jobId, isPublic)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HiredFreelancers)
