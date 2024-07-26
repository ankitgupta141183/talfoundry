import React, { Component } from 'react';
import { connect } from "react-redux";
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';

class TemplateSlider extends Component {
  constructor(props) {
    super(props)
    this.state = {
        // isPaneOpen: false,
        // isPaneOpenLeft: false
    }
  }

  goToJobPost = (e) => {
    this.props.onCloseSlider()
    this.props.history.push(`post-a-job-wizard/${e.target.id}`)
  }

  renderTemplateSpecificData = () => {
    const {sliderType} = this.props
    if(sliderType === "salesforceSlider"){
      return <div>
        <div className="row">
          <div className="col-md-12">
            <h3 className="jobs-templates-page-heading">Hire faster with Salesforce development job templates</h3>
            <p className="jobs-templates-page-description">Start with a time-tested template from popular projects. </p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-3">
            <div className="jobs-templates-box-container">
                <h4 className="jobs-templates-box-heading">Salesforce Developer</h4>
                <p className="jobs-templates-box-description">Hire faster with Salesforce development job templates Hire faster with Salesforce development</p>
                <button onClick={this.goToJobPost} id="Salesforce Developer" className="jobs-templates-box-button">Begin</button>
            </div>
          </div>
          <div className="col-md-3">
            <div className="jobs-templates-box-container">
                <h4 className="jobs-templates-box-heading">Salesforce Administrator</h4>
                <p className="jobs-templates-box-description">Hire faster with Salesforce development job templates Hire faster with Salesforce development</p>
                <button onClick={this.goToJobPost} id="Salesforce Administrator" className="jobs-templates-box-button">Begin</button>
            </div>
          </div>
          <div className="col-md-3">
            <div className="jobs-templates-box-container">
                <h4 className="jobs-templates-box-heading">Salesforce Architect</h4>
                <p className="jobs-templates-box-description">Hire faster with Salesforce development job templates Hire faster with Salesforce development</p>
                <button onClick={this.goToJobPost} id="Salesforce Architect" className="jobs-templates-box-button">Begin</button>
            </div>
          </div>
          <div className="col-md-3">
            <div className="jobs-templates-box-container">
                <h4 className="jobs-templates-box-heading">Salesforce Consultant</h4>
                <p className="jobs-templates-box-description">Hire faster with Salesforce development job templates Hire faster with Salesforce development</p>
                <button onClick={this.goToJobPost} id="Salesforce Consultant" className="jobs-templates-box-button">Begin</button>
            </div>
          </div>
        </div>
      </div>
    }else if (sliderType === "awsSlider"){
      return <div>


        <div className="row">
          <div className="col-md-12">
            <h3 className="jobs-templates-page-heading">Hire faster with AWS development job templates</h3>
            <p className="jobs-templates-page-description">Start with a time-tested template from popular projects.</p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-3">
            <div className="jobs-templates-box-container">
                <h4 className="jobs-templates-box-heading">AWS Solutions Architect</h4>
                <p className="jobs-templates-box-description">Hire faster with AWS development job templates Hire faster with AWS development</p>
                <button onClick={this.goToJobPost} id="AWS Solutions Architect" className="jobs-templates-box-button">Begin</button>
            </div>
          </div>
          <div className="col-md-3">
            <div className="jobs-templates-box-container">
                <h4 className="jobs-templates-box-heading">AWS SysOps Administrator</h4>
                <p className="jobs-templates-box-description">Hire faster with AWS development job templates Hire faster with AWS development</p>
                <button onClick={this.goToJobPost} id="AWS SysOps Administrator" className="jobs-templates-box-button">Begin</button>
            </div>
          </div>
          <div className="col-md-3">
            <div className="jobs-templates-box-container">
                <h4 className="jobs-templates-box-heading">Senior AWS Cloud Architect</h4>
                <p className="jobs-templates-box-description">Hire faster with AWS development job templates Hire faster with AWS development</p>
                <button onClick={this.goToJobPost} id="Senior AWS Cloud Architect" className="jobs-templates-box-button">Begin</button>
            </div>
          </div>
          <div className="col-md-3">
          </div>
        </div>
      </div>
    }else if (sliderType === "oracleSlider"){
      return <div>
        <div className="row">
          <div className="col-md-12">
            <h3 className="jobs-templates-page-heading">Hire faster with Oracle development job templates</h3>
            <p className="jobs-templates-page-description">Start with a time-tested template from popular projects.</p>
          </div>
        </div>
        <div className="row oracle-slider-equal-height">
          <div className="col-md-3">
            <div className="jobs-templates-box-container box-equal-height-for-template-slider">
                <h4 className="jobs-templates-box-heading">Oracle Cloud HCM<br /> Consultant</h4>
                <p className="jobs-templates-box-description">Hire faster with Oracle development job templates Hire faster with Oracle development</p>
                <button onClick={this.goToJobPost} id="Oracle Cloud HCM Consultant" className="jobs-templates-box-button">Begin</button>
            </div>
          </div>
          <div className="col-md-3">
            <div className="jobs-templates-box-container box-equal-height-for-template-slider">
                <h4 className="jobs-templates-box-heading">Oracle Cloud Solution Architect - Finanecode</h4>
                <p className="jobs-templates-box-description">Hire faster with Oracle development job templates Hire faster with Oracle development</p>
                <button onClick={this.goToJobPost} id="Oracle Cloud Solution Architect" className="jobs-templates-box-button">Begin</button>
            </div>
          </div>
          <div className="col-md-3">
            <div className="jobs-templates-box-container box-equal-height-for-template-slider">
                <h4 className="jobs-templates-box-heading">Oracle ERP Cloud <br />Consultant</h4>
                <p className="jobs-templates-box-description">Hire faster with Oracle development job templates Hire faster with Oracle development</p>
                <button onClick={this.goToJobPost} id="Oracle ERP Cloud Consultant" className="jobs-templates-box-button">Begin</button>
            </div>
          </div>
          <div className="col-md-3">
          </div>
        </div>
      </div>
    }else if (sliderType === "netSuiteSlider"){
      return <div>
        <div className="row">
          <div className="col-md-12">
            <h3 className="jobs-templates-page-heading">Hire faster with NetSuite development job templates</h3>
            <p className="jobs-templates-page-description">Start with a time-tested template from popular projects.</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <div className="jobs-templates-box-container">
                <h4 className="jobs-templates-box-heading">Oracle NetSuite Consultant</h4>
                <p className="jobs-templates-box-description">Hire faster with Oracle NetSuite Consultant development job templates Hire faster with Oracle NetSuite Consultant development</p>
                <button onClick={this.goToJobPost} id="Oracle Netsuite Consultant" className="jobs-templates-box-button">Begin</button>
            </div>
          </div>
          <div className="col-md-3">
          </div>
          <div className="col-md-3">
          </div>
          <div className="col-md-3">
          </div>
        </div>
      </div>
    }
  }

  render() {
    const {isSliderOpen, onCloseSlider} = this.props;
      return <div>
        <SlidingPane
          className='some-custom-class'
          overlayClassName='some-custom-overlay-class jobs-template-popup-slider'
          isOpen={ isSliderOpen }
          // title='Back'
          closeIcon={<div><i className="fa fa-angle-left back-btn-size" aria-hidden="true"></i><span className = "back-btn">Back</span></div>}
          ariaHideApp={false}
          // appElement={document.getElementById('root')}
          // subtitle='Optional subtitle.'
          onRequestClose={onCloseSlider}>
          {this.renderTemplateSpecificData()}
        </SlidingPane>
      </div>;
  }
}

const mapStateToProps = state => ({
  ...state
})

export default connect(mapStateToProps, null)(TemplateSlider)