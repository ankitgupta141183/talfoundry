import React, {Component} from "react";
import {Link} from 'react-router-dom';

export default class FooterForSearchPages extends Component {

  constructor(props){
    super(props)
    this.state = {
      categoryData: {
        category: [],
      }
    }
  }

  getCatParent = (value) => {
   this.props.getCat(value)
  }

  categoryFunction = (id, event) => {
    let categoryData = this.state.categoryData
    categoryData["category"].push(id)
    this.setState({ categoryData: categoryData })
    this.props.addDataCategoryDescription(this.state.categoryData)
  }

  render() {
    return (
      <div>
         <div className="mn_footer mn_footer_new">
        <div className="cloud_expert_home_page" >
          <div className="container">

             <div className="ftr">
               <div className="col-md-3 col-sm-3 tf_ftr_res">
                 <div className="mn_ftr_names">
                   <h4>ABOUT US</h4>
                   <ul>
                     <li><Link to="/team">Our Team</Link></li>
                     <li><Link to="/career">Support</Link></li>
                     <li><Link to={"/"}>FAQ's</Link></li>
                   </ul>
                 </div>
              </div>
               <div className="col-md-3 col-sm-3 tf_ftr_res">
                 <div className="mn_ftr_names">
                   <h4>HIRE TOP TALENT</h4>
                   <ul>
                     <li>
                     <Link
                        onClick={() => this.getCatParent('AWS')}
                        >
                        Top AWS Talent
                     </Link>
                     </li>

                     <li>
                     <Link
                        onClick={() => this.getCatParent('Salesforce')}
                        >
                        Top Salesforce Talent
                     </Link>
                     </li>
                     <li>
                     <Link
                        onClick={() => this.getCatParent('Oracle')}
                        >
                        Top Oracle Talent
                     </Link>
                     </li>

                    <li>
                     <Link
                        onClick={() => this.getCatParent('MS Azure')}
                        >
                        Top MS Azure Talent
                     </Link>
                     </li>
                     <li>
                     <Link
                        onClick={() => this.getCatParent('Google Cloud')}
                        >
                        Top Google Cloud Talent
                     </Link>
                     </li>
                   </ul>
                 </div>
              </div>

                <div className="col-md-3 col-sm-3 tf_ftr_res">
                  <div className="mn_ftr_names">
                    <h4>Stay Connected</h4>
                    <ul>

                       <li className="socalLinkFooter">
                        <span> <i className="fa fa-instagram" aria-hidden="true"></i> </span>
                        <span> <i className="fa fa-twitter-square" aria-hidden="true"></i> </span>
                        <span> <i className="fa fa-facebook-square" aria-hidden="true"></i> </span>
                        <span> <i className="fa fa-youtube-play" aria-hidden="true"></i> </span>
                      </li>
                      <li>
                        <Link to={"/"}>Talfoundry</Link>
                      </li>
                      <li>
                        <Link to="/">admin@talfoundry.com</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="copyright">
                <div className="col-md-12">
                  <div className="col-md-12">
                    <div className="text-center">
                      <ul className="terms-of-service-footer-list">
                        <li>
                          <p>©2020 - Talfoundry | All Rights Reserved</p>
                        </li>
                        <li>
                          <Link to="/terms-of-Service">Terms of Service</Link>
                        </li>
                        <li>
                          <Link to={"/privacy-policy"}>Privacy Policy</Link>
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




