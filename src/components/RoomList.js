import React from 'react';

class RoomList extends React.Component {
  render() {
    const orderedRooms = [...this.props.rooms].sort();

    return (
      <div className="rooms-list">
        <ul>
          <h3>Your rooms:</h3>
          {orderedRooms.map((room, index) => {
            const active = this.props.roomId === room.id ? 'active' : '';
            return (
              <li key={room.id} className={'room ' + active}>
                <a
                  onClick={() => {
                    this.props.subscribeToRoom(room.id, index);
                  }}
                  href="#"
                >
                  # {room.name}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default RoomList;
