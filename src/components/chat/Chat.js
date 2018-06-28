import React, { Component } from 'react';
import {
  Widget,
  addResponseMessage,
  addUserMessage
} from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';

class Chat extends Component {

  constructor(props){
    super(props);
    this.state = {
      messageslenth: 0,
      user: this.props.props.userName,
      sendBy: this.props.props.userId,
      sendTo: this.props.props.idCoach,
    };
    this.getMesssages = this.getMesssages.bind(this);
    this.formatMessages = this.formatMessages.bind(this);
    this.chatInterval = setInterval(this.formatMessages, 600);
  }

  componentWillUnmount() {
    clearInterval(this.chatInterval);
  }

  getMesssages(){
    return fetch(`https://flavio-chatapp.herokuapp.com/api/v1/getMessages/?sentById=${this.state.sendBy}&sentToId=${this.state.sendTo}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json());
  }

  formatMessages(){
    this.getMesssages().then(response => {
      if (this.state.messageslenth !== response.response.length){
        this.setState({messageslenth: response.response.length});
        response.response.map(message => {
          if(message.user_type === 'COACHEE'){
            addUserMessage(message.message)
          } else {
            addResponseMessage(message.message)
          }
        });
      }
    }).catch(error => console.log(error));
  }

  handleNewUserMessage = (newMessage) => {
    fetch('https://flavio-chatapp.herokuapp.com/api/v1/sendMessage', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sentById: this.state.sendBy,
        message: newMessage,
        sentToId: this.state.sendTo,
        sentBy_typeUser: "COACHEE"
      })
    }).then((response) => response.json());
  };

  render() {
    return (
      <div>
        <div className="App">
          <Widget
            handleNewUserMessage={this.handleNewUserMessage}
            title={'Bem-estar'}
            subtitle={''}
            senderPlaceHolder={'Digite sua mensagem'}
          />
        </div>
      </div>
    );
  }
}
export default Chat;
