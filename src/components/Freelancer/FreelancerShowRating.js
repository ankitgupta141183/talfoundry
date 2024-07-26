import React, { Component } from "react";
import Footer from "../miscellaneous/Footer";
import { getRatingData } from "../../Actions/programManagerJobsActions";
import { connect } from "react-redux";
import FreelancerHeader from "../miscellaneous/FreelancerHeader";

class FreelancerShowRating extends Component {
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
      feedbackText: ""
    }
  }

  componentDidMount() {
    this.props.getRatingData(
      this.props.location.state.freelancer_rating_id,
      this.props.location.state.manager_rating_id,
      this.props.location.state.freelancer_rating_id).then(() => {
      this.setState({feedback: this.props.rating.rating_parameters})
    })
  }


  returnStars = (x) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(<i className="fa fa-star first" style={{color:  i+1 > x ? '#8080806e': '#0DA4DE'}}></i>)
    }
    return stars;
  }



  render() {

    // let {feedbackText,feedbackTextError,avgValue,submitSuccess} = this.state
    let {rating} = this.props
    let managerRating = {}
    let freelancerRating = {}
    if(rating.length > 0) {
       managerRating = rating.find(rat => rat.manager_rating === true)
       freelancerRating = rating.find(rat => rat.freelancer_rating === true)
    }

    return (
      <div className="end-contract-page">
        <FreelancerHeader history={this.props.history} />
        <div className="mn_center p-0">
          <div className="container">
            <div className="col-md-12 tf_resp_padd">
              <div className="mt-100 ml-20">

                <div className="news-list-content mn_center">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-12">
                        <h2>Feedback From Cloud Expert</h2>
                        <hr />
                      </div>

                      <div className="clearfix"></div>


                      <div className="col-md-4"></div>


                        <div className="feedback-rating-block col-sm-12 mt-10" >
                          <div className="cloud-experts-feedback-to-client col-sm-4">
                           Comment by Manager
                          </div>
                          <div className="cloud-experts-feedback-to-client col-sm-4">
                          <span style={{fontWeight: 'normal',fontSize: '15px'}}>
                            {rating && managerRating && (managerRating.message || '-')}
                            </span>
                          </div>
                        </div>

                      <div className="clearfix"></div>



                      <div className="col-md-12">
                        <h4 className="cloud-experts-feedback-to-client">
                        <div className="overall_div_feedback">
                          <div className="col-sm-4">
                            Overall feedback by Manager
                          </div>
                          <div className="col-sm-3">
                            <span className="five-star-rating-strip">
                              {rating && managerRating && managerRating.score ?
                                 this.returnStars(managerRating.score) :
                                 '-'}
                            </span>
                          </div>
                          </div>
                          <div className="feedback-rating-block col-sm-12 mt-10">
                            <div className="cloud-experts-feedback-to-client col-sm-4">
                             Comment  by Cloud Expert
                            </div>
                            <div className="cloud-experts-feedback-to-client col-sm-4">
                            <span style={{fontWeight: 'normal',fontSize: '15px'}}>
                              {rating && freelancerRating  && (freelancerRating.message || '-')}
                              </span>
                            </div>
                          </div>


                          <div className="feedback-rating-block col-sm-12">
                              <div className="cloud-experts-feedback-to-client col-sm-4">
                                  Overall Feedback given by Cloud Expert
                                </div>
                                <div className="col-sm-4 mt-30">
                                 <span className="five-star-rating-strip">
                                    {rating && freelancerRating && freelancerRating.score ? this.returnStars(freelancerRating.score) :
                                       <p style={{fontWeight: 'normal'}}>- </p>
                                     }
                                  </span>
                                </div>
                          </div>
                        </h4>
                      </div>
                    </div>
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
    rating: state.rating,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRatingData: (id,id2,id3) => dispatch(getRatingData(id,id2,id3))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FreelancerShowRating)

