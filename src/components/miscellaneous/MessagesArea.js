import React from 'react';
import baseLineCallIcon from '../../static/images/baseline-call-24px.svg';
import baseLineVideocallIcon from '../../static/images/baseline-video_call-24px.svg';
import baseline_attach_file from '../../static/images/baseline-attach_file-24px.svg';
import baseline_tag_faces from '../../static/images/baseline-tag_faces-24px.svg';
import baseline_settings from '../../static/images/baseline-settings-20px.svg';
import baseline_note_add from '../../static/images/baseline-note_add-24px.svg';
import baseline_folder from '../../static/images/baseline-folder-24px.svg';
import baseline_people from '../../static/images/baseline-people-24px.svg';
import iconMoreFilled from '../../static/images/Icon_More_Filled.svg';
import { Link } from 'react-router-dom';
import faceImg from '../../static/images/profile-placeholder.png';

const MessagesArea = ({
  conversation: conversation,
  messageSubmit,
  currentUser
}) => {
  const {messages , id, sender, receiver} = conversation
  // const conversationDate = new Date(conversation.created_at)
  const activeMsgUser = ((currentUser.user_id || currentUser.id) === sender.id) ? receiver : sender
  // let elmt = document.getElementsByClassName('msg')
  return (
    <div className="invite_freelancer tf_all__mile_tab">
      <div className="tf_search_icons">
        <div className="col-md-12">
          <div className="col-md-4 col-sm-12">
            <div className="col-md-12 col-sm-12 col-xs-12 tf_full_width nopad">
              <div className="tf_message">
                <h3>{activeMsgUser ? activeMsgUser.first_name + " " + activeMsgUser.last_name : ''}</h3>
                {/* <h4>AWS Services</h4> */}
              </div>
            </div>
          </div>
          <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 tf_resp_padd_1 pull-right">
            <div className="col-lg-4 col-md-6 col-sm-7 col-xs-6 tf_full_width">

            </div>
            <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 tf_full_width tf_icons">
              <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 tf_full_width_2">
                <div className="tf_icon_image">
                  <Link href="#"><img src={baseLineCallIcon} alt="callIcon"/></Link>
                </div>
              </div>
              <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 tf_full_width_2">
                <div className="tf_icon_image">
                  <Link href="#"><img src={baseLineVideocallIcon} alt="videoIcon"/></Link>
                </div>
              </div>
              <div className="col-md-2 col-sm-2 col-xs-2 tf_full_width_3">
                <div className="tf_icon_image">
                  <div className="tf_line"></div>
                </div>
              </div>
              <div className="col-md-2 col-sm-2 col-xs-2 tf_full_width_2">
                <div className="tf_icon_image_wbg">
                  <Link href="messages_notes.html"><img src={baseline_note_add} alt=""/></Link>
                </div>
              </div>
              <div className="col-md-2 col-sm-2 col-xs-2 tf_full_width_2">
                <div className="tf_icon_image_wbg">
                  <Link href="messages_notes.html"><img src={baseline_folder} alt=""/></Link>
                </div>
              </div>
              <div className="col-md-2 col-sm-2 col-xs-2 tf_full_width_2">
                <div className="tf_icon_image_wbg">
                  <Link href="messages_notes.html"><img src={baseline_people} alt=""/></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tf_main_filter">
          <div className="col-md-12">
            <div className="panel-wrap">
              <div className="section-wrap" id="Messages">
                <div className="row header-wrap">

                </div>
                <div className="row content-wrap messages tfcontent">
                  {orderedMessages(messages, sender, currentUser, receiver)}
                </div>
                <form onSubmit={messageSubmit.bind(this,id)}>
                  <div className="row send-wrap">
                    <div className="col-md-1  col-sm-2 col-xs-1 tf_full_width">
                      <div className="tf_attach">
                        <Link href="#"><img src={baseline_attach_file} alt=""/></Link>
                      </div>
                    </div>
                    <div className="col-md-9 col-sm-7 col-xs-8 padding_0 tf_full_width">
                      <div className="send-message">
                        <div className="message-text">
                          <input type="" name="" className="no-resize-bar form-control" placeholder="Input Text"/>
                          <div className="tf_emoji">
                            <Link href="#"><img src={baseline_tag_faces} alt=""/></Link>
                            <Link href="#">
                              <img src={baseline_settings} alt=""/></Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-2 col-sm-3 col-xs-3 tf_full_width">
                      <div className="tf_send chatting_message_send_button_container">
                        <input type="submit" value='SEND' />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="clearfix"></div>
        </div>
      </div>
    </div>
  )
}

export default MessagesArea;


// helpers

function formatAMPM(date) {
  date = new Date(date)
  var hours = date.getHours()
  var minutes = date.getMinutes()
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

const orderedMessages = (messages, sender, currentUser, receiver) => {
  const sortedMessages = messages.sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  )
  return sortedMessages.map(message => {
    const user = (sender.id === message.user_id) ? sender : receiver
    return (
      <div className="msg" key={message.id}>
        <div className="col-md-1 col-sm-2 col-xs-2 tf_full_width">
          <div className="tf_contracts_mile_img userImgChat">
            {/* <img src={user.user_picture || ellipseIcon} alt=""/> */}
            {(user && user.user_name) ?
              <img  className = "img-circle" src={user.user_name} alt="img"/>:<img  className = "img-circle" src={faceImg} alt="img"/>
              // <Avatar name={  user.first_name && user.first_name.split(' ')[0]} color="#FFB4B6" round="50px" size="50"/>
              }
            <Link href="#">
              <div className="tf_round"></div>
            </Link>
          </div>
        </div>
        <div className="col-md-9 col-sm-8 col-xs-8 tf_full_width">
          <div className="media-body">
            <h5 className="media-heading">{`${user.first_name} ${user.last_name}`}</h5>
            <small>{message.text}</small>
          </div>
        </div>
        <div className="col-md-2 col-sm-2 col-xs-2 tf_full_width">
          <div className="media-body">
            <Link href="#" className="viewMoreicon"><img src={iconMoreFilled} alt="icon"/></Link>
            <small className="pull-right time">{formatAMPM(message.created_at)}</small>
          </div>
        </div>
      </div>
    )
  })
}
