import React, {Component} from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Header from '../miscellaneous/Header';
import LandingPageHeader from '../miscellaneous/LandingPageHeader';
import Footer from '../miscellaneous/Footer';

class  Team extends Component {
  render() {
    // console.log("---------",this.props.isAuthenticated)
    return (
      <div>
        {this.props.isAuthenticated ?
          <Header history={this.props.history} />
          :
          <LandingPageHeader history={this.props.history} />
        }

          <div className="clearfix"></div>

      <div className="tf-press page-header-top-margin termsofServiceHeader">
        <div className="container">
          <div className="col-md-12">
            <h1>Our Team</h1>
            <h5>Here are key stakeholders focused on building our community</h5>
            <div className="clearfix"></div>
          </div>
        </div>
      </div>
      <div className="clearfix"></div>
      <div className="tf-press-second-navigation">
        <div className="container">
          <div className="col-md-12">
            <ul className="press-second-navigation-list">
              <li><Link to="/aboutus">About Us</Link></li>
              <li><Link to="/career">Careers</Link></li>
              <li><Link>Our Team</Link></li>
              <li><Link>Board of Directors</Link></li>
              <li><Link to="/press">Press</Link></li>
              <li><Link href="/contactus">Contact Us</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="clearfix"></div>

      <div className="news-list-content mn_center">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="our-team-box">
                  <LazyLoadImage
                    alt={"Team"}
                    src={"https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_90,h_90/http://nativewptheme.net/twenty_second/wp-content/uploads/2017/02/testimonials1-135x135.jpg"} // use normal <img> attributes as props
                    className="our-team-box-profile-image"
                  />
                <h2 className="team-member-name">David Weiner</h2>
                <h3 className="team-member-position">PRESIDENT AND CEO</h3>
                <h4 className="team-member-profile-details">Praesent sapien lorem, varius a mauris a, semper varius tellus. Sed
                  vestibulum pulvinar rutrum. Nunc justo libero, faucibus id hendrerit nec, pretium eget tellus. Nam ut
                  dignissim libero. semper varius tellus. Sed vestibulum pulvinar rutrum. Nunc justo libero, faucibus id
                  hendrerit nec, pretium eget tellus. Nam ut dignissim libero. Sed vestibulum pulvinar rutrum. Nunc justo
                  libero, faucibus id hendrerit nec, pretium eget tellus. Nam ut dignissim libero.</h4>

              </div>
            </div>

            <div className="col-md-6">
              <div className="our-team-box">
                <LazyLoadImage
                    alt={"Team"}
                    src={"https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_90,h_90/http://nativewptheme.net/twenty_second/wp-content/uploads/2017/02/testimonials2-135x135.jpg"} // use normal <img> attributes as props
                    className="our-team-box-profile-image"
                  />
                <h2 className="team-member-name">Michael Smith</h2>
                <h3 className="team-member-position">CHEIF TECHNICAL OFFICER</h3>
                <h4 className="team-member-profile-details">Praesent sapien lorem, varius a mauris a, semper varius tellus. Sed
                  vestibulum pulvinar rutrum. Nunc justo libero, faucibus id hendrerit nec, pretium eget tellus. Nam ut
                  dignissim libero. semper varius tellus. Sed vestibulum pulvinar rutrum. Nunc justo libero, faucibus id
                  hendrerit nec, pretium eget tellus. Nam ut dignissim libero. Sed vestibulum pulvinar rutrum. Nunc justo
                  libero, faucibus id hendrerit nec, pretium eget tellus. Nam ut dignissim libero.</h4>

              </div>
            </div>

            <div className="col-md-6">
              <div className="our-team-box">
              <LazyLoadImage
                    alt={"Team"}
                    src={"https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_90,h_90/http://nativewptheme.net/twenty_second/wp-content/uploads/2017/02/testimonials4-135x135.jpg"} // use normal <img> attributes as props
                    className="our-team-box-profile-image"
                  />
                <h2 className="team-member-name">Amanda Jones</h2>
                <h3 className="team-member-position">MARKETING MANAGER</h3>
                <h4 className="team-member-profile-details">Praesent sapien lorem, varius a mauris a, semper varius tellus. Sed
                  vestibulum pulvinar rutrum. Nunc justo libero, faucibus id hendrerit nec, pretium eget tellus. Nam ut
                  dignissim libero. semper varius tellus. Sed vestibulum pulvinar rutrum. Nunc justo libero, faucibus id
                  hendrerit nec, pretium eget tellus. Nam ut dignissim libero. Sed vestibulum pulvinar rutrum. Nunc justo
                  libero, faucibus id hendrerit nec, pretium eget tellus. Nam ut dignissim libero.</h4>

              </div>
            </div>

            <div className="col-md-6">
              <div className="our-team-box">
              <LazyLoadImage
                    alt={"Team"}
                    src={"https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_90,h_90/http://nativewptheme.net/twenty_second/wp-content/uploads/2017/02/testimonials3-135x135.jpg"} // use normal <img> attributes as props
                    className="our-team-box-profile-image"
                  />
                <h2 className="team-member-name">Jessica Spencer</h2>
                <h3 className="team-member-position">CHIEF FINANCIAL OFFICER</h3>
                <h4 className="team-member-profile-details">Praesent sapien lorem, varius a mauris a, semper varius tellus. Sed
                  vestibulum pulvinar rutrum. Nunc justo libero, faucibus id hendrerit nec, pretium eget tellus. Nam ut
                  dignissim libero. dignissim libero. semper varius tellus. Sed vestibulum pulvinar rutrum. Nunc justo libero,
                  Sed vestibulum pulvinar rutrum. Nunc justo libero, faucibus id hendrerit nec, pretium eget tellus. Nam ut
                  dignissim libero. </h4>

              </div>
            </div>

          </div>
        </div>
      </div>


      <div className="clearfix"></div>

      <div className="tf-press-media-resources">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="press-media-resources-section-title">Our investors</h2>
            </div>
          </div>


          <div className="row">
            <div className="col-md-2">
            <LazyLoadImage
                alt={"Team"}
                src="https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_123,h_70/http://nativewptheme.net/third/wp-content/uploads/2016/11/client1.png"
              />
            </div>

            <div className="col-md-2">
            <LazyLoadImage
                alt={"Team"}
                src="https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_123,h_70/http://nativewptheme.net/third/wp-content/uploads/2016/11/client7.png"
              />
            </div>
            <div className="col-md-2">
            <LazyLoadImage
                alt={"Team"}
                src="https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_123,h_70/http://nativewptheme.net/third/wp-content/uploads/2016/11/client6.png"
              />
            </div>
            <div className="col-md-2">
            <LazyLoadImage
                alt={"Team"}
                src="https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_123,h_70/http://nativewptheme.net/third/wp-content/uploads/2016/11/client5.png"
              />
            </div>
            <div className="col-md-2">
            <LazyLoadImage
                alt={"Team"}
                src="https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_123,h_70/http://nativewptheme.net/third/wp-content/uploads/2016/11/client8.png"
              />
            </div>
            <div className="col-md-2">
            <LazyLoadImage
                alt={"Team"}
                src="https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_123,h_70/http://nativewptheme.net/third/wp-content/uploads/2016/11/client3.png"
              />
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

export default connect(mapStateToProps)(Team)