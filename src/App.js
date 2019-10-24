import React from 'react';
import Chatkit from '@pusher/chatkit-client';
import MessageList from './components/MessageList';
import SendMessageForm from './components/SendMessageForm';
import RoomList from './components/RoomList';
import NewRoomForm from './components/NewRoomForm';

import { tokenUrl, instanceLocator } from './config';

import './App.css';
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      roomId: null,
      messages: [],
      joinableRooms: [],
      joinedRooms: [],
    };
  }

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator,
      userId: 'anas',
      tokenProvider: new Chatkit.TokenProvider({
        url: tokenUrl,
      }),
    });

    chatManager
      .connect()
      .then(currentUser => {
        this.currentUser = currentUser;
        this.getRooms();
      })
      .catch(error => {
        console.error('error on connecting: ', error);
      });
  }

  getRooms = () => {
    this.currentUser
      .getJoinableRooms()
      .then(joinableRooms => {
        this.setState({
          joinableRooms,
          joinedRooms: this.currentUser.rooms,
        });
      })
      .catch(err => console.log('error on joinableRooms: ', err));
  };

  subscribeToRoom = (roomId, index) => {
    this.setState({ messages: [] });
    this.currentUser
      .subscribeToRoomMultipart({
        roomId: this.currentUser.rooms[index].id,
        hooks: {
          onMessage: message => {
            this.setState({
              messages: [...this.state.messages, message],
            });
          },
        },
      })
      .then(room => {
        this.setState({
          roomId: roomId,
        });
        this.getRooms();
      })
      .catch(error => console.log('error on subscribing to room: ', error));
  };

  sendMessage = text => {
    this.currentUser.sendSimpleMessage({
      text,
      roomId: this.state.roomId,
    });
  };

  createRoom = name => {
    let index = 10;
    this.currentUser
      .createRoom({
        name,
      })
      .then(room => this.subscribeToRoom(room.id, index++))
      .catch(err => console.log('error with createRoom: ', err));
  };

  render() {
    const { messages } = this.state;
    return (
      <div className="app">
        <RoomList
          roomId={this.state.roomId}
          rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
          subscribeToRoom={this.subscribeToRoom}
        />
        <MessageList messages={messages} roomId={this.state.roomId} />
        <SendMessageForm
          sendMessage={this.sendMessage}
          disabled={!this.state.roomId}
        />
        <NewRoomForm createRoom={this.createRoom} />
      </div>
    );
  }
}

export default App;
