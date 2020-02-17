import React, { useState } from "react";
import RoomName from "./RoomName/RoomName";
import ChatArea from "./ChatArea/ChatArea";
import SendMessageArea from "./SendMessageArea/SendMessageArea";
import { MessageInfo } from "interfaces/messageInfo";

interface Props {
  userName: string;
  roomName: string;
  messages: MessageInfo[];
  setMessages: React.Dispatch<React.SetStateAction<MessageInfo[]>>;
  socket: SocketIOClient.Socket;
  isUserIdle: boolean;
}

interface OutgoingMsg {
  fromUser: string;
  toRoom: string;
  text: string;
}

const ChatWindow = ({ userName, roomName, messages, setMessages, socket, isUserIdle }: Props) => {
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(true);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>, writtenMsg: string) => {
    event.preventDefault();
    if(writtenMsg.trim()) { // don't send empty messages
      const outgoingMsg: OutgoingMsg = { fromUser: userName, toRoom: roomName, text: writtenMsg };
      socket.emit("chat message", outgoingMsg);
      setMessages([...messages, { fromUser: userName, text: writtenMsg }]);
    }
  }

  return(
    <section id="chatWindow">
      <RoomName
        roomName={ roomName }
        socket={ socket }
        isUserIdle={isUserIdle} 
      />
      <ChatArea
        userName={ userName }
        messages={ messages }
        isScrolledToBottom={ isScrolledToBottom }
        setIsScrolledToBottom={ setIsScrolledToBottom }
      />
      <SendMessageArea handleSubmit={ handleSubmit } />
    </section>
  );
}

export default ChatWindow;