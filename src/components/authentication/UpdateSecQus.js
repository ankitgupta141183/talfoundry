import React, { Component } from "react";
import { connect } from "react-redux";
import closeIcon from "../../static/images/close-icon.png";
import { getCurrentUserDetails } from "../../Actions/applicationActions";
import { fieldError } from "../../utills/formatting";
import { getAuthQuestion } from "../../Actions/applicationActions";
import { submitSecurityQuestions } from "../../Actions/appProcessStepsActions";
import Modal from "react-modal";
import SuccessSweetAlert from "../CommonComponets/SweetAlert/SuccessSweetAlert";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    // background            : 'transparent',
    // width                 : '45%',
  },
};

class UpdateSecQue extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      question: null,
      correctAnswer: null,
    };
    this.checkboxRef = React.createRef();
  }

  async componentDidMount() {
    await this.props.getQuestion().then((questions) => {
      console.log("questions-->>>",questions)
      if(questions.length > 0){
        let questionAndAns 
        if(questions.length > 1){
           questionAndAns = questions[Math.round(Math.random())];
        }else{
           questionAndAns = questions[0];
        }
        this.setState({
          question: questionAndAns.question,
          correctAnswer: questionAndAns.answer,
        });
      }else{
        this.setState({ canUpdate: true });
      }
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      [e.target.name + "Error"]: false,
      wrongAns: false,
      checkboxError: false,
    });
  };

  checkOldQues = () => {
    const { oldAnswer, correctAnswer } = this.state;
    if (oldAnswer === correctAnswer) {
      this.setState({ canUpdate: true });
    } else {
      this.setState({ wrongAns: true });
    }
  };

  submitQuestions = () => {
    const { newQuestion, newAnswer } = this.state;
    if (newQuestion && newAnswer && this.checkboxRef.current.checked) {
      // alert("submitted answers.")
      const data = {
        user: {
          security_questions_attributes: [
            { question: newQuestion, answer: newAnswer },
          ],
        },
      };
      this.props.submitSecQuestions(data).then((res) => {
        if (res.status === 200) {
          this.setState({ isQueSaved: true });
        }
      });
    } else {
      this.setState({
        newQuestionError: !newQuestion && true,
        newAnswerError: !newAnswer && true,
        checkboxError: !this.checkboxRef.current.checked,
      });
    }
  };

  hideAlert = () => {
    this.setState({ isQueSaved: false });
    this.props.onClose();
  };

  render() {
    const {
      question,
      oldAnswer,
      newQuestion,
      newAnswer,
      wrongAns,
      newQuestionError,
      newAnswerError,
      checkboxError,
      isQueSaved,
    } = this.state;
    const questions = [
      "What primary school did you attend?",
      "In what town or city was your first full time job?",
      "In what town or city did you meet your spouse/partner?",
      "What is your spouse or partner's mother's maiden name?",
      "What time of the day were you born? (hh:mm)",
    ];
    const getQuestion1Options = questions
      .filter((el) => !el.includes(question))
      .map((question, idx) => {
        return <option key={idx}>{question}</option>;
      });
    return (
      <Modal isOpen={this.props.isOpen} style={customStyles}>
        {isQueSaved && (
          // <div className="app-pro2-swal">
          //   <SweetAlert
          //     success
          //     confirmBtnText="Ok"
          //     confirmBtnBsStyle="success"
          //     onConfirm={this.hideAlert}
          //   >
          //     Question saved Successfully.
          //   </SweetAlert>
          // </div>
          <SuccessSweetAlert 
          show={true}
          handleConfirm={this.hideAlert}
          message={" Question saved Successfully."}
          />
        )}

        <div className="clearfix"></div>

        <div className="modal-header">
          <button type="button" className="close" onClick={this.props.onClose}>
            <img src={closeIcon} alt="close" />
          </button>
          <h4 className="modal-title" id="myModalLabel">
            Change Security Question
          </h4>
        </div>
        <div className="modal-body">
          <section id="add-security-question">
            <div className="">
              {!this.state.canUpdate && (
                <div>
                  <div className="col-md-12 nopad">
                    <div className="form-group nopad">
                      <p className="instruction-message">
                        Before you can set a new security question, you'll have
                        to answer your current one correctly
                      </p>
                    </div>
                  </div>

                  <div className="clearfix"></div>

                  <div className="col-md-12 nopad">
                    <div className="form-group nopad">
                      <label>Current Question</label>
                      <p className="current-question">{question}</p>
                    </div>
                  </div>

                  <div className="clearfix"></div>

                  <div className="col-md-12 nopad">
                    <div className="form-group nopad">
                      <label>Answer</label>
                      <div className="clearfix"></div>
                      <div className="col-md-6 nopad">
                        <div className="input-group tf_loca">
                          <input
                            type="text"
                            className="form-control mn_input"
                            name="oldAnswer"
                            placeholder="Provide Your Answer Here"
                            onChange={this.handleChange}
                            value={oldAnswer}
                          />
                          {wrongAns &&
                            fieldError("Incorrect answer! Please try again.")}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="clearfix"></div>

                  <div className="col-md-12 nopad">
                    <div className="form-group nopad">
                      <div className="tf_stg_btn_pay">
                        <a
                          href={`#`}
                          onClick={this.checkOldQues}
                          className="tf_invite_button add-question-save-btn"
                        >
                          Next
                        </a>
                        <a
                          href={`#`}
                          onClick={this.props.onClose}
                          className="tf_short_button add-question-canel-btn"
                        >
                          Cancel
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="clearfix"></div>
                </div>
              )}

              {this.state.canUpdate && (
                <React.Fragment>
                  <div className="form-group nopad">
                    <label>Add New Security Question</label>
                    <div className="clearfix"></div>
                    <div className="col-md-6 nopad">
                      <div className="input-group tf_loca">
                        <div className="selectedwrap">
                          <select
                            className="form-control mn_input mySelectBoxClass"
                            name="newQuestion"
                            defaultValue={newQuestion}
                            onChange={this.handleChange}
                          >
                            <option>Select Security Question</option>
                            {getQuestion1Options}
                          </select>
                          {newQuestionError && fieldError()}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="clearfix"></div>
                  <div className="form-group nopad">
                    <label>Answer</label>
                    <div className="clearfix"></div>
                    <div className="col-md-6 nopad">
                      <div className="input-group tf_loca">
                        <input
                          type="text"
                          className="form-control mn_input"
                          name="newAnswer"
                          onChange={this.handleChange}
                          placeholder="Provide Your Answer Here"
                          value={newAnswer}
                        />
                        {newAnswerError && fieldError()}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 nopad">
                    <div className="form-group nopad">
                      <div className="col-md-12 nopad">
                        <div className="tf_sound tf_sound1">
                          <input
                            type="checkbox"
                            onChange={this.handleChange}
                            ref={this.checkboxRef}
                            id="job"
                          />
                          <label htmlFor="job">
                            I understand my account will be locked if I am
                            unable to answer this question
                          </label>
                          {checkboxError && fieldError()}
                        </div>
                      </div>
                      <div className="clearfix"></div>
                    </div>
                    <div className="clearfix"></div>
                    <div className="col-md-12 nopad">
                      <div className="tf_stg_btn_pay">
                        <div className="col-md-12 nopad">
                          <a
                            href={`#`}
                            onClick={this.submitQuestions}
                            className="tf_invite_button add-question-save-btn"
                          >
                            Save
                          </a>
                          <a
                            href={`#`}
                            className="tf_short_button add-question-canel-btn"
                            onClick={this.props.onClose}
                          >
                            Cancel
                          </a>
                        </div>
                      </div>
                      <div className="clearfix"></div>
                    </div>
                    <div className="clearfix"></div>
                  </div>
                </React.Fragment>
              )}
            </div>
          </section>
        </div>
      </Modal>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentUserDetails: () => dispatch(getCurrentUserDetails()),
    getQuestion: (data) => dispatch(getAuthQuestion(data)),
    submitSecQuestions: (data) => dispatch(submitSecurityQuestions(data)),
  };
};

export default connect(null, mapDispatchToProps)(UpdateSecQue);
