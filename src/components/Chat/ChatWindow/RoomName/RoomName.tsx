import React from "react";
import ActivityDot from "./ActivityDot";

interface Props {
  roomName: string;
  socket: SocketIOClient.Socket;
  isUserIdle: boolean;
}

const RoomName = ( { roomName, socket, isUserIdle }: Props) => {
  return(
    <div id="roomName">
      <span>
        <ActivityDot isUserIdle={ isUserIdle } />
        { roomName }
      </span>
      <button
        id="closeChat"
        onClick={ () => socket.emit("leave room", roomName) }
      >
        X
      </button>
    </div>
  );
};

export default RoomName;