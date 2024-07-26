import React from 'react';
import { ActionCable } from 'react-actioncable-provider';
import ellipseIcon from '../../static/images/Ellipse 4930@2x.png';

import MessagesArea from './MessagesArea';
import Cable from './Cable';

class ConversationsList extends React.Component {
  state = {
    conversations: [],
    activeConversation: null
  }

  handleClick = id => {
    this.setState({ activeConversation: id })
  }

  handleReceivedConversation = response => {
    const { conversation } = response;
    this.setState({
      conversations: [...this.state.conversations, conversation]
    })
  }

  handleReceivedMessage = response => {
    const { message } = response;
    const conversations = [...this.state.conversations];
    const conversation = conversations.find(
      conversation => conversation.id === message.conversation_id
    )
    conversation.messages = [...conversation.messages, message];
    this.setState({ conversations })
  }

  render = () => {
    const { conversations, activeConversation } = this.state;
    return (
      <div className="conversationsList">
        <ActionCable
          channel={{ channel: 'ConversationsChannel' }}
          onReceived={this.handleReceivedConversation}
        />
        {this.state.conversations.length ? (
          <Cable
            conversations={conversations}
            handleReceivedMessage={this.handleReceivedMessage}
          />
        ) : null}
        {/* <h2>Conversations</h2> */}
        <div className="tf_msges">{mapConversations(conversations, this.handleClick)}</div>
        {/* <NewConversationForm /> */}
        {activeConversation ? (
          <MessagesArea
            conversation={findActiveConversation(
              conversations,
              activeConversation
            )}
          />
        ) : null}
      </div>
    )
  }
}

export default ConversationsList;

// helpers

const findActiveConversation = (conversations, activeConversation) => {
  return conversations.find(
    conversation => conversation.id === activeConversation
  )
}

const mapConversations = (conversations, handleClick) => {
  return conversations.map(conversation => {
    return (

      <div className="msg msg_1" key={conversation.id} onClick={() => handleClick(conversation.id)}>
        <div className="col-md-2 col-sm-2 col-xs-2 nopad tf_full_width">
          <div className="tf_contracts_mile_img">
            <img src={ellipseIcon} alt=""/>
            <a href="#">
              <div className="tf_round"></div>
            </a>
          </div>
        </div>
        <div className="col-md-7 col-sm-7 col-xs-8">
          <div className="media-body">
            <h5 className="media-heading">Carolyn Oliver</h5>
            <small>Carolyn Oli…</small>
          </div>
        </div>
        <div className="col-md-3 col-sm-3 col-xs-2">
          <div className="media-body">
            <small className="pull-right time">10/05/19</small>
          </div>
        </div>
      </div>
    )
  })
}