import React from 'react';
import { connect } from "react-redux";
import { createConversation } from '../../Actions/conversationActions'

class NewConversationForm extends React.Component {
  state = {
    title: ''
  }

  handleChange = e => {
    this.setState({ title: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const data = {title: 'new chat'}

    this.props.createConversation(data)
    this.setState({ title: '' })
  }

  render = () => {
    return (
      <div className="newConversationForm">
        <form onSubmit={this.handleSubmit}>
          <label>New Conversation:</label>
          <br />
          <input
            type="text"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <input type="submit" />
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createConversation: (data) => dispatch(createConversation(data))
  }
}


const mapStateToProps = state => ({
  ...state
})

export default connect(mapStateToProps, mapDispatchToProps)(NewConversationForm)
