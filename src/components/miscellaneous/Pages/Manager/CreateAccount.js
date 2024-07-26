import React from 'react';


const CreateAccount = (props) => (
  <div className="bhoechie-tab-content active">
        <div className="tf_job_posting">
            <div className="mn_heading">
                <h3 className="info_number col-md-12">Create an Account</h3>
            </div>
            <div className="col-md-12 mt-20 mb-15 terms_content">
              <div className="entry-content">

                <p>There are two ways you can <a onClick={() => props.handleSignUpModal("")}>sign up</a> on Talfoundry.</p>

                <h2>Method 1</h2>

                <p>Create your Manager account using your work or personal email:</p>

                <ol>
                  <li>Click on “Sign Up.”</li>
                  <li>Enter your full name and email address</li>
                  <li>Select "Hire for Project" as the account type and click on "Get Started"</li>
                  <li>On next screen, select the location</li>
                  <li>Set a password &amp; agree to our Terms of Service. Click on “Continue.”</li>
                </ol>

                <h2>Method 2</h2>

                <p>Create your Manager account using <strong>social login:</strong></p>

                <ol><li>Click on “Sign Up.”</li><li>Choose from Facebook or Google.</li><li>Select "Hire for Project" as the account type.</li><li>Click on “Submit” to create your account.</li></ol>

                <p>You can post as many jobs as you want and get Proposals from Cloud Experts within hours of posting a job, for free.</p>

                <p><a onClick={() => props.handleSignUpModal("")}>Click here</a> to create an account now.</p>

              </div>
            </div>
        </div>
      </div>
)
export default CreateAccount;