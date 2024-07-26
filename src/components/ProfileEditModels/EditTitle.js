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

class EditTitle extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      title: props.value
    }
  }

  componentWillReceiveProps(newProps, nextProps) {
    if (!this.state.title) {
      this.setState({title: newProps.value})
    }
  }

  onValChange = (event) => {
    this.setState({ title: event.target.value })
  }

  submitData = () => {
    const data = {
      profile: {
        current_job_title: this.state.title
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
              <h4 className="modal-title" id="myModalLabel">Edit your title</h4>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="title" className="control-label">Your title</label>
                <p className="m-md-bottom">Enter a single sentence description of your professional skills/experience (e.g. Expert Web Designer with Ajax experience)</p>
                <input id="title" onChange={this.onValChange} defaultValue={this.state.title} className="form-control" name="title" placeholder="EXAMPLE: Professional Magento Developer" />
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

export default connect(mapStateToProps, mapDispatchToProps)(EditTitle)