import React, {Component} from "react";
import { connect } from "react-redux";
import Header from '../miscellaneous/Header';
import LandingPageHeader from '../miscellaneous/LandingPageHeader';
import { Link } from 'react-router-dom';
import Footer from '../miscellaneous/Footer';

class  AboutUs extends Component {


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
        <li><Link>About Us</Link></li>
        <li><Link to="/career">Careers</Link></li>
        <li><Link to="/team">Our Team</Link></li>
        <li><Link>Board of Directors</Link></li>
        <li><Link to="/press">Press</Link></li>
        <li><Link to="/contactus">Contact Us</Link></li>
      </ul>
    </div>
  </div>
</div>


<div className="news-list-content mn_center">
  <div className="container">

    <div className="row">
      <div className="col-md-12">
        <h2>Our story</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
          ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
          nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
          anim id est laborum.</p>

        <h4 className="about-second-heading">A new way of working is born</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
          ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
          nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
          anim id est laborum.</p>
        <p>incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
          laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
          esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
          qui officia deserunt mollit anim id est laborum.</p>

        <h4 className="about-second-heading">A world of opportunities</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
          ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
          nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
          anim id est laborum.</p>

        <h4 className="about-second-heading">Talfoundry's vision</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
          ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
          nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
          anim id est laborum.</p>

        <h4 className="about-second-heading">Talfoundry's mission</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
          ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
          nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
          anim id est laborum.</p>

        <h4 className="about-second-heading">Talfoundry's values</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
          ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
          nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
          anim id est laborum.</p>

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

export default connect(mapStateToProps)(AboutUs)