
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
    width                 : '30%',
  }
}

class EditVisibility extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      visibility: props.value
    }
  }

  componentWillReceiveProps(newProps, nextProps) {
    if (!this.state.visibility) {
      this.setState({visibility: newProps.value})
    }
  }

  onValChange = (event) => {
    this.setState({ visibility: event.target.value })
  }

  submitData = () => {
    const data = {
      profile: {
        visibility: this.state.visibility
      }
    }
    this.props.updateProfile(data)
  }


  render() {
    const {lgShow, setLgShow,value} = this.props;
    // let lessThan = "<"

    return (
        <Modal isOpen={lgShow} onRequestClose={setLgShow} style={customStyles}>
          <div className="modal-content overview-modal">
            <div className="modal-header">
              <h4 className="modal-title" id="myModalLabel">Change your Visibility</h4>
            </div>
            <div className="modal-body">
              <div className="form-group col-sm-6">
                <select name="hoursAvailable" onChange={this.onValChange} defaultValue={value} className="form-control mn_input mySelectBoxClass">
                              <option selected disabled>Select Visibility</option>
                               <option value="Public">Public</option>
                              <option value="Private">Private</option>
                            </select>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditVisibility)