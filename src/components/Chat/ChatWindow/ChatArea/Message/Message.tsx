import React from "react";

interface Props {
  text: string;
  userName: string;
  fromUser: string;
}

const Message = ({ text, userName, fromUser }: Props) => {
  const dynamicClass =
    userName === fromUser ? "clientMessage" :
    fromUser === "admin" ? "adminMessage" : "otherMessage";

  return(
    <div className={ "messageContainer " + dynamicClass }>
      <p className={ "message " + dynamicClass }>{ text }</p>
      <p className={"fromUser " + dynamicClass }>{ fromUser }</p>
    </div>
  );
}

export default Message;