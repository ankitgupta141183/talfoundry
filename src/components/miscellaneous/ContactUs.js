import React, { Component } from "react";
import { connect } from "react-redux";
import Header from '../miscellaneous/Header';
import LandingPageHeader from "../miscellaneous/LandingPageHeader";
import { Link } from "react-router-dom";
import Footer from "../miscellaneous/Footer";

class ContactUs extends Component {
  render() {
    return (
      <div>
        {this.props.isAuthenticated ?
          <Header history={this.props.history} />
          :
          <LandingPageHeader history={this.props.history} />
        }
        
        <div className="clearfix"></div>

        <div className="tf-press">
          <div className="container">
            <div className="col-md-12">
              <h1>About Us</h1>
              <h5>Creating a world of work without limits</h5>
              <div className="clearfix"></div>
            </div>
          </div>
        </div>

        <div className="clearfix"></div>

        <div className="tf-press-second-navigation">
          <div className="container">
            <div className="col-md-12">
              <ul className="press-second-navigation-list">
                <li>
                  <Link to="/aboutus">About Us</Link>
                </li>
                <li>
                  <Link href="/career">Careers</Link>
                </li>
                <li>
                  <Link to="/team">Our Team</Link>
                </li>
                <li>
                  <Link>Board of Directors</Link>
                </li>
                <li>
                  <Link to="/press">Press</Link>
                </li>
                <li>
                  <Link>Contact Us</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="news-list-content mn_center">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h2 className="press-media-resources-section-title">Our offices</h2>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <div>
                  <iframe
                    title="frame"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50470.07476441412!2d-122.47261935908904!3d37.75769481909601!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2sin!4v1578300865405!5m2!1sen!2sin"
                    width="100%"
                    height="350"
                    frameborder="0"
                    style={{ border: "0" }}
                    allowfullscreen=""
                  ></iframe>
                </div>
                <h3 className="contact-us-title">GLOBAL HEADQUARTERS</h3>
                <p className="contact-us-address">
                  Address Line 1<br />
                  Address Line 2<br />
                  City Name, State Name <br /> Zip Code
                </p>
              </div>
              <div className="col-md-4">
                <div>
                  <iframe
                    title="frame"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50470.07476441412!2d-122.47261935908904!3d37.75769481909601!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2sin!4v1578300865405!5m2!1sen!2sin"
                    width="100%"
                    height="350"
                    frameborder="0"
                    style={{ border: "0" }}
                    allowfullscreen=""
                  ></iframe>
                </div>
                <h3 className="contact-us-title">SAN FRANCISCO OFFICE</h3>
                <p className="contact-us-address">
                  Address Line 1<br />
                  Address Line 2<br />
                  City Name, State Name <br /> Zip Code
                </p>
              </div>
              <div className="col-md-4">
                <div>
                  <iframe
                    title="frame"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50470.07476441412!2d-122.47261935908904!3d37.75769481909601!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2sin!4v1578300865405!5m2!1sen!2sin"
                    width="100%"
                    height="350"
                    frameborder="0"
                    style={{ border: "0" }}
                    allowfullscreen=""
                  ></iframe>
                </div>
                <h3 className="contact-us-title">CHICAGO OFFICE</h3>
                <p className="contact-us-address">
                  Address Line 1<br />
                  Address Line 2<br />
                  City Name, State Name <br /> Zip Code
                </p>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <h2 className="press-media-resources-section-title">You'll find us here too</h2>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <h3 className="contact-us-title">CUSTOMER SUPPORT</h3>
                <p className="contact-us-address">Talfoundry Customer Support</p>
              </div>
              <div className="col-md-6">
                <h3 className="contact-us-title">PRESS INQUIRIES</h3>
                <p className="contact-us-address">press@talfoundry.com</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <h3 className="contact-us-title">ENTERPRISE SOLUTIONS</h3>
                <p className="contact-us-address">000.000.0000</p>
              </div>
              <div className="col-md-6">
                <h3 className="contact-us-title">PARTNER WITH US</h3>
                <p className="contact-us-address">partners@talfoundry.com</p>
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

export default connect(mapStateToProps)(ContactUs);
