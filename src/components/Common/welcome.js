import React,{Component} from 'react';
import ProjectManagerHeader from "../miscellaneous/ProjectManagerHeader";
import Footer from '../miscellaneous/Footer';

class welcome extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render() {
        return(
          <div className="welcome">
            <ProjectManagerHeader history={this.props.history} />
            <div className="tf_inter">
              <div id="welcome-page">
                <div className="container">
                    <div className="welcome-message-page-content-background">
                        <div className="row">
                          <div className="col-md-12">
                              <h2 className="text-center">Welcome message</h2>
                              <p className="text-center">Lorem ipsum dolor sit amet, consectetur aditempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                              <p className="text-center">Lorem ipsum dolor ore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                              <p className="text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in .</p>
                              <p className="text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse culpa qui officia deserunt mollit anim id est laborum.</p>
                          </div>
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

export default welcome

