import React from 'react';
import { Link } from 'react-router-dom';

const AboutYourProfile = () => (
  <div className="bhoechie-tab-content active">
    <div className="tf_job_posting">
        <div className="mn_heading">
            <h3 className="info_number col-md-12">About Your Profile</h3>
        </div>
        <div className="col-md-12 mt-20 mb-15 terms_content">
        	<div className="entry-content">
				<p>Profiles help Freelancers establish credibility on Talfoundry. Freelancers can define their skills, services they offer, showcase work with portfolios and provide information about themselves or their company on their Profile. Profiles play a crucial role in the hiring process as Employers evaluate the suitability of Freelancers by browsing their Profiles and their <Link>All-Time Transaction Data </Link>on Talfoundry. Creating an impressive Profile is key to getting hired on Talfoundry.</p>
			</div>
    	</div>
    </div>
  </div>
)
export default AboutYourProfile;