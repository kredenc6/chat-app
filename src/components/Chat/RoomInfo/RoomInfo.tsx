import React from "react";
import ChatAppDescription from "./ChatAppDescription/ChatAppDescription";
import ConnectedUsers from "./ConnectedUsers/ConnectedUsers";

interface Props {
  userName: string;
  roomName: string;
  socket: SocketIOClient.Socket;
  isUserIdle: boolean;
}

const RoomInfo = ({ userName, roomName, socket, isUserIdle }: Props) => {
  return(
    <section id="roomInfo">
      <ChatAppDescription />
      <ConnectedUsers
        userName={ userName }
        roomName={ roomName }
        socket={ socket }
        isIdle={ isUserIdle }
      />
    </section>
  );
};

export default RoomInfo;