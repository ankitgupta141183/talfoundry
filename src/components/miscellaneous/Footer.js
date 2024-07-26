import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ContactUsPopUp from "../miscellaneous/ContactUsPopUp"
import {isEmpty} from 'lodash';


class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openSignUpModal: false,
      categoryData: {
        category: []
      }
    }
  }

  categoryFunction = (id, event) => {
    let categoryData = this.state.categoryData
    categoryData["category"].push(id)
    this.setState({ categoryData: categoryData })
    this.props.addDataCategoryDescription(this.state.categoryData)
  }

  handleSignUpModal = () => {
    this.setState({openSignUpModal: true})
  }

  closeSignUpModal =() => {
    this.setState({openSignUpModal: false})
  }

  render() {

    return (
      <div>
        <ContactUsPopUp isOpen={this.state.openSignUpModal} closeModal={this.closeSignUpModal} history={this.props.history}/>
        <div className="mn_footer mn_footer_new">
          <div className="cloud_expert_home_page">
            <div className="container-fluid">

              <div className="ftr">
             
              </div>
              <div className="copyright">
                <div className="col-md-12">
                  <div className="col-md-12">
                    <div className="text-center">
                      <ul className="terms-of-service-footer-list">
                        <li className="p-2">
                          <p>©2020 - Talfoundry | All Rights Reserved</p>
                        </li>
                        <li className="p-2">
                          <Link to="/terms-of-Service">Terms of Service</Link>
                        </li>
                        <li className="p-2">
                          <Link to={"/privacy-policy"}>Privacy Policy</Link>
                        </li>
                        <li className="socalLinkFooter p-1">
                        <span> <i className="fa fa-instagram" aria-hidden="true"></i> </span>
                        <span> <i className="fa fa-twitter-square" aria-hidden="true"></i> </span>
                        <span> <i className="fa fa-facebook-square" aria-hidden="true"></i> </span>
                        <span> <i className="fa fa-youtube-play" aria-hidden="true"></i> </span>
                      </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state
  }
}

export default connect(mapStateToProps)(Footer)
