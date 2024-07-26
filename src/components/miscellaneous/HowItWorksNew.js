import React, { Component } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import LandingPageHeader from "./LandingPageHeader";
import Footer from "./Footer";
import HowCanHelpYou from "./HowCanHelpYou";
import hiringImg from "../../../src/static/images/hiring.png";
import hiring1Img from "../../../src/static/images/hiring1.png";
import hiring2Img from "../../../src/static/images/hiring2.png";
import hiring3Img from "../../../src/static/images/hiring3.png";
import freelancingImg from "../../../src/static/images/free_lancing.png";
import freelancing1Img from "../../../src/static/images/free_lancing1.png";
import freelancing2Img from "../../../src/static/images/free_lancing2.png";
import freelancing3Img from "../../../src/static/images/free_lancing3.png";
import LoginPopUp from "../miscellaneous/LoginPopUP";
import SignUpPopUpNew from "../miscellaneous/SignUpPopUpNew";
import clientP1 from "../../../src/static/images/background/client-p1.png";
import clientP2 from "../../../src/static/images/background/client-p2.png";
import clientP3 from "../../../src/static/images/background/client-p3.png";
import clientP4 from "../../../src/static/images/background/client-p4.png";
import cloudP1 from "../../../src/static/images/background/cloud-p1.png";
import cloudP2 from "../../../src/static/images/background/cloud-p2.png";
import cloudP3 from "../../../src/static/images/background/cloud-p3.png";
import cloudP4 from "../../../src/static/images/background/cloud-p4.png";


export default class HowItWorks extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      openSignUpModal: false,
      path : '',
      hire: false,
      freelancer: false,
      faq: false,
      hire1: false,
      freelancer1: false
    }
  }

  componentDidMount() {
        // let path = next.location.pathname.slice(
        //     1,
        //     next.location.pathname.length
        // )
        if(this.props.location.pathname === '/how-it-works'){
          this.setState({hire : true, freelancer: false})
        }else{
          this.setState({hire : false, freelancer: false})
        }
      this.setState({path : this.props.location.pathname})
  }

  componentDidUpdate(prevState, back) {
      // console.log('this.props.history', prevState.history.location.pathname)
    if(prevState.history.location.pathname !== this.state.path){
      let path = prevState.history.location.pathname
      this.setState({path : path})
      if(path === '/how-it-works'){
        this.setState({hire : true, freelancer: false})
      }else{
        this.setState({hire : false, freelancer: false})
      }
    }
  }



  handleSignUpModal = () => {
    this.setState({ openSignUpModal: true });
  }

  closeSignUpModal = () => {
    this.setState({ openSignUpModal: false });
  }

  handleOPenModal = () => {
    this.setState({ openModal: true });
  }
  closeModal = () => {
    this.setState({ openModal: false });
  }

  showASection = (type) => {
    // console.log("event.target",type)
    if (type === "hire") {
      this.setState({
        hire: true,
        freelancer: false,
        faq: false
      })
    }else if (type === "freelancer") {
      this.setState({
        hire: false,
        freelancer: true,
        faq: false
      })
    }else{
      this.setState({
        hire: false,
        freelancer: false,
        faq: true
      })
    }
    this.setState({
      hire1: false,
      freelancer1: false
    })
  }

  showSection = (type) => {
    // console.log("event.target",type)
    if (type === "hire") {
      this.setState({
        hire1: true,
        freelancer1: false
      })
    }else{
      this.setState({
        hire1: false,
        freelancer1: true
      })
    }
  }

  render() {
    // console.log('=======',this.state.path)
    return (
      <div>
        {/* <LoginPopUp
          isOpen={this.state.openModal}
          closeModal={this.closeModal}
          history={this.props.history}
        /> */}
        <LandingPageHeader history={this.props.history} />
        {/* <SignUpPopUpNew
          isOpen={this.state.openSignUpModal}
          closeModal={this.closeSignUpModal}
          history={this.props.history}
        /> */}

        <div className="clearfix"></div>

        {/* <div className="tf-press page-header-top-margin">
          <div className="container">
            <div className="col-md-12">
              <h1>How It Works </h1>

              <h5>
                A Quick Glimpse of How Hiring and Freelancing Works on
                TalFoundry
              </h5>
              <div className="clearfix"></div>

              <Link
                to={"#"}
                onClick={() => this.handleSignUpModal("")}
                style={{ color: "#fff" }}
              >
                <div className="mail-to-container">
                  <span className="tf-mail-to-button" to={"#"}>
                    Get Started
                  </span>
                </div>
              </Link>

              <div className="clearfix"></div>
            </div>
          </div>
        </div> */}

        <div className="clearfix"></div>


          <div className="tf_services page-header-top-margin">
            <div className="invite_freelancer white-background-color mt-4" id="how-it-works-page">
              <div className="container">
                <ul className="nav nav-tabs" role="tablist" id="manager-freelancer-faq-tabs">
                  <li role="presentation" className={this.state.hire ? "active": ""}>
                    <a
                      href="#hiring"
                      aria-controls="hiring"
                      role="tab"
                      data-toggle="tab"
                      aria-expanded="true"
                      onClick={() => this.showASection('hire')}
                    >
                      If you’re hiring
                    </a>
                  </li>
                  <li role="presentation" className={this.state.freelancer ? "active": ""}>
                    <a
                      href="#freelancing"
                      aria-controls="freelancing"
                      role="tab"
                      data-toggle="tab"
                      aria-expanded="true"
                      onClick={() => this.showASection('freelancer')}
                    >
                      If you’re freelancing
                    </a>
                  </li>
                  <li role="presentation" className={this.state.faq ? "active": ""}>
                    <a
                      href="#FAQs"
                      aria-controls="FAQs"
                      role="tab"
                      data-toggle="tab"
                      aria-expanded="true"
                      onClick={() => this.showASection('faq')}
                    >
                      FAQs
                    </a>
                  </li>
                </ul>
              </div>
            </div>


              <div className="tab-content tf_home">
                <div role="tabpanel" className="tab-pane active" id="hiring">
                  <div className="container">
                      <div className="tf_ventures ">
                          <div className="row align-items-center">
                          <div className="col-md-6">
                            <h2 className="mt-30">Post a Job</h2>
                            <p>Tell us about what you are looking for. We will connect you with top quality Cloud Experts instantly.</p>
                            <p>Quickly find, engage, and work with Cloud experts on-demand for your mission-critical projects.</p>
                            <p><strong>Tell us about what you are looking for</strong></p>
                            <p>Specify the tasks, confirm the deadline and set a budget. It’s free!</p>

                            <p><strong>Receive bids within minutes</strong></p>
                            <p>Freelancers from around the world notice your project and send their proposals right away</p>
                            </div>
                            <div className="col-md-6 text-center">
                            <LazyLoadImage
                                alt={"clientP1"}
                                src={clientP1} // use normal <img> attributes as props
                                className="responsive-image how-it-works-page-image-new"
                            />
                            </div>
                          </div>
                      </div>

                      <div className="clearfix"></div>

                      <div className="tf_ventures">
                          <div className="row align-items-center">
                          <div className="col-md-6 text-center">
                            <LazyLoadImage
                                alt={"clientP2"}
                                src={clientP2} // use normal <img> attributes as props
                                className="responsive-image how-it-works-page-image-new"
                            />
                            </div>
                            <div className="col-md-6">
                            <h2>Find The Perfect Match</h2>

                            <p>Instantly find Cloud Experts with Exceptional Talents, receive and compare the quotes.</p>
                            <p><strong>Get in-depth insights into Cloud Expert profiles:</strong> Before you finalize any Cloud Expert, you get the advantage of browsing through the shortlisted profiles and get an in-depth insight into their portfolios, success stories, client ratings etc.</p>
                            <p><strong>Assess the bids:</strong> Analyze the proposals according to the merits of each Cloud Expert's qualifications, experience, line of thinking, overall cost and the timeframe.</p>
                            <p><strong>Get Talking with your Pick:</strong> Identify and ascertain the most suitable person for the contract by having a chat. Our chat platform makes your job of interviewing the suitable candidates much easier.</p>
                            </div>
                          </div>
                      </div>
                      <div className="clearfix"></div>

                      <div className="tf_ventures">
                      <div className="row align-items-center">
                        <div className="col-md-6">
                            <h2>Get Work Done</h2>
                            <p>Collaborate and Communicate with your Cloud Experts directly and get your work done faster.</p>
                            </div>
                            <div className="col-md-6 text-center">
                            <LazyLoadImage
                                alt={"clientP3"}
                                src={clientP3} // use normal <img> attributes as props
                                className="responsive-image how-it-works-page-image-new"
                            />
                            </div>
                      </div>
                      </div>
                      <div className="clearfix"></div>

                      <div className="tf_ventures">
                        <div className="row align-items-center">
                            <div className="col-md-6 text-center">
                            <LazyLoadImage
                                alt={"clientP4"}
                                src={clientP4} // use normal <img> attributes as props
                                className="responsive-image how-it-works-page-image-new"
                            />
                            </div>
                            <div className="col-md-6">
                            <h2>Pay Securely</h2>
                            <p>
                                Pay your Cloud Expert either according to the hourly
                                contract or according to the concept of a fixed price for
                                the entire project. You can reimburse periodical payments
                                in case of fixed price work as soon as a preset milestone
                                is achieved. Use our licensed escrow service to release
                                the payment accrued after completion of each milestone.
                                Invoicing and transaction histories helps you keep track
                                of the payments and minimizes the risk of any fraudulent
                                payments.
                            </p>
                            </div>
                        </div>
                      </div>
                      <div className="clearfix"></div>
                  </div>


                  <div className="col-md-12 nopad" role="tabpanel" id="hiring">
                    <div className="mn_offers text-center" id="ready-to-find-a-cloud-expert">
                      <h1>Ready to find a Cloud Expert?</h1>
                      <Link
                        onClick={(e) => {e.preventDefault(); this.handleOPenModal("")}}
                      >
                        Post a job
                      </Link>
                    </div>
                  </div>



                </div>
                <div role="tabpanel" className="tab-pane " id="freelancing">
                  <div className="container">
                    <div className="tf_ventures">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <h2>Create Your Profile</h2>
                            <p>Describe your skills and upload portfolio items and fill out your Talfoundry profile with previous job experience.</p>
                            <p><strong>Freedom of Choice:</strong> At TalFoundry you enjoy the freedom of running your own business as you experience absolute liberty to choose your own clients and projects. We will feature all the ideal jobs as soon as you complete your profile. You will also be able to look out for projects and respond to client invitations.</p>
                            <p><strong>An Awesome range of jobs with lucrative payment options:</strong> Find a wide variety of jobs posted by our esteemed clients covering a huge number of categories of expertise, where clients are very keen to match their payment worthy of your work.</p>
                        </div>
                        <div className="col-md-6 text-center">
                            <LazyLoadImage
                                alt={"cloudP1"}
                                src={cloudP1} // use normal <img> attributes as props
                                className="responsive-image how-it-works-page-image-new"
                            />
                        </div>
                    </div>
                    </div>
                    <div className="clearfix"></div>
                    <div className="tf_ventures">
                        <div className="row align-items-center">
                        <div className="col-md-6 text-center">
                            <LazyLoadImage
                                alt={"cloudP2"}
                                src={cloudP2} // use normal <img> attributes as props
                                className="responsive-image how-it-works-page-image-new"
                            />
                        </div>
                        <div className="col-md-6">
                            <h2>Find projects to work on</h2>
                            <p>Search through our list of available job offers for projects that fit your skills and compensation requirements.</p>
                            <p>Browse through the available projects, that fit your skills and compensation requirements and send your proposals.</p>
                            <p><strong>Efficient, well-organized hiring policy:</strong> We use advanced algorithms to identify the best projects that matches your skill set. If the project interests you, all you have to do is place your bid.</p>
                            <p><strong>Ride high with our programs committed to promote your talent:</strong> Make yourself stand out by working on our highly prestigious projects.</p>
                            <p><strong>Make yourself inevitable to our top clients:</strong> Cement your relationship with our finest clients by working on different projects of them repeatedly.</p>
                        </div>
                        </div>
                    </div>
                    <div className="clearfix"></div>
                    <div className="tf_ventures">
                        <div className="row align-items-center">
                        <div className="col-md-6">
                            <h2>Start Working</h2>
                            <p>When the client determines if you are right for the job, you can get hired and start working.</p>
                            <p>TalFoundry’s digital nature gives you the freedom to regulate time, place and the way you plan for a work. For every project, you can access an online workspace. The workplace will be shared between you and your client. Other features include:</p>
                            <p><strong>Secure exchange of digital data:</strong> You can send and receive files without any security hassles</p>
                            <p><strong>Real-Time feedback sharing option:</strong> Getting real-time feedback from your clients enhances your productivity and helps you deliver better. To get real-time feedback, communicate with your clients through text, chat or video.</p>
                            <p><strong>Nothing Succeeds Like Success:</strong> Work on the go via TalFoundry’s unique mobile app: Access the state-of-the-art-characteristics of our mobile app any time, anywhere by just downloading it to your mobile phones.</p>
                        </div>
                        <div className="col-md-6 text-center">

                            <LazyLoadImage
                                alt={"cloud3"}
                                src={cloudP3} // use normal <img> attributes as props
                                className="responsive-image how-it-works-page-image-new"
                            />
                        </div>
                        </div>
                    </div>
                    <div className="clearfix"></div>
                    <div className="tf_ventures">
                        <div className="row align-items-center">
                        <div className="col-md-6 text-center">
                            <LazyLoadImage
                                alt={"cloudP2"}
                                src={cloudP4} // use normal <img> attributes as props
                                className="responsive-image  how-it-works-page-image-new"
                            />
                            </div>
                            <div className="col-md-6">
                            <h2>Get Paid</h2>
                            <p>Our payment protection policy covers all projects. It ensures you get paid for all your completed projects without any hassles through the freelancing website.</p>
                            <p>Our streamlined processes enable easy invoicing and prompt payments</p>
                            <p><strong>Hourly and fixed-price projects:</strong> Present your timesheets through TalFoundry in case of hourly projects. Fixed-price jobs will be remunerated according to your set milestones and payment will be released through our escrow account.</p>
                            <p><strong>Multiple payment options:</strong> Suit yourself with the best payment methods on offer among PayPal, Wire transfer, direct deposit and more.</p>
                            <p><strong>Service fees for Cloud Experts:</strong> The take-home earnings for all Cloud Experts at TalFoundry is fixed. We charge a flat 5% for all bills of Cloud Experts with the clients</p>
                            </div>
                        </div>
                    </div>
                    <div className="clearfix"></div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 nopad">
                      <div className="mn_offers text-center" id="ready-to-get-hired">
                        <h1>Ready to get hired?</h1>
                        <Link
                          onClick={(e) => {e.preventDefault(); this.handleOPenModal("")}}
                        >
                          apply as a Cloud Expert
                        </Link>
                      </div>
                    </div>
                  </div>

                </div>

                <div role="tabpanel" className="tab-pane " id="FAQs">
                <div className="container">
                  <div className="tf_ventures tf_faq">
                    <HowCanHelpYou
                      showSection = {this.showSection}
                      hire1 = {this.state.hire1}
                      freelancer1 = {this.state.freelancer1}
                    />

                    <div className="clearfix"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="clearfix"></div>

          </div>

        <div className="clearfix"></div>
        {/* <Footer /> */}
      </div>
    );
  }
}

