import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Header from '../miscellaneous/Header';
import LandingPageHeader from "./LandingPageHeader";
import Footer from "./Footer";
// import LoginPopUp from "./LoginPopUP";
// import SignUpPopUpNew from "./SignUpPopUpNew";

class TermsofService extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      openSignUpModal: false,
      hiring : true
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

  showASection = (event) => {
    if (event.target.id === "hiring") {
      this.setState({
        hiring : true
      })
    }else{
      this.setState({
        hiring : false
      })
    }
  }

  render() {
    return (
      <div>
        {/* <LoginPopUp
          isOpen={this.state.openModal}
          closeModal={this.closeModal}
          history={this.props.history}
        /> */}
        {this.props.isAuthenticated ?
          <Header history={this.props.history} />
          :
          <LandingPageHeader history={this.props.history} />
        }

        {/* <SignUpPopUpNew
          isOpen={this.state.openSignUpModal}
          closeModal={this.closeSignUpModal}
          history={this.props.history}
        /> */}

        <div className="clearfix"></div>

        <div className="tf-press page-header-top-margin termsofServiceHeader">
          <div className="container">
            <div className="col-md-12">
              <h1>Terms of Service</h1>
            </div>
          </div>
        </div>

        <div className="tf_services termsofServiceBody">
          <div className="invite_freelancer white-background-color" id="how-it-works-page">
            <div className="container pb-5">
              <div className="col-md-2 col-sm-3">
                <ul className="nav nav-pills nav-stacked pt-3">
                  <li><Link  to="/privacy-policy" className="text-dark">Privacy Policy</Link></li>
                  <li><Link to="/terms-of-Service" >Terms of Service</Link></li>
                </ul>
              </div>
              <div className="col-md-10 col-sm-9">
                <p className="pt-4">
                  The following Terms of Service, which include the Privacy Policy, IP Policy, and any guideline, policy or content displayed on the Website, are a legally binding contractual agreement between you ("User", "you," "your") and Websoft, Inc. d/b/a talfoundry.com ("talfoundry.com", "we", "us") (hereinafter collectively referred to as the "Terms of Service"). By visiting or using the services available from the domain and sub-domains of www.talfoundry.com (the "Website"), you agree to be legally bound by these Terms of Service. We reserve the right to revise these Terms of Service and all linked information from time to time in our sole discretion by updating this posting or any linked information. Unless otherwise provided in such revision, the revised terms will take effect when they are posted.
                </p>

                <h2>Overview and Definitions</h2>

                  <h4 className="pt-2 pb-2">(A) Employer and Freelancer</h4>
                    <p>
                      talfoundry.com is an online marketplace that enables buyers of professional services ("Employers") to search for, enter into and manage transactions with providers of professional services ("Freelancers" and, collectively with Employers, "Registered Users"). The Website contains features that enable Freelancers and Employers to do, among other things, the following:
                    </p>
                    <p> <b> Employers: </b> Post Jobs, search for Freelancers, communicate with Freelancers,negotiate with Freelancers, award Jobs to Freelancers, manage Jobs, leave feedback for Freelancers, and pay Freelancers.</p>

                    <p><b>Freelancers: </b> Create profiles, advertise capabilities, submit Quotes, negotiate with Employers, obtain Job awards, invoice, obtain feedback from Employers, and receive payment from Employers.</p>

                    <p>We also provide registered users with certain services described in, and subject to, these Terms of Service (as further defined below, the "Services"). We may add, delete or modify some or all of such Services at any time at our sole discretion with reasonable notice posted in advance on the Website. Capitalized terms used in these Terms of Service have the following meanings:</p>

                    <p><b>1099 Service: </b> means the service described in Section 7.</p>

                    <p><b>Account: </b>  means the account created by the Website upon registration.</p>

                    <p><b>Assumed Payment Liabilities: </b> shall mean that portion of a Freelancer's total service charges for a Job which talfoundry.com agrees to assume in consideration of the Service Charges.</p>

                    <p><b>Arbitration Service: </b> means the service described in Section 6.</p>

                    <p><b>Employer's Acceptance of Services: shall mean: </b> (i) with respect to an Invoice, a transfer of funds by Employer to talfoundry.com in respect of such Invoice or (ii) with respect to the SafePay Service, the earlier to occur of the following: (a) Employer and the Freelancer agree as to the rightful recipient of the funds or (b) Employer and Freelancer have concluded the process comprising the Arbitration Service.</p>

                    <p><b>Talfoundry Billing and Payment Services: </b> means, collectively, the Talfoundry Invoice Service and the SafePay Service.</p>

                    <p><b>Talfoundry Invoice Service: </b> means the service described in Section 5(A).</p>

                    <p><b>SafePay Service: </b>  means the service described in Section 5(B).</p>

                    <p><b>Service Charges: </b> means, as applicable, the Job, Handling, Withdraw, and Arbitration Service Fees.</p>

                    <p><b>Services: </b>  means, collectively, the Talfoundry Billing and Payment Service, the Arbitration Service and the 1099 Service.</p>

                    <p><b>Website: </b> means the world wide web site operated by talfoundry.com at http://www.talfoundry.com or any replacement URL.</p>

                    <h2> Registration </h2>

                      <h4 className="pt-2 pb-2"> (A) Eligibility </h4>
                      <p>To access our Services through our Website, you must be a legal entity, or an individual of eighteen (18) years of age or older who can form legally binding contracts. To become a Registered User, you must accept all of the terms and conditions in, incorporated by reference in, and linked to, these Terms of Service. By becoming a Registered User, you agree to: (1) Abide by the Terms of Service and the processes, procedures, and guidelines described throughout the Website; (2) Be financially responsible for your use of the Website and the purchase or delivery of services; and (3) Perform your obligations as specified by any Job Agreement that you accept, unless such obligations are prohibited by law or by the Terms of Service. talfoundry.com reserves the right, in its sole discretion, to refuse, suspend, or terminate Services to anyone.</p>

                      <h4 className="pt-2 pb-2" > (B) Registration </h4>
                      <p>To become a Registered User and to access Services you must register for an Account. You agree to provide true, accurate and complete information as prompted by the registration form and all forms you access on the Website, and to update this information to maintain its truthfulness, accuracy and completeness.</p>

                      <h4 className="pt-2 pb-2" > (C) Accounts and Profiles </h4>
                      <p>General. Once you have registered with the Website as a Registered User, the Website will create your Account with talfoundry.com and associate it with an account number. You may create a profile under your Account, in accordance with Section 2(D). Username and Password. During registration, you will be asked to choose a username and password for the Account. As a Registered User, you agree and you are entirely responsible to safeguard and maintain the confidentiality of the username and password you use to access this Website. You authorize talfoundry.com to assume that any person using the Website with your username and password is you or is authorized to act for you. You agree to notify us immediately if you suspect any unauthorized use of the account.</p>

                     <h4 className="pt-2 pb-2" >  (D) Membership </h4>
                     <p>talfoundry.com provides Registered Users several different membership options. The availability of these membership options is dependent upon (i) the Registered User's status as an Employer or a Freelancer (ii) the selections made during registration, (iii) any subsequent upgrades or downgrades of membership options after registration.</p>

                     <p><b>Employers: </b>All Employers have the membership benefits described here. Note, membership benefits may change at the sole discretion of talfoundry.com.</p>

                     <p><b>Freelancers: </b>Freelancers can choose from different membership options. The differences between these options are listed here.</p>

                     <p>Each membership option includes a certain number of "Bids." As described on the Website, a Freelancer uses Bids to submit Quotes for Jobs. If a Freelancer requires additional Bids in a given month, the Freelancer has the option to buy additional Bids as described here. We reserve the right to change membership fees, the monthly number of Bids included in the membership options or the price of Bids or institute new fees at any time, at the sole discretion of talfoundry.com and upon reasonable notice posted in advance on the Website. No refunds of membership fees or Bids already paid will be given. If we exercise our right to cancel a membership as provided under these Terms of Service, at any time, we will not refund the membership fee already paid.  </p>

                <h2>Relationship</h2>

                  <h4 className="pt-2 pb-2">(A) Employer and Freelancer</h4>

                    <ol className="ml-40">
                      <li>
                      <p><b>Job Agreement:</b> The engagement, contracting and management of a Job are between an Employer and a Freelancer. Upon acceptance of a Quote, the Employer agrees to purchase, and the Freelancer agrees to deliver, the services and related deliverables in accordance with the following agreements: (a) the Job Agreement between Employer and Freelancer including the Quote, Job Description, and other terms and conditions as communicated between Employer and Freelancer on the Website or otherwise, (b) these Terms of Service, and (c) any other content uploaded to the Website by talfoundry.com (collectively, the "Job Agreement"). You agree not to enter into any contractual provisions in conflict with these Terms of Service. Any provision of a Job Agreement in conflict with these Terms of Service is void. Employer is responsible for managing, inspecting, accepting and paying for satisfactory services and deliverables in accordance with the Job Agreement in a timely manner. Freelancer is responsible for the performance and quality of the services in accordance with the Job Agreement in a timely manner. Employer and Freelancer each covenants and agrees to act with good faith and fair dealing in performance of the Job Agreement.</p>
                      </li>
                      <li>
                      <p><b>Independence:</b> Employer and Freelancer each acknowledges and agrees that their relationship is that of independent contractors. The Freelancer shall perform services as an independent contractor and nothing in these Terms of Service shall be deemed to create a partnership, joint venture, agency, or employer-employee relationship between Freelancer and Employer or between talfoundry.com and any Employer or Freelancer.</p>
                      </li>
                    </ol>

                  <h4 className="pt-2 pb-2"> (B) Registered Users and talfoundry.com</h4>
                    <ol className="ml-40 ">
                      <li>

                      <p>  <b>Genral:</b> talfoundry.com is not a party to the dealing, contracting and fulfillment of any Job between an Employer and a Freelancer. talfoundry.com has no control over and does not guarantee the quality, safety or legality of any services performed or deliverables created, advertised, the truth or accuracy of Job listings, the qualifications, background, or abilities of Registered Users, the ability of Freelancers to perform services, the ability of Employers to pay for services, or that an Employer or Freelancer can or will actually complete a Job. talfoundry.com is not responsible for and will not control the manner in which a Freelancer operates and is not involved in the hiring, firing, discipline or working conditions of the Freelancer. All rights and obligations for the purchase and sale of services or other deliverables are solely between an Employer and a Freelancer. talfoundry.com will not provide any Freelancer with any materials or tools to complete any Job. Employers and Freelancers must look solely to the other for enforcement and performance of all the rights and obligations arising from Job Agreements and any other terms, conditions, representations, or warranties associated with such dealings.</p>
                      </li>

                      <li>
                      <p> <b>Third-Party Beneficiary of Job Agreement:</b> Employer and Freelancer each acknowledges and agrees that the value, reputation, and goodwill of the Website depend on their performance of their covenants and agreements as set forth in their Job Agreement. Employer and Freelancer therefore appoint talfoundry.com as a third-party beneficiary of their Job Agreement for purposes of enforcing the obligations owed to, and the benefits conferred on, talfoundry.com by these Terms of Service. Employers and Freelancers further agree that talfoundry.com has the right to take such actions with respect to the Job Agreement or their Accounts, including without limitation, suspension, termination, or any other legal actions, as talfoundry.com in its sole discretion deems necessary to protect the value, reputation, and goodwill of the Website.</p>
                      </li>

                      <li>
                      <p><b> Agency: </b>These Terms of Service and any registration for or subsequent use of this Website by any user or Registered User will not be construed as creating or implying any relationship of agency, franchise, partnership or joint venture between you and talfoundry.com, except and solely to the extent expressly stated.</p>
                      </li>

                      <li>
                      <p><b> Taxes: </b>Registered Users are responsible for payment and reporting of any taxes. Other than in connection with the 1099 Service, talfoundry.com is not obligated to determine the applicability of any taxes or to remit, collect or report any such applicable taxes, unless otherwise agreed to by both parties pursuant to the terms of any provision of tax services provided to you by talfoundry.com. You agree that you will abide by any and all applicable state and federal tax statutes, regulations and common law. In the event talfoundry.com receives a notice of non-compliance with any such statute, regulation or common law, including, without limitation, an Internal Revenue Service Levy, talfoundry.com will deem such receipt a breach of this section and will suspend your Account until talfoundry.com received an Internal Revenue Service Release.    </p>
                      </li>

                    </ol>
                <h2>Talfoundry.com Fees</h2>
                  <h4 className="pt-2 pb-2"> (A) Membership Fee</h4>
                    <p>Freelancers can choose various membership programs to subscribe to different levels of participation on the Website, as detailed here.</p>


                  <h4 className="pt-2 pb-2"> (B) Service Fees</h4>
                    <p>talfoundry.com deducts one or more of the following fees, as applicable, from payments made by Employers to Freelancers using the Talfoundry Billing and Payment Services: </p>
                    <ol className="ml-40 ">
                      <li>
                        <p> <b>Job Fee: </b> talfoundry.com charges all Freelancers a Job Fee. The fee is based on a Freelancer's membership type and is deducted from the total amount paid by an Employer for a Job as described here.</p>
                      </li>
                      <li>
                        <p> <b>Employer Payment Handling Fee: </b> When an Employer pays a Freelancer, a Payment Handling Fee (2.9%) will be added to the invoice total.</p>
                      </li>
                      <li>
                       <p> <b>Freelancer Transfer Method Fee: </b> If, upon a Freelancer's request, funds are to be disbursed via a wire transfer, a Freelancer Transfer Method Fee will be charged to the Freelancer as described here. Transfers made through use of automated clearinghouse, Paypal and Payoneer debit card methods will incur no such fee.</p>
                      </li>
                      <li>
                        <p><b>Arbitration Service Fee: </b> For use of Arbitration Services, irrespective of the nature of resolution and any resulting disbursements, talfoundry.com charges a Arbitration Service Fee, equal to the greater of twenty-five dollars ($25.00) and five percent (5%) of the total amount paid by an Employer to talfoundry.com for the applicable Job to which such payment relates.</p>
                      </li>
                      <li>
                       <p><b>Employer Withdraw Fee: </b> When the Employer withdraws funds from their cash account there is a withdrawal fee (3.5%). This fee will be subtracted from the amount withdrawn.</p>
                      </li>
                    </ol>
                    <b>(C) </b> We reserve the right to change any fees associated with talfoundry.com at any time, at the sole discretion of talfoundry.com. No refunds of fees already paid will be given. If we exercise our right to cancel a membership as provided under these Terms of Service, at any time, we will not refund the membership fee already paid.


                  <h2>Arbitration Service</h2>

                  <h4 className="pt-2 pb-2">(A) Eligibility</h4>
                  <p>
                      talfoundry.com offers the Arbitration Service to those Registered Users that have funds in SafePay and requested talfoundry.com to assume all
                      or a portion of the payment liability for services and who are engaged in a dispute over a Job that is

                      (i) Pursuant to a Job posting by an Employer through the Website,
                      (ii) Pursuant to a Quote for by a Freelancer through the Website for such Job posting and
                      (iii) Pursuant to an acceptance through the Website by the Employer for such Quote.
                              Employer and Freelancer agree and acknowledge that, with respect to Assumed Payment Liabilities,
                              any and all disputes relating to the underlying fees shall be governed by the terms of this Section 6.
                  </p>

                  <h4 className="pt-2 pb-2">(B) Process</h4>
                  <ol className="ml-40 ">

                      <li>
                          <p>
                              <strong>Arbitration:</strong>
                              In any case where the Employer and a Freelancer cannot mutually agree on the distribution of the funds in
                              SafePay, you expressly agree to and acknowledge that talfoundry.com or a
                              third party chosen by talfoundry.com will arbitrate the dispute in accordance with these Terms of Service and the Website.
                          </p>

                          <ol className="ml-40 ">
                              <li>
                                  <p>
                                      You acknowledge and agree that talfoundry.com will construe any Job
                                      Agreement based on the transaction's course of dealing and common industry practices.
                                      Specifically, in rendering its decision, the arbitrator shall only be obligated to consider the following:

                                      (i) the Job Agreement,
                                      (ii) the parties' course of dealings, as evidenced by activity on or communications through the Website,
                                      (iii) the Job itself and
                                      (iv) any information or communication that the Employer and the Freelancer submit for review.
                                  </p>
                              </li>
                              <li>
                                  <p>
                                      talfoundry.com shall render its decision within five (7) days of the Arbitration being opened. During this time, you are encouraged to continue to negotiate an amicable settlement with each other.
                                  </p>
                              </li>
                              <li>
                                  <p>
                                      You agree that the decision of talfoundry.com, acting as an arbitrator, shall be final, binding, and not subject to appeal. Accordingly, within a reasonable time after we have rendered a decision, we will transfer funds in accordance with the arbitrator's decision.
                                  </p>
                              </li>
                              <li>
                                  <p>
                                      In the event that you are the prevailing party in its arbitration decision,
                                      you agree that you shall have no right, title to, interest in or license to the Job that is the subject matter of the dispute.
                                      In such case, you agree to return any physical copies of such Job in your possession and destroy any electronic copies that you have.
                                  </p>
                              </li>
                          </ol>
                      </li>
                  </ol>

                  <h4 className="pt-2 pb-2">(C) Communication</h4>
                  <p>
                      You agree and acknowledge that
                      (i) talfoundry.com will use the e-mail address corresponding with your Account registered at the time Arbitration is opened to notify and communicate with you with regard the Arbitration and
                      (ii) you are solely responsible for the receipt of any notification or communication sent by talfoundry.com using the e-mail address corresponding with your Account registered at the time Arbitration is opened.
                  </p>

                  <h4 className="pt-2 pb-2">(D) Acknowledgements</h4>
                  <p>
                      You agree and acknowledge that
                      (i) talfoundry.com is not providing legal services to you,
                      (ii) talfoundry.com will not advise you regarding any legal matters and
                      (iii) if you desire to have legal counsel, you will seek independent legal counsel licensed to practice law in your jurisdiction and not rely on talfoundry.com for any such counsel. You agree to indemnify and hold harmless talfoundry.com and any of our affiliates against any damages or liability you may suffer as a result of using the Arbitration Service. If you do not agree to use this Arbitration Service under these terms, you should not request talfoundry.com to assume the Assumed Payment Liabilities.
                  </p>


                  <h2>1099 Services</h2>
                  <p>
                      At the request of an Employer, talfoundry.com shall issue each individual Freelancer whom you have engaged through the Website a summary on Form 1099 reflecting
                      Payments (less fees) paid to each Freelancer. You hereby acknowledge that, although talfoundry.com may provide the 1099 Service to Employers,
                      the Employer's Job Agreement to obtain services and make payments is an agreement between an Employers and a Freelancer.
                  </p>


                    <h2>Term; Termination And Suspension</h2>

                    <ol className="ml-40 ">
                        <li>
                            <p>
                                These Terms of Service shall become effective as your contractual agreement upon your use of the Website, and shall continue until your Account is
                                terminated by you or talfoundry.com as provided for under the terms of this section.
                            </p>
                        </li>

                        <li>
                            <p>
                                Unless otherwise agreed to in writing between the parties, either party may terminate the contractual agreement
                                represented by these Terms of Service at
                                any time upon notice to the other party. In such event, your Account is automatically terminated and

                                        (1) talfoundry.com shall continue to perform those services necessary to complete any open transaction between you and another Registered User; and

                                    (2) You shall continue to be obligated to pay any amounts accrued but unpaid as of the date of termination to talfoundry.com for any service and to any
                                        Freelancer for any services.
                            </p>
                        </li>

                        <li>
                            <p>
                                Any termination of an Account will automatically lead to the termination of all related profiles.
                            </p>
                        </li>

                        <li>
                            <p>
                                Without limiting our other remedies, we may issue a warning, or temporarily suspend, indefinitely suspend or
                                terminate your Account or a Job, and
                                refuse to provide any or all services to you if: (1) you breach the letter or spirit of any terms and conditions of these Terms of Service or the
                                linked  policies and information incorporated herein by reference, including our written policies and procedures posted on the Website; (2) we are unable to
                                verify or authenticate any information you provide to us; or (3) we believe in our sole discretion that your actions may cause legal liability for you, our
                                Registered Users or for talfoundry.com or are contrary to the interests of the Website. Once indefinitely suspended or terminated, you must not continue
                                to use the Website under the same Account, a different Account, or register under a new Account.
                            </p>
                        </li>

                        <li>
                            <p>
                                In addition, violations of these Terms of Service may be prosecuted to the fullest extent of the law and may result in additional penalties and
                                sanctions.
                            </p>
                        </li>

                        <li>
                            <p>
                                Without limiting our other remedies, to the extent you engage in actions or activities which circumvent the Talfoundry Billing and Payment Services or
                                otherwise reduce fees owed talfoundry.com under these Terms of Service, you must pay talfoundry.com for all fees owed to talfoundry.com and reimburse talfoundry.com for all
                                losses
                                and costs and reasonable expenses (including attorney fees) related to investigating such breach and collecting such fees.
                            </p>
                        </li>

                        <li>
                            <p>
                                When your Account is terminated for any reason, you may no longer have access to data, messages, files and other material you keep on the Website.
                                The material may be deleted along with all your previous posts and proposals.
                            </p>
                        </li>
                    </ol>



                    <h2>Privacy And Confidentiality</h2>
                    <p>
                        Your use of the Website and the services provided therein and thereby is governed by the terms of these Terms of
                        Service and the talfoundry.com Privacy Policy. It is
                        your responsibility to review the talfoundry.com <a href="/privacy-policy/">Privacy Policy</a>, which is incorporated by reference, and we suggest that you review
                        the Privacy Policy and print a copy for yourself. The Privacy Policy is posted on the Website and may be updated from time to time.
                        Unfortunately, we cannot ensure that disclosure of your
                        personal information will not occur in ways not described in the Privacy Policy. We may be required by law to disclose information to government
                        authorities, law enforcement agencies or third parties upon subpoena, and you authorize us to disclose information as we believe, in our sole discretion, is
                        necessary or
                        appropriate.
                    </p>


                    <h2>Intellectual Property</h2>

                    <h4 className="pt-2 pb-2">(A) talfoundry.com Content</h4>
                    <p>
                        Your use of the Website and the services provided therein and thereby is governed by the terms of these Terms of
                        Service and the talfoundry.com <a href="/trademark-copyright-policy/">IP Policy</a>. It is your
                        responsibility to review the talfoundry.com IP Policy, which is incorporated by reference, and we suggest that you review the IP Policy and print a copy for
                        yourself.
                        The IP Policy is posted on the Website and may be updated from time to time.
                    </p>

                    <h4 className="pt-2 pb-2">(B) Registered User Content</h4>
                    <ol className="ml-40 ">
                        <li>
                            <p>
                                You are solely responsible for information posted on our Website, including but not limited to (a) any audio, video or photographic content
                                (collectively, "Multimedia Content"), (b) any posting or listing made in any public message area, through any email feature or through talfoundry.com's
                                feedback feature (collectively, ""&gt;Non-Multimedia Content") and (c) any other content of a personal nature including but not limited to your resume,
                                biography, work history and work product produced for another Registered User including Companies ("Personal Content"). You retain ownership of all
                                Multimedia Content and Personal Content, subject to the licenses granted herein.
                            </p>
                        </li>

                        <li>
                            <p>
                                You hereby assign to talfoundry.com your rights in any Non-Multimedia Content. You grant us a non-exclusive, worldwide, perpetual, royalty free,
                                irrevocable
                                right to exercise all copyright and publicity rights with respect to the Multimedia Content and to use such Multimedia Content for the purpose of
                                advertising and publicizing talfoundry.com products and services and you grant us a non-exclusive, worldwide, perpetual, royalty free, irrevocable right
                                to
                                use the Personal Content for the purpose of providing Services.
                            </p>
                        </li>

                        <li>
                            <p>
                                Your information must not:
                                (a) infringe any third party's rights, including but not limited to intellectual property, publicity or privacy;
                                (b) be defamatory, trade libelous, threatening or harassing; nor
                                (c) be obscene, indecent or contain pornography.
                            </p>
                        </li>

                        <li>
                            <p>
                                We do not endorse any information posted by Registered Users and we are not liable for any such information posted on the Website, including but not
                                limited to any information posted about you. We reserve the right to take any action, in our sole discretion, with respect to information posted on
                                the
                                Website which we believe is inappropriate, including but not limited to termination of your Account. However, we cannot, nor do we, control the
                                information provided by you or other Registered Users or other content providers which is made available through our system.
                            </p>
                        </li>
                    </ol>

                    <h4 className="pt-2 pb-2">(C) Removal of Content for which Copyright Infringement Is Claimed
                    </h4>

                    <ol className="ml-40 ">
                        <li>
                            <p>
                                Pursuant to 17 USC. Â§ 512 as amended by Title II of the Digital Millennium Copyright Act, talfoundry.com has implemented procedures for receiving written
                                notification of claimed infringements and for processing such claims in accordance with the Act. If you believe your copyrights are being infringed by a User of
                                the Website, please fill out a Notice of Infringement form and fax it to talfoundry.com Copyright Infringement Notices at 412-202-0075.
                            </p>
                        </li>

                        <li>
                            <p>
                                The information requested by the Notice of Infringement form substantively complies with the safe harbor provisions of the Digital Millennium
                                Copyright Act, 17 USC. Â§ 512(c)(3)(A), which provides that a notification of claimed infringement must be a written communication provided to the designated agent
                                that includes substantially the following:
                            </p>

                            <ol className="ml-40 ">
                                <li>
                                    <p>
                                        A physical or electronic signature of a person authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Identification of the copyrighted work claimed to have been infringed, or, if multiple copyrighted works at a single online website are
                                        covered by a single
                                        notification, a representative list of such works at such website.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Identification of the material that is claimed to be infringing or to be the subject of infringing activity and that is to be removed or
                                        access to which is to
                                        be disabled, and information reasonably sufficient to permit the Freelancer to locate the material.
                                    </p>
                                </li>

                                <li>
                                    <p>
                                        Information reasonably sufficient to permit the Freelancer to contact the complaining party such as an address, telephone number, and if
                                        available, an
                                        electronic mail address at which the complaining party may be contacted.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        A statement that the complaining party has a good faith belief that use of the material in the manner complained of is not authorized by the
                                        copyright owner,
                                        its agent or the law.
                                    </p>
                                </li>

                                <li>
                                    <p>
                                        A statement that the information in the notification is accurate, and under penalty of perjury, that the complaining
                                        party is authorized to
                                        act on behalf of the owner of an exclusive right that is allegedly infringed.
                                    </p>
                                </li>

                                <li>
                                    <p>
                                        Notification from a copyright owner or from a person authorized
                                        to act on behalf of
                                        the copyright owner that fails to comply substantially with the provisions above shall not be considered as providing actual knowledge or an
                                        awareness of facts or
                                        circumstances from which infringing activity is apparent.
                                    </p>
                                </li>
                            </ol>
                        </li>

                        <li>
                            <p>
                                Additionally, you are required to provide a Notice of Infringement form each time you wish to report alleged acts of infringement and fax it to the
                                number provided above.
                            </p>
                        </li>
                    </ol>

                    <h2>Representations, Disclaimers, Limitations And Exclusions</h2>

                    <h4 className="pt-2 pb-2">(A) Registered User Representations and Warranties</h4>
                    <p>
                        All Registered Users represent, warrant, and agree:
                    </p>

                    <ol className="ml-40 ">
                        <li>
                            <p>
                                not to grant access to an Account only to users authorized to act on behalf of the
                                Registered User and only in accordance with these Terms of Service.
                            </p>
                        </li>
                        <li>
                            <p>
                                to be fully responsible and liable for any action of any user who uses your Account.
                            </p>
                        </li>
                        <li>
                            <p>
                                not to use your Account, username, or password of another Registered User that you are not expressly authorized to use.
                            </p>
                        </li>
                        <li>
                            <p>
                                not to allow any third party who is not authorized to do so to use your Account at any time.
                            </p>
                        </li>
                        <li>
                            <p>
                                not to use any device, software or routine, including but not limited to any viruses, Trojan horses, worms, time bombs, robots or denial-of-service
                                attacks, intended to damage or interfere with the operation of the Website or any transaction being conducted through the Website.
                            </p>
                        </li>
                        <li>
                            <p>
                                not to intercept or expropriate any system, data or personal information from the Website.
                            </p>
                        </li>
                        <li>
                            <p>
                                not to take any action that imposes an unreasonable or disproportionately large load on the Website infrastructure, including but not limited to
                                "spam" or other such unsolicited mass emailing techniques.
                            </p>
                        </li>

                        <li>
                            <p>
                                that it has the right and authority to enter into the Terms of Service and to transact business hereunder.
                            </p>
                        </li>

                        <li>
                            <p>
                                that they are using the Website solely for the purpose of entering into a bona fide business transaction with other Registered Users.
                            </p>
                        </li>
                        <li>
                            <p>
                                that they will not use the Website or its services to defraud or mislead any person or entity,
                                including without limitation talfoundry.com or any Register User.
                            </p>
                        </li>
                        <li>
                            <p>
                                that they will not use the Website to violate any law or regulation of the United States of America or any international law or treaty.
                            </p>
                        </li>
                        <li>
                            <p>
                                that they are not a resident national of, or, an entity located in any country subject to economic sanctions imposed by the government of the United
                                States of America. The current list of US sanctions can be found
                                <a target="_blank" rel="noopener noreferrer" href="https://www.treasury.gov/resource-center/sanctions/Programs/Pages/Programs.aspx">here.</a>
                            </p>
                        </li>
                        <li>
                            <p>
                                that they are not currently and have never been listed as a Specially Designated National by the United Stated Department of
                                Treasury's Office of Foreign Assets Control ("OFAC").
                            </p>
                        </li>

                        <li>
                            <p>
                                that they will not use the Website in connection with any "prohibited transaction" as defined under the Cuban Assets Control Regulations, 31 C.F.R.
                                Part 515; Iranian Transactions Regulations, 31 C.F.R. Part 560; or Sudanese Sanction Regulations, 31 C.F.R. Part 538; Former Liberian Regime of Charles
                                Taylor Sanctions Regulations, 31 C.F.R. Part 593; Burmese Sanctions Regulations, 31 C.F.R. Part 537; Foreign Assets Control Regulations as they relate to
                                North Korea, 31 C.F.R. Part 500; Executive Order 1338; or any other law, regulation or executive order of the United States of America.
                            </p>
                        </li>
                    </ol>

                    <h4 className="pt-2 pb-2">(B) Warranty Disclaimer</h4>
                    <p>
                        THE SERVICES PROVIDED BY talfoundry.com OR OUR THIRD-PARTY SERVICE PROVIDERS ARE PROVIDED "AS IS," AS AVAILABLE, AND WITHOUT ANY WARRANTIES OR CONDITIONS (EXPRESS
                        OR
                        IMPLIED, INCLUDING THE IMPLIED WARRANTIES OF MERCHANTABILITY, ACCURACY, FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT, ARISING BY STATUTE OR
                        OTHERWISE IN LAW OR FROM A COURSE OF DEALING OR USAGE OR TRADE). WE MAKE NO REPRESENTATIONS OR WARRANTIES, OF ANY KIND, EITHER EXPRESS OR IMPLIED, AS TO THE
                        QUALITY, IDENTITY OR RELIABILITY OF ANY THIRD PARTY, OR AS TO THE ACCURACY OF THE POSTINGS MADE ON THE WEBSITE BY ANY THIRD PARTY. SOME STATES AND
                        JURISDICTIONS
                        DO NOT ALLOW FOR ALL THE FOREGOING LIMITATIONS ON IMPLIED WARRANTIES, SO TO THAT EXTENT, IF ANY, SOME OR ALL OF THE ABOVE LIMITATIONS MAY NOT APPLY TO YOU.
                    </p>

                    <h4 className="pt-2 pb-2">(C) Limitation of Liability</h4>
                    <p>
                        IN NO EVENT SHALL WE OR OUR THIRD-PARTY SERVICE PROVIDERS BE LIABLE TO YOU OR ANY OTHER REGISTERED USER FOR ANY SPECIAL, INDIRECT, CONSEQUENTIAL, INCIDENTAL
                        OR
                        PUNITIVE DAMAGES PURSUANT TO THIS AGREEMENT, INCLUDING BUT NOT LIMITED TO, LOSS OF PROFITS, LOSS OF BUSINESS OPPORTUNITIES OR LOSS OF GOODWILL, EVEN IF
                        ADVISED
                        OF THE POSSIBILITY OF SUCH DAMAGES. NOTWITHSTANDING ANY OTHER PROVISION OF THIS AGREEMENT, IN NO EVENT WILL OUR LIABILITY TO YOU FOR ANY ACTION OR CLAIM
                        RELATED
                        TO THE WEBSITE SERVICES PROVIDED UNDER THESE TERMS OF SERVICE, WHETHER BASED ON CONTRACT, TORT, NEGLIGENCE OR ANY OTHER THEORY OF LIABILITY, EXCEED THE
                        GREATER
                        OF: (A) $100 OR (B) THE AGGREGATE AMOUNT OF MONIES ACTUALLY COLLECTED BY US FROM YOU FOR THE SERVICES TO WHICH THE LIABILITY RELATES DURING THE SIX (6)
                        MONTH
                        PERIOD IMMEDIATELY PRECEDING THE DETERMINATION OF SUCH LIABILITY. SOME STATES AND JURISDICTIONS DO NOT ALLOW FOR ALL THE FOREGOING EXCLUSIONS AND
                        LIMITATIONS OF
                        INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO TO THAT EXTENT, IF ANY, SOME OR ALL OF THESE LIMITATIONS AND EXCLUSIONS MAY NOT APPLY TO YOU.
                    </p>

                    <h4 className="pt-2 pb-2">(D) General Release</h4>
                    <p>
                        If you have a dispute with another Registered User, you release talfoundry.com (and our officers, directors, agents, subsidiaries, joint ventures and employees)
                        from
                        claims, demands and damages (actual and consequential) of every kind and nature, known and unknown, arising out of or in any way connected with such
                        dispute.
                    </p>

                    <h4 className="pt-2 pb-2">(E) State Specific Release</h4>
                    <p>
                        YOU HEREBY WAIVE CALIFORNIA CIVIL CODE Â§1542 (AND ANY ANALOGOUS LAW IN ANY OTHER APPLICABLE JURISDICTION) WHICH SAYS: "A GENERAL RELEASE DOES NOT EXTEND TO
                        CLAIMS WHICH THE CREDITOR DOES NOT KNOW OR SUSPECT TO EXIST IN HIS FAVOR AT THE TIME OF EXECUTING THE RELEASE, WHICH IF KNOWN BY HIM MUST HAVE MATERIALLY
                        AFFECTED HIS SETTLEMENT WITH THE DEBTOR."
                    </p>

                    <h4 className="pt-2 pb-2">(F) Indemnity</h4>
                    <p>
                        You agree to defend, hold harmless and indemnify talfoundry.com from and against any and all losses, costs, expenses, damages or other liabilities incurred by
                        talfoundry.com
                        from and against any cost, liability, loss, damage, cause of action, claim, suit, proceeding, demand or action brought by a third party against talfoundry.com:
                        (1) in connection with your use of the Services including any payment obligations incurred through use of the Talfoundry Billing and Payment Services;
                        or (2) resulting from:
                        (a) your use of the Website
                        (b) your decision to supply credit information via the Website, including personal financial information;
                        (c) your decision to submit postings and accept offers from other Registered Users;
                        (d) any breach of contract or other claims made by Registered Users with which you conducted business through the Website;
                        (e) your breach of any provision of these Terms of Service;
                        (f) any liability arising from the tax treatment of payments or any portion thereof;
                        (g) any negligent or intentional wrongdoing by any Registered User;
                        (h) any act or omission of yours with respect to the payment of fees to any Freelancer;
                        (i) your dispute of or failure to pay any Invoice or any other Payment; or
                        (j) your obligations to a Freelancer. Any such indemnification shall be conditioned on our:
                        (i) notifying you in writing of any such claim, demand, action, cost, liability, loss or threat of any thereof;
                        (ii) cooperating with you in the defense or settlement thereof; and
                        (iii) allowing you to control such defense or settlement. We shall be entitled to participate in such defense through our own counsel at our
                        own cost and expense. We reserve the right to report any wrongdoing of which we become aware to the applicable government agencies or otherwise.
                    </p>

                    <h4 className="pt-2 pb-2">(G) Links</h4>
                    <p>
                        The Website may contain links to third-party web sites not under the control or operation of talfoundry.com. When we provide links, we do so only as a convenience
                        and
                        do not endorse and are not responsible for the content of any linked site or any link contained in a linked site.
                    </p>

                    <h4 className="pt-2 pb-2">(H) Data</h4>
                    <p>
                        You are responsible for creation, storage, and backup of your business records. These Terms of Service and any registration for or subsequent use of this
                        Website will not be construed as creating any responsibility on talfoundry.com's part to store, backup, retain, or grant access to any information or data for any
                        period.
                    </p>

                    <h2>Miscellaneous Terms And Conditions</h2>

                    <h4 className="pt-2 pb-2">(A) Compliance with Law</h4>
                    <p>
                        You are responsible for compliance with applicable U.S. state, U.S. federal and international laws,
                        regulation and treaties, keeping in mind that access to the
                        contents of this Website may not be legal for or by certain persons or in certain countries.
                    </p>

                    <h4 className="pt-2 pb-2">(B) Modification and Waiver</h4>
                    <p>
                        talfoundry.com will not be considered to have modified or waived any of our rights or remedies under these Terms of Service unless the modification or waiver is
                        in
                        writing and signed by an authorized representative of talfoundry.com. No delay or omission by talfoundry.com in exercising its rights or remedies will impair its rights
                        or
                        be construed as a waiver. Any single or partial exercise of a right or remedy will not preclude further exercise of any other right or remedy.
                    </p>

                    <h4 className="pt-2 pb-2">(C) Severability</h4>
                    <p>
                        If any part of these Terms of Service is held to be unenforceable, the unenforceable part will be given effect to the greatest
                        extent possible and the remainder will remain in full force and effect.
                    </p>

                    <h4 className="pt-2 pb-2">(D) Assignment or Transfer</h4>
                    <p>
                        You will not transfer, assign or delegate your rights or obligations (including your Account) under these Terms of Service to anyone without the express
                        written
                        permission of talfoundry.com, and any attempt to do so will be null and void. talfoundry.com may assign these Terms of Service in its sole discretion.
                    </p>

                    <h4 className="pt-2 pb-2">(E) State Specific Legal Notice</h4>
                    <p>
                        Pursuant to California Civil Code Section 1789.3 and California Business and Professions Code Section 17538, residents of California are hereby advised of
                        the
                        following: talfoundry.com, located in Pittsburgh, Pennsylvania, is the provider of the electronic commercial service on the Website. Registered Users are notified
                        in
                        advance regarding any applicable service charges. The Complaint Assistance Unit of the Division of Consumer Services of the Department of Consumer Affairs
                        in
                        California may be contacted in writing at 400 R. Street, Suite 3090, Sacramento, CA 95814 or by calling 1-800-952-5210. Upon your request, you may have this
                        Agreement sent to you by email. Please feel free to contact talfoundry.com to resolve a complaint regarding any aspect of service relating to the Website by
                        writing
                        to the above address, or contact us at <a href="mailto:info@talfoundry.com">info@talfoundry.com</a>.
                    </p>

                    <h4 className="pt-2 pb-2">(F) Force Majeure</h4>
                    <p>
                        Except for the payment of fees to talfoundry.com, neither of the parties to these Terms of Service shall be responsible for the failure to perform or any delay in
                        performance of any obligation hereunder due to labor disturbances, accidents, fires, floods, telecommunications or Internet failures, strikes, wars, riots,
                        rebellions, blockades, acts of government, governmental requirements and regulations or restrictions imposed by law or any other similar conditions beyond
                        the
                        reasonable control of such party. The time for performance of such party shall be extended by the period of such delay.
                    </p>

                    <h4 className="pt-2 pb-2">(G) Notice</h4>
                    <p>
                        All notices required or permitted to be given under these Terms of Service, shall be in writing and shall be deemed to have been duly given if delivered
                        personally or sent by pre-paid telex, telefax or telegram, or mailed first-class, postage pre-paid, by registered or certified mail (notices sent by telex
                        or
                        telefax, or telegram, shall be deemed to have been given on the date sent; those mailed shall be deemed to have been given ten (10) business days after
                        mailing)
                        to the addresses set forth below or to such other address as any party shall designate by notice in writing.
                    </p>
                    <p>
                        <strong>If to talfoundry.com</strong>
                        <br/>
                        Attention Inder Guglani
                        <br/>
                        5001 Baum Blvd., Suite 760
                        <br/>
                        Pittsburgh, PA 15213
                    </p>

                    <p>
                        <strong>If to Registered User:</strong><br/>
                        To the address associated with Registered User's access or login information.
                    </p>

                    <h4 className="pt-2 pb-2">(H) Headings and Labels.</h4>
                    <p>The boldface paragraph headings in these Terms of Service are included for ease of reference only and have no binding effect.</p>

                    <h4 className="pt-2 pb-2">(I) Integration.</h4>
                    <p>
                        These Terms of Service and all documents referenced in these Terms of Service (including the policies listed and available by hyperlink) comprise the entire
                        agreement between you and talfoundry.com with respect to the use of this Website and supersede all prior agreements between the parties regarding the subject
                        matter
                        contained herein as well as any conflicting or inconsistent terms in any Website that link to or are linked from the Website.
                    </p>

                    <h4 className="pt-2 pb-2">(J) Survival</h4>
                    <p>
                        Sections 4, 5, 6, 7, 8, 9, 10, 11, and 12 will survive any termination of these Terms of Service for any reason.
                    </p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
})

export default connect(mapStateToProps)(TermsofService)