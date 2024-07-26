// "use strict";
import React, {Component} from "react";
import FreelancerHeader from "../miscellaneous/FreelancerHeader";
import ProjectManagerHeader from "../miscellaneous/ProjectManagerHeader";
import Footer from '../miscellaneous/Footer';
import {getConversations, createMessage, createConversation, updateConversation } from '../../Actions/conversationActions';
import {getSearchedFLForHiringMan, getSearchedConversations} from '../../Actions/SearchActions';
import { ActionCableConsumer } from 'react-actioncable-provider';
import Cable from './Cable';
import Autosuggest from 'react-autosuggest';
import { connect } from "react-redux";
import {debounce} from 'lodash';
import { Link } from "react-router-dom";
import filterIcon from '../../static/images/Icon_Tune_Filled_1.svg';
import searchIcon from '../../static/images/Icon_Search.svg';
import baseFilter from '../../static/images/baseline-filter_list-24px.svg';
import Icon_Add_Rounded from '../../static/images/Icon_Add_Rounded.svg';
import baseline_contacts from '../../static/images/baseline-contacts-23px.svg';
import round_star_rate from '../../static/images/round-star_rate-18px.svg';
import ellipseIcon from '../../static/images/Ellipse 4930@2x.png';
import faceImg from '../../static/images/profile-placeholder.png';
import MessagesArea from "./MessagesArea";
import msgAudio from '../../static/Audio/sharp.mp3';
import '../../static/stylesheets/scroll.css';

function getSuggestionValue(suggestion) {
  return suggestion[1]
}

function renderSuggestion(suggestion) {
  const user = this.props.currentUser.user_id !== suggestion.receiver.id ? suggestion.receiver : suggestion.sender;
  return (
    <div>
      <div className="row">
          <div className="col-md-3 nopad">
          {(user.user_name) ?
            <img className="auto_suggest_user_profile_image" src={user.user_name} alt="Profile Img"/>:
            // <Avatar name={  user.first_name && user.first_name.split(' ')[0]} color="#FFB4B6" round="50px" size="50"/>
            <img className="auto_suggest_user_profile_image" src={faceImg} alt="Profile Img"/>
            }
          </div>
          <div className="col-md-9 nopad">
          <p className="auto_suggest_user_profile_username">{user.first_name} {user.last_name}</p>
          </div>
      </div>
    </div>
  )
}

class Messages extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      conversations: [],
      suggestions: [],
      activeConversation: null,
      searchValue: ''
    }
    this.changeSearch = debounce(this.loadSuggestions, 250)
  }

  componentDidMount(){
    this.props.getConversations()
    .then((res) => {
      if (!res && res.response.status === 401) {
        this.setState({conversations: [], activeConversation: null})
      } else {
        this.setState({conversations: res, activeConversation: res ? res[0].id : null})
        this.props.updateConversation(res ? res[0].id : null)
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  onChange = (event, { newValue }) => {
    this.setState({
      searchValue: newValue
    })
  }

  loadSuggestions = (value) => {
    this.props.getSearchedConversations(value)
    .then((res) => {
      const suggestions = res ?  res : []
      this.setState({ suggestions })
    }).catch((err) => {
      console.log(err)
    })
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.changeSearch(value)
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    })
  }

  onSuggestionSelected = (event, value) => {
    this.setState({activeConversation: value.suggestion.id})
  }

  handleClick = id => {
    this.setState({ activeConversation: id })
    this.props.updateConversation(id)
    .then((res) => {
      if(res.status === 200){
        this.props.getConversations()
        .then((res) => {
          if (!res && res.response.status === 401) {
            this.setState({conversations: [], activeConversation: null})
          } else {
            this.setState({conversations: res, activeConversation: id})
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    })
  }

  handleReceivedConversation = response => {
    const { conversation } = response;
    let newState = Object.assign({}, this.state);
    const hasConv = newState.conversations.find(a => a.id === conversation.id)
    if(!hasConv) {
      newState.conversations.push(conversation)
    }
    this.setState(newState)
  }

  messageSubmit = (conversationId, e) => {
    e.preventDefault()
    const textVal = e.target.elements[0].value
    const { currentUser } = this.props;
    const data = { text: textVal, user_id: currentUser.id || currentUser.user_id, conversation_id: conversationId}
    if(textVal !== ""){
      this.props.createMessage(data)
      .then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
    }
    e.target.elements[0].value = ""
  }

  handleReceivedMessage = response => {
    const { message } = response;
    let newState = Object.assign({}, this.state)
    let conversation = newState.conversations.find(
      conversation => conversation.id === message.conversation_id
    )

    if(conversation.messages.find(a => a.id === message.id)) {
      console.log('duplicate')
    } else {
      conversation.messages = [...conversation.messages, message];
    }
    if(response.message.user_id !== (this.props.currentUser.user_id || this.props.currentUser.id)){
			var audio = new Audio(msgAudio)
    	audio.play()
    }
    if(response.message.conversation_id === this.state.activeConversation && response.message.user_id !== (this.props.currentUser.user_id || this.props.currentUser.id)){
      this.props.updateConversation(this.state.activeConversation)
      .then((res) => {
        if(res.status === 200){
          this.props.getConversations()
          .then((res) => {
            if (!res && res.response.status === 401) {
              this.setState({conversations: []})
            } else {
              this.setState({conversations: res})
            }
          }).catch((err) => {
            console.log(err)
          })
        }
      })
    }
    this.setState(newState)
    // let elmt = document.getElementsByClassName('msg')
  }

  render() {
    const role = this.props.currentUser.role;
    const { activeConversation, conversations, searchValue, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Search',
      name: 'search',
      class: 'form-control mn_input',
      value: searchValue ? searchValue : '',
      onChange: this.onChange
    }

    return (
      <div className="see-all-notifications-landing-page chat-roomPage">
        {(role === "Freelancer") ?  <FreelancerHeader history={this.props.history} conversations={this.state.conversations} /> : <ProjectManagerHeader history={this.props.history} />}
        <div className="mn_center">
          <ActionCableConsumer
            channel={{ channel: 'ConversationsChannel' }}
            onReceived={this.handleReceivedConversation}
          />
          {this.state.conversations.length ? (
            <Cable
              conversations={conversations}
              handleReceivedMessage={this.handleReceivedMessage}
            />
          ) : null}

          <div className="tf_container chat-room">

            <div className="col-md-12 tf_resp_padd">
              <div className="tf_aws tf_contracts_mile mb-0">
                <div className="col-lg-3 col-md-4 col-sm-5 col-xs-12 tf_padd_right content mCustomScrollbar">
                  <div className="tf_msg_left  tf_all__mile_tab">
                    <div className="tf_search_icons tf_msg_tabs">
                      <div className="col-md-3 col-sm-3 col-xs-3">
                        <img src={filterIcon} alt="filterIcon"/>
                      </div>
                      <div className="col-md-6 col-sm-7 col-xs-7">
                        <div className="tabbable-panel search-user-for-chat-tabs">
                          <div className="tabbable-line">
                            <ul className="nav nav-tabs">
                              <li className="active">
                                <a href="#tab_default_1" data-toggle="tab">
                                  <i className="fa fa-commenting" aria-hidden="true"></i>
                                </a>
                              </li>
                              <li>
                                <a href="#tab_default_2" data-toggle="tab">
                                  <i className="fa fa-address-card" aria-hidden="true"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 col-sm-2 col-xs-2">
                        <img src={Icon_Add_Rounded} alt="Icon_Add_Rounded"/>
                      </div>
                      <div className="col-md-12 tf_bg_1">
                        <div className="tab-content tf_msg_left">
                          <div className="tab-pane active" id="tab_default_1">
                            <div className="input-group">
                              <div className="input-group-addon1">
                                <img src={searchIcon} alt="search"/>
                              </div>
                              <div className="tf_search search_user_for_chating" id="search-user-list-for-chat">
                                <Autosuggest
                                  suggestions={suggestions}
                                  onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                  onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                  onSuggestionSelected={this.onSuggestionSelected}
                                  getSuggestionValue={getSuggestionValue}
                                  renderSuggestion={renderSuggestion.bind(this)}
                                  inputProps={inputProps} />
                              </div>
                              <div className="input-group-addon5">
                                <img src={baseFilter} alt="baseFilter"/>
                              </div>
                            </div>
                            <div className="clearfix"></div>
                            <div className="tf_msges">{mapConversations(conversations, this.handleClick, this.props.currentUser.user_id || this.props.currentUser.id)}</div>
                          </div>
                          <div className="tab-pane" id="tab_default_2">
                            <div className="input-group">
                              <div className="input-group-addon1">
                                <img src={searchIcon} alt="search"/>
                              </div>
                              <div className="tf_search">
                                <input type="text" className="form-control mn_input" placeholder="Search" defaultValue=""/>
                              </div>
                              <div className="input-group-addon5">
                                <img src={baseFilter} alt="baseFilter"/>
                              </div>
                            </div>
                            <div className="clearfix"></div>
                            <div className="col-md-12">
                              <div className="tf_people">
                                <a href="all_people_rooms.html">
                                  <img src={baseline_contacts} alt="baseline contacts icon"/>
                                  <p>All People & Rooms</p>
                                </a>
                              </div>
                              <div className="clearfix"></div>
                            </div>
                            <div className="col-md-12">
                              <div className="tf_people">
                                <img src={round_star_rate} alt=""/>
                                <p>Favourite Message</p>
                              </div>
                              <div className="clearfix"></div>
                            </div>
                            <div className="tf_msges">
                              <h4>People</h4>
                              <div className="msg msg_1">
                                <div className="col-md-2 col-sm-2 col-xs-2 nopad tf_full_width">
                                  <div className="tf_contracts_mile_img">
                                    <img src={ellipseIcon} alt=""/>
                                    <Link>
                                      <div className="tf_round"></div>
                                    </Link>
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
                              <div className="msg msg_1">
                                <div className="col-md-2 col-sm-2 col-xs-2 nopad tf_full_width">
                                  <div className="tf_contracts_mile_img">
                                    <img src={ellipseIcon} alt=""/>
                                    <Link>
                                      <div className="tf_round"></div>
                                    </Link>
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
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-9 col-md-8 col-sm-7 col-xs-12 tf_padd_left">
                  {activeConversation ? (
                    <MessagesArea
                      conversation={findActiveConversation(
                        conversations,
                        activeConversation
                      )}
                      messageSubmit={this.messageSubmit}
                      currentUser={this.props.currentUser}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      )
    }
  }

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = (dispatch) => {
  return {
    getConversations: () => dispatch(getConversations()),
    createConversation: (data) => dispatch(createConversation(data)),
    getSearchedFreelancers: (searchBy, search) => dispatch(getSearchedFLForHiringMan(searchBy, search)),
    createMessage: (data) => dispatch(createMessage(data)),
    updateConversation: (id) => dispatch(updateConversation(id)),
    getSearchedConversations: (searchItem) => dispatch(getSearchedConversations(searchItem)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages)

// helpers

const findActiveConversation = (conversations, activeConversation) => {
  return conversations.find(
    conversation => conversation.id === activeConversation
  )
}

const getUser =(conversation, id) => {
  return conversation.sender.id === id ? conversation.receiver : conversation.sender
}

const getUnreadMessageCount = (convo, id) => {
  let count = 0
    convo.messages.map((msg) => {
      if(!msg.read_at && msg.user_id !== id){
        count = count+1
      }
      return msg
    })
  return count
}

const mapConversations = (conversations, handleClick, currentUserId) => {
  // console.log("conversations = ", conversations)
  return conversations.map(conversation => {
    const conversationDate = new Date(conversation.created_at)
    const user = getUser(conversation, currentUserId)
    return (
      <div className="msg msg_1" key={conversation.id} onClick={() => handleClick(conversation.id)}>
        <div className="col-md-2 col-sm-2 col-xs-2 nopad tf_full_width">
          <div className="tf_contracts_mile_img">
            {(user && user.user_name) ?
              <img  className = "img-circle list_of_user_profile_for_chat" src={user.user_name} alt="img"/>:
              // <Avatar name={  user.first_name && user.first_name.split(' ')[0]} color="#FFB4B6" round="50px" size="50"/>
              <img  className = "img-circle list_of_user_profile_for_chat" src={faceImg} alt="img"/>
              }
              {getUnreadMessageCount(conversation, currentUserId) > 0 && <span className="unread_message_count">{getUnreadMessageCount(conversation)}</span>}
            <Link>
              <div className="tf_round"></div>
            </Link>
          </div>
        </div>
        <div className="col-md-7 col-sm-7 col-xs-8">
          <div className="media-body">
            <h5 className="media-heading">{`${user && user.first_name + " " + user && user.last_name}`}</h5>
            {/* <small>Carolyn Oli…</small> */}
          </div>
        </div>
        <div className="col-md-3 col-sm-3 col-xs-2">
          <div className="media-body">
            { <small className="pull-right time">{`${conversationDate.getMonth()}/${conversationDate.getDate()}/${conversationDate.getFullYear().toString().substr(-2)}`}</small> }
          </div>
        </div>
      </div>
    )
  })
}
