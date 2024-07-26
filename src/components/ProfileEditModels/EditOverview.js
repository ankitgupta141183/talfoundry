import React, {Component} from "react";
import {logOutAction} from '../../Actions/logOutAction';
import { connect } from "react-redux";
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    border                : 'none',
    background            : 'transparent',
    width                 : '60%',
  }
}

class EditOverview extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      overview: props.value
    }
  }

  componentWillReceiveProps(newProps, nextProps) {
    if(!this.state.overview) {
      this.setState({overview: newProps.value})
    }
  }

  onValChange = (event) => {
    this.setState({ overview: event.target.value })
  }

  submitData = () => {
    const data = {
      profile: {
        about_me: this.state.overview
      }
    }
    this.props.updateProfile(data)
  }


  render() {
    const {lgShow, setLgShow} = this.props;

    return (
        <Modal isOpen={lgShow} onRequestClose={setLgShow} style={customStyles}>
          <div className="modal-content overview-modal">
            <div className="modal-header">
              <h4 className="modal-title" id="myModalLabel">Overview</h4>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <p className="m-md-bottom">
                  Use this space to show clients that you have the skills and experience they're looking for.
                </p>
                <ul className="overview-list">
                  <li>Describe your strengths and skills</li>
                  <li>Highlight projects, accomplishments and education</li>
                  <li>Keep it short and make sure it's error-free</li>
                </ul>
                <textarea name="title" id="professional_overview" onChange={this.onValChange} defaultValue={this.state.overview} placeholder="EXAMPLE: Professional Magento Developer"></textarea>
              </div>
            </div>
            <div className="clearfix"></div>
            <hr/>
            <div className="modal-footer tf_btns">
              <button type="button" className="btn btn-default" onClick={setLgShow}>Cancel</button>
              <button type="button" className="btn btn-primary" onClick={this.submitData}>Save</button>
            </div>
          </div>
        </Modal>
      )
    }
  }

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logOutAction()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditOverview)