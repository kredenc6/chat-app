import React, { useState, useEffect } from "react";
import ChatWindow from "./ChatWindow/ChatWindow";
import RoomInfo from "./RoomInfo/RoomInfo";
import { MessageInfo } from "interfaces/messageInfo";
import "./chat.css";

interface Props {
  userName: string;
  roomName: string;
  socket: SocketIOClient.Socket;
}

const INACTIVITY_TIME = 3000;

const ChatRoom = ({ userName, roomName, socket }: Props) => {
  const [messages, setMessages] = useState<MessageInfo[]>([]);
  const [isUserIdle, setIsUserIdle] = useState(true);
  const [timeoutID, setTimeoutID] = useState(-1);

  const trackActivity = () => {
    if(isUserIdle) setIsUserIdle(false);
    const id = window.setTimeout(() => setIsUserIdle(true), INACTIVITY_TIME);
    setTimeoutID(id);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutID);
    };
  },[timeoutID]);

  useEffect(() => {
    socket.on("admin message", (msgInfo: MessageInfo) => {
      setMessages(m => m.concat(msgInfo));
    });
    socket.on("chat message", (msgInfo: MessageInfo) => {
      setMessages(m => m.concat(msgInfo));
    });

    return () => {
      socket.off("admin message");
      socket.off("chat message");
    };
  }, [socket]);
  
  return(
    <div
      id="chatRoom"
      onMouseMove={ trackActivity }
      onKeyDown={ trackActivity }
    >
      <div id="roomContainer">
        <ChatWindow
          userName={ userName }
          roomName={ roomName }
          messages={ messages }
          setMessages={ setMessages }
          socket={ socket }
          isUserIdle={ isUserIdle }
        />
        <RoomInfo
          userName={ userName }
          roomName= { roomName }
          socket={ socket }
          isUserIdle={ isUserIdle }
        />
      </div>
    </div>
  );
}

export default ChatRoom;