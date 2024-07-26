import React, {Component} from "react";
import {logOutAction} from '../../Actions/logOutAction';
import { connect } from "react-redux";
import Modal from 'react-modal';
import TagsInput from 'react-tagsinput';
import Autosuggest from 'react-autosuggest';
import TECHNOLOGIES from '../../constants/techs';
import TechnologiesAutoSuggestField from "../CommonComponets/TechnoloiesAutoSuggestField";
// function states () {
//   let data = []
//   TECHNOLOGIES && TECHNOLOGIES.map((a, index) => data.push({abbr: index, name: a.name}))
//   return data;
// }
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

class EditSkills extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      skill: props.value
    }
  }

  componentWillReceiveProps(newProps, nextProps) {
    if(!this.state.skill) {
      this.setState({skill: newProps.skill})
    }
  }

  handleTagChange = (tags) => {this.setState({skill: tags})}

  submitData = () => {
    const data = {
      profile: {
        skill: this.state.skill.join(",")
      }
    }
    this.props.updateProfile(data)
  }


  render() {
    const {lgShow, setLgShow} = this.props;
    const { skill } = this.state;
    // const tagInputProps = {placeholder: "Type skills to select tags"}

    // function autocompleteRenderInput ({addTag, ...props}) {
    //   const handleOnChange = (e, {newValue, method}) => {
    //     if (method === 'enter') {
    //       e.preventDefault()
    //     } else {
    //       props.onChange(e)
    //     }
    //   }

    //   const inputValue = (props.value && props.value.trim().toLowerCase()) || ''
    //   const inputLength = inputValue.length
    //   let suggestions = states().filter((state) => {
    //     return state.name.toLowerCase().slice(0, inputLength) === inputValue
    //   })

    //   return (
    //     <Autosuggest
    //       ref={props.ref}
    //       suggestions={suggestions}
    //       shouldRenderSuggestions={(value) => value && value.trim().length > 0}
    //       getSuggestionValue={(suggestion) => suggestion.name}
    //       renderSuggestion={(suggestion) => <span>{suggestion.name}</span>}
    //       inputProps={{...props, onChange: handleOnChange}}
    //       onSuggestionSelected={(e, {suggestion}) => {
    //         addTag(suggestion.name)
    //       }}
    //       onSuggestionsClearRequested={() => {}}
    //       onSuggestionsFetchRequested={() => {}}
    //     />
    //   )
    // }
    return (
        <Modal isOpen={lgShow} onRequestClose={setLgShow} style={customStyles}>
          <div className="modal-content overview-modal" id="ce-skills-and-expertise-popup">
            <div className="modal-header">
              <h4 className="modal-title" id="myModalLabel">Tech Stack</h4>
            </div>
            <div className="modal-body">
							<div className="tag_list_wrapper skills-wrapper" id="editSkill">
								<div className="col-sm-12 pd-none">
									<div className="form-group label-floating">
										<div className="clearfix"></div>
										<div className="col-md-12 nopad edit_skills_cloud_expert">
                    <TechnologiesAutoSuggestField
                      handleChange={this.handleTagChange}
                      data={skill}
                      tagInputProps={{
                        placeholder: "Type skills to select tags",
                      }}
                      jobCategory={this.props.category}
                    />
										</div>
									</div>
								</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditSkills)