import React, { useState, useEffect } from "react";
import ConnectedUser from "./ConnectedUser";

interface Props {
  userName: string;
  roomName: string;
  socket: SocketIOClient.Socket;
  isIdle: boolean;
}

interface OnlineUser {
  name: string;
  isIdle: boolean;
}

/** returns: [clientUser, . . . active users (sorted alphabetically), . . . idle users (sorted alphabetically)] */
const sortConnectedUsers = (clientUser: OnlineUser, connectedUsers: OnlineUser[]) => {
    const sortedActiveUsers = connectedUsers.filter(user => user.name !== clientUser.name && !user.isIdle)
      .sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : a.name.toLowerCase() === b.name.toLowerCase() ? 0 : 1);
    const sortedIdleUsers = connectedUsers.filter(user => user.name !== clientUser.name && user.isIdle)
      .sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : a.name.toLowerCase() === b.name.toLowerCase() ? 0 : 1);
    return [clientUser, ...sortedActiveUsers, ...sortedIdleUsers];
}

const ConnectedUsers = ({ userName, roomName, socket, isIdle }: Props) => {
  const [connectedUsers, setConnectedUsers] = useState<OnlineUser[]>([{ name: userName, isIdle }]);
  const connectedUsersComponents = connectedUsers.filter(user => user.name !== userName).map((user, index) => {
    return (
      <ConnectedUser key={ index } name={ user.name } isUserIdle={ user.isIdle } />
    );
  });

  useEffect(() => {
    socket.on("user activity", (changedUserActivity: OnlineUser) => {
      
      setConnectedUsers(cUs => {
        if(-1 === cUs.findIndex(cU => cU.name === changedUserActivity.name)) {
          return sortConnectedUsers({ name: userName, isIdle: cUs[0].isIdle }, [...cUs, changedUserActivity]);
        }
        const updatedConnectedUsers = cUs.map(cU => {
          if(cU.name === changedUserActivity.name) {
            return { name: cU.name, isIdle: changedUserActivity.isIdle };
          }
          return cU;
        });
        return sortConnectedUsers({ name: userName, isIdle: updatedConnectedUsers[0].isIdle }, updatedConnectedUsers);
      });
    });

    return () => {
      socket.off("user activity");
    };
  },[socket, userName]);

  useEffect(() => {
    socket.on("room users", (roomUsers: OnlineUser[]) => {
      setConnectedUsers(cUs => {
        let isUserIdle = cUs.find(cU => cU.name === userName)?.isIdle || false; // bypass isIdle component property
        return sortConnectedUsers({ name: userName, isIdle: isUserIdle }, roomUsers);
      });
    });

    return () => {
      socket.off("room users");
    };
  },[socket, userName]);

  useEffect(() => {
    socket.emit("user activity", { name: userName, isIdle });
  },[userName, isIdle, socket]);

  //TODO RoomInfo needs better styling, Connected users need stable placement.
  return(
    <article id="connectedUsersWrapper">
      <p>People in the room { roomName }:</p>
      <ul id="connectedUsers">
        { connectedUsersComponents }
      </ul>
    </article>
  );
};

export default ConnectedUsers;