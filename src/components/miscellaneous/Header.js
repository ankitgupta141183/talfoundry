import React, {Component} from "react";
import logo_1 from '../../static/images/logo/logo.svg';
import logo_Img from "../../static/images/logo/logo.png";
import {Link} from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div>
        <header className="common-header">
          <nav className="nav">
            <div className="container">
              <div className="navbar-header">
                <Link className="navbar-brand" to="/"><img src={logo_Img} alt="top-logo"/></Link>
              </div>
            </div>
          </nav>
        </header>
      </div>
    )
  }
}

export default Header;
