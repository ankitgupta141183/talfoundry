import React, { Component } from "react";
import Footer from "../miscellaneous/Footer";
import { submitRating } from "../../Actions/programManagerJobsActions";
import { connect } from "react-redux";
import FreelancerHeader from "../miscellaneous/FreelancerHeader";
import SuccessSweetAlert from "../CommonComponets/SweetAlert/SuccessSweetAlert";

class FreelancerEndContract extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      feedbackText: "",
      feedbackTextError: false,
      submitSuccess: false,
      feedbackToManager: 1,
      totalBlueStars: 1
    }
  }

  handleDropDown = (e) => {
    this.setState({feedbackToManager: e.target.value})

  }

  returnStars = (totalBlue) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(<i
        className="fa fa-star first mt-10 mr-10"
        style={{color:  i+1 > totalBlue ? '#8080806e': '#0DA4DE',fontSize: '20px'}}
        onClick={() => this.handleStars(i+1)}>
        </i>)
    }
    return stars;
  }

  handleStars = (val) => {
    this.setState({totalBlueStars: val})
  }

  handleChange = (e) => {
    if(e.target.value.split(" ").length < 5 || e.target.value.split(" ").length > 20){
      this.setState({
       feedbackText: e.target.value,
       feedbackTextError: true
     })
    }
    else {
     this.setState({
       feedbackText: e.target.value,
       feedbackTextError: false
     })
    }
  }

  handleSubmit = () => {
    let {feedbackText,feedbackTextError,totalBlueStars} = this.state
    // let rating_parameters = {}

    if((!feedbackText.length || feedbackText) && feedbackText.length < 10){
      this.setState({feedbackTextError: true})
    }
    else if(!feedbackTextError) {
     this.setState({feedbackTextError: false})
     let submit_data = {
      contract_id: this.props.match.params.id,
      user_id: this.props.location.state.userId,
      rated_user_id: this.props.location.state.rated_user_id,
      rating_parameters: {},
      score: totalBlueStars,
      message: feedbackText,
      job_id: this.props.location.state.jobId
     }

     this.props.submitRating(submit_data).then(() =>{
         this.setState({submitSuccess: true})
          setTimeout(
              function() {
                  this.props.history.push(`/contract-details/${this.props.location.state.uuid}`)
              }
              .bind(this),
              2000
          )
       }
     )

    }

  }


  render() {
    let {feedbackText,feedbackTextError,submitSuccess,totalBlueStars}= this.state
  console.log(this.props.location.state.jobId , "this.props.location.state.jobId");

    return (
      <div className="end-contract-page">
        <FreelancerHeader history={this.props.history} />

        {/* <div className="app-pro2-swal">
          <SweetAlert
            show={this.state.submitSuccess}
            success
            title="Success!"
            html
             >
            Feedback Submitted
            </SweetAlert>
        </div> */}
        <SuccessSweetAlert 
            show={this.state.submitSuccess}
            handleConfirm={()=>{}}
            message={"Feedback Submitted."}
            />

        <div className="mn_center">
          <div className="container">
            <div className="col-md-12 tf_resp_padd">
              <div className="mt-100 ml-20">

                <div className="news-list-content mn_center">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-12">
                      {submitSuccess && <p style={{color: '#0DA4DE'}}> Feedback Submitted Successfully to Manager </p>}
                        <h2>Feedback to Manager</h2>
                        <hr />
                      </div>

                      <div className="clearfix"></div>

                        <div className="row nopad">
                            <div className="col-sm-3">
                            Overall feedback to Manager
                            </div>
                            <div className="col-sm-4">
                                {this.returnStars(totalBlueStars)}
                            </div>

                        </div>

                        <div className="row nopad mt-40">
                            <div className="col-sm-3">
                            Comment
                            </div>
                            <div className="col-sm-6">
                                <textarea
                            className="form-control"
                            rows="5"
                            id="comment"
                            value={feedbackText}
                            onChange={this.handleChange}
                          ></textarea>
                          {
                            feedbackTextError &&
                            <div className="form-error ml-10">
                             Must be more than 5 words and less than 20 words
                            </div>
                          }
                            </div>
                        </div>

                    </div>
                    <button type="button" className="clients-feedback-submit-btn" onClick={this.handleSubmit}> Submit</button>
                  </div>
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

const mapStateToProps = (state) => {
  return {
    contractDetails: state.contractDetailsForHiringManager,
    isLoading: state.applicationIsLoading,
    currentUser: state.currentUser,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitRating: (id) => dispatch(submitRating(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FreelancerEndContract)
