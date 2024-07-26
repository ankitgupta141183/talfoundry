import React, {Component} from "react";
import {} from '../../Actions/freelancerActions';
import { connect } from "react-redux";
import {getOffersForFreelancer} from '../../Actions/freelancerActions';
import FreelancerHeader from "../miscellaneous/FreelancerHeader";
import Footer from "../miscellaneous/Footer";
import top_rated_icon from '../../static/images/top-rated.png';
import idea from '../../static/images/idea.png';


class MyStats extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      isLoading: false,
      activePage: 1
    }
  }
  componentDidMount() {
    this.props.getOffers()
  }

  componentWillReceiveProps(nextProps){
    this.setState({isLoading: nextProps && nextProps.applicationIsLoading})
  }
  handlePageChange = (pageNumber) => {
    this.setState({activePage: pageNumber})
    window.scrollTo(0, 0);
  }

  render() {

    return (
      <div className="all-contacts-freelancer-account">
        <FreelancerHeader history={this.props.history} />
        <section id="my-stats-page">
          <div className="container">

              <div className="col-md-12">

                  <div className="my-stats-box">
                      <div className="row">
                          <div className="col-md-9 nopad vertical-hr">
                              <div className="row">
                                  <div className="col-md-12">
                                      <h3 className="section-title">Client Satisfaction</h3>
                                  </div>
                              </div>

                              <hr/>

                              <div className="row">
                                  <div className="col-md-4">
                                      <h3 className="section-sub-title">Job Success score</h3>
                                          <p>100% Job Success</p>
                                          <p className="top-rated"> <img src={top_rated_icon} className="top-rated-icon" alt=""/><span className="top-rated-content">TOP RATED</span></p>
                                          <p>Last updated Jul 5</p>
                                  </div>
                                  <div className="col-md-8">
                                      <div className="table-responsive">
                                          <table className="table">
                                              <tbody>
                                              <tr>
                                                  <td>12-month earning</td>
                                                  <td className="table-value-strong">$7,313</td>
                                              </tr>
                                              <tr>
                                                  <td>Client who would recommend you</td>
                                                  <td className="table-value-strong">-</td>
                                              </tr>
                                              <tr>
                                                  <td>Long-term clients</td>
                                                  <td className="table-value-strong">100%</td>
                                              </tr>
                                              <tr>
                                                  <td>Recent account holds</td>
                                                  <td className="table-value-strong">0</td>
                                              </tr>
                                              <tr>
                                                  <td>Top Rated eligible weeks</td>
                                                  <td className="table-value-strong">16 of 16</td>
                                              </tr>
                                              </tbody>
                                          </table>
                                      </div>
                                  </div>
                              </div>

                          </div>
                          <div className="col-md-3">
                              <h3 className="right-section-title">Job success</h3>
                              <p className="custom-paragraph">Your job Success reflects how well you deliver great results for your clients. This score updates about every 2 weeks.</p>
                              <p className="custom-paragraph">Top Rated Cloud Experts consistently maintain a 90%+ job Success Score or Rising Talent status, or both, for 13 out of the last 16 weeks.</p>
                          </div>

                      </div>
                  </div>

                  <div className="my-stats-box">
                      <div className="row">
                          <div className="col-md-9 nopad vertical-hr">
                              <div className="row">
                                  <div className="col-md-12">
                                      <h3 className="section-title">Client Satisfaction</h3>
                                  </div>
                              </div>

                              <hr/>

                              <div className="row">
                                  <div className="col-md-12">
                                      <p>You replied 1 of 2 invitations to apply in the past 90 days:</p>
                                  </div>
                                  <div className="col-md-12">
                                      <div className="table-responsive">
                                          <table className="table">
                                              <tbody>
                                              <tr>
                                                  <td width="35%">Responsiveness</td>
                                                  <td width="65%" className="table-value-strong">Your Responsiveness will be determined after you receive and respond to a few more job invitations. top Cloud Experts accept or decline all invitations within 24 hours.</td>
                                              </tr>
                                              <tr>
                                                  <td width="35%">You reply within a day</td>
                                                  <td width="65%" className="table-value-strong">Never - Always</td>
                                              </tr>
                                              <tr>
                                                  <td width="35%">you reply every time</td>
                                                  <td width="65%" className="table-value-strong">Never - Always</td>
                                              </tr>
                                              </tbody>
                                          </table>
                                      </div>
                                  </div>

                              </div>

                          </div>
                          <div className="col-md-3">
                              <h3 className="right-section-title">Response time</h3>
                              <p className="custom-paragraph">Responding to invitations quickly means contracts are started more often and more quickly, leading to more work for everyone.</p>
                              <h3 className="right-section-sub-title">Available</h3>
                              <p className="custom-paragraph">As needed - open to offers</p>
                              <p className="bottom-paragraph-strong"><img src={idea} className="top-rated-icon" alt=""/>The benefits of setting your Availability</p>

                          </div>

                      </div>
                  </div>

                  <div className="my-stats-box">
                      <div className="row">
                          <div className="col-md-9 nopad vertical-hr">
                              <div className="row">
                                  <div className="col-md-12">
                                      <h3 className="section-title">Marketing effectiveness</h3>
                                  </div>
                              </div>

                              <hr/>

                              <div className="row">
                                  <div className="col-md-12">
                                      <p>you've applied to 3 jobs in the past 90 days. compared to your peers:</p>
                                  </div>
                                  <div className="col-md-12">
                                      <div className="table-responsive">
                                          <table className="table">
                                              <tbody>
                                                  <tr>
                                                      <td width="35%">&nbsp;</td>
                                                      <td width="65%" className="table-value-center">among Cloud Experts in Web, Mobile & Software Dev</td>
                                                  </tr>
                                              <tr>
                                                  <td width="35%">You were viewed</td>
                                                  <td width="65%" className="table-value-strong">Less often - More often</td>
                                              </tr>
                                              <tr>
                                                  <td width="35%">You were interviewed</td>
                                                  <td width="65%" className="table-value-strong">Less often - More often</td>
                                              </tr>
                                              <tr>
                                                  <td width="35%">you where hired</td>
                                                  <td width="65%" className="table-value-strong">Less often - More often</td>
                                              </tr>
                                              </tbody>
                                          </table>
                                      </div>
                                  </div>
                                  <div className="col-md-12">
                                      <p>Your profile was discovered <span className="strong-black">0 times</span> last week. (<span className="strong-red">-100%</span> from the previous week)</p>

                                      <div className="table-responsive">
                                          <table className="table">
                                              <tbody>
                                              <tr>
                                                  <td width="35%">Profile Views</td>
                                                  <td width="65%" className="table-value-strong">Graph Here</td>
                                              </tr>
                                              <tr>
                                                  <td width="35%">Profile completeness</td>
                                                  <td width="65%" className="table-value-strong">100%</td>
                                              </tr>
                                              </tbody>
                                          </table>
                                      </div>



                                  </div>
                              </div>

                          </div>
                          <div className="col-md-3">
                              <h3 className="right-section-title">Applying</h3>
                              <p className="custom-paragraph">Look for jobs that match your skill set and experience level.</p>

                              <p className="bottom-paragraph-strong"><img src={idea} className="top-rated-icon" alt=""/>The Art of applying to jobs</p>

                          </div>

                      </div>
                  </div>

              </div>
          </div>
        </section>
        <Footer />
      </div>
    )
  }
}
const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = (dispatch) => {

  return {
    getOffers: () => dispatch(getOffersForFreelancer())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyStats)
