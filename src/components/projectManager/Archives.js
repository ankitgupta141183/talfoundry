// @Archives.js
// * This component contains the proposals which are archived by the Project Manager

import React, {Component} from "react";
import ProjectManagerHeader from "../miscellaneous/ProjectManagerHeader";
import Footer from '../miscellaneous/Footer';
import ArchivesManagerContainer from "../miscellaneous/ArchivesManagerContainer";
class Archives extends Component {

  render() {
    return (
      <div>
        <ProjectManagerHeader history={this.props.history} />


          <div id="project-manager-proposal-page">
            <div className="container project-manager-all-page-equal-top-shifting">
              <div className="empty-outline-box-for-project-manager-dashboard">

                  <div className="col-md-12">

                    <div className="invite_freelancer tf_saved_jobs mt-20">
                          <ArchivesManagerContainer history={this.props.history} />
                    </div>
                  </div>

                </div>

            </div>
          </div>
        <Footer />
      </div>
      )
    }
  }



export default Archives;
