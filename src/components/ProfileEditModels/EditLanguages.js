
import React, {Component} from "react";
import {logOutAction} from '../../Actions/logOutAction';
import { connect } from "react-redux";
import Modal from 'react-modal';
import LANGUAGES from '../../constants/languages';

const allLanguages = LANGUAGES;


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

class EditLanguages extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      editLanguages: props.value
    }
  }

  componentWillReceiveProps(newProps, nextProps) {
    if (!this.state.editLanguages) {
      this.setState({editLanguages: newProps.value})
    }
  }

  onValChange = (event) => {
    this.setState({ editLanguages: event.target.value })
  }

  submitData = () => {
    const data = {
      profile: {
        english_proficiency: this.state.editLanguages
      }
    }
    this.props.updateProfile(data)
  }


  render() {
    const {lgShow, setLgShow,value} = this.props;

    const languages = allLanguages.map((lang) =>
      <option selected={lang === value }>{lang}</option>
    )


    return (
        <Modal isOpen={lgShow} onRequestClose={setLgShow} style={customStyles}>
          <div className="modal-content overview-modal">
            <div className="modal-header">
              <h4 className="modal-title" id="myModalLabel">Change your Preferred Language</h4>
            </div>
            <div className="modal-body">
              <div className="form-group col-sm-6">
                <select name="hoursAvailable" onChange={this.onValChange} defaultValue={value} className="form-control mn_input mySelectBoxClass">
                              <option selected disabled>Select hours</option>
                              {languages}
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

export default connect(mapStateToProps, mapDispatchToProps)(EditLanguages)