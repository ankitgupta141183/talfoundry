import React, {Component} from "react";
import Modal from 'react-modal';
import JobCategoryCheckboxes from '../../utills/JobCategoryCheckboxes';
import Checkbox from '../../utills/Checkbox';

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
    // width                 : '60%',
  }
}

export default class EditCategory extends Component {
  constructor(props, context) {
    super(props, context)
    // let newProps = Object.assign([], JSON.parse(props.value));
    this.state = {
      categoryData: props.value
    }
  }

  handleJobCategoryChange = (e) => {
    let newState = Object.assign({}, this.state);
    // let jobCategory = newState.categories;
    let index
    if (e.target.checked) {
      newState.categoryData.push(e.target.name)
    } else {
      index = newState.categoryData.indexOf(e.target.name)
      newState.categoryData.splice(index, 1)
    }
    // console.log('newState',newState)
    this.setState(newState)
  }

  submitData = () => {
    const data = {
      profile: {
        category: this.state.categoryData.join(',')
      }
    }
    this.props.updateProfile(data, "categoryUpdate")
  }


  render() {

    const {lgShow, setLgShow} = this.props;
    const { categoryData } = this.state;
    const categories = categoryData.map(val => val.trim())
    // console.log("props.value",this.props.value)
    // console.log(categories , "categories" , categoryData);
    return (
        <Modal isOpen={lgShow} onRequestClose={setLgShow} style={customStyles}>
          <div className="modal-content overview-modal" id="my-categories-popup-on-edit-profile">
            <div className="modal-header">
              <h4 className="modal-title" id="myModalLabel">Platforms</h4>
            </div>
            <div className="modal-body tf_profile">
              <div className="">
                <div className="mn_margin job-Category">
                  <div className="">
                    <div className="input-group job-category">
                      <div className="form-group label-floating tf_step_3">
                        <div className="">
                          {/*<label className="control-label mb-15">Platform*</label>*/}
                        </div>
                        <div className="clearfix"></div>
                        <div className="">
                        {
                          JobCategoryCheckboxes.map(item => (
                            <div className="details-option mb-10" key={item.key}>
                              <Checkbox name={item.name} checked={categoryData && categories.includes(item.name)} onChange={this.handleJobCategoryChange} />
                              <span>{item.name}</span>
                            </div>
                          )  
                          )}
                        </div>
                        <div className="clearfix"></div>
                      </div>
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
