import React, { Component } from "react";
import { connect } from "react-redux";
import Header from '../miscellaneous/Header';
import LandingPageHeader from "../miscellaneous/LandingPageHeader";
import Footer from "../miscellaneous/Footer";
import { Link } from "react-router-dom";



class Careers extends Component {

  scrollIntoView = (e) => {
    e.preventDefault();
    document.getElementById('explore-life').scrollIntoView()
  }

  render() {
    return (
      <div>
        {this.props.isAuthenticated ?
          <Header history={this.props.history} />
          :
          <LandingPageHeader history={this.props.history} />
        }
        <div className="clearfix"></div>

        <div className="clearfix"></div>

        <div className="tf-press mt-70">
          <div className="container">
            <div className="col-md-12">
              <h1>Change how the world works</h1>
              <h5>Join our team as we redefine work</h5>
              <div className="clearfix"></div>

              <div className="mail-to-container">
                <a className="tf-mail-to-button" href="#open-postion">
                  See Open Positions
                </a>
              </div>

              <div className="clearfix"></div>
            </div>
          </div>
        </div>

        <div className="clearfix"></div>

        <div className="news-list-content">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h2 className="press-media-resources-section-title">
                  Work with a purpose. And a smile.
                </h2>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="career-key-point-box">
                  <img className="career-key-point-box-image" src="./images/history.png" alt="" />
                  <h2 className="career-key-point-box-name">COME MAKE HISTORY</h2>
                  <h4 className="career-key-point-box-details">
                    Help bring online work to every corner of the world.
                  </h4>
                </div>
              </div>

              <div className="col-md-4">
                <div className="career-key-point-box">
                  <img
                    className="career-key-point-box-image"
                    src="./images/bedge-icon.png"
                    alt=""
                  />
                  <h2 className="career-key-point-box-name">DO STUFF YOU’RE PROUD OF</h2>
                  <h4 className="career-key-point-box-details">
                    Be part of a fun and passionate crew reinventing an industry. Along the way
                    you’ll draw a nice paycheck and work on projects that truly matter.
                  </h4>
                </div>
              </div>
              <div className="col-md-4">
                <div className="career-key-point-box">
                  <img
                    className="career-key-point-box-image"
                    src="./images/heart-icon.png"
                    alt=""
                  />
                  <h2 className="career-key-point-box-name">WHISTLE WHILE YOU WORK</h2>
                  <h4 className="career-key-point-box-details">
                    Enjoy a healthy work/life balance, with great perks from free lunches and fun
                    afternoon social activities to work-from-home Wednesdays.
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="clearfix"></div>

        <div className="tf-press" id="explore-life">
          <div className="container">
            <div className="col-md-12">
              <h1 className="press-inquiries-footer">Explore Life at Talfoundry</h1>
              <div className="clearfix"></div>

              <div className="mail-to-container">
                <Link className="tf-mail-to-button" onClick={(e) => {e.preventDefault(); this.scrollIntoView()}}>
                  Learn More
                </Link>
              </div>

              <div className="clearfix"></div>
            </div>
          </div>
        </div>

        <div className="clearfix"></div>

        <div className="career-page-team-section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h2 className="press-media-resources-section-title">Meet Talfoundry Employees</h2>
              </div>
            </div>

            <div className="clearfix"></div>

            <div className="row">
              <div className="col-md-4">
                <div className="career-page-our-team-box">
                  <img
                    className="career-page-our-team-box-profile-image"
                    src="https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_90,h_90/http://nativewptheme.net/twenty_second/wp-content/uploads/2017/02/testimonials1-135x135.jpg"
                    alt=""
                  />
                  <h2 className="career-page-team-member-name">David Weiner</h2>
                  <h3 className="career-page-team-member-position">PRESIDENT AND CEO</h3>
                  <h4 className="career-page-team-member-profile-details">
                    Praesent sapien lorem, varius a mauris a, semper varius tellus. Sed vestibulum
                    pulvinar rutrum. Nunc justo libero, faucibus id hendrerit nec, pretium eget
                    tellus. Nam ut dignissim libero. semper varius tellus. Sed vestibulum pulvinar
                    rutrum. Nunc justo libero, faucibus id hendrerit nec, pretium eget tellus. Nam
                    ut dignissim libero. Sed vestibulum pulvinar rutrum. Nunc justo libero, faucibus
                    id hendrerit nec, pretium eget tellus. Nam ut dignissim libero.
                  </h4>
                </div>
              </div>

              <div className="col-md-4">
                <div className="career-page-our-team-box">
                  <img
                    className="career-page-our-team-box-profile-image"
                    src="https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_90,h_90/http://nativewptheme.net/twenty_second/wp-content/uploads/2017/02/testimonials3-135x135.jpg"
                    alt=""
                  />
                  <h2 className="career-page-team-member-name">Jessica Spencer</h2>
                  <h3 className="career-page-team-member-position">Human Resources</h3>
                  <h4 className="career-page-team-member-profile-details">
                    Praesent sapien lorem, varius a mauris a, semper varius tellus. Sed vestibulum
                    pulvinar rutrum. Nunc justo libero, faucibus id hendrerit nec, pretium eget
                    tellus. Nam ut dignissim libero. dignissim libero. semper varius tellus. Sed
                    vestibulum pulvinar rutrum. Nunc justo libero, Sed vestibulum pulvinar rutrum.
                    Nunc justo libero, faucibus id hendrerit nec, pretium eget tellus. Nam ut
                    dignissim libero.{" "}
                  </h4>
                </div>
              </div>
              <div className="col-md-4">
                <div className="career-page-our-team-box">
                  <img
                    className="career-page-our-team-box-profile-image"
                    src="https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_90,h_90/http://nativewptheme.net/twenty_second/wp-content/uploads/2017/02/testimonials2-135x135.jpg"
                    alt=""
                  />
                  <h2 className="career-page-team-member-name">Michael Smith</h2>
                  <h3 className="career-page-team-member-position">CHIEF FINANCIAL OFFICER</h3>
                  <h4 className="career-page-team-member-profile-details">
                    Praesent sapien lorem, varius a mauris a, semper varius tellus. Sed vestibulum
                    pulvinar rutrum. Nunc justo libero, faucibus id hendrerit nec, pretium eget
                    tellus. Nam ut dignissim libero. dignissim libero. semper varius tellus. Sed
                    vestibulum pulvinar rutrum. Nunc justo libero, Sed vestibulum pulvinar rutrum.
                    Nunc justo libero, faucibus id hendrerit nec, pretium eget tellus. Nam ut
                    dignissim libero.{" "}
                  </h4>
                </div>
              </div>
            </div>

            <div className="clearfix"></div>

            <div className="row">
              <div className="col-md-12">
                <div className="show-more-employee-container">
                  <Link className="show-more-employee-button" href={`#`}>
                    Show More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="clearfix"></div>

        <div className="tf-press">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="press-inquiries-footer">Join our team</h1>
                <div className="clearfix"></div>

                <div className="mail-to-container">
                  <a className="tf-mail-to-button" href="#open-postion">
                    See Open Positions
                  </a>
                </div>

                <div className="clearfix"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="clearfix"></div>

        <div className="cities-office-images"  id="open-postion">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="tabbable-panel margin-tops4">
                  <div className="tabbable-line">
                    <ul className="nav nav-tabs tabtop  tabsetting">
                      <li className="active">
                        {" "}
                        <a href="#city_1" data-toggle="tab">
                          San Francisco
                        </a>{" "}
                      </li>
                      <li>
                        {" "}
                        <a href="#city_2" data-toggle="tab">
                          Chicago
                        </a>{" "}
                      </li>
                      <li>
                        {" "}
                        <a href="#city_3" data-toggle="tab">
                          Santa Clara
                        </a>{" "}
                      </li>
                    </ul>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="clearfix"></div>

        <div className="benefit-section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h3>Equal Opportunity Employer</h3>
                <p>
                  Praesent sapien lorem, varius a mauris a, semper varius tellus. Sed vestibulum
                  pulvinar rutrum. Nunc justo libero, faucibus id hendrerit nec, pretium eget
                  tellus. Nam ut dignissim libero. semper varius tellus. Sed vestibulum pulvinar
                  rutrum. Nunc justo libero, faucibus id hendrerit nec, pretium eget tellus. Nam ut
                  dignissim libero. Sed vestibulum pulvinar rutrum. Nunc justo libero, faucibus id
                  hendrerit nec, pretium eget tellus. Nam ut dignissim libero.Praesent sapien lorem,
                  varius a mauris a, semper varius tellus. Sed vestibulum pulvinar rutrum. Nunc
                  justo libero, faucibus id hendrerit nec, pretium eget tellus. Nam ut dignissim
                  libero. semper varius tellus. Sed vestibulum pulvinar rutrum. Nunc justo libero,
                  faucibus id hendrerit nec, pretium eget tellus. Nam ut dignissim libero. Sed
                  vestibulum pulvinar rutrum. Nunc justo libero, faucibus id hendrerit nec, pretium
                  eget tellus. Nam ut dignissim libero.
                </p>

                <h3>Reasonable Accommodation</h3>
                <p>
                  Praesent sapie Sed vestibulum pulvinar rutrum. Nunc justo libero, faucibus id
                  hendrerit nec, pretium eget tellus. Nam ut dignissim libero. semper varius tellus.
                  Sed vestibulum pulvinar rutrum. Nunc justo libero, faucibus id hendrerit nec,
                  pretium eget tellus. Nam ut dignissim libero. Sed vestibulum pulvinar rutrum. Nunc
                  justo libero, faucibus id hendrerit nec, pretium eget tellus. Nam ut dignissim
                  libero.Praesent sapien lorem, varius a mauris a, semper varius tellus. Sed
                  vestibulum pulvinar rutrum. Nunc justo libero, faucibus id hendrerit nec, pretium
                  eget tellus. Nam ut dignissim libero. semper varius tellus. Sed vestibulum
                  pulvinar rutrum. Nunc justo libero, faucibus id hendrerit nec, pretium eget{" "}
                </p>

                <h3>Commitment to Diversity</h3>
                <p>
                  {" "}
                  semper varius tellus. Sed vestibulum pulvinar rutrum. Nunc justo libero, faucibus
                  id hendrerit nec, pretium eget tellus. Nam ut dignissim libero. semper varius
                  tellus. Sed vestibulum pulvinar rutrum. Nunc justo libero, faucibus id hendrerit
                  nec, pretium eget tellus. Nam ut dignissim libero. Sed vestibulum pulvinar rutrum.
                  Nunc justo libero, faucibus id hendrerit nec, pretium eget tellus. Nam ut
                  dignissim libero.Praesent sapien lorem, varius a mauris a, semper varius tellus.
                  Sed vestibulum pulvinar rutrum. Nunc justo libero, faucibus id hendrerit nec,
                  pretium eget tellus. Nam ut dignissim libero. semper varius tellus. Sed vestibulum
                  pulvinar rutrum. Nunc justo libero, faucibus id hendrerit nec, pretium eget{" "}
                </p>

                <h3>Benefit Statement</h3>
                <p>
                  Praesent sapien lorem, varius a mauris a, semper varius tellus. Sed vestibulum
                  pulvinar rutrum. Nunc justo libero, faucibus id hendrerit nec, pretium eget
                  tellus. Nam ut dignissim libero. semper varius tellus. Sed vestibulum pulvinar
                  rutrum. Nunc justo libero, faucibus id hendrerit nec, pretium eget tellus. Nam ut
                  dignissim libero. Sed vestibulum pulvinar rutrum. Nunc justo libero, faucibus id
                  hendrerit nec, pretium eget tellus. Nam ut dignissim libero.Praesent sapien lorem,
                  varius a mauris a, semper varius tellus. Sed vestibulum pulvinar rutrum. Nunc
                  justo libero, faucibus id hendrerit nec, pretium eget tellus. Nam ut dignissim
                  libero. semper varius tellus. Sed vestibulum pulvinar rutrum. Nunc justo libero,
                  faucibus id hendrerit nec, pretium eget tellus. Nam ut dignissim libero. Sed
                  vestibulum pulvinar rutrum. Nunc justo libero, faucibus id hendrerit nec, pretium
                  eget tellus. Nam ut dignissim libero.{" "}
                </p>
              </div>
            </div>
            <div className="row benefit-table">
              <div className="col-md-12">
                <table className="table table-responsive table-bordered table-bordered-thick">
                  <thead>
                    <tr>
                      <th colspan="3">Benefits</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Medical insurance for you and your family</td>
                      <td>Rich 401(k) offering with matching</td>
                      <td>
                        12 week fully paid parental leave with full pre and post pregnancy support
                        network
                      </td>
                    </tr>
                    <tr>
                      <td>Free meals and snacks 5 days a week</td>
                      <td>Monthly fitness reimbursement program</td>
                      <td>Unlimited PTO policy</td>
                    </tr>
                    <tr>
                      <td>On-site perks such as chair massage, dry cleaning and more</td>
                      <td>Fertility and adoption subsidies</td>
                      <td>Pre-tax commuter benefits that are subsidized at 50%</td>
                    </tr>
                    <tr>
                      <td>Generous ESPP program</td>
                      <td>On-demand back-up child care</td>
                      <td>24 Hour Emotional Well-being support</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="clearfix"></div>
        <Footer />
      </div>
    )
  }
}
const mapStateToProps = state => ({
  ...state
})

export default connect(mapStateToProps)(Careers);
