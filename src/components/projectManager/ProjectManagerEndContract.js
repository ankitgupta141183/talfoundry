import React, { Component } from "react";
import Footer from "../miscellaneous/Footer";
import { submitRating } from "../../Actions/programManagerJobsActions";
import { connect } from "react-redux";
import ProjecetManagerHeader from "../miscellaneous/ProjectManagerHeader";
import SuccessSweetAlert from "../CommonComponets/SweetAlert/SuccessSweetAlert";

class ProjectManagerEndContract extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      feedback: [
        {
          type: "skills",
          value: 1,
        },
        {
          type: "availability",
          value: 1,
        },
        {
          type: "communication",
          value: 1,
        },
        {
          type: "quality",
          value: 1,
        },
        {
          type: "deadlines",
          value: 1,
        },
        {
          type: "cooperation",
          value: 1,
        },
      ],
      avgValue: 1,
      feedbackText: "",
      feedbackTextError: false,
      submitSuccess: false
    }
  }

  handleDropDown = (e) => {
    let { feedback } = this.state
    feedback.find((fe) => {
      if (fe.type === e.target.id) {
        fe["value"] = e.target.value
      }
      return fe
      })

    this.setState(
      {
        feedback: feedback,
      },
      () => {
        this.returnAvg()
      }
    )
  }


  returnStars = () => {
    let { avgValue } = this.state
    let stars = []
    for (let i = 0; i < 5; i++) {
      stars.push(<i className="fa fa-star first" style={{color:  i+1 > avgValue ? '#8080806e': '#0DA4DE',fontSize: '21px'}}></i>)
    }
    return stars;
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

  returnStarsColor = (totalBlue,type,index) => {
    // let {feedback} = this.state;
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(<i
        className="fa fa-star first  mr-10"
        style={{color:  i < totalBlue ? '#0DA4DE': '#8080806e',fontSize: '20px'}}
        onClick={() => this.handleStars(i+1,index)}>
        </i>)
    }
    return stars;
  }

  handleStars = (val,index) => {
    let {feedback} = this.state;
    feedback[index].value = val
    let avgValue =  0
    feedback.map(f => {avgValue = avgValue + f.value; return f})
    avgValue = parseInt(avgValue/6)
    this.setState({avgValue: avgValue})
    this.setState({feedback: feedback})
  }


  handleSubmit = () => {
    let {feedback,feedbackText,feedbackTextError,avgValue} = this.state
    let rating_parameters = {}

    if((!feedbackText.length || feedbackText) && feedbackText.length < 10){
      this.setState({feedbackTextError: true})
    }
    else if(!feedbackTextError)
     {

     feedback.map(fe => {rating_parameters[fe.type] = fe.value; return fe})
     this.setState({feedbackTextError: false})
     let submit_data = {
      contract_id: this.props.match.params.id,
      user_id: this.props.location.state.userId,
      rated_user_id: this.props.location.state.rated_user_id,
      rating_parameters: rating_parameters,
      job_id:this.props.location.state.job_Id,
      score: avgValue,
      message: feedbackText
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

  hideAlert = () => {
    this.setState({submitSuccess : false})
  }


  render() {
    let {feedback,feedbackText,feedbackTextError,submitSuccess} = this.state

    return (
      <div className="end-contract-page">
        <ProjecetManagerHeader history={this.props.history} />
        {/* <div className="app-pro2-swal">Mohan@7863
          <SweetAlert
            show={this.state.submitSuccess}
            success
            title="Success!"
            html
             >
            Feedback Submitted
            </SweetAlert>
        </div> */}
        {/* { */}
          {/* // this.state.submitSuccess && */}
          <SuccessSweetAlert
          handleConfirm={() =>this.hideAlert()}
          show={this.state.submitSuccess}
          message={"Feedback Submitted."}
        />
        {/* // } */}
        


        <div className="mn_center">
          <div className="container">
            <div className="col-md-12 tf_resp_padd">
              <div className="mt-100 ml-20">

                <div className="news-list-content mn_center">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-12">
                        {submitSuccess && <p style={{color: '#0DA4DE'}}> Feedback Submitted Successfully to cloud expert </p>}
                        <h2>Feedback to Cloud expert</h2>
                        <hr />
                      </div>

                      <div className="clearfix"></div>

                      <div className="col-md-8">
                        <div className="col-md-6 nopad">
                          <div>
                            <div className="mt-30">
                              <p className="col-sm-5 mr-10"> Skills </p>
                              <p >{this.returnStarsColor(feedback[0].value, 'Skills',0)} </p>
                            </div>
                            <div className="mt-30">
                               <p className="col-sm-5 mr-10"> Availability </p>
                               {this.returnStarsColor(feedback[1].value, 'Availability',1)}
                            </div>
                            <div className="mt-30">
                              <p className="col-sm-5 mr-10"> Communication </p>
                              {this.returnStarsColor(feedback[2].value, 'Communication',2)}
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6 nopad">
                          <div>
                            <div className="mt-30">
                              <p className="col-sm-5 mr-10"> Quality </p>
                              {this.returnStarsColor(feedback[3].value, 'Quality',3)}
                            </div>
                            <div className="mt-30">
                              <p className="col-sm-5 mr-10"> Deadlines </p>
                              {this.returnStarsColor(feedback[4].value, 'Deadlines',4)}
                            </div>
                            <div className="mt-30">
                              <p className="col-sm-5 mr-10"> Cooperation </p>
                              {this.returnStarsColor(feedback[5].value, 'Cooperation',5)}
                            </div>
                            </div>
                        </div>
                      </div>

                      <div className="clearfix"></div>

                      <div className="col-md-12">
                        <h4 className="cloud-experts-feedback-to-client">
                          <div className="col-sm-4">
                            Overall feedback to Cloud expert
                          </div>
                          <div className="col-sm-3">
                            <span className="five-star-rating-strip">
                              <span className="five-star-rating-value">
                              </span>
                              &nbsp;&nbsp;
                              {this.returnStars()}
                            </span>
                          </div>
                        </h4>

                        <div className="feedback-rating-block col-sm-8">
                          <p className="cloud-experts-feedback-to-client"> Comment </p>
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
                    <button type="button" className="clients-feedback-submit-btn" onClick={this.handleSubmit}>Submit</button>
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
)(ProjectManagerEndContract)
