import React, { Component } from "react";
import Header from "../miscellaneous/Header";
// import Footer from "../miscellaneous/Footer";
import img2 from "../../static/images/Image_2@2x.png";
import img3 from "../../static/images/Image_3@2x.png";
import img4 from "../../static/images/Image_4@2x.png";
import img5 from "../../static/images/Image_5@2x.png";
import img6 from "../../static/images/Image_6@2x.png";
import img7 from "../../static/images/Image_7@2x.png";
import appImage from "../../static/images/Application.png";
import { Link } from "react-router-dom";
import { getUserRedirection } from "../../utills/formatting";
import { connect } from "react-redux";

class GetStarted extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  componentDidMount() {
    const { hasRedirection, path } = getUserRedirection(this.props.currentUser);
    if (hasRedirection) {
      this.props.history.push(path);
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="wraper">
          <div className="mn_center" style={{minHeight: '100vh'}}>
            <div className="container">
              <div className="application_process">
                <div className="col-md-12 mt-70">
                  <h2>Welcome to the TalFoundry Application Process!</h2>
                  <p>
                    We are a global network of top cloud experts.{" "}
                    <br />
                    With TalFoundry, you'll build an amazing career, wherever
                    you live.
                  </p>
                  <img src={appImage} alt="" className="build-img" />
                  <h4>Build Your Career With TalFoundry!</h4>

                  <Link
                  style={
                    {
                      backgroundColor: '#0DA4DE'
                    }
                  }
                    to={{
                      pathname: "/app-process1",
                      state: { getStartedClicked: true },
                    }}
                  >
                    Get Started
                  </Link>
                </div>
                <div className="col-md-12">
                  <div className="tf_top_company">
                    <img src={img2} alt="2" align="" />
                    <img src={img3} alt="3" align="" />
                    <img src={img4} alt="4" align="" />
                    <img src={img5} alt="5" align="" />
                    <img src={img6} alt="6" align="" />
                    <img src={img7} alt="7" align="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps, null)(GetStarted);
