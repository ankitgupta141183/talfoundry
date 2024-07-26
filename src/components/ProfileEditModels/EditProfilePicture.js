import React, {Component} from "react";
import {logOutAction} from '../../Actions/logOutAction';
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import Modal from 'react-modal';
import Avatar from 'react-avatar-edit';
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
    width                 : '45%',
  }
}
class EditProfilePic extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      preview: null,
      src: props.profilePic,
      isLoading: false
    }
    this.onCrop = this.onCrop.bind(this)
    this.onClose = this.onClose.bind(this)
    this.onBeforeFileLoad = this.onBeforeFileLoad.bind(this)
  }

  componentWillReceiveProps(nextProps){
    this.setState({isLoading: nextProps && nextProps.applicationIsLoading})
  }
  onClose() {
    this.setState({preview: null})
  }

  onCrop(preview) {
    this.setState({preview})
  }

  onBeforeFileLoad(elem) {
    if(elem.target.files[0].size > 771680){
      alert("File is too big!")
      elem.target.value = "";
    }
  }

  submitData = () => {
    const data = {
      profile: {
        profile_picture: this.state.preview
      }
    }
    this.props.updateProfile(data)
  }

  render() {
    const {lgShow, setLgShow} = this.props;
    const {isLoading} = this.state;
    return (
        <Modal isOpen={lgShow} onRequestClose={setLgShow} style={customStyles}>
          {isLoading && (
            <div className="grid-loader">
              <Loader type="Grid" color="#00BFFF" height={100} width={100} />
              <p>Profile picture is uploading, it may take some time.</p>
            </div>
          )}
          {!isLoading && <div className="modal-content overview-modal">
            <div className="modal-header">
              <h4 className="modal-title" id="myModalLabel">Edit Profile picture</h4>
            </div>
            <div className="modal-body edit-profile-modal">
            <Avatar
              width={'100%'}
              height={400}
              onCrop={this.onCrop}
              onClose={this.onClose}
              onBeforeFileLoad={this.onBeforeFileLoad}
              src={`data:image/jpeg;base64,${this.state.src}`}
              // src={this.state.src}
            />
            </div>
            <div className="clearfix"></div>
            <hr/>
            <div className="modal-footer tf_btns">
              <button type="button" className="btn btn-default" onClick={setLgShow}>Cancel</button>
              <button type="button" className="btn btn-primary" onClick={this.submitData}>Save</button>
            </div>
          </div>}
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

export default connect(mapStateToProps, mapDispatchToProps)(EditProfilePic)