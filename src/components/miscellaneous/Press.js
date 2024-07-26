import React, {Component} from "react";
import { connect } from "react-redux";
import Header from '../miscellaneous/Header';
import LandingPageHeader from '../miscellaneous/LandingPageHeader';
import { Link } from 'react-router-dom';
import Footer from '../miscellaneous/Footer';

class  Press extends Component {

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
                <h1>The word on the street</h1>
                <h5>The buzz continues to grow as work moves online</h5>
                <div className="clearfix"></div>
                <div className="mail-to-container">
                  <a className="tf-mail-to-button" href="mailto:press@talfoundry.com">press@talfoundry.com</a>
                </div>
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
                          <li><Link to="/team">Our Team</Link></li>
                          <li><Link>Board of Directors</Link></li>
                          <li><Link>Press</Link></li>
                          <li><Link to="/contactus">Contact Us</Link></li>
                      </ul>
                  </div>
              </div>
          </div>
        <div className="clearfix"></div>
          <div className="news-list-content mn_center">
            <div className="container">
              <div className="row">
                  <div className="col-md-12">
                      <h2 className="press-media-resources-section-title">Talfoundry in the news</h2>
                  </div>
              </div>
              <div className="row">
                <div className="col-md-3">
                  <div className="single-news-box">
                    <div className="single-news-box-image-container"
                      style={{backgroundImage: "url(https://content-static.upwork.com/blog/uploads/sites/6/2017/12/18121525/cnbc.png)"}}>
                    </div>
                    <h4 className="single-news-box-title">Skilled freelancers, earning more per hour than 70% of workers in US, don’t
                      want traditional jobs</h4>
                    <span className="single-news-box-date">Oct 3, 2019</span>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="single-news-box">
                    <div className="single-news-box-image-container"
                      style={{backgroundImage: "url(https://content-static.upwork.com/blog/uploads/sites/6/2015/06/05161321/inc.jpg)"}}>
                    </div>
                    <h4 className="single-news-box-title">Years Ago, Most People Viewed Freelance Work as Temporary. Not Anymore, Says
                      a New Study</h4>
                    <span className="single-news-box-date">Oct 3, 2019</span>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="single-news-box">
                    <div className="single-news-box-image-container"
                      style={{backgroundImage: "url(https://content-static.upwork.com/blog/uploads/sites/6/2017/12/18121525/cnbc.png)"}}>
                    </div>
                    <h4 className="single-news-box-title">Earn more than $250 an hour with these high paying independent jobs</h4>
                    <span className="single-news-box-date">Aug 21, 2019</span>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="single-news-box">
                    <div className="single-news-box-image-container"
                      style={{backgroundImage: "url(https://content-static.upwork.com/blog/uploads/sites/6/2015/05/01091622/Forbes-logo_112.jpg)"}}>
                    </div>
                    <h4 className="single-news-box-title">Will A Freelancer Write The Next Hot Super Bowl Ad?</h4>
                    <span className="single-news-box-date">Jul 29, 2019</span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3">
                  <div className="single-news-box">
                    <div className="single-news-box-image-container"
                      style={{backgroundImage: "url(https://content-static.upwork.com/blog/uploads/sites/6/2017/08/01103526/fortunelogo.jpg)"}}>
                    </div>
                    <h4 className="single-news-box-title">Sorry Google—Funding More Homes Won’t Solve the Bay Area Housing Crunch</h4>
                    <span className="single-news-box-date">Jun 22, 2019</span>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="single-news-box">
                    <div className="single-news-box-image-container"
                      style={{backgroundImage: "url(https://content-static.upwork.com/blog/uploads/sites/6/2015/05/01091617/quartz-logo_0.gif)"}}>
                    </div>
                    <h4 className="single-news-box-title">It’s Time to Factor Remote Work Into our Urban Planning</h4>
                    <span className="single-news-box-date">Jun 19, 2019</span>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="single-news-box">
                    <div className="single-news-box-image-container"
                      style={{backgroundImage: "url(https://content-static.upwork.com/blog/uploads/sites/6/2015/05/01091622/Forbes-logo_112.jpg)"}}>
                    </div>
                    <h4 className="single-news-box-title">Top Freelancers Are Doing Just Fine: A New Upwork Study</h4>
                    <span className="single-news-box-date">Jun 18, 2019</span>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="single-news-box">
                    <div className="single-news-box-image-container"
                      style={{backgroundImage: "url(https://content-static.upwork.com/blog/uploads/sites/6/2017/12/18121525/cnbc.png)"}}>
                    </div>
                    <h4 className="single-news-box-title">Skilled freelancers, earning more per hour than 70% of workers in US, don’t
                      want traditional jobs</h4>
                    <span className="single-news-box-date">Oct 3, 2019</span>
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
                  <h2 className="press-media-resources-section-title">Media resources</h2>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <h3 className="press-media-resources-widget-title">Talfoundry Logos</h3>
                  <ul className="press-media-resources-widget-list">
                    <li><Link>Talfoundry Logo (PNG, JPG)</Link></li>
                    <li><Link>Talfoundry Logo (EPS)</Link></li>
                    <li><Link>Talfoundry logo usage guidelines</Link></li>
                  </ul>
                </div>
                <div className="col-md-4">
                  <h3 className="press-media-resources-widget-title">Executive Headshots</h3>
                  <ul className="press-media-resources-widget-list">
                    <li><Link>Download (ZIP)</Link></li>
                  </ul>
                </div>
                <div className="col-md-4">
                  <h3 className="press-media-resources-widget-title">Industry Fact Sheet</h3>
                  <ul className="press-media-resources-widget-list">
                    <li><Link>Download (PDF)</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="clearfix"></div>
          <div className="tf-press">
            <div className="container">
              <div className="col-md-12">
                <h1 className="press-inquiries-footer">Press inquiries</h1>
                <div className="clearfix"></div>

                <div className="mail-to-container">
                  <a className="tf-mail-to-button" href="mailto:press@talfoundry.com">press@talfoundry.com</a>
                </div>

                <div className="clearfix"></div>
              </div>
            </div>
          </div>
          <Footer />
    </div>
    )
  }
}
const mapStateToProps = state => ({
  ...state
})

export default connect(mapStateToProps)(Press)