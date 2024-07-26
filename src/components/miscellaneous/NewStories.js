import React, {Component} from "react";
import LandingPageHeader from '../miscellaneous/LandingPageHeader';
import Footer from '../miscellaneous/Footer';
import video_banner_1 from '../../../src/static/images/video-banner-1.jpg'
import video_banner_2 from '../../../src/static/images/video-banner-2.jpg'
import video_banner_3 from '../../../src/static/images/video-banner-3.jpg'
import video_banner_4 from '../../../src/static/images/video-banner-4.png'
import video_banner_5 from '../../../src/static/images/video-banner-5.jpg'
import video_banner_6 from '../../../src/static/images/video-banner-6.png'
import video_banner_7 from '../../../src/static/images/video-banner-7.png'
import video_banner_8 from '../../../src/static/images/video-banner-8.jpg'


class  NewStories extends Component {
  render() {
    return (
      <div>
        <LandingPageHeader history={this.props.history} />
      <div className="tf-press">
    <div className="container">
        <div className="col-md-12">
            <h1>Customer Stories</h1>
            <h5>Watch how businesses are getting more done with freelancers.</h5>
            <div className="clearfix"></div>

            <div className="mail-to-container">
                <a className="tf-mail-to-button" href="#watch-their-stories">Watch Stories</a>
            </div>

            <div className="clearfix"></div>
        </div>
    </div>
</div>

<div className="clearfix"></div>


      <div className="clients-and-freelancers-stories" id="watch-their-stories">
      <div className="container">
          <div className="row">
              <div className="col-md-12">
                  <h2 className="press-media-resources-section-title">Watch their stories</h2>
              </div>
          </div>

          <div className="row">
              <div className="col-md-12">
                  <div className="tabbable-panel margin-tops4 ">
                      <div className="tabbable-line">

                          <ul className="nav nav-tabs tabtop  tabsetting clients-freelancers-stories-tabs">
                              <li className="active">
                                  <a href="#client-stories" data-toggle="tab">Client Stories</a>
                              </li>
                              <li>
                                  <a href="#freelancer-stories" data-toggle="tab">Freelancer Stories</a>
                              </li>
                          </ul>

                          <div className="tab-content margin-tops">
                              <div className="tab-pane active fade in" id="client-stories">
                                  <div className="row">
                                      <div className="col-md-6">
                                          <div className="client-stories-video-box">
                                            <img src= {video_banner_1} alt=""/>
                                          </div>

                                      </div>
                                      <div className="col-md-6">
                                          <div className="client-stories-video-box">
                                          <img src= {video_banner_2} alt=""/>
                                          </div>
                                      </div>
                                  </div>

                                  <div className="row">
                                      <div className="col-md-6">
                                          <div className="client-stories-video-box">
                                          <img src= {video_banner_3} alt=""/>
                                          </div>
                                      </div>
                                      <div className="col-md-6">
                                          <div className="client-stories-video-box">
                                          <img src= {video_banner_4} alt=""/>
                                          </div>
                                      </div>
                                  </div>
                              </div>

                              <div className="tab-pane fade" id="freelancer-stories">
                                  <div className="row">
                                      <div className="col-md-6">
                                          <div className="client-stories-video-box">
                                          <img src= {video_banner_5} alt=""/>
                                          </div>

                                      </div>
                                      <div className="col-md-6">
                                          <div className="client-stories-video-box">
                                          <img src= {video_banner_6} alt=""/>
                                          </div>
                                      </div>
                                  </div>

                                  <div className="row">
                                      <div className="col-md-6">
                                          <div className="client-stories-video-box">
                                          <img src= {video_banner_7} alt=""/>
                                          </div>
                                      </div>
                                      <div className="col-md-6">
                                          <div className="client-stories-video-box">
                                          <img src= {video_banner_8} alt=""/>
                                          </div>
                                      </div>
                                  </div>
                              </div>

                          </div>
                      </div>
                  </div>

              </div>
          </div>
      </div>
  </div>
  <div className="clearfix"></div>

  <div className="career-page-team-section">
      <div className="container">

          <div className="row">
              <div className="col-md-12">
                  <h2 className="press-media-resources-section-title why-clients-and-freelancers-love">Why clients and their
                      freelancers love Talfoundry</h2>
              </div>
          </div>

          <div className="clearfix"></div>

          <div className="row">
              <div className="col-md-4">
                  <div className="career-page-our-team-box clients-and-freelancers-love">
                      <img className="career-page-our-team-box-profile-image"
                          src="https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_90,h_90/http://nativewptheme.net/twenty_second/wp-content/uploads/2017/02/testimonials1-135x135.jpg" alt=""/>
                      <h4 className="career-page-team-member-profile-details">"Praesent sapien lorem, varius a mauris a,
                          semper varius tellus. Sed vestibulum pulvinar rutrum. Nunc justo libero, faucibus id hendrerit
                          nec, pretium eget tellus. Nam ut dignissim libero. semper varius tellus. Sed vestibulum pulvinar
                          rutrum. Nunc justo libero, faucibus id hendrerit nec, pretium eget tellus. Nam ut dignissim
                          libero."</h4>
                      <h2 className="career-page-team-member-name">David Weiner</h2>
                      <h3 className="career-page-team-member-position">PRESIDENT AND CEO</h3>

                  </div>
              </div>

              <div className="col-md-4">
                  <div className="career-page-our-team-box clients-and-freelancers-love">
                      <img className="career-page-our-team-box-profile-image"
                          src="https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_90,h_90/http://nativewptheme.net/twenty_second/wp-content/uploads/2017/02/testimonials3-135x135.jpg" alt=""/>
                      <h4 className="career-page-team-member-profile-details">"Praesent sapien lorem, varius a mauris a,
                          semper varius tellus. Sed vestibulum pulvinar rutrum. Nunc justo libero, faucibus id hendrerit
                          nec, pretium eget tellus. Nam ut dignissim libero. semper varius tellus. Sed vestibulum pulvinar
                          rutrum. Nunc justo libero, faucibus id hendrerit nec, pretium eget tellus. Nam ut dignissim
                          libero."</h4>
                      <h2 className="career-page-team-member-name">Jessica Spencer</h2>
                      <h3 className="career-page-team-member-position">Human Resources</h3>

                  </div>
              </div>
              <div className="col-md-4">
                  <div className="career-page-our-team-box clients-and-freelancers-love">
                      <img className="career-page-our-team-box-profile-image"
                          src="https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_90,h_90/http://nativewptheme.net/twenty_second/wp-content/uploads/2017/02/testimonials2-135x135.jpg" alt=""/>
                      <h4 className="career-page-team-member-profile-details">"Praesent sapien lorem, varius a mauris a,
                          semper varius tellus. Sed vestibulum pulvinar rutrum. Nunc justo libero, faucibus id hendrerit
                          nec, pretium eget tellus. Nam ut dignissim libero. semper varius tellus. Sed vestibulum pulvinar
                          rutrum. Nunc justo libero, faucibus id hendrerit nec, pretium eget tellus. Nam ut dignissim
                          libero."</h4>
                      <h2 className="career-page-team-member-name">Michael Smith</h2>
                      <h3 className="career-page-team-member-position">CHIEF FINANCIAL OFFICER</h3>

                  </div>
              </div>
          </div>

          <div className="clearfix"></div>

          <div className="row">
              <div className="col-md-4">
                  <div className="career-page-our-team-box clients-and-freelancers-love">
                      <img className="career-page-our-team-box-profile-image"
                          src="https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_90,h_90/http://nativewptheme.net/twenty_second/wp-content/uploads/2017/02/testimonials2-135x135.jpg" alt=""/>
                      <h4 className="career-page-team-member-profile-details">"Praesent sapien lorem, varius a mauris a,
                          semper varius tellus. Sed vestibulum pulvinar rutrum. Nunc justo libero, faucibus id hendrerit
                          nec, pretium eget tellus. Nam ut dignissim libero. semper varius tellus. Sed vestibulum pulvinar
                          rutrum. Nunc justo libero, faucibus id hendrerit nec, pretium eget tellus. Nam ut dignissim
                          libero."</h4>
                      <h2 className="career-page-team-member-name">Michael Smith</h2>
                      <h3 className="career-page-team-member-position">PRESIDENT AND CEO</h3>

                  </div>
              </div>

              <div className="col-md-4">
                  <div className="career-page-our-team-box clients-and-freelancers-love">
                      <img className="career-page-our-team-box-profile-image"
                          src="https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_90,h_90/http://nativewptheme.net/twenty_second/wp-content/uploads/2017/02/testimonials4-135x135.jpg" alt=""/>
                      <h4 className="career-page-team-member-profile-details">"Praesent sapien lorem, varius a mauris a,
                          semper varius tellus. Sed vestibulum pulvinar rutrum. Nunc justo libero, faucibus id hendrerit
                          nec, pretium eget tellus. Nam ut dignissim libero. semper varius tellus. Sed vestibulum pulvinar
                          rutrum. Nunc justo libero, faucibus id hendrerit nec, pretium eget tellus. Nam ut dignissim
                          libero."</h4>
                      <h2 className="career-page-team-member-name">Amanda Jones</h2>
                      <h3 className="career-page-team-member-position">Human Resources</h3>

                  </div>
              </div>
              <div className="col-md-4">
                  <div className="career-page-our-team-box clients-and-freelancers-love">
                      <img className="career-page-our-team-box-profile-image"
                          src="https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_90,h_90/http://nativewptheme.net/twenty_second/wp-content/uploads/2017/02/testimonials1-135x135.jpg" alt=""/>
                      <h4 className="career-page-team-member-profile-details">"Praesent sapien lorem, varius a mauris a,
                          semper varius tellus. Sed vestibulum pulvinar rutrum. Nunc justo libero, faucibus id hendrerit
                          nec, pretium eget tellus. Nam ut dignissim libero. semper varius tellus. Sed vestibulum pulvinar
                          rutrum. Nunc justo libero, faucibus id hendrerit nec, pretium eget tellus. Nam ut dignissim
                          libero."</h4>
                      <h2 className="career-page-team-member-name">Michael Smith</h2>
                      <h3 className="career-page-team-member-position">CHIEF FINANCIAL OFFICER</h3>

                  </div>
              </div>
          </div>

          <div className="clearfix"></div>
      </div>
  </div>


  <Footer />
  </div>
    )
  }
}
// const mapStateToProps = state => ({
//   ...state
// })

export default (NewStories)