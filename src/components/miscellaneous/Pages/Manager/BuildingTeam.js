import React from 'react';


const BuildingTeam = () => (
  <div className="bhoechie-tab-content active">
        <div className="tf_job_posting">
            <div className="mn_heading">
                <h3 className="info_number col-md-12">Building a Team</h3>
            </div>

            <div className="col-md-12 mt-20 mb-15 terms_content">
              <div className="entry-content">

                <p>You can add team members for account
                administration and managing jobs. You can assign roles to a team members depending
                on their involvement.</p>



                <p>There are
                three types of roles that you can choose from:</p>



                <p><strong>Administrators:</strong> They can post jobs, add themselves to jobs, accept Agreements, use
                WorkRoom tools, and make payments. They can also assign managers to different
                WorkRooms. However, they can’t make any changes to the Owner’s account and
                payment methods. </p>



                <p><strong>Managers:</strong> They can be added to the team by the Owner or the Administrator and have
                similar access as an Administrator, except for the ability to make payments.</p>



                <p><strong>Coordinators:</strong> They can only access WorkRooms of the jobs they have been assigned to,
                by the Owner, Administrator and the Manager. Coordinators cannot post jobs,
                award jobs, make payments or accept Agreements. </p>



                <h2><strong>Manage Team Members</strong></h2>



                <p><strong>To invite/add a team member:</strong></p>



                <ol><li>Go to ‘Manage’ and click on “My Managers.”</li><li>Click on “Add Team Member.”</li><li>Enter the required information, select the role and click on “Add Team Member” to send an invite.</li></ol>


                <p><strong>To change a team member’s role:</strong></p>



                <ol><li>Go to “Manage” and click on “My
                Managers.”</li><li>Click on the dropdown menu over
                the member’s Profile.</li><li>Choose “Edit Role.”</li><li>Change the role and click on
                “Save.”</li></ol>



                <p><strong>To remove a team member:</strong></p>



                <ol><li>Go to “Manage” and click on “My Managers.”</li><li>Click on the dropdown menu over the member’s Profile.</li><li>Choose “Remove.”</li></ol>



              </div>
            </div>
        </div>
      </div>
)
export default BuildingTeam;