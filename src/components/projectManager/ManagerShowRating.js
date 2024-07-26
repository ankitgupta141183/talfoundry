import React, { Component } from "react";
import ProjecetManagerHeader from "../miscellaneous/ProjectManagerHeader";
import Footer from "../miscellaneous/Footer";
import { getRatingData } from "../../Actions/programManagerJobsActions";
import { connect } from "react-redux";


class ManagerShowRating extends Component {
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
    }
  }

  componentDidMount() {
    this.props.getRatingData(
      this.props.location.state.manager_rating_id,
      this.props.location.state.manager_rating_id,
      this.props.location.state.freelancer_rating_id).then(() => {
      this.setState({feedback: this.props.rating.rating_parameters})
    })
  }


  renderDropdown = (label,type) => {
    if(Object.keys(this.props.rating).length > 0){
      let { rating_parameters } = this.props.rating && this.props.rating[0];
      return (
        <td>
          <div className="row">
            <div className="col-sm-8">
              <strong>{label}</strong>
            </div>
            <div className="col-sm-4">
              <select
                disabled
                className="form-control"
                id={type}
                onChange={this.handleDropDown}
               >
                {rating_parameters ?
                   <option value="1">{rating_parameters[type]}</option>
                    :
                    <option value="1"></option>
                  }
              </select>
            </div>
          </div>
        </td>
      )

    }
  }

  returnStars = (x) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(<i className="fa fa-star first" style={{color:  i+1 > x ? '#8080806e': '#0DA4DE',fontSize: '21px'}}></i>)
    }
    return stars;
  }

  returnStars2 = (totalBlue) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(<i
        className="fa fa-star first mr-10"
        style={{color:  i+1 > totalBlue ? '#8080806e': '#0DA4DE',fontSize: '21px'}}>
        </i>)
    }
    return stars;
  }


  render() {
    // let {feedbackText,feedbackTextError,avgValue,submitSuccess,feedback} = this.state
    let {rating} = this.props
    let managerRating = {}
    let freelancerRating = {}
    if(rating.length > 0) {
       managerRating = rating.find(rat => rat.manager_rating === true)
       freelancerRating = rating.find(rat => rat.freelancer_rating === true)
    }

    console.log('managerRating managerRating',managerRating)

    return (
      <div className="end-contract-page">
        <ProjecetManagerHeader history={this.props.history} />
        <div className="mn_center">
          <div className="container">
            <div className="col-md-12 tf_resp_padd">
              <div className="mt-100 ml-20">

                <div className="news-list-content mn_center">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-12">
                        <h2>Feedback</h2>
                        <hr />
                      </div>

                      <div className="clearfix"></div>

                      <div className="feedback-rating-block col-sm-12" style={{marginLeft: '-10px'}}>
                              <div className="cloud-experts-feedback-to-client col-sm-3">
                                  Manager's Feedback
                                </div>
                                <div className="col-sm-4" style={{marginTop: '20px',fontSize: '20px'}}>
                                 <span className="five-star-rating-strip">
                                    {rating && managerRating && managerRating.score ?
                                      this.returnStars(managerRating.score)
                                      :
                                       <p  style={{fontWeight: 'normal'}}> - </p>
                                     }
                                  </span>
                                </div>
                      </div>

                      <div className="col-md-8">
                       {managerRating &&  managerRating.rating_parameters &&
                        <React.Fragment>
                        <div className="col-md-6 nopad">
                            <div className="col-sm-5 mt-20">
                             Skills
                            </div>
                            <div className="col-sm-7 mt-20">
                              <strong> {managerRating.rating_parameters.skills} </strong>
                            </div>

                            <div className="col-sm-5 mt-20">
                               Availability
                            </div>
                            <div className="col-sm-7 mt-20">
                              <strong> {managerRating.rating_parameters.availability} </strong>
                            </div>

                            <div className="col-sm-5 mt-20">
                             Communication
                            </div>
                            <div className="col-sm-7 mt-20">
                              <strong> {managerRating.rating_parameters.communication} </strong>
                            </div>
                        </div>


                        <div className="col-md-6 nopad">
                            <div className="col-sm-5 mt-20">
                             Quality
                            </div>
                            <div className="col-sm-7 mt-20">
                              <strong> {managerRating.rating_parameters.quality} </strong>
                            </div>

                            <div className="col-sm-5 mt-20">
                               Deadlines
                              </div>
                            <div className="col-sm-7 mt-20">
                              <strong> {managerRating.rating_parameters.deadlines} </strong>
                            </div>

                            <div className="col-sm-5 mt-20">
                               Cooperation
                              </div>
                            <div className="col-sm-7 mt-20">
                              <strong> {managerRating.rating_parameters.cooperation} </strong>
                            </div>
                          </div>
                          </React.Fragment>
                        }
                      </div>

                      <div className="col-md-4"></div>


                      <div className="feedback-rating-block col-sm-12 mt-20" style={{marginLeft: '-10px'}}>
                          <div className="cloud-experts-feedback-to-client col-sm-9">
                          {rating && managerRating && managerRating.message ?
                            <span style={{fontWeight: 'normal',fontSize: '15px'}}>
                             "{managerRating.message}"
                            </span>
                            : ''
                          }
                          </div>
                        </div>

                      <div className="clearfix"></div>

                      <div className="col-md-12 mt-10">
                        <h4 className="cloud-experts-feedback-to-client">
                          <div className="col-sm-12" style={{marginLeft: '-8px'}}>
                            Cloud Expert's Feedback to manager
                          </div>

                          <div className="col-sm-12 mt-20">
                            <span className="five-star-rating-strip">
                              {rating && freelancerRating && freelancerRating.score ?
                                this.returnStars(freelancerRating.score) : "-"}
                            </span>
                          </div>

                          {
                            rating && freelancerRating && freelancerRating.message ?
                             <div className="col-sm-12 mt-20" style={{fontWeight: 'normal',marginTop: '20px',fontSize: '15px'}}>
                              "{freelancerRating.message}"
                           </div> :
                           ''}
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
)(ManagerShowRating)